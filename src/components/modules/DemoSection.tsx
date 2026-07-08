import Section from "@/components/common/Section";
import demoBackground from "@/assets/backgrounds/demo.svg";
import DemoForm from "@/components/DemoForm";

function DemoSection() {
  return (
    <div className="relative w-full" style={{ backgroundColor: "#030E2F" }}>
      <Section id="demo">
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
            <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24 h-full">
              {/* Main headline */}
              <div className="flex flex-col h-full w-full justify-center items-start gap-6 lg:py-12 lg:pl-12">
                <h2 className="text-[2rem] lg:text-[3.5rem] font-normal text-white leading-[100%]">
                  Bring AI inside your walls
                </h2>

                {/* Sub-headline */}
                <p className="text-base lg:text-lg text-neutral-300 leading-[150%]">
                  See KVARK on your own use cases — and receive the security
                  briefing your compliance team will ask for.
                </p>

                {/* What happens next */}
                <ol className="flex flex-col gap-4 w-full max-w-md">
                  {[
                    {
                      step: "1",
                      title: "Intro call",
                      detail: "30 minutes to scope your use cases and environment",
                    },
                    {
                      step: "2",
                      title: "Tailored demo",
                      detail: "KVARK shown on scenarios that match your workflows",
                    },
                    {
                      step: "3",
                      title: "Security briefing",
                      detail:
                        "Architecture, regulatory mapping and audit-trail specification — under NDA",
                    },
                  ].map((item) => (
                    <li key={item.step} className="flex items-start gap-4">
                      <span className="w-8 h-8 shrink-0 rounded-full border border-white/25 bg-white/10 flex items-center justify-center text-sm font-medium text-white">
                        {item.step}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-base lg:text-lg text-white font-medium">
                          {item.title}
                        </span>
                        <span className="text-sm text-neutral-300 leading-[145%]">
                          {item.detail}
                        </span>
                      </div>
                    </li>
                  ))}
                </ol>

                <p className="text-sm text-neutral-300 leading-[150%]">
                  No newsletters. Your details are used only to arrange your
                  demo.
                  <br />
                  Prefer documents first? Tick{" "}
                  <span className="text-white">
                    “Also send me the security briefing pack”
                  </span>{" "}
                  in the form.
                </p>
              </div>
              <DemoForm />
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}

export default DemoSection;
