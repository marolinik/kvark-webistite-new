import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import AppLayout from "@/layout/AppLayout";
import FAQ from "@/pages/resources/FAQ";
import Technical from "@/pages/resources/Technical";
import About from "@/pages/company/About";
import Careers from "@/pages/company/Careers";
import CareersDetails from "@/pages/company/CareersDetails";
import Events from "@/pages/company/Events";
import EventsDetails from "@/pages/company/EventsDetails";
import SecurityCompliance from "@/pages/resources/SecurityCompliance";
import Partner from "@/pages/company/Partner";
import DeploymentOptions from "@/pages/resources/DeploymentOptions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import NotFound from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "resources/faq", element: <FAQ /> },
      { path: "resources/technical", element: <Technical /> },
      { path: "company/about", element: <About /> },
      { path: "company/careers", element: <Careers /> },
      { path: "company/careers/apply", element: <CareersDetails /> },
      { path: "company/events", element: <Events /> },
      { path: "company/events/:slug", element: <EventsDetails /> },
      { path: "company/partner", element: <Partner /> },
      { path: "resources/deployment-options", element: <DeploymentOptions /> },
      { path: "resources/security-compliance", element: <SecurityCompliance /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-of-service", element: <TermsOfService /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
