const TRUST_ITEMS = [
  "Pricing in ₹, built for India",
  "Data stored in India (data-localisation compliant)",
  "AES-256 encryption at rest",
  "Filings reviewed & signed by qualified CAs",
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-raha-ink">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-raha-cream/70"
            >
              <span aria-hidden className="text-raha-amber">
                ◆
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-10 border-t border-raha-cream/10 pt-8 text-center">
          <p className="font-display text-2xl text-raha-cream">Raha</p>
          <p className="mx-auto mt-4 max-w-2xl text-xs leading-relaxed text-raha-cream/50">
            Raha is a service platform, not a substitute for professional tax
            advice. All filings are executed by qualified Chartered
            Accountants. Figures shown anywhere in Raha are estimates — verify
            with your CA before filing. Nothing on this page is tax or legal
            advice.
          </p>
          <p className="mt-4 text-xs text-raha-cream/40">
            © {new Date().getFullYear()} Raha · Foreign income, proven
          </p>
        </div>
      </div>
    </footer>
  );
}
