import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { GridBackdrop } from "@/components/ui/PageHero";
import { ScrollLine } from "@/components/motion/ScrollLine";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

const steps = [
  {
    title: "Tell us what you’re running",
    body: "Pick the products your floor needs. DetectVision works with your existing cameras and hardware, in the cloud or on-premise.",
    chips: ["D-Vision", "D-Voice", "D-ROBOT", "D-Camera"],
  },
  {
    title: "Our specialists set it up",
    body: "We handle the full setup and walk your team through how to use it day to day. No technical experience needed."
  },
  {
    title: "See what matters, act with confidence",
    body: "Alerts, call summaries and deliveries all land in one private, secure system, so you can make better decisions, faster.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-paper px-3 sm:px-5">
      <div className="relative mx-auto max-w-[1400px] overflow-hidden rounded-[32px] bg-harbor py-24 text-mist sm:rounded-[44px] sm:py-32">
      <GridBackdrop />
      <Container className="relative">
        <SectionIntro tone="dark" title="Up and running in three steps" lede="If you can use a phone, computer or tablet, you can use DetectVision." />
        <ScrollLine className="mt-16" />
        <Stagger as="ol" stagger={0.18} className="mt-px grid gap-px overflow-hidden rounded-b-[28px] bg-white/10 lg:grid-cols-3">
          {steps.map((s, i) => (
            <StaggerItem as="li" key={s.title} className="flex flex-col bg-harbor p-8 sm:p-10">
              <span className="font-display text-[3.5rem] font-semibold leading-none tracking-[-0.04em] text-signal">{i + 1}</span>
              <h3 className="mt-8 font-sans text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-fog">{s.body}</p>
              {s.chips && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <li key={c} className="rounded-full border border-white/15 px-3 py-1 text-sm text-mist transition-colors hover:border-signal hover:text-signal">{c}</li>
                  ))}
                </ul>
              )}
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
      </div>
    </section>
  );
}
