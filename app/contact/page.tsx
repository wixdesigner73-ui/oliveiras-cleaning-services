import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ContactForm from "../../components/ContactForm";
import { ParallaxScene, Reveal } from "../../components/Motion";
import { BUSINESS } from "../../lib/site";

export const metadata: Metadata = {
  title: "Contact | Oliveira’s Cleaning Services",
  description: "Request a free quote from Oliveira’s Cleaning Services in Kendall, Miami. Call (786) 449-5993 or send a message.",
};

export default function Contact() {
  return (
    <>
      <PageHero kind="bedroom" eyebrow="Contact" lines={["LET’S MAKE YOUR", "*SPACE SHINE.*"]} tall={false} />
      <section className="bg-ivory">
        <div className="grid lg:grid-cols-2">
          <div className="relative overflow-hidden bg-emerald-deep text-ivory">
            <div className="absolute inset-0 opacity-[0.7]">
              <ParallaxScene kind="living" className="h-full w-full" speed={8} />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,47,41,.45)_0%,rgba(16,47,41,.8)_48%,rgba(16,47,41,.96)_100%)]" />
            <div className="relative flex h-full flex-col justify-between gap-16 px-6 py-20 sm:px-12 lg:px-[max(3rem,calc((100vw-1480px)/2+3rem))] lg:py-32">
              <div>
                <Reveal>
                  <p className="eyebrow mb-6 text-champagne">Say hello</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <h2 className="display-md !text-[clamp(2.4rem,4vw,4.2rem)]">
                    Tell us about <em className="text-champagne">your space.</em>
                  </h2>
                </Reveal>
                <Reveal delay={0.2}>
                  <p className="lede mt-6 text-ivory/75">
                    Share a few details about the space you’d like cleaned and {BUSINESS.contact} will get back to you about your free quote.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={0.25}>
                <div className="border-t border-champagne/30 pt-8">
                  <p className="font-display text-3xl italic">{BUSINESS.name}</p>
                  <dl className="mt-6 space-y-5">
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Contact</dt>
                      <dd className="mt-1 text-lg">{BUSINESS.contact}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Phone</dt>
                      <dd className="mt-1 text-lg">
                        <a href={BUSINESS.phoneHref} className="ulink">
                          {BUSINESS.phone}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Email</dt>
                      <dd className="mt-1 break-all text-lg">
                        <a href={`mailto:${BUSINESS.email}`} className="ulink">
                          {BUSINESS.email}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="eyebrow !text-[0.6rem] text-champagne">Serving</dt>
                      <dd className="mt-1 text-lg">{BUSINESS.location}</dd>
                    </div>
                  </dl>
                  <a href={BUSINESS.yelp} target="_blank" rel="noopener noreferrer" className="ulink eyebrow mt-8 inline-block !text-[0.62rem] text-champagne">
                    Find us on Yelp ↗
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="px-6 py-20 sm:px-12 lg:px-[max(3rem,calc((100vw-1480px)/2+3rem))] lg:py-32">
            <Reveal>
              <p className="eyebrow mb-6 text-[#8a6a32]">Request a free quote</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mb-12 font-display text-5xl text-emerald-deep">
                Begin <em className="text-[#9c7b3f]">here.</em>
              </h2>
            </Reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
