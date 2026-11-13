import Link from "next/link";
import { industries } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/** Industry rows: a quiet, list-like layout rather than a card grid. */
export function IndustryList({ limit }: { limit?: number }) {
  const items = limit ? industries.slice(0, limit) : industries;
  return (
    <Stagger as="ul" stagger={0.1} className="mt-14 border-t border-rule">
      {items.map((ind) => (
        <StaggerItem as="li" key={ind.slug} className="border-b border-rule">
          <Link
            href={`/industries#${ind.slug}`}
            className="group grid gap-2 py-7 transition-colors sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)_auto] sm:items-center sm:gap-10"
          >
            <span className="font-display text-[1.75rem] font-semibold tracking-[-0.025em] transition-transform duration-300 group-hover:translate-x-1.5">{ind.name}</span>
            <span className="text-slate">{ind.summary}</span>
            <span aria-hidden="true" className="hidden h-11 w-11 items-center justify-center rounded-full border border-rule transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-mist sm:flex">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </span>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
