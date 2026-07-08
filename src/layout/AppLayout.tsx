import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/layout/Navbar";
import Footer from "@/layout/Footer";
import MiniNavbar from "@/layout/MiniNavbar";
import heroBackgroundTop from "@/assets/backgrounds/hero-background-top.png";
import SeoManager from "@/components/SeoManager";
import ConsentBanner from "@/components/ConsentBanner";

function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    const state = location.state as { scrollToFeature?: boolean } | null;
    if (!state?.scrollToFeature) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.state]);

  return (
    <div className="relative">
      <SeoManager />
      {/* Top center background image */}
      <div className="absolute w-full top-0 left-1/2 -translate-x-1/2 pointer-events-none">
        <img
          src={heroBackgroundTop}
          alt="glowing light at top"
          width={1320}
          height={482}
          className="w-full h-full object-contain"
        />
      </div>
      <Navbar />
      <MiniNavbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ConsentBanner />
    </div>
  );
}

export default AppLayout;
