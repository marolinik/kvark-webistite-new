import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import ImageWithPlaceholder from "./ImageWithPlaceholder";
import { pushEvent } from "@/utils/gtm";

interface CardProps {
  image: string;
  title: string;
  description: string;
  backDescription: string;
}

function Card({ image, title, description, backDescription }: CardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    gsap.to(card, {
      rotationY: isFlipped ? 180 : 0,
      duration: 0.6,
      ease: "power2.inOut",
    });
  }, [isFlipped]);

  useEffect(() => {
    if (!imageContainerRef.current || !contentContainerRef.current || isFlipped)
      return;

    const imageContainer = imageContainerRef.current;
    const contentContainer = contentContainerRef.current;

    if (isHovered) {
      // Shrink image container to make room for expanded content
      gsap.to(imageContainer, {
        height: "65%",
        duration: 0.4,
        ease: "power2.out",
      });
      // Expand content container to show "Show Detail"
      gsap.to(contentContainer, {
        height: "35%",
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Restore image container to take more space
      gsap.to(imageContainer, {
        height: "70%",
        duration: 0.4,
        ease: "power2.out",
      });
      // Restore content container to smaller height
      gsap.to(contentContainer, {
        height: "30%",
        duration: 0.4,
        ease: "power2.out",
      });
    }
  }, [isHovered, isFlipped]);

  const handleClick = () => {
    const next = !isFlipped;
    setIsFlipped(next);
    pushEvent({ event: "advantage_card_flip", card_title: title, direction: next ? "open" : "close" });
  };

  return (
    <div
      className="border border-neutral-50 rounded-[2.5rem] p-1.5 w-[70%] h-[80%] min-h-135 min-w-85 md:min-w-91.5 mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{ perspective: "1000px" }}
    >
      <div
        ref={cardRef}
        className="h-full relative"
        style={{
          transformStyle: "preserve-3d",
          transform: "rotateY(0deg)",
        }}
      >
        {/* Front side */}
        <div
          className={`absolute inset-0 h-full flex flex-col items-center border border-neutral-100 rounded-[32px] overflow-hidden bg-white ${isHovered ? "border-primary-start" : "border-neutral-50"
            }`}
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          {/* Image container */}
          <div
            ref={imageContainerRef}
            className="w-full overflow-hidden shrink-0"
            style={{ height: "65%" }}
          >
            <ImageWithPlaceholder
              src={image}
              alt={title}
              className={`w-full h-full object-cover`}
            />
          </div>

          {/* Content */}
          <div
            ref={contentContainerRef}
            className="flex flex-col justify-center items-center gap-3 text-center w-full shrink-0 overflow-hidden"
            style={{ height: "45%" }}
          >
            <h3 className="text-3xl font-normal text-neutral-900 whitespace-pre-line">
              {title}
            </h3>
            <p className="text-sm lg:text-base text-neutral-500 leading-[150%] px-6 whitespace-pre-line">
              {description}
            </p>

            <div
              className={`flex items-center justify-center transition-opacity duration-300 ${isHovered ? "lg:flex" : "lg:hidden"
                } flex`}
            >
              <span className="text-base lg:text-lg font-medium text-primary-start">
                Show Detail &gt;
              </span>
            </div>
          </div>
        </div>

        {/* Back side */}
        <div
          className="absolute inset-0 h-full flex flex-col border border-primary-start rounded-[32px] overflow-hidden bg-linear-to-b from-primary-start to-primary-end p-8"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col gap-6 h-full justify-center text-left">
            <h3 className="text-3xl font-normal text-white whitespace-pre-line">
              {title}
            </h3>
            <div className="flex flex-col gap-4">
              <p className="text-base lg:text-lg text-white leading-[150%] whitespace-pre-line">
                {description}
              </p>
              <p className="text-sm lg:text-base text-white/90 leading-[150%] whitespace-pre-line">
                {backDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
