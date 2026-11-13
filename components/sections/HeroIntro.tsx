"use client";

import { motion } from "framer-motion";
import { ButtonLink } from "@/components/ui/Button";

const ease = [0.22, 1, 0.36, 1] as const;

/** Centered hero: the tagline rises in line by line, then the description and actions. */
export function HeroIntro() {
  const lines = ["A real-time AI", "operating system", "for businesses"];
  return (
    <div className="mx-auto flex max-w-[64rem] flex-col items-center text-center">
      <h1 className="text-[length:var(--text-display)] leading-[0.94] tracking-[-0.055em]">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden pb-[0.06em]">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay: 0.05 + i * 0.1, ease }}>
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.45, ease }}>
        <p className="mx-auto mt-8 max-w-[40rem] text-[length:var(--text-lede)] leading-relaxed text-slate">
          DetectVision helps business owners make smarter decisions in real time, bringing everything that keeps your business running, from day-to-day operations to smart cameras and delivery robots, into one private, secure AI system.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="#analyze">Analyze my business, free</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">Book a demo</ButtonLink>
        </div>
      </motion.div>
    </div>
  );
}
