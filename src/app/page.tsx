import { Hero } from "@/components/landing/hero";
import { FailureModes } from "@/components/landing/failure-modes";
import { Urgency } from "@/components/landing/urgency";
import { Offer } from "@/components/landing/offer";
import { SocialProof } from "@/components/landing/social-proof";
import { Faq } from "@/components/landing/faq";
import { WaitlistForm } from "@/components/landing/waitlist-form";
import { SiteFooter } from "@/components/landing/site-footer";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <FailureModes />
      <Urgency />
      <Offer />
      <SocialProof />
      <Faq />
      <section
        aria-labelledby="waitlist-heading"
        className="bg-raha-cream-deep"
      >
        <div className="mx-auto max-w-2xl px-5 py-16 sm:py-24">
          <h2
            id="waitlist-heading"
            className="font-display text-center text-3xl tracking-tight text-raha-ink sm:text-4xl"
          >
            Not ready to talk? Join the waitlist.
          </h2>
          <p className="mt-3 text-center text-raha-ink/60">
            We&apos;ll keep you posted as seats open — and send you what
            actually matters for staying compliant on foreign income.
          </p>
          <div className="mt-10">
            <WaitlistForm />
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
