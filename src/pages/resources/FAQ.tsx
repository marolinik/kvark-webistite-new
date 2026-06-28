import { useState } from "react";
import Section from "@/components/common/Section";
import FAQItem from "@/components/common/FAQItem";
import DashedLine from "@/components/common/DashedLine";
import CornerDot from "@/components/common/CornerDot";
import DemoSectionWhite from "@/components/DemoSectionWhite";

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems = [
    {
      question: "1. Why choose On-Premise AI over Cloud?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>Cloud AI services use "taximeter" pricing that penalizes growth. They also create external dependencies—if their API or your internet goes down, your AI dies.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Cost Control:</strong> Fixed infrastructure costs with up to 50% savings over cloud models.
              </li>
              <li>
                <strong>Reliability:</strong> Runs on your own hardware; zero dependence on internet or third-party uptime.
              </li>
              <li>
                <strong>Asset Ownership:</strong> You own the model and the intelligence, not the vendor.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "2. How does KVARK handle security and access?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>Most AI tools require you to rebuild security from scratch, often leading to "permission gaps" where employees see data they shouldn't.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Permission Inheritance:</strong> Automatically syncs with Active Directory, SAP, and Salesforce.
              </li>
              <li>
                <strong>Air-Gapped:</strong> Physically isolated from the internet to prevent data exfiltration.
              </li>
              <li>
                <strong>Total Privacy:</strong> No external party—not even KVARK developers—can access your data.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "3. What systems does KVARK integrate with?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>AI is useless if it's an "island." Most tools can't talk to legacy systems or specialized enterprise software.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Unified Context:</strong> Connects to Teams, Slack, SharePoint, Jira, and SAP out of the box.
              </li>
              <li>
                <strong>Legacy-Ready:</strong> Supports decades-old protocols alongside modern REST APIs.
              </li>
              <li>
                <strong>Developer Friendly:</strong> Integrated CI/CD hooks for automated testing and documentation.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "4. How is regulatory compliance (GDPR/HIPAA) handled?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>Sending data to the cloud often violates data residency laws. "Black box" AI makes auditing for GDPR or the EU AI Act nearly impossible.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Data Sovereignty:</strong> Data never leaves your jurisdiction, satisfying residency requirements.
              </li>
              <li>
                <strong>Explainability:</strong> Detailed logs of AI decision pathways for full regulatory transparency.
              </li>
              <li>
                <strong>Audit-Ready:</strong> Automatically generates trails for NIS2, DORA, and HIPAA compliance.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "5. What is the Total Cost of Ownership (TCO)?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>Cloud AI costs are unpredictable. Per-token and per-user fees result in "bill shock" as your organization scales.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Predictable Budgeting:</strong> Costs are tied to hardware capacity, not usage intensity.
              </li>
              <li>
                <strong>Zero "Cloud Tax":</strong> No data egress charges or per-seat licensing multipliers.
              </li>
              <li>
                <strong>Long-term Value:</strong> Your investment builds a permanent asset rather than a recurring expense.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "6. How long does implementation take?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>Enterprise software rollouts usually drag on for years, losing momentum and stakeholder support.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>8–16 Week Launch:</strong> A structured 5-phase methodology from discovery to rollout.
              </li>
              <li>
                <strong>Proven Process:</strong> Hardware prep and system integration are handled in parallel.
              </li>
              <li>
                <strong>Zero Friction:</strong> We map existing permissions first to ensure a seamless "plug-and-play" start.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "7. What are the technical requirements?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>High-end AI often demands exotic, hard-to-source hardware that breaks IT budgets.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Standard Infrastructure:</strong> Runs on enterprise-grade Linux servers (Intel Xeon / AMD EPYC).
              </li>
              <li>
                <strong>GPU Ready:</strong> Optimized for standard NVIDIA A100/H100 data center GPUs.
              </li>
              <li>
                <strong>Flexible Deployment:</strong> Supports bare metal, private cloud, or Kubernetes environments.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "8. How is my existing data handled?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>Moving data to an AI platform creates duplication risks and fragments your "source of truth."</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Read-in-Place:</strong> KVARK indexes data where it lives; it doesn't move or "kidnap" it.
              </li>
              <li>
                <strong>Semantic Indexing:</strong> Finds meaning across your data estate without massive duplication.
              </li>
              <li>
                <strong>Information Barriers:</strong> Enforces "Chinese Walls" between departments at the AI level.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      question: "9. What support and updates are provided?",
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">The Problem</h4>
            <p>Keeping an air-gapped system updated with the latest AI breakthroughs is technically difficult.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">The KVARK Solution</h4>
            <ul className="space-y-3 ml-4">
              <li>
                <strong>Secure Delivery:</strong> Proprietary update channels designed for isolated environments.
              </li>
              <li>
                <strong>24/7 Response:</strong> Multi-tier support from standard helpdesk to dedicated account managers.
              </li>
              <li>
                <strong>Health Checks:</strong> Annual performance reviews to ensure your hardware is fully optimized.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Section id="faq" className="relative">
        <div className="min-h-screen flex flex-col pt-30 lg:pt-40 px-10 lg:px-20 gap-5 lg:gap-10 relative">
          {/* Vertical dashed lines on left and right */}
          <DashedLine
            direction="vertical"
            color="#E2E8F0"
            className="hidden lg:block lg:left-21"
          />
          <DashedLine
            direction="vertical"
            color="#E2E8F0"
            className="hidden lg:block lg:right-21"
          />

          <div className="flex flex-col gap-4 mb-10 w-full text-center px-4 lg:px-40">
            <h2 className="text-[2.5rem] lg:text-[3.5rem] font-normal leading-[100%] text-neutral-900">
              Frequently Asked Questions
            </h2>
            <p className="text-sm lg:text-base text-neutral-500">
              Everything you need to know about KVARK
            </p>
          </div>
          <div className="flex flex-col gap-4 justify-center items-center pb-20 px-4 lg:px-40 relative pt-5 lg:pt-10">
            {/* Dashed line at the top */}
            <DashedLine
              direction="horizontal"
              color="#E2E8F0"
              className="hidden lg:block top-0"
            />

            {/* Corner Dots - centered on dashed lines */}
            <CornerDot
              className="hidden lg:block top-0 left-0 -translate-y-1/2 z-20"
              variant="light"
            />
            <CornerDot
              className="hidden lg:block top-0 right-0 -translate-y-1/2 z-20"
              variant="light"
            />
            <CornerDot
              className="hidden lg:block bottom-0 left-0 translate-y-1/2 z-20"
              variant="light"
            />
            <CornerDot
              className="hidden lg:block bottom-0 right-0 translate-y-1/2 z-20"
              variant="light"
            />

            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}

            {/* Dashed line at the bottom */}
            <DashedLine
              direction="horizontal"
              color="#E2E8F0"
              className="hidden lg:block bottom-0"
            />
          </div>
        </div>
      </Section>
      <DemoSectionWhite />
    </>
  );
}

export default FAQ;
