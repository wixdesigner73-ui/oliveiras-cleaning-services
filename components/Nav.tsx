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

  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const clean = base && path.startsWith(base) ? path.slice(base.length) || "/" : path;
  const active = (href: string) => (href === "/" ? clean === "/" : clean.startsWith(href));

  return (
    <>
      <header className={`nav ${scrolled || open ? "nav-solid" : ""}`}>
        <div className="wrap flex h-full items-center justify-between">
          <Link href="/" aria-label="Oliveira’s Cleaning Services — Home" className="nav-fg">
            <Wordmark />
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-10 lg:flex">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={active(n.href) ? "page" : undefined} className="ulink nav-fg eyebrow !text-[0.66rem]">
                {n.label}
              </Link>
            ))}
            <Link href="/contact/" className="btn btn-ghost nav-fg !px-5 !py-3">
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-4">
              {NAV.map((n, i) => (
                <motion.div key={n.href} initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.12 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={n.href} className="font-display text-3xl">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.45, duration: 0.7 }} className="mt-6">
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
