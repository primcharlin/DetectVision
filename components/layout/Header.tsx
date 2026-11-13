"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={clsx(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled || open ? "border-b border-rule bg-paper/85 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      {/* CSS grid-row collapse: no JS height measuring, so it never interrupts smooth scrolling */}
      <div
        className="grid bg-ink text-white transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: scrolled || open ? "0fr" : "1fr", opacity: scrolled || open ? 0 : 1 }}
        aria-hidden={scrolled || open ? true : undefined}
      >
        <div className="overflow-hidden">
          <a href={site.phoneHref} tabIndex={scrolled || open ? -1 : undefined} className="group flex min-h-10 items-center justify-center gap-2 px-4 py-2 text-center text-[0.875rem]">
            <span className="rounded-full bg-signal px-2 py-0.5 text-[0.75rem] font-bold text-ink">New</span>
            <span><span className="font-semibold">D-Voice</span> answers every call, 24/7, in English &amp; Mandarin.</span>
            <span className="hidden font-semibold underline decoration-white/40 underline-offset-4 group-hover:decoration-white sm:inline">Call our AI: {site.phone}</span>
          </a>
        </div>
      </div>
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-ink" aria-label="DetectVision home">
          <Logo className="h-8 w-8" />
          <span className="font-display text-[1.35rem] font-bold tracking-[-0.04em]">DetectVision</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={clsx(
                  "relative rounded-full px-4 py-2 text-[0.95rem] transition-colors",
                  active ? "text-ink" : "text-slate hover:text-ink",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-ink/[0.07]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="px-3 text-[0.95rem] font-medium text-slate hover:text-ink">Contact sales</Link>
          <ButtonLink href="/contact" variant="primary" className="min-h-11 px-5 text-[0.95rem]">
            Book a demo
          </ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 flex h-11 w-11 items-center justify-center rounded-full text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <motion.path animate={open ? { d: "M6 6L18 18" } : { d: "M4 8H20" }} />
            <motion.path animate={open ? { d: "M6 18L18 6" } : { d: "M4 16H20" }} />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-rule lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col px-5 pb-8 pt-4 sm:px-8">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i + 0.06 }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                    className="block border-b border-rule py-4 font-display text-3xl font-semibold tracking-[-0.03em] text-ink"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <ButtonLink href="/contact" className="mt-6">
                Book a demo
              </ButtonLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
