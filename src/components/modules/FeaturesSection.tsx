import { lazy, Suspense } from "react";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";
import FilledDot from "@/components/common/FilledDot";

const FeaturesContent = lazy(() => import("@/components/FeaturesContent"));
const FeatureAnimation = lazy(() => import("@/components/FeatureAnimation"));

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
      className="relative h-auto lg:min-h-screen w-full px-4 lg:px-20 pb-4 lg:pb-8 pt-14 lg:pt-20"
    >
      <FeatureBackground />
      {/* Features Container */}
      <div className="relative h-full flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col items-center text-center gap-5 w-full pb-8 max-w-7xl mx-auto">
          <span className="text-xs lg:text-sm font-medium tracking-[0.2em] uppercase text-primary-end">
            Platform
          </span>
          <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[112%]">
            One platform. Every layer under your control.
          </h2>
          <p className="text-sm lg:text-base text-neutral-500 font-normal leading-[150%]">
            Assistant, semantic search, document drafting and enterprise agents — connected to your systems through 20+ prebuilt connectors, grounded in your data by hybrid retrieval, and governed by a single operations layer.
          </p>
        </div>
        {/* Feature Animation */}
        <Suspense
          fallback={
            <div className="hidden lg:block h-[34rem] w-full" aria-hidden />
          }
        >
          <FeatureAnimation className="hidden lg:block" />
        </Suspense>
        <div id="features-mobile" className="block lg:hidden w-full">
          <Suspense fallback={<div className="h-96 w-full" aria-hidden />}>
            <FeaturesContent />
          </Suspense>
        </div>
        <p className="text-xs lg:text-sm text-neutral-400 text-center max-w-2xl -mt-4 lg:-mt-6">
          Cloud model providers shown are optional, reached only through the
          governed LLM gateway where your policy allows — local open-weight
          models are the default.
        </p>
      </div>
    </section>
  );
}

export default FeaturesSection;
