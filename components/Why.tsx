import { Lines, Reveal } from "./Motion";

const I = { fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ITEMS = [
  {
    t: "Attention to Detail",
    d: "Thoughtful care for the spaces that matter most.",
    icon: (
      <svg viewBox="0 0 48 48" width="52" height="52" {...I}>
        <circle cx="21" cy="21" r="11" />
        <path d="M29 29l11 11" />
        <path d="M21 15.5l1.4 3.1 3.1 1.4-3.1 1.4-1.4 3.1-1.4-3.1-3.1-1.4 3.1-1.4z" />
      </svg>
    ),
  },
  {
    t: "Personalized Approach",
    d: "Cleaning solutions designed around individual spaces and needs.",
    icon: (
      <svg viewBox="0 0 48 48" width="52" height="52" {...I}>
        <path d="M8 14h32M8 24h32M8 34h32" />
        <circle cx="17" cy="14" r="3.5" fill="var(--color-ivory)" />
        <circle cx="31" cy="24" r="3.5" fill="var(--color-ivory)" />
        <circle cx="21" cy="34" r="3.5" fill="var(--color-ivory)" />
      </svg>
    ),
  },
  {
    t: "Beautiful Results",
    d: "A focus on clean, comfortable, welcoming environments.",
    icon: (
      <svg viewBox="0 0 48 48" width="52" height="52" {...I}>
        <path d="M24 5l3.6 9.4L37 18l-9.4 3.6L24 31l-3.6-9.4L11 18l9.4-3.6z" />
        <path d="M37 31l1.6 4.4L43 37l-4.4 1.6L37 43l-1.6-4.4L31 37l4.4-1.6z" />
      </svg>
    ),
  },
  {
    t: "Easy Communication",
    d: "A simple, convenient way to discuss your cleaning needs.",
    icon: (
      <svg viewBox="0 0 48 48" width="52" height="52" {...I}>
        <path d="M7 12h34v21H21l-8 7v-7H7z" />
        <path d="M15 20h18M15 26h11" />
      </svg>
    ),
  },
];

export default function Why() {
  return (
    <section className="section bg-ivory">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-6 text-[#8a6a32]">Why choose Oliveira&rsquo;s</p>
        </Reveal>
        <Lines lines={["A HIGHER STANDARD", "*OF CARE.*"]} className="display-lg text-emerald-deep [--em:#9c7b3f]" />
        <div className="mt-20 grid gap-px overflow-hidden border border-champagne/50 bg-champagne/50 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.1} className="why-card bg-ivory">
              <div className="relative flex h-full flex-col p-8 sm:p-10">
                <span className="absolute right-6 top-4 font-display text-7xl italic text-champagne/35">0{i + 1}</span>
                <span className="why-icon text-emerald-deep">{it.icon}</span>
                <h3 className="mt-14 font-display text-4xl leading-[1.02] text-emerald-deep">{it.t}</h3>
                <p className="mt-4 text-charcoal/70">{it.d}</p>
                <span className="why-bar" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
