import Link from "next/link";
import clsx from "clsx";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline-dark" | "outline-light" | "solid-ink" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-ink text-white hover:bg-ink-2",
  "solid-ink": "bg-ink text-white hover:bg-ink-2",
  light: "bg-white text-ink hover:bg-paper",
  "outline-dark": "border border-white/30 text-white hover:border-white/70 hover:bg-white/5",
  "outline-light": "border border-ink/20 text-ink hover:border-ink/60 hover:bg-ink/[0.03]",
};

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-7 text-[1rem] font-semibold transition-[background-color,border-color,transform] duration-200 active:scale-[0.97]";

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={clsx(base, styles[variant], className)} {...props} />;
}

export function Button({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={clsx(base, styles[variant], "disabled:opacity-60", className)} {...props} />;
}
