import { CommonDefs, DustMotes, FloorLines, SceneSvg, Sparkles, fresh, mess, rng, shine, useUid } from "./common";

/** Modern kitchen: marble, emerald cabinetry, stainless steel. Grease, rings and smudges clear as --clean → 1. */
export default function Kitchen({ title }: { title?: string }) {
  const u = useUid();
  const g = (n: string) => `url(#${u}${n})`;
  const r = rng(21);
  const splat = Array.from({ length: 22 }, () => ({
    x: 360 + r() * 740,
    y: 215 + r() * 245,
    rx: 4 + r() * 16,
    ry: 3 + r() * 11,
    o: 0.35 + r() * 0.5,
  }));
  const prints = Array.from({ length: 11 }, () => ({ x: 90 + r() * 190, y: 200 + r() * 360, rot: r() * 80 - 40 }));
  return (
    <SceneSvg title={title}>
      <CommonDefs u={u} />
      <defs>
        <linearGradient id={`${u}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E7E1D3" />
          <stop offset="1" stopColor="#CFC8B8" />
        </linearGradient>
        <linearGradient id={`${u}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5E5A52" />
          <stop offset="1" stopColor="#8E897D" />
        </linearGradient>
        <linearGradient id={`${u}marble`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FBFAF6" />
          <stop offset="1" stopColor="#D8D5CB" />
        </linearGradient>
        <linearGradient id={`${u}cab`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#1F5446" />
          <stop offset="1" stopColor="#123A30" />
        </linearGradient>
        <linearGradient id={`${u}steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#9EA5A6" />
          <stop offset=".3" stopColor="#E3E7E7" />
          <stop offset=".55" stopColor="#B7BEBF" />
          <stop offset="1" stopColor="#8C9496" />
        </linearGradient>
        <linearGradient id={`${u}sweep`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".7" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}glow`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFE7A8" stopOpacity=".55" />
          <stop offset="1" stopColor="#FFE7A8" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="620" fill={g("wall")} />
      <rect y="620" width="1200" height="180" fill={g("floor")} />
      <FloorLines fy={620} vpY={420} count={12} stroke="rgba(0,0,0,.22)" />
      <g style={shine(0.45)}>
        <polygon points="300,625 900,625 1100,800 200,800" fill="#fff" opacity=".28" filter={g("b24")} />
      </g>

      <g className="px1">
        {/* backsplash */}
        <rect x="330" y="200" width="800" height="275" fill={g("marble")} />
        <path d="M330 260 Q520 230 640 300 T1130 270 M330 380 Q480 350 620 410 T1130 400" stroke="#9aa39a" strokeOpacity=".4" strokeWidth="2" fill="none" />
        <path d="M400 200 Q440 300 380 475 M860 200 Q820 320 890 475" stroke="#b7b5ab" strokeOpacity=".45" strokeWidth="1.5" fill="none" />
        {/* range hood */}
        <polygon points="440,70 760,70 800,200 400,200" fill={g("steel")} />
        <rect x="400" y="196" width="400" height="14" rx="4" fill="#7E8789" />
        <rect x="520" y="40" width="160" height="40" fill="#8C9496" />
        <rect x="430" y="150" width="340" height="8" rx="4" fill="#fff" opacity=".35" />
        {/* upper cabinets */}
        <rect x="860" y="60" width="300" height="190" rx="4" fill={g("cab")} />
        <line x1="1010" y1="60" x2="1010" y2="250" stroke="#0B241D" strokeWidth="3" />
        <rect x="990" y="190" width="6" height="40" rx="3" fill={g("gold")} />
        <rect x="1024" y="190" width="6" height="40" rx="3" fill={g("gold")} />
        {/* under-cabinet glow */}
        <rect x="860" y="250" width="300" height="60" fill={g("glow")} />
        {/* grease splatter */}
        <g style={mess} filter={g("b2")}>
          {splat.map((s, i) => (
            <ellipse key={i} cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill="#9A7A3A" opacity={s.o} />
          ))}
          <path d="M430 215 q10 60 4 110 M440 230 q8 30 2 70" stroke="#7B5E27" strokeWidth="6" strokeLinecap="round" opacity=".5" fill="none" />
        </g>
        <g style={mess}>
          <rect x="400" y="62" width="400" height="148" fill="#5b5648" opacity=".35" />
        </g>
      </g>

      {/* fridge */}
      <g className="px2">
        <rect x="60" y="120" width="240" height="510" rx="10" fill={g("steel")} />
        <line x1="60" y1="330" x2="300" y2="330" stroke="#6C7476" strokeWidth="4" />
        <rect x="262" y="160" width="8" height="140" rx="4" fill="#5E6769" />
        <rect x="262" y="360" width="8" height="200" rx="4" fill="#5E6769" />
        <rect x="76" y="136" width="30" height="480" fill="#fff" opacity=".18" />
        <g style={shine(0.6)}>
          <polygon points="120,120 190,120 140,630 70,630" fill={g("sweep")} />
        </g>
        <g style={mess}>
          {prints.map((p, i) => (
            <ellipse key={i} cx={p.x} cy={p.y} rx="9" ry="13" fill="#4a4f50" opacity=".22" transform={`rotate(${p.rot} ${p.x} ${p.y})`} />
          ))}
        </g>
      </g>

      {/* base cabinets + counter */}
      <g className="px2">
        <rect x="330" y="505" width="800" height="125" fill={g("cab")} />
        {[330, 480, 630, 780, 930].map((x) => (
          <g key={x}>
            <rect x={x + 6} y={515} width={138} height={108} rx={3} fill="none" stroke="#0B241D" strokeWidth="3" />
            <rect x={x + 58} y={520} width={34} height={5} rx={2.5} fill={g("gold")} />
          </g>
        ))}
        <rect x="330" y="630" width="800" height="14" fill="#0B241D" />
        {/* oven front */}
        <rect x="430" y="520" width="310" height="106" rx="6" fill={g("steel")} />
        <rect x="445" y="535" width="280" height="64" rx="4" fill="#20282A" />
        <rect x="445" y="535" width="280" height="64" rx="4" fill="#fff" opacity=".08" />
        <rect x="446" y="508" width="278" height="8" rx="4" fill="#697274" />
        {[470, 520, 570, 620, 670].map((x) => (
          <circle key={x} cx={x} cy={514} r={5} fill="#E3E7E7" />
        ))}
        {/* counter slab */}
        <polygon points="316,468 1146,468 1170,510 300,510" fill={g("marble")} />
        <polygon points="300,510 1170,510 1170,520 300,520" fill="#A8A89F" />
        <path d="M360 490 Q520 476 640 496 T980 486" stroke="#9aa39a" strokeOpacity=".45" strokeWidth="2" fill="none" />
        {/* cooktop */}
        <rect x="450" y="470" width="270" height="34" fill="#1D2224" transform="skewX(-0)" />
        {[510, 590, 670].map((x) => (
          <ellipse key={x} cx={x} cy={486} rx={26} ry={7} fill="#3B4244" />
        ))}
        {/* items */}
        <ellipse cx="860" cy="470" rx="26" ry="6" fill="#8d8a80" opacity=".4" />
        <path d="M850 468 h22 l-2 -34 h-18z" fill="#F4EEDF" />
        <path d="M861 436 q-14 -34 -22 -44 M861 436 q4 -40 6 -54 M861 436 q18 -30 28 -40" stroke="#5E8A63" strokeWidth="3" fill="none" />
        <rect x="960" y="452" width="90" height="12" rx="3" fill="#CBB38B" />
        <rect x="968" y="440" width="76" height="12" rx="3" fill="#EDE2CC" />
        {/* counter stains */}
        <g style={mess} filter={g("b2")}>
          <ellipse cx="560" cy="508" rx="26" ry="5" fill="none" stroke="#7B5E27" strokeWidth="4" opacity=".55" />
          <ellipse cx="900" cy="500" rx="40" ry="8" fill="#9A7A3A" opacity=".4" />
          <ellipse cx="1060" cy="494" rx="22" ry="5" fill="none" stroke="#7B5E27" strokeWidth="3" opacity=".5" />
          <ellipse cx="400" cy="486" rx="30" ry="6" fill="#7B5E27" opacity=".3" />
        </g>
      </g>

      {/* island */}
      <g className="px3">
        <ellipse cx="640" cy="790" rx="520" ry="22" fill={g("shadow")} />
        <polygon points="130,690 1150,690 1190,730 90,730" fill={g("marble")} />
        <path d="M200 710 Q420 696 600 716 T1100 706" stroke="#9aa39a" strokeOpacity=".4" strokeWidth="2" fill="none" />
        <rect x="90" y="730" width="1100" height="70" fill={g("cab")} />
        <rect x="90" y="730" width="1100" height="8" fill="#0B241D" opacity=".6" />
        <rect x="560" y="760" width="160" height="6" rx="3" fill={g("gold")} />
        <g style={mess} filter={g("b2")}>
          <ellipse cx="340" cy="708" rx="34" ry="7" fill="#7B5E27" opacity=".4" />
          <ellipse cx="880" cy="712" rx="24" ry="5" fill="none" stroke="#7B5E27" strokeWidth="4" opacity=".55" />
          <ellipse cx="1010" cy="704" rx="42" ry="7" fill="#9A7A3A" opacity=".35" />
        </g>
        <g style={shine(0.8)}>
          <polygon points="300,690 400,690 360,730 260,730" fill={g("sweep")} />
          <polygon points="760,690 830,690 800,730 730,730" fill={g("sweep")} />
        </g>
        {/* pendants */}
        {[520, 900].map((x) => (
          <g key={x}>
            <line x1={x} y1={0} x2={x} y2={296} stroke="#9C7B3F" strokeWidth="3" />
            <path d={`M${x - 46} 340 Q${x} 250 ${x + 46} 340Z`} fill={g("gold")} />
            <ellipse cx={x} cy={340} rx={46} ry={8} fill="#FFE9A8" />
            <ellipse cx={x} cy={360} rx={80} ry={40} fill="#FFE9A8" opacity=".25" filter={g("b24")} />
          </g>
        ))}
      </g>

      <rect width="1200" height="800" fill="#6f6753" style={{ opacity: "calc((1 - var(--clean, 1)) * .2)" }} />
      <DustMotes seed={5} n={26} />
      <rect width="1200" height="800" fill="#FFF1C9" style={{ ...fresh(0.1), mixBlendMode: "soft-light" }} />
      <Sparkles pts={[[520, 484, 1], [860, 700, 1], [180, 250, 0.9], [760, 330, 0.9], [1000, 500, 0.8], [440, 120, 0.8]]} />
    </SceneSvg>
  );
}
