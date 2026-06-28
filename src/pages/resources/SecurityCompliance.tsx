import HeroBackground from "@/components/HeroBackground"
import FeatureList from "@/components/common/FeatureList"
import securityImg from "@/assets/images/security-hero.svg"
import securityImage1 from "@/assets/images/security-image-1.png";
import securityImage2 from "@/assets/images/security-image-2.png";
import securityImage3 from "@/assets/images/security-image-3.png";
import securityCard1 from "@/assets/images/security-card-1.png";
import securityCard2 from "@/assets/images/security-card-2.png";
import securityCard3 from "@/assets/images/security-card-3.png";
import securityCard4 from "@/assets/images/security-card-4.png";
import whiteSectionBackground from "@/assets/backgrounds/white-section-background.svg";
import DarkSection from "@/layout/DarkSection";
import WhiteSection from "@/layout/WhiteSection";
import DemoSectionWhite from "@/components/DemoSectionWhite";
import SecurityCard from "@/components/common/SecurityCard";
import ImageWithPlaceholder from "@/components/common/ImageWithPlaceholder";

const SecurityCompliance = () => {
    return (
        <div>
            <section className="h-full lg:h-screen flex items-end px-5 lg:px-16 pb-24 relative overflow-hidden">
                <HeroBackground />
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10 pt-32">
                    <div className="flex flex-col gap-4 p-0 lg:p-8 pt-24 lg:pt-0">
                        <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[110%]">
                            Security and Compliance
                        </h2>
                        <p className="text-base lg:text-lg text-neutral-500 font-normal">
                            Built for the most regulated industries in the world. KVARK's security architecture ensures your AI operations meet global compliance standards while maintaining complete data sovereignty and operational transparency.
                        </p>
                    </div>
                    <div className="flex w-full h-full justify-center items-center p-0 lg:p-4">
                        <div className="relative w-full lg:px-16 ">
                            <ImageWithPlaceholder
                                src={securityImg}
                                className="w-full h-full object-cover"
                                alt="KVARK security and compliance hero illustration"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <DarkSection>
                <div className="flex w-full h-full justify-center items-center order-2 lg:order-1 lg:p-8">
                    <div className="relative w-full">
                        <ImageWithPlaceholder
                            src={securityImage1}
                            className="w-full h-full object-contain"
                            alt="Audit & Transparency"
                        />
                    </div>
                </div>

                {/* Text Content - Right on desktop, top on mobile */}
                <FeatureList
                    className="order-1 lg:order-2 p-0 lg:py-8 lg:pr-8"
                    title="Audit & Transparency"
                    description="Full visibility into AI operations with immutable logging and built-in explainability to support regulatory compliance and internal governance."
                    items={[
                        { label: "Comprehensive Audit Trails", desc: "Every AI interaction, data access, and user action is logged with identity, timestamp, and permission context." },
                        { label: "Immutable Records", desc: "Tamper-resistant logs designed to meet GDPR, HIPAA, and financial services compliance requirements." },
                        { label: "AI Explainability", desc: "Clear traceability of how outputs were generated, including data sources and decision logic." },
                        { label: "Audit-Ready Reporting", desc: "Structured compliance reports for regulators, auditors, and security teams." },
                    ]}
                />
            </DarkSection >

            <WhiteSection>
                <div className="flex w-full h-full justify-center items-center order-2 lg:p-8">
                    <div className="relative w-full">
                        <ImageWithPlaceholder
                            src={securityImage2}
                            className="w-full h-full object-contain"
                            alt="Data Sovereignty"
                        />
                    </div>
                </div>

                {/* Text Content - Left on desktop, top on mobile */}
                <FeatureList
                    variant="light"
                    className="order-1 p-0 lg:py-8 lg:pl-8"
                    title="Data Sovereignty"
                    description="Secure processing of sensitive data with zero external data transfer."
                    items={[
                        { label: "Sensitive Data Processing", desc: "Safely analyze and use confidential and regulated datasets." },
                        { label: "No External Data Transfer", desc: "Data is never sent outside your system." },
                        { label: "Internal-Only Data Flow", desc: "All inputs, outputs, and metadata remain internal." },
                        { label: "No Third-Party Data Exposure", desc: "Data is not shared with external services or processors." },
                    ]}
                />
            </WhiteSection>


            <DarkSection>
                <div className="flex w-full h-full justify-center items-center order-1 lg:order-2 lg:p-8">
                    <div className="relative w-full">
                        <ImageWithPlaceholder
                            src={securityImage3}
                            className="w-full h-full object-contain"
                            alt="Cybersecurity & System Protection"
                        />
                    </div>
                </div>

                {/* Text Content - Left on desktop, top on mobile */}
                <FeatureList
                    className="order-1 p-0 lg:py-8 lg:pl-8"
                    title="Cybersecurity & System Protection"
                    description="Designed to support NIS2-aligned cybersecurity practices across risk management, access control, and system integrity."
                    items={[
                        { label: "Risk-Based Security Controls", desc: "Hardened configurations, network restriction, and controlled service exposure to reduce cyber risk and limit attack vectors." },
                        { label: "Identity & Access Governance", desc: "Strong authentication, role-based access control, and full traceability of user and administrative actions." },
                        { label: "Cryptographic Protection", desc: "Encryption of data in transit and at rest, with locally managed keys to ensure confidentiality and control." },
                        { label: "Supply Chain & System Integrity", desc: "Controlled build and release processes with verified components to reduce third-party and software supply chain risks." },
                    ]}
                />
            </DarkSection>

            <section className="h-full flex items-center px-5 lg:px-16 pt-24 pb-12 relative overflow-hidden bg-neutral-0"
                style={{
                    backgroundImage: `url(${whiteSectionBackground})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}>

                <div className="w-full relative z-10">
                    {/* Title Section */}
                    <div className="flex flex-col items-center gap-4 mb-12 lg:mb-16">
                        <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal text-neutral-900 leading-[110%] text-center">
                            Security and Compliance <br /> Architecture on Global Standards
                        </h2>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
                        <SecurityCard logo={securityCard1} name="GDPR" description="Data residency requirements, data protection impact assessments (DPIAs)" />
                        <SecurityCard logo={securityCard2} name="HIPAA" description="Protected health information (PHI) safeguards" />
                        <SecurityCard logo={securityCard3} name="EU AI Act" description="Transparency and explainability requirements" />
                        <SecurityCard logo={securityCard4} name="NIS2" description="NIS2 urges organizations to share cybersecurity measures" />
                    </div>
                </div>
            </section>

            <DemoSectionWhite />
        </div>
    )
}

export default SecurityCompliance