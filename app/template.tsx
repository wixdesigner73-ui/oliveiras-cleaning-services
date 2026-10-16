"use client";

import { motion } from "framer-motion";

/** Page transition: an emerald curtain lifts away while the new page fades in (opacity only, so pinned sections stay intact). */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[200] origin-top bg-emerald-deep"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-px bg-champagne" />
      </motion.div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.25 }}>
        {children}
      </motion.div>
    </>
  );
}
