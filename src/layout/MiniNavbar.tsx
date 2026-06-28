import { useState, useRef, useEffect } from "react";
import logo from "@/assets/logo/logo-blue.svg";
import menuIcon from "@/assets/icons/menu.svg";
import Button from "@/components/common/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CaretDownIcon, CaretRightIcon } from "@phosphor-icons/react";
import { scrollToSection } from "@/utils/scrollToSection";
import { pushEvent } from "@/utils/gtm";

function MiniNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const navRef = useRef<HTMLDivElement>(null);

  const closeDropdowns = () => {
    setCompanyOpen(false);
    setResourcesOpen(false);
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      closeDropdowns();
    }
  };

  const handleFeaturesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    closeDropdowns();
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const featuresSection = document.getElementById("features-mobile");
        if (featuresSection) {
          featuresSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 500);
    } else {
      const featuresSection = document.getElementById("features-mobile");
      if (featuresSection) {
        featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleLogoClick = () => {
    closeDropdowns();
    setMenuOpen(false);
  };

  const handleDemoClick = () => {
    closeDropdowns();
    setMenuOpen(false);
    pushEvent({ event: "cta_click", button_name: "request_demo", location: "navbar_mobile" });
    scrollToSection({
      sectionId: "demo",
      navigate,
      targetPath: "/",
      behavior: "smooth",
    });
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setCompanyOpen(false);
        setResourcesOpen(false);
        /* setLanguageOpen(false); */
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 lg:hidden overflow-hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <nav className="fixed w-full px-4 flex items-center justify-center top-4 left-1/2 -translate-x-1/2 z-99 lg:hidden">
        <div
          ref={navRef}
          className={`w-full relative max-w-full rounded-2xl transition-border ease-in-out duration-50 ${menuOpen ? "border-2 border-neutral-0 p-1" : ""
            }`}
        >
          {/* Header Bar */}
          <div className="w-full bg-white border border-neutral-50 rounded-xl p-3 shadow-navbar flex items-center justify-between">
            <Link to="/" onClick={handleLogoClick}>
              <img src={logo} alt="KVARK logo" className="w-full h-full" />
            </Link>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMenuToggle}
                className="cursor-pointer p-1 hover:opacity-70 transition-opacity"
                aria-label="Toggle menu"
              >
                <img src={menuIcon} alt="Open navigation menu" className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Dropdown Menu */}
          {menuOpen && (
            <div className="absolute left-0 right-0 top-full mt-2 w-full">
              <div className="w-full bg-white border border-neutral-50 rounded-2xl shadow-navbar overflow-hidden">
                {/* Products */}
                <div className="m-2 px-4 py-3 border-b border-neutral-50 flex items-center gap-2">
                  <Link
                    to="/"
                    onClick={(e) => { handleFeaturesClick(e); pushEvent({ event: "nav_click", link_name: "Products" }); }}
                    className="cursor-pointer text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors block"
                  >
                    Products
                  </Link>
                </div>

                {/* Company Section */}
                <div className="border-b border-neutral-50">
                  <button
                    type="button"
                    onClick={() => {
                      setCompanyOpen(!companyOpen);
                      setResourcesOpen(false);
                    }}
                    className={`m-2 px-4 py-3 flex items-center cursor-pointer transition-colors rounded-full gap-2 ${companyOpen
                      ? "bg-primary-start/10 text-primary-start"
                      : "text-neutral-900 hover:text-primary-start"
                      }`}
                  >
                    <span className="text-sm lg:text-base font-normal">
                      Company
                    </span>
                    <CaretDownIcon
                      size={16}
                      className={`transition-transform ${companyOpen ? "rotate-180 text-primary-start" : ""
                        }`}
                    />
                  </button>

                  {companyOpen && (
                    <div className="bg-neutral-25 px-4 pb-3 pt-2 flex flex-col gap-2 mx-4 my-2 rounded-lg">
                      <Link
                        to="/company/about"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setCompanyOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "About" }); }}
                      >
                        <span>About</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                      <Link
                        to="/company/careers"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setCompanyOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "Careers" }); }}
                      >
                        <span>Careers</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                      <Link
                        to="/company/partner"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setCompanyOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "Partners" }); }}
                      >
                        <span>Partners</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                      <Link
                        to="/company/events"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setCompanyOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "Events & News" }); }}
                      >
                        <span>Events & News</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                    </div>
                  )}
                </div>

                {/* Resources Section */}
                <div className="border-b border-neutral-50">
                  <button
                    type="button"
                    onClick={() => {
                      setResourcesOpen(!resourcesOpen);
                      setCompanyOpen(false);
                    }}
                    className={`m-2 px-4 py-3 flex items-center cursor-pointer transition-colors rounded-full gap-2 ${resourcesOpen
                      ? "bg-primary-start/10 text-primary-start"
                      : "text-neutral-900 hover:text-primary-start"
                      }`}
                  >
                    <span className="text-sm lg:text-base font-normal">
                      Resources
                    </span>
                    <CaretDownIcon
                      size={16}
                      className={`transition-transform ${resourcesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {resourcesOpen && (
                    <div className="bg-neutral-25 px-4 pb-3 pt-2 flex flex-col gap-2 mx-4 my-2 rounded-lg">
                      <Link
                        to="/resources/technical"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setResourcesOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "Technical Documentation" }); }}
                      >
                        <span>Technical Documentation</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                      <Link
                        to="/resources/deployment-options"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setResourcesOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "Deployment Options" }); }}
                      >
                        <span>Deployment Options</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                      <Link
                        to="/resources/security-compliance"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setResourcesOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "Security & Compliance" }); }}
                      >
                        <span>Security & Compliance</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                      <Link
                        to="/resources/faq"
                        className="cursor-pointer group flex gap-2 items-center text-sm lg:text-base text-neutral-900 hover:text-primary-start transition-colors py-2"
                        onClick={() => { setResourcesOpen(false); setMenuOpen(false); pushEvent({ event: "nav_click", link_name: "FAQ" }); }}
                      >
                        <span>FAQ</span>
                        <CaretRightIcon
                          size={16}
                          className="text-neutral-400 group-hover:text-primary-start"
                        />
                      </Link>
                    </div>
                  )}
                </div>

                <div className="flex justify-between">
                  {/* Request a demo button */}
                  <div className="p-4">
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={handleDemoClick}
                      className="w-full justify-center"
                    >
                      Request a demo
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default MiniNavbar;
