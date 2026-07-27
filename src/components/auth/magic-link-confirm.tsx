"use client";

import { useEffect, useRef } from "react";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";

/** The email OTP types Supabase can mint a link for. */
const otpTypeSchema = z.enum([
  "email",
  "magiclink",
  "signup",
  "invite",
  "recovery",
  "email_change",
]);

const paramsSchema = z.object({
  token_hash: z.string().min(1),
  type: otpTypeSchema,
});

/** Only same-origin relative paths — never absolute or protocol-relative. */
function safeNext(value: string | null): string {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return "/app";
  return value;
}

/**
 * Verifies the magic-link token in the browser.
 *
 * The token arrives in the URL fragment (`#token_hash=…`), which browsers never
 * send to a server. Mail-security scanners that pre-fetch links therefore cannot
 * consume the one-time token before the recipient clicks it — the bug that made
 * every magic link arrive already "expired or used". Query params are still read
 * as a fallback so links minted before this change keep working.
 */
export function MagicLinkConfirm() {
  const startedRef = useRef(false);

  useEffect(() => {
    // verifyOtp is single-use; StrictMode double-invokes effects in dev.
    if (startedRef.current) return;
    startedRef.current = true;

    const fragment = new URLSearchParams(
      window.location.hash.replace(/^#/, ""),
    );
    const query = new URLSearchParams(window.location.search);
    const read = (key: string) => fragment.get(key) ?? query.get(key);

    const parsed = paramsSchema.safeParse({
      token_hash: read("token_hash") ?? undefined,
      type: read("type") ?? undefined,
    });

    if (!parsed.success) {
      window.location.replace("/login?error=link");
      return;
    }

    const next = safeNext(read("next"));

    void (async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.verifyOtp({
        type: parsed.data.type,
        token_hash: parsed.data.token_hash,
      });

      if (error) {
        console.error("magic link verification failed", {
          code: error.code,
          message: error.message,
        });
        window.location.replace("/login?error=link");
        return;
      }

      // Drop the token from the address bar before leaving the page.
      window.history.replaceState(null, "", window.location.pathname);
      // Full navigation so the freshly-set auth cookies reach the middleware.
      window.location.replace(next);
    })();
  }, []);

  return (
    <div className="text-center" role="status" aria-live="polite">
      <p className="font-display text-2xl text-raha-ink">Signing you in…</p>
      <p className="mt-2 text-sm text-raha-ink/60">
        One moment while we check your link.
      </p>
    </div>
  );
}
