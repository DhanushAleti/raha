import type { Metadata } from "next";
import Link from "next/link";
import { AuditWizard } from "@/components/audit/audit-wizard";

export const metadata: Metadata = {
  title: "Free 2-Minute Check — Raha",
  description:
    "8 questions, 2 minutes: find out if your foreign income is a provable 0% export — FIRA and LUT included. Instant red/amber/green compliance report. No signup.",
};

export default function AuditPage() {
  return (
    <main className="min-h-screen bg-raha-cream">
      <header className="border-b border-raha-ink/8">
        <div className="mx-auto flex max-w-xl items-center justify-between px-5 py-4">
          <Link href="/" className="font-display text-xl text-raha-ink">
            Raha
          </Link>
          <span className="text-xs font-medium uppercase tracking-widest text-raha-green">
            Free Audit Check
          </span>
        </div>
      </header>
      <AuditWizard />
    </main>
  );
}
