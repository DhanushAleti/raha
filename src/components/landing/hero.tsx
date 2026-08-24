import Link from "next/link";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden bg-raha-cream"
    >
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 sm:pb-24 sm:pt-28">
        <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-raha-green/20 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-raha-green">
          For Indians earning in foreign currency
        </p>
        <h1
          id="hero-heading"
          className="font-display max-w-3xl text-5xl leading-[1.05] tracking-tight text-raha-ink sm:text-7xl"
        >
          Your foreign income is a 0% export.{" "}
          <span className="relative isolate whitespace-nowrap">
            Prove it.
            <span
              aria-hidden
              className="absolute inset-x-0 bottom-1 -z-10 h-3 bg-raha-amber/50 sm:h-4"
            />
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-raha-ink/70">
          When you&apos;re paid from abroad, that money is a zero-rated export
          at 0% GST — but only with a FIRA and an LUT. Miss either and it can be
          taxed at 18%, plus penalty. Raha checks if you&apos;re covered in two
          minutes and proves it across every rail you use.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild size="lg" className="h-12 px-7 text-base">
            <Link href="/audit">Run the free 2-minute check</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 border-raha-green/30 px-7 text-base text-raha-green hover:bg-raha-green-soft"
          >
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Reserve a founding seat
            </a>
          </Button>
        </div>
        <p className="mt-5 text-sm text-raha-ink/50">
          2-minute check · no signup needed · instant red/amber/green report
        </p>
      </div>
    </section>
  );
}
