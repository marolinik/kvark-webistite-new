import { useNavigate } from "react-router-dom";
import HeroBackground from "@/components/HeroBackground";
import Button from "@/components/common/Button";
import { pushEvent } from "@/utils/gtm";

import aboutImage from "@/assets/images/about-hero.svg";
import egzaktaImage from "@/assets/images/egzakta.jpg";
import useCaseBackground from "@/assets/backgrounds/use-case-background.svg";


function About() {
  const navigate = useNavigate();

  return (
    <div>
      <section className="h-full lg:h-screen flex items-end px-5 lg:px-16 pb-24 relative overflow-hidden">
        <HeroBackground />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-32">
          <div className="flex flex-col gap-4 p-0 lg:p-8 pt-24 lg:pt-0">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[110%]">
              Our Mission
            </h2>
            <p className="text-base lg:text-lg text-neutral-500 font-normal">
              To empower enterprises and nations with sovereign, in-house
              AI—built to solve real business challenges while ensuring data
              remains under user control at all times.
            </p>
          </div>
          <div className="flex w-full h-full justify-center items-center p-0 lg:p-4">
            <div className="relative w-full lg:px-16 ">
              <img
                src={aboutImage}
                className="w-full h-full object-cover"
                alt="KVARK sovereign AI platform hero illustration"
              />
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src={logo}
                  alt="KVARK Logo"
                  className="w-32 lg:w-72 h-auto"
                />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative px-4 lg:px-20 py-16 lg:py-24 overflow-hidden h-full lg:h-screen flex items-center"
        style={{
          backgroundImage: `url(${useCaseBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-0 leading-[110%]">
              Part of Egzakta AI LAB
            </h2>
            <div className="flex flex-col gap-5">
              <p className="text-base lg:text-lg text-neutral-200 font-normal leading-relaxed">
                KVARK is a product of Egzakta AI LAB, the innovation and
                venture-building unit of Egzakta Group focused on applied
                artificial intelligence, advanced analytics, and scalable
                digital solutions. Beyond developing AI-driven platforms,
                Egzakta AI LAB identifies, incubates, and accelerates new
                technology ventures, transforming high-potential ideas into
                market-ready products. KVARK reflects this approach —
                combining strategic insight, technical excellence, and
                real-world applicability to deliver measurable business value.
              </p>
              <p className="text-base lg:text-lg text-neutral-200 font-normal leading-relaxed">
                Egzakta AI LAB operates within Egzakta Group, an international
                advisory and technology group with presence in the Netherlands,
                Serbia, Slovenia, and the UAE. With decades of experience
                across consulting, digital transformation, and performance
                optimization, the Group integrates deep industry expertise with
                forward-looking technological development. Learn more about the
                broader ecosystem behind KVARK at{" "}
                <a
                  href="https://egzakta.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-0 hover:text-primary-end transition-colors underline underline-offset-2"
                >
                  egzakta.com
                </a>
                .
              </p>
            </div>
            <a
              href="https://egzakta.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal w-max transition-colors flex items-center justify-center gap-2.5 rounded-[3.75rem] bg-neutral-0 text-primary-end h-12 lg:h-14 text-base lg:text-lg px-8 cursor-pointer hover:opacity-90 mt-2"
              onClick={() => pushEvent({ event: "outbound_link_click", link_name: "Visit Egzakta", url: "https://egzakta.com" })}
            >
              Visit Egzakta
            </a>
          </div>
          <div className="flex w-full h-full justify-center items-center p-0 lg:p-4">
            <img
              src={egzaktaImage}
              alt="Egzakta team collaboration"
              className="w-full h-full object-cover rounded-[2.5rem]"
            />
          </div>
        </div>
      </section>

      <section
        className="px-4 lg:px-20 flex justify-center items-center z-10 bg-[#030E2F]"
      >
        <div className="z-10 flex flex-col gap-8 w-full h-full rounded-[2.5rem] bg-white border border-neutral-100 py-20 px-5 lg:px-32 items-center">
          <span className="text-neutral-600 text-base text-center">
            Join Our Team
          </span>
          <p className="text-neutral-900 text-[1.25rem] lg:text-[2.5rem] text-center">
            We're building the future of sovereign AI. If you're passionate
            about cutting-edge technology, enterprise infrastructure, and making
            an impact, we'd love to have you on board.
          </p>
          <Button
            variant="primary"
            className="cursor-pointer h-12 lg:h-14 text-base lg:text-lg px-8"
            onClick={() => { pushEvent({ event: "cta_click", button_name: "explore_careers", location: "about" }); navigate("/company/careers"); }}
          >
            Explore Careers
          </Button>
        </div>
      </section>
    </div>
  );
}

export default About;
