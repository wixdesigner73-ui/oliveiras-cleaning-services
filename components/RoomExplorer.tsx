"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROOMS } from "../lib/site";
import { Lines, Reveal } from "./Motion";
import Scene from "./Scene";

// hotspot positions (% of the 3:2 stage) for each room's three focus areas
const SPOTS: Record<string, [number, number][]> = {
  living: [[50, 60], [50, 91], [24, 24]],
  kitchen: [[58, 42], [15, 48], [50, 90]],
  bathroom: [[35, 72], [75, 31], [55, 91]],
  bedroom: [[17, 76], [50, 92], [90, 32]],
  office: [[30, 88], [50, 40], [58, 96]],
};
const QUOTE: Record<string, string> = { office: "office-cleaning" };

// simple floor plan, one rect per room
const PLAN: Record<string, [number, number, number, number]> = {
  living: [10, 10, 170, 160],
  kitchen: [190, 10, 100, 100],
  bathroom: [300, 10, 90, 100],
  bedroom: [190, 120, 100, 120],
  office: [300, 120, 90, 120],
};

export default function RoomExplorer() {
  const [i, setI] = useState(0);
  const [prev, setPrev] = useState(0);
  const r = ROOMS[i];
  const dir = i >= prev ? 1 : -1;
  const pick = (n: number) => {
    setPrev(i);
    setI(n);
  };
  const ink = r.dark ? "#F8F5EE" : "#102F29";

  return (
    <section
      className="explorer section"
      style={{ "--bg1": r.bg1, "--bg2": r.bg2, "--accent": r.accent, color: ink } as React.CSSProperties}
    >
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-6 flex items-center gap-4" style={{ color: r.accent }}>
            <span className="h-px w-10" style={{ background: r.accent }} />
            Room by room
          </p>
        </Reveal>
        <Lines lines={["EVERY ROOM DESERVES", "*EXTRAORDINARY CARE.*"]} className="display-lg [--em:var(--accent)]" />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* stage */}
          <div className="lg:order-2 lg:col-span-8">
            <div className="explorer-stage frame-gold relative aspect-[3/2] overflow-hidden shadow-[0_50px_100px_-40px_rgba(0,0,0,.5)]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={r.id}
                  className="absolute inset-0"
                  initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)", x: dir * 40 }}
                  animate={{ clipPath: "inset(0 0 0 0)", x: 0, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
                  exit={{ opacity: 0.4, scale: 0.94, transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.3 }}
                    animate={{ scale: 1, transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    <Scene kind={r.scene} title={`${r.title} — illustrated interior`} />
                  </motion.div>
                  {r.focus.map((f, k) => (
                    <button
                      key={f}
                      className="hotspot"
                      style={{ left: `${SPOTS[r.id][k][0]}%`, top: `${SPOTS[r.id][k][1]}%` }}
                      aria-label={f}
                    >
                      <span className="hotspot-dot" />
                      <span className="hotspot-label">{f}</span>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
              <span className="absolute bottom-6 right-8 z-10 eyebrow !text-[0.55rem] rounded-full bg-emerald-deep/60 px-3 py-1.5 text-ivory backdrop-blur">
                Illustrative render
              </span>
            </div>
          </div>

          {/* controls */}
          <div className="lg:order-1 lg:col-span-4">
            <svg viewBox="0 0 400 250" className="mb-8 w-full max-w-sm" role="group" aria-label="Home floor plan — choose a room">
              <rect x="2" y="2" width="396" height="246" rx="10" fill="none" stroke="currentColor" strokeOpacity=".25" />
              <rect x="10" y="180" width="180" height="60" rx="6" fill="currentColor" fillOpacity=".06" />
              {ROOMS.map((rm, k) => {
                const [x, y, w, h] = PLAN[rm.id];
                const on = k === i;
                return (
                  <g
                    key={rm.id}
                    role="button"
                    tabIndex={0}
                    aria-label={rm.label}
                    aria-pressed={on}
                    onClick={() => pick(k)}
                    onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(k))}
                    className="plan-room"
                  >
                    <rect x={x} y={y} width={w} height={h} rx="6" fill={on ? r.accent : "currentColor"} fillOpacity={on ? 0.95 : 0.08} stroke={r.accent} strokeOpacity={on ? 1 : 0.6} style={{ transition: "all .7s cubic-bezier(.22,1,.36,1)" }} />
                    <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1" fill={on ? (r.dark ? "#102F29" : "#F8F5EE") : "currentColor"} style={{ textTransform: "uppercase", pointerEvents: "none" }}>
                      {rm.label.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            <ul className="mb-8 flex flex-wrap gap-2" aria-label="Rooms">
              {ROOMS.map((rm, k) => (
                <li key={rm.id}>
                  <button
                    onClick={() => pick(k)}
                    aria-pressed={k === i}
                    className="room-chip"
                    style={k === i ? { background: r.accent, color: r.dark ? "#102F29" : "#F8F5EE", borderColor: r.accent } : undefined}
                  >
                    <span className="font-display italic opacity-70">0{k + 1}</span> {rm.label}
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.25 } }}
              >
                <h3 className="font-display text-5xl italic">{r.title}</h3>
                <p className="mt-3 max-w-sm opacity-80">{r.blurb}</p>
                <p className="eyebrow mb-3 mt-6" style={{ color: r.accent }}>
                  Areas of focus
                </p>
                <ul className="space-y-2">
                  {r.focus.map((f) => (
                    <li key={f} className="flex items-center gap-3 border-b pb-2" style={{ borderColor: "color-mix(in srgb, currentColor 18%, transparent)" }}>
                      <span className="inline-block h-1.5 w-1.5 rotate-45" style={{ background: r.accent }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={`/contact/?service=${QUOTE[r.id] ?? "residential-cleaning"}`} className={`btn mt-8 ${r.dark ? "btn-gold" : ""}`}>
                  Get a Quote <span className="arrow">→</span>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
