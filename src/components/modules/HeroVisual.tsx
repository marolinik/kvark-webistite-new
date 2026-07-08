import {
  ShieldCheckIcon,
  CloudSlashIcon,
  LightningIcon,
  ChatCircleDotsIcon,
  MagnifyingGlassIcon,
  FileTextIcon,
  RobotIcon,
  ListChecksIcon,
} from "@phosphor-icons/react";
import DashedLine from "@/components/common/DashedLine";

const sources = [
  "SharePoint",
  "Teams",
  "Slack",
  "Jira",
  "Confluence",
  "Google Drive",
  "+ 20 more",
];

const outputs = [
  { icon: ChatCircleDotsIcon, label: "AI assistant" },
  { icon: MagnifyingGlassIcon, label: "Semantic search" },
  { icon: FileTextIcon, label: "Document drafting" },
  { icon: RobotIcon, label: "Enterprise agents" },
  { icon: ListChecksIcon, label: "Audit trail" },
];

const core = ["Local LLMs", "OCR", "Vector search", "Permissions"];

/**
 * Hero diagram: everything happens inside "your infrastructure" perimeter —
 * drawn in the site's blueprint card language instead of stock illustration.
 */
function HeroVisual() {
  return (
    <div className="w-full max-w-xl flex flex-col gap-3">
      {/* Perimeter */}
      <div className="relative rounded-[2.5rem] border border-neutral-100 bg-white/70 backdrop-blur-sm p-5 lg:p-7">
        {/* Perimeter label */}
        <span className="absolute -top-3.5 left-8 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary-end/30 bg-white text-[0.6rem] lg:text-[0.65rem] font-medium tracking-[0.14em] uppercase text-primary-end">
          <ShieldCheckIcon size={13} weight="fill" />
          Your infrastructure
        </span>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 lg:gap-5 pt-3">
          {/* Sources */}
          <div className="flex flex-col gap-2">
            <span className="text-[0.6rem] lg:text-[0.65rem] font-medium tracking-[0.14em] uppercase text-neutral-400 pb-1">
              Your systems
            </span>
            {sources.map((source) => (
              <span
                key={source}
                className="flex items-center gap-2 text-[0.7rem] lg:text-xs text-neutral-600 px-2.5 py-1.5 border border-neutral-100 bg-neutral-25 rounded-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-200 shrink-0" />
                {source}
              </span>
            ))}
          </div>

          {/* Core */}
          <div className="relative flex flex-col items-center gap-3 px-2 lg:px-4">
            <DashedLine
              direction="horizontal"
              className="-left-4 right-auto w-4 top-1/2"
              color="#CBD5E1"
            />
            <DashedLine
              direction="horizontal"
              className="-right-4 left-auto w-4 top-1/2"
              color="#CBD5E1"
            />
            <div
              className="w-20 h-20 lg:w-24 lg:h-24 rounded-3xl flex items-center justify-center shadow-[0_16px_32px_-12px_rgba(5,38,170,0.45)]"
              style={{
                background: "linear-gradient(180deg, #031B77 0%, #0526AA 100%)",
              }}
            >
              <LightningIcon size={38} weight="fill" className="text-white" />
            </div>
            <span className="text-sm lg:text-base font-semibold tracking-[0.14em] text-neutral-900">
              KVARK
            </span>
            <div className="flex flex-wrap justify-center gap-1.5 max-w-40">
              {core.map((item) => (
                <span
                  key={item}
                  className="text-[0.58rem] lg:text-[0.62rem] text-primary-end px-2 py-0.5 rounded-full border border-primary-end/20 bg-[linear-gradient(180deg,rgba(29,87,255,0.07)_0%,rgba(255,255,255,1)_100%)]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Outputs */}
          <div className="flex flex-col gap-2">
            <span className="text-[0.6rem] lg:text-[0.65rem] font-medium tracking-[0.14em] uppercase text-neutral-400 pb-1 text-right">
              Your teams get
            </span>
            {outputs.map((output) => (
              <span
                key={output.label}
                className="flex items-center justify-end gap-2 text-[0.7rem] lg:text-xs text-neutral-700 px-2.5 py-2 border border-neutral-100 bg-white rounded-lg"
              >
                {output.label}
                <output.icon
                  size={14}
                  weight="duotone"
                  className="text-primary-end shrink-0"
                />
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Outside the perimeter */}
      <div className="flex items-center justify-center gap-2.5 px-4 py-3 rounded-2xl border border-neutral-100 bg-neutral-25">
        <CloudSlashIcon size={18} weight="duotone" className="text-neutral-400" />
        <p className="text-[0.7rem] lg:text-xs text-neutral-500">
          Nothing calls home — no external dependency at inference time
        </p>
      </div>
    </div>
  );
}

export default HeroVisual;
