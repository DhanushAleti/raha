const FAQS = [
  {
    q: "Do I even need GST registration?",
    a: "If your aggregate turnover crosses ₹20 lakh in a financial year (₹10 lakh in special-category states), GST registration is mandatory — and for anyone exporting services (freelancers, consultants, SaaS founders, creators on AdSense or Patreon), registration is what unlocks zero-rated treatment. Your CA confirms your exact position.",
  },
  {
    q: "What's a FIRA — and isn't it called a FIRC?",
    a: "A FIRA (Foreign Inward Remittance Advice) is your bank's proof that money arrived from abroad. It's what lets your foreign income be treated as a zero-rated export of service — meaning no 18% GST on it. Physical FIRCs were discontinued for exports back in 2016, so if someone still asks you for a FIRC, a FIRA is what you actually need. No FIRA trail, no proof, no zero-rating.",
  },
  {
    q: "So my foreign income doesn't need GST at all?",
    a: "Usually foreign income qualifies as an export of services (zero-rated under LUT), but only when the paper trail — LUT filing, FIRAs, matching invoices — is in place. That's exactly the trail Raha maintains. Final treatment is confirmed by your CA.",
  },
  {
    q: "Does Raha replace my CA?",
    a: "No. Raha is the cross-border-fluent layer that keeps your income, FIRAs, and invoices perfectly reconciled — and every filing is reviewed and signed by a qualified Chartered Accountant. If you love your current CA, we hand them clean files.",
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
    a: "₹2,000 for the Foreign Income Evidence Check — every foreign credit matched to the document behind it, written up in 48 hours. Money back if it doesn't tell you something your CA hasn't. That is the only thing we sell right now; ongoing work is something we discuss once you've seen the check.",
  },
  {
    q: "I earn less than ₹20L. Is Raha for me?",
    a: "Raha is built for people past the GST threshold, where the stakes are real. If you're approaching ₹20L, run the free 2-minute check — it will tell you what to put in place before you cross it.",
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
          Questions people actually ask
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
