import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import EducationSection from "@/components/EducationSection";
import ResearchWorkSection from "@/components/ResearchWorkSection";
import SkillsSection from "@/components/SkillsSection";
import FeaturedPublications from "@/components/FeaturedPublications";
import AwardsSection from "@/components/AwardsSection";
import PatentsSection from "@/components/PatentsSection";
import ConferencesSection from "@/components/ConferencesSection";
import RefereesSection from "@/components/RefereesSection";
import HobbySection from "@/components/HobbySection";
import MemoriesSection from "@/components/MemoriesSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.sections}>
      {/* Hero Section */}
      <HeroSection />

      <AboutSection />

      {/* Metrics & Impact Stats Counter */}
      <StatsSection />

      {/* Academic Qualifications & Educational Background */}
      <EducationSection />

      <SkillsSection />

      {/* Research Work Portfolio */}
      <ResearchWorkSection />

      {/* Selected Featured Publications */}
      <FeaturedPublications />

      {/* Honors & Awards Section */}
      <AwardsSection />

      {/* Patents & Innovations */}
      <PatentsSection />

      {/* International Conferences Section */}
      <ConferencesSection />

      <HobbySection />

      <RefereesSection />

      <MemoriesSection />
    </div>
  );
}

