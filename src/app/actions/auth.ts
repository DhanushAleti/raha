"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const emailSchema = z.string().trim().email("That email doesn't look right").max(320);

export type MagicLinkResult =
  | { status: "ok" }
  | { status: "error"; message: string };

export async function sendMagicLink(input: unknown): Promise<MagicLinkResult> {
  const parsed = emailSchema.safeParse(input);
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid email" };
  }

  try {
    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const { error } = await supabase.auth.signInWithOtp({
      email: parsed.data,
      options: { emailRedirectTo: `${siteUrl}/auth/confirm` },
    });
    if (error) {
      console.error("magic link failed", { code: error.code, message: error.message });
      return { status: "error", message: "Couldn't send the link — please try again." };
    }
    return { status: "ok" };
  } catch (err) {
    console.error("magic link action crashed", err);
    return { status: "error", message: "Couldn't send the link — please try again." };
  }
}

export async function signInWithGoogle(): Promise<MagicLinkResult> {
  const supabase = await createClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${siteUrl}/auth/callback` },
  });
  if (error || !data.url) {
    console.error("google oauth failed", error);
    return { status: "error", message: "Google sign-in isn't available right now." };
  }
  redirect(data.url);
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
