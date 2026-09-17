import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import EducationSection from "@/components/EducationSection";
import ResearchFocus from "@/components/ResearchFocus";
import FeaturedPublications from "@/components/FeaturedPublications";
import AwardsSection from "@/components/AwardsSection";
import ConferencesSection from "@/components/ConferencesSection";
import NewsUpdates from "@/components/NewsUpdates";

export default function Home() {
  return (
    <div className="flex flex-col space-y-4">
      {/* Hero Section */}
      <HeroSection />

      {/* Metrics & Impact Stats Counter */}
      <StatsSection />

      {/* Academic Qualifications & Educational Background */}
      <EducationSection />

      {/* Key Research Focus Domains */}
      <ResearchFocus />

      {/* Selected Featured Publications */}
      <FeaturedPublications />

      {/* Honors & Awards Section */}
      <AwardsSection />

      {/* International Conferences Section */}
      <ConferencesSection />

      {/* News & Announcements Timeline */}
      <NewsUpdates />
    </div>
  );
}
