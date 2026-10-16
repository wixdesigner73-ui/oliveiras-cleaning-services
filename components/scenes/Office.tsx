import { CommonDefs, DustMotes, FloorLines, SceneSvg, Sparkles, fresh, mess, rng, shine, tidy, useUid } from "./common";

/** Luxury office: glass partitions, walnut desks, brass lighting. Smudged glass clears as --clean → 1. */
export default function Office({ title }: { title?: string }) {
  const u = useUid();
  const g = (n: string) => `url(#${u}${n})`;
  const r = rng(52);
  const smudges = Array.from({ length: 18 }, () => ({
    x: 220 + r() * 760,
    y: 110 + r() * 380,
    rx: 14 + r() * 40,
    ry: 8 + r() * 24,
    rot: r() * 120 - 60,
  }));
  return (
    <SceneSvg title={title}>
      <CommonDefs u={u} />
      <defs>
        <linearGradient id={`${u}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#3A4F4C" />
          <stop offset="1" stopColor="#202B2A" />
        </linearGradient>
        <linearGradient id={`${u}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#262E2D" />
          <stop offset="1" stopColor="#40494A" />
        </linearGradient>
        <linearGradient id={`${u}glass`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#BFE0DC" stopOpacity=".28" />
          <stop offset="1" stopColor="#DCEFEA" stopOpacity=".1" />
        </linearGradient>
        <linearGradient id={`${u}wood`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8A5E3A" />
          <stop offset="1" stopColor="#6B4528" />
        </linearGradient>
        <linearGradient id={`${u}city`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3D6A68" />
          <stop offset="1" stopColor="#B9D4CC" />
        </linearGradient>
        <linearGradient id={`${u}sweep`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="1200" height="580" fill={g("wall")} />

      {/* panoramic window with city */}
      <g className="px1">
        <rect x="60" y="60" width="1080" height="470" fill={g("city")} />
        <g opacity=".55" fill="#274A49">
          {[...Array(16)].map((_, i) => (
            <rect key={i} x={80 + i * 66} y={300 + ((i * 53) % 130)} width={44 + (i % 3) * 10} height={230} />
          ))}
        </g>
        <g opacity=".35" fill="#17302F">
          {[...Array(11)].map((_, i) => (
            <rect key={i} x={100 + i * 98} y={370 + ((i * 37) % 90)} width={70} height={160} />
          ))}
        </g>
        {[60, 330, 600, 870, 1140].map((x) => (
          <rect key={x} x={x - 6} y={54} width={12} height={482} fill="#11191A" />
        ))}
        <rect x="54" y="54" width="1092" height="12" fill="#11191A" />
        <rect x="54" y="524" width="1092" height="14" fill="#11191A" />
      </g>

      {/* floor */}
      <rect y="560" width="1200" height="240" fill={g("floor")} />
      <FloorLines fy={560} vpY={330} count={10} stroke="rgba(255,255,255,.07)" />
      <g style={shine(0.7)}>
        <polygon points="200,570 560,570 640,800 80,800" fill="#CFE6E0" opacity=".16" filter={g("b24")} />
      </g>

      {/* glass partition */}
      <g className="px2">
        <rect x="170" y="90" width="860" height="470" fill={g("glass")} />
        {[170, 456, 742, 1028].map((x) => (
          <rect key={x} x={x - 4} y={90} width={8} height={470} fill="#B8A27A" />
        ))}
        <rect x="166" y="86" width="868" height="8" fill="#B8A27A" />
        <rect x="166" y="552" width="868" height="10" fill="#B8A27A" />
        {/* reflections */}
        <g style={shine(0.9)}>
          <polygon points="220,90 330,90 250,560 190,560" fill={g("sweep")} />
          <polygon points="620,90 700,90 640,560 590,560" fill={g("sweep")} />
        </g>
        {/* smudges + dust film */}
        <g style={mess}>
          <rect x="170" y="90" width="860" height="470" fill="#8f9a95" opacity=".4" />
          <g filter={g("b8")}>
            {smudges.map((s, i) => (
              <ellipse key={i} cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill="#E8EDE9" opacity=".5" transform={`rotate(${s.rot} ${s.x} ${s.y})`} />
            ))}
          </g>
          {[...Array(7)].map((_, i) => (
            <path key={i} d={`M${230 + i * 110} 130 q12 160 -6 340`} stroke="#fff" strokeOpacity=".28" strokeWidth="5" fill="none" strokeLinecap="round" />
          ))}
        </g>
      </g>

      {/* desks + chairs */}
      <g className="px3">
        {[0, 1].map((i) => {
          const x = 120 + i * 560;
          return (
            <g key={i}>
              <ellipse cx={x + 240} cy={780} rx={300} ry={20} fill={g("shadow")} />
              {/* chair */}
              <g style={tidy(i ? -40 : 50, 6, i ? -6 : 8)}>
                <rect x={x + 130} y={560} width={120} height={150} rx={34} fill="#14201F" />
                <rect x={x + 142} y={575} width={96} height={110} rx={26} fill="#2A3B39" />
                <rect x={x + 186} y={710} width={8} height={50} fill="#9a9f9c" />
              </g>
              {/* desk */}
              <polygon points={`${x},690 ${x + 480},690 ${x + 520},730 ${x - 40},730`} fill={g("wood")} />
              <polygon points={`${x - 40},730 ${x + 520},730 ${x + 520},744 ${x - 40},744`} fill="#47301c" />
              <rect x={x - 20} y={744} width={14} height={50} fill={g("gold")} />
              <rect x={x + 492} y={744} width={14} height={50} fill={g("gold")} />
              {/* monitor */}
              <rect x={x + 150} y={604} width={170} height={84} rx={4} fill="#0F1514" />
              <rect x={x + 156} y={610} width={158} height={70} fill="#3D6A68" opacity=".7" />
              <rect x={x + 228} y={688} width={14} height={8} fill="#9a9f9c" />
              {/* lamp */}
              <path d={`M${x + 70} 690 V640 L${x + 100} 612`} stroke={g("gold")} strokeWidth="4" fill="none" />
              <path d={`M${x + 90} 606 h34 l-8 18 h-18z`} fill="#F4EAD8" />
              <ellipse cx={x + 106} cy={632} rx={30} ry={14} fill="#FFE9A8" opacity=".35" filter={g("b8")} />
              {/* clean-state desk accessories */}
              <rect x={x + 350} y={676} width={70} height={10} rx={2} fill="#EDE2CC" />
              <rect x={x + 356} y={668} width={56} height={8} rx={2} fill="#183D33" />
              {/* mess: papers + mug */}
              <g style={mess}>
                <rect x={x + 340} y={674} width={64} height={44} fill="#fff" transform={`rotate(-12 ${x + 370} ${x ? 696 : 696})`} stroke="#bbb" />
                <rect x={x + 372} y={680} width={64} height={44} fill="#F2EEE2" transform={`rotate(9 ${x + 400} 700)`} stroke="#bbb" />
                <ellipse cx={x + 30} cy={702} rx={12} ry={4} fill="#fff" stroke="#bbb" />
                <ellipse cx={x + 30} cy={702} rx={9} ry={2.5} fill="#6B4A2E" />
                <ellipse cx={x + 60} cy={716} rx={26} ry={5} fill="#6B4A2E" opacity=".3" />
              </g>
            </g>
          );
        })}
      </g>

      {/* ceiling pendants */}
      {[300, 600, 900].map((x) => (
        <g key={x}>
          <line x1={x} y1={0} x2={x} y2={46} stroke="#B8A27A" strokeWidth="3" />
          <rect x={x - 28} y={46} width={56} height={14} rx={7} fill={g("gold")} />
          <ellipse cx={x} cy={80} rx={70} ry={26} fill="#FFE9A8" opacity=".25" filter={g("b8")} />
        </g>
      ))}

      <rect width="1200" height="800" fill="#6f7d77" style={{ opacity: "calc((1 - var(--clean, 1)) * .22)" }} />
      <DustMotes seed={63} n={30} />
      <rect width="1200" height="800" fill="#CFEFE6" style={{ ...fresh(0.1), mixBlendMode: "soft-light" }} />
      <Sparkles pts={[[300, 200, 1.2], [680, 340, 1], [900, 160, 0.9], [520, 690, 0.9], [980, 680, 0.8]]} color="#e9fffa" />
    </SceneSvg>
  );
}
