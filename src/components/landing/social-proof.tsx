const PLATFORMS = [
  "YouTube",
  "Patreon",
  "Twitch",
  "Instagram",
  "Substack",
  "Ko-fi",
] as const;

export function SocialProof() {
  return (
    <section aria-label="Who Raha is built for" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <p className="text-center text-sm text-raha-ink/45">
          Built for creators earning on
        </p>
        <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PLATFORMS.map((p) => (
            <li
              key={p}
              className="text-lg font-semibold tracking-wide text-raha-ink/30"
            >
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm italic text-raha-ink/40">
          Founding Creator stories will appear here — the first 10 seats are
          filling now.
        </p>
      </div>
    </section>
  );
}
