import type { Metadata } from "next";
import { MagicLinkConfirm } from "@/components/auth/magic-link-confirm";

export const metadata: Metadata = {
  title: "Signing you in — Raha",
  robots: { index: false, follow: false },
};

export default function ConfirmPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-raha-cream px-5">
      <MagicLinkConfirm />
    </main>
  );
}
