import Hero from "../components/Hero";
import Intro from "../components/Intro";
import SofaScroll from "../components/SofaScroll";
import ServiceShowcase from "../components/ServiceShowcase";
import RoomExplorer from "../components/RoomExplorer";
import BeforeAfter from "../components/BeforeAfter";
import Why from "../components/Why";
import Testimonials from "../components/Testimonials";
import FinalCta from "../components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Intro />
      <SofaScroll />
      <ServiceShowcase />
      <RoomExplorer />
      <BeforeAfter />
      <Why />
      <Testimonials />
      <FinalCta
        lines={["Come home to", "*something beautiful.*"]}
        text="Let Oliveira’s Cleaning Services help you create a cleaner, more welcoming space."
        label="Request a Free Quote"
        href="/contact/"
        scene="bedroom"
      />
    </>
  );
}
