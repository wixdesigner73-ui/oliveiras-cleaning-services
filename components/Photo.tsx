"use client";

import type { CSSProperties } from "react";
import type { SceneKey } from "../lib/site";

const ALT: Record<SceneKey, string> = {
  living: "Bright living room with a cream sectional sofa, low round table and soft natural light",
  kitchen: "Modern white kitchen with a marble waterfall island and brass-framed stools",
  empty: "Empty apartment with polished oak floors and floor-to-ceiling glass doors",
  office: "Office corridor with black-framed glass partitions and polished concrete floors",
  bathroom: "Spa-style bathroom with a freestanding tub, double basins and warm stone tile",
  bedroom: "Calm bedroom with an upholstered bed, crisp white linens and soft daylight",
};

/**
 * A photograph that can be shown "before" or "after" cleaning.
 * `clean` (0 → 1) sets --clean on the wrapper; omit it to inherit --clean from an ancestor.
 * Below 1 the image is dulled and a dust/film overlay fades in — an illustrative effect, not a real "before" photo.
 */
export default function Photo({
  kind,
  clean,
  className = "",
  priority = false,
  position = "center",
  alt,
}: {
  kind: SceneKey;
  clean?: number;
  className?: string;
  priority?: boolean;
  position?: string;
  alt?: string;
}) {
  const style = (clean === undefined ? {} : { "--clean": clean }) as CSSProperties;
  return (
    <div className={`photo ${className}`} style={style}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/${kind}.jpg`}
        alt={alt ?? ALT[kind]}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        draggable={false}
        style={{ objectPosition: position }}
      />
      <span className="photo-haze" aria-hidden />
      <span className="photo-dust" aria-hidden />
    </div>
  );
}
