import { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { pushEvent } from "@/utils/gtm";
import MegaphoneIcon from "@/assets/use-case/Megaphone";
import SuitcaseIcon from "@/assets/use-case/Suitcase";
import CodeIcon from "@/assets/use-case/Code";
import AvatarIcon from "@/assets/use-case/Avatar";
import FinanceIcon from "@/assets/use-case/Finance";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";
export type Category = "Marketing" | "Sales" | "Engineering" | "HR" | "Finance";

const categoryIcons: Record<
  Category,
  React.ComponentType<{ className?: string }>
> = {
  Marketing: MegaphoneIcon,
  Sales: SuitcaseIcon,
  Engineering: CodeIcon,
  HR: AvatarIcon,
  Finance: FinanceIcon,
};

interface CategoryNavigationProps {
  defaultCategory?: Category;
  onCategoryChange?: (category: Category) => void;
  selectedCategory?: Category;
  onSelectedCategoryChange?: (category: Category) => void;
}

const categoryLabels: Record<Category, string> = {
  Marketing: "Marketing",
  Sales: "Sales",
  Engineering: "Engineering",
  HR: "HR",
  Finance: "Finance",
};

function CategoryNavigation({
  defaultCategory = "Marketing",
  onCategoryChange,
  selectedCategory: controlledCategory,
  onSelectedCategoryChange,
}: CategoryNavigationProps) {
  const [internalCategory, setInternalCategory] =
    useState<Category>(defaultCategory);

  const selectedCategory = controlledCategory ?? internalCategory;
  const buttonRefs = useRef<Map<Category, HTMLButtonElement>>(new Map());
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitializedRef = useRef(false);

  const categories: Category[] = [
    "Marketing",
    "Sales",
    "Engineering",
    "HR",
    "Finance",
  ];

  const setButtonRef = (
    category: Category,
    element: HTMLButtonElement | null
  ) => {
    if (element) {
      buttonRefs.current.set(category, element);
    }
  };

  useLayoutEffect(() => {
    const updateSliderPosition = () => {
      const currentButton = buttonRefs.current.get(selectedCategory);
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
  }, [selectedCategory]);

  const handleCategoryClick = (category: Category) => {
    if (controlledCategory === undefined) {
      setInternalCategory(category);
    }
    pushEvent({ event: "usecase_category_click", category_name: category });
    onSelectedCategoryChange?.(category);
    onCategoryChange?.(category);
  };

  return (
    <div className="flex justify-center relative">
      <DashedLine
        direction="horizontal"
        className="-bottom-5 hidden lg:block"
        color="#FFFFFF20"
      />
      <CornerDot
        variant="dark"
        className="-bottom-5 left-0 -translate-x-1/2 translate-y-1/2 hidden lg:block"
      />
      <CornerDot
        variant="dark"
        className="-bottom-5 right-0 translate-x-1/2 translate-y-1/2 hidden lg:block"
      />
      <div
        ref={containerRef}
        className="relative inline-flex items-center gap-1 rounded-full p-1 bg-[#FFFFFF1F]"
      >
        {/* Sliding Background Indicator */}
        <div
          ref={sliderRef}
          className="absolute bg-neutral-0 rounded-full shadow-sm"
          style={{
            top: "4px",
            bottom: "4px",
            width: "0px",
            left: "0px",
          }}
        />

        {categories.map((category) => {
          const isActive = selectedCategory === category;
          const IconComponent = categoryIcons[category];
          
          return (
            <button
              key={category}
              ref={(el) => setButtonRef(category, el)}
              onClick={() => handleCategoryClick(category)}
              className={`
                relative z-10 flex items-center gap-2 cursor-pointer px-4 lg:px-6 py-1.5 lg:py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-colors duration-200
                ${
                  isActive
                    ? "text-neutral-900"
                    : "text-neutral-200 hover:text-neutral-0"
                }
              `}
            >
              <IconComponent 
                className={isActive ? "hidden md:block" : "md:block"} 
              />
              <span className="lg:hidden">
                {isActive ? categoryLabels[category] : ""}
              </span>
              <span className="hidden lg:block">
                {categoryLabels[category]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryNavigation;
