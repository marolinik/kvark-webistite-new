import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { type PartnerType } from "@/components/PartnerNavigation";
import PartnerCard from "@/components/common/PartnerCard";

// Partner logos
import egzaktaLogo from "@/assets/logo/egzakta-logo.png";
import lmtekLogo from "@/assets/logo/lm-tek-logo.png";
import tubeiqLogo from "@/assets/logo/tubeiq-logo.png";
import onlyofficeLogo from "@/assets/logo/onlyoffice-logo.png";
import bostonLogo from "@/assets/logo/boston-logo.png";

interface PartnerTypeContentProps {
  type: PartnerType;
}

const typeOrder: PartnerType[] = [
  "systemIntegrators", // Technological partners
  "consultingCompanies", // Implementation partners
  "salesAgents", // Reseller partners
];

// Partner data with actual logos
const partnersData: Record<
  PartnerType,
  Array<{ logo: string; name: string; description: string; url: string }>
> = {
  // Technological partners
  systemIntegrators: [
    {
      logo: lmtekLogo,
      name: "LM TEK",
      description:
        "Slovenian technology company specializing in advanced liquid cooling solutions for high-performance computing.",
      url: "https://www.lmtek.com/",
    },
    {
      logo: tubeiqLogo,
      name: "TubeIQ",
      description:
        "Platform enabling organizations to digitalize business processes quickly without radical system changes.",
      url: "https://tubeiq.rs/sr/pocetna/",
    },
    {
      logo: onlyofficeLogo,
      name: "ONLYOFFICE",
      description:
        "Open-source office suite with document editing, collaboration tools, and AI-powered workflow features.",
      url: "https://www.onlyoffice.com/",
    },
  ],
  // Implementation partners
  consultingCompanies: [
    {
      logo: egzaktaLogo,
      name: "Egzakta Advisory",
      description:
        "Consulting firm providing tailored strategies, digital transformation, and business optimization services.",
      url: "https://egzakta.com/",
    },
  ],
  // Reseller partners
  salesAgents: [
    {
      logo: bostonLogo,
      name: "Boston Limited",
      description:
        "Provider of high-performance, mission-critical server and storage solutions for enterprise workloads.",
      url: "https://www.boston.co.uk/default.aspx",
    },
  ],
};

function PartnerTypeContent({ type }: PartnerTypeContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const previousTypeRef = useRef<PartnerType>(type);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll(".partner-card");
    if (cards.length === 0) return;

    // Determine animation direction
    const currentIndex = typeOrder.indexOf(type);
    const previousIndex = typeOrder.indexOf(previousTypeRef.current);
    const direction = currentIndex > previousIndex ? 1 : -1;

    // Always animate on mount and type changes
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: direction * 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
      }
    );

    previousTypeRef.current = type;
  }, [type]);

  const partners = partnersData[type];

  return (
    <div className="w-full mt-12 lg:mt-16">
      <div
        key={type}
        ref={containerRef}
        className="flex flex-wrap justify-center gap-6 lg:gap-8"
      >
        {partners.map((partner, index) => (
          <div
            key={`${type}-${index}`}
            className="partner-card w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-1.334rem)] max-w-112.5 opacity-0"
          >
            <PartnerCard
              logo={partner.logo}
              name={partner.name}
              description={partner.description}
              url={partner.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartnerTypeContent;
