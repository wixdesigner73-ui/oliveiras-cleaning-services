import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import ServiceSection from "../../components/ServiceSection";
import CleaningDemo from "../../components/CleaningDemo";
import FinalCta from "../../components/FinalCta";
import { SERVICES, type SceneKey } from "../../lib/site";

export const metadata: Metadata = {
  title: "Services | Oliveira’s Cleaning Services",
  description: "Residential, deep, move-in / move-out and office cleaning from Oliveira’s Cleaning Services in Kendall, Miami.",
};

const EXTRA: Record<string, SceneKey | undefined> = {
  "residential-cleaning": "bedroom",
  "deep-cleaning": "bathroom",
};

export default function Services() {
  return (
    <>
      <PageHero
        kind="kitchen"
        eyebrow="Our services"
        lines={["Cleaning services,", "*beautifully reimagined.*"]}
        text="Thoughtful cleaning solutions for spaces that deserve exceptional care."
      />
      {SERVICES.map((s, i) => (
        <ServiceSection key={s.id} s={s} index={i} extra={EXTRA[s.id]} />
      ))}
      <CleaningDemo />
      <FinalCta
        lines={["Your space deserves", "*the best care.*"]}
        label="Request a Free Quote"
        href="/contact/"
        scene="living"
      />
    </>
  );
}
