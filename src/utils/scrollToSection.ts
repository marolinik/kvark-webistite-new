import type { NavigateFunction } from "react-router-dom";
import { animationState } from "@/utils/animationState";

interface ScrollToSectionOptions {
  sectionId: string;
  navigate?: NavigateFunction;
  targetPath?: string;
  behavior?: ScrollBehavior;
  delay?: number;
}

export const scrollToSection = ({
  sectionId,
  navigate,
  targetPath = "/",
  behavior = "smooth",
  delay,
}: ScrollToSectionOptions) => {
  if (sectionId === "demo") {
    animationState.skipFeatureAnimation = true;
    window.dispatchEvent(new Event("skipFeatureAnimation"));
  }

  const performScroll = () => {
    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: yOffset, behavior });
    }
  };

  const sectionExistsOnCurrentPage =
    document.getElementById(sectionId) !== null;

  const needsNavigation =
    !sectionExistsOnCurrentPage &&
    navigate &&
    window.location.pathname !== targetPath;

  if (needsNavigation) {
    navigate(targetPath);
    setTimeout(performScroll, delay ?? 300);
  } else {
    setTimeout(performScroll, delay ?? 0);
  }
};
