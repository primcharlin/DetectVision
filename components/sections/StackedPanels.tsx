"use client";

import Link from "next/link";
import clsx from "clsx";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { products, type Product } from "@/lib/content";
import { Logo } from "@/components/ui/Logo";
import { productMocks } from "@/components/demo/ModuleMocks";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const themes = {
  vision: { panel: "bg-harbor text-white", sub: "text-fog", chip: "bg-white/10", button: "bg-white text-ink hover:bg-paper" },
  voice: { panel: "bg-sky text-ink", sub: "text-ink/70", chip: "bg-ink/[0.07]", button: "bg-ink text-white hover:bg-ink-2" },
  robot: { panel: "bg-sand text-ink", sub: "text-ink/70", chip: "bg-ink/[0.07]", button: "bg-ink text-white hover:bg-ink-2" },
  camera: { panel: "bg-ink text-white", sub: "text-white/65", chip: "bg-white/10", button: "bg-white text-ink hover:bg-paper" },
} as const;

/**
 * Full-width product panels that pin and stack on large screens:
 * each panel sticks while the next slides over it, and the ones underneath ease back and dim.
 */
export function StackedPanels() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <div ref={ref} className="relative">
      {products.map((p, i) => (
        <Panel key={p.id} index={i} total={products.length} progress={scrollYProgress} product={p} />
      ))}
    </div>
  );
}

function Panel({ index, total, progress, product: p }: { index: number; total: number; progress: MotionValue<number>; product: Product }) {
  const reduce = useReducedMotionSafe();
  const end = 1 - (total - 1 - index) * 0.045;
  const scale = useTransform(progress, [index / total, 1], [1, end]);
  const dim = useTransform(progress, [index / total, Math.min(1, (index + 1) / total)], [0, index === total - 1 ? 0 : 0.3]);
  const t = themes[p.id];
  const Mock = productMocks[p.id];

  return (
    <div id={`panel-${p.id}`} className="scroll-mt-24 py-2 lg:sticky lg:top-0 lg:flex lg:h-screen lg:items-center lg:py-0">
      <motion.article style={reduce ? undefined : { scale, top: `calc(${index * 22}px)` }} className={clsx("relative w-full origin-top overflow-hidden rounded-[32px] sm:rounded-[44px]", t.panel)}>
        <div className="grid items-center gap-10 [&>*]:min-w-0 p-7 sm:p-12 lg:min-h-[min(84vh,780px)] lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:p-16">
          <div>
            <div className="flex items-center gap-2.5 text-[1.05rem] font-semibold">
              <Logo className="h-7 w-7" />
              <span className="font-bold tracking-[-0.03em]">{p.name}</span>
              <span className={t.sub}>{p.category}</span>
            </div>
            <h2 className="mt-8 text-[length:var(--text-panel)] leading-[1.02] tracking-[-0.045em]">{p.headline}</h2>
            <p className={clsx("mt-6 max-w-[34rem] text-[1.125rem] leading-relaxed", t.sub)}>{p.summary}</p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {p.features.map((f) => (
                <li key={f} className={clsx("rounded-full px-3.5 py-1.5 text-sm font-medium", t.chip)}>{f}</li>
              ))}
              {p.pro?.map((f) => (
                <li key={f} className={clsx("flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium", t.chip)}>
                  {f}
                  <span className="rounded-full bg-signal px-1.5 text-[10px] font-bold text-ink">PRO</span>
                </li>
              ))}
            </ul>
            <Link href={`/products#${p.id}`} className={clsx("mt-9 inline-flex min-h-12 items-center rounded-full px-7 font-semibold transition-[background-color,transform] active:scale-[0.97]", t.button)}>
              Learn about {p.name}
            </Link>
          </div>
          <Mock />
        </div>
        {!reduce && <motion.div aria-hidden="true" style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-black" />}
      </motion.article>
    </div>
  );
}
