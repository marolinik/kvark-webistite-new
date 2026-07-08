import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import AppLayout from "@/layout/AppLayout";

const FAQ = lazy(() => import("@/pages/resources/FAQ"));
const Technical = lazy(() => import("@/pages/resources/Technical"));
const About = lazy(() => import("@/pages/company/About"));
const Careers = lazy(() => import("@/pages/company/Careers"));
const CareersDetails = lazy(() => import("@/pages/company/CareersDetails"));
const Events = lazy(() => import("@/pages/company/Events"));
const EventsDetails = lazy(() => import("@/pages/company/EventsDetails"));
const SecurityCompliance = lazy(
  () => import("@/pages/resources/SecurityCompliance")
);
const Partner = lazy(() => import("@/pages/company/Partner"));
const DeploymentOptions = lazy(
  () => import("@/pages/resources/DeploymentOptions")
);
const Insights = lazy(() => import("@/pages/resources/Insights"));
const InsightArticle = lazy(() => import("@/pages/resources/InsightArticle"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const routeFallback = (
  <div
    role="status"
    aria-label="Loading page"
    className="min-h-[60vh] w-full"
  />
);

function lazyRoute(element: ReactNode) {
  return <Suspense fallback={routeFallback}>{element}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "resources/faq", element: lazyRoute(<FAQ />) },
      { path: "resources/technical", element: lazyRoute(<Technical />) },
      { path: "company/about", element: lazyRoute(<About />) },
      { path: "company/careers", element: lazyRoute(<Careers />) },
      {
        path: "company/careers/apply",
        element: lazyRoute(<CareersDetails />),
      },
      { path: "company/events", element: lazyRoute(<Events />) },
      { path: "company/events/:slug", element: lazyRoute(<EventsDetails />) },
      { path: "company/partner", element: lazyRoute(<Partner />) },
      {
        path: "resources/deployment-options",
        element: lazyRoute(<DeploymentOptions />),
      },
      { path: "resources/insights", element: lazyRoute(<Insights />) },
      {
        path: "resources/insights/:slug",
        element: lazyRoute(<InsightArticle />),
      },
      {
        path: "resources/security-compliance",
        element: lazyRoute(<SecurityCompliance />),
      },
      { path: "privacy-policy", element: lazyRoute(<PrivacyPolicy />) },
      { path: "terms-of-service", element: lazyRoute(<TermsOfService />) },
      { path: "*", element: lazyRoute(<NotFound />) },
    ],
  },
]);
