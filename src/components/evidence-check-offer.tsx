import { whatsappLink } from "@/lib/whatsapp";
import {
  DIAGNOSTIC_PRICE_INR,
  DIAGNOSTIC_TURNAROUND_HOURS,
  upiId,
  upiLink,
} from "@/lib/payments";

/**
 * The one paid thing Raha sells today. Replaces the ₹20,000 founding seat on
 * both the landing page and the audit result.
 *
 * Why: at ₹20,000 the comparison set is a licensed CA who does more and carries
 * liability — an r/IndiaTax commenter states theirs covers ITR, GST, LUT and
 * FIRC for exactly that. At ₹2,000 there is no comparison set, because no CA
 * sells a forensic evidence check at a price that is uneconomic at their hourly
 * rate. The price is the positioning. See docs/PAINKILLER_AUDIT.md.
 */

const NOT_THIS = [
  "Not a filing",
  "Not a CA opinion",
  "Not tax advice",
] as const;

interface EvidenceCheckOfferProps {
  /** "dark" sits on raha-ink (audit result); "light" on cream (landing). */
  variant?: "dark" | "light";
  /** Prefills the WhatsApp message with where they came from. */
  context?: string;
}

export function EvidenceCheckOffer({
  variant = "light",
  context = "I want the Foreign Income Evidence Check.",
}: EvidenceCheckOfferProps) {
  const pay = upiLink();
  const vpa = upiId();
  const dark = variant === "dark";

  const shell = dark
    ? "rounded-2xl bg-raha-ink p-7 sm:p-9"
    : "rounded-3xl border border-raha-green/20 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,59,46,0.35)] sm:p-10";
  const heading = dark ? "text-raha-cream" : "text-raha-ink";
  const body = dark ? "text-raha-cream/70" : "text-raha-ink/70";
  const muted = dark ? "text-raha-cream/50" : "text-raha-ink/50";
  const rule = dark ? "border-raha-cream/15" : "border-raha-ink/10";

  return (
    <div className={shell}>
      <p className={`text-sm font-semibold uppercase tracking-widest ${dark ? "text-raha-amber" : "text-raha-green"}`}>
        The one thing we sell
      </p>
      <h2 className={`font-display mt-3 text-3xl tracking-tight ${heading}`}>
        The Foreign Income Evidence Check
      </h2>

      <p className={`mt-5 leading-relaxed ${body}`}>
        Every foreign credit you received in the period, matched line by line to
        the document behind it — FIRA, NOC, bank advice, or nothing — and a
        written statement of which ones stand up as zero-rated exports and which
        do not, with the rupee exposure on the ones that do not. Plus whether
        your LUT is where it needs to be.
      </p>

      <div className={`mt-7 flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t pt-6 ${rule}`}>
        <span className={`font-display text-5xl tracking-tight ${heading}`}>
          ₹{DIAGNOSTIC_PRICE_INR.toLocaleString("en-IN")}
        </span>
        <span className={`text-sm ${body}`}>
          {DIAGNOSTIC_TURNAROUND_HOURS} hours from payment
        </span>
      </div>

      <p className={`mt-3 text-sm font-medium ${dark ? "text-raha-amber" : "text-raha-green"}`}>
        Money back if it doesn&apos;t tell you something your CA hasn&apos;t.
      </p>

      {pay ? (
        <>
          <a
            href={pay}
            className={`mt-6 flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold transition-opacity hover:opacity-90 ${
              dark
                ? "bg-raha-amber text-raha-ink"
                : "bg-raha-green text-raha-cream"
            }`}
          >
            Pay ₹{DIAGNOSTIC_PRICE_INR.toLocaleString("en-IN")} by UPI
          </a>
          <p className={`mt-3 text-center text-xs ${muted}`}>
            Opens your UPI app. On a laptop, pay{" "}
            <span className="font-medium">{vpa}</span> from your phone, then
            message us the reference.
          </p>
        </>
      ) : (
        <a
          href={whatsappLink(context)}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-6 flex h-12 w-full items-center justify-center rounded-lg text-base font-semibold transition-opacity hover:opacity-90 ${
            dark ? "bg-raha-amber text-raha-ink" : "bg-raha-green text-raha-cream"
          }`}
        >
          Start on WhatsApp
        </a>
      )}

      <a
        href={whatsappLink(context)}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-3 block text-center text-sm underline underline-offset-4 ${body}`}
      >
        {pay ? "Or ask a question first" : "Ask a question first"}
      </a>

      <ul className={`mt-7 flex flex-wrap gap-x-5 gap-y-1 border-t pt-5 text-sm ${rule} ${muted}`}>
        {NOT_THIS.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className={`mt-3 text-xs leading-relaxed ${muted}`}>
        A written reconciliation you hand to whoever files for you. Every figure
        is an estimate — verify with your CA before filing. Raha does not file
        returns on your behalf and does not provide licensed tax advice.
      </p>
    </div>
  );
}
