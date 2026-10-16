"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import type { SceneKey, Service } from "../lib/site";
import { usePointerParallax } from "../lib/useParallax";
import { Reveal } from "./Motion";
import Scene from "./Scene";

const SHAPES = [
  { main: "280px 280px 0 0", extra: "0px" },
  { main: "0px 0px 0px 280px", extra: "180px 180px 0 0" },
  { main: "0px", extra: "0px" },
  { main: "0px 280px 0 0", extra: "0px" },
];

/** One large editorial section per service. The room cleans itself as the section scrolls into view. */
export default function ServiceSection({ s, index, extra }: { s: Service; index: number; extra?: SceneKey }) {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  usePointerParallax(stage);
  const flip = index % 2 === 1;
  const shape = SHAPES[index % SHAPES.length];

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
      className="svc-section relative scroll-mt-0 overflow-hidden"
      style={{ "--bg1": s.bg1, "--bg2": s.bg2, "--accent": s.accent, color: s.ink, background: `radial-gradient(90% 70% at ${flip ? "15%" : "85%"} 40%, ${s.bg2}, transparent 70%), ${s.bg1}` } as React.CSSProperties}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute select-none font-display italic leading-none"
        style={{ fontSize: "clamp(14rem,34vw,34rem)", top: "2rem", [flip ? "left" : "right"]: "-2vw", color: "transparent", WebkitTextStroke: `1px color-mix(in srgb, ${s.accent} 35%, transparent)` } as React.CSSProperties}
      >
        {s.num}
      </span>

      <div className="wrap relative grid items-center gap-14 py-28 md:py-40 lg:min-h-screen lg:grid-cols-12">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:pl-10" : "lg:pr-10"}`}>
          <Reveal>
            <p className="eyebrow mb-6 flex items-center gap-4" style={{ color: s.accent }}>
              <span className="h-px w-10" style={{ background: s.accent }} />
              {s.num} — Service
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display-lg !text-[clamp(2.8rem,5.6vw,6.2rem)]">{s.title}</h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="lede mt-7" style={{ color: s.inkSoft }}>
              {s.blurb}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <ul className="mt-8 space-y-3">
              {s.highlights.map((h) => (
                <li key={h} className="flex items-center gap-4 border-b pb-3 font-semibold tracking-wide" style={{ borderColor: "color-mix(in srgb, currentColor 18%, transparent)" }}>
                  <span className="inline-block h-1.5 w-1.5 rotate-45" style={{ background: s.accent }} />
                  {h}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.25}>
            <div className="mt-8 max-w-sm">
              <div className="mb-2 flex justify-between text-[0.62rem] font-bold uppercase tracking-[0.22em]" style={{ color: s.inkSoft }}>
                <span>Illustrative transformation</span>
                <span ref={pct}>0%</span>
              </div>
              <div className="h-px w-full" style={{ background: "color-mix(in srgb, currentColor 22%, transparent)" }}>
                <span ref={meter} className="block h-[3px] origin-left -translate-y-px" style={{ background: s.accent, transform: "scaleX(0)" }} />
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
            initial={reduce ? false : { clipPath: "inset(12% 8% 12% 8%)", opacity: 0 }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ "--clean": 0 } as React.CSSProperties}
          >
            <div className="frame-gold relative aspect-[4/3] overflow-hidden shadow-[0_60px_120px_-40px_rgba(0,0,0,.5)]" style={{ borderRadius: shape.main }}>
              <div className="svc-img absolute inset-0">
                <Scene kind={s.scene} title={`${s.title} — illustrated interior`} />
              </div>
              <div className="svc-sheen" aria-hidden />
            </div>
            {extra && (
              <div
                className={`absolute -bottom-10 w-[40%] overflow-hidden border-[8px] shadow-2xl ${flip ? "-right-4 lg:-right-10" : "-left-4 lg:-left-10"}`}
                style={{ borderColor: s.bg1, borderRadius: shape.extra }}
              >
                <div className="aspect-[4/5]">
                  <Scene kind={extra} title={`${extra} — illustrated interior`} />
                </div>
              </div>
            )}
            <span className="eyebrow absolute right-5 top-5 z-10 rounded-full bg-emerald-deep/65 px-3 py-1.5 !text-[0.55rem] text-ivory backdrop-blur">
              Illustrative render
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
