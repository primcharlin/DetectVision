import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { results, stats, testimonial } from "@/lib/content";

export function Proof() {
  return (
    <section className="bg-paper py-28 sm:py-36">
      <Container>
        <Reveal>
          <p className="text-[1rem] font-semibold text-slate">By the numbers</p>
          <h2 className="mt-4 max-w-[48rem] text-[length:var(--text-title)] leading-[1] tracking-[-0.05em]">Proven results you can measure</h2>
        </Reveal>
        <Stagger as="dl" stagger={0.1} className="mt-16 grid gap-x-8 gap-y-12 border-t border-rule pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((s) => (
            <StaggerItem key={s.label} className="flex flex-col">
              <dt className="order-2 mt-3 text-[1.0625rem] text-slate">{s.label}</dt>
              <dd className="text-[clamp(2.75rem,2rem+2.4vw,4rem)] font-semibold leading-none tracking-[-0.05em]">
                <CountUp value={s.value} />
              </dd>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-24">
          <figure className="rounded-[36px] bg-white p-8 ring-1 ring-rule sm:p-14">
            <blockquote className="max-w-[56rem] text-[clamp(1.75rem,1.2rem+2vw,3rem)] font-semibold leading-[1.12] tracking-[-0.035em]">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-slate">{testimonial.role}</p>
              </div>
              <dl className="flex gap-12">
                {stats.map((s) => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="order-2 text-slate">{s.label}</dt>
                    <dd className="text-[2.75rem] font-semibold leading-none tracking-[-0.05em]">
                      <CountUp value={s.value} />
                    </dd>
                  </div>
                ))}
              </dl>
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
