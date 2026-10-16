import Link from "next/link";
import { Lines, ParallaxScene, Reveal } from "./Motion";

export default function Intro() {
  return (
    <section className="section relative overflow-hidden bg-ivory">
      <div className="pointer-events-none absolute -left-32 top-10 h-[30rem] w-[30rem] rounded-full border border-champagne/40" />
      <div className="wrap grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow flex items-center gap-4 text-[#8a6a32]">
              <span className="h-px w-10 bg-[#8a6a32]" />
              Welcome to Oliveira&rsquo;s
            </p>
          </Reveal>
          <Lines
            lines={["Beautiful Spaces.", "*Thoughtfully* Cleaned."]}
            className="display-lg mt-7 !text-[clamp(2.6rem,4.7vw,5.4rem)] text-emerald-deep [--em:#9c7b3f]"
          />
          <Reveal delay={0.2} className="mt-8">
            <p className="lede text-charcoal/80">
              At Oliveira&rsquo;s Cleaning Services, we believe a clean space should feel as beautiful as it looks. Our approach
              focuses on thoughtful care, attention to detail, and creating welcoming environments for everyday living.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Link href="/about/" className="btn">
              About Us <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>

        <div className="relative lg:col-span-7">
          <ParallaxScene
            kind="living"
            title="Illustrated luxury living room"
            className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[6/5]"
            radius="260px 260px 0 0"
          />
          <div className="absolute -bottom-10 -left-2 w-[46%] max-w-[300px] border-[10px] border-ivory shadow-2xl sm:-left-10 lg:-left-16">
            <ParallaxScene kind="bedroom" title="Illustrated bedroom" className="aspect-[4/5]" speed={6} />
          </div>
          <div className="absolute -right-3 top-8 hidden rotate-90 origin-right eyebrow text-emerald-deep/60 xl:block">
            Illustrative renders
          </div>
        </div>
      </div>
    </section>
  );
}
