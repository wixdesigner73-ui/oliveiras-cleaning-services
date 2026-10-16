import { CommonDefs, DustMotes, FloorLines, SceneSvg, Sparkles, fresh, mess, rng, shine, useUid } from "./common";

/** Empty apartment: polished floors, tall windows. Dust, film and scuffs lift as --clean → 1. */
export default function Empty({ title }: { title?: string }) {
  const u = useUid();
  const g = (n: string) => `url(#${u}${n})`;
  const r = rng(33);
  const scuffs = Array.from({ length: 16 }, () => ({
    x: 120 + r() * 960,
    y: 600 + r() * 180,
    w: 20 + r() * 70,
    rot: r() * 40 - 20,
  }));
  return (
    <SceneSvg title={title}>
      <CommonDefs u={u} />
      <defs>
        <linearGradient id={`${u}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F1ECE0" />
          <stop offset="1" stopColor="#DCD5C4" />
        </linearGradient>
        <linearGradient id={`${u}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#C8AD84" />
          <stop offset="1" stopColor="#E3CCA4" />
        </linearGradient>
        <linearGradient id={`${u}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CFE4EA" />
          <stop offset=".7" stopColor="#F4EEDA" />
          <stop offset="1" stopColor="#F9E7B9" />
        </linearGradient>
        <linearGradient id={`${u}beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF1BE" stopOpacity=".8" />
          <stop offset="1" stopColor="#FFF1BE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}refl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="600" fill={g("wall")} />

      <g className="px1">
        {/* window wall: three tall panes */}
        <rect x="170" y="40" width="860" height="540" fill="#EDE7D8" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={190 + i * 280} y={58} width={260} height={504} fill={g("sky")} />
            {/* skyline + palms */}
            <g opacity=".7">
              <rect x={200 + i * 280} y={400} width={40} height={162} fill="#9BB0B2" />
              <rect x={250 + i * 280} y={360} width={52} height={202} fill="#8AA3A5" />
              <rect x={312 + i * 280} y={430} width={34} height={132} fill="#A9BBBC" />
              <rect x={356 + i * 280} y={380} width={60} height={182} fill="#93AAAC" />
              <path d={`M${420 + i * 280} 562 V460`} stroke="#5E7A62" strokeWidth="4" />
              <path d={`M${420 + i * 280} 460 q-30 -20 -44 6 M${420 + i * 280} 460 q30 -20 44 6 M${420 + i * 280} 460 q-10 -34 -34 -34 M${420 + i * 280} 460 q10 -34 34 -34`} stroke="#5E7A62" strokeWidth="5" strokeLinecap="round" fill="none" />
            </g>
          </g>
        ))}
        {[190, 470, 750].map((x) => (
          <rect key={x} x={x + 258} y={58} width={24} height={504} fill="#EDE7D8" />
        ))}
        <rect x="190" y="300" width="840" height="8" fill="#EDE7D8" />
        {/* dirty glass film */}
        <rect x="190" y="58" width="840" height="504" fill="#8b8576" style={{ opacity: "calc((1 - var(--clean, 1)) * .42)" }} />
        <g style={mess}>
          {[...Array(14)].map((_, i) => (
            <path key={i} d={`M${220 + i * 58} ${90 + (i % 4) * 30} q8 120 -4 ${160 + (i % 3) * 60}`} stroke="#6E6757" strokeWidth="6" opacity=".18" fill="none" strokeLinecap="round" />
          ))}
        </g>
        {/* glass glints */}
        <g style={shine(0.8)}>
          <polygon points="220,58 300,58 230,562 190,562" fill={g("refl")} opacity=".5" />
          <polygon points="500,58 560,58 500,562 470,562" fill={g("refl")} opacity=".5" />
          <polygon points="780,58 850,58 790,562 750,562" fill={g("refl")} opacity=".5" />
        </g>
        {/* doorway */}
        <rect x="1060" y="130" width="110" height="430" fill="#C7BFAB" />
        <rect x="1072" y="144" width="86" height="416" fill="#E9E3D4" />
        <circle cx="1145" cy="360" r="5" fill={g("gold")} />
        {/* track lights */}
        <rect x="260" y="10" width="680" height="8" rx="4" fill="#3b3f3c" />
        {[330, 520, 710, 870].map((x) => (
          <g key={x}>
            <rect x={x} y={14} width={16} height={26} rx={4} fill="#3b3f3c" />
            <ellipse cx={x + 8} cy={44} rx={9} ry={3} fill="#FFE9A8" />
          </g>
        ))}
      </g>

      {/* light beams across floor */}
      <g style={{ opacity: "calc(.25 + var(--clean, 1) * .65)" }}>
        <polygon points="200,540 450,540 780,800 300,800" fill={g("beam")} filter={g("b24")} />
        <polygon points="480,540 730,540 1100,800 620,800" fill={g("beam")} filter={g("b24")} />
      </g>

      {/* floor */}
      <rect y="580" width="1200" height="220" fill={g("floor")} />
      <FloorLines fy={580} vpY={300} count={18} stroke="rgba(70,48,22,.18)" />
      <rect y="566" width="1200" height="16" fill="#F7F2E6" />
      <rect y="580" width="1200" height="5" fill="#000" opacity=".12" />
      {/* polished reflection */}
      <g style={shine(1)}>
        <polygon points="230,590 440,590 620,800 190,800" fill={g("refl")} opacity=".6" />
        <polygon points="530,590 740,590 940,800 520,800" fill={g("refl")} opacity=".55" />
      </g>
      {/* scuffs + dust patches on floor */}
      <g style={mess} filter={g("b2")}>
        {scuffs.map((s, i) => (
          <rect key={i} x={s.x} y={s.y} width={s.w} height={4} rx={2} fill="#4a3a22" opacity=".25" transform={`rotate(${s.rot} ${s.x} ${s.y})`} />
        ))}
        <ellipse cx="420" cy="690" rx="140" ry="30" fill="#CFC5AE" opacity=".5" />
        <ellipse cx="860" cy="740" rx="170" ry="34" fill="#CFC5AE" opacity=".45" />
      </g>

      {/* cobwebs */}
      <g style={mess} stroke="#fff" strokeOpacity=".75" fill="none" strokeWidth="1.3">
        <path d="M0 0 Q110 40 150 160 M0 0 Q70 90 40 200 M0 0 Q150 60 220 90 M30 0 Q80 40 70 90 M0 70 Q60 80 90 140" />
        <path d="M1200 0 Q1090 40 1050 160 M1200 0 Q1130 90 1160 200 M1200 0 Q1050 60 980 90" />
      </g>

      <rect width="1200" height="800" fill="#7a735f" style={{ opacity: "calc((1 - var(--clean, 1)) * .24)" }} />
      <DustMotes seed={41} n={60} area={[150, 40, 1050, 700]} />
      <rect width="1200" height="800" fill="#FFF3CD" style={{ ...fresh(0.16), mixBlendMode: "soft-light" }} />
      <Sparkles pts={[[330, 640, 1.2], [720, 650, 1.1], [560, 740, 1], [900, 620, 0.9], [250, 300, 0.9], [880, 200, 0.8]]} />
    </SceneSvg>
  );
}
