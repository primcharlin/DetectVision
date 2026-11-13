import { JumpLink } from "@/components/ui/JumpLink";
import { products } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Oversized product index: one row per product, linking to its panel below. */
export function ProductRows() {
  return (
    <Stagger as="ul" stagger={0.08} className="border-t border-rule">
      {products.map((p) => (
        <StaggerItem as="li" key={p.id} className="border-b border-rule">
          <JumpLink href={`#panel-${p.id}`} className="group flex flex-col gap-2 py-7 sm:flex-row sm:items-center sm:gap-10 sm:py-9">
            <span className="text-[clamp(2.5rem,1.6rem+3.6vw,5rem)] font-semibold leading-none tracking-[-0.05em] transition-transform duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-3 sm:w-[40%] sm:shrink-0">
              {p.name}
            </span>
            <span className="flex-1">
              <span className="block text-[0.95rem] font-semibold text-slate">{p.category}</span>
              <span className="mt-0.5 block text-[1.125rem] leading-snug text-ink/80 transition-colors group-hover:text-ink">{p.headline}</span>
            </span>
            <span aria-hidden="true" className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white ring-1 ring-rule transition-all duration-500 group-hover:bg-ink group-hover:text-white group-hover:ring-ink sm:flex">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-500 group-hover:translate-y-0.5"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            </span>
          </JumpLink>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
