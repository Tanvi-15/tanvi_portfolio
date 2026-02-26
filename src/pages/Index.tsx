import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [showResumeButton, setShowResumeButton] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowResumeButton(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <div className="relative z-10 bg-background pt-10 pb-16">
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
        <ContactSection />
      </div>

      <a
        href="/TanviSoftware2.pdf"
        download="Tanvi_Resume.pdf"
        className={`fixed bottom-6 right-6 z-40 px-3 py-1.5 rounded-md bg-primary text-primary-foreground font-mono text-xs font-semibold transition-all duration-300 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.4)] hover:scale-105 ${
          showResumeButton ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        Download Resume
      </a>
    </div>
  );
};

export default Index;
