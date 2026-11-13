import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { DemoForm } from "@/components/sections/DemoForm";
import { FAQ } from "@/components/sections/FAQ";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Tell us what you’re running and we’ll show you exactly how DetectVision fits.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero kicker="Contact" title="Let’s talk about your business" lede="Tell us what you’re running and we’ll show you exactly how DetectVision fits. We usually reply within one business day." />

      <section className="bg-paper pb-24 sm:pb-32">
        <Container className="grid gap-12 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal delay={0.25} y={40} className="relative">
            <DemoForm />
          </Reveal>
          <Stagger as="div" stagger={0.1} className="space-y-3">
            <StaggerItem>
              <a href={`mailto:${site.email}`} className="group block rounded-3xl bg-white p-6 ring-1 ring-rule transition-colors hover:bg-ink hover:text-white">
                <p className="text-sm font-semibold text-slate group-hover:text-white/60">Email us</p>
                <p className="mt-1 text-lg font-semibold">{site.email}</p>
              </a>
            </StaggerItem>
            <StaggerItem>
              <a href={site.phoneHref} className="group block rounded-3xl bg-white p-6 ring-1 ring-rule transition-colors hover:bg-ink hover:text-white">
                <p className="text-sm font-semibold text-slate group-hover:text-white/60">Call us</p>
                <p className="mt-1 text-lg font-semibold">{site.phone}</p>
                <p className="mt-1 text-sm text-slate group-hover:text-white/60">Our AI receptionist answers in seconds, 24/7.</p>
              </a>
            </StaggerItem>
            {site.offices.map((o) => (
              <StaggerItem key={o.city}>
                <div className="rounded-3xl bg-white p-6 ring-1 ring-rule">
                  <p className="text-sm font-semibold text-slate">{o.city}</p>
                  <p className="mt-1 text-[1.0625rem] font-medium">{o.address}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      <section id="faq" className="scroll-mt-20 bg-paper py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionIntro title="Frequently asked questions" />
          <FAQ items={faqs} />
        </Container>
      </section>
    </>
  );
}
