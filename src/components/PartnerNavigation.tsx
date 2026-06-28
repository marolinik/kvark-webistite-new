import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { pushEvent } from "@/utils/gtm";

// SVG Icons as React Components
const TechnologicalPartnerIcon = ({ className }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.9248 4.82579C14.4208 3.37642 15.1688 2.65174 16.0839 2.66623C16.9988 2.68072 17.7235 3.42874 19.1729 4.92476C20.6223 6.42079 21.3469 7.1688 21.3324 8.08383C21.318 8.99884 20.57 9.72352 19.0739 11.1729C17.5779 12.6223 16.8299 13.3469 15.9148 13.3325C14.9999 13.318 14.2752 12.5699 12.8258 11.0739C11.3764 9.5779 10.6517 8.82988 10.6662 7.91487C10.6807 6.99984 11.4287 6.27516 12.9248 4.82579Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M9.33268 17.9993C9.33268 19.8403 7.8403 21.3327 5.99935 21.3327C4.1584 21.3327 2.66602 19.8403 2.66602 17.9993C2.66602 16.1584 4.1584 14.666 5.99935 14.666C7.8403 14.666 9.33268 16.1584 9.33268 17.9993Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M29.3327 17.9993C29.3327 16.1584 27.8403 14.666 25.9993 14.666C24.1584 14.666 22.666 16.1584 22.666 17.9993C22.666 19.8403 24.1584 21.3327 25.9993 21.3327C27.8403 21.3327 29.3327 19.8403 29.3327 17.9993Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16 13.334V22.6673"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.666 11.334L8.66602 15.334"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19.334 11.334L23.334 15.334"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.666 25.866C12.666 24.3575 12.666 23.6033 13.1346 23.1347C13.6032 22.666 14.3575 22.666 15.866 22.666H16.1327C17.6412 22.666 18.3955 22.666 18.864 23.1347C19.3327 23.6033 19.3327 24.3575 19.3327 25.866V26.1327C19.3327 27.6412 19.3327 28.3955 18.864 28.864C18.3955 29.3327 17.6412 29.3327 16.1327 29.3327H15.866C14.3575 29.3327 13.6032 29.3327 13.1346 28.864C12.666 28.3955 12.666 27.6412 12.666 26.1327V25.866Z"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const ImplementationPartnerIcon = ({ className }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16.6943 4H15.3583C14.6077 4.01115 13.8604 4.04111 13.1263 4.08983C7.53767 4.46064 3.08607 8.96719 2.71978 14.6248C2.6481 15.7319 2.6481 16.8784 2.71978 17.9856C2.85319 20.0461 3.76614 21.954 4.84094 23.5651C5.46499 24.6928 5.05315 26.1005 4.40312 27.33C3.93444 28.2165 3.70011 28.6599 3.88827 28.98C4.07642 29.3003 4.49671 29.3105 5.3373 29.3309C6.99963 29.3713 8.12056 28.9009 9.01035 28.246C9.515 27.8745 9.76732 27.6888 9.94123 27.6675C10.1151 27.6461 10.4574 27.7868 11.1417 28.0681C11.7568 28.3211 12.471 28.4771 13.1263 28.5205C15.0289 28.6468 17.0196 28.6471 18.9261 28.5205C24.2887 28.1648 28.6685 24.0012 29.3327 18.6667"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20.7861 11.5303C19.9477 12.0217 17.7495 13.0251 19.0883 14.2807C19.7423 14.894 20.4709 15.3327 21.3866 15.3327H26.6122C27.5279 15.3327 28.2565 14.894 28.9105 14.2807C30.2493 13.0251 28.0511 12.0217 27.2127 11.5303C25.2467 10.3779 22.7521 10.3779 20.7861 11.5303Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M26.6673 5.33268C26.6673 6.80544 25.4735 7.99935 24.0007 7.99935C22.5279 7.99935 21.334 6.80544 21.334 5.33268C21.334 3.85992 22.5279 2.66602 24.0007 2.66602C25.4735 2.66602 26.6673 3.85992 26.6673 5.33268Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M11.334 20.0007H20.6673M11.334 13.334H14.0007"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ResellerPartnerIcon = ({ className }: { className?: string }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4.66602 13.334V20.0007C4.66602 23.7719 4.66602 25.6575 5.83759 26.8291C7.00916 28.0007 8.89478 28.0007 12.666 28.0007H18.666"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22.666 10.002C22.666 11.8429 21.1736 13.3328 19.3327 13.3328C17.4917 13.3328 15.9993 11.8404 15.9993 9.99948C15.9993 11.8404 14.5069 13.3328 12.666 13.3328C10.8251 13.3328 9.33268 11.8404 9.33268 9.99948C9.33268 11.8404 7.76807 13.3328 5.83801 13.3328C4.79912 13.3328 3.86611 12.9004 3.226 12.214C2.12549 11.0339 2.83347 9.29823 3.75196 7.98408L4.26868 7.27753C5.44447 5.66979 6.03236 4.86592 6.88589 4.43277C7.73944 3.99963 8.73535 3.99975 10.7272 4.00001L21.2728 4.00143C23.264 4.00169 24.2596 4.00183 25.1128 4.43496C25.966 4.86809 26.5537 5.67171 27.7292 7.27895L28.2467 7.98657C29.1652 9.30071 29.8732 11.0364 28.7727 12.2165C28.1325 12.9029 27.1995 13.3353 26.1607 13.3353C24.2305 13.3353 22.666 11.8429 22.666 10.002Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24.0007 16.666C21.4233 16.666 19.334 18.7161 19.334 21.2451C19.334 22.6911 19.9173 23.8155 21.084 24.8197C21.9063 25.5276 23.4025 27.0463 24.0007 27.9994C24.6291 27.0652 26.0951 25.5276 26.9173 24.8197C28.084 23.8155 28.6673 22.6911 28.6673 21.2451C28.6673 18.7161 26.578 16.666 24.0007 16.666Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 21.334H24.012"
      stroke="currentColor"
      strokeWidth="2.66667"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type PartnerType =
  | "systemIntegrators"
  | "consultingCompanies"
  | "salesAgents";

interface PartnerNavigationProps {
  defaultType?: PartnerType;
  onTypeChange?: (type: PartnerType) => void;
  selectedType?: PartnerType;
  onSelectedTypeChange?: (type: PartnerType) => void;
}

const partnerTypeLabels: Record<PartnerType, string> = {
  systemIntegrators: "Technological partners",
  consultingCompanies: "Implementation partners",
  salesAgents: "Reseller partners",
};

function PartnerNavigation({
  defaultType = "systemIntegrators",
  onTypeChange,
  selectedType: controlledType,
  onSelectedTypeChange,
}: PartnerNavigationProps) {
  const [internalType, setInternalType] = useState<PartnerType>(defaultType);

  const selectedType = controlledType ?? internalType;
  const buttonRefs = useRef<Map<PartnerType, HTMLButtonElement>>(new Map());
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  const types: PartnerType[] = [
    "systemIntegrators",
    "consultingCompanies",
    "salesAgents",
  ];

  const getTypeIcon = (type: PartnerType) => {
    switch (type) {
      case "systemIntegrators":
        return TechnologicalPartnerIcon;
      case "consultingCompanies":
        return ImplementationPartnerIcon;
      case "salesAgents":
        return ResellerPartnerIcon;
    }
  };

  const setButtonRef = (
    type: PartnerType,
    element: HTMLButtonElement | null
  ) => {
    if (element) {
      buttonRefs.current.set(type, element);
    }
  };

  useLayoutEffect(() => {
    const updateSliderPosition = () => {
      const currentButton = buttonRefs.current.get(selectedType);
      const slider = sliderRef.current;
      const container = containerRef.current;

      if (currentButton && slider && container) {
        // Use offsetLeft which gives position relative to parent's content box
        const x = currentButton.offsetLeft;
        const width = currentButton.offsetWidth;

        if (!isInitializedRef.current) {
          // Set initial position without animation
          gsap.set(slider, {
            x: x,
            width: width,
          });
          isInitializedRef.current = true;
        } else {
          // Animate slider to new position
          gsap.to(slider, {
            x: x,
            width: width,
            duration: 0.4,
            ease: "power2.out",
          });
        }
      }
    };

    // Initial update
    updateSliderPosition();

    // Update on resize
    const handleResize = () => {
      // Reset initialization flag on resize to ensure immediate update without animation glitches
      const wasInitialized = isInitializedRef.current;
      isInitializedRef.current = false;
      updateSliderPosition();
      isInitializedRef.current = wasInitialized;
    };

    window.addEventListener("resize", handleResize);

    // Also ensure position is calculated after fonts and images load
    const timeoutId = setTimeout(updateSliderPosition, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [selectedType]);

  const handleTypeClick = (type: PartnerType) => {
    if (controlledType === undefined) {
      setInternalType(type);
    }
    pushEvent({ event: "partner_type_click", partner_type: type });
    onSelectedTypeChange?.(type);
    onTypeChange?.(type);
  };

  return (
    <div className="flex justify-center">
      <div
        ref={containerRef}
        className="relative inline-flex items-center gap-1 rounded-full p-1 bg-neutral-50"
      >
        {/* Sliding Background Indicator */}
        <div
          ref={sliderRef}
          className="absolute bg-neutral-900 rounded-full shadow-sm"
          style={{
            top: "4px",
            bottom: "4px",
            width: "0px",
            left: "0px",
          }}
        />

        {types.map((type) => {
          const Icon = getTypeIcon(type);
          const isActive = selectedType === type;

          return (
            <button
              key={type}
              ref={(el) => setButtonRef(type, el)}
              onClick={() => handleTypeClick(type)}
              className={`
                relative z-10 flex items-center gap-2 cursor-pointer rounded-full font-medium text-sm whitespace-nowrap transition-colors duration-200
                ${
                  isActive
                    ? "text-neutral-0 px-4 lg:px-6 py-1.5 lg:py-2.5"
                    : "text-neutral-900 hover:text-neutral-700 px-2 md:px-4 lg:px-6 py-1.5 lg:py-2.5"
                }
              `}
            >
              <Icon
                className={`w-5 h-5 shrink-0 ${
                  isActive ? "hidden" : "md:hidden"
                }`}
              />
              <span className={isActive ? "" : "hidden md:inline"}>
                {partnerTypeLabels[type]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default PartnerNavigation;
