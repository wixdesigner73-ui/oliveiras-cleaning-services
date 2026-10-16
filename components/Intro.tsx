import Link from "next/link";
import { Lines, ParallaxPhoto, Reveal } from "./Motion";

export default function Intro() {
  return (
    <section className="section bg-ivory">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow mb-8 text-[#7d6840]">Welcome to Oliveira&rsquo;s</p>
          </Reveal>
          <Lines lines={["Beautiful spaces.", "Thoughtfully cleaned."]} className="display-lg text-emerald-deep" />
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
        <div className="lg:col-span-7">
          <ParallaxPhoto kind="living" className="aspect-[4/5] w-full sm:aspect-[5/4]" position="44% 50%" />
        </div>
      </div>
    </section>
  );
}
