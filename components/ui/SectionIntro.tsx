import clsx from "clsx";
import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

/** Heading + optional lede, left-aligned. `tone` picks colors for dark or light sections. */
export function SectionIntro({
  title,
  lede,
  tone = "light",
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <Reveal className={clsx("max-w-[52rem]", className)}>
      <h2
        className={clsx(
          "text-[length:var(--text-title)] font-semibold leading-[1] tracking-[-0.05em]",
          tone === "dark" ? "text-mist" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className={clsx("mt-5 text-[length:var(--text-lede)] leading-relaxed", tone === "dark" ? "text-fog" : "text-slate")}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}
