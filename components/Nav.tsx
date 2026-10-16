"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NAV } from "../lib/site";
import Wordmark from "./Wordmark";

export default function Nav() {
  const path = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const active = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className={`nav ${scrolled || open ? "nav-solid" : ""}`}>
        <div className="wrap flex h-full items-center justify-between">
          <Link href="/" aria-label="Oliveira's Cleaning Services — Home" className="nav-fg">
            <Wordmark />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className="ulink nav-fg eyebrow !tracking-[0.24em]">
                {n.label}
              </Link>
            ))}
            <Link href="/contact/" className="btn btn-gold !py-3 !px-6">
              Get a Quote
            </Link>
          </nav>
          <button
            className="nav-fg flex h-11 w-11 flex-col items-center justify-center gap-[7px] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className={`block h-px w-7 bg-current transition-transform duration-500 ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-px w-7 bg-current transition-transform duration-500 ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-center bg-emerald-deep px-8 text-ivory lg:hidden"
            initial={{ clipPath: "circle(0% at 90% 4%)" }}
            animate={{ clipPath: "circle(150% at 90% 4%)" }}
            exit={{ clipPath: "circle(0% at 90% 4%)" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-5">
              {NAV.map((n, i) => (
                <motion.div key={n.href} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={n.href} className="font-display text-6xl italic">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.7 }} className="mt-6">
                <Link href="/contact/" className="btn btn-gold">
                  Get a Quote <span className="arrow">→</span>
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
