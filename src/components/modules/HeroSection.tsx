import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import heroAnimation from "@/assets/animations/hero-animation.json";
import Button from "@/components/common/Button";
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

  return (
    <section className="relative h-auto lg:h-screen w-full px-4 lg:px-20 pb-4 lg:pb-8">
      <HeroBackground />
      {/* Hero Container */}
      <div className="h-full flex flex-col lg:flex-row items-center pt-20 lg:pt-28 gap-20 lg:gap-0">
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 px-2 flex flex-col items-start justify-center gap-10 order-2 lg:order-1">
          <div className="flex flex-col gap-4">
            <h1 className="text-[2.5rem] lg:text-[3.5rem] font-medium text-neutral-900 leading-[92%]">
              <span
                className="bg-clip-text text-transparent uppercase text-[4rem] lg:text-8xl"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #0526AA 0%, #020617 95.00%)",
                }}
              >
                Kvark
              </span>
              <br />
              On-premise <br />
              Enterprise AI Factory
            </h1>
            <p className="lg:pr-12 text-sm lg:text-base text-neutral-500 font-normal">
              The sovereign AI platform for enterprises that require control, compliance, and complete data ownership.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Button variant="primary" size="medium" onClick={handleDemoClick}>
              Request a Demo
            </Button>
          </div>
        </div>

        {/* Right side - Lottie Animation */}
        <div className="w-full lg:w-1/2 px-2 flex flex-col items-end justify-center gap-10 order-1 lg:order-2">
          <Lottie
            animationData={heroAnimation}
            loop={true}
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
