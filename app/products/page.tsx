import type { Metadata } from "next";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { CTABand } from "@/components/sections/CTABand";
import { Pricing } from "@/components/sections/Pricing";
import { CameraMock, RobotMock, VisionMock, VoiceMock } from "@/components/demo/ModuleMocks";

const productMocks = { vision: VisionMock, voice: VoiceMock, robot: RobotMock, camera: CameraMock };
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Products",
  description: "D-Vision, D-Voice, D-ROBOT and D-Camera: four products, one private, secure AI system.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        kicker="Products"
        title="Four products. One private AI system."
        lede="Intelligent monitoring, an always-on AI receptionist, robotic delivery and enterprise cameras. Start with what your floor needs, add the rest anytime."
      >
        <nav aria-label="Products on this page" className="mt-10 flex flex-wrap justify-center gap-2">
          {products.map((p) => (
            <a key={p.id} href={`#${p.id}`} className="min-h-11 rounded-full bg-white px-5 py-2.5 text-[0.95rem] font-medium text-ink ring-1 ring-rule transition-colors hover:bg-ink hover:text-white">
              {p.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {products.map((p, i) => {
        const Mock = productMocks[p.id];
        return (
          <section key={p.id} id={p.id} className="scroll-mt-24 bg-paper py-12 sm:py-16">
            <Container className="max-w-[1320px]">
              <div className={clsx("grid items-center gap-12 [&>*]:min-w-0 rounded-[36px] p-7 sm:rounded-[44px] sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16", i % 2 ? "bg-white ring-1 ring-rule" : "bg-sand/60")}>
                <Reveal className={clsx(i % 2 && "lg:order-2")}>
                  <p className="text-[1rem] font-semibold text-slate">{p.name} · {p.category}</p>
                  <h2 className="mt-4 text-[length:var(--text-panel)] leading-[1.02] tracking-[-0.045em]">{p.headline}</h2>
                  <p className="mt-6 text-[1.125rem] leading-relaxed text-slate">{p.summary}</p>
                  <Stagger as="ul" stagger={0.08} className="mt-8 space-y-3">
                    {p.features.map((f) => (
                      <StaggerItem as="li" key={f} className="flex gap-3 text-[1.0625rem]">
                        <svg className="mt-1 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                        {f}
                      </StaggerItem>
                    ))}
                    {p.pro?.map((f) => (
                      <StaggerItem as="li" key={f} className="flex gap-3 text-[1.0625rem]">
                        <svg className="mt-1 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                        <span>{f} <span className="ml-1 rounded-full bg-signal px-1.5 py-px text-[11px] font-bold">PRO</span></span>
                      </StaggerItem>
                    ))}
                  </Stagger>
                </Reveal>
                <div className={clsx(i % 2 && "lg:order-1")}>
                  <Mock />
                </div>
              </div>
            </Container>
          </section>
        );
      })}

      <section id="pricing" className="scroll-mt-24 bg-paper py-28 sm:py-36">
        <Container>
          <div className="mb-14 text-center">
            <SectionIntro title="Simple, transparent pricing" lede="Each product comes in two tiers. Subscribe to only what your floor needs." className="mx-auto" />
          </div>
          <Pricing />
        </Container>
      </section>

      <CTABand title="Find the right starting point" lede="Tell us how your business runs today. We’ll show you which products will make the biggest difference first." />
    </>
  );
}
