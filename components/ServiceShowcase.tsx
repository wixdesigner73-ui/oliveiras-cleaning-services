"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "../lib/site";
import { Lines, ParallaxScene, Reveal } from "./Motion";

// asymmetric editorial placement
const LAYOUT = [
  { span: "lg:col-span-7", aspect: "aspect-[5/4]", mt: "", radius: "0px" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", mt: "lg:mt-32", radius: "200px 200px 0 0" },
  { span: "lg:col-span-5", aspect: "aspect-square", mt: "lg:-mt-10", radius: "0px 0px 200px 0px" },
  { span: "lg:col-span-7", aspect: "aspect-[16/11]", mt: "lg:mt-28", radius: "0px" },
];

export default function ServiceShowcase() {
  const [hover, setHover] = useState<number | null>(null);
  const h = hover === null ? null : SERVICES[hover];
  return (
    <section
      className="showcase section"
      style={{ backgroundColor: h ? h.bg1 : "#EAE1D4", color: h ? h.ink : "#102F29" }}
    >
      <div className="wrap">
        <div className="mb-20 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-6" style={{ color: h ? h.accent : "#8a6a32" }}>
                Our Cleaning Services
              </p>
            </Reveal>
            <Lines lines={["EXCEPTIONAL CARE", "*FOR EVERY SPACE.*"]} className="display-lg" />
          </div>
          <Reveal className="lg:col-span-4" delay={0.2}>
            <p className="lede opacity-75">Four ways we help your spaces feel clean, calm and beautifully cared for.</p>
          </Reveal>
        </div>

        <div className="grid gap-x-10 gap-y-20 lg:grid-cols-12">
          {SERVICES.map((s, i) => {
            const L = LAYOUT[i];
            return (
              <div key={s.id} className={`${L.span} ${L.mt}`}>
                <Link
                  href={`/services/#${s.id}`}
                  className="svc"
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  aria-label={`${s.title} — view details`}
                >
                  <div className="svc-media">
                    <ParallaxScene kind={s.scene} title={`${s.title} illustration`} className={`${L.aspect} w-full`} radius={L.radius} speed={5} />
                    <div className="svc-tint" style={{ background: s.bg2, borderRadius: L.radius }} />
                    <span className="svc-arrow" aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                    <span className="absolute bottom-5 left-6 z-[4] font-display text-6xl italic text-ivory drop-shadow-[0_2px_16px_rgba(0,0,0,.45)]">
                      {s.num}
                    </span>
                  </div>
                  <div className="mt-7">
                    <h3 className="svc-title display-md">{s.title}</h3>
                    <span className="svc-title-line" />
                    <div className="svc-info">
                      <div>
                        <p className="mt-5 max-w-lg opacity-80">{s.blurb}</p>
                        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[0.78rem] font-semibold tracking-wide">
                          {s.highlights.map((x) => (
                            <li key={x} className="flex items-center gap-2">
                              <span className="inline-block h-1.5 w-1.5 rotate-45" style={{ background: s.accent }} />
                              {x}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
