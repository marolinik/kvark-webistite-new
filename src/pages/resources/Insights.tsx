import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeading from "@/components/common/SectionHeading";
import InsightCard from "@/components/common/InsightCard";
import BriefingSubscribe from "@/components/BriefingSubscribe";
import DashedLine from "@/components/common/DashedLine";
import { insights } from "@/content/insights";
import type { InsightCategory } from "@/content/insights/types";
import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";

const categories: Array<InsightCategory | "All"> = [
  "All",
  "Briefing",
  "Regulation",
  "Open Models",
  "Infrastructure",
  "Guides",
];

function Insights() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<
    InsightCategory | "All"
  >("All");

  const filtered =
    activeCategory === "All"
      ? insights
      : insights.filter((insight) => insight.category === activeCategory);

  const [latest, ...rest] = filtered;

  const handleDemoClick = () => {
    pushEvent({
      event: "cta_click",
      button_name: "request_demo",
      location: "insights_hub",
    });
    scrollToSection({
      sectionId: "demo",
      navigate,
      targetPath: "/",
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen w-full px-4 lg:px-20 pt-30 lg:pt-40 pb-16 lg:pb-24">
      <DashedLine className="left-3 lg:left-18 top-0 bottom-0 hidden lg:block" />
      <DashedLine className="right-3 lg:right-18 top-0 bottom-0 hidden lg:block" />

      <div className="relative flex flex-col items-center gap-10 lg:gap-14 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Sovereign AI Insights"
          title="The sovereign AI knowledge base"
          subtitle="Evidence-first analysis of the questions regulated enterprises actually ask: regulation timelines, open-weight models, air-gapped architecture, and the economics of running AI inside your own walls. Updated as the landscape moves."
        />

        {/* Category filter */}
        <div
          className="flex flex-wrap justify-center gap-3"
          role="group"
          aria-label="Filter insights by category"
        >
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => {
                  setActiveCategory(category);
                  pushEvent({
                    event: "insight_filter_click",
                    category,
                  });
                }}
                className={`px-4 lg:px-5 py-2 rounded-full border text-sm lg:text-base transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "border-primary-end bg-[linear-gradient(180deg,rgba(29,87,255,0.10)_0%,rgba(255,255,255,1)_100%)] text-primary-end font-medium"
                    : "border-neutral-100 bg-neutral-25 text-neutral-600 hover:border-neutral-200 hover:bg-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Articles */}
        {filtered.length === 0 ? (
          <p className="text-sm lg:text-base text-neutral-500 py-12">
            No insights in this category yet — check back soon.
          </p>
        ) : (
          <div className="w-full flex flex-col gap-5">
            {latest && (
              <div className="w-full">
                <InsightCard insight={latest} large />
              </div>
            )}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((insight) => (
                  <InsightCard key={insight.slug} insight={insight} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Stay-in-the-loop band */}
        <div className="w-full max-w-4xl p-1 border border-neutral-50 rounded-3xl">
          <div className="flex flex-col items-center gap-5 rounded-[1.25rem] border border-neutral-100 bg-[linear-gradient(to_bottom_right,rgba(29,87,255,0.05)_0%,rgba(255,255,255,1)_100%)] px-6 py-8 lg:px-12 lg:py-10 text-center">
            <h2 className="text-xl lg:text-3xl font-normal text-neutral-900">
              New analysis lands here first
            </h2>
            <p className="text-sm lg:text-base text-neutral-500 leading-[150%] max-w-xl">
              We publish when the sovereign AI landscape actually moves —
              regulation milestones, model releases worth self-hosting, and
              deployment lessons from the field. No content-mill filler.
            </p>
            <BriefingSubscribe />
            <button
              type="button"
              onClick={handleDemoClick}
              className="cursor-pointer text-sm lg:text-base text-neutral-500 hover:text-primary-end transition-colors underline underline-offset-2"
            >
              Or see the platform behind the analysis — request a demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Insights;
