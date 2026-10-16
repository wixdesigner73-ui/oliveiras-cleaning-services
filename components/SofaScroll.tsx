"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getGsap, prefersReducedMotion } from "../lib/gsap";
import Photo from "./Photo";

const STEPS = [
  { n: "01", t: "Before", d: "A cream sofa and one stubborn mark." },
  { n: "02", t: "The process", d: "A gentle, fabric-safe clean." },
  { n: "03", t: "Transformation", d: "The mark fades and the fabric is refreshed." },
  { n: "04", t: "After", d: "The whole room, beautifully refreshed." },
];
// the stain sits on the middle seat cushion: (44%, 71.5%) of the photo, in 1200×800 overlay units
const STAIN = { x: 0.44 * 1200, y: 0.715 * 800 };

export default function SofaScroll() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const vars = useRef<HTMLDivElement>(null);
  const tool = useRef<SVGGElement>(null);
  const foam = useRef<SVGGElement>(null);
  const burst = useRef<SVGGElement>(null);
  const [step, setStep] = useState(0);
  const [staticMode, setStaticMode] = useState(false);

  useEffect(() => {
    const { ScrollTrigger } = getGsap();
    if (prefersReducedMotion()) {
      setStaticMode(true);
      setStep(3);
      return;
    }
    const cam = camera.current!;
    const ctx = gsap.context(() => {
      const st = { stain: 0, clean: 0.8 };
      const apply = () => {
        vars.current?.style.setProperty("--stain", st.stain.toFixed(3));
        vars.current?.style.setProperty("--clean", st.clean.toFixed(3));
      };
      apply();
      gsap.set(cam, { scale: 1, transformOrigin: `${(STAIN.x / 1200) * 100}% ${(STAIN.y / 800) * 100}%` });
      gsap.set(tool.current, { x: STAIN.x + 300, y: STAIN.y - 220, opacity: 0, rotation: 0, transformOrigin: "0px 0px" });
      gsap.set(foam.current!.children, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set(burst.current!.children, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set("#sofa-end", { opacity: 0, y: 50 });

      const target = () => {
        const vw = window.innerWidth, vh = window.innerHeight;
        const W = stage.current!.offsetWidth, H = stage.current!.offsetHeight;
        const sx = (vw - W) / 2 + (STAIN.x / 1200) * W;
        const sy = (vh - H) / 2 + (STAIN.y / 800) * H;
        const wide = vw > 900;
        return { dx: vw * (wide ? 0.62 : 0.5) - sx, dy: vh * (wide ? 0.5 : 0.42) - sy, k: wide ? 2.4 : 2.7 };
      };

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: sec.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const t = self.progress * 10;
            setStep(t < 3.2 ? 0 : t < 5.4 ? 1 : t < 7.4 ? 2 : 3);
            sec.current?.classList.toggle("sofa-finale", t > 8.6);
          },
        },
      });

      tl.to("#sofa-head", { opacity: 0, y: -40, duration: 1.2 }, 1)
        .to(cam, { scale: () => target().k, x: () => target().dx, y: () => target().dy, duration: 2.6, ease: "power2.inOut" }, 0.7)
        .to(tool.current, { opacity: 1, x: STAIN.x - 6, y: STAIN.y - 2, rotation: -6, duration: 1.1, ease: "power2.out" }, 3.3)
        .to(foam.current!.children, { opacity: 0.9, scale: 1, duration: 0.8, stagger: 0.06 }, 4.0)
        .to(tool.current, { x: STAIN.x - 46, y: STAIN.y + 4, rotation: -10, duration: 0.55, ease: "sine.inOut" }, 4.4)
        .to(tool.current, { x: STAIN.x + 42, y: STAIN.y - 6, rotation: -2, duration: 0.6, ease: "sine.inOut" })
        .to(tool.current, { x: STAIN.x - 44, y: STAIN.y + 6, rotation: -10, duration: 0.6, ease: "sine.inOut" })
        .to(tool.current, { x: STAIN.x + 38, y: STAIN.y - 4, rotation: -2, duration: 0.6, ease: "sine.inOut" })
        .to(tool.current, { x: STAIN.x - 26, y: STAIN.y + 3, rotation: -8, duration: 0.5, ease: "sine.inOut" })
        .to(st, { stain: 1, duration: 2.7, ease: "power1.inOut", onUpdate: apply }, 4.4)
        .to(foam.current!.children, { opacity: 0, scale: 1.5, duration: 0.6, stagger: 0.03 }, 6.75)
        .to(tool.current, { opacity: 0, x: STAIN.x + 300, y: STAIN.y - 220, rotation: 8, duration: 0.9, ease: "power2.in" }, 6.9)
        .to(burst.current!.children, { opacity: 1, scale: 1.1, duration: 0.35, stagger: 0.05, ease: "power2.out" }, 7.0)
        .to(burst.current!.children, { opacity: 0, scale: 0.2, rotation: 90, duration: 0.5, stagger: 0.05 }, 7.5)
        .to(cam, { scale: 1, x: 0, y: 0, duration: 1.9, ease: "power2.inOut" }, 7.5)
        .to(st, { clean: 1, duration: 1.9, onUpdate: apply }, 7.5)
        .to("#sofa-end", { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }, 8.7);
    }, sec);
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, []);

  const star = (dx: number, dy: number, s: number) =>
    `M${STAIN.x + dx} ${STAIN.y + dy - 14 * s} Q${STAIN.x + dx + 1.5} ${STAIN.y + dy - 1.5} ${STAIN.x + dx + 14 * s} ${STAIN.y + dy} Q${STAIN.x + dx + 1.5} ${STAIN.y + dy + 1.5} ${STAIN.x + dx} ${STAIN.y + dy + 14 * s} Q${STAIN.x + dx - 1.5} ${STAIN.y + dy + 1.5} ${STAIN.x + dx - 14 * s} ${STAIN.y + dy} Q${STAIN.x + dx - 1.5} ${STAIN.y + dy - 1.5} ${STAIN.x + dx} ${STAIN.y + dy - 14 * s}Z`;

  return (
    <section ref={sec} className={`sofa ${staticMode ? "sofa-static" : ""}`} aria-labelledby="sofa-title">
      <div className="sofa-pin">
        <div ref={stage} className="sofa-stage">
          <div ref={camera} className="sofa-camera">
            <div ref={vars} className="absolute inset-0" style={staticMode ? ({ "--clean": 1, "--stain": 1 } as React.CSSProperties) : undefined}>
              <Photo kind="living" alt="Cream sofa with a stain on the middle seat cushion being gently cleaned, then the whole living room revealed" />
              <span className="stain" aria-hidden />
              <span className="stain stain-2" aria-hidden />
              <span className="fresh-glow" aria-hidden />
            </div>
            <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <radialGradient id="padG" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#ffffff" stopOpacity=".85" />
                  <stop offset=".6" stopColor="#ffffff" stopOpacity=".45" />
                  <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
                <filter id="padB" x="-20%" y="-30%" width="140%" height="160%">
                  <feGaussianBlur stdDeviation="1.4" />
                </filter>
              </defs>
              <g ref={burst}>
                {[[-26, -6, 1.3], [30, -14, 1], [4, 12, 1.5], [-10, -22, 0.8], [46, 8, 0.7]].map(([dx, dy, s], i) => (
                  <path key={i} d={star(dx, dy, s)} fill="#fffdf2" />
                ))}
              </g>
              <g ref={foam}>
                {[[-38, -2, 7], [-18, 9, 5], [0, -5, 8], [20, 7, 6], [40, -4, 6.5], [-6, 14, 4], [30, -13, 4], [-30, -12, 5]].map(([dx, dy, r], i) => (
                  <circle key={i} cx={STAIN.x + dx} cy={STAIN.y + dy} r={r} fill="#fff" fillOpacity=".75" stroke="#e2ebe7" strokeWidth=".8" />
                ))}
              </g>
              {/* a soft sweeping glow stands in for the cleaning motion (no hands, no cartoon tool) */}
              <g ref={tool}>
                <ellipse cx="0" cy="0" rx="46" ry="17" fill="url(#padG)" opacity=".8" />
                <ellipse cx="-6" cy="-3" rx="22" ry="6" fill="#fff" opacity=".4" filter="url(#padB)" />
              </g>
            </svg>
          </div>
        </div>

        <div id="sofa-head" className="sofa-head">
          <p className="eyebrow text-[#7d6840]">Cleaning, up close</p>
          <h2 id="sofa-title" className="display-lg mt-4 text-emerald-deep">
            The beauty is in <em>the details.</em>
          </h2>
          <p className="mt-5 max-w-md text-charcoal/75">Keep scrolling and watch a single mark disappear.</p>
        </div>

        <div className="sofa-rail" aria-hidden>
          <ol>
            {STEPS.map((s, i) => (
              <li key={s.n} className={i === step ? "on" : ""}>
                <span className="eyebrow !text-[0.6rem]">
                  {s.n} · {s.t}
                </span>
              </li>
            ))}
          </ol>
        </div>

        <p className="sofa-caption" aria-live="polite">
          <span className="eyebrow text-champagne">
            {STEPS[step].n} — {STEPS[step].t}
          </span>
          <span className="mt-1 block font-display text-xl text-ivory sm:text-2xl">{STEPS[step].d}</span>
        </p>

        <div id="sofa-end" className="sofa-end" style={staticMode ? { opacity: 1 } : undefined}>
          <h3 className="display-md text-ivory">
            Every Detail <em>Makes a Difference.</em>
          </h3>
          <Link href="/services/" className="btn btn-gold mt-7">
            Explore Our Services <span className="arrow">→</span>
          </Link>
        </div>

        <span className="sofa-tag">Illustrative cleaning concept</span>
      </div>
    </section>
  );
}
