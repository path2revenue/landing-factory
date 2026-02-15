import { getConfig } from "@/lib/config";
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

export const revalidate = 60; // ISR: revalidate every 60s

export default async function Home() {
    const { config } = await getConfig();

    return (
        <>
            <Navbar config={config} />
            <main>
                {(config.sections || []).map((key) => {
                    const Component = SECTION_MAP[key];
                    if (!Component) return null;
                    return <Component key={key} config={config} />;
                })}
            </main>
            <Footer config={config} />
        </>
    );
}
