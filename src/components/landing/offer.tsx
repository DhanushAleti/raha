import { EvidenceCheckOffer } from "@/components/evidence-check-offer";

const INCLUDED = [
  "Every foreign credit in the period, listed — no sampling",
  "Each one matched to the document behind it: FIRA, NOC, bank advice, or nothing",
  "Which ones stand up as zero-rated exports, and which do not",
  "The rupee exposure on the ones that do not",
  "Whether your LUT is filed and dated where it needs to be",
] as const;

/**
 * The ₹20,000 founding seat and the 10-seat counter used to live here. Both are
 * gone: at ₹20,000 the buyer compares Raha to a licensed CA doing more for the
 * same money, and loses on the merits. The seat becomes something a satisfied
 * ₹2,000 customer asks for, not the front door. docs/PAINKILLER_AUDIT.md.
 */
export function Offer() {
  return (
    <section aria-labelledby="offer-heading" className="bg-raha-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-raha-green">
              Find out where you actually stand
            </p>
            <h2
              id="offer-heading"
              className="font-display mt-3 text-3xl tracking-tight text-raha-ink sm:text-5xl"
            >
              Most people have the LUT and nothing underneath it.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-raha-ink/70">
              Foreign income is a zero-rated export only if there&apos;s a FIRA
              behind each remittance. That gap surfaces at LUT renewal or in a
              notice — by which point it&apos;s 18% plus interest on money you
              spent last year. This tells you, in writing, before then.
            </p>
            <ul className="mt-8 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex gap-3 text-raha-ink/80">
                  <span aria-hidden className="mt-1 text-raha-green">
                    ✓
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-8 max-w-lg text-sm leading-relaxed text-raha-ink/55">
              Not a CA, and we don&apos;t file. What you get is the
              reconciliation your CA doesn&apos;t have time to do in April —
              every credit matched to a document, in writing, that you hand to
              whoever files for you.
            </p>
          </div>
          <div className="lg:sticky lg:top-8">
            <EvidenceCheckOffer
              variant="light"
              context="Hi! I want the ₹2,000 Foreign Income Evidence Check."
            />
          </div>
        </div>
      </div>
    </section>
  );
}
