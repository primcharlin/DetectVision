import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { HeroIntro } from "@/components/sections/HeroIntro";
import { AnalyzeDemo } from "@/components/demo/AnalyzeDemo";
import { FloatingCards } from "@/components/demo/FloatingCards";
import { LogoWall } from "@/components/sections/LogoWall";
import { ProductRows } from "@/components/sections/ProductRows";
import { StackedPanels } from "@/components/sections/StackedPanels";
import { WordFill } from "@/components/motion/WordFill";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { PrivacyBlock } from "@/components/sections/PrivacyBlock";
import { Pricing } from "@/components/sections/Pricing";
import { IndustryList } from "@/components/sections/IndustryList";
import { Proof } from "@/components/sections/Proof";
import { CTABand } from "@/components/sections/CTABand";

const manifesto =
  "From intelligent monitoring and an always-on AI receptionist to robotic delivery, DetectVision brings it all together into one private, secure AI system, so owners can see what matters and act with confidence.";

export default function HomePage() {
  return (
    <>
      <section className="bg-paper pb-16 pt-44 sm:pb-24 sm:pt-52">
        <Container>
          <HeroIntro />
          <div className="mt-16 sm:mt-20">
            <FloatingCards>
              <AnalyzeDemo />
            </FloatingCards>
          </div>
        </Container>
      </section>

      <LogoWall />

      <section className="bg-paper py-28 sm:py-40">
        <Container className="max-w-[1100px]">
          <p className="mb-8 text-[1rem] font-semibold text-slate">Smarter decisions across your business</p>
          <WordFill text={manifesto} className="text-[clamp(1.85rem,1.2rem+2.6vw,3.6rem)] font-semibold leading-[1.12] tracking-[-0.04em]" />
        </Container>
      </section>

      <section className="bg-paper pb-16">
        <Container>
          <SectionIntro title="Four products. One system." className="mb-14" />
          <ProductRows />
        </Container>
      </section>

      <section className="bg-paper pb-24" aria-label="Products">
        <Container className="max-w-[1320px]">
          <StackedPanels />
        </Container>
      </section>

      <HowItWorks />

      <section id="pricing" className="scroll-mt-24 bg-paper py-28 sm:py-36">
        <Container>
          <div className="mb-14 text-center">
            <SectionIntro title="Simple, transparent pricing" lede="Four products, each in two tiers. Subscribe to only what your floor needs." className="mx-auto" />
          </div>
          <Pricing />
        </Container>
      </section>

      <PrivacyBlock />

      <section className="bg-paper py-28 sm:py-36">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionIntro title="Made for businesses that never stand still" />
            <ButtonLink href="/industries" variant="outline-light" className="self-start lg:self-auto">All industries</ButtonLink>
          </div>
          <IndustryList />
        </Container>
      </section>

      <Proof />
      <CTABand title="Let’s talk about your business" lede="Tell us what you’re running and we’ll show you exactly how DetectVision fits. We usually reply within one business day." />
    </>
  );
}
