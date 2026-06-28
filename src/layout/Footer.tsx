import { Link, useNavigate } from "react-router-dom";
import logoLight from "@/assets/logo/logo_light.svg";
import footerBackground from "@/assets/backgrounds/footer-background.png";

function Footer() {
  const navigate = useNavigate();

  const handlePageClick = (path: string) => {
    navigate(path);
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
  };

  return (
    <footer
      className="w-full bg-secondary mt-auto"
      style={{
        backgroundImage: `url(${footerBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-5/6 w-full mx-auto px-4 py-8 lg:py-16">
        {/* Main footer content */}
        <div className="w-full flex flex-col lg:flex-row justify-between gap-12 mb-12">
          {/* Left column - Company info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Link to="/">
                <img src={logoLight} alt="KVARK" className="h-10" />
              </Link>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md">
              KVARK is an on-premise Enterprise AI Factory developed by Egzakta AI LAB, the innovation unit of Egzakta Group focused on applied AI, advanced analytics, and scalable digital solutions. The KVARK AI brand is owned by Egzakta Advisory Amsterdam B.V., a Netherlands-registered company within the Egzakta Group ecosystem, delivering sovereign AI solutions with full control, compliance, and data ownership.
            </p>
            {/* Contact Information */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Barbara+Strozzilaan+201+1083+HN+Amsterdam+Netherlands"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Barbara Strozzilaan 201, 1083 HN Amsterdam, Netherlands
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <a
                  href="mailto:hello@kvark.ai"
                  className="hover:text-white transition-colors"
                >
                  hello@kvark.ai
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold text-sm lg:text-base mb-2">
                Company
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <button
                    onClick={() => handlePageClick("/company/about")}
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageClick("/company/careers")}
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageClick("/company/partner")}
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    Partners
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageClick("/company/events")}
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    Events & News
                  </button>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="text-white font-semibold text-sm lg:text-base mb-2">
                Resources
              </h3>
              <ul className="flex flex-col gap-3">
                <li>
                  <button
                    onClick={() => handlePageClick("/resources/technical")}
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    Technical Documentation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>
                      handlePageClick("/resources/deployment-options")
                    }
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    Deployment Options
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageClick("/resources/security-compliance")}
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    Security & Compliance
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageClick("/resources/faq")}
                    className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors text-left"
                  >
                    FAQ
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 lg:gap-6">
            <button
              onClick={() => handlePageClick("privacy-policy")}
              className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors"
            >
              Privacy Policy
            </button>
            <span className="text-white/30 hidden lg:inline">|</span>
            <button
              onClick={() => handlePageClick("terms-of-service")}
              className="cursor-pointer text-white/70 hover:text-white text-sm transition-colors"
            >
              Terms of Service
            </button>
          </div>
          <p className="text-white/70 text-sm">© 2025 Kvark. All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
