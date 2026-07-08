import { Link } from "react-router-dom";
import { CaretRightIcon } from "@phosphor-icons/react";
import type { Insight } from "@/content/insights/types";
import { pushEvent } from "@/utils/gtm";

const categoryTint: Record<Insight["category"], string> = {
  Regulation: "bg-primary-end/10 text-primary-end",
  "Open Models": "bg-emerald-600/10 text-emerald-700",
  Infrastructure: "bg-amber-600/10 text-amber-700",
  Guides: "bg-violet-600/10 text-violet-700",
  Briefing: "bg-secondary/10 text-secondary",
};

interface InsightCardProps {
  insight: Insight;
  large?: boolean;
}

function InsightCard({ insight, large = false }: InsightCardProps) {
  return (
    <Link
      to={`/resources/insights/${insight.slug}`}
      onClick={() =>
        pushEvent({ event: "insight_card_click", insight_slug: insight.slug })
      }
      className="group block h-full p-1 border border-neutral-50 rounded-3xl"
    >
      <article className="h-full flex flex-col gap-4 rounded-[1.25rem] border border-neutral-100 bg-white p-6 lg:p-7 transition-all duration-300 group-hover:border-primary-end/40 group-hover:shadow-[0_16px_32px_-20px_rgba(5,38,170,0.35)]">
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`text-[0.65rem] lg:text-xs font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full ${categoryTint[insight.category]}`}
          >
            {insight.category}
          </span>
          <span className="text-xs lg:text-sm text-neutral-500">
            {insight.dateLabel} · {insight.readingMinutes} min read
          </span>
        </div>
        <h3
          className={`font-medium text-neutral-900 leading-[130%] ${
            large ? "text-xl lg:text-3xl" : "text-lg lg:text-xl"
          }`}
        >
          {insight.title}
        </h3>
        <p
          className={`text-sm lg:text-base text-neutral-600 leading-[155%] ${
            large ? "" : "line-clamp-3"
          }`}
        >
          {insight.excerpt}
        </p>
        <span className="mt-auto flex items-center gap-1 text-sm lg:text-base font-medium text-primary-end">
          Read the insight
          <CaretRightIcon
            size={16}
            weight="bold"
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </span>
      </article>
    </Link>
  );
}

export default InsightCard;
