import type { Metadata } from "next";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { CTABand } from "@/components/sections/CTABand";
import { Reveal, Stagger, StaggerItem, WipeReveal } from "@/components/motion/Reveal";
import { industries, products } from "@/lib/content";

export const metadata: Metadata = {
  title: "Industries",
  description: "How restaurants, cafés, retailers, hotels and multi-location groups use DetectVision.",
};

const byName = Object.fromEntries(products.map((p) => [p.name, p]));

export default function IndustriesPage() {
  return (
    <>
      <PageHero kicker="Industries" title="Built around how your business actually runs" lede="A restaurant at dinner rush and a hotel at midnight need different things. Here’s how each one puts DetectVision to work.">
        <nav aria-label="Industries on this page" className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((ind) => (
            <a key={ind.slug} href={`#${ind.slug}`} className="min-h-11 rounded-full bg-white px-5 py-2.5 text-[0.95rem] font-medium text-ink ring-1 ring-rule transition-colors hover:bg-ink hover:text-white">
              {ind.name}
            </a>
          ))}
        </nav>
      </PageHero>

      {industries.map((ind, i) => (
        <section key={ind.slug} id={ind.slug} className="scroll-mt-20 bg-paper py-16 sm:py-20">
          <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
            <Reveal className={clsx(i % 2 && "lg:order-2")}>
              <h2 className="text-[length:var(--text-panel)] leading-[1.02] tracking-[-0.045em]">{ind.name}</h2>
              <p className="mt-5 text-[length:var(--text-lede)] leading-relaxed text-slate">{ind.summary}</p>
              <Stagger as="ul" stagger={0.1} className="mt-8 divide-y divide-rule border-y border-rule">
                {ind.uses.map((u) => (
                  <StaggerItem as="li" key={u} className="py-4 text-[1.0625rem]">{u}</StaggerItem>
                ))}
              </Stagger>
            </Reveal>
            <div className={clsx("relative", i % 2 && "lg:order-1")}>
              <WipeReveal>
                <Placeholder label={`Photo: ${ind.name.toLowerCase()}`} className="aspect-[4/3] w-full rounded-[32px] bg-white" />
              </WipeReveal>
              <Stagger stagger={0.12} className="absolute inset-x-4 bottom-4 rounded-3xl bg-ink p-5 text-white shadow-2xl sm:inset-x-6 sm:bottom-6">
                <StaggerItem>
                  <p className="text-xs font-semibold text-white/60">Recommended setup</p>
                </StaggerItem>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {ind.products.map((name) => (
                    <StaggerItem key={name} className="rounded-2xl bg-white/[0.08] px-3.5 py-2.5">
                      <p className="text-sm font-bold">{name}</p>
                      <p className="text-xs text-white/60">{byName[name]?.category}</p>
                    </StaggerItem>
                  ))}
                </div>
              </Stagger>
            </div>
          </Container>
        </section>
      ))}

      <CTABand title="Don’t see your industry?" lede="If your business runs on people, cameras, calls or deliveries, DetectVision can likely help. Tell us about it." />
    </>
  );
}
