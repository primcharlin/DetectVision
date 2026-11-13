"use client";

import { motion } from "framer-motion";

/** Stroke icon whose lines draw themselves in when scrolled into view. */
export function DrawIcon({ d, size = 22, delay = 0 }: { d: string; size?: number; delay?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <motion.path
        d={d}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ pathLength: { duration: 1.2, delay, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2, delay } }}
      />
    </svg>
  );
}
