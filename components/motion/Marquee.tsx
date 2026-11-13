import type { ReactNode } from "react";

/** Endless horizontal scroll (CSS, so it pauses on hover). Stops with reduced motion. */
export function Marquee({ children, seconds = 32 }: { children: ReactNode; seconds?: number }) {
  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="marquee flex w-max gap-3 group-hover:[animation-play-state:paused]" style={{ animationDuration: `${seconds}s` }}>
        <div className="flex shrink-0 gap-3">{children}</div>
        <div className="flex shrink-0 gap-3" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
