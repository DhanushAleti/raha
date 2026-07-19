import type { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in — Raha",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-raha-cream px-5">
      <div className="w-full max-w-sm">
        <Link href="/" className="font-display text-2xl text-raha-ink">
          Raha
        </Link>
        <h1 className="font-display mt-8 text-3xl text-raha-ink">Sign in</h1>
        <p className="mt-2 text-sm text-raha-ink/60">
          We&apos;ll email you a magic link — no password to remember.
        </p>
        {params.error ? (
          <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {params.error === "link"
              ? "That link expired or was already used. Request a fresh one below."
              : "Sign-in didn't complete. Please try again."}
          </p>
        ) : null}
        <div className="mt-8">
          <LoginForm />
        </div>
        <p className="mt-8 text-center text-xs leading-relaxed text-raha-ink/45">
          By signing in you agree that Raha shows estimates only — every figure
          is verified by your CA before filing.
        </p>
      </div>
    </main>
  );
}
