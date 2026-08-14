import { whatsappLink } from "@/lib/whatsapp";

export function Urgency() {
  return (
    <section aria-labelledby="urgency-heading" className="bg-raha-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-raha-amber">
            Why this can&apos;t wait
          </p>
          <h2
            id="urgency-heading"
            className="font-display mt-3 text-3xl tracking-tight text-raha-cream sm:text-5xl"
          >
            0% or 18%. The difference is a FIRA and an LUT.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-raha-cream/75">
            <p>
              When you&apos;re paid from abroad, your income is a zero-rated
              export at 0% GST. The zero rating is conditional. It needs a FIRA
              from your bank and an LUT filed for the year. Miss either, and the
              same income can be assessed as domestic supply at 18%, plus a
              penalty equal to the tax, plus 18% annual interest.
            </p>
            <p>
              At the same time, the tax department is actively chasing
              unreported foreign income and assets. If your money landed without
              a matched FIRA, you are exactly who a notice looks for.
            </p>
          </div>
          <a
            href={whatsappLink(
              "Hi! I want to make sure my foreign income is compliant (FIRA, LUT, GST). Can you help?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex h-12 items-center rounded-lg bg-raha-amber px-7 text-base font-semibold text-raha-ink transition-opacity hover:opacity-90"
          >
            Talk to us before a notice does
          </a>
        </div>
      </div>
    </section>
  );
}
