import type { Metadata } from "next";
import clsx from "clsx";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { CTABand } from "@/components/sections/CTABand";
import { SolutionDemo } from "@/components/demo/SolutionDemo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { solutions } from "@/lib/content";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Never miss a call, catch problems early, serve guests faster and know your numbers.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero kicker="Solutions" title="Start with the problem you want gone" lede="DetectVision is one system, but every business comes to it for a reason. Here are the ones we hear most.">
        <nav aria-label="Solutions on this page" className="mt-10 flex flex-wrap justify-center gap-2">
          {solutions.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="min-h-11 rounded-full bg-white px-5 py-2.5 text-[0.95rem] font-medium text-ink ring-1 ring-rule transition-colors hover:bg-ink hover:text-white">
              {s.name}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="bg-paper pb-12">
        {solutions.map((s, i) => (
          <section key={s.slug} id={s.slug} className="scroll-mt-24 py-12 sm:py-16">
            <Container className="max-w-[1320px]">
              <div className={clsx("grid items-center gap-12 [&>*]:min-w-0 rounded-[36px] p-7 sm:rounded-[44px] sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16", i % 2 ? "bg-sky/70" : "bg-white ring-1 ring-rule")}>
                <Reveal className={clsx(i % 2 && "lg:order-2")}>
                  <div className="flex flex-wrap gap-2">
                    {s.products.map((p) => (
                      <span key={p} className="rounded-full bg-ink px-3 py-1 text-xs font-bold text-white">{p}</span>
                    ))}
                  </div>
                  <h2 className="mt-6 text-[length:var(--text-panel)] leading-[1.02] tracking-[-0.045em]">{s.name}</h2>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-slate">The problem</h3>
                      <p className="mt-2 text-[1.0625rem] leading-relaxed">{s.problem}</p>
                    </div>
                    <div>
                      <h3 className="font-sans text-sm font-semibold text-slate">With DetectVision</h3>
                      <p className="mt-2 text-[1.0625rem] leading-relaxed">{s.answer}</p>
                    </div>
                  </div>
                  <Stagger as="ul" stagger={0.1} className="mt-8 flex flex-wrap gap-2">
                    {s.outcomes.map((o) => (
                      <StaggerItem as="li" key={o} className="rounded-full bg-paper px-4 py-2 text-[0.95rem] font-medium ring-1 ring-rule">{o}</StaggerItem>
                    ))}
                  </Stagger>
                </Reveal>
                <div className={clsx(i % 2 && "lg:order-1")}>
                  <SolutionDemo slug={s.slug} />
                </div>
              </div>
            </Container>
          </section>
        ))}
      </div>

      <CTABand />
    </>
  );
}
