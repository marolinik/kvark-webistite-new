import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

import Section from "@/components/common/Section";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";
import RelatedNews from "@/components/RelatedNews";
import HeroBackground from "@/components/HeroBackground";
import DemoSectionWhite from "@/components/DemoSectionWhite";
import WPContent from "@/components/WPContent";

import { usePostBySlug } from "@/hooks/useWordPress";
import getInitials from "@/utils/getInitials";

const EventsDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { item, loading, error } = usePostBySlug(slug);
  const [scrolled, setScrolled] = useState(false);

  const locationState = location.state as { page?: number; scrollY?: number } | null;
  const fromPage = locationState?.page ?? 1;
  const fromScrollY = locationState?.scrollY ?? 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-neutral-200 border-t-neutral-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !item) {
    navigate("/company/events");
    return null;
  }

  return (
    <>
      {/* Hero Section with Image */}
      <section className="h-full lg:h-screen flex items-end px-5 lg:px-16 pb-24 relative overflow-hidden">

        {/* Back button */}
        <button
          onClick={() => navigate("/company/events", { state: { page: fromPage, scrollY: fromScrollY } })}
          className={`text-neutral-500 text-sm lg:text-base flex items-center gap-2 cursor-pointer fixed z-80 left-4 lg:left-24 transition-all duration-300 ease-in-out ${scrolled
            ? "top-20 bg-white rounded-xl px-3 py-2 shadow-md border border-neutral-100"
            : "top-32 lg:top-52 bg-transparent border-b border-neutral-200"
            }`}
        >
          <img src={ArrowLeftIcon} alt="Arrow Left" className="w-4 h-4" />
          Back to News & Events
        </button>

        <HeroBackground />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-32">
          <div className="flex flex-col gap-4 p-0 lg:p-8 pt-24 lg:pt-0">
            <div className="flex items-center gap-3 text-neutral-600">
              <span className="text-sm lg:text-base">{item.dateLabel}</span>
            </div>
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[110%]">
              {item.title}
            </h2>
            <p className="text-base lg:text-lg text-neutral-500 font-normal">
              {item.description}
            </p>
            {(item.authorName || item.authorTitle) && (
              <div className="flex items-center gap-3 mt-auto">
                {item.authorImage ? (
                  <img src={item.authorImage} alt={item.authorName} className="w-12 h-12 rounded-full object-cover" />
                ) : item.authorName ? (
                  <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center text-sm font-semibold">
                    {getInitials(item.authorName)}
                  </div>
                ) : null}
                <div className="flex flex-col gap-px">
                  {item.authorName && (
                    <span className="text-lg font-medium leading-[130%] text-neutral-900">
                      {item.authorName}
                    </span>
                  )}
                  {item.authorTitle && (
                    <span className="text-base font-normal leading-[150%] text-neutral-500">
                      {item.authorTitle}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex w-full h-full justify-center items-center p-0 lg:p-4 mt-5 lg:mt-10">
            <div className="relative w-full lg:px-16 ">
              <img
                src={item.image}
                className="w-full h-auto max-h-[70vh] object-cover rounded-4xl"
                alt={item.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <Section id="event-content">
        <div className="relative w-full min-h-screen px-8 lg:px-30 pt-4 lg:pt-8 pb-10">
          {/* Frame decorations */}
          <DashedLine
            direction="vertical"
            className="hidden lg:block lg:absolute left-18"
          />
          <DashedLine
            direction="vertical"
            className="hidden lg:block lg:absolute right-18"
          />
          <DashedLine
            direction="horizontal"
            className="hidden lg:block lg:absolute bottom-0 left-18 right-18"
          />
          <DashedLine
            direction="horizontal"
            className="hidden lg:block lg:absolute top-0 left-18 right-18"
          />
          <CornerDot
            className="hidden lg:block lg:absolute left-17 -bottom-[4.5px]"
            variant="light"
          />
          <CornerDot
            className="hidden lg:block lg:absolute right-17 -bottom-[4.5px]"
            variant="light"
          />
          <CornerDot
            className="hidden lg:block lg:absolute left-17 -top-[4.5px]"
            variant="light"
          />
          <CornerDot
            className="hidden lg:block lg:absolute right-17 -top-[4.5px]"
            variant="light"
          />

          <div className="flex flex-col justify-center max-w-3xl mx-auto w-full">
            <WPContent
              html={item.content}
              className="wp-content space-y-8"
            />
          </div>
        </div>
      </Section>

      {/* Related News Section */}
      <RelatedNews currentItemSlug={item.slug} itemType={item.type} />
      <DemoSectionWhite />
    </>
  );
};

export default EventsDetails;
