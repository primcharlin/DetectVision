"use client";

import { motion, useScroll, useTransform, animate, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import clsx from "clsx";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

function RevenueCard() {
  const v = useMotionValue(42000);
  const [n, setN] = useState(42000);
  useEffect(() => {
    const c = animate(v, 50000, { duration: 2.2, delay: 1, ease: [0.22, 1, 0.36, 1], onUpdate: (x) => setN(Math.round(x)) });
    return () => c.stop();
  }, [v]);
  const bars = [28, 36, 30, 44, 40, 52, 60];
  return (
    <div className="w-[220px] rounded-3xl bg-white p-4 text-ink shadow-[0_24px_60px_-24px_rgba(20,20,20,0.35)] ring-1 ring-rule">
      <p className="text-xs font-semibold text-slate">Revenue this month</p>
      <p className="mt-1 text-[22px] font-bold tabular-nums tracking-[-0.02em]">${n.toLocaleString("en-US")}</p>
      <p className="text-xs font-semibold text-[#1a8f4c]">↑ 12%</p>
      <div className="mt-3 flex h-10 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span key={i} className={clsx("flex-1 rounded-sm", i === bars.length - 1 ? "bg-ink" : "bg-ink/15")} initial={{ height: 0 }} animate={{ height: `${h * 1.6}%` }} transition={{ delay: 1 + i * 0.08, duration: 0.6 }} />
        ))}
      </div>
    </div>
  );
}

function CameraCard() {
  return (
    <div className="w-[220px] rounded-3xl bg-ink p-4 text-white shadow-[0_24px_60px_-24px_rgba(20,20,20,0.5)]">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-white/60">Smart camera</p>
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70 motion-reduce:hidden" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-signal" />
        </span>
      </div>
      <div className="relative mt-2.5 h-16 overflow-hidden rounded-xl bg-white/[0.06] [background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:12px_12px]">
        <motion.div className="absolute left-[44%] top-[18%] h-[66%] w-[16%] rounded border-2 border-signal" initial={{ scale: 1.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 1.6, duration: 0.5 }} />
      </div>
      <p className="mt-2.5 text-sm font-semibold">Abnormal event</p>
      <p className="text-xs text-white/60">Camera 05</p>
    </div>
  );
}

function RobotCard() {
  return (
    <div className="w-[220px] rounded-3xl bg-sky p-4 text-ink shadow-[0_24px_60px_-24px_rgba(20,20,20,0.35)]">
      <p className="text-xs font-semibold text-ink/60">Delivery robot</p>
      <p className="mt-1 text-sm font-semibold">Serving Table 13</p>
      <div className="relative mt-3 h-2 rounded-full bg-ink/10">
        <motion.span className="absolute left-0 top-0 h-2 rounded-full bg-ink" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ delay: 1.2, duration: 2.4, ease: [0.65, 0, 0.35, 1] }} />
        <motion.span className="absolute -top-[7px] flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-ink ring-4 ring-sky" initial={{ left: "0%" }} animate={{ left: "100%" }} transition={{ delay: 1.2, duration: 2.4, ease: [0.65, 0, 0.35, 1] }} />
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-ink/60"><span>Kitchen</span><span>Table 13</span></div>
    </div>
  );
}

/** Live status cards that float around the analyzer, drifting at different speeds on scroll. */
export function FloatingCards({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotionSafe();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const bob = (d: number) => (reduce ? {} : { y: [0, -8, 0], transition: { duration: 5 + d, repeat: Infinity, ease: "easeInOut" as const } });
  const enter = (delay: number, x: number) => ({ initial: { opacity: 0, x, scale: 0.94 }, animate: { opacity: 1, x: 0, scale: 1 }, transition: { delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <div ref={ref} className="relative mx-auto max-w-[1100px]">
      <div className="relative z-10 mx-auto max-w-[460px]">{children}</div>
      {/* Desktop: cards orbit the analyzer */}
      <motion.div style={reduce ? undefined : { y: y1 }} className="absolute left-0 top-[8%] hidden lg:block xl:left-4" {...enter(0.7, -30)}>
        <motion.div animate={bob(0)}><RevenueCard /></motion.div>
      </motion.div>
      <motion.div style={reduce ? undefined : { y: y2 }} className="absolute right-0 top-[4%] hidden lg:block xl:right-4" {...enter(0.85, 30)}>
        <motion.div animate={bob(1)}><CameraCard /></motion.div>
      </motion.div>
      <motion.div style={reduce ? undefined : { y: y3 }} className="absolute bottom-[10%] right-[2%] hidden lg:block xl:right-10" {...enter(1, 30)}>
        <motion.div animate={bob(0.5)}><RobotCard /></motion.div>
      </motion.div>
      {/* Mobile and tablet: cards scroll sideways under the analyzer */}
      <div className="-mx-5 mt-6 flex snap-x gap-3 overflow-x-auto px-5 pb-2 lg:hidden">
        <div className="snap-start"><RevenueCard /></div>
        <div className="snap-start"><CameraCard /></div>
        <div className="snap-start"><RobotCard /></div>
      </div>
    </div>
  );
}
