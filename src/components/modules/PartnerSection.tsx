import Section from "@/components/common/Section";
import demoBackground from "@/assets/backgrounds/demo.svg";
import PartnerForm from "@/components/PartnerForm";

function PartnerSection() {
  return (
    <div
      className="relative w-full"
      style={{
        background:
          "linear-gradient(to bottom, white 0%, white 50%, #030E2F 50%, #030E2F 100%)",
      }}
    >
      <Section id="partner-form">
        <div className="min-h-screen h-full flex items-center justify-center p-4 lg:p-16">
          {/* Blue banner with hexagon pattern background */}
          <div
            className="relative p-4 pt-12 lg:p-8 w-full lg:w-11/12 rounded-[40px] flex justify-end items-center gap-4 lg:gap-10 flex-col"
            style={{
              backgroundImage: `url(${demoBackground})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#030E2F", // Fallback blue color
              minHeight: "500px",
            }}
          >
            {/* Content centered */}
            <div className="relative z-10 w-full flex flex-col lg:flex-row items-end justify-center gap-4 lg:gap-24 h-full">
              {/* Main headline */}
              <div className="flex flex-col h-full w-full justify-end items-start gap-5 lg:pb-12 lg:pl-12">
                <h2 className="text-[2rem] lg:text-[3.5rem] font-normal text-white leading-[100%]">
                  Become a Partner
                </h2>

                {/* Sub-headline */}
                <p className="text-base lg:text-lg text-neutral-300 leading-[150%]">
                  Join our ecosystem and help us deliver innovative solutions to enterprises worldwide.
                </p>
              </div>
              <PartnerForm />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default PartnerSection;
