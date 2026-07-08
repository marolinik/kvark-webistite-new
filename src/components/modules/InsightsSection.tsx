import { Link } from "react-router-dom";
import { CaretRightIcon } from "@phosphor-icons/react";
import SectionHeading from "@/components/common/SectionHeading";
import InsightCard from "@/components/common/InsightCard";
import { insights } from "@/content/insights";
import { pushEvent } from "@/utils/gtm";

function InsightsSection() {
  const latest = insights.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section
      id="insights"
      className="relative w-full px-4 lg:px-20 py-16 lg:py-24 bg-neutral-25"
    >
      <div className="relative flex flex-col items-center gap-10 lg:gap-14 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Insights"
          title="Sovereign AI, explained by practitioners"
          subtitle="Regulation timelines, open-weight model guidance, air-gap architecture and deployment economics — the analysis we share with our own clients, published in the open."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
          {latest.map((insight) => (
            <InsightCard key={insight.slug} insight={insight} />
          ))}
        </div>

        <Link
          to="/resources/insights"
          onClick={() =>
            pushEvent({
              event: "cta_click",
              button_name: "browse_insights",
              location: "home_insights",
            })
          }
          className="flex items-center gap-1.5 text-base lg:text-lg font-medium text-primary-end hover:underline"
        >
          Browse the sovereign AI knowledge base
          <CaretRightIcon size={18} weight="bold" />
        </Link>
      </div>
    </section>
  );
}

export default InsightsSection;
