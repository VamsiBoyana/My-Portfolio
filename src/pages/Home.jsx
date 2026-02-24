import React from "react";
import SectionNav from "@/components/portfolio/SectionNav";
import HeroSection from "@/components/portfolio/HeroSection";
import StatsBar from "@/components/portfolio/StatsBar";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import EducationSection from "@/components/portfolio/EducationSection";
import ContactSection from "@/components/portfolio/ContactSection";

export default function Home() {
  return (
    <div className="bg-[#0B1120] min-h-screen">
      <SectionNav />
      <HeroSection id="home" />
      <StatsBar />
      <SkillsSection id="skills" />
      <ExperienceSection id="experience" />
      <ProjectsSection id="projects" />
      <EducationSection id="education" />
      <ContactSection id="contact" />
    </div>
  );
}