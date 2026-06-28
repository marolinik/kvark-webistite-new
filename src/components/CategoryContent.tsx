import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { type Category } from "@/components/CategoryNavigation";

// Import use case images
import salesImage from "@/assets/use-case/sales-use-case.png";
import marketingImage from "@/assets/use-case/marketing-use-case.png";
import hrImage from "@/assets/use-case/hr-use-case.png";
import financeImage from "@/assets/use-case/finance-use-case.png";
import engineeringImage from "@/assets/use-case/engineering-use-case.png";

interface CategoryContentProps {
  category: Category;
}

const categoryOrder: Category[] = [
  "Marketing",
  "Sales",
  "Engineering",
  "HR",
  "Finance",
];

const categoryImages: Record<Category, { pc: string }> = {
  Marketing: { pc: marketingImage },
  Sales: { pc: salesImage },
  Engineering: { pc: engineeringImage },
  HR: { pc: hrImage },
  Finance: { pc: financeImage },
};

const categoryData: Record<Category, { heading: string; description: string; bullets: string[] }> = {
  Marketing: {
    heading: "Run global campaigns with unprecedented speed and insight.",
    description: "Help your marketing organization shift from reactive execution to proactive, data-driven strategy.",
    bullets: [
      "Find internal insights fast across past campaigns and research.",
      "Create focused Context Boards that organize key documents and AI insights for reuse.",
      "Produce strategies and assets, combining internal knowledge and web intelligence.",
      "Draft briefs and content quickly using AI-generation.",
      "Automate reporting with agents that gather metrics and send semantic alerts.",
      "Use specific public-facing agents for customer engagement.",
    ],
  },
  Sales: {
    heading: "Accelerate sales cycles and close more deals.",
    description: "Equip your sales team with AI-powered insight and automation to focus on building relationships and winning opportunities.",
    bullets: [
      "Quickly access internal account knowledge across CRM notes, past deals, and sales playbooks.",
      "Create focused Context Boards for each opportunity, assembling key documents and AI insights into a reusable workspace.",
      "Produce personalized proposals and materials, combining internal data with relevant web intelligence.",
      "Receive automated pipeline insights as agents track CRM changes and trigger semantic notifications.",
      "Engage prospects directly by externalizing selected sales agents to your website or product pages.",
    ],
  },
  Engineering: {
    heading: "Ship faster with AI-powered development tools.",
    description: "Boost engineering productivity with intelligent code generation, testing, and documentation that accelerates your development lifecycle.",
    bullets: [
      "Generate high-quality code from natural language requirements and internal technical knowledge.",
      "Automate testing, code review, and routine checks with agents connected to your development tools.",
      "Produce comprehensive documentation automatically based on codebases, specifications, and context boards.",
      "Access relevant architectural decisions and historical knowledge through Semantic Search and curated Context Boards.",
      "Integrate seamlessly with your existing workflows, from version control to CI/CD pipelines.",
    ],
  },
  HR: {
    heading: "Transform HR operations with intelligent automation.",
    description: "Streamline recruitment, onboarding, and employee management with AI that understands your organization's unique needs.",
    bullets: [
      "Automate resume screening and candidate matching using internal job profiles and historical hiring data.",
      "Generate personalized onboarding materials enriched with policies, procedures, and role-specific information.",
      "Provide instant, accurate answers to employee questions through secure AI assistants connected to internal knowledge.",
      "Analyze workforce data to uncover trends and support strategic HR decision-making.",
      "Maintain seamless alignment with existing HCM systems through integrated, agent-driven workflows.",
    ],
  },
  Finance: {
    heading: "Enhance financial operations with intelligent automation.",
    description: "Strengthen accuracy, speed, and oversight across budgeting, forecasting, and reporting with AI tailored to enterprise financial workflows.",
    bullets: [
      "Analyze internal financial data instantly to support planning, forecasting, and variance explanations.",
      "Automate recurring reporting cycles with agents that compile figures, validate inputs, and surface anomalies.",
      "Generate tailored financial summaries, board materials, and investment analyses using internal knowledge and trusted external context.",
      "Integrate with existing ERP and financial tools to streamline approvals, reconciliations, and compliance workflows.",
    ],
  },
};

function CategoryContent({ category }: CategoryContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousCategoryRef = useRef<Category>(category);

  const { heading, description, bullets } = categoryData[category];

  useEffect(() => {
    if (previousCategoryRef.current !== category && containerRef.current) {
      const container = containerRef.current;

      // Determine navigation direction
      const previousIndex = categoryOrder.indexOf(previousCategoryRef.current);
      const currentIndex = categoryOrder.indexOf(category);
      const isMovingForward = currentIndex > previousIndex;

      // Slide out in opposite direction
      const slideOutX = isMovingForward ? -100 : 100;

      // Create timeline for smooth transition
      const tl = gsap.timeline();

      // Slide out current content
      tl.to(container, {
        opacity: 0,
        x: slideOutX,
        duration: 0.3,
        ease: "power2.in",
      });

      // Slide in new content from opposite direction
      const slideInX = isMovingForward ? 100 : -100;
      tl.fromTo(
        container,
        {
          opacity: 0,
          x: slideInX,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }

    previousCategoryRef.current = category;
  }, [category]);

  return (
    <div className="w-full flex flex-col px-2 lg:px-8 relative">
      <div
        ref={containerRef}
        className="relative grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-stretch"
      >
        {/* Left Panel - Use Case Image/Workflow */}
        <div className="w-full h-full rounded-2xl lg:rounded-[2.5rem] flex items-center justify-center overflow-hidden">
          {/* PC Image - visible on large screens */}
          <img
            src={categoryImages[category].pc}
            key={categoryImages[category].pc}
            alt={heading}
            className="w-full h-full object-contain"
          />
          <link rel="preload" href={categoryImages[category].pc} as="image" />
        </div>

        {/* Right Panel - Text Content */}
        <div className="flex flex-col gap-4 h-full px-0 lg:px-10">
          <h3 className="text-2xl lg:text-4xl font-normal leading-[110%] text-neutral-0">
            {heading}
          </h3>
          <p className="text-lg lg:text-xl leading-[150%] text-neutral-0 mb-6">
            {description}
          </p>
          <ul className="flex flex-col list-disc ml-6 gap-3 font-light">
            {bullets.map((bullet, index) => (
              <li
                key={index}
                className="text-sm lg:text-base leading-[140%] text-neutral-0"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CategoryContent;
