"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SceneKey } from "../lib/site";
import { usePointerParallax } from "../lib/useParallax";
import Photo from "./Photo";
import { Lines } from "./Motion";

/** Inner-page hero: a full-bleed photograph with slow scroll + pointer parallax under a deep-emerald veil. */
export default function PageHero({
  kind,
  eyebrow,
  lines,
  text,
  tall = true,
  position,
}: {
  kind: SceneKey;
  eyebrow: string;
  lines: string[];
  text?: string;
  tall?: boolean;
  position?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  usePointerParallax(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "16%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, reduce ? 1 : 0]);

  useEffect(() => {
    document.documentElement.style.removeProperty("--nav-ink");
  }, []);

  return (
    <section ref={ref} className={`relative isolate flex items-end overflow-hidden bg-emerald-deep text-ivory ${tall ? "min-h-[92svh]" : "min-h-[72svh]"}`}>
      <motion.div className="absolute inset-0 -z-20" style={{ y }}>
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.18 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <Photo kind={kind} priority position={position} />
        </motion.div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(18,48,42,.82)_0%,rgba(18,48,42,.45)_50%,rgba(18,48,42,.1)_90%),linear-gradient(to_top,rgba(18,48,42,.7)_0%,rgba(18,48,42,0)_45%)]" />
      <motion.div className="wrap pb-16 pt-44 md:pb-24" style={{ opacity: fade }}>
        <motion.p className="eyebrow mb-7 text-champagne" initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.5 }}>
          {eyebrow}
        </motion.p>
        <Lines as="h1" lines={lines} className="display-xl !text-[clamp(2.5rem,6.2vw,6.6rem)]" delay={0.4} />
        {text && (
          <motion.p className="lede mt-8 text-ivory/85" initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }}>
            {text}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
