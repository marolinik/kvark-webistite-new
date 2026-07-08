import egzaktaLogo from "@/assets/logo/egzakta-logo.png";
import lmTekLogo from "@/assets/logo/lm-tek-logo.png";
import onlyofficeLogo from "@/assets/logo/onlyoffice-logo.png";
import bostonLogo from "@/assets/logo/boston-logo.png";
import tubeiqLogo from "@/assets/logo/tubeiq-logo.png";

const groupFacts = [
  { value: "2006", label: "European group, founded" },
  { value: "240+", label: "Employees across 4 countries" },
  { value: "350+", label: "Enterprise projects delivered" },
  { value: "100+", label: "IT engineers" },
];

const ecosystemLogos = [
  { src: egzaktaLogo, alt: "Egzakta Group", width: 1060, height: 1080 },
  { src: lmTekLogo, alt: "LM TEK", width: 1060, height: 1080 },
  { src: onlyofficeLogo, alt: "OnlyOffice", width: 1060, height: 1080 },
  { src: bostonLogo, alt: "Boston", width: 1060, height: 1080 },
  { src: tubeiqLogo, alt: "TubeIQ", width: 1060, height: 1080 },
];

function TrustBar() {
  return (
    <section
      aria-label="Company credentials"
      className="relative w-full px-4 lg:px-20 py-10 lg:py-14"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <p className="text-center text-xs lg:text-sm font-medium tracking-[0.18em] uppercase text-neutral-500">
          KVARK is built by Egzakta Group — European and vertically integrated
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {groupFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-2xl lg:text-4xl font-medium text-neutral-900">
                {fact.value}
              </span>
              <span className="text-xs lg:text-sm text-neutral-500">
                {fact.label}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 pt-2">
          <span className="text-[0.65rem] lg:text-xs font-medium tracking-[0.14em] uppercase text-neutral-500">
            Egzakta Group companies & technology partners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 lg:gap-x-16">
            {ecosystemLogos.map((logo) => (
              <img
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={logo.width}
                height={logo.height}
                className="h-10 lg:h-12 w-auto max-w-44 object-contain grayscale hover:grayscale-0 transition-all duration-300"
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustBar;
