"use client";

import { useInView } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

/**
 * Steps through a timed sequence once its element scrolls into view.
 * `delays[i]` is how long to wait before moving to step i + 1.
 * With reduced motion it jumps straight to the final step.
 */
export function useSequence<T extends Element = HTMLDivElement>(delays: number[], { loop = false } = {}) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: false, margin: "0px 0px -20% 0px" });
  const reduce = useReducedMotionSafe();
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(0);
  const last = delays.length;
  const started = useRef(false);
  const delaysRef = useRef(delays);
  delaysRef.current = delays;

  useEffect(() => {
    if (reduce) {
      setStep(last);
      return;
    }
    if (!inView && !started.current) return;
    started.current = true;
    if (step >= last) {
      if (!loop) return;
      const id = window.setTimeout(() => setStep(0), 2600);
      return () => window.clearTimeout(id);
    }
    if (!inView) return; // pause while off screen
    const id = window.setTimeout(() => setStep((s) => s + 1), delaysRef.current[step]);
    return () => window.clearTimeout(id);
  }, [inView, step, run, reduce, last, loop]);

  const replay = useCallback(() => {
    setStep(0);
    setRun((r) => r + 1);
  }, []);

  return { ref, step, done: step >= last, replay, reduce };
}
