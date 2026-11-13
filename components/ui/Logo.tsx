export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="9" fill="#141414" />
      <path d="M9 16c2.2-4 4.6-6 7-6s4.8 2 7 6c-2.2 4-4.6 6-7 6s-4.8-2-7-6z" fill="#FFB23F" />
      <circle cx="16" cy="16" r="2.6" fill="#141414" />
    </svg>
  );
}
