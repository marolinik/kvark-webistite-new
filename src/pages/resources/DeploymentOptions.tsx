import { pushEvent } from "@/utils/gtm";
import deploymentOptionsImg from "@/assets/images/deployment-hero.svg";
import deploymentOptionsImage1 from "@/assets/images/deployment-image-1.png";
import deploymentOptionsImage2 from "@/assets/images/deployment-image-2.png";
import deploymentOptionsImage3 from "@/assets/images/deployment-image-3.png";
import serverImage from "@/assets/images/server.png";
import whiteSectionBackground from "@/assets/backgrounds/white-section-background.svg";

import FeatureList from "@/components/common/FeatureList";
import DemoSectionWhite from "@/components/DemoSectionWhite";
import HeroBackground from "@/components/HeroBackground";
import DarkSection from "@/layout/DarkSection";
import WhiteSection from "@/layout/WhiteSection";
import ImageWithPlaceholder from "@/components/common/ImageWithPlaceholder";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";

function DeploymentOptions() {
  return (
    <div>
      <section className="h-full lg:h-screen flex items-end px-5 lg:px-16 pb-24 relative overflow-hidden">
        <HeroBackground />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-32">
          <div className="flex flex-col gap-4 p-0 lg:p-8 pt-24 lg:pt-0">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[110%]">
              Deployment Options
            </h2>
            <p className="text-base lg:text-lg text-neutral-500 font-normal">
              Discover how KVARK delivers enterprise AI within your infrastructure. From physical deployment to ongoing updates, we provide flexible, secure options that keep your data sovereign and your operations in full control.
            </p>
          </div>
          <div className="flex w-full h-full justify-center items-center p-0 lg:p-4">
            <div className="relative w-full lg:px-16 ">
              <ImageWithPlaceholder
                src={deploymentOptionsImg}
                className="w-full h-full object-cover"
                alt="KVARK deployment options hero illustration"
              />
            </div>
          </div>
        </div>
      </section>

      <DarkSection>
        <div className="flex w-full h-full justify-center items-center order-2 lg:p-8">
          <div className="relative w-full">
            <ImageWithPlaceholder
              src={deploymentOptionsImage1}
              className="w-full h-full object-contain"
              alt="On-Premise Advantages"
            />
          </div>
        </div>

        {/* Text Content - Right on desktop, top on mobile */}
        <FeatureList
          className="order-1 p-0 lg:py-8 lg:pl-8"
          title="On-Premise Advantages"
          description="On-premise deployment provides full hardware control and significantly lower long-term costs compared to cloud alternatives."
          items={[
            { label: "Full Hardware Control", desc: "Own and manage all compute, storage, and networking components" },
            { label: "Reduced Cloud Dependency", desc: "No recurring cloud infrastructure or usage-based fees" },
            { label: "Lower Total Cost of Ownership", desc: "Up to 90% lower cost over five years compared to cloud AI platforms" },
          ]}
        />
      </DarkSection >

      <WhiteSection>
        <div className="flex w-full h-full justify-center items-center order-2 lg:order-1 lg:px-4 lg:py-8">
          <div className="relative w-full">
            <ImageWithPlaceholder
              src={deploymentOptionsImage2}
              className="w-full h-full object-contain"
              alt="Update And Deployment"
            />
          </div>
        </div>

        {/* Text Content - Right on desktop, top on mobile */}
        <FeatureList
          variant="light"
          className="order-1 lg:order-2 p-0 lg:py-8 lg:pr-8"
          title="Update And Deployment"
          description="Stay secure and current without sacrificing control. KVARK delivers continuous updates that respect your operational schedule and environment constraints."
          items={[
            { label: "Continuous Updates Included", desc: "Security patches, improvements, and new features included in your license" },
            { label: "Air-Gapped Compatible", desc: "Updates delivered via secure offline channels for fully isolated environments" },
            { label: "Full Rollback Support", desc: "Revert to any previous version without data loss or extended downtime" },
            { label: "Dedicated Update Support", desc: "Expert assistance for custom configurations and environment-specific issues during rollout" },
          ]}
        />
      </WhiteSection>


      <DarkSection>
        <div className="flex w-full h-full justify-center items-center order-2 lg:p-8">
          <div className="relative w-full">
            <ImageWithPlaceholder
              src={deploymentOptionsImage3}
              className="w-full h-full object-contain"
              alt="Release Management"
            />
          </div>
        </div>

        {/* Text Content - Right on desktop, top on mobile */}
        <FeatureList
          className="order-1 p-0 lg:py-8 lg:pl-8"
          title="Release Management"
          description="Structured, predictable, and transparent-KVARK's release management ensures you adopt new capabilities with confidence and control."
          items={[
            { label: "Semantic Versioning", desc: "Clear version numbers signal scope: major (breaking changes), minor (features), patch (fixes)" },
            { label: "Comprehensive Documentation", desc: "Full release notes, migration guides, and API changelogs for every update" },
            { label: "Risk-Assessed Expedited Patches", desc: "Critical security fixes fast-tracked with clear impact analysis and deployment guidance" },
            { label: "Direct Engineering Support", desc: "Technical assistance during major upgrades to ensure seamless migration" },
          ]}
        />
      </DarkSection>


      <section className="h-full flex flex-col items-end px-5 lg:px-16 py-24 lg:py-12 relative overflow-hidden text-neutral-900"
        style={{
          backgroundImage: `url(${whiteSectionBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <CornerDot className="top-8 left-17 hidden lg:block" />
        <CornerDot className="top-8 right-17 hidden lg:block" />
        <CornerDot className="bottom-8 left-17 hidden lg:block" />
        <CornerDot className="bottom-8 right-17 hidden lg:block" />
        <DashedLine
          direction="horizontal"
          gapSize={0}
          dashSize={1}
          className="top-9 left-17 right-17 hidden lg:block"
        />
        <DashedLine
          direction="horizontal"
          gapSize={0}
          dashSize={1}
          className="bottom-9 left-18 right-18 hidden lg:block"
        />
        <DashedLine
          className="top-9 bottom-9 left-18 right-18 hidden lg:block"
        />
        <DashedLine
          className="top-9 bottom-9 right-18 hidden lg:block"
        />
        <div className="px-0 pt-10 pb-5 lg:px-20 lg:pt-20 lg:pb-10 w-full flex flex-col justify-center items-center gap-4 text-left lg:text-center">
          <h2 className="w-full text-[2.5rem] lg:text-[3.5rem] font-normal leading-[110%]">Advanced Liquid <br /> Cooling Architecture</h2>
          <p className="text-base lg:text-lg font-normal text-neutral-600">Built to maximize GPU performance, reduce thermal constraints, <br /> and extend hardware lifespan for AI deployments.</p>
        </div>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center relative z-10 px-0 lg:px-8">
          <div className="w-full h-full justify-center items-center order-2 lg:order-1 lg:p-8 hidden lg:flex">
            <div className="relative w-full">
              <ImageWithPlaceholder
                src={serverImage}
                className="w-full h-full object-contain"
                alt="LM TEK liquid-cooled on-premise AI server"
              />
            </div>
          </div>

          {/* Text Content - Right on desktop, top on mobile */}
          <div className="flex flex-col gap-6 order-1 lg:order-2 p-0 lg:p-8 text-neutral-900">
            <p className="text-base font-semibold">
              Powering KVARK's on-premise AI infrastructure requires more than just GPUs-it demands thermal precision at enterprise scale. That's why we partner with LM TEK, the home of the globally recognized EK brand and a leader in advanced liquid cooling solutions for high-performance computing.
            </p>

            <div className="w-full h-auto justify-center items-center lg:p-8 flex lg:hidden">
              <div className="relative w-full">
                <ImageWithPlaceholder
                  src={serverImage}
                  className="w-full h-auto object-contain"
                  alt="LM TEK liquid-cooled on-premise AI server"
                />
              </div>
            </div>

            <p className="text-base font-normal text-neutral-500">
              Founded in 2024 and backed by the Egzakta Group, LM TEK engineers enterprise-grade cooling systems specifically designed for AI workloads and data center environments. Their EK Fluid Works platform delivers scalable, efficient, and reliable thermal management that keeps KVARK's GPU clusters running at peak performance-even under sustained AI training and inference loads.
            </p>

            <p className="text-base font-normal text-neutral-500">
              With LM TEK's liquid cooling architecture, KVARK deployments achieve:
            </p>

            <ul className="flex flex-col gap-3 text-neutral-500">
              <li className="flex items-center gap-3">
                <span className="text-xl">•</span>
                <span className="text-base">Maximized GPU performance with reduced thermal throttling</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">•</span>
                <span className="text-base">Extended hardware lifespan through optimal operating temperatures</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">•</span>
                <span className="text-base">Lower energy costs compared to traditional air cooling</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">•</span>
                <span className="text-base">Denser rack configurations for space-constrained data centers</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-xl">•</span>
                <span className="text-base">No external cooling modules or specialized rack cabinets required, enabling flexible deployment across standard data center environments</span>
              </li>
            </ul>

            <p className="text-base font-normal text-neutral-500">
              Whether deploying 4U rackmount systems with up to 8×NVIDIA H200 GPUs or expanding into full data center environments, KVARK's horizontally scalable architecture enables sovereign AI infrastructure to grow seamlessly from node-level performance to data center scale.
            </p>

            <a
              href="https://www.lmtek.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal w-max transition-colors flex items-center justify-center gap-2.5 rounded-[3.75rem] h-13 px-6 py-4 text-sm lg:text-base bg-linear-to-b from-primary-start to-primary-end text-white shadow-button-primary border border-button-primary hover:opacity-90 cursor-pointer"
              onClick={() => pushEvent({ event: "outbound_link_click", link_name: "Explore LM TEK", url: "https://www.lmtek.com/" })}
            >
              Explore LM TEK
            </a>
          </div>

        </div>
      </section>


      <DemoSectionWhite />
    </div>
  );
}

export default DeploymentOptions;
