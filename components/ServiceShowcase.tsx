"use client";

import Link from "next/link";
import { useState } from "react";
import { SERVICES } from "../lib/site";
import { Lines, ParallaxPhoto, Reveal } from "./Motion";

// asymmetric editorial placement
const LAYOUT = [
  { span: "lg:col-span-7", aspect: "aspect-[5/4]", mt: "" },
  { span: "lg:col-span-5", aspect: "aspect-[4/5]", mt: "lg:mt-32" },
  { span: "lg:col-span-5", aspect: "aspect-square", mt: "lg:-mt-10" },
  { span: "lg:col-span-7", aspect: "aspect-[16/11]", mt: "lg:mt-28" },
];

export default function ServiceShowcase() {
  const [hover, setHover] = useState<number | null>(null);
  const h = hover === null ? null : SERVICES[hover];
  return (
    <section className="showcase section" style={{ backgroundColor: h ? h.bg1 : "#EBE4D8", color: h ? h.ink : "#12302A" }}>
      <div className="wrap">
        <div className="mb-20 grid items-end gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-8" style={{ color: h ? h.accent : "#7d6840" }}>
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
                    <div className="zoom">
                      <ParallaxPhoto kind={s.scene} className={`${L.aspect} h-full w-full`} speed={4} />
                    </div>
                    <div className="svc-tint" style={{ background: s.bg1 }} />
                    <span className="svc-arrow" aria-hidden>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                        <path d="M7 17 17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-7">
                    <p className="eyebrow mb-3 opacity-60">{s.num}</p>
                    <h3 className="svc-title display-md">{s.title}</h3>
                    <span className="svc-title-line" />
                    <div className="svc-info">
                      <div>
                        <p className="mt-5 max-w-lg opacity-80">{s.blurb}</p>
                        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-[0.8rem]">
                          {s.highlights.map((x) => (
                            <li key={x} className="flex items-center gap-2">
                              <span className="inline-block h-px w-3" style={{ background: s.accent }} />
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
