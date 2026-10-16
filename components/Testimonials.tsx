"use client";

import { useRef } from "react";
import { REVIEWS } from "../lib/site";
import { Lines, Reveal } from "./Motion";

/** Renders only genuine reviews supplied in lib/site.ts. With none, the section is omitted entirely. */
export default function Testimonials() {
  const track = useRef<HTMLDivElement>(null);
  if (REVIEWS.length === 0) return null;
  const scroll = (d: number) =>
    track.current?.scrollBy({ left: d * Math.min(560, window.innerWidth * 0.8), behavior: "smooth" });
  const arrow = { "--ink": "#102F29", "--accent": "#CBB38B", "--bg1": "#EAE1D4" } as React.CSSProperties;
  return (
    <section className="section bg-beige">
      <div className="wrap">
        <div className="mb-14 flex items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="eyebrow mb-6 text-[#8a6a32]">Kind words</p>
            </Reveal>
            <Lines lines={["WHAT OUR CLIENTS", "*ARE SAYING.*"]} className="display-lg text-emerald-deep [--em:#9c7b3f]" />
          </div>
          <div className="flex gap-3">
            <button className="hero-arrow" style={arrow} onClick={() => scroll(-1)} aria-label="Previous review">
              ←
            </button>
            <button className="hero-arrow" style={arrow} onClick={() => scroll(1)} aria-label="Next review">
              →
            </button>
          </div>
        </div>
        <div
          ref={track}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [scrollbar-width:none]"
          tabIndex={0}
          aria-label="Customer reviews"
        >
          {REVIEWS.map((r, i) => (
            <figure key={i} className="min-w-[85%] snap-start bg-ivory p-8 sm:min-w-[520px] sm:p-12">
              <div className="mb-4 text-champagne" aria-label={`${r.rating} out of 5 stars`}>
                {"★".repeat(Math.round(r.rating))}
              </div>
              <blockquote className="font-display text-3xl italic leading-snug text-emerald-deep">“{r.text}”</blockquote>
              <figcaption className="eyebrow mt-8 text-charcoal/70">
                {r.name}
                {r.source ? ` · ${r.source}` : ""}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
