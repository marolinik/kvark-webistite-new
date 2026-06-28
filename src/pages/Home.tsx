/* Sections */
import HeroSection from "@/components/modules/HeroSection";
import FeaturesSection from "@/components/modules/FeaturesSection";
import UseCasesSection from "@/components/modules/UseCasesSection";
import CostComplianceControlSection from "@/components/modules/AdvantagesSection";
import DemoSection from "@/components/modules/DemoSection";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const location = useLocation();
  const state = location.state as { scrollToFeature?: boolean } | null;

  useEffect(() => {
    if (state?.scrollToFeature) {
      // Wait for page to render then scroll to features section
      setTimeout(() => {
        const featuresSection = document.getElementById("features");
        if (featuresSection) {
          featuresSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }
  }, [state]);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CostComplianceControlSection />
      <UseCasesSection />
      <DemoSection />
    </>
  );
}

export default Home;
