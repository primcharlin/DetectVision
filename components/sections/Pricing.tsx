"use client";

import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { pricing } from "@/lib/content";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

type Tier = "base" | "pro";

function Price({ value }: { value: number }) {
  const v = useMotionValue(value);
  const text = useTransform(v, (n) => `US$${Math.round(n).toLocaleString("en-US")}`);
  useEffect(() => {
    const c = animate(v, value, { duration: 0.6, ease: [0.22, 1, 0.36, 1] });
    return () => c.stop();
  }, [value, v]);
  return <motion.span className="tabular-nums">{text}</motion.span>;
}

/** Four products, each with a Base and Pro plan. One switch changes every card. */
export function Pricing() {
  const [tier, setTier] = useState<Tier>("base");
  return (
    <div>
      <div className="flex justify-center">
        <div role="radiogroup" aria-label="Plan" className="inline-flex rounded-full bg-white p-1.5 ring-1 ring-rule">
          {(["base", "pro"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="radio"
              aria-checked={tier === t}
              onClick={() => setTier(t)}
              className={clsx("relative min-h-11 rounded-full px-7 text-[1rem] font-semibold transition-colors", tier === t ? "text-white" : "text-slate hover:text-ink")}
            >
              {tier === t && <motion.span layoutId="tier-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
              <span className="relative">{t === "base" ? "Base" : "Pro"}</span>
            </button>
          ))}
        </div>
      </div>

      <Stagger stagger={0.08} className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {pricing.map((p) => (
          <StaggerItem key={p.id} className={clsx("relative flex flex-col rounded-[30px] p-7 ring-1", p.popular ? "bg-ink text-white ring-ink" : "bg-white ring-rule")}>
            <div className="flex items-center justify-between">
              <h3 className="text-[1.5rem] tracking-[-0.03em]">{p.name}</h3>
              {p.popular && <span className="rounded-full bg-signal px-2.5 py-1 text-xs font-bold text-ink">Most popular</span>}
            </div>
            <p className="mt-6 text-[2.5rem] font-semibold leading-none tracking-[-0.04em]">
              <Price value={tier === "base" ? p.base : p.pro} />
            </p>
            <p className={clsx("mt-2 text-sm", p.popular ? "text-white/60" : "text-slate")}>
              {p.unit === "/month" ? "per month" : "one-time"}
              {p.note && ` · ${p.note}`}
            </p>
            <p className={clsx("mt-5 text-[0.975rem] leading-relaxed", p.popular ? "text-white/75" : "text-slate")}>{p.blurb}</p>
            <ul className="mt-6 space-y-2.5 text-[0.95rem]">
              {p.base_features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <Check on />
                  {f}
                </li>
              ))}
              {p.pro_features.map((f) => (
                <li key={f} className={clsx("flex gap-2.5 transition-opacity duration-300", tier === "pro" ? "opacity-100" : "opacity-45")}>
                  <Check on={tier === "pro"} />
                  <span>
                    {f} <span className="ml-1 rounded-full bg-signal px-1.5 py-px text-[10px] font-bold text-ink">PRO</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">
              <Link
                href={`/contact?product=${encodeURIComponent(p.name)}&plan=${tier}`}
                className={clsx("flex min-h-12 items-center justify-center rounded-full font-semibold transition-[background-color,transform] active:scale-[0.97]", p.popular ? "bg-white text-ink hover:bg-paper" : "bg-ink text-white hover:bg-ink-2")}
              >
                Get started
              </Link>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <p className="mt-6 text-center text-sm text-slate">Prices in USD. Subscribe only to what your floor needs, and add features or customization anytime.</p>
    </div>
  );
}

function Check({ on }: { on: boolean }) {
  return (
    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
        <motion.path d="M5 12l5 5L20 7" initial={false} animate={{ pathLength: on ? 1 : 0, opacity: on ? 1 : 0.4 }} transition={{ duration: 0.35 }} />
        {!on && <path d="M7 12h10" opacity="0.5" />}
      </svg>
    </span>
  );
}
