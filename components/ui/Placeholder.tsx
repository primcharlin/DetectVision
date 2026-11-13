import clsx from "clsx";

/** Visible stand-in for content the business still needs to supply (logos, photos, quotes). */
export function Placeholder({ label, className, tone = "light" }: { label: string; className?: string; tone?: "light" | "dark" }) {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-xl border border-dashed text-center text-sm",
        tone === "dark" ? "border-white/20 text-fog" : "border-ink/20 text-slate",
        className,
      )}
    >
      {label}
    </div>
  );
}
