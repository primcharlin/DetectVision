"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { useSequence } from "@/components/motion/useSequence";
import { useReducedMotionSafe } from "@/components/motion/useReducedMotionSafe";

const ease = [0.22, 1, 0.36, 1] as const;
const spring = { type: "spring", stiffness: 380, damping: 28 } as const;

function Shell({ title, live, children, onReplay, done, label }: { title: string; live?: string; children: ReactNode; onReplay?: () => void; done?: boolean; label: string }) {
  return (
    <div className="rounded-[26px] border border-white/10 bg-[#0f1b2f] p-4 text-mist shadow-[0_30px_80px_-30px_rgba(0,0,0,0.55)] sm:p-5" aria-label={label} role="img">
      <div className="mb-4 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">{title}</span>
        {live && (
          <span className="flex items-center gap-2 text-xs text-fog">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3ddc84] opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#3ddc84]" />
            </span>
            {live}
          </span>
        )}
      </div>
      {children}
      <div className="mt-3 flex h-7 items-center justify-between text-xs text-fog">
        <span>Illustrative demo</span>
        <AnimatePresence>
          {done && onReplay && (
            <motion.button
              type="button"
              aria-label="Replay demo"
              onClick={onReplay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-mist transition-colors hover:bg-white/10"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></svg>
              Replay
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ───────────────────────── D-Vision: an after-hours anomaly is detected and pushed to the owner ───────────────────────── */

function useClock(start: number) {
  const [t, setT] = useState(start);
  const reduce = useReducedMotionSafe();
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setT((v) => v + 1), 1000);
    return () => window.clearInterval(id);
  }, [reduce]);
  const h = Math.floor(t / 3600) % 24, m = Math.floor(t / 60) % 60, s = t % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function VisionMock() {
  // 0 quiet feed → 1 motion found → 2 classified abnormal → 3 alert sent
  const { ref, step, done, replay } = useSequence([1400, 1300, 1100]);
  const clock = useClock(23 * 3600 + 41 * 60 + 2);
  return (
    <div ref={ref}>
      <Shell title="D-Vision" live="Monitoring 8 cameras" onReplay={replay} done={done} label="D-Vision detects after-hours activity on camera 5 and alerts the owner">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0b1526] [background-image:linear-gradient(rgba(234,240,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(234,240,248,0.05)_1px,transparent_1px)] [background-size:22px_22px]">
          {/* scene: back door + shelving */}
          <div className="absolute left-[8%] top-[16%] h-[62%] w-[18%] rounded-md border border-white/15 bg-white/[0.03]" />
          <div className="absolute right-[8%] top-[30%] h-[10%] w-[34%] rounded bg-white/[0.06]" />
          <div className="absolute right-[8%] top-[48%] h-[10%] w-[34%] rounded bg-white/[0.06]" />
          {/* person silhouette walks in */}
          <motion.div
            className="absolute top-[30%] h-[46%] w-[9%]"
            initial={false}
            animate={{ left: step >= 1 ? "40%" : "14%", opacity: step >= 1 ? 1 : 0.0 }}
            transition={{ duration: 1.2, ease }}
          >
            <div className="mx-auto h-[26%] w-[62%] rounded-full bg-white/35" />
            <div className="mx-auto mt-[6%] h-[68%] w-full rounded-t-[40%] bg-white/30" />
          </motion.div>
          {/* detection box */}
          <AnimatePresence>
            {step >= 1 && (
              <motion.div
                key="box"
                initial={{ opacity: 0, scale: 1.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease, delay: 0.7 }}
                className={clsx("absolute left-[38%] top-[25%] h-[56%] w-[13%] rounded-md border-2 transition-colors duration-500", step >= 2 ? "border-signal" : "border-fleet")}
              >
                <span className={clsx("absolute -top-6 left-[-2px] whitespace-nowrap rounded px-1.5 py-0.5 text-[11px] font-semibold text-ink transition-colors duration-500", step >= 2 ? "bg-signal" : "bg-fleet")}>
                  {step >= 2 ? "Abnormal event" : "Activity"}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="scanline pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent" />
          <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/40 px-2.5 py-1 text-[11px]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#ff5a5a]" /> Camera 05 · Back door
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-black/40 px-2.5 py-1 font-mono text-[11px] tabular-nums">{clock}</div>
          {/* alert pushed to owner */}
          <AnimatePresence>
            {step >= 3 && (
              <motion.div
                key="alert"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={spring}
                className="absolute bottom-3 left-3 right-3 rounded-2xl bg-white p-3 text-ink shadow-xl sm:left-auto sm:w-[62%]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true"><path d="M12 8v5M12 16.5v.5" /><path d="M10.3 3.9L2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" /></svg>
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold">Abnormal event · Camera 05</p>
                    <p className="text-[12px] text-slate">After-hours activity at the back door</p>
                  </div>
                </div>
                <div className="mt-2.5 flex gap-2 text-[12px] font-semibold">
                  <span className="rounded-full bg-ink px-3 py-1 text-white">View clip</span>
                  <span className="rounded-full px-3 py-1 ring-1 ring-rule">Notify team</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {["Entrance", "Dining", "Kitchen", "Back door"].map((c, i) => (
            <div key={c} className={clsx("rounded-lg px-2 py-1.5 text-[11px] transition-colors duration-500", i === 3 && step >= 2 ? "bg-signal/20 text-signal" : "bg-white/[0.05] text-fog")}>
              {c}
            </div>
          ))}
        </div>
      </Shell>
    </div>
  );
}

/* ───────────────────────── D-Voice: a late-night call, English → Mandarin, ends in a booking ───────────────────────── */

const call = [
  { who: "caller", lang: "EN", text: "Hi, are you still open? I’d like to book a table for four tomorrow at 7." },
  { who: "ai", lang: "EN", text: "We’re closed right now, but I can book that for you: tomorrow 7:00 PM, party of four. What name should I put it under?" },
  { who: "caller", lang: "中文", text: "你们可以说中文吗？订位写李先生。" },
  { who: "ai", lang: "中文", text: "可以的，李先生。明天晚上7点，四位，已为您订好。" },
] as const;

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-6 items-center gap-[3px]" aria-hidden="true">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-[3px] rounded-full bg-fleet"
          animate={active ? { height: [4, 8 + ((i * 7) % 16), 4] } : { height: 4 }}
          transition={active ? { duration: 0.7 + (i % 5) * 0.12, repeat: Infinity, ease: "easeInOut", delay: i * 0.04 } : { duration: 0.3 }}
        />
      ))}
    </div>
  );
}

export function VoiceMock() {
  // steps 1–4 reveal messages, 5 booking card, 6 summary sent
  const { ref, step, done, replay } = useSequence([600, 2000, 2400, 1800, 1600, 1200]);
  const typingFor = step < call.length ? call[step] : null;
  return (
    <div ref={ref}>
      <Shell title="D-Voice" live="AI answering" onReplay={replay} done={done} label="D-Voice answers a late-night call, switches from English to Mandarin, and books a table">
        <div className="flex items-center justify-between rounded-2xl bg-white/[0.05] px-4 py-3">
          <div>
            <p className="text-xs text-fog">Incoming call · 11:42 PM</p>
            <p className="text-sm font-semibold">Live transcript</p>
          </div>
          <Waveform active={!done && step < 5} />
        </div>
        <div className="mt-3 flex min-h-[290px] flex-col gap-2.5">
          <AnimatePresence initial={false}>
            {call.slice(0, Math.min(step, call.length)).map((m, i) => (
              <motion.div
                key={`${i}-${m.lang}`}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={spring}
                className={clsx("max-w-[86%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-snug", m.who === "ai" ? "self-end rounded-br-md bg-fleet text-ink" : "self-start rounded-bl-md bg-white/10")}
              >
                <span className={clsx("mb-0.5 block text-[10.5px] font-semibold", m.who === "ai" ? "text-ink/60" : "text-fog")}>
                  {m.who === "ai" ? "AI" : "Caller"} · {m.lang}
                </span>
                {m.text}
              </motion.div>
            ))}
            {typingFor && step > 0 && (
              <motion.div
                key={`typing-${step}`}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className={clsx("flex gap-1 rounded-2xl px-3.5 py-3", typingFor.who === "ai" ? "self-end bg-fleet/30" : "self-start bg-white/10")}
              >
                {[0, 1, 2].map((d) => (
                  <motion.span key={d} className="h-1.5 w-1.5 rounded-full bg-mist" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: d * 0.15 }} />
                ))}
              </motion.div>
            )}
            {step >= 5 && (
              <motion.div key="booked" layout initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={spring} className="mt-1 rounded-2xl bg-white p-3.5 text-ink">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#3ddc84]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true"><path d="M5 12l5 5L20 7" /></svg>
                  </span>
                  <p className="text-sm font-semibold">Reservation booked</p>
                </div>
                <p className="mt-1.5 text-[13px] text-slate">Mr. Li · tomorrow 7:00 PM · Party of 4 · window seat</p>
              </motion.div>
            )}
            {step >= 6 && (
              <motion.p key="summary" layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-center text-xs font-semibold text-fleet">
                Summary sent to owner
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </Shell>
    </div>
  );
}

/* ───────────────────────── D-ROBOT: a robot runs deliveries from the kitchen, table after table ───────────────────────── */

const tables = [
  { n: 4, x: 52, y: 26 }, { n: 7, x: 72, y: 26 }, { n: 9, x: 52, y: 54 },
  { n: 13, x: 72, y: 54 }, { n: 15, x: 52, y: 80 }, { n: 18, x: 72, y: 80 },
];
const route = [13, 7, 18, 4];

export function RobotMock() {
  const reduce = useReducedMotionSafe();
  const [leg, setLeg] = useState(0); // which delivery in the route
  const [phase, setPhase] = useState<"loading" | "going" | "serving" | "returning">("loading");
  const [count, setCount] = useState(41);
  const target = tables.find((t) => t.n === route[leg % route.length])!;

  useEffect(() => {
    if (reduce) {
      setPhase("serving");
      return;
    }
    const next = { loading: "going", going: "serving", serving: "returning", returning: "loading" } as const;
    const wait = { loading: 1200, going: 2200, serving: 1600, returning: 2000 }[phase];
    const id = window.setTimeout(() => {
      if (phase === "serving") setCount((c) => c + 1);
      if (phase === "returning") setLeg((l) => l + 1);
      setPhase(next[phase]);
    }, wait);
    return () => window.clearTimeout(id);
  }, [phase, reduce]);

  const atTable = phase === "going" || phase === "serving";
  const status = {
    loading: "Loading at the kitchen",
    going: `On the way to Table ${target.n}`,
    serving: `Serving Table ${target.n}`,
    returning: "Returning to the kitchen",
  }[phase];

  return (
    <Shell title="D-ROBOT" live="Robot 01 on the floor" label={`Delivery robot ${status.toLowerCase()}`}>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#0b1526]">
        <div className="absolute inset-y-[8%] left-[4%] w-[26%] rounded-xl border border-white/10 bg-white/[0.04]">
          <span className="absolute left-3 top-2 text-[11px] text-fog">Kitchen</span>
          <div className="absolute bottom-[14%] right-0 h-[30%] w-[6px] rounded-full bg-fleet/40" />
        </div>
        {tables.map((t) => (
          <motion.div
            key={t.n}
            className="absolute flex h-[17%] w-[12%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-[11px] font-semibold"
            style={{ left: `${t.x + 8}%`, top: `${t.y}%` }}
            animate={{
              backgroundColor: t.n === target.n && atTable ? "rgba(76,195,232,0.25)" : "rgba(255,255,255,0.06)",
              color: t.n === target.n && atTable ? "#4cc3e8" : "#a2b1c7",
            }}
            transition={{ duration: 0.4 }}
          >
            {t.n}
          </motion.div>
        ))}
        {/* robot */}
        <motion.div
          className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-fleet text-[10px] font-bold text-ink shadow-[0_0_0_6px_rgba(76,195,232,0.18)]"
          initial={false}
          animate={atTable ? { left: `${target.x + 8 - 9}%`, top: `${target.y}%` } : { left: "27%", top: "60%" }}
          transition={{ duration: reduce ? 0 : 1.8, ease: [0.65, 0, 0.35, 1] }}
        >
          R1
        </motion.div>
      </div>
      <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3 rounded-2xl bg-white/[0.05] px-4 py-3">
        <div className="min-w-0">
          <p className="text-xs text-fog">Status</p>
          <AnimatePresence mode="wait">
            <motion.p key={status} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }} className="truncate text-sm font-semibold">
              {status}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="text-right">
          <p className="text-xs text-fog">Deliveries today</p>
          <AnimatePresence mode="popLayout">
            <motion.p key={count} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="text-sm font-semibold tabular-nums">
              {count}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </Shell>
  );
}

/* ───────────────────────── D-Camera: eight 5MP cameras come online and connect to the NVR ───────────────────────── */

const camPos = [
  [12, 18], [50, 8], [88, 18], [95, 50], [88, 82], [50, 92], [12, 82], [5, 50],
] as const;

export function CameraMock() {
  // steps 1–8 each bring a camera online, 9 recording + badges
  const { ref, step, done, replay } = useSequence([500, 260, 260, 260, 260, 260, 260, 260, 600]);
  const online = Math.min(step, 8);
  return (
    <div ref={ref}>
      <Shell title="D-Camera" live={done ? "Recording" : undefined} onReplay={replay} done={done} label="Eight 5MP cameras connect to an 8-channel NVR with 4TB of storage">
        <div className="relative aspect-[16/11] overflow-hidden rounded-2xl bg-[#0b1526]">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
            {camPos.map(([x, y], i) => (
              <motion.line
                key={i}
                x1={x} y1={y} x2={50} y2={50}
                stroke={i < online ? "#4cc3e8" : "rgba(255,255,255,0.08)"}
                strokeWidth="0.5"
                vectorEffect="non-scaling-stroke"
                initial={false}
                animate={{ pathLength: i < online ? 1 : 0.0001, opacity: i < online ? 0.8 : 0.3 }}
                transition={{ duration: 0.5, ease }}
              />
            ))}
          </svg>
          {camPos.map(([x, y], i) => (
            <motion.div
              key={i}
              className="absolute flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl"
              style={{ left: `${x}%`, top: `${y}%` }}
              initial={false}
              animate={{ backgroundColor: i < online ? "#4cc3e8" : "rgba(255,255,255,0.08)", scale: i < online ? 1 : 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={i < online ? "#0e1a2e" : "#a2b1c7"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 7h12v10H3zM15 10l6-3v10l-6-3" /></svg>
            </motion.div>
          ))}
          <div className="absolute left-1/2 top-1/2 w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-3 text-ink shadow-xl">
            <p className="text-[11px] font-semibold text-slate">NVR · 8CH</p>
            <p className="text-sm font-semibold tabular-nums">{online}/8 cameras online</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-rule">
              <motion.div className="h-full rounded-full bg-ink" initial={false} animate={{ width: `${(online / 8) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>
            <p className="mt-1.5 text-[11px] text-slate">4TB storage · 5MP (2K+)</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["NDAA compliant", "TAA compliant", "Built for 24/7"].map((b, i) => (
            <motion.span
              key={b}
              initial={false}
              animate={{ opacity: done ? 1 : 0.25, y: done ? 0 : 4 }}
              transition={{ delay: done ? i * 0.12 : 0, duration: 0.35 }}
              className="rounded-full bg-white/[0.07] px-3 py-1 text-xs font-semibold"
            >
              {b}
            </motion.span>
          ))}
        </div>
      </Shell>
    </div>
  );
}

export const productMocks = { vision: VisionMock, voice: VoiceMock, robot: RobotMock, camera: CameraMock };
