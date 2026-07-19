const FAILURES = [
  {
    title: "Misclassified income",
    cost: "Notices + lost deductions",
    body: "Creator revenue filed under the wrong SAC or business code. The tax department notices — and the deductions you were owed quietly disappear.",
  },
  {
    title: "Mishandled foreign income",
    cost: "Up to 18% GST overpaid",
    body: "AdSense and Patreon income is usually a zero-rated export of service — if FIRCs are tracked and matched. Most CAs don't, so you overpay or get flagged.",
  },
  {
    title: "Invoicing panic",
    cost: "Late payments, lost brands",
    body: "Brands demand GST-compliant invoices at 18%. Creators improvise in Canva, look unprofessional, and wait months to get paid.",
  },
  {
    title: "Zero visibility",
    cost: "A terrifying year-end lump sum",
    body: "Income scattered across 5–6 platforms means no idea what to set aside — until the bill lands all at once in March.",
  },
] as const;

export function FailureModes() {
  return (
    <section aria-labelledby="failures-heading" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
        <p className="text-sm font-semibold uppercase tracking-widest text-raha-green">
          Why generic CAs fail creators
        </p>
        <h2
          id="failures-heading"
          className="font-display mt-3 max-w-2xl text-3xl tracking-tight text-raha-ink sm:text-5xl"
        >
          Four ways creator taxes go wrong
        </h2>
        <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2">
          {FAILURES.map((f, i) => (
            <article
              key={f.title}
              className="group rounded-2xl border border-raha-ink/8 bg-raha-cream p-6 transition-colors hover:border-raha-green/30 sm:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  aria-hidden
                  className="font-display text-4xl text-raha-ink/15 group-hover:text-raha-amber"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="rounded-full bg-raha-red/10 px-3 py-1 text-xs font-semibold text-raha-red">
                  {f.cost}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-raha-ink">
                {f.title}
              </h3>
              <p className="mt-2 leading-relaxed text-raha-ink/65">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
