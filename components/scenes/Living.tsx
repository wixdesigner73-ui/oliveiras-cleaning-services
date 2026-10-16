import { CommonDefs, DustMotes, FloorLines, SceneSvg, Sparkles, fresh, mess, shine, tidy, useUid } from "./common";

/** Living room. Stain on the middle seat cushion is at ≈ (642, 548) — the sofa-scroll camera aims there. */
export default function Living({ title }: { title?: string }) {
  const u = useUid();
  const g = (n: string) => `url(#${u}${n})`;
  return (
    <SceneSvg title={title}>
      <CommonDefs u={u} />
      <defs>
        <linearGradient id={`${u}wall`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F4EAD8" />
          <stop offset="1" stopColor="#E2D0B0" />
        </linearGradient>
        <linearGradient id={`${u}floor`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#B99467" />
          <stop offset="1" stopColor="#D9B98C" />
        </linearGradient>
        <linearGradient id={`${u}sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F9F1D9" />
          <stop offset="1" stopColor="#CFE2E4" />
        </linearGradient>
        <linearGradient id={`${u}sofa`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FBF6EA" />
          <stop offset="1" stopColor="#E8DDC5" />
        </linearGradient>
        <linearGradient id={`${u}cush`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFBF0" />
          <stop offset="1" stopColor="#E9DEC6" />
        </linearGradient>
        <linearGradient id={`${u}beam`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFF3C9" stopOpacity=".75" />
          <stop offset="1" stopColor="#FFF3C9" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${u}marble`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FAF8F3" />
          <stop offset="1" stopColor="#D9D4C8" />
        </linearGradient>
        <radialGradient id={`${u}stain`} cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#6B4A2E" stopOpacity=".95" />
          <stop offset=".6" stopColor="#85613F" stopOpacity=".7" />
          <stop offset="1" stopColor="#85613F" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* back wall */}
      <rect width="1200" height="560" fill={g("wall")} />
      <g className="px1">
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={20 + i * 300} y={330} width={260} height={190} rx={4} fill="none" stroke="#CBB38B" strokeOpacity=".35" />
        ))}
        {/* window */}
        <rect x="80" y="60" width="350" height="420" rx="6" fill="#F8F2E4" />
        <rect x="96" y="76" width="318" height="388" fill={g("sky")} />
        <path d="M96 330 Q170 290 230 320 T414 300 V464 H96Z" fill="#9FB89C" opacity=".55" />
        <path d="M96 380 Q200 340 300 372 T414 360 V464 H96Z" fill="#7C9A7B" opacity=".55" />
        <rect x="250" y="76" width="8" height="388" fill="#F8F2E4" />
        <rect x="96" y="262" width="318" height="8" fill="#F8F2E4" />
        <rect x="60" y="48" width="390" height="14" rx="7" fill={g("gold")} />
        <path d="M70 62 H150 L130 480 H70Z" fill="#F7EFE0" opacity=".92" />
        <path d="M380 62 H440 V480 H400Z" fill="#F7EFE0" opacity=".92" />
        {/* art */}
        <rect x="620" y="100" width="250" height="190" fill="#F8F2E4" stroke={g("gold")} strokeWidth="6" />
        <rect x="640" y="120" width="210" height="150" fill="#EDE2CC" />
        <circle cx="720" cy="190" r="48" fill="#A7B7A6" />
        <path d="M640 270 L740 190 L850 270Z" fill="#C79A6A" opacity=".85" />
        <circle cx="805" cy="165" r="22" fill="#CBB38B" />
        <rect x="930" y="130" width="120" height="160" fill="#F8F2E4" stroke={g("gold")} strokeWidth="5" />
        <path d="M946 146 H1034 V274 H946Z" fill="#183D33" opacity=".9" />
        <path d="M946 230 Q990 180 1034 230 V274 H946Z" fill="#CBB38B" opacity=".7" />
      </g>

      {/* light shaft */}
      <g style={{ opacity: "calc(.35 + var(--clean, 1) * .5)" }}>
        <polygon points="96,76 414,76 760,800 330,800" fill={g("beam")} filter={g("b24")} />
      </g>

      {/* floor */}
      <rect y="560" width="1200" height="240" fill={g("floor")} />
      <FloorLines fy={560} vpY={330} />
      <g style={shine(0.5)}>
        <polygon points="420,570 760,570 980,800 380,800" fill="#fff" opacity=".4" filter={g("b24")} />
      </g>
      <rect y="552" width="1200" height="12" fill="#F4EAD8" />
      <rect y="560" width="1200" height="6" fill="#000" opacity=".1" />

      {/* rug */}
      <polygon points="230,640 970,640 1070,790 130,790" fill="#EFE7D6" />
      <polygon points="260,650 940,650 1020,776 180,776" fill="none" stroke="#A7B7A6" strokeWidth="6" opacity=".7" />
      <polygon points="300,664 900,664 960,764 240,764" fill="none" stroke="#CBB38B" strokeWidth="2" opacity=".8" />

      {/* sofa shadow */}
      <ellipse cx="610" cy="636" rx="360" ry="26" fill={g("shadow")} />

      <g className="px2">
        {/* back */}
        <rect x="330" y="390" width="560" height="170" rx="44" fill={g("sofa")} />
        {/* arms */}
        <rect x="292" y="440" width="96" height="200" rx="38" fill={g("sofa")} />
        <rect x="832" y="440" width="96" height="200" rx="38" fill={g("sofa")} />
        {/* base */}
        <rect x="318" y="520" width="584" height="112" rx="28" fill={g("sofa")} />
        <rect x="318" y="610" width="584" height="22" rx="10" fill="#C9B994" opacity=".5" />
        {/* seat cushions */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={392 + i * 144} y={494} width={138} height={92} rx={22} fill={g("cush")} />
            <rect x={392 + i * 144} y={494} width={138} height={92} rx={22} fill="none" stroke="#fff" strokeOpacity=".7" strokeWidth="2" />
            <rect x={392 + i * 144} y={494} width={138} height={92} rx={22} filter={g("fabric")} fill="#000" />
          </g>
        ))}
        {/* back cushions */}
        {[0, 1, 2].map((i) => (
          <g key={i} style={tidy(i === 1 ? 0 : i === 0 ? -14 : 12, i === 1 ? 6 : 0, i === 0 ? -4 : i === 2 ? 3 : 0)}>
            <rect x={404 + i * 144} y={414} width={126} height={96} rx={28} fill={g("cush")} />
            <rect x={404 + i * 144} y={414} width={126} height={96} rx={28} filter={g("fabric")} fill="#000" />
          </g>
        ))}
        {/* sofa legs */}
        {[310, 880].map((x) => (
          <rect key={x} x={x} y={632} width={14} height={20} rx={3} fill={g("gold")} />
        ))}

        {/* THE STAIN — has its own --stain var so the sofa scroll can clean it independently */}
        <g style={{ opacity: "calc(1 - var(--stain, var(--clean, 1)))" }}>
          <ellipse cx="642" cy="548" rx="52" ry="30" fill={g("stain")} filter={g("b2")} />
          <ellipse cx="622" cy="560" rx="18" ry="11" fill="#6B4A2E" opacity=".55" filter={g("b2")} />
          <ellipse cx="672" cy="538" rx="12" ry="7" fill="#6B4A2E" opacity=".5" filter={g("b2")} />
        </g>

        {/* freshened cushion glow (only when --stain is driven) */}
        <rect x="536" y="494" width="138" height="92" rx="22" fill="#fff" style={{ opacity: "calc(var(--stain, 0) * .35)" }} />

        {/* accent pillows */}
        <g style={tidy(70, 62, 38)}>
          <rect x="330" y="456" width="92" height="88" rx="22" fill="#A7B7A6" transform="rotate(-8 376 500)" />
          <path d="M342 520 Q376 490 412 500" stroke="#fff" strokeOpacity=".5" strokeWidth="3" fill="none" />
        </g>
        <g style={tidy(-210, 80, -30)}>
          <rect x="798" y="452" width="92" height="88" rx="22" fill="#CBB38B" transform="rotate(8 844 496)" />
          <path d="M812 468 L876 530 M876 468 L812 530" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
        </g>
        {/* throw */}
        <g style={tidy(-120, 120, -22, "top right")}>
          <path d="M840 446 Q900 440 920 470 L930 600 Q890 612 856 600Z" fill="#B7C3B2" />
          <path d="M850 480 H924 M850 510 H926 M852 540 H928" stroke="#fff" strokeOpacity=".5" strokeWidth="3" />
        </g>
      </g>

      {/* coffee table */}
      <g className="px3">
        <ellipse cx="610" cy="728" rx="200" ry="30" fill={g("shadow")} />
        {[470, 760].map((x) => (
          <rect key={x} x={x} y={690} width={10} height={42} rx={4} fill={g("gold")} />
        ))}
        <ellipse cx="610" cy="690" rx="190" ry="36" fill={g("marble")} />
        <ellipse cx="610" cy="690" rx="190" ry="36" fill="none" stroke={g("gold")} strokeWidth="4" />
        <path d="M480 684 Q560 670 600 696 T730 688" stroke="#9aa39a" strokeOpacity=".35" strokeWidth="2" fill="none" />
        {/* tidy objects */}
        <g>
          <rect x="520" y="662" width="74" height="12" rx="2" fill="#183D33" />
          <rect x="526" y="652" width="62" height="10" rx="2" fill="#CBB38B" />
          <path d="M690 676 h26 l-4 -34 h-18z" fill="#EDE7DA" />
          <path d="M703 642 q-24 -34 -34 -50 M703 642 q4 -44 8 -66 M703 642 q26 -34 38 -44" stroke="#6E8C6E" strokeWidth="3" fill="none" />
          <ellipse cx="667" cy="590" rx="14" ry="6" fill="#6E8C6E" transform="rotate(-30 667 590)" />
          <ellipse cx="712" cy="574" rx="12" ry="6" fill="#7C9A7B" transform="rotate(80 712 574)" />
          <ellipse cx="742" cy="596" rx="14" ry="6" fill="#6E8C6E" transform="rotate(30 742 596)" />
        </g>
        {/* messy objects */}
        <g style={mess}>
          <ellipse cx="560" cy="700" rx="16" ry="6" fill="#fff" stroke="#bbb" />
          <path d="M544 700 v-18 h32 v18z" fill="#fff" stroke="#bbb" />
          <ellipse cx="560" cy="682" rx="16" ry="5" fill="#6B4A2E" />
          <ellipse cx="590" cy="708" rx="22" ry="7" fill="#6B4A2E" opacity=".35" />
          <rect x="620" y="696" width="64" height="8" rx="2" fill="#B9A079" transform="rotate(-6 650 700)" />
        </g>
      </g>

      {/* floor items (untidy → tidy) */}
      <g style={{ ...tidy(-60, 20, -15), opacity: "calc(1 - var(--clean, 1))" }}>
        <path d="M200 700 q60 -26 120 -4 q-10 26 -64 30 q-52 -2 -56 -26z" fill="#B7C3B2" />
        <rect x="900" y="716" width="70" height="46" rx="3" fill="#F8F2E4" stroke="#bbb" transform="rotate(14 935 740)" />
        <rect x="880" y="708" width="70" height="46" rx="3" fill="#E8DDC5" stroke="#bbb" transform="rotate(-9 915 730)" />
      </g>
      <g style={mess}>
        <ellipse cx="420" cy="740" rx="30" ry="9" fill="#6B4A2E" opacity=".28" filter={g("b2")} />
      </g>

      {/* plant + lamp */}
      <g className="px3">
        <ellipse cx="1070" cy="640" rx="70" ry="14" fill={g("shadow")} />
        <path d="M1030 560 h80 l-10 78 h-60z" fill="#EAE1D4" />
        <path d="M1030 560 h80" stroke={g("gold")} strokeWidth="4" />
        {[[-30, -110, -24], [30, -140, 20], [-4, -190, -4], [50, -90, 52], [-52, -70, -52]].map(([dx, dy, r], i) => (
          <ellipse key={i} cx={1070 + dx} cy={560 + dy} rx="30" ry="56" fill={i % 2 ? "#4F7655" : "#5E8A63"} transform={`rotate(${r} ${1070 + dx} ${560 + dy})`} />
        ))}
        <path d="M1070 560 V400" stroke="#3E5E44" strokeWidth="4" />
        {/* lamp */}
        <path d="M960 640 V380 Q960 320 1010 320" stroke={g("gold")} strokeWidth="6" fill="none" />
        <path d="M980 320 h60 l-12 40 h-36z" fill="#F4EAD8" />
        <ellipse cx="960" cy="640" rx="34" ry="8" fill={g("gold")} />
        <ellipse cx="1010" cy="366" rx="60" ry="40" fill="#FFE9A8" opacity=".35" filter={g("b24")} />
      </g>

      {/* haze, dust, light */}
      <rect width="1200" height="800" fill="#6f6753" style={{ opacity: "calc((1 - var(--clean, 1)) * .22)" }} />
      <rect width="1200" height="800" fill="#d8cdb4" style={{ opacity: "calc((1 - var(--clean, 1)) * .16)", mixBlendMode: "multiply" }} />
      <DustMotes seed={11} />
      <rect width="1200" height="800" fill="#FFE9B0" style={{ ...fresh(0.14), mixBlendMode: "soft-light" }} />
      <Sparkles pts={[[700, 560, 1.1], [870, 470, 0.8], [468, 702, 0.9], [1050, 370, 0.8], [330, 630, 0.7]]} />
    </SceneSvg>
  );
}
