"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BUSINESS, type SceneKey } from "../lib/site";
import { Lines, ParallaxScene, Reveal } from "./Motion";
import Scene from "./Scene";

export function Story() {
  return (
    <section className="section relative overflow-hidden bg-ivory">
      <div className="wrap grid items-center gap-16 lg:grid-cols-12">
        <div className="relative lg:col-span-6">
          <ParallaxScene kind="bedroom" title="Illustrated bedroom" className="aspect-[4/5] w-full" radius="300px 300px 0 0" />
          <Reveal delay={0.3} className="absolute -bottom-8 right-0 max-w-[16rem] bg-emerald-deep p-7 text-ivory shadow-2xl sm:-right-6">
            <p className="eyebrow mb-3 text-champagne">Your contact</p>
            <p className="font-display text-3xl italic">{BUSINESS.contact}</p>
            <a href={BUSINESS.phoneHref} className="ulink mt-3 block text-sm">
              {BUSINESS.phone}
            </a>
          </Reveal>
        </div>
        <div className="lg:col-span-6 lg:pl-10">
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-4 text-[#8a6a32]">
              <span className="h-px w-10 bg-[#8a6a32]" />
              Our story
            </p>
          </Reveal>
          <Lines lines={["Dedicated to spaces", "that feel *welcoming.*"]} className="display-lg text-emerald-deep [--em:#9c7b3f] !text-[clamp(2.4rem,4.6vw,5.2rem)]" />
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
          <Reveal delay={0.25} className="mt-10 flex flex-wrap gap-4">
            <Link href="/services/" className="btn">
              Our Services <span className="arrow">→</span>
            </Link>
            <Link href="/contact/" className="btn btn-ghost text-emerald-deep">
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const STEPS: { n: string; t: string; d: string; scene: SceneKey }[] = [
  { n: "01", t: "Understand Your Space", d: "We begin by learning about your cleaning needs.", scene: "living" },
  { n: "02", t: "Focus on the Details", d: "We approach each space with care and attention.", scene: "kitchen" },
  { n: "03", t: "Enjoy a Refreshed Environment", d: "Experience the comfort of a beautifully maintained space.", scene: "bedroom" },
];

export function Approach() {
  return (
    <section className="section relative overflow-hidden bg-emerald-deep text-ivory">
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[44rem] w-[44rem] rounded-full border border-champagne/15" />
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-6 text-champagne">Our approach</p>
        </Reveal>
        <Lines lines={["THREE QUIET STEPS,", "*ONE BEAUTIFUL RESULT.*"]} className="display-lg" />
        <div className="relative mt-20 grid gap-14 lg:grid-cols-3 lg:gap-10">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15} className={i === 1 ? "lg:mt-16" : ""}>
              <div className="step group">
                <span className="font-display text-8xl italic leading-none text-champagne">{s.n}</span>
                <div className="relative mt-6 aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-[1600ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110">
                    <Scene kind={s.scene} clean={0.15 + i * 0.425} title={`${s.t} illustration`} />
                  </div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-champagne/40" />
                </div>
                <h3 className="mt-7 font-display text-4xl leading-none">{s.t}</h3>
                <p className="mt-3 max-w-xs text-ivory/70">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const VALUES: { t: string; d: string; scene: SceneKey; bg: string }[] = [
  { t: "Care", d: "We approach every space with care and respect.", scene: "bedroom", bg: "#E9DFD2" },
  { t: "Attention to Detail", d: "Thoughtful focus on the finer points of every room.", scene: "kitchen", bg: "#D6DED2" },
  { t: "Respect for Every Space", d: "Your home or workplace is treated as it deserves.", scene: "living", bg: "#EFE5D0" },
  { t: "Customer-Focused Service", d: "Your needs shape how we work, and communication is easy.", scene: "office", bg: "#CBD6D1" },
];

export function Values() {
  const [i, setI] = useState(0);
  return (
    <section className="section transition-colors duration-1000" style={{ background: VALUES[i].bg }}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-6 text-[#8a6a32]">Our values</p>
        </Reveal>
        <Lines lines={["WHAT GUIDES", "*EVERY VISIT.*"]} className="display-lg text-emerald-deep [--em:#9c7b3f]" />
        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <ul className="lg:col-span-7" onMouseLeave={() => undefined}>
            {VALUES.map((v, k) => (
              <li key={v.t} className="border-t border-emerald-deep/20 last:border-b">
                <button
                  className="value-row group flex w-full items-baseline gap-6 py-7 text-left text-emerald-deep"
                  onMouseEnter={() => setI(k)}
                  onFocus={() => setI(k)}
                  onClick={() => setI(k)}
                  aria-pressed={i === k}
                >
                  <span className="font-display text-2xl italic text-[#8a6a32]">0{k + 1}</span>
                  <span className="flex-1">
                    <span className={`block font-display text-[clamp(2rem,4vw,3.8rem)] leading-none transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i === k ? "translate-x-4 italic" : ""}`}>{v.t}</span>
                    <span className={`grid transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)] ${i === k ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100"}`}>
                      <span className="overflow-hidden">
                        <span className="block max-w-md pt-3 pl-4 text-charcoal/75">{v.d}</span>
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <div className="lg:col-span-5">
            <div className="frame-gold relative aspect-[4/5] overflow-hidden lg:sticky lg:top-28" style={{ borderRadius: "220px 220px 0 0" }}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={VALUES[i].scene}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.15 }}
                  animate={{ opacity: 1, scale: 1, transition: { duration: 1.3, ease: [0.22, 1, 0.36, 1] } }}
                  exit={{ opacity: 0, transition: { duration: 1 } }}
                >
                  <Scene kind={VALUES[i].scene} clean={1} title={`${VALUES[i].t} — illustrated interior`} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
