"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { SERVICES } from "../lib/site";
import { getGsap, prefersReducedMotion } from "../lib/gsap";
import Scene from "./Scene";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const s = SERVICES[idx];
  const heroRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const inners = useRef<(HTMLDivElement | null)[]>([]);
  const shineRef = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const cleanTween = useRef<gsap.core.Tween | null>(null);

  /* ── scene transition ── */
  const go = useCallback((next: number) => {
    const n = (next + SERVICES.length) % SERVICES.length;
    if (n === current.current) return;
    const { gsap } = getGsap();
    const from = current.current;
    current.current = n;
    setIdx(n);

    const L = layers.current;
    const I = inners.current;
    const reduced = prefersReducedMotion();

    tl.current?.progress(1).kill();
    cleanTween.current?.kill();
    L.forEach((el, i) => {
      if (el && i !== from && i !== n) gsap.set(el, { display: "none" });
    });
    const toEl = L[n]!;
    const toIn = I[n]!;
    const fromEl = L[from]!;
    const fromIn = I[from]!;
    const sceneEl = toEl.querySelector<HTMLElement>(".scene")!;

    if (reduced) {
      gsap.set(fromEl, { display: "none" });
      gsap.set(toEl, { display: "block", clipPath: "none", zIndex: 2 });
      gsap.set(sceneEl, { "--clean": 1 });
      return;
    }

    gsap.set(sceneEl, { "--clean": 0 });
    gsap.set(toEl, { display: "block", zIndex: 3, clipPath: "inset(100% 0% 0% 0% round 48px)" });
    gsap.set(toIn, { scale: 1.35, yPercent: 8, rotate: 1.2 });
    gsap.set(fromEl, { zIndex: 2 });

    const t = gsap.timeline({
      onComplete: () => {
        gsap.set(fromEl, { display: "none", clearProps: "transform,opacity,filter" });
        gsap.set(toEl, { zIndex: 2 });
      },
    });
    t.to(toEl, { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.25, ease: "expo.inOut" }, 0)
      .to(toIn, { scale: 1, yPercent: 0, rotate: 0, duration: 1.9, ease: "expo.out" }, 0.1)
      .to(fromIn, { scale: 0.92, yPercent: -4, duration: 1.2, ease: "expo.inOut" }, 0)
      .to(fromEl, { opacity: 0.3, filter: "blur(6px)", duration: 1.2, ease: "power2.inOut" }, 0);
    tl.current = t;

    // the "cleaning" reveal for the newly arrived room
    cleanTween.current = gsap.to(sceneEl, { "--clean": 1, duration: 3.4, delay: 0.7, ease: "power2.inOut" });
    if (shineRef.current) {
      gsap.fromTo(
        shineRef.current,
        { xPercent: -120, opacity: 0.9 },
        { xPercent: 260, opacity: 0, duration: 2.6, delay: 0.8, ease: "power2.inOut" },
      );
    }
  }, []);

  /* ── first-load: room is cleaned in front of the visitor ── */
  useEffect(() => {
    const { gsap } = getGsap();
    const el = layers.current[0];
    if (!el) return;
    gsap.set(el, { display: "block", zIndex: 2 });
    const scene = el.querySelector<HTMLElement>(".scene")!;
    if (prefersReducedMotion()) {
      gsap.set(scene, { "--clean": 1 });
      return;
    }
    gsap.set(scene, { "--clean": 0 });
    cleanTween.current = gsap.to(scene, { "--clean": 1, duration: 3.6, delay: 1.1, ease: "power2.inOut" });
    if (shineRef.current) {
      gsap.fromTo(shineRef.current, { xPercent: -120, opacity: 0.9 }, { xPercent: 260, opacity: 0, duration: 2.8, delay: 1.2, ease: "power2.inOut" });
    }
    return () => {
      cleanTween.current?.kill();
      tl.current?.kill();
    };
  }, []);

  /* ── nav ink follows the theme ── */
  useEffect(() => {
    document.documentElement.style.setProperty("--nav-ink", s.ink);
  }, [s]);
  useEffect(
    () => () => {
      document.documentElement.style.removeProperty("--nav-ink");
    },
    [],
  );

  /* ── keyboard + pointer parallax ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t && /INPUT|TEXTAREA|SELECT/.test(t.tagName)) return;
      if (window.scrollY > window.innerHeight * 0.6) return;
      if (e.key === "ArrowRight") go(current.current + 1);
      if (e.key === "ArrowLeft") go(current.current - 1);
    };
    window.addEventListener("keydown", onKey);

    const hero = heroRef.current!;
    const stage = stageRef.current!;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
    const fine = window.matchMedia("(pointer: fine)").matches && !prefersReducedMotion();
    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      stage.style.setProperty("--px", cx.toFixed(3));
      stage.style.setProperty("--py", cy.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const leave = () => { tx = 0; ty = 0; };
    if (fine) {
      raf = requestAnimationFrame(tick);
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", leave);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, [go]);

  /* ── swipe ── */
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const onDown = (e: React.PointerEvent) => {
    swipe.current = { x: e.clientX, y: e.clientY };
  };
  const onUp = (e: React.PointerEvent) => {
    const p = swipe.current;
    swipe.current = null;
    if (!p) return;
    const dx = e.clientX - p.x;
    const dy = e.clientY - p.y;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) go(current.current + (dx < 0 ? 1 : -1));
  };

  const style = {
    "--bg1": s.bg1,
    "--bg2": s.bg2,
    "--accent": s.accent,
    "--ink": s.ink,
    "--ink-soft": s.inkSoft,
  } as React.CSSProperties;

  return (
    <section ref={heroRef} className="hero" style={style} aria-roledescription="carousel" aria-label="Cleaning services">
      {/* decor */}
      <div className="hero-decor" aria-hidden>
        <span className="hero-num font-display">{s.num}</span>
        <span className="hero-ring r1" />
        <span className="hero-ring r2" />
      </div>

      {/* stage */}
      <div className="hero-stage-wrap" onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => (swipe.current = null)}>
        <div ref={stageRef} className="hero-stage">
          {SERVICES.map((sv, i) => (
            <div
              key={sv.id}
              ref={(el) => {
                layers.current[i] = el;
              }}
              className="hero-layer"
              style={{ display: i === 0 ? "block" : "none" }}
              aria-hidden={i !== idx}
            >
              <div
                ref={(el) => {
                  inners.current[i] = el;
                }}
                className="hero-layer-in"
              >
                <Scene kind={sv.scene} title={`${sv.title} — illustrated luxury interior`} />
              </div>
            </div>
          ))}
          <div className="hero-vignette" />
          <div ref={shineRef} className="hero-shine" aria-hidden />
        </div>
        <div className="hero-frame" aria-hidden />
        <span className="hero-badge eyebrow">Illustrative render</span>
      </div>

      {/* copy */}
      <div className="hero-copy" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div key={s.id} initial="in" animate="show" exit="out">
            <motion.p
              className="eyebrow flex items-center gap-4"
              style={{ color: "var(--accent)" }}
              variants={{ in: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE, delay: 0.25 } }, out: { opacity: 0, x: 20, transition: { duration: 0.3 } } }}
            >
              <span className="h-px w-10" style={{ background: "var(--accent)" }} />
              {s.num} — {s.eyebrow}
            </motion.p>

            <h1 className="hero-title mt-6" style={{ color: "var(--ink)" }}>
              {s.headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    variants={{
                      in: { y: "112%", rotate: 3 },
                      show: { y: 0, rotate: 0, transition: { duration: 1.05, ease: EASE, delay: 0.3 + i * 0.1 } },
                      out: { y: "-112%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: i * 0.04 } },
                    }}
                  >
                    {i === 1 ? <em>{line}</em> : line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-7 max-w-md text-[0.98rem]"
              style={{ color: "var(--ink-soft)" }}
              variants={{ in: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE, delay: 0.65 } }, out: { opacity: 0, transition: { duration: 0.2 } } }}
            >
              {s.blurb}
            </motion.p>

            <ul className="mt-7 flex max-w-[30rem] flex-wrap gap-x-7 gap-y-2" style={{ color: "var(--ink)" }}>
              {s.highlights.map((h, i) => (
                <motion.li
                  key={h}
                  className="flex items-center gap-2.5 text-[0.8rem] font-semibold tracking-wide"
                  variants={{ in: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE, delay: 0.8 + i * 0.09 } }, out: { opacity: 0, transition: { duration: 0.15 } } }}
                >
                  <span className="inline-block h-1.5 w-1.5 rotate-45" style={{ background: "var(--accent)" }} />
                  {h}
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-9 flex flex-wrap gap-4"
              variants={{ in: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 1 } }, out: { opacity: 0, transition: { duration: 0.15 } } }}
            >
              <Link href={`/contact/?service=${s.id}`} className={`btn ${s.dark ? "btn-gold" : ""}`}>
                {s.cta} <span className="arrow">→</span>
              </Link>
              <Link href={`/services/#${s.id}`} className="btn btn-ghost" style={{ color: "var(--ink)" }}>
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* selector */}
      <div className="hero-selector">
        <div className="hero-sel-inner">
          <button className="hero-arrow" onClick={() => go(idx - 1)} aria-label="Previous service">
            ←
          </button>
          <div className="hero-tabs" role="tablist" aria-label="Choose a service">
            {SERVICES.map((sv, i) => (
              <button
                key={sv.id}
                role="tab"
                aria-selected={i === idx}
                aria-label={`${sv.num} ${sv.title}`}
                className={`hero-tab ${i === idx ? "on" : ""}`}
                onClick={() => go(i)}
              >
                <span className="hero-tab-num font-display">{sv.num}</span>
                <span className="hero-tab-label">{sv.label}</span>
                <span className="hero-tab-bar">
                  <i />
                </span>
              </button>
            ))}
          </div>
          <button className="hero-arrow" onClick={() => go(idx + 1)} aria-label="Next service">
            →
          </button>
        </div>
      </div>
    </section>
  );
}
