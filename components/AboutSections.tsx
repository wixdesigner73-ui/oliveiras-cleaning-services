"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS, type SceneKey } from "../lib/site";
import { Lines, ParallaxPhoto, Reveal } from "./Motion";
import Photo from "./Photo";

export function Story() {
  return (
    <section className="section bg-ivory">
      <div className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-6">
          <ParallaxPhoto kind="bedroom" className="aspect-[4/5] w-full" position="58% 82%" />
        </div>
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow mb-8 text-[#7d6840]">Our story</p>
          </Reveal>
          <Lines lines={["Dedicated to spaces", "that feel *welcoming.*"]} className="display-lg text-emerald-deep" />
          <Reveal delay={0.15} className="mt-8 space-y-5 text-charcoal/80">
            <p className="lede">
              Oliveira&rsquo;s Cleaning Services is dedicated to helping homes and spaces feel clean, comfortable, and welcoming.
              With an emphasis on thoughtful service and attention to detail, we approach every space with care and respect.
            </p>
            <p>
              Based in {BUSINESS.location}, Oliveira&rsquo;s Cleaning Services is led by {BUSINESS.contact}, who is your point of
              contact from the first conversation onward.
            </p>
          </Reveal>
          <Reveal delay={0.25} className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/services/" className="btn">
              Our Services <span className="arrow">→</span>
            </Link>
            <a href={BUSINESS.phoneHref} className="ulink">
              {BUSINESS.contact} · {BUSINESS.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const STEPS: { n: string; t: string; d: string; scene: SceneKey; clean: number }[] = [
  { n: "01", t: "Understand Your Space", d: "We begin by learning about your cleaning needs.", scene: "living", clean: 0.35 },
  { n: "02", t: "Focus on the Details", d: "We approach each space with care and attention.", scene: "kitchen", clean: 0.7 },
  { n: "03", t: "Enjoy a Refreshed Environment", d: "Experience the comfort of a beautifully maintained space.", scene: "bedroom", clean: 1 },
];

export function Approach() {
  return (
    <section className="section bg-emerald-deep text-ivory">
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-8 text-champagne">Our approach</p>
        </Reveal>
        <Lines lines={["Three quiet steps,", "*one beautiful result.*"]} className="display-lg" />
        <div className="mt-20 grid gap-14 lg:grid-cols-3 lg:gap-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15}>
              <div className="border-t border-ivory/30 pt-6">
                <span className="font-display text-2xl text-champagne">{s.n}</span>
                <div className="mt-6 aspect-[4/3] overflow-hidden">
                  <div className="h-full w-full transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-105">
                    <Photo kind={s.scene} clean={s.clean} />
                  </div>
                </div>
                <h3 className="mt-6 font-display text-xl leading-tight">{s.t}</h3>
                <p className="mt-3 max-w-xs text-ivory/70">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const POS: Record<string, string> = { bedroom: "60% 84%", kitchen: "58% 60%", living: "46% 62%", office: "52% 50%" };
const VALUES: { t: string; d: string; scene: SceneKey; bg: string }[] = [
  { t: "Care", d: "We approach every space with care and respect.", scene: "bedroom", bg: "#EBE4D8" },
  { t: "Attention to Detail", d: "Thoughtful focus on the finer points of every room.", scene: "kitchen", bg: "#E1E5DC" },
  { t: "Respect for Every Space", d: "Your home or workplace is treated as it deserves.", scene: "living", bg: "#F0E9DC" },
  { t: "Customer-Focused Service", d: "Your needs shape how we work, and communication is easy.", scene: "office", bg: "#DADFDA" },
];

export function Values() {
  const [i, setI] = useState(0);
  return (
    <section className="section transition-colors duration-1000" style={{ background: VALUES[i].bg }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-8 text-[#7d6840]">Our values</p>
        </Reveal>
        <Lines lines={["What guides", "*every visit.*"]} className="display-lg text-emerald-deep" />
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-20">
          <ul className="lg:col-span-6">
            {VALUES.map((v, k) => (
              <li key={v.t} className="border-t border-emerald-deep/20 last:border-b">
                <button
                  className="flex w-full items-baseline gap-6 py-7 text-left text-emerald-deep"
                  onMouseEnter={() => setI(k)}
                  onFocus={() => setI(k)}
                  onClick={() => setI(k)}
                  aria-pressed={i === k}
                >
                  <span className="font-display text-sm opacity-60">0{k + 1}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-[clamp(1.35rem,2vw,1.8rem)] leading-tight transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i === k ? "translate-x-3" : "opacity-60"}`}>{v.t}</span>
                    <span className={`grid transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i === k ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100"}`}>
                      <span className="overflow-hidden">
                        <span className="block max-w-md pl-3 pt-3 text-charcoal/75">{v.d}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28">
              <AnimatePresence initial={false}>
                <motion.div
                  key={VALUES[i].scene}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                >
                  <Photo kind={VALUES[i].scene} position={POS[VALUES[i].scene]} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
