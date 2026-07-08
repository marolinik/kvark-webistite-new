/* Sections */
import HeroSection from "@/components/modules/HeroSection";
import TrustBar from "@/components/modules/TrustBar";
import ChallengesSection from "@/components/modules/ChallengesSection";
import FeaturesSection from "@/components/modules/FeaturesSection";
import ProductProofSection from "@/components/modules/ProductProofSection";
import GovernanceSection from "@/components/modules/GovernanceSection";
import IndustriesSection from "@/components/modules/IndustriesSection";
import CaseStudySection from "@/components/modules/CaseStudySection";
import TcoSection from "@/components/modules/TcoSection";
import DeploymentSection from "@/components/modules/DeploymentSection";
import FaqSection from "@/components/modules/FaqSection";
import InsightsSection from "@/components/modules/InsightsSection";
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
      <TrustBar />
      <ChallengesSection />
      <FeaturesSection />
      <ProductProofSection />
      <GovernanceSection />
      <IndustriesSection />
      <CaseStudySection />
      <TcoSection />
      <DeploymentSection />
      <FaqSection />
      <InsightsSection />
      <DemoSection />
    </>
  );
}

export default Home;
