"use client";

import type { CSSProperties } from "react";
import type { SceneKey } from "../lib/site";
import Living from "./scenes/Living";
import Kitchen from "./scenes/Kitchen";
import Empty from "./scenes/Empty";
import Office from "./scenes/Office";
import Bathroom from "./scenes/Bathroom";
import Bedroom from "./scenes/Bedroom";

const MAP = { living: Living, kitchen: Kitchen, empty: Empty, office: Office, bathroom: Bathroom, bedroom: Bedroom };

/**
 * Renders one illustrated room. `clean` (0 → 1) sets --clean on the wrapper; omit it to inherit
 * --clean from an ancestor (used by GSAP-driven sections that scrub a single CSS variable).
 */
export default function Scene({
  kind,
  clean,
  className = "",
  title,
}: {
  kind: SceneKey;
  clean?: number;
  className?: string;
  title?: string;
}) {
  const C = MAP[kind];
  const style = clean === undefined ? undefined : ({ "--clean": clean } as CSSProperties);
  return (
    <div className={`scene ${className}`} style={style}>
      <C title={title} />
    </div>
  );
}
