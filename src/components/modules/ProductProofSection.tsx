import {
  ChatCircleTextIcon,
  FileTextIcon,
  MagnifyingGlassIcon,
  PlugsConnectedIcon,
  ShieldCheckIcon,
  SlidersHorizontalIcon,
} from "@phosphor-icons/react";
import SectionHeading from "@/components/common/SectionHeading";

const productSurfaces = [
  {
    title: "Chat grounded in your corpus",
    detail:
      "Document Q&A, citations, selected source sets, tool controls and governed LLM routing are implemented as product flows, not a future concept.",
    icon: ChatCircleTextIcon,
  },
  {
    title: "Hybrid semantic search",
    detail:
      "The search stack blends full-text, BM25, trigram-style matching and vector signals, with filters, facets, previews and access checks.",
    icon: MagnifyingGlassIcon,
  },
  {
    title: "Drafting inside OnlyOffice",
    detail:
      "AI-assisted draft sessions, checkpoints, citations and document editing live inside an editor workflow that can save back to controlled storage.",
    icon: FileTextIcon,
  },
  {
    title: "Administration built in",
    detail:
      "Admins can manage LLM APIs, audit logs, integrations, sync schedules, user access and operational health from the platform.",
    icon: SlidersHorizontalIcon,
  },
];

const proofStats = [
  {
    value: "26",
    label: "connector catalog entries",
  },
  {
    value: "6",
    label: "connector categories",
  },
  {
    value: "3",
    label: "LLM deployment modes",
  },
];

const evidenceItems = [
  {
    title: "Connectors are inspectable",
    detail:
      "SharePoint, OneDrive, Google Drive, Slack, Teams, Jira, Confluence, Okta, Microsoft Entra ID, PostgreSQL, MongoDB and more are in the product catalog.",
    icon: PlugsConnectedIcon,
  },
  {
    title: "Controls are visible",
    detail:
      "Audit logs, role-aware access, SSO hooks, connector history and LLM configuration are surfaced in the app for review and operation.",
    icon: ShieldCheckIcon,
  },
];

function ProductProofSection() {
  return (
    <section className="relative w-full px-4 lg:px-20 py-16 lg:py-24 bg-neutral-25">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 lg:gap-14">
        <SectionHeading
          eyebrow="Product proof"
          title="A platform buyers can inspect, not just a promise"
          subtitle="The demo should show real product surfaces: chat, search, drafting, integrations, audit trails, LLM controls and the admin layer that keeps them governed."
        />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.72fr] gap-6 lg:gap-8 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {productSurfaces.map((surface) => {
              const Icon = surface.icon;
              return (
                <article
                  key={surface.title}
                  className="rounded-3xl border border-neutral-100 bg-white p-6 lg:p-7 flex flex-col gap-5"
                >
                  <div className="w-11 h-11 rounded-2xl bg-primary-end/10 text-primary-end flex items-center justify-center">
                    <Icon size={22} weight="duotone" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg lg:text-xl font-medium text-neutral-900 leading-[125%]">
                      {surface.title}
                    </h3>
                    <p className="text-sm lg:text-base text-neutral-500 leading-[150%]">
                      {surface.detail}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="rounded-3xl border border-neutral-100 bg-white p-6 lg:p-8 flex flex-col gap-7">
            <div className="flex flex-col gap-2">
              <span className="text-xs lg:text-sm font-medium tracking-[0.16em] uppercase text-primary-end">
                What to verify in a demo
              </span>
              <h3 className="text-2xl lg:text-3xl font-medium text-neutral-900 leading-[120%]">
                Ask to see the working control plane.
              </h3>
              <p className="text-sm lg:text-base text-neutral-500 leading-[150%]">
                Strong competitors can show polished chat. KVARK needs to win
                by showing the governed machinery behind it.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {proofStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-neutral-25 border border-neutral-100 p-4 text-center"
                >
                  <div className="text-2xl lg:text-3xl font-medium text-neutral-900">
                    {stat.value}
                  </div>
                  <div className="text-[0.68rem] lg:text-xs text-neutral-500 leading-[130%]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              {evidenceItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex gap-3">
                    <div className="mt-0.5 w-8 h-8 rounded-xl bg-neutral-25 text-primary-end flex items-center justify-center shrink-0">
                      <Icon size={17} weight="duotone" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm lg:text-base font-medium text-neutral-900">
                        {item.title}
                      </h4>
                      <p className="text-xs lg:text-sm text-neutral-500 leading-[150%]">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ProductProofSection;
