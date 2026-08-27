import Link from "next/link";
import { QUESTIONS } from "./questions";
import type { AuditResult } from "@/lib/audit/scoring";
import { EvidenceCheckOffer } from "@/components/evidence-check-offer";
import { whatsappLink } from "@/lib/whatsapp";

const VERDICT_META = {
  green: {
    label: "Low risk",
    headline: "You're in better shape than most people paid from abroad.",
    tone: "border-emerald-300 bg-emerald-50 text-emerald-900",
    chip: "bg-emerald-600",
  },
  amber: {
    label: "Moderate risk",
    headline: "A few gaps could get expensive if they're left open.",
    tone: "border-amber-300 bg-amber-50 text-amber-900",
    chip: "bg-amber-500",
  },
  red: {
    label: "High risk",
    headline: "Your setup has gaps the tax department actively looks for.",
    tone: "border-red-300 bg-red-50 text-red-900",
    chip: "bg-red-600",
  },
} as const;

const SEVERITY_LABEL = {
  high: { text: "Fix first", cls: "bg-red-100 text-red-700" },
  medium: { text: "Fix soon", cls: "bg-amber-100 text-amber-700" },
  low: { text: "Good to fix", cls: "bg-raha-green-soft text-raha-green" },
} as const;

interface AuditReportProps {
  result: AuditResult;
  name: string;
}

export function AuditReport({ result, name }: AuditReportProps) {
  const meta = VERDICT_META[result.verdict];
  // Empty until they opt into the email follow-up, so the greeting is optional.
  const firstName = name.trim().split(/\s+/)[0];

  return (
    <div className="mx-auto max-w-xl px-5 py-14">
      <div className={`rounded-2xl border p-7 ${meta.tone}`}>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${meta.chip}`}
        >
          {meta.label}
        </span>
        {firstName ? (
          <p className="mt-4 text-sm font-medium opacity-70">Hi {firstName},</p>
        ) : null}
        <h1
          className={`font-display text-3xl leading-tight ${
            firstName ? "mt-1" : "mt-4"
          }`}
        >
          {meta.headline}
        </h1>
        <p className="mt-3 text-sm opacity-80">
          Risk score {result.score} · based on your {QUESTIONS.length} answers
        </p>
      </div>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-widest text-raha-ink/50">
        What we found
      </h2>
      <div className="mt-4 space-y-4">
        {result.flags.map((flag) => {
          const sev = SEVERITY_LABEL[flag.severity];
          return (
            <article
              key={flag.id}
              className="rounded-2xl border border-raha-ink/10 bg-white p-6"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-semibold text-raha-ink">
                  {flag.title}
                </h3>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${sev.cls}`}
                >
                  {sev.text}
                </span>
              </div>
              <p className="mt-2 leading-relaxed text-raha-ink/65">
                {flag.body}
              </p>
              <p className="mt-3 rounded-lg bg-raha-cream px-4 py-3 text-sm text-raha-ink/80">
                <strong className="text-raha-green">Do this: </strong>
                {flag.action}
              </p>
            </article>
          );
        })}
      </div>

      {result.verdict === "green" ? (
        <div className="mt-10 rounded-2xl bg-raha-ink p-7 text-center">
          <p className="font-display text-2xl text-raha-cream">
            Nothing urgent here.
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-raha-cream/70">
            If you want the paperwork checked line by line anyway — every
            foreign credit matched to the document behind it — that&apos;s
            ₹2,000 and 48 hours.
          </p>
          <a
            href={whatsappLink(
              "Hi! I ran the Raha audit and came out green, but I'd like the evidence check anyway.",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex h-12 items-center rounded-lg bg-raha-amber px-7 text-base font-semibold text-raha-ink transition-opacity hover:opacity-90"
          >
            Ask about the evidence check
          </a>
        </div>
      ) : (
        <div className="mt-10">
          <EvidenceCheckOffer
            variant="dark"
            context={`Hi! I ran the Raha audit — ${result.verdict} verdict, score ${result.score}. I want the Foreign Income Evidence Check.`}
          />
        </div>
      )}

      <p className="mt-6 text-center text-xs text-raha-ink/45">
        <Link href="/" className="underline underline-offset-2">
          Back to raha
        </Link>
      </p>

      <p className="mt-8 text-center text-xs leading-relaxed text-raha-ink/45">
        This is an indicative self-assessment based on your answers — not tax
        advice, and not a substitute for a qualified CA&apos;s review.
      </p>
    </div>
  );
}
