"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SceneKey } from "../lib/site";
import { usePointerParallax } from "../lib/useParallax";
import Scene from "./Scene";
import { Lines } from "./Motion";

/** Cinematic inner-page hero: a clean illustrated room with scroll + pointer parallax under a deep-emerald veil. */
export default function PageHero({
  kind,
  eyebrow,
  lines,
  text,
  tall = true,
}: {
  kind: SceneKey;
  eyebrow: string;
  lines: string[];
  text?: string;
  tall?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  usePointerParallax(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  useEffect(() => {
    document.documentElement.style.removeProperty("--nav-ink");
  }, []);

  return (
    <section ref={ref} className={`relative isolate flex items-end overflow-hidden bg-emerald-deep text-ivory ${tall ? "min-h-[92svh]" : "min-h-[72svh]"}`}>
      <motion.div className="absolute inset-0 -z-20" style={{ y, scale }}>
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.3 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Scene kind={kind} clean={1} title={`${kind} — illustrated luxury interior`} />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(16,47,41,.9)_0%,rgba(16,47,41,.55)_45%,rgba(16,47,41,.08)_85%),linear-gradient(to_top,rgba(16,47,41,.85)_0%,rgba(16,47,41,0)_45%)]" />
      <div className="pointer-events-none absolute -right-24 top-24 -z-10 h-[34rem] w-[34rem] rounded-full border border-champagne/25" />
      <div className="pointer-events-none absolute -right-4 top-44 -z-10 h-[22rem] w-[22rem] rounded-full border border-champagne/15" />
      <motion.div className="wrap pb-16 pt-44 md:pb-24" style={{ opacity: fade }}>
        <motion.p
          className="eyebrow mb-7 flex items-center gap-4 text-champagne"
          initial={reduce ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
        >
          <span className="h-px w-10 bg-champagne" />
          {eyebrow}
        </motion.p>
        <Lines as="h1" lines={lines} className="display-xl !text-[clamp(2.6rem,6.8vw,7.6rem)]" delay={0.4} />
        {text && (
          <motion.p
            className="lede mt-8 text-ivory/80"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {text}
          </motion.p>
        )}
      </motion.div>
      <span className="eyebrow absolute bottom-6 right-6 hidden !text-[0.55rem] text-ivory/60 md:block">Illustrative render</span>
    </section>
  );
}
