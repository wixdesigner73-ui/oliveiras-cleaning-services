import Link from "next/link";
import type { SceneKey } from "../lib/site";
import { Lines, ParallaxScene, Reveal } from "./Motion";

export default function FinalCta({
  lines,
  text,
  label,
  href,
  scene = "living",
  eyebrow = "Let’s begin",
}: {
  lines: string[];
  text?: string;
  label: string;
  href: string;
  scene?: SceneKey;
  eyebrow?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-emerald-deep py-32 text-center text-ivory md:py-48">
      <div className="absolute inset-0 -z-10 opacity-[0.28]">
        <ParallaxScene kind={scene} className="h-full w-full" speed={10} />
      </div>
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_50%,rgba(16,47,41,.55),rgba(16,47,41,.94))]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[56rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/25" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-champagne/15" />
      <div className="wrap relative">
        <Reveal>
          <p className="eyebrow mb-8 text-champagne">{eyebrow}</p>
        </Reveal>
        <Lines lines={lines} className="display-xl mx-auto max-w-5xl !text-[clamp(2.8rem,7vw,7rem)]" />
        {text && (
          <Reveal delay={0.2} className="mx-auto mt-8 max-w-xl">
            <p className="lede mx-auto text-ivory/75">{text}</p>
          </Reveal>
        )}
        <Reveal delay={0.3} className="mt-12">
          <Link href={href} className="btn btn-gold">
            {label} <span className="arrow">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
