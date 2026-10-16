import { Lines, Reveal } from "./Motion";

const I = { fill: "none", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round", strokeLinejoin: "round" } as const;
const ITEMS = [
  {
    t: "Attention to Detail",
    d: "Thoughtful care for the spaces that matter most.",
    icon: (
      <svg viewBox="0 0 48 48" width="44" height="44" {...I}>
        <circle cx="21" cy="21" r="11" />
        <path d="M29 29l11 11" />
      </svg>
    ),
  },
  {
    t: "Personalized Approach",
    d: "Cleaning solutions designed around individual spaces and needs.",
    icon: (
      <svg viewBox="0 0 48 48" width="44" height="44" {...I}>
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
      <svg viewBox="0 0 48 48" width="44" height="44" {...I}>
        <path d="M24 6l3.4 9.6L37 19l-9.6 3.4L24 32l-3.4-9.6L11 19l9.6-3.4z" />
      </svg>
    ),
  },
  {
    t: "Easy Communication",
    d: "A simple, convenient way to discuss your cleaning needs.",
    icon: (
      <svg viewBox="0 0 48 48" width="44" height="44" {...I}>
        <path d="M7 12h34v21H21l-8 7v-7H7z" />
      </svg>
    ),
  },
];

export default function Why() {
  return (
    <section className="section bg-ivory">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-8 text-[#7d6840]">Why choose Oliveira&rsquo;s</p>
        </Reveal>
        <Lines lines={["A HIGHER STANDARD", "*OF CARE.*"]} className="display-lg text-emerald-deep" />
        <div className="mt-20 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.1} className="why-card border-t border-emerald-deep/25 pt-8">
              <span className="why-icon text-emerald-deep">{it.icon}</span>
              <h3 className="mt-10 font-display text-3xl leading-[1.05] text-emerald-deep">{it.t}</h3>
              <p className="mt-4 text-charcoal/70">{it.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
