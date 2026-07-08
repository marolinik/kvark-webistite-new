import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo/logo-blue.svg";
import Button from "@/components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";
import gsap from "gsap";
import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";

function Navbar() {
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef<HTMLDivElement>(null);
  const companyDropdownRef = useRef<HTMLDivElement>(null);
  const resourcesDropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdowns = () => {
    setCompanyOpen(false);
    setResourcesOpen(false);
  };

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeDropdowns();
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const featuresSection = document.getElementById("features");
        if (featuresSection) {
          featuresSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
    } else {
      const featuresSection = document.getElementById("features");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleLogoClick = () => {
    closeDropdowns();
  };

  const handleDemoClick = () => {
    closeDropdowns();
    pushEvent({ event: "cta_click", button_name: "request_demo", location: "navbar" });
    scrollToSection({
      sectionId: "demo",
      navigate,
      targetPath: "/",
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setCompanyOpen(false);
        setResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (companyDropdownRef.current) {
      if (companyOpen) {
        gsap.fromTo(
          companyDropdownRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    }
  }, [companyOpen]);

  useEffect(() => {
    if (resourcesDropdownRef.current) {
      if (resourcesOpen) {
        gsap.fromTo(
          resourcesDropdownRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );
      }
    }
  }, [resourcesOpen]);

  return (
    <nav
      className={`fixed z-999 hidden lg:flex max-w-5xl px-4 w-full items-center justify-center left-1/2 -translate-x-1/2 transition-all duration-300 ease-in-out ${isScrolled ? "top-2" : "top-9"
        }`}
    >
      <div className="w-full flex items-center justify-center">
        <div
          ref={navRef}
          className="w-full relative"
          onMouseLeave={closeDropdowns}
        >
          <div className="w-full h-15 p-3 px-4 border border-neutral-50 rounded-xl shadow-navbar flex items-center gap-6 bg-white justify-between">
            <Link
              to="/"
              onClick={handleLogoClick}
              onMouseEnter={closeDropdowns}
            >
              <img
                src={logo}
                alt="KVARK logo"
                width={109}
                height={24}
                className="w-full h-full"
              />
            </Link>

            <ul className="flex items-center gap-1">
              <li>
                <Link
                  to="/"
                  onClick={(e) => { handleFeaturesClick(e); pushEvent({ event: "nav_click", link_name: "Products" }); }}
                  onMouseEnter={closeDropdowns}
                  className="mr-2 cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:text-primary-start hover:bg-primary-end/10"
                >
                  Products
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setCompanyOpen(!companyOpen);
                    setResourcesOpen(false);
                  }}
                  onMouseEnter={() => {
                    setCompanyOpen(true);
                    setResourcesOpen(false);
                  }}
                  className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:text-primary-start hover:bg-primary-end/10 ${companyOpen ? "text-primary-start bg-primary-end/10" : ""
                    }`}
                >
                  Company{" "}
                  <CaretDownIcon
                    className={`transition-transform duration-500 ${companyOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setResourcesOpen(!resourcesOpen);
                    setCompanyOpen(false);
                  }}
                  onMouseEnter={() => {
                    setResourcesOpen(true);
                    setCompanyOpen(false);
                  }}
                  className={`cursor-pointer flex items-center gap-2 px-3 py-1.5 rounded-full transition-all hover:text-primary-start hover:bg-primary-end/10 ${resourcesOpen ? "text-primary-start bg-primary-end/10" : ""
                    }`}
                >
                  Resources{" "}
                  <CaretDownIcon
                    className={`transition-transform duration-500 ${resourcesOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </li>
            </ul>
            <div className="flex items-center gap-1">
              <div onMouseEnter={closeDropdowns}>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={handleDemoClick}
                >
                  Request a Demo
                </Button>
              </div>
            </div>
          </div>

          {companyOpen && (
            <div
              ref={companyDropdownRef}
              className="absolute left-0 right-0 top-full pt-4"
            >
              <div className="w-full bg-white border border-neutral-50 rounded-4xl shadow-navbar px-10 py-10 flex items-start gap-24">
                <div className="w-md">
                  <h2 className="text-2xl font-normal text-neutral-900 leading-[124%]">
                    Explore who we are
                  </h2>
                </div>

                <div className="flex flex-col gap-3 min-w-45">
                  <Link
                    to="/company/about"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setCompanyOpen(false); pushEvent({ event: "nav_click", link_name: "About" }); }}
                  >
                    <span>About</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    to="/company/careers"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setCompanyOpen(false); pushEvent({ event: "nav_click", link_name: "Careers" }); }}
                  >
                    <span>Careers</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    to="/company/partner"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setCompanyOpen(false); pushEvent({ event: "nav_click", link_name: "Partners" }); }}
                  >
                    <span>Partners</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    to="/company/events"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setCompanyOpen(false); pushEvent({ event: "nav_click", link_name: "Events & News" }); }}
                  >
                    <span>Events & News</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {resourcesOpen && (
            <div
              ref={resourcesDropdownRef}
              className="absolute left-0 right-0 top-full pt-4"
            >
              <div className="w-full bg-white border border-neutral-50 rounded-4xl shadow-navbar px-10 py-10 flex items-start gap-24">
                <div className="max-w-md">
                  <h2 className="text-2xl font-normal text-neutral-900 leading-snug">
                    Resources to help you get the most out of Kvark
                  </h2>
                </div>

                <div className="flex flex-col gap-3 min-w-45">
                  <Link
                    to="/resources/insights"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setResourcesOpen(false); pushEvent({ event: "nav_click", link_name: "Insights" }); }}
                  >
                    <span>Sovereign AI Insights</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    to="/resources/technical"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setResourcesOpen(false); pushEvent({ event: "nav_click", link_name: "Technical Documentation" }); }}
                  >
                    <span>Technical Documentation</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    to="/resources/deployment-options"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setResourcesOpen(false); pushEvent({ event: "nav_click", link_name: "Deployment Options" }); }}
                  >
                    <span>Deployment Options</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    to="/resources/security-compliance"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setResourcesOpen(false); pushEvent({ event: "nav_click", link_name: "Security & Compliance" }); }}
                  >
                    <span>Security & Compliance</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                  <Link
                    to="/resources/faq"
                    className="cursor-pointer group flex items-center gap-2 text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors"
                    onClick={() => { setResourcesOpen(false); pushEvent({ event: "nav_click", link_name: "FAQ" }); }}
                  >
                    <span>FAQ</span>
                    <CaretRightIcon
                      size={16}
                      className="text-neutral-400 group-hover:text-primary-start transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
