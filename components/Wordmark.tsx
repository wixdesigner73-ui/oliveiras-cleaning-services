/** Typographic wordmark — no logo supplied, so the name is set in the display serif. */
export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col gap-[6px] leading-none ${className}`}>
      <span className="font-display text-[1.35rem] tracking-[0.01em]">Oliveira&rsquo;s</span>
      <span className="text-[0.5rem] font-medium uppercase tracking-[0.5em] opacity-80">Cleaning Services</span>
    </span>
  );
}
