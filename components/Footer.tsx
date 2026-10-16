import Link from "next/link";
import { BUSINESS, NAV } from "../lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-emerald-deep text-ivory">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full border border-champagne/20" />
      <div className="pointer-events-none absolute -right-20 -top-20 h-[26rem] w-[26rem] rounded-full border border-champagne/10" />
      <div className="wrap relative pb-10 pt-24 md:pt-32">
        <p className="eyebrow text-champagne">Kendall · Miami · Florida</p>
        <p className="mt-6 font-display text-[clamp(3.4rem,11vw,10.5rem)] italic leading-[0.9] text-ivory">
          Oliveira&rsquo;s<span className="block text-[0.34em] not-italic tracking-[0.3em] text-champagne">CLEANING SERVICES</span>
        </p>

        <div className="mt-16 grid gap-12 border-t border-champagne/25 pt-12 md:grid-cols-3">
          <div>
            <h3 className="eyebrow mb-5 text-champagne !font-body">Explore</h3>
            <ul className="space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="ulink font-display text-3xl italic">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-5 text-champagne !font-body">Contact</h3>
            <p className="font-display text-3xl italic">{BUSINESS.contact}</p>
            <p className="mt-3">
              <a href={BUSINESS.phoneHref} className="ulink">
                {BUSINESS.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${BUSINESS.email}`} className="ulink break-all">
                {BUSINESS.email}
              </a>
            </p>
          </div>
          <div>
            <h3 className="eyebrow mb-5 text-champagne !font-body">Begin</h3>
            <p className="mb-6 max-w-xs text-ivory/70">Let us help you create a cleaner, more welcoming space.</p>
            <Link href="/contact/" className="btn btn-gold">
              Request a Free Quote <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-champagne/15 pt-6 text-xs tracking-wider text-ivory/50 md:flex-row">
          <p>© {new Date().getFullYear()} Oliveira&rsquo;s Cleaning Services. All rights reserved.</p>
          <p>Illustrations on this site are original artistic renderings.</p>
        </div>
      </div>
    </footer>
  );
}
