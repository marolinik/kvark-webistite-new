import { Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CaretLeftIcon, ArrowSquareOutIcon } from "@phosphor-icons/react";
import SectionHeading from "@/components/common/SectionHeading";
import InsightCard from "@/components/common/InsightCard";
import BriefingSubscribe from "@/components/BriefingSubscribe";
import Button from "@/components/common/Button";
import { insights } from "@/content/insights";
import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";
import NotFound from "@/pages/NotFound";

/**
 * Renders a prose string with minimal markdown-style links:
 * [text](/internal/path) becomes a router Link; [text](https://…) an anchor.
 */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, index) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!match) return <Fragment key={index}>{part}</Fragment>;
        const [, label, href] = match;
        if (href.startsWith("/")) {
          return (
            <Link
              key={index}
              to={href}
              className="text-primary-end underline underline-offset-2 hover:text-primary-start"
            >
              {label}
            </Link>
          );
        }
        return (
          <a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-end underline underline-offset-2 hover:text-primary-start"
          >
            {label}
          </a>
        );
      })}
    </>
  );
}

function InsightArticle() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const insight = insights.find((item) => item.slug === slug);

  if (!insight) {
    return <NotFound />;
  }

  // Same-category articles first, topped up with the newest from other
  // categories so the "Keep reading" rail always offers three paths.
  const others = insights.filter((item) => item.slug !== insight.slug);
  const related = [
    ...others.filter((item) => item.category === insight.category),
    ...others.filter((item) => item.category !== insight.category),
  ].slice(0, 3);

  const handleDemoClick = () => {
    pushEvent({
      event: "cta_click",
      button_name: "request_demo",
      location: "insight_article",
    });
    scrollToSection({
      sectionId: "demo",
      navigate,
      targetPath: "/",
      behavior: "smooth",
    });
  };

  return (
    <article className="relative min-h-screen w-full px-4 lg:px-20 pt-30 lg:pt-40 pb-16 lg:pb-24">
      <div className="relative flex flex-col gap-10 max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link
          to="/resources/insights"
          className="flex items-center gap-1 text-sm lg:text-base text-neutral-500 hover:text-primary-end transition-colors w-max"
        >
          <CaretLeftIcon size={16} />
          All insights
        </Link>

        {/* Header */}
        <header className="flex flex-col gap-5">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[0.65rem] lg:text-xs font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full bg-primary-end/10 text-primary-end">
              {insight.category}
            </span>
            <span className="text-xs lg:text-sm text-neutral-500">
              {insight.dateLabel} · {insight.readingMinutes} min read
            </span>
          </div>
          <h1 className="text-[2rem] lg:text-[2.75rem] font-medium text-neutral-900 leading-[118%]">
            {insight.title}
          </h1>
          <p className="text-base lg:text-lg text-neutral-600 leading-[160%]">
            {insight.excerpt}
          </p>
        </header>

        {/* TL;DR */}
        <aside
          aria-label="Key takeaways"
          className="rounded-3xl border border-primary-end/20 bg-[linear-gradient(to_bottom_right,rgba(29,87,255,0.06)_0%,rgba(255,255,255,1)_100%)] p-6 lg:p-8"
        >
          <h2 className="text-sm font-medium tracking-[0.12em] uppercase text-primary-end mb-4">
            TL;DR
          </h2>
          <ul className="flex flex-col gap-2.5">
            {insight.tldr.map((point) => (
              <li
                key={point}
                className="flex items-start gap-2.5 text-sm lg:text-base text-neutral-700 leading-[150%]"
              >
                <span
                  className="mt-2 w-1.5 h-1.5 rounded-full shrink-0"
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
        </aside>

        {/* Body */}
        <div className="flex flex-col gap-8">
          {insight.sections.map((section, index) => (
            <section
              key={section.heading ?? `section-${index}`}
              className="flex flex-col gap-4"
            >
              {section.heading && (
                <h2 className="text-xl lg:text-2xl font-medium text-neutral-900 leading-[130%]">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base lg:text-lg text-neutral-700 leading-[170%]"
                >
                  <RichText text={paragraph} />
                </p>
              ))}
              {section.callout && (
                <blockquote className="border-l-4 border-primary-end pl-5 py-1 text-base lg:text-lg text-neutral-900 leading-[160%] font-normal italic">
                  {section.callout}
                </blockquote>
              )}
              {section.bullets && (
                <ul className="flex flex-col gap-2.5 pl-1">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet.slice(0, 48)}
                      className="flex items-start gap-2.5 text-base lg:text-lg text-neutral-700 leading-[160%]"
                    >
                      <span
                        className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary-end shrink-0"
                        aria-hidden="true"
                      />
                      <span>
                        <RichText text={bullet} />
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Sources */}
        {insight.sources.length > 0 && (
          <footer className="rounded-3xl border border-neutral-100 bg-neutral-25 p-6 lg:p-8">
            <h2 className="text-sm font-medium tracking-[0.12em] uppercase text-neutral-500 mb-4">
              Sources & further reading
            </h2>
            <ul className="flex flex-col gap-2.5">
              {insight.sources.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-2 text-sm lg:text-base text-primary-end hover:underline leading-[150%]"
                  >
                    <ArrowSquareOutIcon
                      size={16}
                      className="mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </footer>
        )}

        {/* Author + CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 border-t border-neutral-100 pt-8">
          <div className="flex flex-col gap-1">
            <span className="text-sm lg:text-base font-medium text-neutral-900">
              KVARK Research
            </span>
            <span className="text-xs lg:text-sm text-neutral-500">
              Written by the team that deploys sovereign AI in production.
            </span>
          </div>
          <Button variant="primary" size="medium" onClick={handleDemoClick}>
            Request a Demo
          </Button>
        </div>
      </div>

      {/* Briefing subscribe */}
      <div className="relative max-w-3xl mx-auto mt-12 lg:mt-16">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-neutral-100 bg-[linear-gradient(to_bottom_right,rgba(29,87,255,0.05)_0%,rgba(255,255,255,1)_100%)] px-6 py-7 lg:px-10 lg:py-8 text-center">
          <h2 className="text-lg lg:text-2xl font-normal text-neutral-900">
            Get the monthly sovereign AI briefing
          </h2>
          <BriefingSubscribe />
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="relative flex flex-col items-center gap-8 max-w-7xl mx-auto mt-16 lg:mt-24">
          <SectionHeading title="Keep reading" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {related.map((item) => (
              <InsightCard key={item.slug} insight={item} />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

export default InsightArticle;
