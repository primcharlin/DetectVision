import { Container } from "@/components/ui/Container";
import { Placeholder } from "@/components/ui/Placeholder";
import { Marquee } from "@/components/motion/Marquee";

export function LogoWall() {
  return (
    <section className="bg-paper py-10">
      <Container className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-14">
        <p className="max-w-[15rem] shrink-0 text-[0.95rem] leading-snug text-slate">A trusted partner for customer-led brands</p>
        <div className="min-w-0 flex-1">
          <Marquee>
            {Array.from({ length: 8 }).map((_, i) => (
              <Placeholder key={i} label="Client logo" className="h-14 w-40 shrink-0" />
            ))}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}
