import type { ReactElement } from "react";
import { CommonDefs, DustMotes, FloorLines, SceneSvg, Sparkles, fresh, mess, rng, shine, tidy, useUid } from "./common";

/** Spa bathroom: sage tile, freestanding tub, brass vanity. Soap scum, grout stains and water spots clear. */
export default function Bathroom({ title }: { title?: string }) {
  const u = useUid();
  const g = (n: string) => `url(#${u}${n})`;
  const r = rng(77);
  const spots = Array.from({ length: 34 }, () => ({ x: 740 + r() * 330, y: 120 + r() * 290, r: 1.5 + r() * 4.5 }));
  const tiles: ReactElement[] = [];
  for (let c = 0; c < 15; c++) tiles.push(<line key={"v" + c} x1={c * 85} y1={0} x2={c * 85} y2={560} />);
  for (let rr = 0; rr < 9; rr++) tiles.push(<line key={"h" + rr} x1={0} y1={rr * 68} x2={1200} y2={rr * 68} />);
  return (
    <SceneSvg title={title}>
      <CommonDefs u={u} />
      <defs>
        <linearGradient id={`${u}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E3EBE1" />
          <stop offset="1" stopColor="#C6D4C5" />
        </linearGradient>
        <linearGradient id={`${u}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFC6B4" />
          <stop offset="1" stopColor="#EFE8D8" />
        </linearGradient>
        <linearGradient id={`${u}tub`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#DDE0DA" />
        </linearGradient>
        <linearGradient id={`${u}mirror`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EAF3F1" />
          <stop offset="1" stopColor="#B9CFCB" />
        </linearGradient>
        <linearGradient id={`${u}wood`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8A6A48" />
          <stop offset="1" stopColor="#6E5136" />
        </linearGradient>
        <linearGradient id={`${u}marble`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBFAF6" />
          <stop offset="1" stopColor="#D8D5CB" />
        </linearGradient>
        <linearGradient id={`${u}sweep`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF6D8" stopOpacity=".7" />
          <stop offset="1" stopColor="#FFF6D8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="570" fill={g("wall")} />
      <g stroke="#9FB19F" strokeOpacity=".7" strokeWidth="2">{tiles}</g>
      {/* grout mildew */}
      <g stroke="#6B6C4A" strokeWidth="4" style={{ opacity: "calc((1 - var(--clean, 1)) * .55)" }} filter={g("b2")}>
        <line x1="0" y1="476" x2="1200" y2="476" />
        <line x1="85" y1="400" x2="85" y2="560" />
        <line x1="425" y1="408" x2="425" y2="560" />
        <line x1="595" y1="408" x2="595" y2="560" />
        <line x1="0" y1="544" x2="1200" y2="544" />
      </g>

      {/* window w/ frosted glass */}
      <g className="px1">
        <rect x="90" y="70" width="230" height="300" rx="6" fill="#F7F3E8" />
        <rect x="104" y="84" width="202" height="272" fill="#E7F0EE" />
        <path d="M104 290 Q160 240 205 272 T306 250 V356 H104Z" fill="#9FB89C" opacity=".4" />
        <rect x="203" y="84" width="6" height="272" fill="#F7F3E8" />
        <g style={{ opacity: "calc(.35 + var(--clean, 1) * .5)" }}>
          <polygon points="104,84 306,84 560,560 250,560" fill={g("beam")} filter={g("b24")} />
        </g>
      </g>

      {/* floor */}
      <rect y="560" width="1200" height="240" fill={g("floor")} />
      <FloorLines fy={560} vpY={320} count={8} stroke="rgba(80,70,50,.2)" width={2} />
      <rect y="552" width="1200" height="14" fill="#F2EEE2" />
      <g style={shine(0.7)}>
        <polygon points="360,570 760,570 900,800 260,800" fill="#fff" opacity=".4" filter={g("b24")} />
      </g>
      <g style={mess} filter={g("b2")}>
        <ellipse cx="500" cy="745" rx="150" ry="22" fill="#6B6C4A" opacity=".18" />
      </g>

      {/* bathtub */}
      <g className="px2">
        <ellipse cx="420" cy="672" rx="270" ry="22" fill={g("shadow")} />
        <path d="M170 540 H680 Q700 540 690 566 Q650 650 560 660 H290 Q200 650 164 566 Q158 540 170 540Z" fill={g("tub")} />
        <path d="M184 548 H666 Q676 548 670 566 Q640 628 556 640 H294 Q210 628 180 566 Q174 548 184 548Z" fill="#EEF0EB" />
        <ellipse cx="426" cy="560" rx="236" ry="14" fill="#cfd5cf" />
        {/* water */}
        <ellipse cx="426" cy="563" rx="210" ry="9" fill="#BFE0E0" opacity=".55" />
        {/* feet */}
        {[230, 610].map((x) => (
          <ellipse key={x} cx={x} cy={668} rx={20} ry={8} fill={g("gold")} />
        ))}
        {/* freestanding tap */}
        <path d="M680 560 V380 Q680 340 640 340" stroke={g("gold")} strokeWidth="9" fill="none" strokeLinecap="round" />
        <rect x="668" y="440" width="26" height="8" rx="4" fill={g("gold")} />
        {/* soap scum ring */}
        <g style={mess}>
          <ellipse cx="426" cy="562" rx="224" ry="11" fill="none" stroke="#8B8466" strokeWidth="6" opacity=".6" />
          <path d="M210 580 q40 40 100 56 M560 590 q-30 30 -80 46" stroke="#8B8466" strokeWidth="5" opacity=".3" fill="none" strokeLinecap="round" />
        </g>
        <g style={shine(0.8)}>
          <polygon points="250,548 310,548 270,640 220,630" fill={g("sweep")} />
        </g>
        {/* towels (tidy → ruffled) */}
        <g style={tidy(-18, 10, -6)}>
          <rect x="248" y="500" width="100" height="42" rx="6" fill="#F8F2E4" />
          <rect x="248" y="500" width="100" height="10" rx="4" fill="#A7B7A6" />
        </g>
      </g>

      {/* vanity */}
      <g className="px3">
        {/* mirror */}
        <ellipse cx="900" cy="250" rx="130" ry="150" fill={g("gold")} />
        <ellipse cx="900" cy="250" rx="120" ry="140" fill={g("mirror")} />
        <g style={shine(0.9)}>
          <polygon points="800,150 850,130 790,330 770,310" fill={g("sweep")} />
          <polygon points="930,120 960,130 900,360 880,350" fill={g("sweep")} opacity=".7" />
        </g>
        <g style={mess}>
          <ellipse cx="900" cy="250" rx="120" ry="140" fill="#9aa59f" opacity=".45" />
          {spots.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity=".55" />
          ))}
          <path d="M840 160 q30 60 -4 140 M950 190 q-16 60 8 120" stroke="#fff" strokeWidth="9" opacity=".3" fill="none" strokeLinecap="round" />
        </g>
        {/* sconces */}
        {[720, 1080].map((x) => (
          <g key={x}>
            <rect x={x - 5} y={210} width={10} height={56} rx={5} fill={g("gold")} />
            <ellipse cx={x} cy={200} rx={16} ry={20} fill="#FFE9A8" opacity=".9" />
            <ellipse cx={x} cy={200} rx={40} ry={44} fill="#FFE9A8" opacity=".25" filter={g("b8")} />
          </g>
        ))}
        {/* cabinet */}
        <ellipse cx="900" cy="790" rx="300" ry="16" fill={g("shadow")} />
        <rect x="720" y="500" width="360" height="270" rx="6" fill={g("wood")} />
        <rect x="738" y="560" width="154" height="190" fill="none" stroke="#4C3724" strokeWidth="3" />
        <rect x="908" y="560" width="154" height="190" fill="none" stroke="#4C3724" strokeWidth="3" />
        <rect x="806" y="568" width="30" height="5" rx="2.5" fill={g("gold")} />
        <rect x="964" y="568" width="30" height="5" rx="2.5" fill={g("gold")} />
        {/* countertop + basin */}
        <polygon points="700,492 1100,492 1114,520 686,520" fill={g("marble")} />
        <ellipse cx="900" cy="496" rx="92" ry="14" fill="#fff" />
        <ellipse cx="900" cy="500" rx="76" ry="9" fill="#DCE0DB" />
        <path d="M900 492 V430 Q900 410 930 410" stroke={g("gold")} strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* accessories */}
        <rect x="730" y="462" width="30" height="34" rx="6" fill="#F8F2E4" />
        <rect x="1030" y="466" width="24" height="28" rx="5" fill="#A7B7A6" />
        <g style={mess} filter={g("b2")}>
          <ellipse cx="900" cy="502" rx="62" ry="6" fill="#6B6C4A" opacity=".4" />
          <ellipse cx="1000" cy="510" rx="26" ry="4" fill="#6B6C4A" opacity=".4" />
          <ellipse cx="780" cy="512" rx="30" ry="4" fill="#6B6C4A" opacity=".4" />
        </g>
      </g>

      <rect width="1200" height="800" fill="#6f7358" style={{ opacity: "calc((1 - var(--clean, 1)) * .2)" }} />
      <DustMotes seed={83} n={20} />
      <rect width="1200" height="800" fill="#FFF3D1" style={{ ...fresh(0.12), mixBlendMode: "soft-light" }} />
      <Sparkles pts={[[440, 556, 1.2], [900, 496, 1.1], [800, 180, 1], [180, 300, 0.8], [640, 420, 0.8], [1040, 360, 0.8]]} />
    </SceneSvg>
  );
}
