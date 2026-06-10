import { lazy, Suspense } from "react";
import "./App.css";
import DecorativeCosmos from "./components/DecorativeCosmos";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import AboutSection from "./components/sections/AboutSection";
import ExperienceSection from "./components/sections/ExperienceSection";
import HeroSection from "./components/sections/HeroSection";
import ProjectsSection from "./components/sections/ProjectsSection";
import ResumeSection from "./components/sections/ResumeSection";
import SkillsSection from "./components/sections/SkillsSection";
import { useInitialSectionNavigation } from "./hooks/useInitialSectionNavigation";

const GalaxyBackground = lazy(() => import("./components/galaxy/GalaxyBackground"));

export default function App() {
  useInitialSectionNavigation();

  return (
    <div className="site-shell">
      <Suspense fallback={null}>
        <GalaxyBackground />
      </Suspense>
      <DecorativeCosmos />
      <SiteHeader />
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
      </main>
      <SiteFooter />
    </div>
  );
}
