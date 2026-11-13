import type { ReactNode } from "react";
import { Container } from "./Container";
import { Reveal } from "@/components/motion/Reveal";

/** Light, centered page opener with oversized type, shared by every inner page. */
export function PageHero({ kicker, title, lede, children }: { kicker: string; title: ReactNode; lede: ReactNode; children?: ReactNode }) {
  return (
    <section className="bg-paper pb-16 pt-40 text-center sm:pb-24 sm:pt-48">
      <Container className="flex flex-col items-center">
        <Reveal y={12}><p className="text-[1rem] font-semibold text-slate">{kicker}</p></Reveal>
        <Reveal delay={0.08} y={36}>
          <h1 className="mx-auto mt-5 max-w-[60rem] text-[length:var(--text-display)] leading-[0.95] tracking-[-0.05em]">{title}</h1>
        </Reveal>
        <Reveal delay={0.2}><p className="mx-auto mt-8 max-w-[40rem] text-[length:var(--text-lede)] leading-relaxed text-slate">{lede}</p></Reveal>
        {children && <Reveal delay={0.32} className="flex justify-center">{children}</Reveal>}
      </Container>
    </section>
  );
}

/** Faint floor-plan grid, used as texture on dark panels. */
export function GridBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(234,240,248,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(234,240,248,0.06)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
    />
  );
}
