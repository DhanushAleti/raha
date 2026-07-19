import { whatsappLink } from "@/lib/whatsapp";

const INCLUDED = [
  "Dedicated creator-fluent CA — filings reviewed and signed by qualified Chartered Accountants",
  "FIRC tracking + export-of-service documentation for every foreign payout",
  "GST-compliant invoices for every brand deal, done for you",
  "A live 'set aside this much' number across all your platforms",
  "Year-round support on WhatsApp — not just in filing season",
] as const;

// Updated manually as seats fill (env override so no redeploy-per-sale is needed).
const SEATS_TAKEN = Number(process.env.NEXT_PUBLIC_FOUNDING_SEATS_TAKEN ?? "0");

export function Offer() {
  const seatsRemaining = Math.max(0, 10 - (Number.isFinite(SEATS_TAKEN) ? SEATS_TAKEN : 0));
  return (
    <section aria-labelledby="offer-heading" className="bg-raha-cream">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="grid items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-raha-green">
              Founding Creator offer
            </p>
            <h2
              id="offer-heading"
              className="font-display mt-3 text-3xl tracking-tight text-raha-ink sm:text-5xl"
            >
              First 10 creators. Price locked for life.
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-raha-ink/70">
              You&apos;re already paying ₹20K–₹50K a year for a CA who
              doesn&apos;t know what a Superchat is. Founding Creators get the
              full Raha service — at half the standard price, locked in
              forever.
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
          </div>
          <div className="rounded-3xl border border-raha-green/20 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(11,59,46,0.35)] sm:p-10 lg:sticky lg:top-8">
            <p className="text-sm font-medium text-raha-ink/60">
              Founding Creator plan
            </p>
            <p className="mt-3 flex items-baseline gap-3">
              <span className="font-display text-5xl tracking-tight text-raha-ink">
                ₹20,000
              </span>
              <span className="text-lg text-raha-ink/40 line-through">
                ₹40,000
              </span>
              <span className="text-sm text-raha-ink/60">/year</span>
            </p>
            <p className="mt-2 text-sm font-medium text-raha-green">
              50% off — locked at this price for as long as you stay
            </p>
            <div className="mt-6 rounded-xl bg-raha-green-soft px-4 py-3 text-sm text-raha-green">
              <strong>{seatsRemaining} of 10</strong> founding seats still open
            </div>
            <a
              href={whatsappLink(
                "Hi! I'd like to reserve one of the 10 Founding Creator seats (₹20,000/yr).",
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-raha-green text-base font-semibold text-raha-cream transition-opacity hover:opacity-90"
            >
              Reserve your seat on WhatsApp
            </a>
            <p className="mt-4 text-center text-xs leading-relaxed text-raha-ink/50">
              No payment online — we onboard every Founding Creator personally
              over a call.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
