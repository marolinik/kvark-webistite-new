import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";
import { useNavigate } from "react-router-dom";
import Button from "@/components/common/Button";
import HeroVisual from "@/components/modules/HeroVisual";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";
import FilledDot from "@/components/common/FilledDot";

const HeroBackground = () => {
  return (
    <>
      <DashedLine className="left-3 lg:left-18 top-0 bottom-4 lg:bottom-8 hidden lg:block" />
      <DashedLine className="left-1/2 -translate-x-1/2 top-0 bottom-8 hidden lg:block" />
      <DashedLine className="right-3 lg:right-18 top-0 bottom-4 lg:bottom-8 hidden lg:block" />
      <DashedLine
        direction="horizontal"
        color="#F1F5F9"
        gapSize={0}
        dashSize={1}
        className="bottom-4 lg:bottom-9 left-3 lg:left-18 right-3 lg:right-18 hidden lg:block"
      />
      <CornerDot className="bottom-4 lg:bottom-8 left-2 lg:left-17 hidden lg:block" />
      <CornerDot className="bottom-4 lg:bottom-8 right-2 lg:right-17 hidden lg:block" />
      <FilledDot className="bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden lg:block" />
    </>
  );
};

const proofPoints = [
  "In production at a national export-credit agency",
  "European Tier-1 bank pilot underway",
  "86% lower 5-year TCO vs cloud (reference config)",
  "20+ prebuilt connectors",
];

function HeroSection() {
  const navigate = useNavigate();

  const handleDemoClick = () => {
    pushEvent({ event: "cta_click", button_name: "request_demo", location: "hero" });
    scrollToSection({
      sectionId: "demo",
      navigate,
      targetPath: "/",
      behavior: "smooth",
    });
  };

  const handleHowItWorksClick = () => {
    pushEvent({ event: "cta_click", button_name: "explore_platform", location: "hero" });
    scrollToSection({
      sectionId: "features",
      navigate,
      targetPath: "/",
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full px-4 lg:px-20 pb-12 lg:pb-16">
      <HeroBackground />
      {/* Hero Container */}
      <div className="flex flex-col lg:flex-row items-center pt-24 lg:pt-32 gap-12 lg:gap-0">
        {/* Left side - Text content (value proposition first on mobile) */}
        <div className="w-full lg:w-1/2 px-2 flex flex-col items-start justify-center gap-8 order-1">
          <div className="flex flex-col gap-5">
            <span className="text-[0.65rem] lg:text-xs font-medium tracking-[0.18em] uppercase text-neutral-500">
              Sovereign by deployment · Governed by design · Agentic in operation
            </span>
            <h1 className="text-[2.75rem] lg:text-[4rem] font-medium text-neutral-900 leading-[105%]">
              Enterprise AI that{" "}
              <span className="text-primary-end">never leaves your walls</span>
            </h1>
            <p className="lg:pr-12 text-sm lg:text-base text-neutral-500 font-normal leading-[160%]">
              KVARK is the sovereign agentic AI platform for regulated
              industries — deployed on-premise or fully air-gapped, aligned
              with the EU AI Act, GDPR, NIS2 and DORA. Built and operated in
              Europe.
            </p>
          </div>
          <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4 items-stretch sm:items-start [&>button]:w-full sm:[&>button]:w-max">
            <Button variant="primary" size="medium" onClick={handleDemoClick}>
              Request a Demo
            </Button>
            <Button
              variant="outline"
              size="medium"
              onClick={handleHowItWorksClick}
            >
              Explore the Platform
            </Button>
          </div>
          {/* Proof strip */}
          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-x-6 gap-y-2.5 pt-1" aria-label="Proof points">
            {proofPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-xs lg:text-sm text-neutral-500"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #031B77 0%, #0526AA 100%)",
                  }}
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Sovereign perimeter diagram */}
        <div className="w-full lg:w-1/2 px-2 flex flex-col items-center lg:items-end justify-center order-2">
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
