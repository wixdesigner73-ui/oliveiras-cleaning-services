import { CommonDefs, DustMotes, FloorLines, SceneSvg, Sparkles, fresh, mess, shine, tidy, useUid } from "./common";

/** Serene bedroom: upholstered headboard, crisp linens, brass lamps. Tousled bedding settles as --clean → 1. */
export default function Bedroom({ title }: { title?: string }) {
  const u = useUid();
  const g = (n: string) => `url(#${u}${n})`;
  return (
    <SceneSvg title={title}>
      <CommonDefs u={u} />
      <defs>
        <linearGradient id={`${u}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EEE5D6" />
          <stop offset="1" stopColor="#D8CBB6" />
        </linearGradient>
        <linearGradient id={`${u}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A98B66" />
          <stop offset="1" stopColor="#CDAF86" />
        </linearGradient>
        <linearGradient id={`${u}head`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A7B7A6" />
          <stop offset="1" stopColor="#869A86" />
        </linearGradient>
        <linearGradient id={`${u}linen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFDF7" />
          <stop offset="1" stopColor="#E9E0CC" />
        </linearGradient>
        <linearGradient id={`${u}beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF1C4" stopOpacity=".7" />
          <stop offset="1" stopColor="#FFF1C4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6EBD0" />
          <stop offset="1" stopColor="#D5E4E2" />
        </linearGradient>
      </defs>

      <rect width="1200" height="570" fill={g("wall")} />
      <g className="px1">
        {/* wall panelling */}
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={230 + i * 160} y={90} width={130} height={440} fill="none" stroke="#CBB38B" strokeOpacity=".35" />
        ))}
        {/* window right */}
        <rect x="940" y="80" width="220" height="400" rx="6" fill="#F8F2E4" />
        <rect x="954" y="94" width="192" height="372" fill={g("sky")} />
        <path d="M954 380 Q1020 330 1060 360 T1146 340 V466 H954Z" fill="#8FAE90" opacity=".5" />
        <rect x="1046" y="94" width="8" height="372" fill="#F8F2E4" />
        <path d="M934 76 H990 L972 490 H934Z" fill="#EFE5D0" opacity=".95" />
        <path d="M1130 76 H1166 V490 H1150Z" fill="#EFE5D0" opacity=".95" />
        {/* art above bed */}
        <rect x="470" y="110" width="260" height="130" fill="#F8F2E4" stroke={g("gold")} strokeWidth="5" />
        <path d="M486 226 Q560 150 620 200 T714 170 V226Z" fill="#A7B7A6" opacity=".8" />
        <circle cx="660" cy="148" r="20" fill="#CBB38B" />
      </g>
      <g style={{ opacity: "calc(.3 + var(--clean, 1) * .5)" }}>
        <polygon points="954,94 1146,94 760,800 320,800" fill={g("beam")} filter={g("b24")} />
      </g>

      {/* floor + rug */}
      <rect y="570" width="1200" height="230" fill={g("floor")} />
      <FloorLines fy={570} vpY={330} count={14} stroke="rgba(60,40,20,.17)" />
      <rect y="560" width="1200" height="12" fill="#F4EAD8" />
      <g style={shine(0.5)}>
        <polygon points="560,580 960,580 1100,800 470,800" fill="#fff" opacity=".35" filter={g("b24")} />
      </g>
      <polygon points="220,690 1000,690 1100,792 120,792" fill="#E7DDCA" />
      <polygon points="260,702 960,702 1040,780 180,780" fill="none" stroke="#A7B7A6" strokeWidth="5" opacity=".7" />

      {/* bed */}
      <g className="px2">
        <ellipse cx="600" cy="690" rx="400" ry="24" fill={g("shadow")} />
        {/* headboard */}
        <rect x="260" y="270" width="680" height="300" rx="46" fill={g("head")} />
        {[0, 1, 2, 3].map((i) => (
          <line key={i} x1={430 + i * 113} y1={290} x2={430 + i * 113} y2={560} stroke="#fff" strokeOpacity=".28" strokeWidth="3" />
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={"b" + i} cx={374 + i * 226} cy={322} r={5} fill={g("gold")} />
        ))}
        {/* mattress + base */}
        <rect x="288" y="520" width="624" height="150" rx="22" fill="#CDBFA6" />
        <rect x="270" y="470" width="660" height="132" rx="28" fill={g("linen")} />
        {/* pillows (tidy → tossed) */}
        {[0, 1].map((i) => (
          <g key={i} style={tidy(i ? 60 : -50, i ? 36 : 22, i ? 18 : -14)}>
            <rect x={350 + i * 270} y={420} width={190} height={84} rx={30} fill="#FFFDF7" />
            <rect x={350 + i * 270} y={420} width={190} height={84} rx={30} fill="none" stroke="#D8CDB4" strokeWidth="2" />
          </g>
        ))}
        <g style={tidy(-30, 20, -10)}>
          <rect x="540" y="440" width="120" height="64" rx="22" fill="#CBB38B" />
        </g>
        {/* duvet fold + throw */}
        <rect x="262" y="540" width="676" height="120" rx="26" fill={g("linen")} />
        <path d="M262 556 H938" stroke="#D8CDB4" strokeWidth="3" />
        <g style={tidy(-90, -24, -4, "bottom center")}>
          <rect x="300" y="584" width="600" height="58" rx="14" fill="#B7C3B2" />
          <path d="M320 600 H880 M320 620 H880" stroke="#fff" strokeOpacity=".45" strokeWidth="3" />
        </g>
        {/* rumpled sheets when untidy */}
        <g style={mess}>
          <path d="M290 500 q60 -40 130 -8 q70 30 150 -10 q80 -30 150 6 q60 20 120 -6" stroke="#B9AD92" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".55" />
          <path d="M330 560 q80 24 160 -6 q80 -22 150 10" stroke="#B9AD92" strokeWidth="6" fill="none" strokeLinecap="round" opacity=".45" />
        </g>
      </g>

      {/* nightstands */}
      <g className="px3">
        {[130, 930].map((x, i) => (
          <g key={x}>
            <ellipse cx={x + 70} cy={690} rx={90} ry={12} fill={g("shadow")} />
            <rect x={x} y={560} width={140} height={130} rx={6} fill="#8A6A48" />
            <rect x={x + 12} y={582} width={116} height={42} fill="none" stroke="#5a4129" strokeWidth="2" />
            <rect x={x + 52} y={598} width={36} height={5} rx={2.5} fill={g("gold")} />
            <rect x={x - 6} y={548} width={152} height={16} rx={4} fill="#A38460" />
            <path d={`M${x + 70} 548 V500`} stroke={g("gold")} strokeWidth="5" />
            <path d={`M${x + 40} 500 h60 l-10 -50 h-40z`} fill="#F4EAD8" />
            <ellipse cx={x + 70} cy={470} rx={70} ry={50} fill="#FFE9A8" opacity=".28" filter={g("b24")} />
            <g style={mess}>
              <g>
                <ellipse cx={x + (i ? 30 : 108)} cy={546} rx="12" ry="4" fill="#fff" stroke="#bbb" />
                <ellipse cx={x + (i ? 30 : 108)} cy={546} rx="9" ry="2.5" fill="#6B4A2E" />
              </g>
            </g>
          </g>
        ))}
      </g>

      {/* clothes on floor (untidy) */}
      <g style={{ ...tidy(0, 0, 0), opacity: "calc(1 - var(--clean, 1))" }}>
        <path d="M200 740 q40 -26 100 -8 q16 18 -14 30 q-60 6 -86 -22z" fill="#B7C3B2" />
        <path d="M980 730 q36 -20 84 -4 q10 22 -20 30 q-50 2 -64 -26z" fill="#E4DAC3" stroke="#bbb" />
      </g>

      <rect width="1200" height="800" fill="#6f6753" style={{ opacity: "calc((1 - var(--clean, 1)) * .2)" }} />
      <rect width="1200" height="800" fill="#d8cdb4" style={{ opacity: "calc((1 - var(--clean, 1)) * .14)", mixBlendMode: "multiply" }} />
      <DustMotes seed={91} n={26} />
      <rect width="1200" height="800" fill="#FFE9B0" style={{ ...fresh(0.14), mixBlendMode: "soft-light" }} />
      <Sparkles pts={[[600, 480, 1.2], [300, 600, 0.9], [820, 520, 1], [190, 540, 0.8], [1000, 540, 0.8], [600, 150, 0.7]]} />
    </SceneSvg>
  );
}
