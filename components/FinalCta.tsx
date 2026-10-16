import Link from "next/link";
import type { SceneKey } from "../lib/site";
import { Lines, ParallaxPhoto, Reveal } from "./Motion";

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
      <div className="absolute inset-0 -z-20">
        <ParallaxPhoto kind={scene} className="h-full w-full" speed={8} />
      </div>
      <div className="absolute inset-0 -z-10 bg-emerald-deep/80" />
      <div className="wrap relative">
        <Reveal>
          <p className="eyebrow mb-8 text-champagne">{eyebrow}</p>
        </Reveal>
        <Lines lines={lines} className="display-xl mx-auto max-w-5xl" />
        {text && (
          <Reveal delay={0.2} className="mx-auto mt-8 max-w-xl">
            <p className="lede mx-auto text-ivory/80">{text}</p>
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
