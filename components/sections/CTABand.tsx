import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

/** Closing call to action: centered, oversized, quiet. */
export function CTABand({
  title = "Built for businesses that never stand still",
  lede = "Book a 30-minute walkthrough, set up around your own locations, cameras and robots.",
}: {
  title?: string;
  lede?: string;
}) {
  return (
    <section className="bg-paper py-28 text-center sm:py-40">
      <Container className="flex flex-col items-center">
        <Reveal y={40}>
          <h2 className="mx-auto max-w-[56rem] text-[length:var(--text-title)] leading-[0.98] tracking-[-0.05em]">{title}</h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-7 max-w-[36rem] text-[length:var(--text-lede)] leading-relaxed text-slate">{lede}</p>
        </Reveal>
        <Reveal delay={0.22} className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/contact">Book a demo</ButtonLink>
          <ButtonLink href="/products" variant="outline-light">Explore the platform</ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
