"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { sendMagicLink, signInWithGoogle } from "@/app/actions/auth";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [pending, startTransition] = useTransition();
  const [googlePending, startGoogle] = useTransition();

  function handleMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      const result = await sendMagicLink(email);
      if (result.status === "ok") {
        setSent(true);
      } else {
        toast.error(result.message);
      }
    });
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-raha-green/25 bg-raha-green-soft p-6 text-center">
        <p className="font-medium text-raha-green">Check your inbox</p>
        <p className="mt-1 text-sm text-raha-ink/65">
          We sent a sign-in link to <strong>{email}</strong>. It&apos;s valid
          for one hour.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-3 text-sm text-raha-green underline underline-offset-2"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <form onSubmit={handleMagicLink} className="space-y-4" noValidate>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            maxLength={320}
            autoComplete="email"
          />
        </div>
        <Button
          type="submit"
          size="lg"
          className="h-11 w-full"
          disabled={pending || !email}
        >
          {pending ? "Sending…" : "Email me a magic link"}
        </Button>
      </form>
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-raha-ink/40">or</span>
        <Separator className="flex-1" />
      </div>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="h-11 w-full"
        disabled={googlePending}
        onClick={() =>
          startGoogle(async () => {
            const result = await signInWithGoogle();
            // On success this redirects; reaching here means it failed.
            if (result?.status === "error") toast.error(result.message);
          })
        }
      >
        {googlePending ? "Redirecting…" : "Continue with Google"}
      </Button>
    </div>
  );
}
