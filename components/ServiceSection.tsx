"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import type { SceneKey, Service } from "../lib/site";
import { usePointerParallax } from "../lib/useParallax";
import { Reveal } from "./Motion";
import Photo from "./Photo";

/** One large editorial section per service. The room "cleans itself" as the section scrolls into view. */
export default function ServiceSection({ s, index, extra }: { s: Service; index: number; extra?: SceneKey }) {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  usePointerParallax(stage);
  const flip = index % 2 === 1;

  const { scrollYProgress } = useScroll({ target: sec, offset: ["start 80%", "center 42%"] });
  const apply = (p: number) => {
    const c = reduce ? 1 : Math.min(1, Math.max(0, p));
    stage.current?.style.setProperty("--clean", c.toFixed(3));
    if (meter.current) meter.current.style.transform = `scaleX(${c.toFixed(3)})`;
    if (pct.current) pct.current.textContent = `${Math.round(c * 100)}%`;
  };
  useMotionValueEvent(scrollYProgress, "change", apply);

  return (
    <section
      ref={sec}
      id={s.id}
      className="relative overflow-hidden"
      style={{ background: s.bg1, color: s.ink, "--accent": s.accent } as React.CSSProperties}
    >
      <div className="wrap grid items-center gap-14 py-28 md:py-40 lg:min-h-screen lg:grid-cols-12 lg:gap-20">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <Reveal>
            <p className="eyebrow mb-8" style={{ color: s.accent }}>
              {s.num} — Service
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg">{s.title}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lede mt-7" style={{ color: s.inkSoft }}>
              {s.blurb}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 border-t" style={{ borderColor: "color-mix(in srgb, currentColor 20%, transparent)" }}>
              {s.highlights.map((h) => (
                <li key={h} className="border-b py-3.5" style={{ borderColor: "color-mix(in srgb, currentColor 20%, transparent)" }}>
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 max-w-sm">
              <div className="mb-2 flex justify-between text-[0.6rem] font-medium uppercase tracking-[0.24em]" style={{ color: s.inkSoft }}>
                <span>Illustrative transformation</span>
                <span ref={pct}>0%</span>
              </div>
              <div className="h-px w-full" style={{ background: "color-mix(in srgb, currentColor 22%, transparent)" }}>
                <span ref={meter} className="block h-[2px] origin-left -translate-y-px" style={{ background: s.accent, transform: "scaleX(0)" }} />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Link href={`/contact/?service=${s.id}`} className={`btn ${s.dark ? "btn-gold" : ""}`}>
              Request a Quote <span className="arrow">→</span>
            </Link>
          </Reveal>
        </div>

        <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          <motion.div
            ref={stage}
            className="svc-stage relative"
            initial={reduce ? false : { clipPath: "inset(10% 6% 10% 6%)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ "--clean": 0 } as React.CSSProperties}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="svc-img absolute inset-0">
                <Photo kind={s.scene} />
              </div>
            </div>
            {extra && (
              <div className={`absolute -bottom-10 w-[38%] border-[8px] ${flip ? "-right-3 lg:-right-8" : "-left-3 lg:-left-8"}`} style={{ borderColor: s.bg1 }}>
                <div className="aspect-[4/5]">
                  <Photo kind={extra} />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
