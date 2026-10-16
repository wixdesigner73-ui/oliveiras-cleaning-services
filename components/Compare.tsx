"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { SceneKey } from "../lib/site";
import { prefersReducedMotion } from "../lib/gsap";
import Scene from "./Scene";

/** Draggable before/after. Left = before (untidy), right = after (clean). Position lives in a CSS var for 60fps drags. */
export default function Compare({ kind, label, className = "" }: { kind: SceneKey; label: string; className?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const handle = useRef<HTMLDivElement>(null);
  const pos = useRef(50);
  const drag = useRef(false);

  const set = (p: number) => {
    const v = Math.min(98, Math.max(2, p));
    pos.current = v;
    box.current?.style.setProperty("--pos", `${v}%`);
    handle.current?.setAttribute("aria-valuenow", String(Math.round(v)));
  };
  const fromEvent = (e: React.PointerEvent) => {
    const r = box.current!.getBoundingClientRect();
    set(((e.clientX - r.left) / r.width) * 100);
  };

  // one-time hint nudge when first scrolled into view
  useEffect(() => {
    const el = box.current!;
    if (prefersReducedMotion()) return;
    const proxy = { v: 50 };
    const io = new IntersectionObserver(
      ([en]) => {
        if (!en.isIntersecting) return;
        io.disconnect();
        gsap
          .timeline({ delay: 0.5 })
          .to(proxy, { v: 72, duration: 1, ease: "power2.inOut", onUpdate: () => !drag.current && set(proxy.v) })
          .to(proxy, { v: 28, duration: 1.4, ease: "power2.inOut", onUpdate: () => !drag.current && set(proxy.v) })
          .to(proxy, { v: 50, duration: 0.9, ease: "power2.inOut", onUpdate: () => !drag.current && set(proxy.v) });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={box}
      className={`compare ${className}`}
      style={{ "--pos": "50%" } as React.CSSProperties}
      onPointerDown={(e) => {
        drag.current = true;
        e.currentTarget.setPointerCapture(e.pointerId);
        fromEvent(e);
      }}
      onPointerMove={(e) => drag.current && fromEvent(e)}
      onPointerUp={() => (drag.current = false)}
      onPointerCancel={() => (drag.current = false)}
    >
      <div className="absolute inset-0">
        <Scene kind={kind} clean={1} title={`${label} after cleaning (illustrative)`} />
      </div>
      <div className="compare-before absolute inset-0">
        <Scene kind={kind} clean={0} title={`${label} before cleaning (illustrative)`} />
      </div>
      <span className="compare-chip left-4">Before</span>
      <span className="compare-chip right-4">After</span>
      <div className="compare-line" aria-hidden />
      <div
        ref={handle}
        className="compare-handle"
        role="slider"
        tabIndex={0}
        aria-label={`${label}: drag to compare before and after`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={50}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") set(pos.current - 4);
          else if (e.key === "ArrowRight") set(pos.current + 4);
          else if (e.key === "Home") set(2);
          else if (e.key === "End") set(98);
          else return;
          e.preventDefault();
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" />
        </svg>
      </div>
    </div>
  );
}
