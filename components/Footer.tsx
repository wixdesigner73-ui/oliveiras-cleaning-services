import Link from "next/link";
import { BUSINESS, NAV } from "../lib/site";

export default function Footer() {
  return (
    <footer className="bg-emerald-deep text-ivory">
      <div className="wrap py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-[clamp(2.6rem,6vw,5.2rem)] leading-[0.95]">Oliveira&rsquo;s</p>
            <p className="eyebrow mt-4 text-champagne">Cleaning Services</p>
            <p className="mt-8 max-w-sm text-ivory/65">Thoughtful cleaning for homes and spaces in {BUSINESS.location}.</p>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow mb-5 text-champagne">Explore</p>
            <ul className="space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="ulink">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow mb-5 text-champagne">Contact</p>
            <p>{BUSINESS.contact}</p>
            <p className="mt-1">
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
        </div>
        <div className="mt-20 flex flex-col justify-between gap-3 border-t border-ivory/15 pt-6 text-xs tracking-wider text-ivory/45 md:flex-row">
          <p>© {new Date().getFullYear()} Oliveira&rsquo;s Cleaning Services</p>
          <p>
            Photography:{" "}
            <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="ulink">
              Unsplash contributors
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
