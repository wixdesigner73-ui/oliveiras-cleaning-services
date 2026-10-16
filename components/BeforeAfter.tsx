import Compare from "./Compare";
import { Lines, Reveal } from "./Motion";

const ITEMS = [
  { kind: "kitchen" as const, label: "Kitchen surfaces", span: "lg:col-span-7", aspect: "aspect-[4/3] lg:aspect-[16/11]" },
  { kind: "bathroom" as const, label: "Bathroom tiles", span: "lg:col-span-5", aspect: "aspect-[4/3] lg:aspect-[5/6]" },
  { kind: "living" as const, label: "Living room", span: "lg:col-span-5", aspect: "aspect-[4/3] lg:aspect-[5/6]" },
  { kind: "office" as const, label: "Office interiors", span: "lg:col-span-7", aspect: "aspect-[4/3] lg:aspect-[16/11]" },
];

export default function BeforeAfter() {
  return (
    <section className="section relative overflow-hidden bg-emerald-deep text-ivory">
      <div className="pointer-events-none absolute -right-40 top-20 h-[40rem] w-[40rem] rounded-full border border-champagne/15" />
      <div className="wrap">
        <div className="mb-16 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow mb-6 text-champagne">Drag to reveal</p>
            </Reveal>
            <Lines lines={["SEE THE", "*TRANSFORMATION.*"]} className="display-lg" />
          </div>
          <Reveal className="lg:col-span-5" delay={0.2}>
            <p className="lede text-ivory/70">
              Slide across each space to reveal the cleaned surface. These are illustrative demonstrations created for this
              website — not photographs of customer projects.
            </p>
          </Reveal>
        </div>
        <div className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
          {ITEMS.map((it, i) => (
            <Reveal key={it.kind} className={it.span} delay={(i % 2) * 0.12}>
              <Compare kind={it.kind} label={it.label} className={`${it.aspect} w-full`} />
              <div className="mt-4 flex items-baseline justify-between border-b border-champagne/25 pb-3">
                <h3 className="font-display text-3xl italic">{it.label}</h3>
                <span className="eyebrow !text-[0.58rem] text-champagne/80">Illustrative demonstration</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
