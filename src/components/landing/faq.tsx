const FAQS = [
  {
    q: "Do I even need GST registration as a creator?",
    a: "If your aggregate turnover crosses ₹20 lakh in a financial year (₹10 lakh in special-category states), GST registration is mandatory — and for many creators exporting services (AdSense, Patreon), registration is what unlocks zero-rated treatment. Your CA confirms your exact position.",
  },
  {
    q: "What is a FIRC and why does everyone keep saying it?",
    a: "A Foreign Inward Remittance Certificate is your bank's proof that money arrived from abroad. It's the document that lets foreign platform income be treated as a zero-rated export of service — meaning no 18% GST on it. No FIRC trail, no proof, no zero-rating.",
  },
  {
    q: "So my AdSense income doesn't need GST at all?",
    a: "Usually foreign-platform income qualifies as an export of services (zero-rated under LUT), but only when the paper trail — LUT filing, FIRCs, matching invoices — is in place. That's exactly the trail Raha maintains. Final treatment is confirmed by your CA.",
  },
  {
    q: "Does Raha replace my CA?",
    a: "No. Raha is the creator-fluent layer that keeps your income, FIRCs, and invoices perfectly reconciled — and every filing is reviewed and signed by a qualified Chartered Accountant. If you love your current CA, we hand them clean files.",
  },
  {
    q: "Does Raha file my returns automatically?",
    a: "No — and be wary of anyone who says they do. Raha prepares everything; qualified CAs review and execute filings. Every number Raha shows you is an estimate to verify with your CA before filing.",
  },
  {
    q: "Is my financial data safe?",
    a: "Data is encrypted at rest (AES-256), stored in compliance with Indian data-localisation law, and access-controlled so only you (and reviewers you authorise) can see it.",
  },
  {
    q: "What does it cost?",
    a: "The Founding Creator plan is ₹20,000/year — 50% off the standard ₹40,000 — for the first 10 creators only, price-locked for life. Annual plans only: taxes don't stop after filing season, and neither do we.",
  },
  {
    q: "I earn less than ₹20L. Is Raha for me?",
    a: "Raha is built for creators past the GST threshold, where the stakes are real. If you're approaching ₹20L, run the free Audit Check — it will tell you what to put in place before you cross it.",
  },
] as const;

export function Faq() {
  return (
    <section aria-labelledby="faq-heading" className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <h2
          id="faq-heading"
          className="font-display text-3xl tracking-tight text-raha-ink sm:text-4xl"
        >
          Questions creators actually ask
        </h2>
        <div className="mt-8 divide-y divide-raha-ink/8">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-lg font-medium text-raha-ink [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden
                  className="text-raha-green transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-raha-ink/65">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
