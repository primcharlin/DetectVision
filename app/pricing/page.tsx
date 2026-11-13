import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CTABand } from "@/components/sections/CTABand";
import { faqs } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Four products, each in two tiers. Subscribe to only what your floor needs.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero kicker="Pricing" title="Simple, transparent pricing" lede="Four products, each in two tiers. Subscribe to only what your floor needs." />
      <section className="bg-paper pb-28">
        <Container>
          <Pricing />
        </Container>
      </section>
      <section className="bg-paper pb-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionIntro title="Questions" />
          <FAQ items={faqs} />
        </Container>
      </section>
      <CTABand title="Not sure what you need?" lede="Tell us what you’re running and we’ll help you build the right fit." />
    </>
  );
}
