export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 leading-none ${className}`}>
      <svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true" className="shrink-0">
        <circle cx="20" cy="20" r="18.5" fill="none" stroke="currentColor" strokeWidth="1" opacity=".8" />
        <text x="20" y="27" textAnchor="middle" fontFamily="var(--font-cormorant), serif" fontStyle="italic" fontSize="23" fill="currentColor">O</text>
        <path d="M30 7 l1.2 3.2 3.2 1.2 -3.2 1.2 -1.2 3.2 -1.2 -3.2 -3.2 -1.2 3.2 -1.2z" fill="#CBB38B" />
      </svg>
      <span className="flex flex-col gap-[5px]">
        <span className="font-display text-[1.65rem] italic tracking-[0.01em]">Oliveira&rsquo;s</span>
        <span className="text-[0.52rem] font-semibold uppercase tracking-[0.42em] opacity-80">Cleaning Services</span>
      </span>
    </span>
  );
}
