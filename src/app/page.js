import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import EducationSection from "@/components/EducationSection";
import ResearchWorkSection from "@/components/ResearchWorkSection";
import FeaturedPublications from "@/components/FeaturedPublications";
import AwardsSection from "@/components/AwardsSection";
import PatentsSection from "@/components/PatentsSection";
import RefereesSection from "@/components/RefereesSection";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.sections}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Shivam Singh PhD Scholar",
            alternateName: "Shivam Singh",
            url: "https://dr-shivam-plum.vercel.app/",
          }).replace(/</g, "\\u003c"),
        }}
      />
      {/* Hero Section */}
      <HeroSection />

      <AboutSection />

      {/* Academic Qualifications & Educational Background */}
      <EducationSection />

      {/* Research Work Portfolio */}
      <ResearchWorkSection />

      {/* Selected Featured Publications */}
      <FeaturedPublications />

      {/* Patents & Innovations */}
      <PatentsSection />

      {/* Honors & Awards Section */}
      <AwardsSection />

      <RefereesSection />

    </div>
  );
}

