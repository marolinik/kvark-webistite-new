import { useState } from "react";
import HeroBackground from "@/components/HeroBackground";
import partnerImg from "@/assets/images/partner-hero.svg";
import Button from "@/components/common/Button";
import PartnerSection from "@/components/modules/PartnerSection";
import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";
import PartnerNavigation, {
  type PartnerType,
} from "@/components/PartnerNavigation";
import PartnerTypeContent from "@/components/PartnerTypeContent";
import Section from "@/components/common/Section";

function Partner() {
  const [selectedType, setSelectedType] =
    useState<PartnerType>("systemIntegrators");

  return (
    <>
      <section className="h-full lg:h-screen flex items-end px-5 lg:px-16 pb-24 relative overflow-hidden">
        <HeroBackground />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-32">
          <div className="flex flex-col gap-4 p-0 lg:p-8 pt-24 lg:pt-0">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[110%]">
              We are always open to partnerships
            </h2>
            <p className="text-base lg:text-lg text-neutral-500 font-normal">
              Developed within and backed by the Egzakta Group, KVARK combines
              advanced AI software, agent-based architectures, and
              high-performance infrastructure into a single, enterprise-ready AI
              factory.
            </p>
            <Button
              variant="primary"
              size="medium"
              onClick={() => { pushEvent({ event: "cta_click", button_name: "become_a_partner", location: "partner_hero" }); scrollToSection({ sectionId: "partner-form" }); }}
            >
              Become a partner
            </Button>
          </div>
          <div className="flex w-full h-full justify-center items-center p-0 lg:p-4">
            <div className="relative w-full lg:px-16">
              <img
                src={partnerImg}
                className="w-full h-full object-cover rounded-[2.5rem]"
                alt="KVARK partner program hero illustration"
              />
            </div>
          </div>
        </div>
      </section>
      <Section id="partner-types">
        <div className="min-h-screen py-14 px-6 lg:py-20 lg:px-32 text-neutral-900 bg-neutral-0 relative overflow-hidden flex flex-col">
          <div className="flex flex-col gap-5 text-center mb-10 relative z-10">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal leading-[100%]">
              Our Partners
            </h2>
          </div>

          <div className="relative z-10 flex-1 flex flex-col">
            <PartnerNavigation
              defaultType="systemIntegrators"
              selectedType={selectedType}
              onSelectedTypeChange={setSelectedType}
            />

            <PartnerTypeContent type={selectedType} />
          </div>
        </div>
      </Section>
      <PartnerSection />
    </>
  );
}

export default Partner;
