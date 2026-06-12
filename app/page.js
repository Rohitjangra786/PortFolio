import AboutSection from "./components/homepage/about";
import Achievements from "./components/homepage/achievements";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Research from "./components/homepage/research";
import Skills from "./components/homepage/skills";
import ScrollToTop from "./components/helper/scroll-to-top";

export default async function Home() {

  return (
    <div suppressHydrationWarning >
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Research />
      <Projects />
      <Achievements />
      <Education />
      <ContactSection />
      <ScrollToTop />
    </div>
  )
};