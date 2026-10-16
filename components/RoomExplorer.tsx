"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROOMS } from "../lib/site";
import { Lines, Reveal } from "./Motion";
import Photo from "./Photo";

// hotspot positions (% of the 3:2 stage) for each room's three focus areas
const SPOTS: Record<string, [number, number][]> = {
  living: [[44, 66], [62, 92], [92, 38]],
  kitchen: [[50, 56], [80, 40], [38, 88]],
  bathroom: [[84, 66], [29, 24], [48, 88]],
  bedroom: [[62, 78], [18, 90], [44, 62]],
  office: [[18, 66], [62, 44], [60, 88]],
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
  const ink = r.dark ? "#F7F4EE" : "#12302A";

  return (
    <section className="explorer section" style={{ "--bg1": r.bg1, "--accent": r.accent, color: ink } as React.CSSProperties}>
      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-8" style={{ color: r.accent }}>
            Room by room
          </p>
        </Reveal>
        <Lines lines={["Every room deserves", "*extraordinary care.*"]} className="display-lg" />

        <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* stage */}
          <div className="lg:order-2 lg:col-span-8">
            <div className="relative aspect-[3/2] overflow-hidden bg-black/10">
              <AnimatePresence initial={false}>
                <motion.div
                  key={r.id}
                  className="absolute inset-0"
                  initial={{ clipPath: dir > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }}
                  animate={{ clipPath: "inset(0 0 0 0)", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
                  exit={{ opacity: 0.5, transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }}
                >
                  <motion.div
                    className="absolute inset-0"
                    initial={{ scale: 1.22 }}
                    animate={{ scale: 1, transition: { duration: 2.2, ease: [0.22, 1, 0.36, 1] } }}
                  >
                    <Photo kind={r.scene} />
                  </motion.div>
                  {r.focus.map((f, k) => (
                    <button key={f} className={`hotspot ${SPOTS[r.id][k][0] > 65 ? "hotspot-left" : ""}`} style={{ left: `${SPOTS[r.id][k][0]}%`, top: `${SPOTS[r.id][k][1]}%` }} aria-label={f}>
                      <span className="hotspot-dot" />
                      <span className="hotspot-label">{f}</span>
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* controls */}
          <div className="lg:order-1 lg:col-span-4">
            <svg viewBox="0 0 400 250" className="mb-8 w-full max-w-[18rem]" role="group" aria-label="Home floor plan — choose a room">
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
                    <rect x={x} y={y} width={w} height={h} fill={on ? r.accent : "currentColor"} fillOpacity={on ? 0.95 : 0.05} stroke="currentColor" strokeOpacity={on ? 0 : 0.45} style={{ transition: "all .7s cubic-bezier(.22,1,.36,1)" }} />
                    <text x={x + w / 2} y={y + h / 2 + 3} textAnchor="middle" fontSize="9" fontWeight="500" letterSpacing="1.4" fill={on ? (r.dark ? "#12302A" : "#F7F4EE") : "currentColor"} style={{ textTransform: "uppercase", pointerEvents: "none" }}>
                      {rm.label.split(" ")[0]}
                    </text>
                  </g>
                );
              })}
            </svg>

            <ul className="mb-9 border-t" style={{ borderColor: "color-mix(in srgb, currentColor 18%, transparent)" }} aria-label="Rooms">
              {ROOMS.map((rm, k) => (
                <li key={rm.id}>
                  <button className="room-tab" aria-pressed={k === i} onClick={() => pick(k)}>
                    <span className="font-display text-sm">0{k + 1}</span>
                    <span className="eyebrow">{rm.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 } }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.25 } }}
              >
                <h3 className="font-display text-2xl">{r.title}</h3>
                <p className="mt-3 max-w-sm opacity-80">{r.blurb}</p>
                <ul className="mt-6 space-y-2 text-[0.9rem]">
                  {r.focus.map((f) => (
                    <li key={f} className="flex items-center gap-3">
                      <span className="inline-block h-px w-4" style={{ background: r.accent }} />
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
