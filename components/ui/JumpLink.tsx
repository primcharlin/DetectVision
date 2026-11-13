"use client";

import type { ComponentProps, MouseEvent } from "react";

/**
 * In-page anchor that scrolls to the target's position in the page flow.
 * Needed for sticky targets (the stacked product panels): browsers' smooth
 * scroll can stop short on sticky elements.
 */
export function JumpLink({ href, onClick, ...props }: ComponentProps<"a"> & { href: `#${string}` }) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    const el = document.getElementById(href.slice(1));
    if (!el || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    let top = 0;
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) top += n.offsetTop;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: Math.max(0, top - 96), behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", href);
  };
  return <a href={href} onClick={handle} {...props} />;
}
