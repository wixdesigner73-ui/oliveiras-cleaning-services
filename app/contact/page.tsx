import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ContactForm from "../../components/ContactForm";
import { Reveal } from "../../components/Motion";
import { BUSINESS } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact | Oliveira’s Cleaning Services",
  description: "Request a free quote from Oliveira’s Cleaning Services in Kendall, Miami. Call (786) 449-5993 or send a message.",
};

export default function Contact() {
  return (
    <>
      <PageHero kind="bedroom" eyebrow="Contact" lines={["LET’S MAKE YOUR", "*SPACE SHINE.*"]} tall={false} position="50% 60%" />
      <section className="bg-ivory">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden bg-emerald-deep text-ivory">
            <div className="absolute inset-0 opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/img/living.jpg`} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,48,42,.25)_0%,rgba(18,48,42,.55)_38%,rgba(18,48,42,.9)_72%,rgba(18,48,42,.96)_100%)]" />
            <div className="relative flex h-full flex-col justify-between gap-16 px-6 py-20 sm:px-12 lg:px-[var(--gutter)] lg:py-32">
              <div>
                <Reveal>
                  <p className="eyebrow mb-8 text-champagne">Say hello</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="display-md !text-[clamp(2.2rem,3.6vw,3.8rem)]">
                    Tell us about <em>your space.</em>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="lede mt-6 text-ivory/80">
                    Share a few details about the space you’d like cleaned and {BUSINESS.contact} will get back to you about your free quote.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.25}>
                <div className="border-t border-ivory/25 pt-8">
                  <p className="font-display text-2xl">{BUSINESS.name}</p>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Contact</dt>
                      <dd className="mt-1">{BUSINESS.contact}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Phone</dt>
                      <dd className="mt-1">
                        <a href={BUSINESS.phoneHref} className="ulink">
                          {BUSINESS.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Email</dt>
                      <dd className="mt-1 break-all">
                        <a href={`mailto:${BUSINESS.email}`} className="ulink">
                          {BUSINESS.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Serving</dt>
                      <dd className="mt-1">{BUSINESS.location}</dd>
                    </div>
                  </dl>
                  <a href={BUSINESS.yelp} target="_blank" rel="noopener noreferrer" className="ulink eyebrow mt-8 inline-block !text-[0.62rem] text-champagne">
                    Find us on Yelp ↗
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="px-6 py-20 sm:px-12 lg:px-[var(--gutter)] lg:py-32">
            <Reveal>
              <p className="eyebrow mb-8 text-[#7d6840]">Request a free quote</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-12 font-display text-5xl text-emerald-deep">
                Begin <em>here.</em>
              </h2>
            </Reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
