import technicalImg from "@/assets/images/technical-hero.svg";
import technicalImage1 from "@/assets/images/technical-image-1.png";
import technicalImage2 from "@/assets/images/technical-image-2.png";
import technicalImage3 from "@/assets/images/technical-image-3.png";

import HeroBackground from "@/components/HeroBackground";
import FeatureList from "@/components/common/FeatureList";
import DemoSection from "@/components/modules/DemoSection";
import DarkSection from "@/layout/DarkSection";
import WhiteSection from "@/layout/WhiteSection";

function Technical() {
  return (
    <div>
      <section className="h-full lg:h-screen flex items-end px-5 lg:px-16 pb-24 relative overflow-hidden">
        <HeroBackground />
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-32">
          <div className="flex flex-col gap-4 p-0 lg:p-8 pt-24 lg:pt-0">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[110%]">
              Technical Documentation
            </h2>
            <p className="text-base lg:text-lg text-neutral-500 font-normal">
              Deep dive into KVARK's architecture. From air-gapped deployment to permission inheritance and intelligent data handling, understand the technical foundations that make sovereign enterprise AI possible.
            </p>
          </div>
          <div className="flex w-full h-full justify-center items-center p-0 lg:p-4">
            <div className="relative w-full lg:px-16 ">
              <img
                src={technicalImg}
                className="w-full h-full object-cover"
                alt="KVARK technical documentation hero illustration"
              />
            </div>
          </div>
        </div>
      </section>

      <DarkSection>
        <div className="flex w-full h-full justify-center items-center order-2 lg:order-1 lg:p-8">
          <div className="relative w-full">
            <img
              src={technicalImage1}
              className="w-full h-full object-contain"
              alt="Air-Gapped Environment"
            />
          </div>
        </div>

        <FeatureList
          className="order-1 lg:order-2 p-0 lg:py-8 lg:pr-8"
          title="Air-Gapped Environment"
          description="KVARK operates as a fully self-contained AI platform within isolated or restricted network environments."
          items={[
            { label: "Offline Operation", desc: "Full platform functionality without internet connectivity." },
            { label: "No External Runtime Dependencies", desc: "No required cloud APIs, external models, or third-party services." },
            { label: "Local Inference & Processing", desc: "Model inference and workflow execution occur entirely within your infrastructure." },
            { label: "Network-Independent Availability", desc: "Core platform capabilities do not rely on external connectivity." },
          ]}
        />
      </DarkSection>

      <WhiteSection>
        <div className="flex w-full h-full justify-center items-center order-2 lg:p-8">
          <div className="relative w-full">
            <img
              src={technicalImage2}
              className="w-full h-full object-contain"
              alt="Permission Inheritance"
            />
          </div>
        </div>

        {/* Text Content - Left on desktop, top on mobile */}
        <FeatureList
          variant="light"
          className="order-1 p-0 lg:py-8 lg:pl-8"
          title="Permission Inheritance"
          description="KVARK integrates directly with existing identity and authorization systems, enforcing access controls natively within AI workflows."
          items={[
            { label: "Native Identity Integration", desc: "Connects to Active Directory, LDAP, enterprise databases, file systems, and collaboration platforms to consume existing access control structures." },
            { label: "Role-Based Access Control (RBAC) Alignment", desc: "AI authorization follows your established RBAC model, deriving effective permissions from user roles, group memberships, and policy assignments." },
            { label: "Real-Time Access Resolution", desc: "Changes in roles, group membership, or access policies are reflected immediately without manual reconfiguration." },
            { label: "Context-Aware Enforcement", desc: "Every AI request is evaluated against the user's effective permissions before data retrieval or processing." },
          ]}
        />
      </WhiteSection>


      <DarkSection>
        <div className="flex w-full h-full justify-center items-center order-2 lg:order-1 lg:p-8">
          <div className="relative w-full">
            <img
              src={technicalImage3}
              className="w-full h-full object-contain"
              alt="Data Access & Processing Model"
            />
          </div>
        </div>

        <FeatureList
          className="order-1 lg:order-2 p-0 lg:py-8 lg:pr-8"
          title="Data Access & Processing Model"
          description="KVARK operates directly on data at its source, without replication or centralized data consolidation."
          items={[
            { label: "In-Place Data Access", desc: "Connects to existing databases, file systems, and enterprise platforms without duplicating or migrating data." },
            { label: "No ETL or Data Lake Requirement", desc: "Eliminates the need for extract-transform-load pipelines or separate AI-specific storage layers." },
            { label: "Source-System Authority", desc: "Original systems remain the single source of truth; KVARK does not create parallel data copies." },
            { label: "Live Data Interaction", desc: "Queries and processes data directly from connected systems, ensuring access to current information." },
          ]}
        />
      </DarkSection>

      <DemoSection />
    </div>
  );
}

export default Technical;
