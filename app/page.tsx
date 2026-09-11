import Faq from "./components/Faq";
import FeatureGrid from "./components/FeatureGrid";
import Footer, { FinalCta } from "./components/Footer";
import Hero from "./components/Hero";
import HowItWorks from "./components/HowItWorks";
import { MotionRoot } from "./components/motion";
import Nav from "./components/Nav";
import BunnyMeadow from "./components/BunnyMeadow";
import TestnetNotice from "./components/TestnetNotice";

export default function Home() {
  return (
    <MotionRoot>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <HowItWorks />
        <FeatureGrid />
        <Faq />
        <TestnetNotice />
        <FinalCta />
      </main>
      {/* bottom of the page: the bunny hops across the grass, right above the footer links */}
      <BunnyMeadow />
      <Footer />
    </MotionRoot>
  );
}
