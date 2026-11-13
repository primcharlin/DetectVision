import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Placeholder } from "@/components/ui/Placeholder";
import { CTABand } from "@/components/sections/CTABand";
import { site } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About us",
  description: "Why we built DetectVision, and how we work.",
};

const principles = [
  { title: "Private by default", body: "Your business data is yours. We design every feature so it stays that way." },
  { title: "Useful over impressive", body: "If a feature doesn’t save an owner time or money, it doesn’t ship." },
  { title: "Built with operators", body: "We design alongside the managers, shift leads and owners who use DetectVision every day." },
  { title: "Speak to every customer", body: "Our AI receptionist talks naturally in English and Mandarin, so no caller is left on hold." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About us"
        title="Helping owners make smarter decisions, in real time"
        lede="DetectVision is a real-time AI operating system for businesses, trusted by 300+ customers in 60+ cities."
      />

      <section className="bg-daylight py-24 sm:py-32">
        <Container className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <SectionIntro title="Our story" />
          <Reveal delay={0.1} className="space-y-5 text-[1.0625rem] leading-relaxed text-slate">
            <p>[How DetectVision started: the problem the founders saw first-hand, and the moment they decided to build something better.]</p>
            <p>[What you’ve built since: who uses DetectVision today, and what you’ve learned from them.]</p>
            <p>[Where you’re headed next.]</p>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <SectionIntro title="How we work" />
          <Stagger as="ul" stagger={0.1} className="mt-14 grid gap-px overflow-hidden rounded-[28px] bg-rule sm:grid-cols-2">
            {principles.map((p) => (
              <StaggerItem as="li" key={p.title} className="bg-white p-8 sm:p-10">
                <h3 className="font-sans text-xl font-semibold">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{p.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-daylight py-24 sm:py-32">
        <Container>
          <SectionIntro title="The team" lede="Add photos, names and roles for your founders and key team members." />
          <Stagger as="ul" stagger={0.1} className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <StaggerItem as="li" key={i}>
                <Placeholder label="Photo" className="aspect-[4/5] bg-white" />
                <p className="mt-4 font-semibold">[Name]</p>
                <p className="text-slate">[Role]</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section className="bg-paper py-24 sm:py-32">
        <Container>
          <SectionIntro title="Where to find us" />
          <Stagger as="ul" stagger={0.1} className="mt-14 grid gap-4 sm:grid-cols-2">
            {site.offices.map((o) => (
              <StaggerItem as="li" key={o.city} className="rounded-[32px] bg-white p-8 ring-1 ring-rule sm:p-10">
                <p className="text-[2rem] font-semibold tracking-[-0.04em]">{o.city}</p>
                <p className="mt-2 text-slate">{o.address}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <CTABand title="Want to work with us?" lede="Whether you’re a business owner, a partner or someone who wants to join the team, we’d like to hear from you." />
    </>
  );
}
