import { siteConfig } from "@/site.config";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SocialProof from "./components/SocialProof";
import PainPoints from "./components/PainPoints";
import Results from "./components/Results";
import VideoTestimonials from "./components/VideoTestimonials";
import Services from "./components/Services";
import Process from "./components/Process";
import Honesty from "./components/Honesty";
import Calendar from "./components/Calendar";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

/* ─── Map section keys to components ─── */
const SECTION_MAP = {
  hero: Hero,
  socialProof: SocialProof,
  painPoints: PainPoints,
  results: Results,
  videoTestimonials: VideoTestimonials,
  services: Services,
  process: Process,
  honesty: Honesty,
  calendar: Calendar,
  testimonials: Testimonials,
  faq: FAQ,
  finalCTA: FinalCTA,
};

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {siteConfig.sections.map((key) => {
          const Component = SECTION_MAP[key];
          if (!Component) return null;
          return <Component key={key} />;
        })}
      </main>
      <Footer />
    </>
  );
}
