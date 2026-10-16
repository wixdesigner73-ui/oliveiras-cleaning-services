import type { Metadata } from "next";
import PageHero from "../../components/PageHero";
import { Approach, Story, Values } from "../../components/AboutSections";
import FinalCta from "../../components/FinalCta";

export const metadata: Metadata = {
  title: "About | Oliveira’s Cleaning Services",
  description: "Learn about Oliveira’s Cleaning Services, dedicated to helping homes and spaces feel clean, comfortable and welcoming.",
};

export default function About() {
  return (
    <>
      <PageHero
        kind="living"
        eyebrow="About us"
        lines={["BEAUTIFUL SPACES", "BEGIN WITH", "*THOUGHTFUL CARE.*"]}
      />
      <Story />
      <Approach />
      <Values />
      <FinalCta
        lines={["LET’S CREATE A CLEANER", "*SPACE TOGETHER.*"]}
        label="Contact Us"
        href="/contact/"
        scene="empty"
      />
    </>
  );
}
