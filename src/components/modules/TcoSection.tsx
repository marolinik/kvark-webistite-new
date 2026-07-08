import SectionHeading from "@/components/common/SectionHeading";
import serverImage from "@/assets/images/server.png";

interface TcoBar {
  year: string;
  onPrem: number;
  cloud: number;
}

/** 5-year TCO in €k — 750 concurrent users, 8× NVIDIA H200, AI Assistant + Semantic Search */
const tcoData: TcoBar[] = [
  { year: "Year 1", onPrem: 378, cloud: 631 },
  { year: "Year 3", onPrem: 413, cloud: 1892 },
  { year: "Year 5", onPrem: 448, cloud: 3154 },
];

const TCO_MAX = 3154;
/** Tallest bar height in rem — keeps the chart rem-scaled with the design system */
const BAR_MAX_REM = 14;

const serverHighlights = [
  {
    title: "Closed-loop liquid cooling",
    detail: "Self-contained — no facility water connection required",
  },
  {
    title: "Standard 4U rack design",
    detail: "Fits existing datacenter environments, no specialized racks",
  },
  {
    title: "~10-minute maintenance cycle",
    detail: "Automated drain-and-refill with minimal downtime",
  },
  {
    title: "Sustained peak GPU performance",
    detail: "Optimal temperatures under continuous AI workloads",
  },
];

function TcoSection() {
  return (
    <section id="tco" className="relative w-full px-4 lg:px-20 py-16 lg:py-24">
      <div className="relative flex flex-col items-center gap-12 lg:gap-16 max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Cost of ownership"
          title="Sovereignty that pays for itself"
          subtitle="Running KVARK on dedicated on-premise infrastructure cuts total cost of ownership by 86% over five years compared to equivalent cloud consumption — with fixed, predictable costs instead of per-token pricing."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full items-stretch">
          {/* TCO chart */}
          <div className="p-1 border border-neutral-50 rounded-3xl">
            <div className="h-full flex flex-col gap-8 rounded-[1.25rem] border border-neutral-100 bg-neutral-25 p-6 lg:p-10">
              <div className="flex items-center justify-between">
                <h3 className="text-lg lg:text-xl font-medium text-neutral-900">
                  5-year TCO — on-premise vs cloud
                </h3>
                <span className="text-2xl lg:text-3xl font-medium text-primary-end">
                  −86%
                </span>
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex items-end justify-around gap-4 border-b border-neutral-200">
                  {tcoData.map((bar) => (
                    <div
                      key={bar.year}
                      className="w-full flex items-end justify-center gap-2 flex-1"
                    >
                      <div className="flex flex-col items-center justify-end gap-1.5 w-1/3 max-w-14">
                        <span className="text-xs lg:text-sm text-neutral-600 font-medium whitespace-nowrap">
                          €{bar.onPrem}k
                        </span>
                        <div
                          className="w-full rounded-t-lg"
                          style={{
                            height: `${Math.max((bar.onPrem / TCO_MAX) * BAR_MAX_REM, 0.75)}rem`,
                            background:
                              "linear-gradient(180deg, #031B77 0%, #0526AA 100%)",
                          }}
                          role="img"
                          aria-label={`KVARK on-premise ${bar.year}: ${bar.onPrem} thousand euros`}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-end gap-1.5 w-1/3 max-w-14">
                        <span className="text-xs lg:text-sm text-neutral-600 font-medium whitespace-nowrap">
                          €{bar.cloud.toLocaleString("en-US")}k
                        </span>
                        <div
                          className="w-full rounded-t-lg bg-neutral-200"
                          style={{
                            height: `${(bar.cloud / TCO_MAX) * BAR_MAX_REM}rem`,
                          }}
                          role="img"
                          aria-label={`Cloud ${bar.year}: ${bar.cloud} thousand euros`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-around gap-4 pt-3">
                  {tcoData.map((bar) => (
                    <span
                      key={bar.year}
                      className="flex-1 text-center text-xs lg:text-sm text-neutral-600 font-medium"
                    >
                      {bar.year}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-5 text-xs lg:text-sm text-neutral-600">
                  <span className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-sm"
                      style={{
                        background:
                          "linear-gradient(180deg, #031B77 0%, #0526AA 100%)",
                      }}
                    />
                    KVARK on-premise
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm bg-neutral-200" />
                    Equivalent cloud
                  </span>
                </div>
                <p className="text-xs lg:text-sm text-neutral-500 leading-[150%]">
                  Cumulative totals. Assumptions: 750 concurrent users, one 8×
                  NVIDIA H200 server, AI Assistant and Semantic Search enabled.
                  Cloud pricing estimated at average market rates of major
                  providers. Full methodology is included in the security
                  briefing.
                </p>
              </div>
            </div>
          </div>

          {/* Server card */}
          <div className="p-1 border border-neutral-50 rounded-3xl">
            <div className="h-full flex flex-col rounded-[1.25rem] border border-neutral-100 bg-white overflow-hidden">
              <div className="w-full h-44 lg:h-56 bg-neutral-25 overflow-hidden">
                <img
                  src={serverImage}
                  alt="LM TEK liquid-cooled 4U8G GPU server"
                  width={1234}
                  height={1096}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col gap-5 p-6 lg:p-8">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg lg:text-xl font-medium text-neutral-900">
                    Purpose-built hardware, if you want it
                  </h3>
                  <p className="text-xs lg:text-sm text-neutral-500">
                    Liquid-cooled 4U8G server, engineered in-house by LM TEK
                  </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {serverHighlights.map((highlight) => (
                    <li key={highlight.title} className="flex flex-col gap-0.5">
                      <span className="text-sm lg:text-base font-medium text-neutral-900">
                        {highlight.title}
                      </span>
                      <span className="text-xs lg:text-sm text-neutral-500 leading-[145%]">
                        {highlight.detail}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm lg:text-base text-primary-end leading-[150%] pt-4 border-t border-neutral-100 mt-auto">
                  Hardware-agnostic by design — KVARK also runs on your
                  existing GPU, server and infrastructure platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TcoSection;
