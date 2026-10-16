"use client";

import { ReactNode, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { SceneKey } from "../lib/site";
import Scene from "./Scene";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 40,
  className = "",
  x = 0,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Headline revealed line-by-line through a mask. Wrap words in *asterisks* for italic gold emphasis. */
export function Lines({
  lines,
  className = "",
  as: Tag = "h2",
  delay = 0,
}: {
  lines: string[];
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <motion.span
          key={i}
          className="block overflow-hidden pb-[0.1em]"
          initial={reduce ? "v" : "h"}
          whileInView="v"
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        >
          <motion.span
            className="block"
            variants={{ h: { y: "115%", rotate: 2.5 }, v: { y: 0, rotate: 0, transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.1 } } }}
          >
            {line.split(/(\*[^*]+\*)/g).map((part, j) =>
              part.startsWith("*") ? (
                <em key={j} className="text-[color:var(--em,var(--color-champagne))]">
                  {part.slice(1, -1)}
                </em>
              ) : (
                <span key={j}>{part}</span>
              ),
            )}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

/** A room that unveils with a mask on scroll and drifts with parallax. */
export function ParallaxScene({
  kind,
  clean = 1,
  className = "",
  speed = 9,
  title,
  radius = "0px",
}: {
  kind: SceneKey;
  clean?: number;
  className?: string;
  speed?: number;
  title?: string;
  radius?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);
  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ borderRadius: radius }}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div
        className="absolute left-0 right-0"
        style={{ y: reduce ? 0 : y, top: `-${speed}%`, height: `${100 + speed * 2}%` }}
        initial={reduce ? false : { scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: EASE }}
      >
        <Scene kind={kind} clean={clean} title={title} />
      </motion.div>
    </motion.div>
  );
}
