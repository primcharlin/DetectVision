"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

/** A thin amber line that fills left-to-right as its section scrolls through the viewport. */
export function ScrollLine({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.3"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <div ref={ref} className={className} aria-hidden="true">
      <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
        <motion.div className="h-full origin-left bg-signal" style={{ scaleX }} />
      </div>
    </div>
  );
}
