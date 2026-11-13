"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/** Honors the visitor's "reduce motion" setting across every animation. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
