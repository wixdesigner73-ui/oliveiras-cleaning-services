"use client";

import { motion } from "framer-motion";

/** Page transition: a quiet fade (opacity only, so pinned scroll sections stay intact). */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
}
