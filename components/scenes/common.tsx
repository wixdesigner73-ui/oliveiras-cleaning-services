import { CSSProperties, ReactNode, useId } from "react";

/** Deterministic PRNG so SSR and client render identical specks. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Unique, CSS-safe id prefix per rendered scene (the same scene can appear many times on a page). */
export function useUid() {
  return "s" + useId().replace(/[^a-zA-Z0-9]/g, "");
}

/** Moves an element from its "untidy" offset to its resting place as --clean goes 0 → 1. */
export function tidy(dx: number, dy = 0, rot = 0, origin = "center"): CSSProperties {
  return {
    transform: `translate(calc((1 - var(--clean, 1)) * ${dx}px), calc((1 - var(--clean, 1)) * ${dy}px)) rotate(calc((1 - var(--clean, 1)) * ${rot}deg))`,
    transformBox: "fill-box",
    transformOrigin: origin,
  };
}

export const mess: CSSProperties = { opacity: "calc(1 - var(--clean, 1))" };
export const fresh = (k = 1): CSSProperties => ({ opacity: `calc(var(--clean, 1) * ${k})` });
/** Eases in late so shine appears after most of the grime is gone. */
export const shine = (k = 1): CSSProperties => ({
  opacity: `calc(max(0, var(--clean, 1) - 0.35) * ${(k / 0.65).toFixed(3)})`,
});

type SvgProps = { children: ReactNode; title?: string; className?: string };

export function SceneSvg({ children, title, className }: SvgProps) {
  return (
    <svg
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Perspective plank/tile lines converging on a vanishing point. */
export function FloorLines({
  fy,
  vpY,
  count = 14,
  stroke = "rgba(60,40,20,.16)",
  width = 1.4,
}: {
  fy: number;
  vpY: number;
  count?: number;
  stroke?: string;
  width?: number;
}) {
  const lines = [];
  for (let i = 0; i <= count; i++) {
    const xb = -600 + (i / count) * 2400;
    const xt = 600 + (xb - 600) * ((fy - vpY) / (800 - vpY));
    lines.push(<line key={i} x1={xt} y1={fy} x2={xb} y2={800} stroke={stroke} strokeWidth={width} />);
  }
  // cross seams, spaced with perspective
  for (let j = 1; j < 7; j++) {
    const t = (j / 7) ** 1.7;
    const y = fy + (800 - fy) * t;
    lines.push(<line key={"h" + j} x1={0} y1={y} x2={1200} y2={y} stroke={stroke} strokeWidth={width * 0.8} opacity={0.6} />);
  }
  return <g>{lines}</g>;
}

/** Floating dust motes shown while the room is dirty. */
export function DustMotes({ seed = 7, n = 38, area = [0, 0, 1200, 700] as number[] }) {
  const r = rng(seed);
  const [x0, y0, x1, y1] = area;
  return (
    <g style={mess} className="motes">
      {Array.from({ length: n }, (_, i) => (
        <circle
          key={i}
          cx={x0 + r() * (x1 - x0)}
          cy={y0 + r() * (y1 - y0)}
          r={1 + r() * 2.4}
          fill="#fff7e0"
          opacity={0.35 + r() * 0.5}
          style={{ animationDelay: `${(r() * 6).toFixed(2)}s`, animationDuration: `${(7 + r() * 7).toFixed(1)}s` }}
          className="mote"
        />
      ))}
    </g>
  );
}

/** Four-point sparkles that glint once the space is clean. */
export function Sparkles({ pts, color = "#fffbe8" }: { pts: [number, number, number?][]; color?: string }) {
  return (
    <g style={shine(1)}>
      {pts.map(([x, y, s = 1], i) => (
        <path
          key={i}
          className="glint"
          style={{ animationDelay: `${i * 0.55}s`, transformBox: "fill-box", transformOrigin: "center" }}
          d={`M${x} ${y - 16 * s} Q${x + 2 * s} ${y - 2 * s} ${x + 16 * s} ${y} Q${x + 2 * s} ${y + 2 * s} ${x} ${y + 16 * s} Q${x - 2 * s} ${y + 2 * s} ${x - 16 * s} ${y} Q${x - 2 * s} ${y - 2 * s} ${x} ${y - 16 * s}Z`}
          fill={color}
        />
      ))}
    </g>
  );
}

/** Shared soft shadow + blur filters. */
export function CommonDefs({ u }: { u: string }) {
  return (
    <defs>
      <filter id={`${u}b2`} x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" />
      </filter>
      <filter id={`${u}b8`} x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="8" />
      </filter>
      <filter id={`${u}b24`} x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="24" />
      </filter>
      <filter id={`${u}fabric`} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
        <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.28  0 0 0 0 0.2  0 0 0 .14 0" />
        <feComposite in2="SourceGraphic" operator="in" />
      </filter>
      <radialGradient id={`${u}shadow`} cx="50%" cy="50%" r="50%">
        <stop offset="0" stopColor="#1a1208" stopOpacity=".55" />
        <stop offset="1" stopColor="#1a1208" stopOpacity="0" />
      </radialGradient>
      <linearGradient id={`${u}gold`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#E7D3A6" />
        <stop offset=".5" stopColor="#CBB38B" />
        <stop offset="1" stopColor="#9C7B3F" />
      </linearGradient>
    </defs>
  );
}
