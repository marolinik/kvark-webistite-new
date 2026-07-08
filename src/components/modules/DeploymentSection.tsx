import { Link } from "react-router-dom";
import {
  PlugsIcon,
  BuildingOfficeIcon,
  CloudCheckIcon,
  CaretRightIcon,
} from "@phosphor-icons/react";
import SectionHeading from "@/components/common/SectionHeading";

const deploymentOptions = [
  {
    icon: PlugsIcon,
    title: "Air-gapped",
    featured: true,
    badge: "For classified environments",
    description:
      "Fully disconnected operation with local open-weight models, local embeddings and local OCR. No external dependency at inference time — nothing calls home.",
  },
  {
    icon: BuildingOfficeIcon,
    title: "On-premise",
    featured: false,
    badge: "Most common",
    description:
      "Your datacenter, your GPUs. Deploy with Docker Compose on a single host or scale out on Kubernetes with Helm — with independently scaled workers.",
  },
  {
    icon: CloudCheckIcon,
    title: "Private cloud & hybrid",
    featured: false,
    badge: "Under EU jurisdiction",
    description:
      "Run in your private or sovereign cloud environment while keeping data residency, key ownership and governance fully under your control.",
  },
];

const stack = [
  "PostgreSQL + vector search",
  "NATS JetStream",
  "MinIO",
  "MLflow",
  "OnlyOffice",
  "Local open-weight LLMs",
];

const methodology = [
  {
    step: "01",
    title: "Business analysis",
    detail:
      "Align AI initiatives with business priorities — integration requirements, workflow definition, infrastructure sizing, compliance requirements.",
  },
  {
    step: "02",
    title: "Infrastructure setup",
    detail:
      "Establish a secure deployment foundation in your environment — infrastructure and deployment configuration.",
  },
  {
    step: "03",
    title: "Implementation",
    detail:
      "Configure the platform for target use cases — solution development, acceptance testing, documentation and end-user training.",
  },
  {
    step: "04",
    title: "Support & maintenance",
    detail:
      "Sustain adoption with multi-level support (L1–L3), platform enhancements and continuous improvement.",
  },
];

function DeploymentSection() {
  return (
    <section
      id="deployment-models"
      className="relative w-full px-4 lg:px-20 py-16 lg:py-24 bg-neutral-25"
    >
      <div className="relative flex flex-col items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Deployment"
          title="Deployed your way. Documented end to end."
          subtitle="Every deployment model keeps data, models and governance inside your perimeter — choose the isolation level your regulator and your risk appetite demand."
        />

        {/* Deployment cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
          {deploymentOptions.map((option) => (
            <div
              key={option.title}
              className={`flex flex-col gap-4 rounded-3xl border bg-white p-6 lg:p-8 transition-colors duration-300 ${
                option.featured
                  ? "border-primary-end shadow-[0_16px_32px_-16px_rgba(5,38,170,0.25)]"
                  : "border-neutral-100 hover:border-neutral-200"
              }`}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                    option.featured
                      ? "border-primary-end/30 bg-[linear-gradient(180deg,rgba(29,87,255,0.10)_0%,rgba(255,255,255,1)_100%)]"
                      : "border-neutral-100 bg-neutral-25"
                  }`}
                >
                  <option.icon
                    size={22}
                    weight="duotone"
                    className="text-primary-end"
                  />
                </div>
                <span
                  className={`text-[0.65rem] lg:text-xs font-medium tracking-[0.08em] uppercase px-3 py-1 rounded-full ${
                    option.featured
                      ? "bg-primary-end/10 text-primary-end"
                      : "bg-neutral-50 text-neutral-500"
                  }`}
                >
                  {option.badge}
                </span>
              </div>
              <h3 className="text-xl lg:text-2xl font-medium text-neutral-900">
                {option.title}
              </h3>
              <p className="text-sm lg:text-base text-neutral-600 leading-[150%]">
                {option.description}
              </p>
            </div>
          ))}
        </div>

        {/* OSS stack transparency */}
        <div className="w-full p-1 border border-neutral-50 rounded-3xl">
          <div className="flex flex-col gap-5 rounded-[1.25rem] border border-neutral-100 bg-white px-6 py-7 lg:px-10 lg:py-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 justify-between">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg lg:text-xl font-medium text-neutral-900">
                  A fully documented, self-hosted stack — no black box
                </h3>
                <p className="text-sm lg:text-base text-neutral-500 leading-[150%]">
                  Proven open-source substrate you can inspect, audit and keep.
                  Exit rights by design, aligned with DORA.
                </p>
              </div>
              <Link
                to="/resources/technical"
                className="flex items-center gap-1 text-sm lg:text-base font-medium text-primary-end whitespace-nowrap hover:underline"
              >
                Explore the architecture
                <CaretRightIcon size={16} weight="bold" />
              </Link>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {stack.map((item) => (
                <li
                  key={item}
                  className="text-xs lg:text-sm text-neutral-600 px-3.5 py-1.5 border border-neutral-100 bg-neutral-25 rounded-full"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Delivery methodology */}
        <div className="w-full flex flex-col gap-8">
          <h3 className="text-xl lg:text-2xl font-normal text-neutral-900 text-center">
            From legacy to AI — a controlled, measurable path
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {methodology.map((phase) => (
              <div
                key={phase.step}
                className="flex flex-col gap-3 rounded-3xl border border-neutral-100 bg-white p-6"
              >
                <span className="text-sm font-medium text-primary-end">
                  {phase.step}
                </span>
                <h4 className="text-base lg:text-lg font-medium text-neutral-900">
                  {phase.title}
                </h4>
                <p className="text-xs lg:text-sm text-neutral-500 leading-[150%]">
                  {phase.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DeploymentSection;
