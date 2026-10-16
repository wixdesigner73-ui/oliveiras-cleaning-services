"use client";

import { useEffect, useRef, useState } from "react";
import { getGsap, prefersReducedMotion } from "../lib/gsap";
import Scene from "./Scene";

const STEPS = [
  { n: "01", t: "Grease & marks", d: "Splatter, rings and fingerprints settle on every surface." },
  { n: "02", t: "Surface by surface", d: "A gentle, steady wipe lifts the buildup away." },
  { n: "03", t: "Gleaming", d: "Marble, steel and brass, clean and bright." },
];

/** Scroll-scrubbed kitchen: a wipe sweeps across the room, revealing the clean version beneath. No people. */
export default function CleaningDemo() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const dirty = useRef<HTMLDivElement>(null);
  const head = useRef<HTMLDivElement>(null);
  const trail = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [step, setStep] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    if (prefersReducedMotion()) {
      setStaticMode(true);
      setStep(2);
      return;
    }
    const render = (p: number) => {
      const W = stage.current!.offsetWidth;
      const vw = window.innerWidth;
      const margin = Math.max(0, ((W - vw) / 2 / W) * 100);
      const x = margin + (100 - margin * 2) * p;
      dirty.current!.style.clipPath = `inset(0 0 0 ${x.toFixed(2)}%)`;
      head.current!.style.left = `${x.toFixed(2)}%`;
      trail.current!.style.width = `${Math.max(0, x - margin).toFixed(2)}%`;
      stage.current!.style.transform = `translate(-50%, -50%) scale(${(1 + p * 0.08).toFixed(4)})`;
      if (num.current) num.current.textContent = String(Math.round(p * 100));
      setStep(p < 0.33 ? 0 : p < 0.7 ? 1 : 2);
    };
    render(0);
    const st = ScrollTrigger.create({
      trigger: sec.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
      onUpdate: (self) => render(self.progress),
    });
    const onResize = () => render(st.progress);
    window.addEventListener("resize", onResize);
    return () => {
      st.kill();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={sec} className={`demo ${staticMode ? "demo-static" : ""}`} aria-labelledby="demo-title">
      <div className="demo-pin">
        <div ref={stage} className="demo-stage">
          <div className="absolute inset-0">
            <Scene kind="kitchen" clean={1} title="Illustrated kitchen after cleaning" />
          </div>
          <div ref={dirty} className="absolute inset-0" style={{ clipPath: staticMode ? "inset(0 0 0 100%)" : "inset(0 0 0 0%)" }}>
            <Scene kind="kitchen" clean={0} title="Illustrated kitchen before cleaning" />
          </div>
          <div ref={trail} className="demo-trail" aria-hidden />
          <div ref={head} className="demo-head" aria-hidden style={staticMode ? { left: "100%" } : undefined}>
            <span className="demo-pad" />
          </div>
        </div>
        <div className="demo-veil" />
        <div className="demo-copy">
          <p className="eyebrow text-champagne">Interactive cleaning demonstration</p>
          <h2 id="demo-title" className="display-lg mt-4 text-ivory !text-[clamp(2.6rem,6vw,6rem)]">
            From grime<br />
            <em className="text-champagne">to gleam.</em>
          </h2>
          <p className="mt-4 max-w-sm text-ivory/75">Keep scrolling to wipe the kitchen clean, surface by surface.</p>
        </div>
        <div className="demo-readout" aria-live="polite">
          <span className="font-display text-[clamp(4rem,10vw,9rem)] italic leading-none text-ivory">
            <span ref={num}>{staticMode ? "100" : "0"}</span>
            <span className="text-champagne">%</span>
          </span>
          <span className="mt-4 block eyebrow text-champagne">{STEPS[step].n} — {STEPS[step].t}</span>
          <span className="mt-1 block max-w-[17rem] font-display text-2xl italic text-ivory">{STEPS[step].d}</span>
        </div>
        <span className="demo-tag eyebrow">Illustrative cleaning concept</span>
      </div>
    </section>
  );
}
