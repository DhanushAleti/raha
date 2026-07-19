import { whatsappLink } from "@/lib/whatsapp";

export function Urgency() {
  return (
    <section aria-labelledby="urgency-heading" className="bg-raha-ink">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-raha-amber">
            The rules changed in April 2026
          </p>
          <h2
            id="urgency-heading"
            className="font-display mt-3 text-3xl tracking-tight text-raha-cream sm:text-5xl"
          >
            The Creator Economy Bill made compliance the law — with deadlines
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-raha-cream/75">
            <p>
              India&apos;s National Creator Economy Bill (passed Rajya Sabha,
              April 2026) mandates official registration for high-earning
              creators and standardises brand contracts. Compliance is no
              longer a nice-to-have — it&apos;s statute.
            </p>
            <p>
              At the same time, the government is actively pursuing untaxed
              foreign remittances and influencer income. If your AdSense or
              Patreon money lands without a matched FIRC trail, you are exactly
              who they&apos;re looking for.
            </p>
          </div>
          <a
            href={whatsappLink(
              "Hi! I want to make sure I'm compliant under the Creator Economy Bill. Can you help?",
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
