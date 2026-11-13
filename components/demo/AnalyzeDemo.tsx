"use client";

import { AnimatePresence, motion, animate, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 340, damping: 28 } as const;
const checks = ["Reading your reviews", "Checking nearby competitors", "Finding your biggest gap"];
const placeholder = "Sample Bistro, Vancouver";

type Phase = "idle" | "analyzing" | "report";

/**
 * Front-end demo of the "Analyze Now" tool: shows the analysis steps and an example report.
 * The real analysis needs your backend; the CTA sends the business name to the contact form.
 */
export function AnalyzeDemo({ autoplay = true }: { autoplay?: boolean }) {
  const reduce = useReducedMotionSafe();
  const [business, setBusiness] = useState("");
  const [phase, setPhase] = useState<Phase>("idle");
  const [checked, setChecked] = useState(0);
  const [typed, setTyped] = useState("");
  const touched = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Type a sample business into the field, then run, unless the visitor starts typing first.
  useEffect(() => {
    if (!autoplay || reduce) return;
    let i = 0;
    const id = window.setInterval(() => {
      if (touched.current) return window.clearInterval(id);
      i++;
      setTyped(placeholder.slice(0, i));
      if (i >= placeholder.length) {
        window.clearInterval(id);
        window.setTimeout(() => !touched.current && start(), 500);
      }
    }, 55);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, reduce]);

  useEffect(() => {
    if (phase !== "analyzing") return;
    if (checked >= checks.length) {
      const id = window.setTimeout(() => setPhase("report"), 350);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setChecked((c) => c + 1), reduce ? 0 : 750);
    return () => window.clearTimeout(id);
  }, [phase, checked, reduce]);

  function start() {
    setChecked(0);
    setPhase("analyzing");
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    touched.current = true;
    if (!business.trim()) setBusiness(typed || placeholder);
    start();
  }

  const ownName = touched.current && business.trim() && business.trim() !== placeholder ? business.trim() : "";
  const value = touched.current ? business : typed;

  return (
    <div id="analyze" className="relative w-full scroll-mt-28 overflow-hidden rounded-[30px] bg-white text-ink shadow-[0_40px_100px_-40px_rgba(20,20,20,0.35)] ring-1 ring-rule">
      <div className="flex items-center gap-2.5 border-b border-rule px-5 py-3.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-signal">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" /></svg>
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold">Free business analysis</p>
          <p className="truncate text-xs text-slate">Tell us your business and we’ll analyze it, free.</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="flex gap-2 p-4">
        <label htmlFor="analyze-input" className="sr-only">Business name and city</label>
        <input
          ref={inputRef}
          id="analyze-input"
          value={value}
          onChange={(e) => {
            touched.current = true;
            setBusiness(e.target.value);
          }}
          onFocus={() => {
            if (!touched.current) {
              touched.current = true;
              setBusiness("");
              setPhase("idle");
            }
          }}
          placeholder="Business name and city"
          className="min-h-12 min-w-0 flex-1 rounded-full bg-paper px-5 text-[15px] ring-1 ring-rule placeholder:text-slate focus:outline-none focus:ring-2 focus:ring-ink"
        />
        <button type="submit" disabled={phase === "analyzing"} className="min-h-12 shrink-0 rounded-full bg-ink px-5 text-[15px] font-semibold text-white transition-[background-color,transform] hover:bg-ink-2 active:scale-[0.97] disabled:opacity-60">
          Analyze
        </button>
      </form>

      <div className="relative min-h-[330px] px-4 pb-4" aria-live="polite">
        <AnimatePresence mode="wait">
          {phase === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid h-[330px] place-items-center rounded-2xl bg-paper text-center">
              <div className="max-w-[16rem]">
                <p className="text-sm font-semibold">Your report will appear here</p>
                <p className="mt-1 text-sm text-slate">Reviews, competitors and your biggest opportunity, in seconds.</p>
              </div>
            </motion.div>
          )}

          {phase === "analyzing" && (
            <motion.ul key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} className="flex h-[330px] flex-col justify-center gap-4 rounded-2xl bg-paper px-6">
              {checks.map((c, i) => {
                const state = i < checked ? "done" : i === checked ? "active" : "todo";
                return (
                  <li key={c} className="flex items-center gap-3 text-[15px]">
                    <span className="relative flex h-6 w-6 items-center justify-center">
                      {state === "active" && (
                        <motion.span className="absolute inset-0 rounded-full border-2 border-ink/15 border-t-ink" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                      )}
                      {state === "done" && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={spring} className="flex h-6 w-6 items-center justify-center rounded-full bg-ink text-white">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                        </motion.span>
                      )}
                      {state === "todo" && <span className="h-2 w-2 rounded-full bg-ink/20" />}
                    </span>
                    <span className={state === "todo" ? "text-slate" : "font-medium"}>{c}…</span>
                  </li>
                );
              })}
            </motion.ul>
          )}

          {phase === "report" && <Report key="report" ownName={ownName} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const v = useMotionValue(0);
  const dash = useTransform(v, (n) => `${(n / 5) * 113} 113`);
  const label = useTransform(v, (n) => n.toFixed(1));
  useEffect(() => {
    const c = animate(v, score, { duration: 1.2, ease });
    return () => c.stop();
  }, [score, v]);
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg viewBox="0 0 40 40" className="h-16 w-16 -rotate-90" aria-hidden="true">
        <circle cx="20" cy="20" r="18" fill="none" stroke="#e3e1da" strokeWidth="3.5" />
        <motion.circle cx="20" cy="20" r="18" fill="none" stroke="#141414" strokeWidth="3.5" strokeLinecap="round" style={{ strokeDasharray: dash }} />
      </svg>
      <motion.span className="absolute inset-0 grid place-items-center text-[17px] font-bold tabular-nums">{label}</motion.span>
    </div>
  );
}

function Report({ ownName }: { ownName: string }) {
  const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } } };
  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit={{ opacity: 0 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className="flex min-h-[330px] flex-col gap-2.5"
    >
      <motion.div variants={item} className="flex items-center gap-4 rounded-2xl bg-paper p-4">
        <ScoreRing score={4.4} />
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate">Example report · Overall: Great</p>
          <p className="truncate text-[17px] font-semibold">Sample Bistro</p>
          <p className="text-xs text-slate">4.4 · 128 reviews</p>
        </div>
      </motion.div>
      <motion.div variants={item} className="rounded-2xl bg-signal/15 p-4">
        <p className="text-xs font-semibold text-signal-deep">Biggest gap</p>
        <p className="mt-0.5 text-[14.5px] font-medium">Diners can’t order from you online yet.</p>
      </motion.div>
      <motion.div variants={item} className="rounded-2xl bg-paper p-4">
        <p className="text-xs font-semibold text-slate">Strongest asset</p>
        <p className="mt-0.5 text-[14.5px]">Guests love the seasonal bistro menu and cosy room.</p>
      </motion.div>
      <motion.div variants={item} className="rounded-2xl bg-paper p-4">
        <p className="text-xs font-semibold text-slate">Nearby competitors</p>
        <div className="mt-1.5 space-y-1 text-[14px]">
          <div className="flex justify-between"><span>The Corner Café</span><span className="text-slate">4.2 · 0.4 km</span></div>
          <div className="flex justify-between"><span>Le Petit Bistro</span><span className="text-slate">3.9 · 0.7 km</span></div>
        </div>
      </motion.div>
      <motion.div variants={item}>
        <Link
          href={ownName ? `/contact?business=${encodeURIComponent(ownName)}` : "/contact"}
          className="flex min-h-12 items-center justify-center rounded-full bg-ink px-5 text-[15px] font-semibold text-white transition-[background-color,transform] hover:bg-ink-2 active:scale-[0.98]"
        >
          {ownName ? `Get the full report for ${ownName.length > 22 ? ownName.slice(0, 22) + "…" : ownName}` : "Get your full free report"}
        </Link>
      </motion.div>
    </motion.div>
  );
}
