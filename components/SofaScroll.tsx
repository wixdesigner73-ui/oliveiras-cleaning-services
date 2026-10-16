"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { getGsap, prefersReducedMotion } from "../lib/gsap";
import Scene from "./Scene";

const STEPS = [
  { n: "01", t: "Before", d: "A cream sofa, one stubborn mark." },
  { n: "02", t: "The process", d: "A fabric-safe brush gently lifts it." },
  { n: "03", t: "Transformation", d: "The stain fades; the fabric is refreshed." },
  { n: "04", t: "After", d: "The whole room, beautifully refreshed." },
];
// stain location inside the 1200×800 living-room scene
const STAIN = { x: 642, y: 548 };

export default function SofaScroll() {
  const sec = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const vars = useRef<HTMLDivElement>(null);
  const tool = useRef<SVGGElement>(null);
  const foam = useRef<SVGGElement>(null);
  const burst = useRef<SVGGElement>(null);
  const railFill = useRef<HTMLSpanElement>(null);
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
      const st = { stain: 0, clean: 0.9 };
      const apply = () => {
        vars.current?.style.setProperty("--stain", st.stain.toFixed(3));
        vars.current?.style.setProperty("--clean", st.clean.toFixed(3));
      };
      apply();
      gsap.set(cam, { scale: 1, transformOrigin: `${(STAIN.x / 1200) * 100}% ${(STAIN.y / 800) * 100}%` });
      gsap.set(tool.current, { x: STAIN.x + 340, y: STAIN.y - 260, opacity: 0, rotation: 0, transformOrigin: "0px 0px" });
      gsap.set(foam.current!.children, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set(burst.current!.children, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
      gsap.set("#sofa-end", { opacity: 0, y: 60 });

      const target = () => {
        const vw = window.innerWidth, vh = window.innerHeight;
        const W = stage.current!.offsetWidth, H = stage.current!.offsetHeight;
        const sx = (vw - W) / 2 + (STAIN.x / 1200) * W;
        const sy = (vh - H) / 2 + (STAIN.y / 800) * H;
        return { dx: vw * (vw > 900 ? 0.64 : 0.5) - sx, dy: vh * (vw > 900 ? 0.5 : 0.42) - sy, k: vw > 900 ? 3.2 : 3.4 };
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
            if (railFill.current) railFill.current.style.transform = `scaleY(${self.progress.toFixed(3)})`;
          },
        },
      });

      // intro headline leaves, camera pushes in toward the stain
      tl.to("#sofa-head", { opacity: 0, y: -50, duration: 1.2 }, 1)
        .to(cam, { scale: () => target().k, x: () => target().dx, y: () => target().dy, duration: 2.6, ease: "power2.inOut" }, 0.7)
        // tool arrives
        .to(tool.current, { opacity: 1, x: STAIN.x - 8, y: STAIN.y - 4, rotation: -8, duration: 1.1, ease: "power2.out" }, 3.3)
        .to(foam.current!.children, { opacity: 0.95, scale: 1, duration: 0.8, stagger: 0.06 }, 4.0)
        // scrubbing strokes (x/y wobble) while the stain dissolves
        .to(tool.current, { x: STAIN.x - 52, y: STAIN.y + 6, rotation: -14, duration: 0.55, ease: "sine.inOut" }, 4.4)
        .to(tool.current, { x: STAIN.x + 44, y: STAIN.y - 8, rotation: -2, duration: 0.6, ease: "sine.inOut" })
        .to(tool.current, { x: STAIN.x - 48, y: STAIN.y + 8, rotation: -14, duration: 0.6, ease: "sine.inOut" })
        .to(tool.current, { x: STAIN.x + 40, y: STAIN.y - 6, rotation: -2, duration: 0.6, ease: "sine.inOut" })
        .to(tool.current, { x: STAIN.x - 30, y: STAIN.y + 4, rotation: -10, duration: 0.5, ease: "sine.inOut" })
        .to(st, { stain: 1, duration: 2.7, ease: "power1.inOut", onUpdate: apply }, 4.4)
        // tool leaves, sparkle
        .to(foam.current!.children, { opacity: 0, scale: 1.6, duration: 0.6, stagger: 0.03 }, 6.75)
        .to(tool.current, { opacity: 0, x: STAIN.x + 320, y: STAIN.y - 240, rotation: 10, duration: 0.9, ease: "power2.in" }, 6.9)
        .to(burst.current!.children, { opacity: 1, scale: 1.1, duration: 0.35, stagger: 0.05, ease: "power2.out" }, 7.0)
        .to(burst.current!.children, { opacity: 0, scale: 0.2, rotation: 90, duration: 0.5, stagger: 0.05 }, 7.5)
        // camera pulls back to the whole room
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

  return (
    <section ref={sec} className={`sofa ${staticMode ? "sofa-static" : ""}`} aria-labelledby="sofa-title">
      <div className="sofa-pin">
        <div ref={stage} className="sofa-stage">
          <div ref={camera} className="sofa-camera">
          <div ref={vars} className="absolute inset-0" style={staticMode ? ({ "--clean": 1, "--stain": 1 } as React.CSSProperties) : undefined}>
            <Scene kind="living" title="Illustrated cream sofa with a stain being gently cleaned, then the whole room revealed" />
          </div>
            <svg viewBox="0 0 1200 800" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                <linearGradient id="toolHandle" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#E7D3A6" />
                  <stop offset="1" stopColor="#9C7B3F" />
                </linearGradient>
                <linearGradient id="toolHead" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#245B4C" />
                  <stop offset="1" stopColor="#102F29" />
                </linearGradient>
              </defs>
              {/* sparkle burst where the stain was */}
              <g ref={burst}>
                {[
                  [-30, -6, 1.4],
                  [34, -16, 1.1],
                  [4, 14, 1.6],
                  [-12, -26, 0.9],
                  [52, 10, 0.8],
                ].map(([dx, dy, s], i) => (
                  <path
                    key={i}
                    d={`M${STAIN.x + dx} ${STAIN.y + dy - 18 * s} Q${STAIN.x + dx + 2} ${STAIN.y + dy - 2} ${STAIN.x + dx + 18 * s} ${STAIN.y + dy} Q${STAIN.x + dx + 2} ${STAIN.y + dy + 2} ${STAIN.x + dx} ${STAIN.y + dy + 18 * s} Q${STAIN.x + dx - 2} ${STAIN.y + dy + 2} ${STAIN.x + dx - 18 * s} ${STAIN.y + dy} Q${STAIN.x + dx - 2} ${STAIN.y + dy - 2} ${STAIN.x + dx} ${STAIN.y + dy - 18 * s}Z`}
                    fill="#fffbe8"
                  />
                ))}
              </g>
              {/* foam bubbles */}
              <g ref={foam}>
                {[
                  [-44, -2, 9], [-22, 10, 6], [0, -6, 10], [24, 8, 7], [46, -4, 8], [-8, 16, 5], [34, -14, 5], [-34, -14, 6],
                ].map(([dx, dy, r], i) => (
                  <circle key={i} cx={STAIN.x + dx} cy={STAIN.y + dy} r={r} fill="#fff" fillOpacity=".78" stroke="#dfe9e6" strokeWidth="1" />
                ))}
              </g>
              {/* upholstery brush (no hands) */}
              <g ref={tool}>
                <path d="M46 -14 L168 -176" stroke="url(#toolHandle)" strokeWidth="17" strokeLinecap="round" />
                <path d="M46 -14 L168 -176" stroke="#fff" strokeOpacity=".35" strokeWidth="3" strokeLinecap="round" transform="translate(-3 -3)" />
                <rect x="-62" y="-26" width="116" height="36" rx="14" fill="url(#toolHead)" />
                <rect x="-62" y="-26" width="116" height="9" rx="4" fill="#CBB38B" />
                <rect x="-54" y="10" width="100" height="14" rx="5" fill="#EFE7D6" />
                {[...Array(15)].map((_, i) => (
                  <line key={i} x1={-48 + i * 6.8} y1={14} x2={-48 + i * 6.8} y2={26} stroke="#CBB38B" strokeWidth="2" strokeLinecap="round" />
                ))}
              </g>
            </svg>
          </div>
                  </div>

        <div id="sofa-head" className="sofa-head">
          <p className="eyebrow text-[#8a6a32]">Cleaning, up close</p>
          <h2 id="sofa-title" className="display-lg mt-4 text-emerald-deep">
            The beauty is in <em className="text-[#9c7b3f]">the details.</em>
          </h2>
          <p className="mt-5 max-w-md text-charcoal/75">Keep scrolling and watch a single stain disappear.</p>
        </div>

        <div className="sofa-rail" aria-hidden>
          <span className="sofa-rail-line">
            <span ref={railFill} className="sofa-rail-fill" />
          </span>
          <ol>
            {STEPS.map((s, i) => (
              <li key={s.n} className={i === step ? "on" : ""}>
                <span className="font-display text-2xl italic">{s.n}</span>
                <span className="eyebrow !text-[0.6rem]">{s.t}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="sofa-caption" aria-live="polite">
          <span className="eyebrow text-champagne">{STEPS[step].n} — {STEPS[step].t}</span>
          <span className="mt-1 block font-display text-2xl italic text-ivory sm:text-3xl">{STEPS[step].d}</span>
        </p>

        <div id="sofa-end" className="sofa-end" style={staticMode ? { opacity: 1 } : undefined}>
          <h3 className="display-md text-ivory">
            Every Detail <em className="text-champagne">Makes a Difference.</em>
          </h3>
          <Link href="/services/" className="btn btn-gold mt-7">
            Explore Our Services <span className="arrow">→</span>
          </Link>
        </div>

        <span className="sofa-tag eyebrow">Illustrative cleaning concept</span>
      </div>
    </section>
  );
}
