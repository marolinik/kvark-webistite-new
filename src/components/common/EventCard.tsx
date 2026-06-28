import { useNavigate } from "react-router-dom";
import getInitials from "@/utils/getInitials";
import { pushEvent } from "@/utils/gtm";

interface EventCardProps {
  slug: string;
  type: "Events" | "News";
  title: string;
  description: string;
  authorName?: string;
  authorTitle?: string;
  authorImage?: string | null;
  dateLabel: string;
  image: string;
  page?: number;
}

function EventCard({
  slug,
  title,
  description,
  authorName,
  authorTitle,
  authorImage,
  dateLabel,
  type,
  image,
  page,
}: EventCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    pushEvent({ event: "news_event_click", content_title: title, content_type: type, slug });
    const scrollY = window.scrollY;
    window.scrollTo({ top: 0, behavior: "instant" });
    // Only preserve scrollY when coming from the Events list (page prop is defined).
    // When coming from Related News (no page prop), don't carry scrollY so the
    // Events page scrolls to top on back navigation.
    const state = page !== undefined
      ? { page, scrollY }
      : { page: 1 };
    navigate(`/company/events/${slug}`, { state });
  };

  return (
    <article
      onClick={handleClick}
      className="flex flex-col gap-6 w-full h-full cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
    >
      {/* Image Container */}
      <div className="w-full h-[383px] overflow-hidden rounded-4xl bg-neutral-50">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-4 px-2 flex-1">
        {/* Date and Type */}
        <p className="text-base text-neutral-500 font-normal leading-[150%]">
          {dateLabel} • {type}
        </p>

        {/* Title and Description */}
        <div className="flex flex-col gap-8 flex-1">
          <div className="flex flex-col gap-1.5">
            <h3 className="text-2xl font-normal leading-[140%] tracking-[-0.01em] text-neutral-900">
              {title}
            </h3>
            <p className="text-base font-normal leading-[150%] text-neutral-500 line-clamp-4">
              {description}
            </p>
          </div>

          {/* Author Section - Always at bottom */}
          {(authorName || authorTitle) && (
            <div className="flex items-center gap-3 mt-auto">
              {authorImage ? (
                <img src={authorImage} alt={authorName} className="w-12 h-12 rounded-full object-cover" />
              ) : authorName ? (
                <div className="w-12 h-12 rounded-full bg-neutral-100 text-neutral-500 flex items-center justify-center text-sm font-semibold">
                  {getInitials(authorName)}
                </div>
              ) : null}
              <div className="flex flex-col gap-px">
                {authorName && (
                  <span className="text-lg font-medium leading-[130%] text-neutral-900">
                    {authorName}
                  </span>
                )}
                {authorTitle && (
                  <span className="text-base font-normal leading-[150%] text-neutral-500">
                    {authorTitle}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export default EventCard;
