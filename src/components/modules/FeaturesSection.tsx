import FeaturesContent from "@/components/FeaturesContent";
import FeatureAnimation from "@/components/FeatureAnimation";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";
import FilledDot from "@/components/common/FilledDot";

const FeatureBackground = () => {
  return (
    <>
      <DashedLine className="left-3 lg:left-18 top-0 lg:top-10 bottom-4 lg:bottom-8 hidden lg:block" />
      <DashedLine className="right-3 lg:right-18 top-0 lg:top-10 bottom-4 lg:bottom-8 hidden lg:block" />
      <DashedLine
        direction="horizontal"
        color="#F1F5F9"
        gapSize={0}
        dashSize={1}
        className="bottom-4 lg:bottom-9 left-3 lg:left-18 right-3 lg:right-18 hidden lg:block"
      />
      <DashedLine
        direction="horizontal"
        color="#F1F5F9"
        gapSize={0}
        dashSize={1}
        className="top-4 lg:top-9 left-3 lg:left-18 right-3 lg:right-18 hidden lg:block"
      />
      <CornerDot className="top-4 lg:top-8 left-2 lg:left-17 hidden lg:block" />
      <CornerDot className="top-4 lg:top-8 right-2 lg:right-17 hidden lg:block" />
      <CornerDot className="bottom-4 lg:bottom-8 left-2 lg:left-17 hidden lg:block" />
      <CornerDot className="bottom-4 lg:bottom-8 right-2 lg:right-17 hidden lg:block" />
      <FilledDot className="bottom-4 lg:bottom-8 left-1/2 -translate-x-1/2 hidden lg:block" />
      <FilledDot className="top-4 lg:top-8 left-1/2 -translate-x-1/2 hidden lg:block" />
    </>
  );
};

function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative h-auto lg:h-screen w-full px-4 lg:px-20 pb-4 lg:pb-8 pt-14 lg:pt-20"
    >
      <FeatureBackground />
      {/* Features Container */}
      <div className="relative h-full flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center text-center gap-5 w-full pb-8 max-w-7xl mx-auto">
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[112%]">
            AI at the Core of Your Organization
          </h2>
          <p className="text-sm lg:text-base text-neutral-500 font-normal leading-[150%]">
            We're building Enterprise AI platform that runs on-premise, respects every permission, and enables full use of AI without compromising data security or privacy.
          </p>
        </div>
        {/* Feature Animation */}
        <FeatureAnimation className="hidden lg:block" />
        <FeaturesContent className="block lg:hidden" />
      </div>
    </section>
  );
}

export default FeaturesSection;
