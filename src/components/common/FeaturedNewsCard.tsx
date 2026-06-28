import { useNavigate } from "react-router-dom";
import { ArrowRight } from "@phosphor-icons/react";
import { pushEvent } from "@/utils/gtm";

interface FeaturedNewsCardProps {
  slug: string;
  type: "Events" | "News";
  title: string;
  description: string;
  dateLabel: string;
  image: string;
}

function FeaturedNewsCard({
  slug,
  type,
  title,
  description,
  dateLabel,
  image,
}: FeaturedNewsCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    pushEvent({ event: "news_event_click", content_title: title, content_type: type, slug, featured: true });
    navigate(`/company/events/${slug}`);
  };

  return (
    <article 
      onClick={handleClick}
      className="relative w-full h-[692px] rounded-4xl overflow-hidden cursor-pointer group"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 lg:p-10">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-20">
          {/* Left Content */}
          <div className="flex flex-col gap-1.5 max-w-[696px]">
            {/* Date and Type */}
            <p className="text-base text-white font-normal leading-[150%]">
              {dateLabel} • {type}
            </p>

            {/* Title and Description */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[2rem] lg:text-[3rem] font-normal leading-[110%] tracking-[-0.02em] text-white">
                {title}
              </h2>
              <p className="text-base text-white font-normal leading-[150%] max-w-[557px]">
                {description}
              </p>
            </div>
          </div>

          {/* Read Article Button */}
          <div className="flex items-center gap-2 text-white shrink-0">
            <span className="text-base font-normal">Read Article</span>
            <ArrowRight size={20} weight="regular" />
          </div>
        </div>
      </div>
    </article>
  );
}

export default FeaturedNewsCard;
