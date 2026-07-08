import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import aiAssistantIcon from "@/assets/icons/ai-assistant.svg";
import semanticSearchingIcon from "@/assets/icons/semantic-searching.svg";
import documentDraftingIcon from "@/assets/icons/document-drafting.svg";
import limitlessContextIcon from "@/assets/icons/limitless-context.svg";
import serviceExternalizationIcon from "@/assets/icons/service-externalization.svg";
import enterpriseAgentsIcon from "@/assets/icons/enterprise-agents.svg";

interface Feature {
  id: string;
  title: string;
  icon: string;
  expandedTitle: string;
  expandedDescription: string;
}

const featuresConfig: Feature[] = [
  {
    id: "ai-assistant",
    title: "AI assistant",
    icon: aiAssistantIcon,
    expandedTitle: "Your entire organization, one intelligent interface",
    expandedDescription: "Chat with your data across systems, documents, emails, and messages — accessing accurate insights in a fully secure, controlled environment.",
  },
  {
    id: "semantic-searching",
    title: "Semantic search",
    icon: semanticSearchingIcon,
    expandedTitle: "Move beyond basic text search",
    expandedDescription: "Semantic search delivers context-aware retrieval and precise filtering across all organizational data, no matter the format or source.",
  },
  {
    id: "document-drafting",
    title: "Document drafting",
    icon: documentDraftingIcon,
    expandedTitle: "Accelerate how your teams create documents",
    expandedDescription: "Combine your internal data, established templates, and AI-assisted refinement to produce source-grounded documents — drafted, reviewed and approved inside your perimeter.",
  },
  {
    id: "limitless-context",
    title: "Context boards",
    icon: limitlessContextIcon,
    expandedTitle: "Break free from limited context windows",
    expandedDescription: "Context Boards connect semantic search, AI assistance, and drafting into a single intelligence layer, enabling the system to reason over more information and deliver precise, high-fidelity outputs.",
  },
  {
    id: "enterprise-agents",
    title: "Enterprise agents",
    icon: enterpriseAgentsIcon,
    expandedTitle: "Enhance operational efficiency with secure, supervised AI-automation",
    expandedDescription: "Enterprise Agents connect to your systems, act on trusted information, and streamline operations while keeping a human in the loop for full control and assurance.",
  },
  {
    id: "service-externalization",
    title: "Customer-facing AI",
    icon: serviceExternalizationIcon,
    expandedTitle: "Empower your clients with intelligent self-service",
    expandedDescription: "Deploy public-facing agents across digital channels to resolve customer queries — with the same permissions, governance and audit trail as everything else.",
  },
];

interface FeatureItemProps {
  feature: Feature;
  isActive: boolean;
  onClick: () => void;
}

const FeatureItem = ({ feature, isActive, onClick }: FeatureItemProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.to(buttonRef.current, {
      scale: isActive ? 1.02 : 1,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isActive]);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className={`w-full flex justify-center items-center border border-neutral-50 rounded-xl transition-all duration-300 cursor-pointer ${
        isActive
          ? "p-1 font-semibold text-lg bg-neutral-0"
          : "px-6 py-4 bg-neutral-25 font-normal text-sm text-neutral-900 hover:bg-neutral-50"
      }`}
    >
      <span
        className={`${
          isActive
            ? "w-full py-6 bg-linear-to-t from-white/12 to-primary-end/12 text-primary-end border border-neutral-50 rounded-lg"
            : ""
        } `}
      >
        {feature.title}
      </span>
    </button>
  );
};

interface ExpandedContentProps {
  feature: Feature;
}

interface ExpandedContentProps {
  feature: Feature;
  isCollapsing?: boolean;
}

const ExpandedContent = ({
  feature,
  isCollapsing = false,
}: ExpandedContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (
      !containerRef.current ||
      !iconRef.current ||
      !titleRef.current ||
      !descriptionRef.current
    )
      return;

    if (isCollapsing) {
      // Animate collapse
      const tl = gsap.timeline();
      tl.to([iconRef.current, titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: -10,
        duration: 0.2,
        ease: "power2.in",
      }).to(
        containerRef.current,
        {
          opacity: 0,
          height: 0,
          marginTop: 0,
          y: -20,
          duration: 0.3,
          ease: "power2.in",
        },
        "-=0.1"
      );
      return () => {
        tl.kill();
      };
    }

    // Set initial state for expansion
    gsap.set(containerRef.current, {
      opacity: 0,
      y: -20,
      height: 0,
      marginTop: 0,
    });
    gsap.set([iconRef.current, titleRef.current, descriptionRef.current], {
      opacity: 0,
      y: 10,
    });

    // Animate container expanding
    const tl = gsap.timeline();

    tl.to(containerRef.current, {
      opacity: 1,
      height: "auto",
      marginTop: 16,
      duration: 0.4,
      ease: "power2.out",
    })
      .to(
        containerRef.current,
        {
          y: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      )
      // Animate icon with subtle bounce rotation
      .to(
        iconRef.current,
        {
          opacity: 1,
          y: 0,
          rotation: 15,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(iconRef.current, {
        rotation: 0,
        duration: 0.2,
        ease: "back.out(1.7)",
      })
      // Animate title
      .to(
        titleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.4"
      )
      // Animate description
      .to(
        descriptionRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.3"
      );

    return () => {
      tl.kill();
    };
  }, [feature.id, isCollapsing]);

  return (
    <div ref={containerRef} className="overflow-hidden">
      <div className="px-6 py-6 bg-neutral-0 bg-[linear-gradient(to_bottom_right,rgba(29,87,255,0.05)_0%,rgba(255,255,255,1)_100%)] border border-neutral-50 rounded-2xl">
        <div className="flex flex-col items-start gap-5">
          <div
            ref={iconRef}
            className="shrink-0 w-8 h-8 flex items-center justify-center"
          >
            <img
              src={feature.icon}
              alt={feature.title}
              width={32}
              height={32}
              className="w-8 h-8"
            />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <h3 ref={titleRef} className="text-xl font-medium text-neutral-900">
              {feature.expandedTitle}
            </h3>
            <div className="h-px w-full bg-neutral-50" />
            <p
              ref={descriptionRef}
              className="text-base text-neutral-900 leading-relaxed"
            >
              {feature.expandedDescription}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturesContent = ({ className = "" }: { className?: string }) => {
  const [activeFeatureId, setActiveFeatureId] = useState<string | null>(
    featuresConfig[0]?.id || null
  );
  const [collapsingFeatureId, setCollapsingFeatureId] = useState<string | null>(
    null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.children;
    gsap.fromTo(
      Array.from(items),
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      }
    );
  }, []);

  const handleFeatureClick = (featureId: string) => {
    if (activeFeatureId === featureId) {
      setCollapsingFeatureId(featureId);
      setTimeout(() => {
        setActiveFeatureId(null);
        setCollapsingFeatureId(null);
      }, 300);
    } else {
      if (activeFeatureId) {
        setCollapsingFeatureId(activeFeatureId);
        setTimeout(() => {
          setActiveFeatureId(featureId);
          setCollapsingFeatureId(null);
        }, 200);
      } else {
        setActiveFeatureId(featureId);
      }
    }
  };

  const activeFeature = featuresConfig.find((f) => f.id === activeFeatureId);
  const collapsingFeature = featuresConfig.find(
    (f) => f.id === collapsingFeatureId
  );

  return (
    <div
      ref={containerRef}
      className={`w-full max-w-2xl mx-auto flex flex-col gap-4 ${className}`}
    >
      {featuresConfig.map((feature) => (
        <div key={feature.id} className="flex flex-col">
          <FeatureItem
            feature={feature}
            isActive={activeFeatureId === feature.id}
            onClick={() => handleFeatureClick(feature.id)}
          />
          {/* Show collapsing content */}
          {collapsingFeatureId === feature.id && collapsingFeature && (
            <ExpandedContent feature={collapsingFeature} isCollapsing={true} />
          )}
          {/* Show active content */}
          {activeFeatureId === feature.id &&
            activeFeature &&
            collapsingFeatureId !== feature.id && (
              <ExpandedContent feature={activeFeature} />
            )}
        </div>
      ))}
    </div>
  );
};

export default FeaturesContent;
