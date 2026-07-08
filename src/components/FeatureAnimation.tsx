import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useRef, useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { animationState } from "@/utils/animationState";
import { pushEvent } from "@/utils/gtm";

import miniSeperator from "@/assets/mini-separator.svg";
import aiAssistant from "@/assets/icons/ai-assistant.svg";
import semanticSearching from "@/assets/icons/semantic-searching.svg";
import documentDrafting from "@/assets/icons/document-drafting.svg";
import limitlessContext from "@/assets/icons/limitless-context.svg";
import enterpriseAgents from "@/assets/icons/enterprise-agents.svg";
import serviceExternalization from "@/assets/icons/service-externalization.svg";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MotionPathPlugin);
}

const FeatureAnimation = ({ className }: { className?: string }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const confluencePathRef = useRef<SVGPathElement>(null);
  const salesforcePathRef = useRef<SVGPathElement>(null);
  const sharepointPathRef = useRef<SVGPathElement>(null);
  const notionPathRef = useRef<SVGPathElement>(null);
  const jiraPathRef = useRef<SVGPathElement>(null);
  const servicenowPathRef = useRef<SVGPathElement>(null);
  const sapPathRef = useRef<SVGPathElement>(null);
  const outlookPathRef = useRef<SVGPathElement>(null);
  const googlePathRef = useRef<SVGPathElement>(null);
  const otherPathRef = useRef<SVGPathElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (window.innerWidth < 1024) return;
    if (!svgRef.current) return;

    let hasPlayed = false;
    let isAnimationActive = false;
    let lockedScrollY: number | null = null;
    let tl: gsap.core.Timeline;

    const preventWheel = (e: WheelEvent) => e.preventDefault();
    const preventTouchMove = (e: TouchEvent) => e.preventDefault();
    const preventKeyScroll = (e: KeyboardEvent) => {
      if (
        [
          "ArrowUp",
          "ArrowDown",
          "Space",
          "PageUp",
          "PageDown",
          "Home",
          "End",
        ].includes(e.code)
      ) {
        e.preventDefault();
      }
    };
    const snapScrollBack = () => {
      if (
        lockedScrollY !== null &&
        Math.abs(window.scrollY - lockedScrollY) > 1
      ) {
        window.scrollTo(0, lockedScrollY);
      }
    };

    const disableUserScroll = () => {
      document.documentElement.style.scrollBehavior = "auto";
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("wheel", preventWheel, { passive: false });
      window.addEventListener("touchmove", preventTouchMove, {
        passive: false,
      });
      window.addEventListener("keydown", preventKeyScroll);
    };

    const lockScrollPosition = () => {
      lockedScrollY = window.scrollY;
      window.addEventListener("scroll", snapScrollBack);
    };

    const unlockScroll = () => {
      lockedScrollY = null;
      isAnimationActive = false;
      document.documentElement.style.scrollBehavior = "";
      document.documentElement.style.overflow = "";
      window.removeEventListener("wheel", preventWheel);
      window.removeEventListener("touchmove", preventTouchMove);
      window.removeEventListener("keydown", preventKeyScroll);
      window.removeEventListener("scroll", snapScrollBack);
    };

    const finishAnimation = () => {
      if (tl) tl.progress(1).pause();
      setActiveIndex(0);
      unlockScroll();
    };

    const handleSkipEvent = () => {
      if (isAnimationActive) finishAnimation();
    };

    window.addEventListener("skipFeatureAnimation", handleSkipEvent);

    const animateScrollTo = (
      targetY: number,
      durationMs: number,
      onComplete: () => void
    ) => {
      const startY = window.scrollY;
      const diff = targetY - startY;
      if (Math.abs(diff) < 2) {
        onComplete();
        return;
      }
      const startTime = performance.now();
      const step = (time: number) => {
        if (!isAnimationActive) return;
        const elapsed = time - startTime;
        const t = Math.min(elapsed / durationMs, 1);
        const ease =
          t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        window.scrollTo(0, startY + diff * ease);
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          onComplete();
        }
      };
      requestAnimationFrame(step);
    };

    const ctx = gsap.context(() => {
      const path = pathRef.current!;
      const pathLength = path.getTotalLength();

      const confluencePath = confluencePathRef.current!;
      const confluencePathLength = confluencePath.getTotalLength();

      const salesforcePath = salesforcePathRef.current!;
      const salesforcePathLength = salesforcePath.getTotalLength();

      const sharepointPath = sharepointPathRef.current!;
      const sharepointPathLength = sharepointPath.getTotalLength();

      const notionPath = notionPathRef.current!;
      const notionPathLength = notionPath.getTotalLength();

      const jiraPath = jiraPathRef.current!;
      const jiraPathLength = jiraPath.getTotalLength();

      const servicenowPath = servicenowPathRef.current!;
      const servicenowPathLength = servicenowPath.getTotalLength();

      const sapPath = sapPathRef.current!;
      const sapPathLength = sapPath.getTotalLength();

      const outlookPath = outlookPathRef.current!;
      const outlookPathLength = outlookPath.getTotalLength();

      const googlePath = googlePathRef.current!;
      const googlePathLength = googlePath.getTotalLength();

      const otherPath = otherPathRef.current!;
      const otherPathLength = otherPath.getTotalLength();

      tl = gsap.timeline({ paused: true });

      // Set initial states - Slack
      gsap.set("#slack-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        ["#slack-circle", "#slack-circle-inner", "#slack-circle-stroke"],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: -pathLength,
      });
      gsap.set("#slack-travel-path-glow", { opacity: 0 });

      // Set initial states - Confluence
      gsap.set("#confluence-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        [
          "#confluence-circle",
          "#confluence-circle-inner",
          "#confluence-circle-stroke",
        ],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(confluencePath, {
        strokeDasharray: confluencePathLength,
        strokeDashoffset: -confluencePathLength,
      });
      gsap.set("#confluence-travel-path-glow", { opacity: 0 });

      // Set initial states - Salesforce
      gsap.set("#salesforce-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        [
          "#salesforce-circle",
          "#salesforce-circle-inner",
          "#salesforce-circle-stroke",
        ],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(salesforcePath, {
        strokeDasharray: salesforcePathLength,
        strokeDashoffset: -salesforcePathLength,
      });
      gsap.set("#salesforce-travel-path-glow", { opacity: 0 });

      // Set initial states - SharePoint
      gsap.set("#sharepoint-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        [
          "#sharepoint-circle",
          "#sharepoint-circle-inner",
          "#sharepoint-circle-stroke",
        ],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(sharepointPath, {
        strokeDasharray: sharepointPathLength,
        strokeDashoffset: -sharepointPathLength,
      });
      gsap.set("#sharepoint-travel-path-glow", { opacity: 0 });

      // Set initial states - Notion
      gsap.set("#notion-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        ["#notion-circle", "#notion-circle-inner", "#notion-circle-stroke"],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(notionPath, {
        strokeDasharray: notionPathLength,
        strokeDashoffset: -notionPathLength,
      });
      gsap.set("#notion-travel-path-glow", { opacity: 0 });

      // Set initial states - Jira
      gsap.set("#jira-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        ["#jira-circle", "#jira-circle-inner", "#jira-circle-stroke"],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(jiraPath, {
        strokeDasharray: jiraPathLength,
        strokeDashoffset: -jiraPathLength,
      });
      gsap.set("#jira-travel-path-glow", { opacity: 0 });

      // Set initial states - ServiceNow
      gsap.set("#servicenow-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        [
          "#servicenow-circle",
          "#servicenow-circle-inner",
          "#servicenow-circle-stroke",
        ],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(servicenowPath, {
        strokeDasharray: servicenowPathLength,
        strokeDashoffset: -servicenowPathLength,
      });
      gsap.set("#servicenow-travel-path-glow", { opacity: 0 });

      // Set initial states - SAP
      gsap.set("#sap-item", { scale: 0, transformOrigin: "center" });
      gsap.set(["#sap-circle", "#sap-circle-inner", "#sap-circle-stroke"], {
        scale: 0,
        transformOrigin: "center",
      });
      gsap.set(sapPath, {
        strokeDasharray: sapPathLength,
        strokeDashoffset: -sapPathLength,
      });
      gsap.set("#sap-travel-path-glow", { opacity: 0 });

      // Set initial states - Outlook
      gsap.set("#outlook-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        [
          "#outlook-circle",
          "#outlook-circle-inner",
          "#outlook-circle-stroke",
        ],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(outlookPath, {
        strokeDasharray: outlookPathLength,
        strokeDashoffset: -outlookPathLength,
      });
      gsap.set("#outlook-travel-path-glow", { opacity: 0 });

      // Set initial states - Google Drive
      gsap.set("#google-drive-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        ["#google-circle", "#google-circle-inner", "#google-circle-stroke"],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(googlePath, {
        strokeDasharray: googlePathLength,
        strokeDashoffset: -googlePathLength,
      });
      gsap.set("#google-travel-path-glow", { opacity: 0 });

      // Set deployment path and deployment item to invisible initially
      gsap.set("#deployment", {
        opacity: 0,
        y: 50,
        x: -250,
        pointerEvents: "none",
      });
      gsap.set("#deployment-path", { opacity: 0, y: 50, x: -250 });

      // Set LLM items to invisible initially (above their final position)
      gsap.set("#llm-items", { opacity: 0, y: -50, x: -250 });

      // Set Kvark extending paths and circles invisible initially
      const kvarkPaths = [
        "#path-kvark-1",
        "#path-kvark-2",
        "#path-kvark-3",
        "#path-kvark-4",
        "#path-kvark-5",
        "#path-kvark-6",
      ];
      const kvarkCircles = [
        "#circle-kvark-1",
        "#circle-kvark-2",
        "#circle-kvark-3",
        "#circle-kvark-4",
        "#circle-kvark-5",
        "#circle-kvark-6",
      ];

      // Position the extending paths group using a native SVG transform attribute
      // so that foreignObject children correctly inherit the offset in Safari
      // (CSS transforms on <g> do not propagate to <foreignObject> in Safari)
      const extPathsEl = svgRef.current!.querySelector(
        "#kvark-extending-paths"
      ) as SVGGElement;
      extPathsEl.setAttribute("transform", "translate(-250, 0)");
      const extPathsProxy = { tx: -250 };

      // Hide circles initially
      gsap.set(kvarkCircles, {
        scale: 0,
        transformOrigin: "center",
      });

      // Target inner divs for scale/opacity so Safari foreignObject CSS-transform
      // bugs don't affect the entrance animation
      const kvarkDivInners = [
        "#kvark-div-inner-1",
        "#kvark-div-inner-2",
        "#kvark-div-inner-3",
        "#kvark-div-inner-4",
        "#kvark-div-inner-5",
        "#kvark-div-inner-6",
      ];
      gsap.set(kvarkDivInners, {
        opacity: 0,
        scale: 0,
        transformOrigin: "left center",
      });

      // Right content divs will be initialized in useEffect

      // Set up path drawing for each kvark path
      kvarkPaths.forEach((pathId) => {
        const pathElement = document.querySelector(pathId) as SVGPathElement;
        if (pathElement) {
          const pathLength = pathElement.getTotalLength();
          gsap.set(pathElement, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });
        }
      });

      // Set initial states - Other connectors
      gsap.set("#other-item", { scale: 0, transformOrigin: "center" });
      gsap.set(
        ["#other-circle", "#other-circle-inner", "#other-circle-stroke"],
        {
          scale: 0,
          transformOrigin: "center",
        }
      );
      gsap.set(otherPath, {
        strokeDasharray: otherPathLength,
        strokeDashoffset: -otherPathLength,
      });
      gsap.set("#other-travel-path-glow", { opacity: 0 });

      // SLACK - starts at 0.2s
      const slackStart = 0.2;
      tl.to(
        "#slack-item",
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        slackStart
      ).to(
        ["#slack-circle", "#slack-circle-inner", "#slack-circle-stroke"],
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        slackStart
      );

      tl.to(
        path,
        {
          strokeDashoffset: 0,
          duration: 1.05,
          ease: "power2.inOut",
        },
        slackStart + 0.42
      );

      tl.to(
        ["#slack-circle", "#slack-circle-inner", "#slack-circle-stroke"],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#slack-travel-path",
            align: "#slack-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        slackStart + 1.47
      );

      tl.to(
        "#slack-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        slackStart + 1.47
      );

      tl.fromTo(
        "#paint16_glow_12001_294",
        {
          attr: { x1: 308, x2: 408, y1: 58, y2: 58 },
        },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        slackStart + 1.47
      );

      tl.to(
        "#slack-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        slackStart + 2.87
      );
      tl.to(
        ["#slack-circle", "#slack-circle-inner", "#slack-circle-stroke"],
        { opacity: 0, duration: 0.21 },
        slackStart + 2.87
      );

      // CONFLUENCE - starts at 0s
      const confluenceStart = 0;
      tl.to(
        "#confluence-item",
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        confluenceStart
      ).to(
        [
          "#confluence-circle",
          "#confluence-circle-inner",
          "#confluence-circle-stroke",
        ],
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        confluenceStart
      );

      tl.to(
        confluencePath,
        {
          strokeDashoffset: 0,
          duration: 1.05,
          ease: "power2.inOut",
        },
        confluenceStart + 0.42
      );

      tl.to(
        [
          "#confluence-circle",
          "#confluence-circle-inner",
          "#confluence-circle-stroke",
        ],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#confluence-travel-path",
            align: "#confluence-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        confluenceStart + 1.47
      );

      tl.to(
        "#confluence-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        confluenceStart + 1.47
      );

      tl.fromTo(
        "#paint2_glow_12001_294",
        {
          attr: { x1: 78, x2: 178, y1: 396, y2: 396 },
        },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        confluenceStart + 1.47
      );

      tl.to(
        "#confluence-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        confluenceStart + 2.87
      );
      tl.to(
        [
          "#confluence-circle",
          "#confluence-circle-inner",
          "#confluence-circle-stroke",
        ],
        { opacity: 0, duration: 0.21 },
        confluenceStart + 2.87
      );

      // SALESFORCE - starts at 0.4s
      const salesforceStart = 0.4;
      tl.to(
        "#salesforce-item",
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        salesforceStart
      ).to(
        [
          "#salesforce-circle",
          "#salesforce-circle-inner",
          "#salesforce-circle-stroke",
        ],
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        salesforceStart
      );

      tl.to(
        salesforcePath,
        {
          strokeDashoffset: 0,
          duration: 1.05,
          ease: "power2.inOut",
        },
        salesforceStart + 0.42
      );

      tl.to(
        [
          "#salesforce-circle",
          "#salesforce-circle-inner",
          "#salesforce-circle-stroke",
        ],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#salesforce-travel-path",
            align: "#salesforce-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        salesforceStart + 1.47
      );

      tl.to(
        "#salesforce-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        salesforceStart + 1.47
      );

      tl.fromTo(
        "#paint3_glow_12001_294",
        {
          attr: { x1: 131, x2: 231, y1: 321, y2: 321 },
        },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        salesforceStart + 1.47
      );

      tl.to(
        "#salesforce-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        salesforceStart + 2.87
      );
      tl.to(
        [
          "#salesforce-circle",
          "#salesforce-circle-inner",
          "#salesforce-circle-stroke",
        ],
        { opacity: 0, duration: 0.21 },
        salesforceStart + 2.87
      );

      // SHAREPOINT - starts at 0.15s
      const sharepointStart = 0.15;
      tl.to(
        "#sharepoint-item",
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        sharepointStart
      ).to(
        [
          "#sharepoint-circle",
          "#sharepoint-circle-inner",
          "#sharepoint-circle-stroke",
        ],
        {
          scale: 1,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        sharepointStart
      );

      tl.to(
        sharepointPath,
        {
          strokeDashoffset: 0,
          duration: 1.05,
          ease: "power2.inOut",
        },
        sharepointStart + 0.42
      );

      tl.to(
        [
          "#sharepoint-circle",
          "#sharepoint-circle-inner",
          "#sharepoint-circle-stroke",
        ],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#sharepoint-travel-path",
            align: "#sharepoint-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        sharepointStart + 1.47
      );

      tl.to(
        "#sharepoint-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        sharepointStart + 1.47
      );

      tl.fromTo(
        "#paint5_glow_12001_294",
        {
          attr: { x1: 347, x2: 447, y1: 346, y2: 346 },
        },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        sharepointStart + 1.47
      );

      tl.to(
        "#sharepoint-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        sharepointStart + 2.87
      );
      tl.to(
        [
          "#sharepoint-circle",
          "#sharepoint-circle-inner",
          "#sharepoint-circle-stroke",
        ],
        { opacity: 0, duration: 0.21 },
        sharepointStart + 2.87
      );

      // NOTION - starts at 0.3s
      const notionStart = 0.3;
      tl.to(
        "#notion-item",
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        notionStart
      ).to(
        ["#notion-circle", "#notion-circle-inner", "#notion-circle-stroke"],
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        notionStart
      );
      tl.to(
        notionPath,
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        notionStart + 0.42
      );
      tl.to(
        ["#notion-circle", "#notion-circle-inner", "#notion-circle-stroke"],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#notion-travel-path",
            align: "#notion-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        notionStart + 1.47
      );
      tl.to(
        "#notion-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        notionStart + 1.47
      );
      tl.fromTo(
        "#paint6_glow_12001_294",
        { attr: { x1: 278, x2: 378, y1: 274, y2: 274 } },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        notionStart + 1.47
      );
      tl.to(
        "#notion-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        notionStart + 2.87
      );
      tl.to(
        ["#notion-circle", "#notion-circle-inner", "#notion-circle-stroke"],
        { opacity: 0, duration: 0.21 },
        notionStart + 2.87
      );

      // JIRA - starts at 0.1s
      const jiraStart = 0.1;
      tl.to(
        "#jira-item",
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        jiraStart
      ).to(
        ["#jira-circle", "#jira-circle-inner", "#jira-circle-stroke"],
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        jiraStart
      );
      tl.to(
        jiraPath,
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        jiraStart + 0.42
      );
      tl.to(
        ["#jira-circle", "#jira-circle-inner", "#jira-circle-stroke"],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#jira-travel-path",
            align: "#jira-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        jiraStart + 1.47
      );
      tl.to(
        "#jira-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        jiraStart + 1.47
      );
      tl.fromTo(
        "#paint9_glow_12001_294",
        { attr: { x1: 420, x2: 520, y1: 279, y2: 279 } },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        jiraStart + 1.47
      );
      tl.to(
        "#jira-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        jiraStart + 2.87
      );
      tl.to(
        ["#jira-circle", "#jira-circle-inner", "#jira-circle-stroke"],
        { opacity: 0, duration: 0.21 },
        jiraStart + 2.87
      );

      // SERVICENOW - starts at 0.35s
      const servicenowStart = 0.35;
      tl.to(
        "#servicenow-item",
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        servicenowStart
      ).to(
        [
          "#servicenow-circle",
          "#servicenow-circle-inner",
          "#servicenow-circle-stroke",
        ],
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        servicenowStart
      );
      tl.to(
        servicenowPath,
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        servicenowStart + 0.42
      );
      tl.to(
        [
          "#servicenow-circle",
          "#servicenow-circle-inner",
          "#servicenow-circle-stroke",
        ],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#servicenow-travel-path",
            align: "#servicenow-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        servicenowStart + 1.47
      );
      tl.to(
        "#servicenow-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        servicenowStart + 1.47
      );
      tl.fromTo(
        "#paint10_glow_12001_294",
        { attr: { x1: 158, x2: 258, y1: 214, y2: 214 } },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        servicenowStart + 1.47
      );
      tl.to(
        "#servicenow-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        servicenowStart + 2.87
      );
      tl.to(
        [
          "#servicenow-circle",
          "#servicenow-circle-inner",
          "#servicenow-circle-stroke",
        ],
        { opacity: 0, duration: 0.21 },
        servicenowStart + 2.87
      );

      // SAP - starts at 0.25s
      const sapStart = 0.25;
      tl.to(
        "#sap-item",
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        sapStart
      ).to(
        ["#sap-circle", "#sap-circle-inner", "#sap-circle-stroke"],
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        sapStart
      );
      tl.to(
        sapPath,
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        sapStart + 0.42
      );
      tl.to(
        ["#sap-circle", "#sap-circle-inner", "#sap-circle-stroke"],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#sap-travel-path",
            align: "#sap-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        sapStart + 1.47
      );
      tl.to(
        "#sap-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        sapStart + 1.47
      );
      tl.fromTo(
        "#paint_sap_glow_12001_294",
        { attr: { x1: 345, x2: 445, y1: 202, y2: 202 } },
        {
          attr: { x1: 682, x2: 782, y1: 233, y2: 233 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        sapStart + 1.47
      );
      tl.to(
        "#sap-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        sapStart + 2.87
      );
      tl.to(
        ["#sap-circle", "#sap-circle-inner", "#sap-circle-stroke"],
        { opacity: 0, duration: 0.21 },
        sapStart + 2.87
      );

      // OUTLOOK - starts at 0.05s
      const outlookStart = 0.05;
      tl.to(
        "#outlook-item",
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        outlookStart
      ).to(
        [
          "#outlook-circle",
          "#outlook-circle-inner",
          "#outlook-circle-stroke",
        ],
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        outlookStart
      );
      tl.to(
        outlookPath,
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        outlookStart + 0.42
      );
      tl.to(
        [
          "#outlook-circle",
          "#outlook-circle-inner",
          "#outlook-circle-stroke",
        ],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#outlook-travel-path",
            align: "#outlook-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        outlookStart + 1.47
      );
      tl.to(
        "#outlook-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        outlookStart + 1.47
      );
      tl.fromTo(
        "#paint14_glow_12001_294",
        { attr: { x1: 270, x2: 370, y1: 130, y2: 130 } },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        outlookStart + 1.47
      );
      tl.to(
        "#outlook-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        outlookStart + 2.87
      );
      tl.to(
        [
          "#outlook-circle",
          "#outlook-circle-inner",
          "#outlook-circle-stroke",
        ],
        { opacity: 0, duration: 0.21 },
        outlookStart + 2.87
      );

      // GOOGLE DRIVE - starts at 0.45s
      const googleStart = 0.45;
      tl.to(
        "#google-drive-item",
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        googleStart
      ).to(
        ["#google-circle", "#google-circle-inner", "#google-circle-stroke"],
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        googleStart
      );
      tl.to(
        googlePath,
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        googleStart + 0.42
      );
      tl.to(
        ["#google-circle", "#google-circle-inner", "#google-circle-stroke"],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#google-travel-path",
            align: "#google-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        googleStart + 1.47
      );
      tl.to(
        "#google-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        googleStart + 1.47
      );
      tl.fromTo(
        "#paint15_glow_12001_294",
        { attr: { x1: 144, x2: 244, y1: 74, y2: 74 } },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        googleStart + 1.47
      );
      tl.to(
        "#google-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        googleStart + 2.87
      );
      tl.to(
        ["#google-circle", "#google-circle-inner", "#google-circle-stroke"],
        { opacity: 0, duration: 0.21 },
        googleStart + 2.87
      );

      // OTHER - starts at 0.12s, circle starts from 376, 418
      const otherStart = 0.12;
      tl.to(
        "#other-item",
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        otherStart
      ).to(
        ["#other-circle", "#other-circle-inner", "#other-circle-stroke"],
        { scale: 1, duration: 0.42, ease: "back.out(1.7)" },
        otherStart
      );
      tl.to(
        otherPath,
        { strokeDashoffset: 0, duration: 1.05, ease: "power2.inOut" },
        otherStart + 0.42
      );
      tl.to(
        ["#other-circle", "#other-circle-inner", "#other-circle-stroke"],
        {
          duration: 1.4,
          ease: "power2.inOut",
          motionPath: {
            path: "#other-travel-path",
            align: "#other-travel-path",
            alignOrigin: [0.5, 0.5],
            start: 1,
            end: 0,
          },
        },
        otherStart + 1.47
      );
      tl.to(
        "#other-travel-path-glow",
        { opacity: 1, duration: 0.21, ease: "power2.in" },
        otherStart + 1.47
      );
      tl.fromTo(
        "#paint17_glow_12001_294",
        { attr: { x1: 327, x2: 427, y1: 418, y2: 418 } },
        {
          attr: { x1: 682, x2: 782, y1: 237, y2: 237 },
          duration: 1.4,
          ease: "power2.inOut",
        },
        otherStart + 1.47
      );
      tl.to(
        "#other-travel-path-glow",
        { opacity: 0, duration: 0.21 },
        otherStart + 2.87
      );
      tl.to(
        ["#other-circle", "#other-circle-inner", "#other-circle-stroke"],
        { opacity: 0, duration: 0.21 },
        otherStart + 2.87
      );

      // PART 2: Scale down all connectors and move left after animations finish
      // Wait for all animations to complete (latest finishes around 4.85s)
      tl.to(
        "#connectors",
        {
          scale: 0.45,
          x: -200,
          duration: 0.56,
          ease: "power2.inOut",
          transformOrigin: "center",
        },
        3.5
      );

      // Move Kvark left at the same time
      tl.to(
        "#kvark",
        {
          x: -400,
          duration: 0.56,
          ease: "power2.inOut",
        },
        3.5
      );

      // Move deployment and deployment-path left at the same time
      tl.to(
        ["#deployment", "#deployment-path"],
        {
          x: -400,
          duration: 0.56,
          ease: "power2.inOut",
        },
        3.5
      );

      // Move LLM items left at the same time
      tl.to(
        "#llm-items",
        {
          x: -400,
          duration: 0.56,
          ease: "power2.inOut",
        },
        3.5
      );

      // Animate the extending-paths group using the SVG transform attribute
      // so the <foreignObject> children move correctly in Safari
      tl.to(
        extPathsProxy,
        {
          tx: -400,
          duration: 0.56,
          ease: "power2.inOut",
          onUpdate: () =>
            extPathsEl.setAttribute(
              "transform",
              `translate(${extPathsProxy.tx}, 0)`
            ),
        },
        3.5
      );

      // PART 3: Deployment comes out of Kvark from bottom to top
      tl.to(
        ["#deployment", "#deployment-path"],
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        4.2
      ).to(
        "#deployment",
        { pointerEvents: "auto", duration: 0 },
        4.2
      );

      // LLM items come out of Kvark from top to bottom (at same time)
      tl.to(
        "#llm-items",
        {
          opacity: 1,
          y: 0,
          duration: 0.42,
          ease: "back.out(1.7)",
        },
        4.2
      );

      // PART 4: Animate Kvark extending paths (at the very end)
      kvarkPaths.forEach((pathId, index) => {
        const pathElement = document.querySelector(pathId) as SVGPathElement;
        const circleId = kvarkCircles[index];
        const innerDivId = kvarkDivInners[index];
        const staggerDelay = index * 0.08;

        if (pathElement) {
          tl.to(
            pathElement,
            {
              strokeDashoffset: 0,
              duration: 0.7, // Reduced from 1.05 for faster animation
              ease: "power2.inOut",
            },
            5.25 + staggerDelay
          );

          tl.to(
            circleId,
            {
              scale: 1,
              duration: 0.2, // Reduced from 0.28 for faster animation
              ease: "back.out(1.7)",
            },
            5.25 + staggerDelay + 0.7 // Updated to match new path duration
          );

          // (targeting the HTML div, not the foreignObject, for Safari compat)
          tl.to(
            innerDivId,
            {
              opacity: 1,
              scale: 1,
              duration: 0.25, // Reduced from 0.35 for faster animation
              ease: "back.out(1.7)",
            },
            5.25 + staggerDelay + 0.7 + 0.2 // Updated to match new timings
          );
        }
      });

      tl.call(() => setActiveIndex(0), [], 6.8);

      tl.eventCallback("onComplete", () => {
        unlockScroll();
      });

      tl.timeScale(1.3);
    }, svgRef.current);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !hasPlayed) {
            hasPlayed = true;

            // Cross-page skip: animation should be skipped (e.g. navigating to demo from another page)
            if (animationState.skipFeatureAnimation) {
              animationState.skipFeatureAnimation = false;
              tl.progress(1).pause();
              setActiveIndex(0);
              return;
            }

            isAnimationActive = true;
            const section = document.getElementById("features");
            if (!section) return;

            const sectionTop =
              section.getBoundingClientRect().top + window.scrollY;
            const alreadyAligned =
              Math.abs(window.scrollY - sectionTop) < 2;

            const beginPlayback = () => {
              if (!isAnimationActive) return;
              lockScrollPosition();
              tl.play(0);
            };

            disableUserScroll();

            if (alreadyAligned) {
              beginPlayback();
            } else {
              animateScrollTo(sectionTop, 500, () => {
                if (!isAnimationActive) return;
                beginPlayback();
              });
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(svgRef.current);

    return () => {
      observer.disconnect();
      window.removeEventListener("skipFeatureAnimation", handleSkipEvent);
      unlockScroll();
      ctx.revert();
    };
  }, []);

  // Initialize right content divs to be hidden immediately on mount
  useEffect(() => {
    const rightContentInnerDivs = [
      "#right-content-inner-1",
      "#right-content-inner-2",
      "#right-content-inner-3",
      "#right-content-inner-4",
      "#right-content-inner-5",
      "#right-content-inner-6",
    ];

    rightContentInnerDivs.forEach((divId) => {
      const div = document.querySelector(divId) as HTMLDivElement;
      if (div) {
        gsap.set(div, {
          opacity: 0,
          scale: 0.8,
          x: 50,
          transformOrigin: "left center",
        });
      }
    });
  }, []); // Run once on mount

  // Update circle colors when activeIndex changes
  useEffect(() => {
    const circles = [
      "#circle-kvark-1",
      "#circle-kvark-2",
      "#circle-kvark-3",
      "#circle-kvark-4",
      "#circle-kvark-5",
      "#circle-kvark-6",
    ];

    circles.forEach((circleId, index) => {
      const circle = document.querySelector(circleId) as SVGCircleElement;
      if (circle) {
        if (activeIndex === index) {
          gsap.to(circle, {
            fill: "#0526AA",
            stroke: "#0526AA",
            duration: 0.14,
          });
        } else {
          gsap.to(circle, {
            fill: "white",
            stroke: "#CBD5E1",
            duration: 0.14,
          });
        }
      }
    });
  }, [activeIndex]);

  // Animate right side content divs when activeIndex changes
  useEffect(() => {
    const rightContentInnerDivs = [
      "#right-content-inner-1",
      "#right-content-inner-2",
      "#right-content-inner-3",
      "#right-content-inner-4",
      "#right-content-inner-5",
      "#right-content-inner-6",
    ];

    // Small delay to ensure elements are in DOM, then animate
    const timeoutId = setTimeout(() => {
      rightContentInnerDivs.forEach((divId, index) => {
        const div = document.querySelector(divId) as HTMLDivElement;
        if (div) {
          if (activeIndex === index) {
            gsap.to(div, {
              opacity: 1,
              scale: 1,
              x: 0,
              duration: 0.35,
              ease: "back.out(1.7)",
            });
          } else {
            gsap.to(div, {
              opacity: 0,
              scale: 0.8,
              x: 50,
              duration: 0.21,
              ease: "power2.in",
            });
          }
        }
      });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [activeIndex]);

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 1400 476"
      fill="none"
      className={`w-full ${className}`}
    >
      <g id="connectors">
        {/* Confluence Traveling Path */}
        <path
          ref={confluencePathRef}
          id="confluence-travel-path"
          d="M732 237L727.283 237.672C677.088 244.829 631.234 270.073 598.343 308.661L586.18 322.93C546.661 369.293 488.803 396 427.883 396L128 396"
          stroke="url(#paint2_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Confluence travel path glow */}
        <path
          id="confluence-travel-path-glow"
          d="M732 237L727.283 237.672C677.088 244.829 631.234 270.073 598.343 308.661L586.18 322.93C546.661 369.293 488.803 396 427.883 396L128 396"
          stroke="url(#paint2_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Confluence Item */}
        <g id="confluence-item">
          <rect
            x="0.357143"
            y="376.357"
            width="127.143"
            height="39.2857"
            rx="19.6429"
            fill="#F8FAFC"
          />
          <rect
            x="0.357143"
            y="376.357"
            width="127.143"
            height="39.2857"
            rx="19.6429"
            stroke="#F1F5F9"
            strokeWidth="0.714286"
          />
          <path
            d="M17.9691 396.511C17.9691 395.734 18.1444 395.037 18.4949 394.42C18.8453 393.795 19.3215 393.308 19.9234 392.957C20.533 392.607 21.2072 392.431 21.9463 392.431C22.8149 392.431 23.573 392.641 24.2206 393.06C24.8682 393.479 25.3406 394.073 25.6377 394.843H24.392C24.171 394.363 23.851 393.993 23.432 393.734C23.0206 393.475 22.5253 393.346 21.9463 393.346C21.3901 393.346 20.891 393.475 20.4491 393.734C20.0072 393.993 19.6606 394.363 19.4091 394.843C19.1577 395.315 19.032 395.871 19.032 396.511C19.032 397.144 19.1577 397.7 19.4091 398.18C19.6606 398.652 20.0072 399.018 20.4491 399.277C20.891 399.536 21.3901 399.666 21.9463 399.666C22.5253 399.666 23.0206 399.54 23.432 399.289C23.851 399.03 24.171 398.66 24.392 398.18H25.6377C25.3406 398.942 24.8682 399.532 24.2206 399.951C23.573 400.363 22.8149 400.569 21.9463 400.569C21.2072 400.569 20.533 400.397 19.9234 400.054C19.3215 399.704 18.8453 399.22 18.4949 398.603C18.1444 397.986 17.9691 397.289 17.9691 396.511ZM29.9173 400.603C29.3306 400.603 28.7973 400.47 28.3173 400.203C27.8449 399.936 27.4716 399.559 27.1973 399.071C26.9306 398.576 26.7973 398.005 26.7973 397.357C26.7973 396.717 26.9344 396.153 27.2087 395.666C27.4906 395.17 27.8716 394.793 28.3516 394.534C28.8316 394.268 29.3687 394.134 29.963 394.134C30.5573 394.134 31.0944 394.268 31.5744 394.534C32.0544 394.793 32.4316 395.167 32.7058 395.654C32.9877 396.142 33.1287 396.71 33.1287 397.357C33.1287 398.005 32.9839 398.576 32.6944 399.071C32.4125 399.559 32.0277 399.936 31.5401 400.203C31.0525 400.47 30.5116 400.603 29.9173 400.603ZM29.9173 399.689C30.2906 399.689 30.6411 399.601 30.9687 399.426C31.2963 399.25 31.5592 398.988 31.7573 398.637C31.963 398.287 32.0658 397.86 32.0658 397.357C32.0658 396.854 31.9668 396.428 31.7687 396.077C31.5706 395.727 31.3116 395.468 30.9916 395.3C30.6716 395.125 30.3249 395.037 29.9516 395.037C29.5706 395.037 29.2201 395.125 28.9001 395.3C28.5877 395.468 28.3363 395.727 28.1458 396.077C27.9554 396.428 27.8601 396.854 27.8601 397.357C27.8601 397.868 27.9516 398.298 28.1344 398.649C28.3249 398.999 28.5763 399.262 28.8887 399.437C29.2011 399.605 29.5439 399.689 29.9173 399.689ZM37.5475 394.123C38.3094 394.123 38.9266 394.355 39.399 394.82C39.8713 395.277 40.1075 395.94 40.1075 396.809V400.5H39.079V396.957C39.079 396.332 38.9228 395.856 38.6104 395.529C38.298 395.193 37.8713 395.026 37.3304 395.026C36.7818 395.026 36.3437 395.197 36.0161 395.54C35.6961 395.883 35.5361 396.382 35.5361 397.037V400.5H34.4961V394.237H35.5361V395.129C35.7418 394.809 36.0199 394.561 36.3704 394.386C36.7285 394.21 37.1209 394.123 37.5475 394.123ZM44.3549 395.094H43.0407V400.5H42.0007V395.094H41.1892V394.237H42.0007V393.791C42.0007 393.09 42.1797 392.58 42.5378 392.26C42.9035 391.932 43.4864 391.769 44.2864 391.769V392.637C43.8292 392.637 43.5054 392.729 43.3149 392.911C43.1321 393.087 43.0407 393.38 43.0407 393.791V394.237H44.3549V395.094ZM46.6075 392.043V400.5H45.5675V392.043H46.6075ZM53.9343 394.237V400.5H52.8943V399.574C52.6962 399.894 52.4181 400.146 52.06 400.329C51.7096 400.504 51.321 400.591 50.8943 400.591C50.4067 400.591 49.9686 400.492 49.58 400.294C49.1915 400.089 48.8829 399.784 48.6543 399.38C48.4334 398.976 48.3229 398.485 48.3229 397.906V394.237H49.3515V397.769C49.3515 398.386 49.5077 398.862 49.82 399.197C50.1324 399.525 50.5591 399.689 51.1 399.689C51.6562 399.689 52.0943 399.517 52.4143 399.174C52.7343 398.831 52.8943 398.332 52.8943 397.677V394.237H53.9343ZM61.4046 397.129C61.4046 397.327 61.3932 397.536 61.3703 397.757H56.3646C56.4027 398.374 56.6122 398.858 56.9932 399.209C57.3817 399.551 57.8503 399.723 58.3989 399.723C58.8484 399.723 59.2217 399.62 59.5189 399.414C59.8236 399.201 60.037 398.919 60.1589 398.569H61.2789C61.1113 399.17 60.776 399.662 60.2732 400.043C59.7703 400.416 59.1455 400.603 58.3989 400.603C57.8046 400.603 57.2713 400.47 56.7989 400.203C56.3341 399.936 55.9684 399.559 55.7017 399.071C55.4351 398.576 55.3017 398.005 55.3017 397.357C55.3017 396.71 55.4313 396.142 55.6903 395.654C55.9494 395.167 56.3113 394.793 56.776 394.534C57.2484 394.268 57.7894 394.134 58.3989 394.134C58.9932 394.134 59.5189 394.264 59.976 394.523C60.4332 394.782 60.7836 395.14 61.0274 395.597C61.2789 396.047 61.4046 396.557 61.4046 397.129ZM60.3303 396.911C60.3303 396.515 60.2427 396.176 60.0674 395.894C59.8922 395.605 59.6522 395.388 59.3474 395.243C59.0503 395.09 58.7189 395.014 58.3532 395.014C57.8274 395.014 57.3779 395.182 57.0046 395.517C56.6389 395.852 56.4294 396.317 56.376 396.911H60.3303ZM65.8288 394.123C66.5907 394.123 67.2078 394.355 67.6802 394.82C68.1526 395.277 68.3888 395.94 68.3888 396.809V400.5H67.3602V396.957C67.3602 396.332 67.204 395.856 66.8916 395.529C66.5793 395.193 66.1526 395.026 65.6116 395.026C65.0631 395.026 64.625 395.197 64.2974 395.54C63.9774 395.883 63.8174 396.382 63.8174 397.037V400.5H62.7774V394.237H63.8174V395.129C64.0231 394.809 64.3012 394.561 64.6516 394.386C65.0097 394.21 65.4021 394.123 65.8288 394.123ZM69.6991 397.357C69.6991 396.71 69.8286 396.146 70.0876 395.666C70.3467 395.178 70.7048 394.801 71.1619 394.534C71.6267 394.268 72.1562 394.134 72.7505 394.134C73.52 394.134 74.1524 394.321 74.6476 394.694C75.1505 395.068 75.4819 395.586 75.6419 396.249H74.5219C74.4152 395.868 74.2057 395.567 73.8933 395.346C73.5886 395.125 73.2076 395.014 72.7505 395.014C72.1562 395.014 71.6762 395.22 71.3105 395.631C70.9448 396.035 70.7619 396.61 70.7619 397.357C70.7619 398.111 70.9448 398.694 71.3105 399.106C71.6762 399.517 72.1562 399.723 72.7505 399.723C73.2076 399.723 73.5886 399.616 73.8933 399.403C74.1981 399.19 74.4076 398.885 74.5219 398.489H75.6419C75.4743 399.129 75.1391 399.643 74.6362 400.031C74.1333 400.412 73.5048 400.603 72.7505 400.603C72.1562 400.603 71.6267 400.47 71.1619 400.203C70.7048 399.936 70.3467 399.559 70.0876 399.071C69.8286 398.584 69.6991 398.012 69.6991 397.357ZM82.7439 397.129C82.7439 397.327 82.7324 397.536 82.7096 397.757H77.7039C77.742 398.374 77.9515 398.858 78.3324 399.209C78.721 399.551 79.1896 399.723 79.7382 399.723C80.1877 399.723 80.561 399.62 80.8582 399.414C81.1629 399.201 81.3763 398.919 81.4982 398.569H82.6182C82.4505 399.17 82.1153 399.662 81.6124 400.043C81.1096 400.416 80.4848 400.603 79.7382 400.603C79.1439 400.603 78.6105 400.47 78.1382 400.203C77.6734 399.936 77.3077 399.559 77.041 399.071C76.7744 398.576 76.641 398.005 76.641 397.357C76.641 396.71 76.7705 396.142 77.0296 395.654C77.2886 395.167 77.6505 394.793 78.1153 394.534C78.5877 394.268 79.1286 394.134 79.7382 394.134C80.3324 394.134 80.8582 394.264 81.3153 394.523C81.7724 394.782 82.1229 395.14 82.3667 395.597C82.6182 396.047 82.7439 396.557 82.7439 397.129ZM81.6696 396.911C81.6696 396.515 81.582 396.176 81.4067 395.894C81.2315 395.605 80.9915 395.388 80.6867 395.243C80.3896 395.09 80.0582 395.014 79.6924 395.014C79.1667 395.014 78.7172 395.182 78.3439 395.517C77.9782 395.852 77.7686 396.317 77.7153 396.911H81.6696Z"
            fill="#020617"
          />
          <g clipPath="url(#clip0_12001_294)">
            <path
              d="M95.0524 399.609C94.9193 399.826 94.7698 400.078 94.6428 400.278C94.5882 400.371 94.5719 400.481 94.5976 400.585C94.6232 400.689 94.6887 400.779 94.78 400.835L97.4426 402.474C97.4889 402.503 97.5404 402.522 97.5941 402.53C97.6478 402.538 97.7027 402.536 97.7555 402.523C97.8083 402.51 97.858 402.487 97.9017 402.455C97.9454 402.422 97.9822 402.381 98.01 402.335C98.1165 402.156 98.2537 401.925 98.4032 401.677C99.458 399.936 100.519 400.149 102.432 401.063L105.072 402.318C105.122 402.342 105.175 402.355 105.23 402.358C105.285 402.36 105.339 402.351 105.391 402.332C105.442 402.313 105.489 402.284 105.529 402.246C105.569 402.209 105.601 402.164 105.623 402.113L106.891 399.246C106.934 399.148 106.936 399.036 106.898 398.936C106.86 398.835 106.784 398.754 106.686 398.709C106.129 398.447 105.021 397.925 104.023 397.444C100.435 395.701 97.3853 395.813 95.0524 399.609Z"
              fill="url(#paint0_linear_12001_294)"
            />
            <path
              d="M106.991 393.103C107.124 392.886 107.274 392.634 107.401 392.433C107.455 392.341 107.471 392.231 107.446 392.127C107.42 392.023 107.355 391.933 107.263 391.876L104.601 390.238C104.554 390.206 104.502 390.185 104.446 390.175C104.391 390.165 104.334 390.166 104.28 390.179C104.225 390.191 104.173 390.215 104.128 390.248C104.083 390.282 104.045 390.324 104.017 390.373C103.911 390.551 103.773 390.783 103.624 391.03C102.569 392.771 101.508 392.558 99.5951 391.645L96.9632 390.396C96.9137 390.372 96.86 390.359 96.8052 390.356C96.7505 390.354 96.6958 390.362 96.6444 390.381C96.593 390.401 96.546 390.43 96.5061 390.467C96.4663 390.505 96.4343 390.55 96.4122 390.6L95.1444 393.468C95.1014 393.566 95.0987 393.678 95.137 393.778C95.1753 393.878 95.2516 393.96 95.3493 394.004C95.9064 394.267 97.0144 394.789 98.0119 395.27C101.608 397.011 104.658 396.894 106.991 393.103Z"
              fill="url(#paint1_linear_12001_294)"
            />
          </g>
          {/* Confluence Traveling Circle */}
          <g id="confluence-circle" filter="url(#filter0_f_12001_294)">
            <circle
              cx="127.857"
              cy="395.999"
              r="5.71429"
              fill="#0052CC"
              fillOpacity="0.5"
            />
          </g>
          <circle
            id="confluence-circle-inner"
            cx="127.857"
            cy="396"
            r="2.85714"
            fill="#0052CC"
          />
          <circle
            id="confluence-circle-stroke"
            cx="127.857"
            cy="396"
            r="3.21429"
            stroke="white"
            strokeOpacity="0.8"
            strokeWidth="0.714286"
          />
        </g>
        {/* Salesforce Traveling Path */}
        <path
          ref={salesforcePathRef}
          id="salesforce-travel-path"
          d="M732 237L722.877 237C679.105 237 636.448 250.809 600.98 276.462L593.962 281.538C558.494 307.191 515.837 321 472.064 321L181 321"
          stroke="url(#paint3_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Salesforce travel path glow */}
        <path
          id="salesforce-travel-path-glow"
          d="M732 237L722.877 237C679.105 237 636.448 250.809 600.98 276.462L593.962 281.538C558.494 307.191 515.837 321 472.064 321L181 321"
          stroke="url(#paint3_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Salesforce Item */}
        <g id="salesforce-item">
          <rect
            x="60.3571"
            y="301.357"
            width="120.714"
            height="39.2857"
            rx="19.6429"
            fill="#F8FAFC"
          />
          <rect
            x="60.3571"
            y="301.357"
            width="120.714"
            height="39.2857"
            rx="19.6429"
            stroke="#F1F5F9"
            strokeWidth="0.714286"
          />
          <path
            d="M80.7159 325.58C80.1902 325.58 79.7179 325.489 79.2988 325.306C78.8874 325.115 78.5636 324.856 78.3274 324.529C78.0912 324.193 77.9693 323.809 77.9617 323.374H79.0702C79.1083 323.748 79.2607 324.064 79.5274 324.323C79.8017 324.574 80.1979 324.7 80.7159 324.7C81.2112 324.7 81.5998 324.578 81.8817 324.334C82.1712 324.083 82.3159 323.763 82.3159 323.374C82.3159 323.07 82.2321 322.822 82.0645 322.631C81.8969 322.441 81.6874 322.296 81.4359 322.197C81.1845 322.098 80.8455 321.991 80.4188 321.877C79.8931 321.74 79.4702 321.603 79.1502 321.466C78.8379 321.329 78.5674 321.115 78.3388 320.826C78.1179 320.529 78.0074 320.132 78.0074 319.637C78.0074 319.203 78.1179 318.818 78.3388 318.483C78.5598 318.148 78.8683 317.889 79.2645 317.706C79.6683 317.523 80.1293 317.431 80.6474 317.431C81.394 317.431 82.0036 317.618 82.4759 317.991C82.9559 318.365 83.2264 318.86 83.2874 319.477H82.1445C82.1064 319.172 81.9464 318.906 81.6645 318.677C81.3826 318.441 81.0093 318.323 80.5445 318.323C80.1102 318.323 79.7559 318.437 79.4817 318.666C79.2074 318.887 79.0702 319.199 79.0702 319.603C79.0702 319.892 79.1502 320.129 79.3102 320.311C79.4779 320.494 79.6798 320.635 79.9159 320.734C80.1598 320.826 80.4988 320.932 80.9331 321.054C81.4588 321.199 81.8817 321.344 82.2017 321.489C82.5217 321.626 82.7959 321.843 83.0245 322.14C83.2531 322.43 83.3674 322.826 83.3674 323.329C83.3674 323.717 83.2645 324.083 83.0588 324.426C82.8531 324.769 82.5483 325.047 82.1445 325.26C81.7407 325.473 81.2645 325.58 80.7159 325.58ZM84.5093 322.346C84.5093 321.706 84.6388 321.146 84.8978 320.666C85.1569 320.178 85.5112 319.801 85.9607 319.534C86.4178 319.268 86.9245 319.134 87.4807 319.134C88.0293 319.134 88.5054 319.252 88.9093 319.489C89.3131 319.725 89.614 320.022 89.8121 320.38V319.237H90.8635V325.5H89.8121V324.334C89.6064 324.7 89.2978 325.005 88.8864 325.249C88.4826 325.485 88.0102 325.603 87.4693 325.603C86.9131 325.603 86.4102 325.466 85.9607 325.191C85.5112 324.917 85.1569 324.532 84.8978 324.037C84.6388 323.542 84.5093 322.978 84.5093 322.346ZM89.8121 322.357C89.8121 321.885 89.7169 321.473 89.5264 321.123C89.3359 320.772 89.0769 320.506 88.7493 320.323C88.4293 320.132 88.075 320.037 87.6864 320.037C87.2978 320.037 86.9435 320.129 86.6235 320.311C86.3035 320.494 86.0483 320.761 85.8578 321.111C85.6673 321.462 85.5721 321.873 85.5721 322.346C85.5721 322.826 85.6673 323.245 85.8578 323.603C86.0483 323.953 86.3035 324.224 86.6235 324.414C86.9435 324.597 87.2978 324.689 87.6864 324.689C88.075 324.689 88.4293 324.597 88.7493 324.414C89.0769 324.224 89.3359 323.953 89.5264 323.603C89.7169 323.245 89.8121 322.83 89.8121 322.357ZM93.661 317.043V325.5H92.621V317.043H93.661ZM101.148 322.129C101.148 322.327 101.136 322.536 101.114 322.757H96.1078C96.1459 323.374 96.3554 323.858 96.7364 324.209C97.125 324.551 97.5935 324.723 98.1421 324.723C98.5916 324.723 98.965 324.62 99.2621 324.414C99.5669 324.201 99.7802 323.919 99.9021 323.569H101.022C100.854 324.17 100.519 324.662 100.016 325.043C99.5135 325.416 98.8888 325.603 98.1421 325.603C97.5478 325.603 97.0145 325.47 96.5421 325.203C96.0773 324.936 95.7116 324.559 95.445 324.071C95.1783 323.576 95.045 323.005 95.045 322.357C95.045 321.71 95.1745 321.142 95.4335 320.654C95.6926 320.167 96.0545 319.793 96.5193 319.534C96.9916 319.268 97.5326 319.134 98.1421 319.134C98.7364 319.134 99.2621 319.264 99.7193 319.523C100.176 319.782 100.527 320.14 100.771 320.597C101.022 321.047 101.148 321.557 101.148 322.129ZM100.074 321.911C100.074 321.515 99.9859 321.176 99.8107 320.894C99.6354 320.605 99.3954 320.388 99.0907 320.243C98.7935 320.09 98.4621 320.014 98.0964 320.014C97.5707 320.014 97.1212 320.182 96.7478 320.517C96.3821 320.852 96.1726 321.317 96.1193 321.911H100.074ZM104.738 325.603C104.258 325.603 103.827 325.523 103.446 325.363C103.065 325.195 102.764 324.967 102.543 324.677C102.322 324.38 102.201 324.041 102.178 323.66H103.252C103.282 323.972 103.427 324.228 103.686 324.426C103.953 324.624 104.3 324.723 104.726 324.723C105.122 324.723 105.435 324.635 105.663 324.46C105.892 324.285 106.006 324.064 106.006 323.797C106.006 323.523 105.884 323.321 105.641 323.191C105.397 323.054 105.02 322.921 104.509 322.791C104.044 322.67 103.663 322.548 103.366 322.426C103.077 322.296 102.825 322.11 102.612 321.866C102.406 321.614 102.303 321.287 102.303 320.883C102.303 320.563 102.399 320.27 102.589 320.003C102.78 319.736 103.05 319.527 103.401 319.374C103.751 319.214 104.151 319.134 104.601 319.134C105.294 319.134 105.854 319.31 106.281 319.66C106.707 320.01 106.936 320.49 106.966 321.1H105.926C105.903 320.772 105.77 320.51 105.526 320.311C105.29 320.113 104.97 320.014 104.566 320.014C104.193 320.014 103.896 320.094 103.675 320.254C103.454 320.414 103.343 320.624 103.343 320.883C103.343 321.089 103.408 321.26 103.538 321.397C103.675 321.527 103.842 321.633 104.041 321.717C104.246 321.793 104.528 321.881 104.886 321.98C105.336 322.102 105.702 322.224 105.983 322.346C106.265 322.46 106.505 322.635 106.703 322.871C106.909 323.108 107.016 323.416 107.023 323.797C107.023 324.14 106.928 324.449 106.738 324.723C106.547 324.997 106.277 325.214 105.926 325.374C105.583 325.527 105.187 325.603 104.738 325.603ZM111.04 320.094H109.726V325.5H108.686V320.094H107.874V319.237H108.686V318.791C108.686 318.09 108.865 317.58 109.223 317.26C109.589 316.932 110.172 316.769 110.972 316.769V317.637C110.514 317.637 110.191 317.729 110 317.911C109.817 318.087 109.726 318.38 109.726 318.791V319.237H111.04V320.094ZM114.984 325.603C114.397 325.603 113.864 325.47 113.384 325.203C112.912 324.936 112.538 324.559 112.264 324.071C111.997 323.576 111.864 323.005 111.864 322.357C111.864 321.717 112.001 321.153 112.276 320.666C112.557 320.17 112.938 319.793 113.418 319.534C113.898 319.268 114.436 319.134 115.03 319.134C115.624 319.134 116.161 319.268 116.641 319.534C117.121 319.793 117.498 320.167 117.773 320.654C118.055 321.142 118.196 321.71 118.196 322.357C118.196 323.005 118.051 323.576 117.761 324.071C117.479 324.559 117.095 324.936 116.607 325.203C116.119 325.47 115.578 325.603 114.984 325.603ZM114.984 324.689C115.357 324.689 115.708 324.601 116.036 324.426C116.363 324.25 116.626 323.988 116.824 323.637C117.03 323.287 117.133 322.86 117.133 322.357C117.133 321.854 117.034 321.428 116.836 321.077C116.637 320.727 116.378 320.468 116.058 320.3C115.738 320.125 115.392 320.037 115.018 320.037C114.637 320.037 114.287 320.125 113.967 320.3C113.655 320.468 113.403 320.727 113.213 321.077C113.022 321.428 112.927 321.854 112.927 322.357C112.927 322.868 113.018 323.298 113.201 323.649C113.392 323.999 113.643 324.262 113.956 324.437C114.268 324.605 114.611 324.689 114.984 324.689ZM120.603 320.254C120.786 319.896 121.045 319.618 121.38 319.42C121.723 319.222 122.138 319.123 122.626 319.123V320.197H122.352C121.186 320.197 120.603 320.83 120.603 322.094V325.5H119.563V319.237H120.603V320.254ZM123.438 322.357C123.438 321.71 123.567 321.146 123.826 320.666C124.085 320.178 124.444 319.801 124.901 319.534C125.365 319.268 125.895 319.134 126.489 319.134C127.259 319.134 127.891 319.321 128.386 319.694C128.889 320.068 129.221 320.586 129.381 321.249H128.261C128.154 320.868 127.944 320.567 127.632 320.346C127.327 320.125 126.946 320.014 126.489 320.014C125.895 320.014 125.415 320.22 125.049 320.631C124.684 321.035 124.501 321.61 124.501 322.357C124.501 323.111 124.684 323.694 125.049 324.106C125.415 324.517 125.895 324.723 126.489 324.723C126.946 324.723 127.327 324.616 127.632 324.403C127.937 324.19 128.146 323.885 128.261 323.489H129.381C129.213 324.129 128.878 324.643 128.375 325.031C127.872 325.412 127.244 325.603 126.489 325.603C125.895 325.603 125.365 325.47 124.901 325.203C124.444 324.936 124.085 324.559 123.826 324.071C123.567 323.584 123.438 323.012 123.438 322.357ZM136.483 322.129C136.483 322.327 136.471 322.536 136.448 322.757H131.443C131.481 323.374 131.69 323.858 132.071 324.209C132.46 324.551 132.928 324.723 133.477 324.723C133.926 324.723 134.3 324.62 134.597 324.414C134.902 324.201 135.115 323.919 135.237 323.569H136.357C136.189 324.17 135.854 324.662 135.351 325.043C134.848 325.416 134.224 325.603 133.477 325.603C132.883 325.603 132.349 325.47 131.877 325.203C131.412 324.936 131.046 324.559 130.78 324.071C130.513 323.576 130.38 323.005 130.38 322.357C130.38 321.71 130.509 321.142 130.768 320.654C131.027 320.167 131.389 319.793 131.854 319.534C132.326 319.268 132.867 319.134 133.477 319.134C134.071 319.134 134.597 319.264 135.054 319.523C135.511 319.782 135.862 320.14 136.106 320.597C136.357 321.047 136.483 321.557 136.483 322.129ZM135.408 321.911C135.408 321.515 135.321 321.176 135.146 320.894C134.97 320.605 134.73 320.388 134.426 320.243C134.128 320.09 133.797 320.014 133.431 320.014C132.906 320.014 132.456 320.182 132.083 320.517C131.717 320.852 131.507 321.317 131.454 321.911H135.408Z"
            fill="#020617"
          />
          <path
            d="M153.513 316.164C154.085 315.572 154.881 315.198 155.758 315.198C156.928 315.198 157.942 315.851 158.486 316.817C158.956 316.606 159.479 316.491 160.03 316.491C162.139 316.491 163.84 318.212 163.84 320.334C163.84 322.457 162.132 324.178 160.03 324.178C159.772 324.178 159.52 324.151 159.282 324.103C158.806 324.953 157.894 325.532 156.847 325.532C156.411 325.532 155.996 325.43 155.629 325.253C155.146 326.389 154.017 327.191 152.704 327.191C151.337 327.191 150.166 326.328 149.717 325.11C149.52 325.151 149.316 325.171 149.112 325.171C147.479 325.171 146.16 323.838 146.16 322.185C146.16 321.083 146.752 320.117 147.636 319.6C147.452 319.185 147.35 318.722 147.35 318.232C147.343 316.348 148.888 314.811 150.779 314.811C151.894 314.811 152.888 315.341 153.513 316.164Z"
            fill="#00A1E0"
          />
          <path
            d="M148.717 321.231L148.792 321.034C148.806 321 148.826 321.013 148.84 321.02C148.86 321.034 148.874 321.041 148.901 321.061C149.112 321.197 149.309 321.197 149.371 321.197C149.527 321.197 149.629 321.115 149.629 321V320.993C149.629 320.87 149.479 320.823 149.303 320.768L149.262 320.755C149.024 320.687 148.765 320.585 148.765 320.285V320.279C148.765 319.993 148.996 319.789 149.33 319.789H149.364C149.561 319.789 149.745 319.843 149.881 319.932C149.894 319.938 149.908 319.952 149.901 319.973C149.894 319.993 149.833 320.149 149.826 320.17C149.813 320.204 149.779 320.183 149.779 320.183C149.656 320.115 149.473 320.068 149.316 320.068C149.173 320.068 149.085 320.143 149.085 320.245V320.251C149.085 320.367 149.241 320.421 149.418 320.476L149.452 320.483C149.69 320.558 149.942 320.66 149.942 320.952V320.959C149.942 321.272 149.717 321.462 149.357 321.462C149.18 321.462 149.01 321.435 148.826 321.34C148.792 321.319 148.758 321.306 148.724 321.279C148.717 321.265 148.704 321.258 148.717 321.231ZM154.024 321.231L154.098 321.034C154.112 321 154.139 321.013 154.146 321.02C154.166 321.034 154.18 321.041 154.207 321.061C154.418 321.197 154.615 321.197 154.677 321.197C154.833 321.197 154.935 321.115 154.935 321V320.993C154.935 320.87 154.786 320.823 154.609 320.768L154.568 320.755C154.33 320.687 154.071 320.585 154.071 320.285V320.279C154.071 319.993 154.303 319.789 154.636 319.789H154.67C154.867 319.789 155.051 319.843 155.187 319.932C155.2 319.938 155.214 319.952 155.207 319.973C155.2 319.993 155.139 320.149 155.132 320.17C155.119 320.204 155.085 320.183 155.085 320.183C154.962 320.115 154.779 320.068 154.622 320.068C154.479 320.068 154.391 320.143 154.391 320.245V320.251C154.391 320.367 154.547 320.421 154.724 320.476L154.758 320.483C154.996 320.558 155.248 320.66 155.248 320.952V320.959C155.248 321.272 155.024 321.462 154.663 321.462C154.486 321.462 154.316 321.435 154.132 321.34C154.098 321.319 154.064 321.306 154.03 321.279C154.03 321.265 154.017 321.258 154.024 321.231ZM157.956 320.299C157.983 320.401 158.003 320.51 158.003 320.626C158.003 320.741 157.99 320.85 157.956 320.952C157.928 321.054 157.881 321.143 157.82 321.217C157.758 321.292 157.677 321.353 157.588 321.394C157.493 321.435 157.384 321.456 157.262 321.456C157.139 321.456 157.03 321.435 156.935 321.394C156.84 321.353 156.765 321.292 156.704 321.217C156.643 321.143 156.595 321.054 156.568 320.952C156.541 320.85 156.52 320.741 156.52 320.626C156.52 320.51 156.534 320.401 156.568 320.299C156.595 320.197 156.643 320.109 156.704 320.034C156.765 319.959 156.847 319.898 156.935 319.857C157.03 319.816 157.139 319.789 157.262 319.789C157.384 319.789 157.493 319.809 157.588 319.857C157.683 319.898 157.758 319.959 157.82 320.034C157.881 320.109 157.928 320.197 157.956 320.299ZM157.649 320.619C157.649 320.442 157.615 320.306 157.554 320.211C157.493 320.115 157.391 320.068 157.262 320.068C157.126 320.068 157.03 320.115 156.969 320.211C156.908 320.306 156.874 320.442 156.874 320.619C156.874 320.796 156.908 320.932 156.969 321.034C157.03 321.129 157.126 321.177 157.262 321.177C157.398 321.177 157.493 321.129 157.554 321.034C157.622 320.938 157.649 320.796 157.649 320.619ZM160.445 321.129L160.52 321.333C160.527 321.36 160.507 321.367 160.507 321.367C160.391 321.415 160.234 321.442 160.078 321.442C159.813 321.442 159.615 321.367 159.479 321.217C159.343 321.068 159.275 320.864 159.275 320.612C159.275 320.496 159.289 320.387 159.323 320.285C159.357 320.183 159.405 320.095 159.473 320.02C159.541 319.945 159.622 319.884 159.717 319.843C159.813 319.802 159.928 319.775 160.058 319.775C160.146 319.775 160.221 319.782 160.282 319.789C160.35 319.802 160.445 319.823 160.486 319.843C160.493 319.843 160.513 319.857 160.507 319.877C160.479 319.959 160.459 320.013 160.432 320.081C160.418 320.115 160.398 320.102 160.398 320.102C160.296 320.068 160.2 320.054 160.078 320.054C159.928 320.054 159.813 320.102 159.745 320.204C159.67 320.299 159.629 320.428 159.629 320.605C159.629 320.796 159.677 320.932 159.758 321.02C159.84 321.109 159.956 321.149 160.105 321.149C160.166 321.149 160.221 321.143 160.269 321.136C160.316 321.129 160.364 321.115 160.411 321.095C160.405 321.109 160.432 321.102 160.445 321.129ZM161.99 320.238C162.058 320.469 162.024 320.666 162.017 320.68C162.017 320.707 161.99 320.707 161.99 320.707H160.962C160.969 320.864 161.003 320.973 161.085 321.047C161.16 321.122 161.275 321.17 161.439 321.17C161.683 321.17 161.786 321.122 161.86 321.095C161.86 321.095 161.888 321.088 161.901 321.115L161.969 321.306C161.983 321.34 161.969 321.347 161.962 321.353C161.901 321.387 161.745 321.456 161.445 321.456C161.303 321.456 161.173 321.435 161.071 321.394C160.969 321.353 160.881 321.299 160.813 321.224C160.745 321.149 160.697 321.061 160.663 320.966C160.629 320.864 160.615 320.755 160.615 320.639C160.615 320.524 160.629 320.415 160.663 320.313C160.69 320.211 160.738 320.122 160.799 320.047C160.86 319.973 160.942 319.911 161.037 319.87C161.132 319.823 161.248 319.802 161.377 319.802C161.486 319.802 161.588 319.823 161.67 319.864C161.731 319.891 161.799 319.938 161.867 320.013C161.901 320.041 161.962 320.143 161.99 320.238ZM160.969 320.456H161.697C161.69 320.36 161.67 320.279 161.629 320.211C161.568 320.115 161.479 320.061 161.343 320.061C161.207 320.061 161.112 320.115 161.051 320.211C161.01 320.272 160.99 320.353 160.969 320.456ZM153.779 320.238C153.847 320.469 153.813 320.666 153.813 320.68C153.813 320.707 153.786 320.707 153.786 320.707H152.758C152.765 320.864 152.799 320.973 152.881 321.047C152.956 321.122 153.071 321.17 153.234 321.17C153.479 321.17 153.581 321.122 153.656 321.095C153.656 321.095 153.683 321.088 153.697 321.115L153.765 321.306C153.779 321.34 153.765 321.347 153.758 321.353C153.697 321.387 153.541 321.456 153.241 321.456C153.098 321.456 152.969 321.435 152.867 321.394C152.765 321.353 152.677 321.299 152.609 321.224C152.541 321.149 152.493 321.061 152.459 320.966C152.425 320.864 152.411 320.755 152.411 320.639C152.411 320.524 152.425 320.415 152.459 320.313C152.486 320.211 152.534 320.122 152.595 320.047C152.656 319.973 152.738 319.911 152.833 319.87C152.928 319.823 153.044 319.802 153.173 319.802C153.282 319.802 153.384 319.823 153.466 319.864C153.527 319.891 153.595 319.938 153.663 320.013C153.69 320.041 153.758 320.143 153.779 320.238ZM152.758 320.456H153.493C153.486 320.36 153.466 320.279 153.425 320.211C153.364 320.115 153.275 320.061 153.139 320.061C153.003 320.061 152.908 320.115 152.847 320.211C152.799 320.272 152.779 320.353 152.758 320.456ZM150.956 320.401C150.956 320.401 151.037 320.408 151.126 320.421V320.381C151.126 320.245 151.098 320.177 151.044 320.136C150.99 320.095 150.901 320.068 150.792 320.068C150.792 320.068 150.541 320.068 150.343 320.17C150.337 320.177 150.33 320.177 150.33 320.177C150.33 320.177 150.303 320.183 150.296 320.163L150.221 319.966C150.207 319.938 150.228 319.925 150.228 319.925C150.323 319.85 150.541 319.809 150.541 319.809C150.615 319.796 150.738 319.782 150.813 319.782C151.017 319.782 151.173 319.83 151.282 319.925C151.391 320.02 151.445 320.17 151.445 320.381V321.319C151.445 321.319 151.445 321.347 151.425 321.353C151.425 321.353 151.384 321.367 151.35 321.374C151.316 321.381 151.194 321.408 151.092 321.421C150.99 321.442 150.888 321.449 150.779 321.449C150.677 321.449 150.588 321.442 150.507 321.421C150.425 321.401 150.357 321.374 150.296 321.333C150.241 321.292 150.194 321.238 150.16 321.17C150.126 321.109 150.112 321.027 150.112 320.938C150.112 320.85 150.132 320.768 150.166 320.7C150.2 320.632 150.255 320.578 150.316 320.53C150.377 320.483 150.452 320.456 150.527 320.428C150.609 320.408 150.69 320.394 150.779 320.394C150.86 320.401 150.915 320.401 150.956 320.401ZM150.547 321.122C150.547 321.122 150.643 321.197 150.847 321.183C150.996 321.177 151.126 321.149 151.126 321.149V320.68C151.126 320.68 150.996 320.66 150.847 320.66C150.636 320.66 150.547 320.734 150.547 320.734C150.486 320.775 150.459 320.843 150.459 320.932C150.459 320.986 150.473 321.034 150.493 321.068C150.5 321.081 150.507 321.095 150.547 321.122ZM159.221 319.877C159.214 319.904 159.16 320.047 159.146 320.095C159.139 320.115 159.126 320.122 159.105 320.122C159.105 320.122 159.044 320.109 158.99 320.109C158.956 320.109 158.901 320.115 158.854 320.129C158.806 320.143 158.765 320.17 158.724 320.204C158.683 320.238 158.656 320.292 158.636 320.353C158.615 320.415 158.602 320.517 158.602 320.626V321.387C158.602 321.408 158.588 321.421 158.568 321.421H158.296C158.275 321.421 158.262 321.408 158.262 321.387V319.857C158.262 319.836 158.275 319.823 158.289 319.823H158.554C158.575 319.823 158.581 319.836 158.581 319.857V319.979C158.622 319.925 158.69 319.877 158.752 319.85C158.813 319.823 158.888 319.802 159.017 319.809C159.085 319.816 159.173 319.83 159.187 319.836C159.214 319.843 159.228 319.85 159.221 319.877ZM156.697 319.17C156.704 319.17 156.724 319.183 156.717 319.204L156.636 319.421C156.629 319.435 156.622 319.449 156.588 319.435C156.581 319.435 156.568 319.428 156.534 319.421C156.513 319.415 156.479 319.415 156.452 319.415C156.411 319.415 156.377 319.421 156.343 319.428C156.309 319.435 156.282 319.456 156.255 319.483C156.223 319.514 156.198 319.551 156.18 319.592C156.139 319.7 156.126 319.816 156.126 319.823H156.452C156.479 319.823 156.486 319.836 156.486 319.857L156.445 320.068C156.439 320.102 156.411 320.095 156.411 320.095H156.071L155.854 321.408C155.826 321.544 155.799 321.66 155.765 321.755C155.731 321.85 155.69 321.918 155.629 321.986C155.575 322.047 155.513 322.095 155.439 322.115C155.371 322.143 155.282 322.156 155.187 322.156C155.139 322.156 155.092 322.156 155.037 322.143C154.996 322.136 154.976 322.129 154.942 322.115C154.928 322.109 154.922 322.095 154.928 322.075C154.935 322.054 154.996 321.891 155.003 321.864C155.017 321.836 155.037 321.85 155.037 321.85C155.058 321.857 155.071 321.864 155.092 321.87C155.119 321.877 155.146 321.877 155.173 321.877C155.221 321.877 155.262 321.87 155.296 321.857C155.337 321.843 155.364 321.816 155.391 321.782C155.418 321.748 155.439 321.7 155.466 321.639C155.486 321.578 155.507 321.49 155.527 321.387L155.758 320.102H155.534C155.507 320.102 155.5 320.088 155.5 320.068L155.541 319.857C155.547 319.823 155.575 319.83 155.575 319.83H155.806L155.82 319.762C155.854 319.558 155.922 319.401 156.024 319.299C156.126 319.197 156.275 319.143 156.459 319.143C156.513 319.143 156.561 319.149 156.602 319.156C156.629 319.149 156.663 319.156 156.697 319.17ZM152.112 321.381C152.112 321.401 152.098 321.415 152.085 321.415H151.813C151.792 321.415 151.786 321.401 151.786 321.381V319.197C151.786 319.183 151.799 319.163 151.813 319.163H152.085C152.105 319.163 152.112 319.177 152.112 319.197V321.381Z"
            fill="white"
          />
          {/* Salesforce Traveling Circle */}
          <g id="salesforce-circle" filter="url(#filter1_f_12001_294)">
            <circle
              cx="181.428"
              cy="320.999"
              r="5.71429"
              fill="#00A1E0"
              fillOpacity="0.5"
            />
          </g>
          <circle
            id="salesforce-circle-inner"
            cx="181.428"
            cy="321"
            r="2.85714"
            fill="#00A1E0"
          />
          <circle
            id="salesforce-circle-stroke"
            cx="181.428"
            cy="321"
            r="3.21429"
            stroke="white"
            strokeOpacity="0.8"
            strokeWidth="0.714286"
          />
        </g>
        {/* Sharepoint Traveling Path */}
        <path
          ref={sharepointPathRef}
          id="sharepoint-travel-path"
          d="M732 237C682.881 237 635.606 255.71 599.79 289.324L597.471 291.5C560.165 326.512 510.924 346 459.761 346L397 346"
          stroke="url(#paint5_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Sharepoint travel path glow */}
        <path
          id="sharepoint-travel-path-glow"
          d="M732 237C682.881 237 635.606 255.71 599.79 289.324L597.471 291.5C560.165 326.512 510.924 346 459.761 346L397 346"
          stroke="url(#paint5_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Sharepoint Item */}
        <g id="sharepoint-item">
          <rect
            x="226.5"
            y="318.5"
            width="171"
            height="55"
            rx="27.5"
            fill="#F8FAFC"
          />
          <rect
            x="226.5"
            y="318.5"
            width="171"
            height="55"
            rx="27.5"
            stroke="#F1F5F9"
          />
          <path
            d="M254.854 352.112C254.118 352.112 253.457 351.984 252.87 351.728C252.294 351.461 251.841 351.099 251.51 350.64C251.179 350.171 251.009 349.632 250.998 349.024H252.55C252.603 349.547 252.817 349.989 253.19 350.352C253.574 350.704 254.129 350.88 254.854 350.88C255.547 350.88 256.091 350.709 256.486 350.368C256.891 350.016 257.094 349.568 257.094 349.024C257.094 348.597 256.977 348.251 256.742 347.984C256.507 347.717 256.214 347.515 255.862 347.376C255.51 347.237 255.035 347.088 254.438 346.928C253.702 346.736 253.11 346.544 252.662 346.352C252.225 346.16 251.846 345.861 251.526 345.456C251.217 345.04 251.062 344.485 251.062 343.792C251.062 343.184 251.217 342.645 251.526 342.176C251.835 341.707 252.267 341.344 252.822 341.088C253.387 340.832 254.033 340.704 254.758 340.704C255.803 340.704 256.657 340.965 257.318 341.488C257.99 342.011 258.369 342.704 258.454 343.568H256.854C256.801 343.141 256.577 342.768 256.182 342.448C255.787 342.117 255.265 341.952 254.614 341.952C254.006 341.952 253.51 342.112 253.126 342.432C252.742 342.741 252.55 343.179 252.55 343.744C252.55 344.149 252.662 344.48 252.886 344.736C253.121 344.992 253.403 345.189 253.734 345.328C254.075 345.456 254.55 345.605 255.158 345.776C255.894 345.979 256.486 346.181 256.934 346.384C257.382 346.576 257.766 346.88 258.086 347.296C258.406 347.701 258.566 348.256 258.566 348.96C258.566 349.504 258.422 350.016 258.134 350.496C257.846 350.976 257.419 351.365 256.854 351.664C256.289 351.963 255.622 352.112 254.854 352.112ZM265.061 343.072C265.722 343.072 266.319 343.216 266.853 343.504C267.386 343.781 267.802 344.203 268.101 344.768C268.41 345.333 268.565 346.021 268.565 346.832V352H267.125V347.04C267.125 346.165 266.906 345.499 266.469 345.04C266.031 344.571 265.434 344.336 264.677 344.336C263.909 344.336 263.295 344.576 262.837 345.056C262.389 345.536 262.165 346.235 262.165 347.152V352H260.709V340.16H262.165V344.48C262.453 344.032 262.847 343.685 263.349 343.44C263.861 343.195 264.431 343.072 265.061 343.072ZM270.399 347.584C270.399 346.688 270.58 345.904 270.943 345.232C271.306 344.549 271.802 344.021 272.431 343.648C273.071 343.275 273.78 343.088 274.559 343.088C275.327 343.088 275.994 343.253 276.559 343.584C277.124 343.915 277.546 344.331 277.823 344.832V343.232H279.295V352H277.823V350.368C277.535 350.88 277.103 351.307 276.527 351.648C275.962 351.979 275.3 352.144 274.543 352.144C273.764 352.144 273.06 351.952 272.431 351.568C271.802 351.184 271.306 350.645 270.943 349.952C270.58 349.259 270.399 348.469 270.399 347.584ZM277.823 347.6C277.823 346.939 277.69 346.363 277.423 345.872C277.156 345.381 276.794 345.008 276.335 344.752C275.887 344.485 275.391 344.352 274.847 344.352C274.303 344.352 273.807 344.48 273.359 344.736C272.911 344.992 272.554 345.365 272.287 345.856C272.02 346.347 271.887 346.923 271.887 347.584C271.887 348.256 272.02 348.843 272.287 349.344C272.554 349.835 272.911 350.213 273.359 350.48C273.807 350.736 274.303 350.864 274.847 350.864C275.391 350.864 275.887 350.736 276.335 350.48C276.794 350.213 277.156 349.835 277.423 349.344C277.69 348.843 277.823 348.261 277.823 347.6ZM283.211 344.656C283.467 344.155 283.83 343.765 284.299 343.488C284.779 343.211 285.361 343.072 286.043 343.072V344.576H285.659C284.027 344.576 283.211 345.461 283.211 347.232V352H281.755V343.232H283.211V344.656ZM295.724 347.28C295.724 347.557 295.708 347.851 295.676 348.16H288.668C288.722 349.024 289.015 349.701 289.548 350.192C290.092 350.672 290.748 350.912 291.516 350.912C292.146 350.912 292.668 350.768 293.084 350.48C293.511 350.181 293.81 349.787 293.98 349.296H295.548C295.314 350.139 294.844 350.827 294.14 351.36C293.436 351.883 292.562 352.144 291.516 352.144C290.684 352.144 289.938 351.957 289.276 351.584C288.626 351.211 288.114 350.683 287.74 350C287.367 349.307 287.18 348.507 287.18 347.6C287.18 346.693 287.362 345.899 287.724 345.216C288.087 344.533 288.594 344.011 289.244 343.648C289.906 343.275 290.663 343.088 291.516 343.088C292.348 343.088 293.084 343.269 293.724 343.632C294.364 343.995 294.855 344.496 295.196 345.136C295.548 345.765 295.724 346.48 295.724 347.28ZM294.22 346.976C294.22 346.421 294.098 345.947 293.852 345.552C293.607 345.147 293.271 344.843 292.844 344.64C292.428 344.427 291.964 344.32 291.452 344.32C290.716 344.32 290.087 344.555 289.564 345.024C289.052 345.493 288.759 346.144 288.684 346.976H294.22ZM305.102 344.112C305.102 345.04 304.782 345.813 304.142 346.432C303.513 347.04 302.547 347.344 301.246 347.344H299.102V352H297.646V340.848H301.246C302.505 340.848 303.459 341.152 304.11 341.76C304.771 342.368 305.102 343.152 305.102 344.112ZM301.246 346.144C302.057 346.144 302.654 345.968 303.038 345.616C303.422 345.264 303.614 344.763 303.614 344.112C303.614 342.736 302.825 342.048 301.246 342.048H299.102V346.144H301.246ZM310.736 352.144C309.914 352.144 309.168 351.957 308.496 351.584C307.834 351.211 307.312 350.683 306.928 350C306.554 349.307 306.368 348.507 306.368 347.6C306.368 346.704 306.56 345.915 306.944 345.232C307.338 344.539 307.872 344.011 308.544 343.648C309.216 343.275 309.968 343.088 310.8 343.088C311.632 343.088 312.384 343.275 313.056 343.648C313.728 344.011 314.256 344.533 314.64 345.216C315.034 345.899 315.232 346.693 315.232 347.6C315.232 348.507 315.029 349.307 314.624 350C314.229 350.683 313.69 351.211 313.008 351.584C312.325 351.957 311.568 352.144 310.736 352.144ZM310.736 350.864C311.258 350.864 311.749 350.741 312.208 350.496C312.666 350.251 313.034 349.883 313.312 349.392C313.6 348.901 313.744 348.304 313.744 347.6C313.744 346.896 313.605 346.299 313.328 345.808C313.05 345.317 312.688 344.955 312.24 344.72C311.792 344.475 311.306 344.352 310.784 344.352C310.25 344.352 309.76 344.475 309.312 344.72C308.874 344.955 308.522 345.317 308.256 345.808C307.989 346.299 307.856 346.896 307.856 347.6C307.856 348.315 307.984 348.917 308.24 349.408C308.506 349.899 308.858 350.267 309.296 350.512C309.733 350.747 310.213 350.864 310.736 350.864ZM317.898 341.808C317.621 341.808 317.386 341.712 317.194 341.52C317.002 341.328 316.906 341.093 316.906 340.816C316.906 340.539 317.002 340.304 317.194 340.112C317.386 339.92 317.621 339.824 317.898 339.824C318.165 339.824 318.389 339.92 318.57 340.112C318.762 340.304 318.858 340.539 318.858 340.816C318.858 341.093 318.762 341.328 318.57 341.52C318.389 341.712 318.165 341.808 317.898 341.808ZM318.602 343.232V352H317.146V343.232H318.602ZM325.356 343.072C326.422 343.072 327.286 343.397 327.948 344.048C328.609 344.688 328.94 345.616 328.94 346.832V352H327.5V347.04C327.5 346.165 327.281 345.499 326.844 345.04C326.406 344.571 325.809 344.336 325.052 344.336C324.284 344.336 323.67 344.576 323.212 345.056C322.764 345.536 322.54 346.235 322.54 347.152V352H321.084V343.232H322.54V344.48C322.828 344.032 323.217 343.685 323.708 343.44C324.209 343.195 324.758 343.072 325.356 343.072ZM333.094 344.432V349.6C333.094 350.027 333.185 350.331 333.366 350.512C333.547 350.683 333.862 350.768 334.31 350.768H335.382V352H334.07C333.259 352 332.651 351.813 332.246 351.44C331.841 351.067 331.638 350.453 331.638 349.6V344.432H330.502V343.232H331.638V341.024H333.094V343.232H335.382V344.432H333.094Z"
            fill="#020617"
          />
          <path
            d="M361.207 347.239C363.942 347.239 366.159 345.021 366.159 342.286C366.159 339.551 363.942 337.334 361.207 337.334C358.472 337.334 356.254 339.551 356.254 342.286C356.254 345.021 358.472 347.239 361.207 347.239Z"
            fill="#036C70"
          />
          <path
            d="M365.333 351.365C367.84 351.365 369.873 349.332 369.873 346.825C369.873 344.318 367.84 342.285 365.333 342.285C362.826 342.285 360.793 344.318 360.793 346.825C360.793 349.332 362.826 351.365 365.333 351.365Z"
            fill="#1A9BA1"
          />
          <path
            d="M361.825 354.666C363.763 354.666 365.333 353.096 365.333 351.158C365.333 349.221 363.763 347.65 361.825 347.65C359.888 347.65 358.317 349.221 358.317 351.158C358.317 353.096 359.888 354.666 361.825 354.666Z"
            fill="#37C6D0"
          />
          <path
            opacity="0.1"
            d="M362.032 341.802V350.609C362.03 350.915 361.845 351.19 361.562 351.307C361.472 351.345 361.375 351.364 361.277 351.364H358.322C358.318 351.294 358.318 351.228 358.318 351.158C358.317 351.089 358.319 351.02 358.326 350.952C358.402 349.632 359.214 348.468 360.427 347.943V347.175C357.729 346.748 355.888 344.214 356.315 341.516C356.318 341.497 356.321 341.478 356.325 341.46C356.345 341.32 356.374 341.183 356.411 341.047H361.277C361.693 341.048 362.031 341.386 362.032 341.802Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M360.864 341.461H356.324C355.865 344.154 357.677 346.71 360.37 347.168C360.452 347.182 360.534 347.194 360.616 347.204C359.337 347.81 358.404 349.533 358.325 350.953C358.318 351.022 358.315 351.09 358.317 351.159C358.317 351.23 358.317 351.296 358.321 351.366C358.328 351.504 358.346 351.642 358.375 351.778H360.863C361.169 351.776 361.444 351.591 361.561 351.308C361.599 351.218 361.618 351.121 361.618 351.023V342.216C361.617 341.8 361.28 341.463 360.864 341.461Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M360.864 341.461H356.325C355.866 344.155 357.678 346.71 360.372 347.168C360.427 347.178 360.482 347.186 360.537 347.194C359.299 347.844 358.404 349.563 358.326 350.953H360.864C361.28 350.95 361.616 350.614 361.62 350.198V342.216C361.618 341.8 361.281 341.463 360.864 341.461Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M360.451 341.461H356.324C355.892 344.004 357.485 346.453 359.985 347.087C359.038 348.168 358.458 349.522 358.326 350.953H360.451C360.868 350.951 361.205 350.614 361.207 350.198V342.216C361.206 341.799 360.868 341.461 360.451 341.461Z"
            fill="black"
          />
          <path
            d="M352.884 341.461H360.45C360.868 341.461 361.207 341.8 361.207 342.217V349.784C361.207 350.202 360.868 350.54 360.45 350.54H352.884C352.466 350.54 352.127 350.202 352.127 349.784V342.217C352.127 341.8 352.466 341.461 352.884 341.461Z"
            fill="url(#paint4_linear_12001_294)"
          />
          <path
            d="M355.506 345.908C355.328 345.791 355.18 345.634 355.073 345.451C354.968 345.259 354.916 345.043 354.922 344.825C354.913 344.529 355.012 344.24 355.202 344.014C355.402 343.787 355.659 343.618 355.948 343.527C356.276 343.419 356.62 343.366 356.966 343.37C357.42 343.353 357.874 343.417 358.307 343.558V344.507C358.119 344.393 357.914 344.309 357.7 344.259C357.468 344.202 357.23 344.174 356.991 344.174C356.739 344.165 356.488 344.218 356.262 344.328C356.176 344.365 356.103 344.427 356.052 344.504C356 344.582 355.973 344.673 355.973 344.767C355.972 344.882 356.016 344.994 356.097 345.077C356.191 345.175 356.303 345.255 356.427 345.313C356.564 345.382 356.771 345.473 357.046 345.586C357.076 345.596 357.106 345.608 357.134 345.622C357.405 345.728 357.666 345.857 357.915 346.007C358.103 346.123 358.261 346.282 358.376 346.472C358.494 346.686 358.551 346.929 358.541 347.173C358.555 347.477 358.462 347.775 358.279 348.018C358.096 348.24 357.852 348.405 357.577 348.49C357.254 348.591 356.916 348.64 356.577 348.635C356.273 348.636 355.969 348.612 355.669 348.561C355.416 348.519 355.169 348.447 354.933 348.344V347.344C355.158 347.504 355.41 347.624 355.676 347.699C355.942 347.781 356.218 347.826 356.496 347.83C356.753 347.846 357.01 347.792 357.238 347.672C357.317 347.628 357.382 347.563 357.427 347.485C357.471 347.406 357.494 347.317 357.492 347.227C357.492 347.164 357.48 347.101 357.456 347.042C357.432 346.984 357.396 346.931 357.352 346.886C357.239 346.775 357.108 346.684 356.965 346.616C356.8 346.534 356.557 346.425 356.236 346.29C355.98 346.187 355.736 346.059 355.506 345.908Z"
            fill="white"
          />
          {/* SharePoint Traveling Circle */}
          <g id="sharepoint-circle" filter="url(#filter2_f_12001_294)">
            <circle cx="398" cy="346" r="8" fill="#1A9BA1" fillOpacity="0.5" />
          </g>
          <circle
            id="sharepoint-circle-inner"
            cx="398"
            cy="346"
            r="4"
            fill="#1A9BA1"
          />
          <circle
            id="sharepoint-circle-stroke"
            cx="398"
            cy="346"
            r="4.5"
            stroke="white"
            strokeOpacity="0.8"
          />
        </g>
        {/* Notion Traveling Path */}
        <path
          ref={notionPathRef}
          id="notion-travel-path"
          d="M732 237L687.873 237C666.447 237 645.15 240.31 624.735 246.814L570.207 264.186C549.792 270.69 528.495 274 507.069 274L328 274"
          stroke="url(#paint6_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Notion travel path glow */}
        <path
          id="notion-travel-path-glow"
          d="M732 237L687.873 237C666.447 237 645.15 240.31 624.735 246.814L570.207 264.186C549.792 270.69 528.495 274 507.069 274L328 274"
          stroke="url(#paint6_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Notion Item */}
        <g id="notion-item">
          <rect
            x="190.5"
            y="246.5"
            width="137"
            height="55"
            rx="27.5"
            fill="#F8FAFC"
          />
          <rect
            x="190.5"
            y="246.5"
            width="137"
            height="55"
            rx="27.5"
            stroke="#F1F5F9"
          />
          <path
            d="M224.141 280H222.685L216.829 271.12V280H215.373V268.832H216.829L222.685 277.696V268.832H224.141V280ZM230.447 280.144C229.625 280.144 228.879 279.957 228.207 279.584C227.545 279.211 227.023 278.683 226.639 278C226.265 277.307 226.079 276.507 226.079 275.6C226.079 274.704 226.271 273.915 226.655 273.232C227.049 272.539 227.583 272.011 228.255 271.648C228.927 271.275 229.679 271.088 230.511 271.088C231.343 271.088 232.095 271.275 232.767 271.648C233.439 272.011 233.967 272.533 234.351 273.216C234.745 273.899 234.943 274.693 234.943 275.6C234.943 276.507 234.74 277.307 234.335 278C233.94 278.683 233.401 279.211 232.719 279.584C232.036 279.957 231.279 280.144 230.447 280.144ZM230.447 278.864C230.969 278.864 231.46 278.741 231.919 278.496C232.377 278.251 232.745 277.883 233.023 277.392C233.311 276.901 233.455 276.304 233.455 275.6C233.455 274.896 233.316 274.299 233.039 273.808C232.761 273.317 232.399 272.955 231.951 272.72C231.503 272.475 231.017 272.352 230.495 272.352C229.961 272.352 229.471 272.475 229.023 272.72C228.585 272.955 228.233 273.317 227.967 273.808C227.7 274.299 227.567 274.896 227.567 275.6C227.567 276.315 227.695 276.917 227.951 277.408C228.217 277.899 228.569 278.267 229.007 278.512C229.444 278.747 229.924 278.864 230.447 278.864ZM238.633 272.432V277.6C238.633 278.027 238.724 278.331 238.905 278.512C239.086 278.683 239.401 278.768 239.849 278.768H240.921V280H239.609C238.798 280 238.19 279.813 237.785 279.44C237.38 279.067 237.177 278.453 237.177 277.6V272.432H236.041V271.232H237.177V269.024H238.633V271.232H240.921V272.432H238.633ZM243.437 269.808C243.16 269.808 242.925 269.712 242.733 269.52C242.541 269.328 242.445 269.093 242.445 268.816C242.445 268.539 242.541 268.304 242.733 268.112C242.925 267.92 243.16 267.824 243.437 267.824C243.704 267.824 243.928 267.92 244.109 268.112C244.301 268.304 244.397 268.539 244.397 268.816C244.397 269.093 244.301 269.328 244.109 269.52C243.928 269.712 243.704 269.808 243.437 269.808ZM244.141 271.232V280H242.685V271.232H244.141ZM250.447 280.144C249.625 280.144 248.879 279.957 248.207 279.584C247.545 279.211 247.023 278.683 246.639 278C246.265 277.307 246.079 276.507 246.079 275.6C246.079 274.704 246.271 273.915 246.655 273.232C247.049 272.539 247.583 272.011 248.255 271.648C248.927 271.275 249.679 271.088 250.511 271.088C251.343 271.088 252.095 271.275 252.767 271.648C253.439 272.011 253.967 272.533 254.351 273.216C254.745 273.899 254.943 274.693 254.943 275.6C254.943 276.507 254.74 277.307 254.335 278C253.94 278.683 253.401 279.211 252.719 279.584C252.036 279.957 251.279 280.144 250.447 280.144ZM250.447 278.864C250.969 278.864 251.46 278.741 251.919 278.496C252.377 278.251 252.745 277.883 253.023 277.392C253.311 276.901 253.455 276.304 253.455 275.6C253.455 274.896 253.316 274.299 253.039 273.808C252.761 273.317 252.399 272.955 251.951 272.72C251.503 272.475 251.017 272.352 250.495 272.352C249.961 272.352 249.471 272.475 249.023 272.72C248.585 272.955 248.233 273.317 247.967 273.808C247.7 274.299 247.567 274.896 247.567 275.6C247.567 276.315 247.695 276.917 247.951 277.408C248.217 277.899 248.569 278.267 249.007 278.512C249.444 278.747 249.924 278.864 250.447 278.864ZM261.129 271.072C262.196 271.072 263.06 271.397 263.721 272.048C264.382 272.688 264.713 273.616 264.713 274.832V280H263.273V275.04C263.273 274.165 263.054 273.499 262.617 273.04C262.18 272.571 261.582 272.336 260.825 272.336C260.057 272.336 259.444 272.576 258.985 273.056C258.537 273.536 258.313 274.235 258.313 275.152V280H256.857V271.232H258.313V272.48C258.601 272.032 258.99 271.685 259.481 271.44C259.982 271.195 260.532 271.072 261.129 271.072Z"
            fill="#020617"
          />
          <g clipPath="url(#clip1_12001_294)">
            <path
              d="M282.83 265.558C283.638 266.215 283.942 266.165 285.46 266.063L299.777 265.204C300.08 265.204 299.828 264.901 299.727 264.851L297.348 263.132C296.893 262.779 296.285 262.373 295.122 262.474L281.26 263.486C280.756 263.536 280.654 263.789 280.855 263.991L282.83 265.558ZM283.689 268.895V283.958C283.689 284.767 284.093 285.07 285.004 285.019L300.738 284.109C301.649 284.06 301.751 283.503 301.751 282.845V267.883C301.751 267.227 301.498 266.872 300.94 266.922L284.498 267.883C283.892 267.934 283.689 268.239 283.689 268.895ZM299.221 269.702C299.322 270.157 299.221 270.612 298.766 270.664L298.008 270.816V281.935C297.349 282.289 296.742 282.492 296.236 282.492C295.426 282.492 295.223 282.238 294.617 281.481L289.658 273.696V281.228L291.227 281.583C291.227 281.583 291.227 282.493 289.962 282.493L286.471 282.695C286.37 282.493 286.471 281.987 286.825 281.886L287.735 281.634V271.675L286.473 271.573C286.372 271.118 286.625 270.462 287.332 270.411L291.076 270.158L296.237 278.044V271.067L294.921 270.917C294.82 270.36 295.225 269.956 295.73 269.906L299.221 269.702ZM280.097 262.121L294.516 261.059C296.286 260.908 296.742 261.008 297.855 261.818L302.458 265.052C303.216 265.608 303.47 265.76 303.47 266.367V284.109C303.47 285.221 303.066 285.88 301.65 285.979L284.904 286.991C283.842 287.042 283.335 286.89 282.778 286.182L279.388 281.783C278.782 280.974 278.529 280.369 278.529 279.66V263.889C278.529 262.98 278.934 262.221 280.097 262.121Z"
              fill="black"
            />
          </g>
          {/* Notion Traveling Circle */}
          <g id="notion-circle" filter="url(#filter3_f_12001_294)">
            <circle cx="328" cy="274" r="8" fill="black" fillOpacity="0.5" />
          </g>
          <circle
            id="notion-circle-inner"
            cx="328"
            cy="274"
            r="4"
            fill="black"
          />
          <circle
            id="notion-circle-stroke"
            cx="328"
            cy="274"
            r="4.5"
            stroke="white"
            strokeOpacity="0.8"
          />
        </g>
        {/* Jira Traveling Path */}
        <path
          ref={jiraPathRef}
          id="jira-travel-path"
          d="M732 237L691.995 237C667.876 237 643.941 241.195 621.259 249.397L573.682 266.603C551.001 274.805 527.065 279 502.946 279L470 279"
          stroke="url(#paint9_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Jira travel path glow */}
        <path
          id="jira-travel-path-glow"
          d="M732 237L691.995 237C667.876 237 643.941 241.195 621.259 249.397L573.682 266.603C551.001 274.805 527.065 279 502.946 279L470 279"
          stroke="url(#paint9_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Jira item */}
        <g id="jira-item">
          <rect
            x="355.5"
            y="251.5"
            width="115"
            height="55"
            rx="27.5"
            fill="#F8FAFC"
          />
          <rect
            x="355.5"
            y="251.5"
            width="115"
            height="55"
            rx="27.5"
            stroke="#F1F5F9"
          />
          <path
            d="M386.246 273.848V282.088C386.246 283.005 385.964 283.741 385.398 284.296C384.833 284.84 384.086 285.112 383.158 285.112C382.22 285.112 381.468 284.835 380.902 284.28C380.337 283.715 380.054 282.947 380.054 281.976H381.51C381.521 282.52 381.66 282.963 381.926 283.304C382.204 283.645 382.614 283.816 383.158 283.816C383.702 283.816 384.108 283.656 384.374 283.336C384.641 283.005 384.774 282.589 384.774 282.088V273.848H386.246ZM389.867 274.808C389.589 274.808 389.355 274.712 389.163 274.52C388.971 274.328 388.875 274.093 388.875 273.816C388.875 273.539 388.971 273.304 389.163 273.112C389.355 272.92 389.589 272.824 389.867 272.824C390.133 272.824 390.357 272.92 390.539 273.112C390.731 273.304 390.827 273.539 390.827 273.816C390.827 274.093 390.731 274.328 390.539 274.52C390.357 274.712 390.133 274.808 389.867 274.808ZM390.571 276.232V285H389.115V276.232H390.571ZM394.508 277.656C394.764 277.155 395.127 276.765 395.596 276.488C396.076 276.211 396.658 276.072 397.34 276.072V277.576H396.956C395.324 277.576 394.508 278.461 394.508 280.232V285H393.052V276.232H394.508V277.656ZM398.477 280.584C398.477 279.688 398.658 278.904 399.021 278.232C399.384 277.549 399.88 277.021 400.509 276.648C401.149 276.275 401.858 276.088 402.637 276.088C403.405 276.088 404.072 276.253 404.637 276.584C405.202 276.915 405.624 277.331 405.901 277.832V276.232H407.373V285H405.901V283.368C405.613 283.88 405.181 284.307 404.605 284.648C404.04 284.979 403.378 285.144 402.621 285.144C401.842 285.144 401.138 284.952 400.509 284.568C399.88 284.184 399.384 283.645 399.021 282.952C398.658 282.259 398.477 281.469 398.477 280.584ZM405.901 280.6C405.901 279.939 405.768 279.363 405.501 278.872C405.234 278.381 404.872 278.008 404.413 277.752C403.965 277.485 403.469 277.352 402.925 277.352C402.381 277.352 401.885 277.48 401.437 277.736C400.989 277.992 400.632 278.365 400.365 278.856C400.098 279.347 399.965 279.923 399.965 280.584C399.965 281.256 400.098 281.843 400.365 282.344C400.632 282.835 400.989 283.213 401.437 283.48C401.885 283.736 402.381 283.864 402.925 283.864C403.469 283.864 403.965 283.736 404.413 283.48C404.872 283.213 405.234 282.835 405.501 282.344C405.768 281.843 405.901 281.261 405.901 280.6Z"
            fill="#020617"
          />
          <path
            d="M444.638 268.785H433.458C433.458 270.124 433.99 271.407 434.937 272.354C435.883 273.3 437.167 273.832 438.505 273.832H440.564V275.82C440.566 278.604 442.823 280.861 445.607 280.863V269.755C445.607 269.219 445.173 268.785 444.638 268.785Z"
            fill="#2684FF"
          />
          <path
            d="M439.106 274.355H427.927C427.929 277.14 430.186 279.397 432.97 279.399H435.03V281.393C435.033 284.178 437.292 286.433 440.076 286.433V275.325C440.076 274.79 439.642 274.355 439.106 274.355Z"
            fill="url(#paint7_linear_12001_294)"
          />
          <path
            d="M433.572 279.922H422.393C422.393 282.709 424.652 284.968 427.439 284.968H429.505V286.956C429.507 289.738 431.759 291.994 434.542 292V280.892C434.542 280.356 434.107 279.922 433.572 279.922Z"
            fill="url(#paint8_linear_12001_294)"
          />
          {/* Jira Traveling Circle */}
          <g id="jira-circle" filter="url(#filter4_f_12001_294)">
            <circle cx="469" cy="279" r="8" fill="#0526AA" fillOpacity="0.5" />
          </g>
          <circle
            id="jira-circle-inner"
            cx="469"
            cy="279"
            r="4"
            fill="#2684FF"
          />
          <circle
            id="jira-circle-stroke"
            cx="469"
            cy="279"
            r="4.5"
            stroke="white"
            strokeOpacity="0.8"
          />
        </g>
        {/* ServiceNow Traveling Path */}
        <path
          ref={servicenowPathRef}
          id="servicenow-travel-path"
          d="M732 237L675.939 237C662.373 237 648.839 235.673 635.532 233.037L559.41 217.963C546.102 215.327 532.569 214 519.003 214L208 214"
          stroke="url(#paint10_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* ServiceNow travel path glow */}
        <path
          id="servicenow-travel-path-glow"
          d="M732 237L675.939 237C662.373 237 648.839 235.673 635.532 233.037L559.41 217.963C546.102 215.327 532.569 214 519.003 214L208 214"
          stroke="url(#paint10_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* ServiceNow Item */}
        <g id="servicenow-item">
          <rect
            x="78.3571"
            y="194.357"
            width="128.571"
            height="39.2857"
            rx="19.6429"
            fill="#F8FAFC"
          />
          <rect
            x="78.3571"
            y="194.357"
            width="128.571"
            height="39.2857"
            rx="19.6429"
            stroke="#F1F5F9"
            strokeWidth="0.714286"
          />
          <path
            d="M98.6545 218.58C98.1288 218.58 97.6564 218.489 97.2374 218.306C96.826 218.115 96.5021 217.856 96.266 217.529C96.0298 217.193 95.9079 216.809 95.9002 216.374H97.0088C97.0469 216.748 97.1993 217.064 97.466 217.323C97.7402 217.574 98.1364 217.7 98.6545 217.7C99.1498 217.7 99.5383 217.578 99.8202 217.334C100.11 217.083 100.255 216.763 100.255 216.374C100.255 216.07 100.171 215.822 100.003 215.631C99.8355 215.441 99.626 215.296 99.3745 215.197C99.1231 215.098 98.7841 214.991 98.3574 214.877C97.8317 214.74 97.4088 214.603 97.0888 214.466C96.7764 214.329 96.506 214.115 96.2774 213.826C96.0564 213.529 95.946 213.132 95.946 212.637C95.946 212.203 96.0564 211.818 96.2774 211.483C96.4983 211.148 96.8069 210.889 97.2031 210.706C97.6069 210.523 98.0679 210.431 98.586 210.431C99.3326 210.431 99.9421 210.618 100.415 210.991C100.895 211.365 101.165 211.86 101.226 212.477H100.083C100.045 212.172 99.885 211.906 99.6031 211.677C99.3212 211.441 98.9479 211.323 98.4831 211.323C98.0488 211.323 97.6945 211.437 97.4202 211.666C97.146 211.887 97.0088 212.199 97.0088 212.603C97.0088 212.892 97.0888 213.129 97.2488 213.311C97.4164 213.494 97.6183 213.635 97.8545 213.734C98.0983 213.826 98.4374 213.932 98.8717 214.054C99.3974 214.199 99.8202 214.344 100.14 214.489C100.46 214.626 100.735 214.843 100.963 215.14C101.192 215.43 101.306 215.826 101.306 216.329C101.306 216.717 101.203 217.083 100.997 217.426C100.792 217.769 100.487 218.047 100.083 218.26C99.6793 218.473 99.2031 218.58 98.6545 218.58ZM108.551 215.129C108.551 215.327 108.539 215.536 108.516 215.757H103.511C103.549 216.374 103.758 216.858 104.139 217.209C104.528 217.551 104.996 217.723 105.545 217.723C105.994 217.723 106.368 217.62 106.665 217.414C106.97 217.201 107.183 216.919 107.305 216.569H108.425C108.257 217.17 107.922 217.662 107.419 218.043C106.916 218.416 106.292 218.603 105.545 218.603C104.951 218.603 104.417 218.47 103.945 218.203C103.48 217.936 103.114 217.559 102.848 217.071C102.581 216.576 102.448 216.005 102.448 215.357C102.448 214.71 102.577 214.142 102.836 213.654C103.095 213.167 103.457 212.793 103.922 212.534C104.394 212.268 104.935 212.134 105.545 212.134C106.139 212.134 106.665 212.264 107.122 212.523C107.579 212.782 107.93 213.14 108.174 213.597C108.425 214.047 108.551 214.557 108.551 215.129ZM107.476 214.911C107.476 214.515 107.389 214.176 107.214 213.894C107.038 213.605 106.798 213.388 106.494 213.243C106.196 213.09 105.865 213.014 105.499 213.014C104.974 213.014 104.524 213.182 104.151 213.517C103.785 213.852 103.575 214.317 103.522 214.911H107.476ZM110.963 213.254C111.146 212.896 111.405 212.618 111.741 212.42C112.083 212.222 112.499 212.123 112.986 212.123V213.197H112.712C111.546 213.197 110.963 213.83 110.963 215.094V218.5H109.923V212.237H110.963V213.254ZM116.518 217.54L118.461 212.237H119.57L117.113 218.5H115.901L113.444 212.237H114.564L116.518 217.54ZM121.13 211.22C120.932 211.22 120.765 211.151 120.627 211.014C120.49 210.877 120.422 210.71 120.422 210.511C120.422 210.313 120.49 210.146 120.627 210.009C120.765 209.871 120.932 209.803 121.13 209.803C121.321 209.803 121.481 209.871 121.61 210.009C121.747 210.146 121.816 210.313 121.816 210.511C121.816 210.71 121.747 210.877 121.61 211.014C121.481 211.151 121.321 211.22 121.13 211.22ZM121.633 212.237V218.5H120.593V212.237H121.633ZM123.017 215.357C123.017 214.71 123.147 214.146 123.406 213.666C123.665 213.178 124.023 212.801 124.48 212.534C124.945 212.268 125.474 212.134 126.068 212.134C126.838 212.134 127.47 212.321 127.966 212.694C128.468 213.068 128.8 213.586 128.96 214.249H127.84C127.733 213.868 127.524 213.567 127.211 213.346C126.907 213.125 126.526 213.014 126.068 213.014C125.474 213.014 124.994 213.22 124.628 213.631C124.263 214.035 124.08 214.61 124.08 215.357C124.08 216.111 124.263 216.694 124.628 217.106C124.994 217.517 125.474 217.723 126.068 217.723C126.526 217.723 126.907 217.616 127.211 217.403C127.516 217.19 127.726 216.885 127.84 216.489H128.96C128.792 217.129 128.457 217.643 127.954 218.031C127.451 218.412 126.823 218.603 126.068 218.603C125.474 218.603 124.945 218.47 124.48 218.203C124.023 217.936 123.665 217.559 123.406 217.071C123.147 216.584 123.017 216.012 123.017 215.357ZM136.062 215.129C136.062 215.327 136.05 215.536 136.028 215.757H131.022C131.06 216.374 131.269 216.858 131.65 217.209C132.039 217.551 132.508 217.723 133.056 217.723C133.506 217.723 133.879 217.62 134.176 217.414C134.481 217.201 134.694 216.919 134.816 216.569H135.936C135.769 217.17 135.433 217.662 134.93 218.043C134.428 218.416 133.803 218.603 133.056 218.603C132.462 218.603 131.929 218.47 131.456 218.203C130.991 217.936 130.626 217.559 130.359 217.071C130.092 216.576 129.959 216.005 129.959 215.357C129.959 214.71 130.089 214.142 130.348 213.654C130.607 213.167 130.969 212.793 131.433 212.534C131.906 212.268 132.447 212.134 133.056 212.134C133.65 212.134 134.176 212.264 134.633 212.523C135.09 212.782 135.441 213.14 135.685 213.597C135.936 214.047 136.062 214.557 136.062 215.129ZM134.988 214.911C134.988 214.515 134.9 214.176 134.725 213.894C134.549 213.605 134.309 213.388 134.005 213.243C133.708 213.09 133.376 213.014 133.01 213.014C132.485 213.014 132.035 213.182 131.662 213.517C131.296 213.852 131.087 214.317 131.033 214.911H134.988ZM146.744 218.5H145.704L141.521 212.157V218.5H140.481V210.523H141.521L145.704 216.854V210.523H146.744V218.5ZM151.249 218.603C150.662 218.603 150.129 218.47 149.649 218.203C149.176 217.936 148.803 217.559 148.529 217.071C148.262 216.576 148.129 216.005 148.129 215.357C148.129 214.717 148.266 214.153 148.54 213.666C148.822 213.17 149.203 212.793 149.683 212.534C150.163 212.268 150.7 212.134 151.294 212.134C151.889 212.134 152.426 212.268 152.906 212.534C153.386 212.793 153.763 213.167 154.037 213.654C154.319 214.142 154.46 214.71 154.46 215.357C154.46 216.005 154.315 216.576 154.026 217.071C153.744 217.559 153.359 217.936 152.871 218.203C152.384 218.47 151.843 218.603 151.249 218.603ZM151.249 217.689C151.622 217.689 151.972 217.601 152.3 217.426C152.628 217.25 152.891 216.988 153.089 216.637C153.294 216.287 153.397 215.86 153.397 215.357C153.397 214.854 153.298 214.428 153.1 214.077C152.902 213.727 152.643 213.468 152.323 213.3C152.003 213.125 151.656 213.037 151.283 213.037C150.902 213.037 150.551 213.125 150.231 213.3C149.919 213.468 149.668 213.727 149.477 214.077C149.287 214.428 149.191 214.854 149.191 215.357C149.191 215.868 149.283 216.298 149.466 216.649C149.656 216.999 149.908 217.262 150.22 217.437C150.532 217.605 150.875 217.689 151.249 217.689ZM164.17 212.237L162.216 218.5H161.142L159.633 213.529L158.125 218.5H157.05L155.085 212.237H156.147L157.587 217.494L159.142 212.237H160.205L161.725 217.506L163.142 212.237H164.17Z"
            fill="#020617"
          />
          <g clipPath="url(#clip2_12001_294)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M181.871 206.586C177.307 206.586 173.577 210.269 173.577 214.833C173.577 217.103 174.504 219.304 176.172 220.856C176.751 221.412 177.654 221.459 178.303 220.972C180.388 219.42 183.261 219.42 185.345 220.972C185.994 221.459 186.898 221.412 187.477 220.856C190.79 217.706 190.928 212.47 187.778 209.157C186.249 207.536 184.095 206.609 181.871 206.586ZM181.824 218.98C179.6 219.049 177.747 217.289 177.701 215.088C177.701 215.018 177.701 214.949 177.701 214.879C177.701 212.609 179.554 210.756 181.824 210.756C184.095 210.756 185.948 212.609 185.948 214.879C186.017 217.103 184.257 218.933 182.056 219.003C181.963 218.98 181.894 218.98 181.824 218.98Z"
              fill="#62D84E"
            />
          </g>
          {/* ServiceNow Traveling Circle */}
          <g id="servicenow-circle" filter="url(#filter5_f_12001_294)">
            <circle
              cx="207.286"
              cy="213.999"
              r="5.71429"
              fill="#62D84E"
              fillOpacity="0.5"
            />
          </g>
          <circle
            id="servicenow-circle-inner"
            cx="207.286"
            cy="214"
            r="2.85714"
            fill="#62D84E"
          />
          <circle
            id="servicenow-circle-stroke"
            cx="207.286"
            cy="214"
            r="3.21429"
            stroke="white"
            strokeOpacity="0.8"
            strokeWidth="0.714286"
          />
        </g>

        {/* SAP Traveling Path */}
        <path
          ref={sapPathRef}
          id="sap-travel-path"
          d="M732 233L686.047 233C669.953 233 653.921 230.789 638.422 226.433L567.578 207.567C552.079 203.211 536.047 201 519.953 201L395 201"
          stroke="url(#paint_sap_path_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* SAP travel path glow */}
        <path
          id="sap-travel-path-glow"
          d="M732 233L686.047 233C669.953 233 653.921 230.789 638.422 226.433L567.578 207.567C552.079 203.211 536.047 201 519.953 201L395 201"
          stroke="url(#paint_sap_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* SAP Item */}
        <g id="sap-item">
          <rect
            x="275.5"
            y="174.5"
            width="119"
            height="55"
            rx="27.5"
            fill="#F8FAFC"
          />
          <rect
            x="275.5"
            y="174.5"
            width="119"
            height="55"
            rx="27.5"
            stroke="#F1F5F9"
          />
          <path
            d="M304.049 208.112C303.313 208.112 302.652 207.984 302.065 207.728C301.489 207.461 301.036 207.099 300.705 206.64C300.375 206.171 300.204 205.632 300.193 205.024H301.745C301.799 205.547 302.012 205.989 302.385 206.352C302.769 206.704 303.324 206.88 304.049 206.88C304.743 206.88 305.287 206.709 305.681 206.368C306.087 206.016 306.289 205.568 306.289 205.024C306.289 204.597 306.172 204.251 305.937 203.984C305.703 203.717 305.409 203.515 305.057 203.376C304.705 203.237 304.231 203.088 303.633 202.928C302.897 202.736 302.305 202.544 301.857 202.352C301.42 202.16 301.041 201.861 300.721 201.456C300.412 201.04 300.257 200.485 300.257 199.792C300.257 199.184 300.412 198.645 300.721 198.176C301.031 197.707 301.463 197.344 302.017 197.088C302.583 196.832 303.228 196.704 303.953 196.704C304.999 196.704 305.852 196.965 306.513 197.488C307.185 198.011 307.564 198.704 307.649 199.568H306.049C305.996 199.141 305.772 198.768 305.377 198.448C304.983 198.117 304.46 197.952 303.809 197.952C303.201 197.952 302.705 198.112 302.321 198.432C301.937 198.741 301.745 199.179 301.745 199.744C301.745 200.149 301.857 200.48 302.081 200.736C302.316 200.992 302.599 201.189 302.929 201.328C303.271 201.456 303.745 201.605 304.353 201.776C305.089 201.979 305.681 202.181 306.129 202.384C306.577 202.576 306.961 202.88 307.281 203.296C307.601 203.701 307.761 204.256 307.761 204.96C307.761 205.504 307.617 206.016 307.329 206.496C307.041 206.976 306.615 207.365 306.049 207.664C305.484 207.963 304.817 208.112 304.049 208.112ZM316.496 205.52H311.632L310.736 208H309.2L313.232 196.912H314.912L318.928 208H317.392L316.496 205.52ZM316.08 204.336L314.064 198.704L312.048 204.336H316.08ZM328.141 200.112C328.141 201.04 327.821 201.813 327.181 202.432C326.552 203.04 325.586 203.344 324.285 203.344H322.141V208H320.685V196.848H324.285C325.544 196.848 326.498 197.152 327.149 197.76C327.81 198.368 328.141 199.152 328.141 200.112ZM324.285 202.144C325.096 202.144 325.693 201.968 326.077 201.616C326.461 201.264 326.653 200.763 326.653 200.112C326.653 198.736 325.864 198.048 324.285 198.048H322.141V202.144H324.285Z"
            fill="#020617"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M341.596 208.949H356.169L370.432 195.062H341.596V208.949Z"
            fill="url(#paint11_linear_12001_294)"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M358.709 197.673L355.871 197.671V204.241L353.391 197.671H350.932L348.815 203.166C348.59 201.78 347.118 201.302 345.959 200.943C345.195 200.704 344.383 200.352 344.391 199.964C344.397 199.645 344.826 199.348 345.676 199.393C346.247 199.422 346.751 199.467 347.753 199.938L348.739 198.266C347.735 197.795 346.638 197.542 345.524 197.525H345.518C344.31 197.525 343.303 197.906 342.679 198.534C342.247 198.966 342.003 199.544 342 200.146C341.984 200.994 342.303 201.596 342.974 202.075C343.541 202.48 344.266 202.742 344.904 202.935C345.692 203.173 346.336 203.379 346.328 203.82C346.323 203.981 346.256 204.135 346.141 204.251C345.945 204.449 345.643 204.523 345.226 204.53C344.422 204.547 343.826 204.424 342.876 203.878L342 205.573C342.979 206.115 344.086 206.401 345.213 206.405L345.36 206.403C346.356 206.386 347.16 206.11 347.803 205.606C347.839 205.578 347.873 205.549 347.907 205.519L347.622 206.259H350.2L350.633 204.978C351.122 205.136 351.634 205.215 352.149 205.212C352.651 205.215 353.15 205.14 353.628 204.991L354.045 206.259H358.25V203.607H359.167C361.384 203.607 362.696 202.507 362.696 200.666C362.696 198.614 361.422 197.673 358.709 197.673ZM352.149 203.295C351.839 203.297 351.531 203.244 351.239 203.14L352.139 200.376H352.156L353.04 203.148C352.754 203.245 352.452 203.295 352.149 203.295L352.149 203.295ZM358.876 201.707H358.25V199.48H358.876C359.71 199.48 360.375 199.75 360.375 200.579C360.375 201.437 359.71 201.707 358.876 201.707Z"
            fill="white"
          />
          <path
            d="M359.626 208.034C359.632 207.842 359.716 207.66 359.859 207.528C360.003 207.396 360.194 207.325 360.391 207.329C360.588 207.333 360.776 207.413 360.913 207.552C361.05 207.69 361.125 207.875 361.122 208.067C361.12 208.259 361.039 208.443 360.898 208.577C360.758 208.712 360.568 208.787 360.371 208.786C360.173 208.785 359.984 208.708 359.845 208.573C359.705 208.437 359.627 208.253 359.626 208.061C359.626 208.052 359.626 208.043 359.626 208.034ZM360.377 208.935C360.621 208.931 360.853 208.833 361.023 208.663C361.192 208.493 361.286 208.264 361.283 208.027C361.28 207.79 361.181 207.564 361.007 207.398C360.833 207.231 360.599 207.139 360.355 207.141C360.112 207.142 359.879 207.238 359.707 207.406C359.536 207.574 359.439 207.802 359.44 208.039C359.44 208.276 359.537 208.504 359.709 208.672C359.881 208.84 360.114 208.934 360.358 208.935C360.364 208.935 360.371 208.935 360.377 208.935ZM360.182 208.106H360.368L360.647 208.554H360.829L360.524 208.098C360.562 208.098 360.6 208.091 360.634 208.076C360.669 208.062 360.701 208.041 360.727 208.014C360.753 207.987 360.773 207.955 360.786 207.921C360.799 207.886 360.804 207.849 360.802 207.812C360.802 207.609 360.677 207.518 360.427 207.518H360.021V208.554H360.182L360.182 208.106ZM360.182 207.972V207.651H360.402C360.513 207.651 360.632 207.674 360.632 207.803C360.632 207.964 360.511 207.972 360.376 207.972L360.182 207.972Z"
            fill="#0072BC"
          />
          {/* SAP Traveling Circle */}
          <g id="sap-circle" filter="url(#filter6_f_12001_294)">
            <circle cx="395" cy="202" r="8" fill="#049AD8" fillOpacity="0.5" />
          </g>
          <circle
            id="sap-circle-inner"
            cx="395"
            cy="202"
            r="4"
            fill="#049AD8"
          />
          <circle
            id="sap-circle-stroke"
            cx="395"
            cy="202"
            r="4.5"
            stroke="white"
            strokeOpacity="0.8"
          />
        </g>
        {/* Outlook Traveling Path */}
        <path
          ref={outlookPathRef}
          id="outlook-travel-path"
          d="M732 237C697.767 237 664.273 227.047 635.595 208.352L567.179 163.754C533.39 141.727 493.926 130 453.592 130L320 130"
          stroke="url(#paint14_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Outlook travel path glow */}
        <path
          id="outlook-travel-path-glow"
          d="M732 237C697.767 237 664.273 227.047 635.595 208.352L567.179 163.754C533.39 141.727 493.926 130 453.592 130L320 130"
          stroke="url(#paint14_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Outlook Item */}
        <g id="outlook-item">
          <rect
            x="176.5"
            y="102.5"
            width="147"
            height="55"
            rx="27.5"
            fill="#F8FAFC"
          />
          <rect
            x="176.5"
            y="102.5"
            width="147"
            height="55"
            rx="27.5"
            stroke="#F1F5F9"
          />
          <path
            d="M206.647 136.112C205.613 136.112 204.669 135.872 203.815 135.392C202.962 134.901 202.285 134.224 201.783 133.36C201.293 132.485 201.047 131.504 201.047 130.416C201.047 129.328 201.293 128.352 201.783 127.488C202.285 126.613 202.962 125.936 203.815 125.456C204.669 124.965 205.613 124.72 206.647 124.72C207.693 124.72 208.642 124.965 209.495 125.456C210.349 125.936 211.021 126.608 211.511 127.472C212.002 128.336 212.247 129.317 212.247 130.416C212.247 131.515 212.002 132.496 211.511 133.36C211.021 134.224 210.349 134.901 209.495 135.392C208.642 135.872 207.693 136.112 206.647 136.112ZM206.647 134.848C207.426 134.848 208.125 134.667 208.743 134.304C209.373 133.941 209.863 133.424 210.215 132.752C210.578 132.08 210.759 131.301 210.759 130.416C210.759 129.52 210.578 128.741 210.215 128.08C209.863 127.408 209.378 126.891 208.759 126.528C208.141 126.165 207.437 125.984 206.647 125.984C205.858 125.984 205.154 126.165 204.535 126.528C203.917 126.891 203.426 127.408 203.063 128.08C202.711 128.741 202.535 129.52 202.535 130.416C202.535 131.301 202.711 132.08 203.063 132.752C203.426 133.424 203.917 133.941 204.535 134.304C205.165 134.667 205.869 134.848 206.647 134.848ZM221.946 127.232V136H220.49V134.704C220.212 135.152 219.823 135.504 219.322 135.76C218.831 136.005 218.287 136.128 217.69 136.128C217.007 136.128 216.394 135.989 215.85 135.712C215.306 135.424 214.874 134.997 214.554 134.432C214.244 133.867 214.09 133.179 214.09 132.368V127.232H215.53V132.176C215.53 133.04 215.748 133.707 216.186 134.176C216.623 134.635 217.22 134.864 217.978 134.864C218.756 134.864 219.37 134.624 219.818 134.144C220.266 133.664 220.49 132.965 220.49 132.048V127.232H221.946ZM226.18 128.432V133.6C226.18 134.027 226.271 134.331 226.452 134.512C226.633 134.683 226.948 134.768 227.396 134.768H228.468V136H227.156C226.345 136 225.737 135.813 225.332 135.44C224.927 135.067 224.724 134.453 224.724 133.6V128.432H223.588V127.232H224.724V125.024H226.18V127.232H228.468V128.432H226.18ZM231.688 124.16V136H230.232V124.16H231.688ZM237.994 136.144C237.172 136.144 236.426 135.957 235.754 135.584C235.092 135.211 234.57 134.683 234.186 134C233.812 133.307 233.626 132.507 233.626 131.6C233.626 130.704 233.818 129.915 234.202 129.232C234.596 128.539 235.13 128.011 235.802 127.648C236.474 127.275 237.226 127.088 238.058 127.088C238.89 127.088 239.642 127.275 240.314 127.648C240.986 128.011 241.514 128.533 241.898 129.216C242.292 129.899 242.49 130.693 242.49 131.6C242.49 132.507 242.287 133.307 241.882 134C241.487 134.683 240.948 135.211 240.266 135.584C239.583 135.957 238.826 136.144 237.994 136.144ZM237.994 134.864C238.516 134.864 239.007 134.741 239.466 134.496C239.924 134.251 240.292 133.883 240.57 133.392C240.858 132.901 241.002 132.304 241.002 131.6C241.002 130.896 240.863 130.299 240.586 129.808C240.308 129.317 239.946 128.955 239.498 128.72C239.05 128.475 238.564 128.352 238.042 128.352C237.508 128.352 237.018 128.475 236.57 128.72C236.132 128.955 235.78 129.317 235.514 129.808C235.247 130.299 235.114 130.896 235.114 131.6C235.114 132.315 235.242 132.917 235.498 133.408C235.764 133.899 236.116 134.267 236.554 134.512C236.991 134.747 237.471 134.864 237.994 134.864ZM248.228 136.144C247.407 136.144 246.66 135.957 245.988 135.584C245.327 135.211 244.804 134.683 244.42 134C244.047 133.307 243.86 132.507 243.86 131.6C243.86 130.704 244.052 129.915 244.436 129.232C244.831 128.539 245.364 128.011 246.036 127.648C246.708 127.275 247.46 127.088 248.292 127.088C249.124 127.088 249.876 127.275 250.548 127.648C251.22 128.011 251.748 128.533 252.132 129.216C252.527 129.899 252.724 130.693 252.724 131.6C252.724 132.507 252.521 133.307 252.116 134C251.721 134.683 251.183 135.211 250.5 135.584C249.817 135.957 249.06 136.144 248.228 136.144ZM248.228 134.864C248.751 134.864 249.241 134.741 249.7 134.496C250.159 134.251 250.527 133.883 250.804 133.392C251.092 132.901 251.236 132.304 251.236 131.6C251.236 130.896 251.097 130.299 250.82 129.808C250.543 129.317 250.18 128.955 249.732 128.72C249.284 128.475 248.799 128.352 248.276 128.352C247.743 128.352 247.252 128.475 246.804 128.72C246.367 128.955 246.015 129.317 245.748 129.808C245.481 130.299 245.348 130.896 245.348 131.6C245.348 132.315 245.476 132.917 245.732 133.408C245.999 133.899 246.351 134.267 246.788 134.512C247.225 134.747 247.705 134.864 248.228 134.864ZM259.534 136L256.094 132.128V136H254.638V124.16H256.094V131.12L259.47 127.232H261.502L257.374 131.6L261.518 136H259.534Z"
            fill="#020617"
          />
          <path
            d="M296.317 130.433C296.317 130.362 296.299 130.291 296.264 130.229C296.23 130.166 296.179 130.113 296.118 130.076H296.116L296.108 130.072L289.652 126.25C289.624 126.231 289.595 126.214 289.565 126.198C289.442 126.135 289.306 126.102 289.168 126.102C289.029 126.102 288.893 126.135 288.77 126.198C288.74 126.214 288.711 126.231 288.684 126.25L282.227 130.072L282.219 130.076C282.022 130.199 281.961 130.458 282.084 130.655C282.12 130.714 282.17 130.762 282.229 130.797L288.686 134.619C288.714 134.637 288.743 134.654 288.772 134.67C288.895 134.733 289.032 134.767 289.17 134.767C289.308 134.767 289.444 134.733 289.567 134.67C289.597 134.654 289.626 134.637 289.654 134.619L296.11 130.797C296.174 130.76 296.226 130.707 296.263 130.643C296.299 130.579 296.317 130.507 296.317 130.433Z"
            fill="#0A2767"
          />
          <path
            d="M282.979 127.882H287.217V131.766H282.979V127.882ZM295.45 123.934V122.157C295.46 121.713 295.108 121.345 294.664 121.334H283.669C283.225 121.345 282.873 121.713 282.883 122.157V123.934L289.383 125.667L295.45 123.934Z"
            fill="#0364B8"
          />
          <path
            d="M282.883 123.934H287.216V127.834H282.883V123.934Z"
            fill="#0078D4"
          />
          <path
            d="M291.55 123.934H287.217V127.834L291.55 131.734H295.45V127.834L291.55 123.934Z"
            fill="#28A8EA"
          />
          <path
            d="M287.217 127.834H291.55V131.734H287.217V127.834Z"
            fill="#0078D4"
          />
          <path
            d="M287.217 131.732H291.55V135.632H287.217V131.732Z"
            fill="#0364B8"
          />
          <path
            d="M282.979 131.766H287.217V135.296H282.979V131.766Z"
            fill="#14447D"
          />
          <path
            d="M291.55 131.732H295.45V135.632H291.55V131.732Z"
            fill="#0078D4"
          />
          <path
            d="M296.118 130.773L296.11 130.777L289.653 134.409C289.625 134.426 289.596 134.442 289.566 134.457C289.457 134.509 289.338 134.539 289.216 134.544L288.863 134.337C288.834 134.323 288.805 134.306 288.777 134.288L282.233 130.553H282.23L282.016 130.434V137.785C282.02 138.275 282.42 138.67 282.91 138.667H295.436C295.444 138.667 295.45 138.663 295.458 138.663C295.561 138.657 295.664 138.636 295.761 138.6C295.803 138.582 295.844 138.561 295.883 138.537C295.912 138.52 295.962 138.484 295.962 138.484C296.071 138.403 296.16 138.298 296.222 138.177C296.283 138.055 296.316 137.921 296.316 137.785V130.434C296.316 130.503 296.298 130.57 296.263 130.63C296.228 130.69 296.178 130.739 296.118 130.773Z"
            fill="url(#paint12_linear_12001_294)"
          />
          <path
            opacity="0.5"
            d="M295.97 130.404V130.854L289.219 135.503L282.229 130.555C282.229 130.554 282.229 130.553 282.228 130.552C282.227 130.551 282.226 130.551 282.225 130.551L281.584 130.165V129.84L281.848 129.836L282.407 130.157L282.42 130.161L282.468 130.191C282.468 130.191 289.037 133.94 289.054 133.948L289.306 134.096C289.327 134.087 289.349 134.078 289.375 134.07C289.388 134.061 295.897 130.399 295.897 130.399L295.97 130.404Z"
            fill="#0A2767"
          />
          <path
            d="M296.118 130.773L296.11 130.778L289.653 134.409C289.625 134.426 289.596 134.443 289.566 134.458C289.443 134.518 289.307 134.549 289.169 134.549C289.031 134.549 288.895 134.518 288.772 134.458C288.742 134.443 288.713 134.427 288.685 134.409L282.228 130.778L282.22 130.773C282.159 130.74 282.108 130.691 282.072 130.631C282.036 130.571 282.017 130.503 282.016 130.434V137.785C282.019 138.275 282.419 138.67 282.91 138.667H295.423C295.913 138.67 296.313 138.275 296.316 137.785V130.434C296.316 130.503 296.298 130.57 296.263 130.63C296.228 130.69 296.178 130.739 296.118 130.773Z"
            fill="#1490DF"
          />
          <path
            opacity="0.1"
            d="M289.747 134.355L289.651 134.41C289.623 134.427 289.594 134.444 289.564 134.459C289.458 134.511 289.342 134.541 289.223 134.549L291.68 137.454L295.965 138.486C296.083 138.398 296.176 138.281 296.237 138.147L289.747 134.355Z"
            fill="black"
          />
          <path
            opacity="0.05"
            d="M290.185 134.109L289.651 134.41C289.623 134.428 289.594 134.444 289.564 134.459C289.458 134.511 289.342 134.542 289.223 134.549L290.374 137.722L295.966 138.485C296.075 138.404 296.163 138.298 296.224 138.176C296.285 138.055 296.317 137.921 296.317 137.785V137.69L290.185 134.109Z"
            fill="black"
          />
          <path
            d="M282.922 138.667H295.422C295.614 138.668 295.801 138.607 295.957 138.494L288.863 134.338C288.833 134.323 288.804 134.307 288.776 134.289L282.233 130.554H282.23L282.016 130.434V137.76C282.016 138.26 282.421 138.666 282.922 138.667Z"
            fill="#28A8EA"
          />
          <path
            opacity="0.1"
            d="M288.083 125.595V134.838C288.082 135.162 287.885 135.453 287.585 135.575C287.492 135.615 287.391 135.635 287.29 135.635H282.016V125.234H282.883V124.801H287.29C287.728 124.802 288.082 125.157 288.083 125.595Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M287.65 126.029V135.272C287.651 135.376 287.629 135.48 287.585 135.575C287.464 135.872 287.177 136.066 286.857 136.068H282.016V125.234H286.857C286.982 125.233 287.106 125.265 287.216 125.325C287.482 125.459 287.65 125.731 287.65 126.029Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M287.65 126.029V134.405C287.648 134.843 287.294 135.197 286.857 135.201H282.016V125.234H286.857C286.982 125.233 287.106 125.265 287.216 125.325C287.482 125.459 287.65 125.731 287.65 126.029Z"
            fill="black"
          />
          <path
            opacity="0.2"
            d="M287.216 126.029V134.405C287.216 134.843 286.862 135.199 286.423 135.201H282.016V125.234H286.423C286.862 125.235 287.217 125.59 287.216 126.028C287.216 126.028 287.216 126.029 287.216 126.029Z"
            fill="black"
          />
          <path
            d="M278.477 125.234H286.422C286.861 125.234 287.216 125.59 287.216 126.029V133.973C287.216 134.412 286.861 134.768 286.422 134.768H278.477C278.039 134.768 277.683 134.412 277.683 133.973V126.029C277.683 125.59 278.039 125.234 278.477 125.234Z"
            fill="url(#paint13_linear_12001_294)"
          />
          <path
            d="M280.166 128.564C280.362 128.147 280.678 127.798 281.074 127.562C281.512 127.311 282.011 127.186 282.515 127.2C282.983 127.19 283.445 127.309 283.85 127.543C284.23 127.77 284.537 128.103 284.732 128.501C284.945 128.939 285.051 129.422 285.042 129.909C285.052 130.418 284.943 130.923 284.723 131.382C284.523 131.795 284.207 132.139 283.813 132.373C283.393 132.615 282.914 132.737 282.429 132.725C281.951 132.737 281.48 132.617 281.065 132.379C280.681 132.151 280.371 131.818 280.171 131.419C279.957 130.987 279.85 130.51 279.858 130.028C279.849 129.523 279.955 129.023 280.166 128.564ZM281.133 130.917C281.238 131.181 281.415 131.409 281.644 131.577C281.877 131.74 282.157 131.824 282.441 131.817C282.744 131.829 283.043 131.742 283.292 131.569C283.519 131.402 283.691 131.173 283.788 130.909C283.897 130.615 283.95 130.303 283.946 129.989C283.95 129.673 283.899 129.358 283.797 129.058C283.707 128.787 283.54 128.548 283.317 128.37C283.074 128.189 282.776 128.097 282.473 128.11C282.183 128.103 281.897 128.188 281.657 128.353C281.424 128.52 281.244 128.751 281.137 129.018C280.901 129.629 280.899 130.306 281.134 130.918L281.133 130.917Z"
            fill="white"
          />
          <path
            d="M291.55 123.934H295.45V127.834H291.55V123.934Z"
            fill="#50D9FF"
          />
          {/* Outlook Traveling Circle */}
          <g id="outlook-circle" filter="url(#filter7_f_12001_294)">
            <circle cx="324" cy="130" r="8" fill="#28A8EA" fillOpacity="0.5" />
          </g>
          <circle
            id="outlook-circle-inner"
            cx="324"
            cy="130"
            r="4"
            fill="#28A8EA"
          />
          <circle
            id="outlook-circle-stroke"
            cx="324"
            cy="130"
            r="4.5"
            stroke="white"
            strokeOpacity="0.8"
          />
        </g>

        {/* Google Traveling Path */}
        <path
          ref={googlePathRef}
          id="google-travel-path"
          d="M732 237C682.904 229.247 638.647 202.972 608.334 163.58L601.847 155.15C562.472 103.982 501.569 74 437.004 74L194 74"
          stroke="url(#paint15_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Google travel path glow */}
        <path
          id="google-travel-path-glow"
          d="M732 237C682.904 229.247 638.647 202.972 608.334 163.58L601.847 155.15C562.472 103.982 501.569 74 437.004 74L194 74"
          stroke="url(#paint15_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Google Drive Item */}
        <g id="google-drive-item">
          <rect
            x="58.3571"
            y="54.3571"
            width="133.571"
            height="39.2857"
            rx="19.6429"
            fill="#F8FAFC"
          />
          <rect
            x="58.3571"
            y="54.3571"
            width="133.571"
            height="39.2857"
            rx="19.6429"
            stroke="#F1F5F9"
            strokeWidth="0.714286"
          />
          <path
            d="M82.0684 72.8429C81.8475 72.3781 81.5275 72.02 81.1084 71.7686C80.6894 71.5095 80.2017 71.38 79.6456 71.38C79.0894 71.38 78.5865 71.5095 78.137 71.7686C77.6951 72.02 77.3446 72.3857 77.0856 72.8657C76.8341 73.3381 76.7084 73.8867 76.7084 74.5114C76.7084 75.1362 76.8341 75.6848 77.0856 76.1571C77.3446 76.6295 77.6951 76.9952 78.137 77.2543C78.5865 77.5057 79.0894 77.6314 79.6456 77.6314C80.4227 77.6314 81.0627 77.399 81.5656 76.9343C82.0684 76.4695 82.3617 75.841 82.4456 75.0486H79.2684V74.2029H83.5541V75.0029C83.4932 75.6581 83.2875 76.26 82.937 76.8086C82.5865 77.3495 82.1256 77.78 81.5541 78.1C80.9827 78.4124 80.3465 78.5686 79.6456 78.5686C78.9065 78.5686 78.2322 78.3971 77.6227 78.0543C77.0132 77.7038 76.5294 77.22 76.1713 76.6029C75.8208 75.9857 75.6455 75.2886 75.6455 74.5114C75.6455 73.7343 75.8208 73.0371 76.1713 72.42C76.5294 71.7952 77.0132 71.3114 77.6227 70.9686C78.2322 70.6181 78.9065 70.4429 79.6456 70.4429C80.4913 70.4429 81.2379 70.6524 81.8856 71.0714C82.5408 71.4905 83.017 72.081 83.3141 72.8429H82.0684ZM87.6606 78.6029C87.074 78.6029 86.5406 78.4695 86.0606 78.2029C85.5883 77.9362 85.2149 77.559 84.9406 77.0714C84.674 76.5762 84.5406 76.0048 84.5406 75.3571C84.5406 74.7171 84.6778 74.1533 84.9521 73.6657C85.234 73.1705 85.6149 72.7933 86.0949 72.5343C86.5749 72.2676 87.1121 72.1343 87.7064 72.1343C88.3006 72.1343 88.8378 72.2676 89.3178 72.5343C89.7978 72.7933 90.1749 73.1667 90.4492 73.6543C90.7311 74.1419 90.8721 74.7095 90.8721 75.3571C90.8721 76.0048 90.7273 76.5762 90.4378 77.0714C90.1559 77.559 89.7711 77.9362 89.2835 78.2029C88.7959 78.4695 88.2549 78.6029 87.6606 78.6029ZM87.6606 77.6886C88.034 77.6886 88.3844 77.601 88.7121 77.4257C89.0397 77.2505 89.3025 76.9876 89.5006 76.6371C89.7064 76.2867 89.8092 75.86 89.8092 75.3571C89.8092 74.8543 89.7102 74.4276 89.5121 74.0771C89.314 73.7267 89.0549 73.4676 88.7349 73.3C88.4149 73.1248 88.0683 73.0371 87.6949 73.0371C87.314 73.0371 86.9635 73.1248 86.6435 73.3C86.3311 73.4676 86.0797 73.7267 85.8892 74.0771C85.6987 74.4276 85.6035 74.8543 85.6035 75.3571C85.6035 75.8676 85.6949 76.2981 85.8778 76.6486C86.0683 76.999 86.3197 77.2619 86.6321 77.4371C86.9444 77.6048 87.2873 77.6886 87.6606 77.6886ZM94.9709 78.6029C94.3842 78.6029 93.8509 78.4695 93.3709 78.2029C92.8985 77.9362 92.5252 77.559 92.2509 77.0714C91.9842 76.5762 91.8509 76.0048 91.8509 75.3571C91.8509 74.7171 91.988 74.1533 92.2623 73.6657C92.5442 73.1705 92.9252 72.7933 93.4052 72.5343C93.8852 72.2676 94.4223 72.1343 95.0166 72.1343C95.6109 72.1343 96.148 72.2676 96.628 72.5343C97.1081 72.7933 97.4852 73.1667 97.7595 73.6543C98.0414 74.1419 98.1823 74.7095 98.1823 75.3571C98.1823 76.0048 98.0376 76.5762 97.748 77.0714C97.4661 77.559 97.0814 77.9362 96.5938 78.2029C96.1061 78.4695 95.5652 78.6029 94.9709 78.6029ZM94.9709 77.6886C95.3442 77.6886 95.6947 77.601 96.0223 77.4257C96.35 77.2505 96.6128 76.9876 96.8109 76.6371C97.0166 76.2867 97.1195 75.86 97.1195 75.3571C97.1195 74.8543 97.0204 74.4276 96.8223 74.0771C96.6242 73.7267 96.3652 73.4676 96.0452 73.3C95.7252 73.1248 95.3785 73.0371 95.0052 73.0371C94.6242 73.0371 94.2738 73.1248 93.9538 73.3C93.6414 73.4676 93.39 73.7267 93.1995 74.0771C93.009 74.4276 92.9138 74.8543 92.9138 75.3571C92.9138 75.8676 93.0052 76.2981 93.188 76.6486C93.3785 76.999 93.63 77.2619 93.9423 77.4371C94.2547 77.6048 94.5976 77.6886 94.9709 77.6886ZM102.133 72.1343C102.674 72.1343 103.146 72.2524 103.55 72.4886C103.961 72.7248 104.266 73.0219 104.464 73.38V72.2371H105.515V78.6371C105.515 79.2086 105.394 79.7152 105.15 80.1571C104.906 80.6067 104.555 80.9571 104.098 81.2086C103.649 81.46 103.123 81.5857 102.521 81.5857C101.698 81.5857 101.013 81.3914 100.464 81.0029C99.9155 80.6143 99.5917 80.0848 99.4926 79.4143H100.521C100.635 79.7952 100.872 80.1 101.23 80.3286C101.588 80.5648 102.018 80.6829 102.521 80.6829C103.093 80.6829 103.557 80.5038 103.915 80.1457C104.281 79.7876 104.464 79.2848 104.464 78.6371V77.3229C104.258 77.6886 103.954 77.9933 103.55 78.2371C103.146 78.481 102.674 78.6029 102.133 78.6029C101.576 78.6029 101.07 78.4657 100.613 78.1914C100.163 77.9171 99.8088 77.5324 99.5497 77.0371C99.2907 76.5419 99.1612 75.9781 99.1612 75.3457C99.1612 74.7057 99.2907 74.1457 99.5497 73.6657C99.8088 73.1781 100.163 72.801 100.613 72.5343C101.07 72.2676 101.576 72.1343 102.133 72.1343ZM104.464 75.3571C104.464 74.8848 104.369 74.4733 104.178 74.1229C103.988 73.7724 103.729 73.5057 103.401 73.3229C103.081 73.1324 102.727 73.0371 102.338 73.0371C101.95 73.0371 101.595 73.1286 101.275 73.3114C100.955 73.4943 100.7 73.761 100.51 74.1114C100.319 74.4619 100.224 74.8733 100.224 75.3457C100.224 75.8257 100.319 76.2448 100.51 76.6029C100.7 76.9533 100.955 77.2238 101.275 77.4143C101.595 77.5971 101.95 77.6886 102.338 77.6886C102.727 77.6886 103.081 77.5971 103.401 77.4143C103.729 77.2238 103.988 76.9533 104.178 76.6029C104.369 76.2448 104.464 75.8295 104.464 75.3571ZM108.313 70.0429V78.5H107.273V70.0429H108.313ZM115.8 75.1286C115.8 75.3267 115.788 75.5362 115.765 75.7571H110.76C110.798 76.3743 111.007 76.8581 111.388 77.2086C111.777 77.5514 112.245 77.7229 112.794 77.7229C113.244 77.7229 113.617 77.62 113.914 77.4143C114.219 77.201 114.432 76.919 114.554 76.5686H115.674C115.506 77.1705 115.171 77.6619 114.668 78.0429C114.165 78.4162 113.541 78.6029 112.794 78.6029C112.2 78.6029 111.666 78.4695 111.194 78.2029C110.729 77.9362 110.364 77.559 110.097 77.0714C109.83 76.5762 109.697 76.0048 109.697 75.3571C109.697 74.7095 109.826 74.1419 110.085 73.6543C110.345 73.1667 110.706 72.7933 111.171 72.5343C111.644 72.2676 112.185 72.1343 112.794 72.1343C113.388 72.1343 113.914 72.2638 114.371 72.5229C114.828 72.7819 115.179 73.14 115.423 73.5971C115.674 74.0467 115.8 74.5571 115.8 75.1286ZM114.725 74.9114C114.725 74.5152 114.638 74.1762 114.463 73.8943C114.287 73.6048 114.047 73.3876 113.743 73.2429C113.445 73.0905 113.114 73.0143 112.748 73.0143C112.223 73.0143 111.773 73.1819 111.4 73.5171C111.034 73.8524 110.825 74.3171 110.771 74.9114H114.725ZM122.699 70.5343C123.568 70.5343 124.318 70.6981 124.951 71.0257C125.591 71.3457 126.078 71.8067 126.414 72.4086C126.757 73.0105 126.928 73.719 126.928 74.5343C126.928 75.3495 126.757 76.0581 126.414 76.66C126.078 77.2543 125.591 77.7114 124.951 78.0314C124.318 78.3438 123.568 78.5 122.699 78.5H120.219V70.5343H122.699ZM122.699 77.6429C123.728 77.6429 124.513 77.3724 125.054 76.8314C125.595 76.2829 125.865 75.5171 125.865 74.5343C125.865 73.5438 125.591 72.7705 125.042 72.2143C124.501 71.6581 123.72 71.38 122.699 71.38H121.259V77.6429H122.699ZM129.34 73.2543C129.523 72.8962 129.782 72.6181 130.117 72.42C130.46 72.2219 130.875 72.1229 131.363 72.1229V73.1971H131.088C129.923 73.1971 129.34 73.8295 129.34 75.0943V78.5H128.3V72.2371H129.34V73.2543ZM133.1 71.22C132.902 71.22 132.735 71.1514 132.597 71.0143C132.46 70.8771 132.392 70.7095 132.392 70.5114C132.392 70.3133 132.46 70.1457 132.597 70.0086C132.735 69.8714 132.902 69.8029 133.1 69.8029C133.291 69.8029 133.451 69.8714 133.58 70.0086C133.717 70.1457 133.786 70.3133 133.786 70.5114C133.786 70.7095 133.717 70.8771 133.58 71.0143C133.451 71.1514 133.291 71.22 133.1 71.22ZM133.603 72.2371V78.5H132.563V72.2371H133.603ZM137.707 77.54L139.65 72.2371H140.758L138.301 78.5H137.09L134.633 72.2371H135.753L137.707 77.54ZM147.496 75.1286C147.496 75.3267 147.485 75.5362 147.462 75.7571H142.456C142.494 76.3743 142.704 76.8581 143.085 77.2086C143.473 77.5514 143.942 77.7229 144.49 77.7229C144.94 77.7229 145.313 77.62 145.61 77.4143C145.915 77.201 146.129 76.919 146.25 76.5686H147.37C147.203 77.1705 146.868 77.6619 146.365 78.0429C145.862 78.4162 145.237 78.6029 144.49 78.6029C143.896 78.6029 143.363 78.4695 142.89 78.2029C142.426 77.9362 142.06 77.559 141.793 77.0714C141.527 76.5762 141.393 76.0048 141.393 75.3571C141.393 74.7095 141.523 74.1419 141.782 73.6543C142.041 73.1667 142.403 72.7933 142.868 72.5343C143.34 72.2676 143.881 72.1343 144.49 72.1343C145.085 72.1343 145.61 72.2638 146.068 72.5229C146.525 72.7819 146.875 73.14 147.119 73.5971C147.37 74.0467 147.496 74.5571 147.496 75.1286ZM146.422 74.9114C146.422 74.5152 146.334 74.1762 146.159 73.8943C145.984 73.6048 145.744 73.3876 145.439 73.2429C145.142 73.0905 144.81 73.0143 144.445 73.0143C143.919 73.0143 143.47 73.1819 143.096 73.5171C142.73 73.8524 142.521 74.3171 142.468 74.9114H146.422Z"
            fill="#020617"
          />
          <path
            d="M160.048 78.4211L160.659 79.4766C160.786 79.6988 160.968 79.8735 161.183 80.0004L163.365 76.2227H159C159 76.4687 159.063 76.7147 159.19 76.9369L160.048 78.4211Z"
            fill="#0066DA"
          />
          <path
            d="M165.929 71.7778L163.746 68C163.532 68.127 163.349 68.3016 163.222 68.5238L159.19 75.5079C159.066 75.7254 159 75.9716 159 76.2222H163.365L165.929 71.7778Z"
            fill="#00AC47"
          />
          <path
            d="M170.675 80.0004C170.889 79.8735 171.071 79.6988 171.198 79.4766L171.452 79.0401L172.667 76.9369C172.794 76.7147 172.857 76.4687 172.857 76.2227H168.492L169.421 78.0481L170.675 80.0004Z"
            fill="#EA4335"
          />
          <path
            d="M165.929 71.7788L168.111 68.001C167.897 67.874 167.651 67.8105 167.397 67.8105H164.46C164.206 67.8105 163.96 67.882 163.746 68.001L165.929 71.7788Z"
            fill="#00832D"
          />
          <path
            d="M168.492 76.2227H163.365L161.183 80.0004C161.397 80.1274 161.643 80.1909 161.897 80.1909H169.96C170.214 80.1909 170.46 80.1195 170.675 80.0004L168.492 76.2227Z"
            fill="#2684FC"
          />
          <path
            d="M170.651 72.0159L168.635 68.5238C168.508 68.3016 168.326 68.127 168.111 68L165.929 71.7778L168.492 76.2222H172.849C172.849 75.9762 172.786 75.7302 172.659 75.5079L170.651 72.0159Z"
            fill="#FFBA00"
          />
          {/* Google Drive Traveling Circle */}
          <g id="google-circle" filter="url(#filter8_f_12001_294)">
            <circle
              cx="192.286"
              cy="73.9994"
              r="5.71429"
              fill="#FFBA00"
              fillOpacity="0.5"
            />
          </g>
          <circle
            id="google-circle-inner"
            cx="192.286"
            cy="73.9997"
            r="2.85714"
            fill="#FFBA00"
          />
          <circle
            id="google-circle-stroke"
            cx="192.286"
            cy="73.9997"
            r="3.21429"
            stroke="white"
            strokeOpacity="0.8"
            strokeWidth="0.714286"
          />
        </g>

        {/* Slack travel path */}
        <path
          ref={pathRef}
          id="slack-travel-path"
          d="M732 237C683.057 228.512 639.515 200.87 611.009 160.19L601.511 146.636C562.581 91.0807 499.006 58 431.169 58L358 58"
          stroke="url(#paint16_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Slack travel path glow */}
        <path
          id="slack-travel-path-glow"
          d="M732 237C683.057 228.512 639.515 200.87 611.009 160.19L601.511 146.636C562.581 91.0807 499.006 58 431.169 58L358 58"
          stroke="url(#paint16_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Slack Item */}
        <g id="slack-item">
          <rect
            x="233.5"
            y="30.5"
            width="128"
            height="55"
            rx="27.5"
            fill="#F8FAFC"
          />
          <rect
            x="233.5"
            y="30.5"
            width="128"
            height="55"
            rx="27.5"
            stroke="#F1F5F9"
          />
          <path
            d="M262.221 64.112C261.485 64.112 260.824 63.984 260.237 63.728C259.661 63.4613 259.208 63.0987 258.877 62.64C258.546 62.1707 258.376 61.632 258.365 61.024H259.917C259.97 61.5467 260.184 61.9893 260.557 62.352C260.941 62.704 261.496 62.88 262.221 62.88C262.914 62.88 263.458 62.7093 263.853 62.368C264.258 62.016 264.461 61.568 264.461 61.024C264.461 60.5973 264.344 60.2507 264.109 59.984C263.874 59.7173 263.581 59.5147 263.229 59.376C262.877 59.2373 262.402 59.088 261.805 58.928C261.069 58.736 260.477 58.544 260.029 58.352C259.592 58.16 259.213 57.8613 258.893 57.456C258.584 57.04 258.429 56.4853 258.429 55.792C258.429 55.184 258.584 54.6453 258.893 54.176C259.202 53.7067 259.634 53.344 260.189 53.088C260.754 52.832 261.4 52.704 262.125 52.704C263.17 52.704 264.024 52.9653 264.685 53.488C265.357 54.0107 265.736 54.704 265.821 55.568H264.221C264.168 55.1413 263.944 54.768 263.549 54.448C263.154 54.1173 262.632 53.952 261.981 53.952C261.373 53.952 260.877 54.112 260.493 54.432C260.109 54.7413 259.917 55.1787 259.917 55.744C259.917 56.1493 260.029 56.48 260.253 56.736C260.488 56.992 260.77 57.1893 261.101 57.328C261.442 57.456 261.917 57.6053 262.525 57.776C263.261 57.9787 263.853 58.1813 264.301 58.384C264.749 58.576 265.133 58.88 265.453 59.296C265.773 59.7013 265.933 60.256 265.933 60.96C265.933 61.504 265.789 62.016 265.501 62.496C265.213 62.976 264.786 63.3653 264.221 63.664C263.656 63.9627 262.989 64.112 262.221 64.112ZM269.532 52.16V64H268.076V52.16H269.532ZM271.469 59.584C271.469 58.688 271.651 57.904 272.013 57.232C272.376 56.5493 272.872 56.0213 273.501 55.648C274.141 55.2747 274.851 55.088 275.629 55.088C276.397 55.088 277.064 55.2533 277.629 55.584C278.195 55.9147 278.616 56.3307 278.893 56.832V55.232H280.365V64H278.893V62.368C278.605 62.88 278.173 63.3067 277.597 63.648C277.032 63.9787 276.371 64.144 275.613 64.144C274.835 64.144 274.131 63.952 273.501 63.568C272.872 63.184 272.376 62.6453 272.013 61.952C271.651 61.2587 271.469 60.4693 271.469 59.584ZM278.893 59.6C278.893 58.9387 278.76 58.3627 278.493 57.872C278.227 57.3813 277.864 57.008 277.405 56.752C276.957 56.4853 276.461 56.352 275.917 56.352C275.373 56.352 274.877 56.48 274.429 56.736C273.981 56.992 273.624 57.3653 273.357 57.856C273.091 58.3467 272.957 58.9227 272.957 59.584C272.957 60.256 273.091 60.8427 273.357 61.344C273.624 61.8347 273.981 62.2133 274.429 62.48C274.877 62.736 275.373 62.864 275.917 62.864C276.461 62.864 276.957 62.736 277.405 62.48C277.864 62.2133 278.227 61.8347 278.493 61.344C278.76 60.8427 278.893 60.2613 278.893 59.6ZM282.282 59.6C282.282 58.6933 282.463 57.904 282.826 57.232C283.188 56.5493 283.69 56.0213 284.33 55.648C284.98 55.2747 285.722 55.088 286.554 55.088C287.631 55.088 288.516 55.3493 289.21 55.872C289.914 56.3947 290.378 57.12 290.602 58.048H289.034C288.884 57.5147 288.591 57.0933 288.154 56.784C287.727 56.4747 287.194 56.32 286.554 56.32C285.722 56.32 285.05 56.608 284.538 57.184C284.026 57.7493 283.77 58.5547 283.77 59.6C283.77 60.656 284.026 61.472 284.538 62.048C285.05 62.624 285.722 62.912 286.554 62.912C287.194 62.912 287.727 62.7627 288.154 62.464C288.58 62.1653 288.874 61.7387 289.034 61.184H290.602C290.367 62.08 289.898 62.8 289.194 63.344C288.49 63.8773 287.61 64.144 286.554 64.144C285.722 64.144 284.98 63.9573 284.33 63.584C283.69 63.2107 283.188 62.6827 282.826 62C282.463 61.3173 282.282 60.5173 282.282 59.6ZM297.441 64L294.001 60.128V64H292.545V52.16H294.001V59.12L297.377 55.232H299.409L295.281 59.6L299.425 64H297.441Z"
            fill="#020617"
          />
          <g clipPath="url(#clip3_12001_294)">
            <path
              d="M317.468 61.384C317.468 62.8903 316.251 64.1078 314.745 64.1078C313.238 64.1078 312.021 62.8903 312.021 61.384C312.021 59.8776 313.238 58.6602 314.745 58.6602H317.468V61.384ZM318.83 61.384C318.83 59.8776 320.048 58.6602 321.554 58.6602C323.06 58.6602 324.278 59.8776 324.278 61.384V68.1935C324.278 69.6998 323.06 70.9173 321.554 70.9173C320.048 70.9173 318.83 69.6998 318.83 68.1935V61.384Z"
              fill="#E01E5A"
            />
            <path
              d="M321.554 50.4476C320.048 50.4476 318.83 49.2302 318.83 47.7238C318.83 46.2175 320.048 45 321.554 45C323.06 45 324.278 46.2175 324.278 47.7238V50.4476H321.554ZM321.554 51.8302C323.06 51.8302 324.278 53.0476 324.278 54.554C324.278 56.0603 323.06 57.2778 321.554 57.2778H314.724C313.217 57.2778 312 56.0603 312 54.554C312 53.0476 313.217 51.8302 314.724 51.8302H321.554Z"
              fill="#36C5F0"
            />
            <path
              d="M332.47 54.554C332.47 53.0476 333.687 51.8302 335.194 51.8302C336.7 51.8302 337.918 53.0476 337.918 54.554C337.918 56.0603 336.7 57.2778 335.194 57.2778H332.47V54.554ZM331.108 54.554C331.108 56.0603 329.891 57.2778 328.384 57.2778C326.878 57.2778 325.66 56.0603 325.66 54.554V47.7238C325.66 46.2175 326.878 45 328.384 45C329.891 45 331.108 46.2175 331.108 47.7238V54.554Z"
              fill="#2EB67D"
            />
            <path
              d="M328.384 65.4697C329.891 65.4697 331.108 66.6871 331.108 68.1935C331.108 69.6998 329.891 70.9173 328.384 70.9173C326.878 70.9173 325.66 69.6998 325.66 68.1935V65.4697H328.384ZM328.384 64.1078C326.878 64.1078 325.66 62.8903 325.66 61.384C325.66 59.8776 326.878 58.6602 328.384 58.6602H335.214C336.721 58.6602 337.938 59.8776 337.938 61.384C337.938 62.8903 336.721 64.1078 335.214 64.1078H328.384Z"
              fill="#ECB22E"
            />
          </g>
          {/* Slack traveling circle dot */}
          <g id="slack-circle" filter="url(#filter9_f_12001_294)">
            <circle cx="358" cy="58" r="8" fill="#ECB22E" fillOpacity="0.5" />
          </g>
          <circle
            id="slack-circle-inner"
            cx="358"
            cy="58"
            r="4"
            fill="#ECB22E"
          />
          <circle
            id="slack-circle-stroke"
            cx="358"
            cy="58"
            r="4.5"
            stroke="white"
            strokeOpacity="0.8"
          />
        </g>

        {/* 30 other connectors traveling path */}
        <path
          ref={otherPathRef}
          id="other-travel-path"
          d="M732 237C683.075 245.579 639.619 273.384 611.326 314.21L601.441 328.475C562.583 384.547 498.7 418 430.48 418L377 418"
          stroke="url(#paint17_linear_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* Other travel path glow */}
        <path
          id="other-travel-path-glow"
          d="M732 237C683.075 245.579 639.619 273.384 611.326 314.21L601.441 328.475C562.583 384.547 498.7 418 430.48 418L377 418"
          stroke="url(#paint17_glow_12001_294)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        {/* 30 other connectors item */}
        <g id="other-item">
          <rect
            x="158"
            y="390.5"
            width="219"
            height="55"
            rx="27.5"
            fill="#F8FAFC"
          />
          <rect
            x="158"
            y="390.5"
            width="219"
            height="55"
            rx="27.5"
            stroke="#F1F5F9"
          />
          <path
            d="M191.271 418.768H187.863V422.224H186.503V418.768H183.111V417.536H186.503V414.064H187.863V417.536H191.271V418.768ZM193.601 415.344C193.675 414.363 194.054 413.595 194.737 413.04C195.419 412.485 196.305 412.208 197.393 412.208C198.118 412.208 198.742 412.341 199.265 412.608C199.798 412.864 200.198 413.216 200.465 413.664C200.742 414.112 200.881 414.619 200.881 415.184C200.881 415.845 200.689 416.416 200.305 416.896C199.931 417.376 199.441 417.685 198.833 417.824V417.904C199.526 418.075 200.075 418.411 200.481 418.912C200.886 419.413 201.089 420.069 201.089 420.88C201.089 421.488 200.95 422.037 200.673 422.528C200.395 423.008 199.979 423.387 199.425 423.664C198.87 423.941 198.203 424.08 197.425 424.08C196.294 424.08 195.366 423.787 194.641 423.2C193.915 422.603 193.51 421.76 193.425 420.672H194.833C194.907 421.312 195.169 421.835 195.617 422.24C196.065 422.645 196.662 422.848 197.409 422.848C198.155 422.848 198.721 422.656 199.105 422.272C199.499 421.877 199.697 421.371 199.697 420.752C199.697 419.952 199.43 419.376 198.897 419.024C198.363 418.672 197.558 418.496 196.481 418.496H196.113V417.28H196.497C197.478 417.269 198.219 417.109 198.721 416.8C199.222 416.48 199.473 415.989 199.473 415.328C199.473 414.763 199.286 414.309 198.913 413.968C198.55 413.627 198.027 413.456 197.345 413.456C196.683 413.456 196.15 413.627 195.745 413.968C195.339 414.309 195.099 414.768 195.025 415.344H193.601ZM203.055 418.096C203.055 416.261 203.353 414.832 203.951 413.808C204.548 412.773 205.593 412.256 207.087 412.256C208.569 412.256 209.609 412.773 210.207 413.808C210.804 414.832 211.102 416.261 211.102 418.096C211.102 419.963 210.804 421.413 210.207 422.448C209.609 423.483 208.569 424 207.087 424C205.593 424 204.548 423.483 203.951 422.448C203.353 421.413 203.055 419.963 203.055 418.096ZM209.663 418.096C209.663 417.168 209.599 416.384 209.471 415.744C209.353 415.093 209.103 414.571 208.719 414.176C208.345 413.781 207.801 413.584 207.087 413.584C206.361 413.584 205.807 413.781 205.423 414.176C205.049 414.571 204.799 415.093 204.671 415.744C204.553 416.384 204.495 417.168 204.495 418.096C204.495 419.056 204.553 419.861 204.671 420.512C204.799 421.163 205.049 421.685 205.423 422.08C205.807 422.475 206.361 422.672 207.087 422.672C207.801 422.672 208.345 422.475 208.719 422.08C209.103 421.685 209.353 421.163 209.471 420.512C209.599 419.861 209.663 419.056 209.663 418.096ZM221.431 424.144C220.61 424.144 219.863 423.957 219.191 423.584C218.53 423.211 218.007 422.683 217.623 422C217.25 421.307 217.063 420.507 217.063 419.6C217.063 418.704 217.255 417.915 217.639 417.232C218.034 416.539 218.567 416.011 219.239 415.648C219.911 415.275 220.663 415.088 221.495 415.088C222.327 415.088 223.079 415.275 223.751 415.648C224.423 416.011 224.951 416.533 225.335 417.216C225.73 417.899 225.927 418.693 225.927 419.6C225.927 420.507 225.724 421.307 225.319 422C224.924 422.683 224.386 423.211 223.703 423.584C223.02 423.957 222.263 424.144 221.431 424.144ZM221.431 422.864C221.954 422.864 222.444 422.741 222.903 422.496C223.362 422.251 223.73 421.883 224.007 421.392C224.295 420.901 224.439 420.304 224.439 419.6C224.439 418.896 224.3 418.299 224.023 417.808C223.746 417.317 223.383 416.955 222.935 416.72C222.487 416.475 222.002 416.352 221.479 416.352C220.946 416.352 220.455 416.475 220.007 416.72C219.57 416.955 219.218 417.317 218.951 417.808C218.684 418.299 218.551 418.896 218.551 419.6C218.551 420.315 218.679 420.917 218.935 421.408C219.202 421.899 219.554 422.267 219.991 422.512C220.428 422.747 220.908 422.864 221.431 422.864ZM229.617 416.432V421.6C229.617 422.027 229.708 422.331 229.889 422.512C230.071 422.683 230.385 422.768 230.833 422.768H231.905V424H230.593C229.783 424 229.175 423.813 228.769 423.44C228.364 423.067 228.161 422.453 228.161 421.6V416.432H227.025V415.232H228.161V413.024H229.617V415.232H231.905V416.432H229.617ZM238.022 415.072C238.683 415.072 239.28 415.216 239.814 415.504C240.347 415.781 240.763 416.203 241.062 416.768C241.371 417.333 241.526 418.021 241.526 418.832V424H240.086V419.04C240.086 418.165 239.867 417.499 239.43 417.04C238.992 416.571 238.395 416.336 237.638 416.336C236.87 416.336 236.256 416.576 235.798 417.056C235.35 417.536 235.126 418.235 235.126 419.152V424H233.67V412.16H235.126V416.48C235.414 416.032 235.808 415.685 236.31 415.44C236.822 415.195 237.392 415.072 238.022 415.072ZM251.904 419.28C251.904 419.557 251.888 419.851 251.856 420.16H244.848C244.901 421.024 245.195 421.701 245.728 422.192C246.272 422.672 246.928 422.912 247.696 422.912C248.325 422.912 248.848 422.768 249.264 422.48C249.691 422.181 249.989 421.787 250.16 421.296H251.728C251.493 422.139 251.024 422.827 250.32 423.36C249.616 423.883 248.741 424.144 247.696 424.144C246.864 424.144 246.117 423.957 245.456 423.584C244.805 423.211 244.293 422.683 243.92 422C243.547 421.307 243.36 420.507 243.36 419.6C243.36 418.693 243.541 417.899 243.904 417.216C244.267 416.533 244.773 416.011 245.424 415.648C246.085 415.275 246.843 415.088 247.696 415.088C248.528 415.088 249.264 415.269 249.904 415.632C250.544 415.995 251.035 416.496 251.376 417.136C251.728 417.765 251.904 418.48 251.904 419.28ZM250.4 418.976C250.4 418.421 250.277 417.947 250.032 417.552C249.787 417.147 249.451 416.843 249.024 416.64C248.608 416.427 248.144 416.32 247.632 416.32C246.896 416.32 246.267 416.555 245.744 417.024C245.232 417.493 244.939 418.144 244.864 418.976H250.4ZM255.282 416.656C255.538 416.155 255.9 415.765 256.37 415.488C256.85 415.211 257.431 415.072 258.114 415.072V416.576H257.73C256.098 416.576 255.282 417.461 255.282 419.232V424H253.826V415.232H255.282V416.656ZM263.516 419.6C263.516 418.693 263.697 417.904 264.06 417.232C264.423 416.549 264.924 416.021 265.564 415.648C266.215 415.275 266.956 415.088 267.788 415.088C268.865 415.088 269.751 415.349 270.444 415.872C271.148 416.395 271.612 417.12 271.836 418.048H270.268C270.119 417.515 269.825 417.093 269.388 416.784C268.961 416.475 268.428 416.32 267.788 416.32C266.956 416.32 266.284 416.608 265.772 417.184C265.26 417.749 265.004 418.555 265.004 419.6C265.004 420.656 265.26 421.472 265.772 422.048C266.284 422.624 266.956 422.912 267.788 422.912C268.428 422.912 268.961 422.763 269.388 422.464C269.815 422.165 270.108 421.739 270.268 421.184H271.836C271.601 422.08 271.132 422.8 270.428 423.344C269.724 423.877 268.844 424.144 267.788 424.144C266.956 424.144 266.215 423.957 265.564 423.584C264.924 423.211 264.423 422.683 264.06 422C263.697 421.317 263.516 420.517 263.516 419.6ZM277.603 424.144C276.782 424.144 276.035 423.957 275.363 423.584C274.702 423.211 274.179 422.683 273.795 422C273.422 421.307 273.235 420.507 273.235 419.6C273.235 418.704 273.427 417.915 273.811 417.232C274.206 416.539 274.739 416.011 275.411 415.648C276.083 415.275 276.835 415.088 277.667 415.088C278.499 415.088 279.251 415.275 279.923 415.648C280.595 416.011 281.123 416.533 281.507 417.216C281.902 417.899 282.099 418.693 282.099 419.6C282.099 420.507 281.896 421.307 281.491 422C281.096 422.683 280.558 423.211 279.875 423.584C279.192 423.957 278.435 424.144 277.603 424.144ZM277.603 422.864C278.126 422.864 278.616 422.741 279.075 422.496C279.534 422.251 279.902 421.883 280.179 421.392C280.467 420.901 280.611 420.304 280.611 419.6C280.611 418.896 280.472 418.299 280.195 417.808C279.918 417.317 279.555 416.955 279.107 416.72C278.659 416.475 278.174 416.352 277.651 416.352C277.118 416.352 276.627 416.475 276.179 416.72C275.742 416.955 275.39 417.317 275.123 417.808C274.856 418.299 274.723 418.896 274.723 419.6C274.723 420.315 274.851 420.917 275.107 421.408C275.374 421.899 275.726 422.267 276.163 422.512C276.6 422.747 277.08 422.864 277.603 422.864ZM288.285 415.072C289.352 415.072 290.216 415.397 290.877 416.048C291.539 416.688 291.869 417.616 291.869 418.832V424H290.429V419.04C290.429 418.165 290.211 417.499 289.773 417.04C289.336 416.571 288.739 416.336 287.981 416.336C287.213 416.336 286.6 416.576 286.141 417.056C285.693 417.536 285.469 418.235 285.469 419.152V424H284.013V415.232H285.469V416.48C285.757 416.032 286.147 415.685 286.637 415.44C287.139 415.195 287.688 415.072 288.285 415.072ZM298.52 415.072C299.586 415.072 300.45 415.397 301.112 416.048C301.773 416.688 302.104 417.616 302.104 418.832V424H300.664V419.04C300.664 418.165 300.445 417.499 300.008 417.04C299.57 416.571 298.973 416.336 298.216 416.336C297.448 416.336 296.834 416.576 296.376 417.056C295.928 417.536 295.704 418.235 295.704 419.152V424H294.248V415.232H295.704V416.48C295.992 416.032 296.381 415.685 296.872 415.44C297.373 415.195 297.922 415.072 298.52 415.072ZM312.482 419.28C312.482 419.557 312.466 419.851 312.434 420.16H305.426C305.479 421.024 305.773 421.701 306.306 422.192C306.85 422.672 307.506 422.912 308.274 422.912C308.903 422.912 309.426 422.768 309.842 422.48C310.269 422.181 310.567 421.787 310.738 421.296H312.306C312.071 422.139 311.602 422.827 310.898 423.36C310.194 423.883 309.319 424.144 308.274 424.144C307.442 424.144 306.695 423.957 306.034 423.584C305.383 423.211 304.871 422.683 304.498 422C304.125 421.307 303.938 420.507 303.938 419.6C303.938 418.693 304.119 417.899 304.482 417.216C304.845 416.533 305.351 416.011 306.002 415.648C306.663 415.275 307.421 415.088 308.274 415.088C309.106 415.088 309.842 415.269 310.482 415.632C311.122 415.995 311.613 416.496 311.954 417.136C312.306 417.765 312.482 418.48 312.482 419.28ZM310.978 418.976C310.978 418.421 310.855 417.947 310.61 417.552C310.365 417.147 310.029 416.843 309.602 416.64C309.186 416.427 308.722 416.32 308.21 416.32C307.474 416.32 306.845 416.555 306.322 417.024C305.81 417.493 305.517 418.144 305.442 418.976H310.978ZM313.86 419.6C313.86 418.693 314.041 417.904 314.404 417.232C314.767 416.549 315.268 416.021 315.908 415.648C316.559 415.275 317.3 415.088 318.132 415.088C319.209 415.088 320.095 415.349 320.788 415.872C321.492 416.395 321.956 417.12 322.18 418.048H320.612C320.463 417.515 320.169 417.093 319.732 416.784C319.305 416.475 318.772 416.32 318.132 416.32C317.3 416.32 316.628 416.608 316.116 417.184C315.604 417.749 315.348 418.555 315.348 419.6C315.348 420.656 315.604 421.472 316.116 422.048C316.628 422.624 317.3 422.912 318.132 422.912C318.772 422.912 319.305 422.763 319.732 422.464C320.159 422.165 320.452 421.739 320.612 421.184H322.18C321.945 422.08 321.476 422.8 320.772 423.344C320.068 423.877 319.188 424.144 318.132 424.144C317.3 424.144 316.559 423.957 315.908 423.584C315.268 423.211 314.767 422.683 314.404 422C314.041 421.317 313.86 420.517 313.86 419.6ZM325.899 416.432V421.6C325.899 422.027 325.989 422.331 326.171 422.512C326.352 422.683 326.667 422.768 327.115 422.768H328.187V424H326.875C326.064 424 325.456 423.813 325.051 423.44C324.645 423.067 324.443 422.453 324.443 421.6V416.432H323.307V415.232H324.443V413.024H325.899V415.232H328.187V416.432H325.899ZM333.775 424.144C332.953 424.144 332.207 423.957 331.535 423.584C330.873 423.211 330.351 422.683 329.967 422C329.593 421.307 329.407 420.507 329.407 419.6C329.407 418.704 329.599 417.915 329.983 417.232C330.377 416.539 330.911 416.011 331.583 415.648C332.255 415.275 333.007 415.088 333.839 415.088C334.671 415.088 335.423 415.275 336.095 415.648C336.767 416.011 337.295 416.533 337.679 417.216C338.073 417.899 338.271 418.693 338.271 419.6C338.271 420.507 338.068 421.307 337.663 422C337.268 422.683 336.729 423.211 336.047 423.584C335.364 423.957 334.607 424.144 333.775 424.144ZM333.775 422.864C334.297 422.864 334.788 422.741 335.247 422.496C335.705 422.251 336.073 421.883 336.351 421.392C336.639 420.901 336.783 420.304 336.783 419.6C336.783 418.896 336.644 418.299 336.367 417.808C336.089 417.317 335.727 416.955 335.279 416.72C334.831 416.475 334.345 416.352 333.823 416.352C333.289 416.352 332.799 416.475 332.351 416.72C331.913 416.955 331.561 417.317 331.295 417.808C331.028 418.299 330.895 418.896 330.895 419.6C330.895 420.315 331.023 420.917 331.279 421.408C331.545 421.899 331.897 422.267 332.335 422.512C332.772 422.747 333.252 422.864 333.775 422.864ZM341.641 416.656C341.897 416.155 342.26 415.765 342.729 415.488C343.209 415.211 343.79 415.072 344.473 415.072V416.576H344.089C342.457 416.576 341.641 417.461 341.641 419.232V424H340.185V415.232H341.641V416.656ZM349.258 424.144C348.586 424.144 347.983 424.032 347.45 423.808C346.917 423.573 346.495 423.253 346.186 422.848C345.877 422.432 345.706 421.957 345.674 421.424H347.178C347.221 421.861 347.423 422.219 347.786 422.496C348.159 422.773 348.645 422.912 349.242 422.912C349.797 422.912 350.234 422.789 350.554 422.544C350.874 422.299 351.034 421.989 351.034 421.616C351.034 421.232 350.863 420.949 350.522 420.768C350.181 420.576 349.653 420.389 348.938 420.208C348.287 420.037 347.754 419.867 347.338 419.696C346.933 419.515 346.581 419.253 346.282 418.912C345.994 418.56 345.85 418.101 345.85 417.536C345.85 417.088 345.983 416.677 346.25 416.304C346.517 415.931 346.895 415.637 347.386 415.424C347.877 415.2 348.437 415.088 349.066 415.088C350.037 415.088 350.821 415.333 351.418 415.824C352.015 416.315 352.335 416.987 352.378 417.84H350.922C350.89 417.381 350.703 417.013 350.362 416.736C350.031 416.459 349.583 416.32 349.018 416.32C348.495 416.32 348.079 416.432 347.77 416.656C347.461 416.88 347.306 417.173 347.306 417.536C347.306 417.824 347.397 418.064 347.578 418.256C347.77 418.437 348.005 418.587 348.282 418.704C348.57 418.811 348.965 418.933 349.466 419.072C350.095 419.243 350.607 419.413 351.002 419.584C351.397 419.744 351.733 419.989 352.01 420.32C352.298 420.651 352.447 421.083 352.458 421.616C352.458 422.096 352.325 422.528 352.058 422.912C351.791 423.296 351.413 423.6 350.922 423.824C350.442 424.037 349.887 424.144 349.258 424.144Z"
            fill="#020617"
          />
          {/* Corrected connector-count label (replaces the vector glyph text hidden via CSS) */}
          <foreignObject x="158" y="390.5" width="219" height="55">
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
                color: "#020617",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              + 20 more connectors
            </div>
          </foreignObject>
          {/* Other Traveling Circle */}
          <g id="other-circle" filter="url(#filter10_f_12001_294)">
            <circle cx="377" cy="418" r="8" fill="#7B83EB" fillOpacity="0.5" />
          </g>
          <circle
            id="other-circle-inner"
            cx="377"
            cy="418"
            r="4"
            fill="#7B83EB"
          />
          <circle
            id="other-circle-stroke"
            cx="377"
            cy="418"
            r="4.5"
            stroke="white"
            strokeOpacity="0.8"
          />
        </g>
      </g>
      <g id="kvark" style={{ isolation: "isolate" }}>
        <rect
          x="695.5"
          y="93.5"
          width="287"
          height="287"
          rx="79.5"
          fill="white"
          stroke="#F1F5F9"
        />
        <g data-figma-bg-blur-radius="40">
          <rect
            x="699.5"
            y="97.5"
            width="279"
            height="279"
            rx="79.5"
            fill="url(#paint18_radial_12001_294)"
            fillOpacity="0.06"
          />
          <rect
            x="699.5"
            y="97.5"
            width="279"
            height="279"
            rx="79.5"
            stroke="url(#paint19_linear_12001_294)"
          />
          <g clipPath="url(#clip5_12001_294)">
            <path
              d="M888.228 220.084L889.738 216.609C892.394 210.461 897.258 205.531 903.37 202.793L908.031 200.712C908.595 200.452 909.075 200.035 909.41 199.511C909.746 198.987 909.925 198.377 909.925 197.755C909.925 197.133 909.746 196.523 909.41 195.999C909.075 195.475 908.595 195.059 908.031 194.798L903.628 192.84C897.363 190.024 892.415 184.912 889.806 178.557L888.252 174.806C888.025 174.224 887.626 173.725 887.111 173.374C886.594 173.022 885.985 172.834 885.36 172.834C884.736 172.834 884.126 173.022 883.61 173.374C883.094 173.725 882.696 174.224 882.468 174.806L880.914 178.551C878.309 184.907 873.363 190.021 867.099 192.84L862.69 194.805C862.126 195.065 861.649 195.482 861.314 196.006C860.98 196.529 860.802 197.137 860.802 197.758C860.802 198.379 860.98 198.987 861.314 199.511C861.649 200.034 862.126 200.451 862.69 200.712L867.357 202.787C873.468 205.528 878.329 210.46 880.983 216.609L882.493 220.084C883.598 222.627 887.116 222.627 888.228 220.084ZM885.36 234.244C889.474 234.244 893.422 233.569 897.119 232.328C897.467 234.969 897.641 237.654 897.641 240.385C897.641 274.298 870.151 301.788 836.237 301.788C802.324 301.788 774.834 274.298 774.834 240.385C774.834 206.471 802.324 178.981 836.237 178.981C841.801 178.981 847.185 179.718 852.307 181.106C849.536 186.723 848.244 192.955 848.551 199.211C848.858 205.468 850.757 211.542 854.065 216.861C857.373 222.18 861.983 226.568 867.459 229.609C872.936 232.651 879.096 234.246 885.36 234.244ZM842.378 234.244V203.542L811.676 246.525H830.097V277.227L860.799 234.244H842.378Z"
              fill="#0526AA"
            />
          </g>
        </g>
        <mask id="path-121-inside-1_12001_294" fill="white">
          <path d="M695 173C695 128.817 730.817 93 775 93H903C947.183 93 983 128.817 983 173V301C983 345.183 947.183 381 903 381H775C730.817 381 695 345.183 695 301V173Z" />
        </mask>
        {/*  <path
          d="M695 93H983H695ZM983 301C983 346.287 946.287 383 901 383H777C731.713 383 695 346.287 695 301C695 344.078 730.817 379 775 379H903C947.183 379 983 344.078 983 301ZM695 381V93V381ZM983 93V381V93Z"
          fill="#0526AA"
          mask="url(#path-121-inside-1_12001_294)"
        /> */}
      </g>

      {/* Deployment */}
      <g
        id="deployment"
        filter="url(#filter12_d_12001_294)"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/resources/deployment-options")}
      >
        <rect x="765" y="41" width="154" height="23" rx="6" fill="white" />
        <rect
          x="765.3"
          y="41.3"
          width="153.4"
          height="22.4"
          rx="5.7"
          stroke="#E2E8F0"
          strokeWidth="0.6"
        />
        <path
          d="M775.148 49.147V51.71H777.942V52.535H775.148V55.175H778.272V56H774.147V48.322H778.272V49.147H775.148ZM782.332 56L780.902 53.756L779.527 56H778.482L780.429 53.008L778.482 49.972H779.615L781.045 52.205L782.409 49.972H783.454L781.518 52.953L783.465 56H782.332ZM784.851 51.083C785.049 50.7383 785.342 50.4523 785.731 50.225C786.127 49.9903 786.585 49.873 787.106 49.873C787.641 49.873 788.125 50.0013 788.558 50.258C788.998 50.5147 789.343 50.8777 789.592 51.347C789.841 51.809 789.966 52.348 789.966 52.964C789.966 53.5727 789.841 54.1153 789.592 54.592C789.343 55.0687 788.998 55.439 788.558 55.703C788.125 55.967 787.641 56.099 787.106 56.099C786.593 56.099 786.138 55.9853 785.742 55.758C785.353 55.5233 785.056 55.2337 784.851 54.889V58.86H783.85V49.972H784.851V51.083ZM788.943 52.964C788.943 52.5093 788.851 52.1133 788.668 51.776C788.485 51.4387 788.235 51.182 787.92 51.006C787.612 50.83 787.271 50.742 786.897 50.742C786.53 50.742 786.189 50.8337 785.874 51.017C785.566 51.193 785.317 51.4533 785.126 51.798C784.943 52.1353 784.851 52.5277 784.851 52.975C784.851 53.4297 784.943 53.8293 785.126 54.174C785.317 54.5113 785.566 54.7717 785.874 54.955C786.189 55.131 786.53 55.219 786.897 55.219C787.271 55.219 787.612 55.131 787.92 54.955C788.235 54.7717 788.485 54.5113 788.668 54.174C788.851 53.8293 788.943 53.426 788.943 52.964ZM791.685 47.86V56H790.684V47.86H791.685ZM795.42 56.099C794.855 56.099 794.342 55.9707 793.88 55.714C793.425 55.4573 793.066 55.0943 792.802 54.625C792.545 54.1483 792.417 53.5983 792.417 52.975C792.417 52.359 792.549 51.8163 792.813 51.347C793.084 50.8703 793.451 50.5073 793.913 50.258C794.375 50.0013 794.892 49.873 795.464 49.873C796.036 49.873 796.553 50.0013 797.015 50.258C797.477 50.5073 797.84 50.8667 798.104 51.336C798.375 51.8053 798.511 52.3517 798.511 52.975C798.511 53.5983 798.371 54.1483 798.093 54.625C797.821 55.0943 797.451 55.4573 796.982 55.714C796.512 55.9707 795.992 56.099 795.42 56.099ZM795.42 55.219C795.779 55.219 796.116 55.1347 796.432 54.966C796.747 54.7973 797 54.5443 797.191 54.207C797.389 53.8697 797.488 53.459 797.488 52.975C797.488 52.491 797.392 52.0803 797.202 51.743C797.011 51.4057 796.762 51.1563 796.454 50.995C796.146 50.8263 795.812 50.742 795.453 50.742C795.086 50.742 794.749 50.8263 794.441 50.995C794.14 51.1563 793.898 51.4057 793.715 51.743C793.531 52.0803 793.44 52.491 793.44 52.975C793.44 53.4663 793.528 53.8807 793.704 54.218C793.887 54.5553 794.129 54.8083 794.43 54.977C794.73 55.1383 795.06 55.219 795.42 55.219ZM800.228 50.951C800.404 50.6063 800.653 50.3387 800.976 50.148C801.306 49.9573 801.706 49.862 802.175 49.862V50.896H801.911C800.789 50.896 800.228 51.5047 800.228 52.722V56H799.227V49.972H800.228V50.951ZM808.23 52.755C808.23 52.9457 808.219 53.1473 808.197 53.36H803.379C803.416 53.954 803.618 54.4197 803.984 54.757C804.358 55.087 804.809 55.252 805.337 55.252C805.77 55.252 806.129 55.153 806.415 54.955C806.709 54.7497 806.914 54.4783 807.031 54.141H808.109C807.948 54.7203 807.625 55.1933 807.141 55.56C806.657 55.9193 806.056 56.099 805.337 56.099C804.765 56.099 804.252 55.9707 803.797 55.714C803.35 55.4573 802.998 55.0943 802.741 54.625C802.485 54.1483 802.356 53.5983 802.356 52.975C802.356 52.3517 802.481 51.8053 802.73 51.336C802.98 50.8667 803.328 50.5073 803.775 50.258C804.23 50.0013 804.751 49.873 805.337 49.873C805.909 49.873 806.415 49.9977 806.855 50.247C807.295 50.4963 807.633 50.841 807.867 51.281C808.109 51.7137 808.23 52.205 808.23 52.755ZM807.196 52.546C807.196 52.1647 807.112 51.8383 806.943 51.567C806.775 51.2883 806.544 51.0793 806.25 50.94C805.964 50.7933 805.645 50.72 805.293 50.72C804.787 50.72 804.355 50.8813 803.995 51.204C803.643 51.5267 803.442 51.974 803.39 52.546H807.196ZM810.91 52.964C810.91 52.348 811.035 51.809 811.284 51.347C811.534 50.8777 811.875 50.5147 812.307 50.258C812.747 50.0013 813.239 49.873 813.781 49.873C814.251 49.873 814.687 49.983 815.09 50.203C815.494 50.4157 815.802 50.698 816.014 51.05V47.86H817.026V56H816.014V54.867C815.816 55.2263 815.523 55.5233 815.134 55.758C814.746 55.9853 814.291 56.099 813.77 56.099C813.235 56.099 812.747 55.967 812.307 55.703C811.875 55.439 811.534 55.0687 811.284 54.592C811.035 54.1153 810.91 53.5727 810.91 52.964ZM816.014 52.975C816.014 52.5203 815.923 52.1243 815.739 51.787C815.556 51.4497 815.307 51.193 814.991 51.017C814.683 50.8337 814.342 50.742 813.968 50.742C813.594 50.742 813.253 50.83 812.945 51.006C812.637 51.182 812.392 51.4387 812.208 51.776C812.025 52.1133 811.933 52.5093 811.933 52.964C811.933 53.426 812.025 53.8293 812.208 54.174C812.392 54.5113 812.637 54.7717 812.945 54.955C813.253 55.131 813.594 55.219 813.968 55.219C814.342 55.219 814.683 55.131 814.991 54.955C815.307 54.7717 815.556 54.5113 815.739 54.174C815.923 53.8293 816.014 53.4297 816.014 52.975ZM823.618 52.755C823.618 52.9457 823.607 53.1473 823.585 53.36H818.767C818.804 53.954 819.005 54.4197 819.372 54.757C819.746 55.087 820.197 55.252 820.725 55.252C821.158 55.252 821.517 55.153 821.803 54.955C822.096 54.7497 822.302 54.4783 822.419 54.141H823.497C823.336 54.7203 823.013 55.1933 822.529 55.56C822.045 55.9193 821.444 56.099 820.725 56.099C820.153 56.099 819.64 55.9707 819.185 55.714C818.738 55.4573 818.386 55.0943 818.129 54.625C817.872 54.1483 817.744 53.5983 817.744 52.975C817.744 52.3517 817.869 51.8053 818.118 51.336C818.367 50.8667 818.716 50.5073 819.163 50.258C819.618 50.0013 820.138 49.873 820.725 49.873C821.297 49.873 821.803 49.9977 822.243 50.247C822.683 50.4963 823.02 50.841 823.255 51.281C823.497 51.7137 823.618 52.205 823.618 52.755ZM822.584 52.546C822.584 52.1647 822.5 51.8383 822.331 51.567C822.162 51.2883 821.931 51.0793 821.638 50.94C821.352 50.7933 821.033 50.72 820.681 50.72C820.175 50.72 819.742 50.8813 819.383 51.204C819.031 51.5267 818.829 51.974 818.778 52.546H822.584ZM825.34 51.083C825.538 50.7383 825.832 50.4523 826.22 50.225C826.616 49.9903 827.075 49.873 827.595 49.873C828.131 49.873 828.615 50.0013 829.047 50.258C829.487 50.5147 829.832 50.8777 830.081 51.347C830.331 51.809 830.455 52.348 830.455 52.964C830.455 53.5727 830.331 54.1153 830.081 54.592C829.832 55.0687 829.487 55.439 829.047 55.703C828.615 55.967 828.131 56.099 827.595 56.099C827.082 56.099 826.627 55.9853 826.231 55.758C825.843 55.5233 825.546 55.2337 825.34 54.889V58.86H824.339V49.972H825.34V51.083ZM829.432 52.964C829.432 52.5093 829.341 52.1133 829.157 51.776C828.974 51.4387 828.725 51.182 828.409 51.006C828.101 50.83 827.76 50.742 827.386 50.742C827.02 50.742 826.679 50.8337 826.363 51.017C826.055 51.193 825.806 51.4533 825.615 51.798C825.432 52.1353 825.34 52.5277 825.34 52.975C825.34 53.4297 825.432 53.8293 825.615 54.174C825.806 54.5113 826.055 54.7717 826.363 54.955C826.679 55.131 827.02 55.219 827.386 55.219C827.76 55.219 828.101 55.131 828.409 54.955C828.725 54.7717 828.974 54.5113 829.157 54.174C829.341 53.8293 829.432 53.426 829.432 52.964ZM832.174 47.86V56H831.173V47.86H832.174ZM835.909 56.099C835.344 56.099 834.831 55.9707 834.369 55.714C833.914 55.4573 833.555 55.0943 833.291 54.625C833.034 54.1483 832.906 53.5983 832.906 52.975C832.906 52.359 833.038 51.8163 833.302 51.347C833.573 50.8703 833.94 50.5073 834.402 50.258C834.864 50.0013 835.381 49.873 835.953 49.873C836.525 49.873 837.042 50.0013 837.504 50.258C837.966 50.5073 838.329 50.8667 838.593 51.336C838.864 51.8053 839 52.3517 839 52.975C839 53.5983 838.86 54.1483 838.582 54.625C838.31 55.0943 837.94 55.4573 837.471 55.714C837.001 55.9707 836.481 56.099 835.909 56.099ZM835.909 55.219C836.268 55.219 836.605 55.1347 836.921 54.966C837.236 54.7973 837.489 54.5443 837.68 54.207C837.878 53.8697 837.977 53.459 837.977 52.975C837.977 52.491 837.881 52.0803 837.691 51.743C837.5 51.4057 837.251 51.1563 836.943 50.995C836.635 50.8263 836.301 50.742 835.942 50.742C835.575 50.742 835.238 50.8263 834.93 50.995C834.629 51.1563 834.387 51.4057 834.204 51.743C834.02 52.0803 833.929 52.491 833.929 52.975C833.929 53.4663 834.017 53.8807 834.193 54.218C834.376 54.5553 834.618 54.8083 834.919 54.977C835.219 55.1383 835.549 55.219 835.909 55.219ZM844.908 49.972L841.278 58.838H840.244L841.432 55.934L839.001 49.972H840.112L842.004 54.856L843.874 49.972H844.908ZM852.563 49.862C853.033 49.862 853.451 49.961 853.817 50.159C854.184 50.3497 854.474 50.6393 854.686 51.028C854.899 51.4167 855.005 51.8897 855.005 52.447V56H854.015V52.59C854.015 51.9887 853.865 51.5303 853.564 51.215C853.271 50.8923 852.871 50.731 852.365 50.731C851.845 50.731 851.43 50.8997 851.122 51.237C850.814 51.567 850.66 52.0473 850.66 52.678V56H849.67V52.59C849.67 51.9887 849.52 51.5303 849.219 51.215C848.926 50.8923 848.526 50.731 848.02 50.731C847.5 50.731 847.085 50.8997 846.777 51.237C846.469 51.567 846.315 52.0473 846.315 52.678V56H845.314V49.972H846.315V50.841C846.513 50.5257 846.777 50.2837 847.107 50.115C847.445 49.9463 847.815 49.862 848.218 49.862C848.724 49.862 849.172 49.9757 849.56 50.203C849.949 50.4303 850.239 50.764 850.429 51.204C850.598 50.7787 850.877 50.4487 851.265 50.214C851.654 49.9793 852.087 49.862 852.563 49.862ZM861.547 52.755C861.547 52.9457 861.536 53.1473 861.514 53.36H856.696C856.733 53.954 856.935 54.4197 857.301 54.757C857.675 55.087 858.126 55.252 858.654 55.252C859.087 55.252 859.446 55.153 859.732 54.955C860.026 54.7497 860.231 54.4783 860.348 54.141H861.426C861.265 54.7203 860.942 55.1933 860.458 55.56C859.974 55.9193 859.373 56.099 858.654 56.099C858.082 56.099 857.569 55.9707 857.114 55.714C856.667 55.4573 856.315 55.0943 856.058 54.625C855.802 54.1483 855.673 53.5983 855.673 52.975C855.673 52.3517 855.798 51.8053 856.047 51.336C856.297 50.8667 856.645 50.5073 857.092 50.258C857.547 50.0013 858.068 49.873 858.654 49.873C859.226 49.873 859.732 49.9977 860.172 50.247C860.612 50.4963 860.95 50.841 861.184 51.281C861.426 51.7137 861.547 52.205 861.547 52.755ZM860.513 52.546C860.513 52.1647 860.429 51.8383 860.26 51.567C860.092 51.2883 859.861 51.0793 859.567 50.94C859.281 50.7933 858.962 50.72 858.61 50.72C858.104 50.72 857.672 50.8813 857.312 51.204C856.96 51.5267 856.759 51.974 856.707 52.546H860.513ZM865.205 49.862C865.939 49.862 866.533 50.0857 866.987 50.533C867.442 50.973 867.669 51.611 867.669 52.447V56H866.679V52.59C866.679 51.9887 866.529 51.5303 866.228 51.215C865.928 50.8923 865.517 50.731 864.996 50.731C864.468 50.731 864.047 50.896 863.731 51.226C863.423 51.556 863.269 52.0363 863.269 52.667V56H862.268V49.972H863.269V50.83C863.467 50.522 863.735 50.2837 864.072 50.115C864.417 49.9463 864.795 49.862 865.205 49.862ZM869.926 50.797V54.35C869.926 54.6433 869.988 54.8523 870.113 54.977C870.237 55.0943 870.454 55.153 870.762 55.153H871.499V56H870.597C870.039 56 869.621 55.8717 869.343 55.615C869.064 55.3583 868.925 54.9367 868.925 54.35V50.797H868.144V49.972H868.925V48.454H869.926V49.972H871.499V50.797H869.926ZM877.073 56.099C876.508 56.099 875.995 55.9707 875.533 55.714C875.078 55.4573 874.719 55.0943 874.455 54.625C874.198 54.1483 874.07 53.5983 874.07 52.975C874.07 52.359 874.202 51.8163 874.466 51.347C874.737 50.8703 875.104 50.5073 875.566 50.258C876.028 50.0013 876.545 49.873 877.117 49.873C877.689 49.873 878.206 50.0013 878.668 50.258C879.13 50.5073 879.493 50.8667 879.757 51.336C880.028 51.8053 880.164 52.3517 880.164 52.975C880.164 53.5983 880.025 54.1483 879.746 54.625C879.475 55.0943 879.104 55.4573 878.635 55.714C878.166 55.9707 877.645 56.099 877.073 56.099ZM877.073 55.219C877.432 55.219 877.77 55.1347 878.085 54.966C878.4 54.7973 878.653 54.5443 878.844 54.207C879.042 53.8697 879.141 53.459 879.141 52.975C879.141 52.491 879.046 52.0803 878.855 51.743C878.664 51.4057 878.415 51.1563 878.107 50.995C877.799 50.8263 877.465 50.742 877.106 50.742C876.739 50.742 876.402 50.8263 876.094 50.995C875.793 51.1563 875.551 51.4057 875.368 51.743C875.185 52.0803 875.093 52.491 875.093 52.975C875.093 53.4663 875.181 53.8807 875.357 54.218C875.54 54.5553 875.782 54.8083 876.083 54.977C876.384 55.1383 876.714 55.219 877.073 55.219ZM881.881 51.083C882.079 50.7383 882.373 50.4523 882.761 50.225C883.157 49.9903 883.616 49.873 884.136 49.873C884.672 49.873 885.156 50.0013 885.588 50.258C886.028 50.5147 886.373 50.8777 886.622 51.347C886.872 51.809 886.996 52.348 886.996 52.964C886.996 53.5727 886.872 54.1153 886.622 54.592C886.373 55.0687 886.028 55.439 885.588 55.703C885.156 55.967 884.672 56.099 884.136 56.099C883.623 56.099 883.168 55.9853 882.772 55.758C882.384 55.5233 882.087 55.2337 881.881 54.889V58.86H880.88V49.972H881.881V51.083ZM885.973 52.964C885.973 52.5093 885.882 52.1133 885.698 51.776C885.515 51.4387 885.266 51.182 884.95 51.006C884.642 50.83 884.301 50.742 883.927 50.742C883.561 50.742 883.22 50.8337 882.904 51.017C882.596 51.193 882.347 51.4533 882.156 51.798C881.973 52.1353 881.881 52.5277 881.881 52.975C881.881 53.4297 881.973 53.8293 882.156 54.174C882.347 54.5113 882.596 54.7717 882.904 54.955C883.22 55.131 883.561 55.219 883.927 55.219C884.301 55.219 884.642 55.131 884.95 54.955C885.266 54.7717 885.515 54.5113 885.698 54.174C885.882 53.8293 885.973 53.426 885.973 52.964ZM888.935 50.797V54.35C888.935 54.6433 888.997 54.8523 889.122 54.977C889.246 55.0943 889.463 55.153 889.771 55.153H890.508V56H889.606C889.048 56 888.63 55.8717 888.352 55.615C888.073 55.3583 887.934 54.9367 887.934 54.35V50.797H887.153V49.972H887.934V48.454H888.935V49.972H890.508V50.797H888.935ZM891.638 48.993C891.447 48.993 891.286 48.927 891.154 48.795C891.022 48.663 890.956 48.5017 890.956 48.311C890.956 48.1203 891.022 47.959 891.154 47.827C891.286 47.695 891.447 47.629 891.638 47.629C891.821 47.629 891.975 47.695 892.1 47.827C892.232 47.959 892.298 48.1203 892.298 48.311C892.298 48.5017 892.232 48.663 892.1 48.795C891.975 48.927 891.821 48.993 891.638 48.993ZM892.122 49.972V56H891.121V49.972H892.122ZM895.857 56.099C895.292 56.099 894.779 55.9707 894.317 55.714C893.862 55.4573 893.503 55.0943 893.239 54.625C892.982 54.1483 892.854 53.5983 892.854 52.975C892.854 52.359 892.986 51.8163 893.25 51.347C893.521 50.8703 893.888 50.5073 894.35 50.258C894.812 50.0013 895.329 49.873 895.901 49.873C896.473 49.873 896.99 50.0013 897.452 50.258C897.914 50.5073 898.277 50.8667 898.541 51.336C898.812 51.8053 898.948 52.3517 898.948 52.975C898.948 53.5983 898.808 54.1483 898.53 54.625C898.258 55.0943 897.888 55.4573 897.419 55.714C896.949 55.9707 896.429 56.099 895.857 56.099ZM895.857 55.219C896.216 55.219 896.553 55.1347 896.869 54.966C897.184 54.7973 897.437 54.5443 897.628 54.207C897.826 53.8697 897.925 53.459 897.925 52.975C897.925 52.491 897.829 52.0803 897.639 51.743C897.448 51.4057 897.199 51.1563 896.891 50.995C896.583 50.8263 896.249 50.742 895.89 50.742C895.523 50.742 895.186 50.8263 894.878 50.995C894.577 51.1563 894.335 51.4057 894.152 51.743C893.968 52.0803 893.877 52.491 893.877 52.975C893.877 53.4663 893.965 53.8807 894.141 54.218C894.324 54.5553 894.566 54.8083 894.867 54.977C895.167 55.1383 895.497 55.219 895.857 55.219ZM902.601 49.862C903.334 49.862 903.928 50.0857 904.383 50.533C904.837 50.973 905.065 51.611 905.065 52.447V56H904.075V52.59C904.075 51.9887 903.924 51.5303 903.624 51.215C903.323 50.8923 902.912 50.731 902.392 50.731C901.864 50.731 901.442 50.896 901.127 51.226C900.819 51.556 900.665 52.0363 900.665 52.667V56H899.664V49.972H900.665V50.83C900.863 50.522 901.13 50.2837 901.468 50.115C901.812 49.9463 902.19 49.862 902.601 49.862ZM908.234 56.099C907.772 56.099 907.358 56.022 906.991 55.868C906.624 55.7067 906.335 55.4867 906.122 55.208C905.909 54.922 905.792 54.5957 905.77 54.229H906.804C906.833 54.5297 906.973 54.7753 907.222 54.966C907.479 55.1567 907.812 55.252 908.223 55.252C908.604 55.252 908.905 55.1677 909.125 54.999C909.345 54.8303 909.455 54.6177 909.455 54.361C909.455 54.097 909.338 53.9027 909.103 53.778C908.868 53.646 908.505 53.5177 908.014 53.393C907.567 53.2757 907.2 53.1583 906.914 53.041C906.635 52.9163 906.393 52.7367 906.188 52.502C905.99 52.26 905.891 51.9447 905.891 51.556C905.891 51.248 905.983 50.9657 906.166 50.709C906.349 50.4523 906.61 50.2507 906.947 50.104C907.284 49.95 907.669 49.873 908.102 49.873C908.769 49.873 909.308 50.0417 909.719 50.379C910.13 50.7163 910.35 51.1783 910.379 51.765H909.378C909.356 51.4497 909.228 51.1967 908.993 51.006C908.766 50.8153 908.458 50.72 908.069 50.72C907.71 50.72 907.424 50.797 907.211 50.951C906.998 51.105 906.892 51.3067 906.892 51.556C906.892 51.754 906.954 51.919 907.079 52.051C907.211 52.1757 907.372 52.2783 907.563 52.359C907.761 52.4323 908.032 52.5167 908.377 52.612C908.81 52.7293 909.162 52.8467 909.433 52.964C909.704 53.074 909.935 53.2427 910.126 53.47C910.324 53.6973 910.427 53.9943 910.434 54.361C910.434 54.691 910.342 54.988 910.159 55.252C909.976 55.516 909.715 55.725 909.378 55.879C909.048 56.0257 908.667 56.099 908.234 56.099Z"
          fill="#020617"
        />
      </g>
      {/* Deployment Path */}
      <path
        id="deployment-path"
        d="M842 62.4C841.116 62.4 840.4 63.1163 840.4 64C840.4 64.8837 841.116 65.6 842 65.6C842.884 65.6 843.6 64.8837 843.6 64C843.6 63.1163 842.884 62.4 842 62.4ZM841.7 93C841.7 93.1657 841.834 93.3 842 93.3C842.166 93.3 842.3 93.1657 842.3 93L842 93L841.7 93ZM842 64L841.7 64L841.7 64.1813L842 64.1813L842.3 64.1812L842.3 64L842 64ZM842 64.5438L841.7 64.5438L841.7 64.725L842 64.725L842.3 64.725L842.3 64.5438L842 64.5438ZM842 64.725L841.7 64.725L841.7 65.7348L842 65.7348L842.3 65.7348L842.3 64.725L842 64.725ZM842 67.7545L841.7 67.7545L841.7 69.7741L842 69.7741L842.3 69.7741L842.3 67.7545L842 67.7545ZM842 71.7938L841.7 71.7938L841.7 73.8134L842 73.8134L842.3 73.8134L842.3 71.7938L842 71.7938ZM842 75.833L841.7 75.833L841.7 77.8527L842 77.8527L842.3 77.8527L842.3 75.833L842 75.833ZM842 79.8723L841.7 79.8723L841.7 81.892L842 81.892L842.3 81.892L842.3 79.8723L842 79.8723ZM842 83.9116L841.7 83.9116L841.7 85.9313L842 85.9313L842.3 85.9313L842.3 83.9116L842 83.9116ZM842 87.9509L841.7 87.9509L841.7 89.9705L842 89.9705L842.3 89.9705L842.3 87.9509L842 87.9509ZM842 91.9902L841.7 91.9902L841.7 93L842 93L842.3 93L842.3 91.9902L842 91.9902Z"
        fill="#CBD5E1"
      />

      {/* Paths extending from Kvark right edge center with equal spacing */}
      <g id="kvark-extending-paths">
        {/* 6 divs positioned at circle centers */}
        {[1, 2, 3, 4, 5, 6].map((index) => {
          const cy = [57, 125, 193, 281, 349, 417][index - 1];
          const texts = [
            "AI assistant",
            "Semantic search",
            "Document drafting",
            "Context boards",
            "Enterprise agents",
            "Customer-facing AI",
          ];

          const isActive = activeIndex === index - 1;
          // Circle is at x=1120, radius=4, so right edge is at 1124
          // Position div so circle right edge is at div left border
          // Div grows to the right, keeping left edge fixed at circle right edge
          const inactiveWidth = 190;
          const activeWidth = 250;
          const baseX = 1124; // Start at circle right edge - circle stays at border
          const divWidth = isActive ? activeWidth : inactiveWidth;
          const divHeight = isActive ? 60 : 50;

          return (
            <foreignObject
              key={index}
              id={`kvark-div-${index}`}
              x={baseX}
              y={cy - divHeight / 2}
              width={divWidth}
              height={divHeight}
            >
              <div
                id={`kvark-div-inner-${index}`}
                className={`kvark-circle-text ${isActive ? "active" : ""}`}
                onClick={() => { setActiveIndex(index - 1); pushEvent({ event: "feature_tab_click", feature_name: texts[index - 1] }); }}
                onMouseEnter={() => {
                  if (!isActive) {
                    gsap.to(`#circle-kvark-${index}`, {
                      fill: "#0526AA",
                      stroke: "#0526AA",
                      duration: 0.15,
                    });
                  }
                }}
                onMouseLeave={() => {
                  if (!isActive) {
                    gsap.to(`#circle-kvark-${index}`, {
                      fill: "white",
                      stroke: "#CBD5E1",
                      duration: 0.15,
                    });
                  }
                }}
                style={{
                  cursor: "pointer",
                  textAlign: "center",
                  fontSize: isActive ? "18px" : "14px",
                  color: isActive ? "#0526AA" : undefined,
                  fontWeight: isActive ? "600" : "400",
                  padding: isActive ? "16px 10px" : "16px 8px",
                  borderRadius: "8px",
                  userSelect: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  boxSizing: "border-box",
                }}
              >
                {texts[index - 1]}
              </div>
            </foreignObject>
          );
        })}
        <path
          id="path-kvark-1"
          d="M983 197C1003 190 1020 176 1028 156L1048 105C1059 75 1088 57 1120 57"
          stroke="url(#paint_kvark_path_1)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        <circle
          id="circle-kvark-1"
          cx="1120"
          cy="57"
          r="4"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        <path
          id="path-kvark-2"
          d="M983 213C1003 209 1020 199 1030 182L1042 163C1057 139 1082 125 1120 125"
          stroke="url(#paint_kvark_path_2)"
          strokeWidth="1.3"
        />
        <circle
          id="circle-kvark-2"
          cx="1120"
          cy="125"
          r="4"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        <path
          id="path-kvark-3"
          d="M983 229C1006 229 1027 222 1043 211C1059 200 1077 193 1120 193"
          stroke="url(#paint_kvark_path_3)"
          strokeWidth="1.3"
        />
        <circle
          id="circle-kvark-3"
          cx="1120"
          cy="193"
          r="4"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="1"
        />

        <path
          id="path-kvark-4"
          d="M983 245C1006 245 1027 252 1043 263C1059 274 1077 281 1120 281"
          stroke="url(#paint_kvark_path_4)"
          strokeWidth="1.3"
        />
        <circle
          id="circle-kvark-4"
          cx="1120"
          cy="281"
          r="4"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
        <path
          id="path-kvark-5"
          d="M983 261C1003 265 1020 275 1030 292L1042 311C1057 335 1082 349 1120 349"
          stroke="url(#paint_kvark_path_5)"
          strokeWidth="1.3"
        />
        <circle
          id="circle-kvark-5"
          cx="1120"
          cy="349"
          r="4"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
        <path
          id="path-kvark-6"
          d="M983 277C1003 284 1020 298 1028 318L1048 369C1059 399 1088 417 1120 417"
          stroke="url(#paint_kvark_path_6)"
          strokeWidth="1.3"
          strokeLinecap="square"
        />
        <circle
          id="circle-kvark-6"
          cx="1120"
          cy="417"
          r="4"
          fill="white"
          stroke="#CBD5E1"
          strokeWidth="1"
        />
      </g>

      {/* Right side content divs - appear when items are active */}
      {[1, 2, 3, 4, 5, 6].map((index) => {
        const cardHeight = 500;
        const cardWidth = 300;
        const centerX = 1050;
        const centerY = 20; // vertically centered in viewBox

        // Content data for each card
        const cardContent = [
          {
            icon: aiAssistant,
            header: "Your entire organization, one intelligent interface",
            content:
              "Chat with your data across systems, documents, emails, and messages — accessing accurate insights in a fully secure, controlled environment.",
          },
          {
            icon: semanticSearching,
            header: "Move beyond basic text search",
            content:
              "Semantic search delivers context-aware retrieval and precise filtering across all organizational data, no matter the format or source.",
          },
          {
            icon: documentDrafting,
            header: "Accelerate how your teams create documents",
            content:
              "Combine your internal data, established templates, and AI-assisted refinement to produce source-grounded documents — drafted, reviewed and approved inside your perimeter.",
          },
          {
            icon: limitlessContext,
            header: "Break free from limited context windows",
            content:
              "Context Boards connect semantic search, AI assistance, and drafting into a single intelligence layer, enabling the system to reason over more information and deliver precise, high-fidelity outputs.",
          },
          {
            icon: enterpriseAgents,
            header:
              "Enhance operational efficiency with secure, supervised AI-automation",
            content:
              "Enterprise Agents connect to your systems, act on trusted information, and streamline operations while keeping a human in the loop for full control and assurance.",
          },
          {
            icon: serviceExternalization,
            header: "Empower your clients with intelligent self-service",
            content:
              "Deploy public-facing agents across digital channels to resolve customer queries — with the same permissions, governance and audit trail as everything else.",
          },
        ];

        const content = cardContent[index - 1];

        return (
          <foreignObject
            key={`right-content-${index}`}
            id={`right-content-${index}`}
            x={centerX}
            y={centerY}
            width={cardWidth}
            height={cardHeight}
            style={{ overflow: "visible" }}
          >
            <div
              id={`right-content-inner-${index}`}
              style={{
                width: "100%",
                height: "auto",
                backgroundColor: "#ffffff",
                border: "1px solid #F1F5F9",
                borderRadius: "8px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                alignItems: "flex-start",
                justifyContent: "center",
                color: "#020617",
                position: "relative",
                overflow: "hidden",
                boxShadow:
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                opacity: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-1.25rem",
                  left: "-1.25rem",
                  width: "7rem",
                  height: "7rem",
                  backgroundColor: "rgba(5, 38, 170, 0.1)",
                  borderRadius: "100%",
                  filter: "blur(24px)",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <img
                  src={content.icon}
                  alt="Feature icon"
                  width={32}
                  height={32}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>

              <p style={{ fontSize: "20px", fontWeight: "400" }}>
                {content.header}
              </p>
              <img
                src={miniSeperator}
                alt="mini-separator"
                width={259}
                height={6}
                style={{ width: "100%", height: "auto" }}
              />
              <p style={{ fontSize: "14px", fontWeight: "400" }}>
                {content.content}
              </p>
            </div>
          </foreignObject>
        );
      })}

      {/* LLMs Items */}
      <g id="llm-items">
        <rect
          x="738.5"
          y="424.5"
          width="47"
          height="47"
          rx="23.5"
          fill="#F8FAFC"
        />
        <rect
          x="738.5"
          y="424.5"
          width="47"
          height="47"
          rx="23.5"
          stroke="#F1F5F9"
        />
        <g clipPath="url(#clip6_12001_294)">
          <path
            d="M759.205 444.765V442.506C759.205 442.315 759.276 442.173 759.443 442.078L763.986 439.461C764.605 439.104 765.342 438.938 766.103 438.938C768.957 438.938 770.765 441.15 770.765 443.505C770.765 443.671 770.765 443.862 770.741 444.052L766.032 441.293C765.746 441.126 765.461 441.126 765.175 441.293L759.205 444.765ZM769.813 453.566V448.167C769.813 447.834 769.671 447.596 769.385 447.429L763.415 443.957L765.366 442.839C765.532 442.744 765.675 442.744 765.841 442.839L770.385 445.455C771.693 446.216 772.573 447.834 772.573 449.403C772.573 451.211 771.502 452.876 769.813 453.566ZM757.802 448.809L755.851 447.667C755.685 447.572 755.613 447.43 755.613 447.239V442.006C755.613 439.461 757.564 437.535 760.204 437.535C761.203 437.535 762.131 437.868 762.916 438.462L758.23 441.174C757.945 441.34 757.802 441.578 757.802 441.911L757.802 448.809ZM762 451.235L759.205 449.665V446.335L762 444.766L764.795 446.335V449.665L762 451.235ZM763.796 458.466C762.797 458.466 761.869 458.133 761.084 457.539L765.77 454.827C766.055 454.66 766.198 454.423 766.198 454.089V447.192L768.172 448.333C768.339 448.428 768.41 448.571 768.41 448.761V453.994C768.41 456.539 766.436 458.466 763.796 458.466ZM758.158 453.162L753.615 450.546C752.307 449.784 751.427 448.167 751.427 446.597C751.427 444.766 752.521 443.124 754.21 442.435V447.858C754.21 448.191 754.353 448.429 754.638 448.595L760.585 452.044L758.634 453.162C758.468 453.257 758.325 453.257 758.158 453.162ZM757.897 457.063C755.209 457.063 753.235 455.041 753.235 452.544C753.235 452.353 753.259 452.163 753.282 451.973L757.968 454.684C758.254 454.851 758.539 454.851 758.824 454.684L764.795 451.235V453.495C764.795 453.685 764.723 453.828 764.557 453.923L760.014 456.54C759.395 456.896 758.658 457.063 757.897 457.063ZM763.796 459.893C766.674 459.893 769.076 457.848 769.624 455.136C772.287 454.446 774 451.949 774 449.404C774 447.739 773.287 446.121 772.002 444.956C772.121 444.456 772.192 443.957 772.192 443.457C772.192 440.056 769.433 437.511 766.246 437.511C765.604 437.511 764.985 437.606 764.367 437.82C763.296 436.773 761.821 436.107 760.204 436.107C757.326 436.107 754.924 438.153 754.377 440.865C751.713 441.554 750 444.052 750 446.597C750 448.262 750.714 449.879 751.998 451.045C751.879 451.544 751.808 452.044 751.808 452.543C751.808 455.945 754.567 458.49 757.754 458.49C758.396 458.49 759.015 458.395 759.633 458.181C760.703 459.227 762.178 459.893 763.796 459.893Z"
            fill="black"
          />
        </g>
        <rect
          x="815.5"
          y="424.5"
          width="47"
          height="47"
          rx="23.5"
          fill="#F8FAFC"
        />
        <rect
          x="815.5"
          y="424.5"
          width="47"
          height="47"
          rx="23.5"
          stroke="#F1F5F9"
        />
        <path
          d="M831.709 451.955L836.43 449.308L836.509 449.078L836.43 448.95H836.199L835.409 448.902L832.711 448.829L830.372 448.732L828.106 448.61L827.535 448.489L827 447.784L827.055 447.432L827.535 447.111L828.221 447.171L829.74 447.274L832.019 447.432L833.671 447.529L836.12 447.784H836.509L836.564 447.627L836.43 447.529L836.327 447.432L833.969 445.836L831.417 444.148L830.081 443.176L829.357 442.685L828.993 442.223L828.835 441.215L829.491 440.493L830.372 440.554L830.597 440.614L831.49 441.3L833.398 442.776L835.889 444.609L836.254 444.913L836.399 444.81L836.418 444.737L836.254 444.463L834.899 442.017L833.453 439.527L832.809 438.495L832.638 437.876C832.578 437.621 832.535 437.409 832.535 437.147L833.283 436.134L833.696 436L834.692 436.134L835.111 436.498L835.731 437.912L836.734 440.141L838.289 443.17L838.745 444.069L838.988 444.901L839.079 445.156H839.237V445.01L839.365 443.304L839.602 441.209L839.832 438.514L839.911 437.755L840.288 436.844L841.035 436.352L841.619 436.631L842.099 437.317L842.032 437.761L841.746 439.612L841.187 442.515L840.823 444.457H841.035L841.278 444.215L842.263 442.909L843.915 440.845L844.645 440.025L845.495 439.121L846.042 438.69H847.075L847.834 439.819L847.494 440.985L846.431 442.332L845.55 443.474L844.286 445.174L843.496 446.534L843.569 446.643L843.757 446.625L846.613 446.018L848.156 445.738L849.997 445.423L850.83 445.811L850.921 446.206L850.593 447.013L848.624 447.499L846.315 447.961L842.876 448.774L842.834 448.804L842.883 448.865L844.432 449.011L845.094 449.047H846.716L849.736 449.272L850.526 449.794L851 450.432L850.921 450.917L849.706 451.537L848.065 451.148L844.237 450.237L842.925 449.909H842.743V450.019L843.836 451.087L845.842 452.897L848.351 455.228L848.478 455.805L848.156 456.26L847.816 456.211L845.611 454.554L844.76 453.807L842.834 452.186H842.706V452.356L843.15 453.006L845.495 456.527L845.617 457.608L845.447 457.96L844.839 458.173L844.171 458.051L842.797 456.126L841.382 453.959L840.239 452.016L840.1 452.095L839.425 459.35L839.109 459.721L838.38 460L837.773 459.539L837.451 458.792L837.773 457.316L838.162 455.392L838.477 453.862L838.763 451.962L838.933 451.33L838.921 451.288L838.781 451.306L837.347 453.273L835.166 456.218L833.441 458.063L833.027 458.227L832.31 457.857L832.377 457.195L832.778 456.606L835.166 453.57L836.606 451.688L837.536 450.602L837.53 450.444H837.475L831.132 454.56L830.002 454.706L829.515 454.25L829.576 453.504L829.807 453.261L831.715 451.949L831.709 451.955Z"
          fill="#D97757"
        />
        <rect
          x="892.5"
          y="424.5"
          width="47"
          height="47"
          rx="23.5"
          fill="#F8FAFC"
        />
        <rect
          x="892.5"
          y="424.5"
          width="47"
          height="47"
          rx="23.5"
          stroke="#F1F5F9"
        />
        <rect
          x="904"
          y="436"
          width="24"
          height="24"
          fill="url(#pattern0_12001_294)"
        />
        <path
          d="M842 408.4C841.116 408.4 840.4 409.116 840.4 410C840.4 410.884 841.116 411.6 842 411.6C842.884 411.6 843.6 410.884 843.6 410C843.6 409.116 842.884 408.4 842 408.4ZM842 381L841.7 381L841.7 381.181L842 381.181L842.3 381.181L842.3 381L842 381ZM842 381.544L841.7 381.544L841.7 381.725L842 381.725L842.3 381.725L842.3 381.544L842 381.544ZM842 381.725L841.7 381.725L841.7 382.735L842 382.735L842.3 382.735L842.3 381.725L842 381.725ZM842 384.754L841.7 384.754L841.7 386.774L842 386.774L842.3 386.774L842.3 384.754L842 384.754ZM842 388.794L841.7 388.794L841.7 390.813L842 390.813L842.3 390.813L842.3 388.794L842 388.794ZM842 392.833L841.7 392.833L841.7 394.853L842 394.853L842.3 394.853L842.3 392.833L842 392.833ZM842 396.872L841.7 396.872L841.7 398.892L842 398.892L842.3 398.892L842.3 396.872L842 396.872ZM842 400.912L841.7 400.912L841.7 402.931L842 402.931L842.3 402.931L842.3 400.912L842 400.912ZM842 404.951L841.7 404.951L841.7 406.971L842 406.971L842.3 406.971L842.3 404.951L842 404.951ZM842 408.99L841.7 408.99L841.7 410L842 410L842.3 410L842.3 408.99L842 408.99Z"
          fill="#CBD5E1"
        />
        <path
          d="M840.4 410C840.4 410.884 841.116 411.6 842 411.6C842.884 411.6 843.6 410.884 843.6 410C843.6 409.116 842.884 408.4 842 408.4C841.116 408.4 840.4 409.116 840.4 410ZM760.4 420C760.4 420.884 761.116 421.6 762 421.6C762.884 421.6 763.6 420.884 763.6 420C763.6 419.116 762.884 418.4 762 418.4C761.116 418.4 760.4 419.116 760.4 420ZM762 420H762.3C762.3 419.679 762.316 419.361 762.346 419.049L762.047 419.019L761.749 418.99C761.717 419.323 761.7 419.659 761.7 420H762ZM762.428 417.096L762.715 417.183C762.901 416.57 763.146 415.982 763.443 415.427L763.179 415.285L762.915 415.144C762.599 415.733 762.338 416.358 762.141 417.009L762.428 417.096ZM764.27 413.656L764.501 413.846C764.905 413.355 765.355 412.905 765.846 412.501L765.656 412.27L765.466 412.038C764.944 412.466 764.466 412.944 764.038 413.466L764.27 413.656ZM767.285 411.179L767.427 411.443C767.982 411.146 768.57 410.901 769.183 410.715L769.096 410.428L769.009 410.141C768.358 410.338 767.733 410.599 767.144 410.915L767.285 411.179ZM771.019 410.047L771.049 410.346C771.361 410.316 771.679 410.3 772 410.3V410V409.7C771.659 409.7 771.323 409.717 770.99 409.749L771.019 410.047ZM772 410V410.3H772.972V410V409.7H772V410ZM774.917 410V410.3H776.861V410V409.7H774.917V410ZM778.806 410V410.3H780.75V410V409.7H778.806V410ZM782.694 410V410.3H784.639V410V409.7H782.694V410ZM786.583 410V410.3H788.528V410V409.7H786.583V410ZM790.472 410V410.3H792.417V410V409.7H790.472V410ZM794.361 410V410.3H796.306V410V409.7H794.361V410ZM798.25 410V410.3H800.194V410V409.7H798.25V410ZM802.139 410V410.3H804.083V410V409.7H802.139V410ZM806.028 410V410.3H807.972V410V409.7H806.028V410ZM809.917 410V410.3H811.861V410V409.7H809.917V410ZM813.806 410V410.3H815.75V410V409.7H813.806V410ZM817.694 410V410.3H819.639V410V409.7H817.694V410ZM821.583 410V410.3H823.528V410V409.7H821.583V410ZM825.472 410V410.3H827.417V410V409.7H825.472V410ZM829.361 410V410.3H831.306V410V409.7H829.361V410ZM833.25 410V410.3H835.194V410V409.7H833.25V410ZM837.139 410V410.3H839.083V410V409.7H837.139V410ZM841.028 410V410.3H842V410V409.7H841.028V410Z"
          fill="#CBD5E1"
        />
        <path
          d="M843.6 410C843.6 410.884 842.884 411.6 842 411.6C841.116 411.6 840.4 410.884 840.4 410C840.4 409.116 841.116 408.4 842 408.4C842.884 408.4 843.6 409.116 843.6 410ZM917.6 420C917.6 420.884 916.884 421.6 916 421.6C915.116 421.6 914.4 420.884 914.4 420C914.4 419.116 915.116 418.4 916 418.4C916.884 418.4 917.6 419.116 917.6 420ZM916 420H915.7C915.7 419.679 915.684 419.361 915.654 419.049L915.953 419.019L916.251 418.99C916.283 419.323 916.3 419.659 916.3 420H916ZM915.572 417.096L915.285 417.183C915.099 416.57 914.854 415.982 914.557 415.427L914.821 415.285L915.085 415.144C915.401 415.733 915.662 416.358 915.859 417.009L915.572 417.096ZM913.73 413.656L913.499 413.846C913.095 413.355 912.645 412.905 912.154 412.501L912.344 412.27L912.534 412.038C913.056 412.466 913.534 412.944 913.962 413.466L913.73 413.656ZM910.715 411.179L910.573 411.443C910.018 411.146 909.43 410.901 908.817 410.715L908.904 410.428L908.991 410.141C909.642 410.338 910.267 410.599 910.856 410.915L910.715 411.179ZM906.981 410.047L906.951 410.346C906.639 410.316 906.321 410.3 906 410.3V410V409.7C906.341 409.7 906.677 409.717 907.01 409.749L906.981 410.047ZM906 410V410.3H905V410V409.7H906V410ZM903 410V410.3H901V410V409.7H903V410ZM899 410V410.3H897V410V409.7H899V410ZM895 410V410.3H893V410V409.7H895V410ZM891 410V410.3H889V410V409.7H891V410ZM887 410V410.3H885V410V409.7H887V410ZM883 410V410.3H881V410V409.7H883V410ZM879 410V410.3H877V410V409.7H879V410ZM875 410V410.3H873V410V409.7H875V410ZM871 410V410.3H869V410V409.7H871V410ZM867 410V410.3H865V410V409.7H867V410ZM863 410V410.3H861V410V409.7H863V410ZM859 410V410.3H857V410V409.7H859V410ZM855 410V410.3H853V410V409.7H855V410ZM851 410V410.3H849V410V409.7H851V410ZM847 410V410.3H845V410V409.7H847V410ZM843 410V410.3H842V410V409.7H843V410Z"
          fill="#CBD5E1"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_12001_294"
          x="86.4285"
          y="354.571"
          width="82.857"
          height="82.8563"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17.8571"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter1_f_12001_294"
          x="140"
          y="279.571"
          width="82.857"
          height="82.8563"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17.8571"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter2_f_12001_294"
          x="340"
          y="288"
          width="116"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter3_f_12001_294"
          x="270"
          y="216"
          width="116"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter4_f_12001_294"
          x="411"
          y="221"
          width="116"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter5_f_12001_294"
          x="165.857"
          y="172.571"
          width="82.857"
          height="82.8563"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17.8571"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter6_f_12001_294"
          x="337"
          y="144"
          width="116"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter7_f_12001_294"
          x="266"
          y="72"
          width="116"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter8_f_12001_294"
          x="150.857"
          y="32.5709"
          width="82.857"
          height="82.8563"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="17.8571"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter9_f_12001_294"
          x="300"
          y="0"
          width="116"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <filter
          id="filter10_f_12001_294"
          x="318"
          y="360"
          width="116"
          height="116"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="25"
            result="effect1_foregroundBlur_12001_294"
          />
        </filter>
        <clipPath
          id="bgblur_4_12001_294_clip_path"
          transform="translate(-659 -57)"
        >
          <rect x="699.5" y="97.5" width="279" height="279" rx="79.5" />
        </clipPath>
        <filter
          id="filter12_d_12001_294"
          x="760"
          y="41"
          width="164"
          height="33"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="3"
            operator="erode"
            in="SourceAlpha"
            result="effect1_dropShadow_12001_294"
          />
          <feOffset dy="5" />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_12001_294"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_12001_294"
            result="shape"
          />
        </filter>
        <pattern
          id="pattern0_12001_294"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_12001_294" transform="scale(0.000976562)" />
        </pattern>
        <linearGradient
          id="paint0_linear_12001_294"
          x1="106.819"
          y1="403.32"
          x2="98.7637"
          y2="398.691"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_12001_294"
          x1="95.2243"
          y1="389.39"
          x2="103.282"
          y2="394.021"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
        <linearGradient
          id="paint2_linear_12001_294"
          x1="732"
          y1="316.5"
          x2="374.354"
          y2="316.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint2_glow_12001_294"
          x1="78"
          y1="396"
          x2="178"
          y2="396"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0052CC" stopOpacity="0" />
          <stop offset="0.5" stopColor="#0052CC" />
          <stop offset="1" stopColor="#0052CC" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_12001_294"
          x1="732"
          y1="279"
          x2="401"
          y2="279"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint3_glow_12001_294"
          x1="131"
          y1="321"
          x2="231"
          y2="321"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00A1E0" stopOpacity="0" />
          <stop offset="0.5" stopColor="#00A1E0" />
          <stop offset="1" stopColor="#00A1E0" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint4_linear_12001_294"
          x1="353.705"
          y1="340.87"
          x2="359.63"
          y2="351.131"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#058F92" />
          <stop offset="0.5" stopColor="#038489" />
          <stop offset="1" stopColor="#026D71" />
        </linearGradient>
        <linearGradient
          id="paint5_linear_12001_294"
          x1="732"
          y1="291.5"
          x2="401"
          y2="291.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint5_glow_12001_294"
          x1="347"
          y1="346"
          x2="447"
          y2="346"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1A9BA1" stopOpacity="0" />
          <stop offset="0.5" stopColor="#1A9BA1" />
          <stop offset="1" stopColor="#1A9BA1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint6_linear_12001_294"
          x1="732"
          y1="255.5"
          x2="401"
          y2="255.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint6_glow_12001_294"
          x1="278"
          y1="274"
          x2="378"
          y2="274"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#000000" stopOpacity="0" />
          <stop offset="0.5" stopColor="#000000" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint7_linear_12001_294"
          x1="3468.74"
          y1="279.916"
          x2="2262.75"
          y2="1689.29"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
        <linearGradient
          id="paint8_linear_12001_294"
          x1="3544.94"
          y1="295.636"
          x2="2149.91"
          y2="1832.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.18" stopColor="#0052CC" />
          <stop offset="1" stopColor="#2684FF" />
        </linearGradient>
        <linearGradient
          id="paint9_linear_12001_294"
          x1="732"
          y1="258"
          x2="401"
          y2="258"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint9_glow_12001_294"
          x1="420"
          y1="279"
          x2="520"
          y2="279"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2684FF" stopOpacity="0" />
          <stop offset="0.5" stopColor="#2684FF" />
          <stop offset="1" stopColor="#2684FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint10_linear_12001_294"
          x1="732"
          y1="225.5"
          x2="401"
          y2="225.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint10_glow_12001_294"
          x1="158"
          y1="214"
          x2="258"
          y2="214"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#62D84E" stopOpacity="0" />
          <stop offset="0.5" stopColor="#62D84E" />
          <stop offset="1" stopColor="#62D84E" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint11_linear_12001_294"
          x1="356.014"
          y1="195.062"
          x2="356.014"
          y2="208.949"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00B9F2" />
          <stop offset="0.205" stopColor="#00A3E1" />
          <stop offset="0.515" stopColor="#0088CD" />
          <stop offset="0.79" stopColor="#0078C0" />
          <stop offset="1" stopColor="#0072BC" />
        </linearGradient>
        <linearGradient
          id="paint_sap_path_12001_294"
          x1="732"
          y1="217"
          x2="401"
          y2="217"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint_sap_glow_12001_294"
          x1="345"
          y1="202"
          x2="445"
          y2="202"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#049AD8" stopOpacity="0" />
          <stop offset="0.5" stopColor="#049AD8" />
          <stop offset="1" stopColor="#049AD8" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint12_linear_12001_294"
          x1="289.166"
          y1="130.434"
          x2="289.166"
          y2="138.667"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#35B8F1" />
          <stop offset="1" stopColor="#28A8EA" />
        </linearGradient>
        <linearGradient
          id="paint13_linear_12001_294"
          x1="279.339"
          y1="124.614"
          x2="285.56"
          y2="135.388"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#1784D9" />
          <stop offset="0.5" stopColor="#107AD5" />
          <stop offset="1" stopColor="#0A63C9" />
        </linearGradient>
        <linearGradient
          id="paint14_linear_12001_294"
          x1="732"
          y1="183.5"
          x2="401"
          y2="183.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint14_glow_12001_294"
          x1="270"
          y1="130"
          x2="370"
          y2="130"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#28A8EA" stopOpacity="0" />
          <stop offset="0.5" stopColor="#28A8EA" />
          <stop offset="1" stopColor="#28A8EA" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint15_linear_12001_294"
          x1="732"
          y1="155.5"
          x2="401"
          y2="155.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint15_glow_12001_294"
          x1="144"
          y1="74"
          x2="244"
          y2="74"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFBA00" stopOpacity="0" />
          <stop offset="0.5" stopColor="#FFBA00" />
          <stop offset="1" stopColor="#FFBA00" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint_kvark_path_1"
          x1="983"
          y1="197"
          x2="1120"
          y2="57"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient
          id="paint_kvark_path_2"
          x1="983"
          y1="213"
          x2="1120"
          y2="125"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient
          id="paint_kvark_path_3"
          x1="983"
          y1="229"
          x2="1120"
          y2="193"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient
          id="paint_kvark_path_4"
          x1="983"
          y1="245"
          x2="1120"
          y2="281"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient
          id="paint_kvark_path_5"
          x1="983"
          y1="261"
          x2="1120"
          y2="349"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient
          id="paint_kvark_path_6"
          x1="983"
          y1="277"
          x2="1120"
          y2="417"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" stopOpacity="0.5" />
          <stop offset="1" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient
          id="paint16_linear_12001_294"
          x1="732"
          y1="147.5"
          x2="401"
          y2="147.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint16_glow_12001_294"
          x1="308"
          y1="58"
          x2="408"
          y2="58"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ECB22E" stopOpacity="0" />
          <stop offset="0.5" stopColor="#ECB22E" />
          <stop offset="1" stopColor="#ECB22E" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="paint17_linear_12001_294"
          x1="732"
          y1="327.5"
          x2="401"
          y2="327.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient
          id="paint17_glow_12001_294"
          x1="327"
          y1="418"
          x2="427"
          y2="418"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7B83EB" stopOpacity="0" />
          <stop offset="0.5" stopColor="#7B83EB" />
          <stop offset="1" stopColor="#7B83EB" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint18_radial_12001_294"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(839 237) rotate(90) scale(140)"
        >
          <stop offset="0.439003" stopColor="white" />
          <stop offset="1" stopColor="#0526AA" />
        </radialGradient>
        <linearGradient
          id="paint19_linear_12001_294"
          x1="839"
          y1="97"
          x2="839"
          y2="377"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0526AA" stopOpacity="0.16" />
          <stop offset="1" stopColor="#0526AA" stopOpacity="0" />
        </linearGradient>
        <clipPath id="clip0_12001_294">
          <rect
            width="18.5714"
            height="18.5714"
            fill="white"
            transform="translate(91.9285 386.715)"
          />
        </clipPath>
        <clipPath id="clip1_12001_294">
          <rect
            width="26"
            height="26"
            fill="white"
            transform="translate(278 261)"
          />
        </clipPath>
        <clipPath id="clip2_12001_294">
          <rect
            width="17.1429"
            height="17.1429"
            fill="white"
            transform="translate(173.357 205.428)"
          />
        </clipPath>
        <clipPath id="clip3_12001_294">
          <rect
            width="26"
            height="26"
            fill="white"
            transform="translate(312 45)"
          />
        </clipPath>
        <clipPath id="clip5_12001_294">
          <rect
            width="140"
            height="140"
            fill="white"
            transform="translate(769 167)"
          />
        </clipPath>
        <clipPath id="clip6_12001_294">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(750 436)"
          />
        </clipPath>
        <image
          id="image0_12001_294"
          width="1024"
          height="1024"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAYAAAB/HSuDAAAQAElEQVR4Aez9CZxdVZnofz/POlWZ5wAJaLTFtm2HbmcBRQwyGRkUsXAEMlbmkDAZvPfzvvXe//0LCMgQCBCmOLVKnFARQW1p2/k69W3bHuzWVgQyz0NVqs563n3CYIYazrD3Xnv4nU/t1Dl7r7We5/muSuqcdSq1nHBDAAEEEEAAAQQQQAABBBBAAIGiCwgLAIWfYgpEAAEEEEAAAQQQQAABBBBAQFgA4IsAAQQQQAABBBBAAAEEEEAAgcILRAXyEwARAh8IIIAAAggggAACCCCAAAIIFFmgVhsLADUFDgQQQAABBBBAAAEEEEAAAQSKK3CgMhYADjDwBwIIIIAAAggggAACCCCAAAJFFXi6LhYAnnbgTwQQQAABBBBAAAEEEEAAAQSKKfBMVSwAPAPBJwQQQAABBBBAAAEEEEAAAQSKKPBsTSwAPCvBZwQQQAABBBBAAAEEEEAAAQSKJ/BcRSwAPEfBHQQQQAABBBBAAAEEEEAAAQSKJvDnelgA+LMF9xBAAAEEEEAAAQQQQAABBBAolsBB1bAAcBAGdxFAAAEEEEAAAQQQQAABBBAoksDBtbAAcLAG9xFAAAEEEEAAAQQQQAABBBAojsAhlbAAcAgHDxBAAAEEEEAAAQQQQAABBBAoisChdbAAcKgHjxBAAAEEEEAAAQQQQAABBBAohsBhVbAAcBgIDxFAAAEEEEAAAQQQQAABBBAogsDhNbAAcLgIjxFAAAEEEEAAAQQQQAABBBDIv8ARFbAAcAQJJxBAAAEEEEAAAQQQQAABBBDIu8CR+bMAcKQJZxBAAAEEEEAAAQQQQAABBBDIt0A/2bMA0A8KpxBAAAEEEEAAAQQQQAABBBDIs0B/ubMA0J8K5xBAAAEEEEAAAQQQQAABBBDIr0C/mbMA0C8LJxFAAAEEEEAAAQQQQAABBBDIq0D/ebMA0L8LZxFAAAEEEEAAAQQQQAABBBDIp8AAWbMAMAAMpxFAAAEEEEAAAQQQQAABBBDIo8BAObMAMJAM5xFAAAEEEEAAAQQQQAABBBDIn8CAGbMAMCANFxBAAAEEEEAAAQQQQAABBBDIm8DA+bIAMLANVxBAAAEEEEAAAQQQQAABBBDIl8Ag2bIAMAgOlxBAAAEEEEAAAQQQQAABBBDIk8BgubIAMJgO1xBAAAEEEEAAAQQQQAABBBDIj8CgmbIAMCgPFxFAAAEEEEAAAQQQQAABBBDIi8DgebIAMLgPVxFAAAEEEEAAAQQQQAABBBDIh8AQWbIAMAQQlxFAAAEEEEAAAQQQQAABBBDIg8BQObIAMJQQ1xFAAAEEEEAAAQQQQAABBBDIvsCQGbIAMCQRDRBAAAEEEEAAAQQQQAABBBDIusDQ+bEAMLQRLRBAAAEEEEAAAQQQQAABBBDItkAd2bEAUAcSTRBAAAEEEEAAAQQQQAABBBDIskA9ubEAUI8SbRBAAAEEEEAAAQQQQAABBBDIrkBdmbEAUBcTjRBAAAEEEEAAAQQQQAABBBDIqkB9ebEAUJ8TrRBAAAEEEEAAAQQQQAABBBDIpkCdWbEAUCcUzRBAAAEEEEAAAQQQQAABBBDIokC9ObEAUK8U7RBAAAEEEEAAAQQQQAABBBDInkDdGbEAUDcVDRFAAAEEEEAAAQQQQAABBBDImkD9+bAAUL8VLRFAAAEEEEhcYFHHxjFLZ2wZVzsWnLP5eYveuWVa7Zj/zi0vX3zullfUjvnn7zypdkTn37TgnTvOOvxYdM6WM2vXF56748Ra+0Xv3DttTseOSR0dNizxAgiAAAIIIIAAAukKNBCNBYAGsGiKAAIIFFVg5vTfj6i94KwdB150nhm96MzAMffc7S+aF73oret4x7ZXzz9ny0n1HAvO2TZ9wdnRC+fBjnO3nrPg3C0X1o5F52z94MJztsx9+ti6eOF52y47cJy79SOLztvWVTsWnrv12oXnbrnpwHHe1jsWnbPt3tqx4Oytf7fgvG3raseic7c+NP/crY/Ujqj/9xees/XHB45zt/3zgnO3/qZ2+O62n/a26Y9rh6j7lvf6SO1Qr1+oiq6rSmWd9vl7a4f3lXvE202HH14rN9eum9h9VVdZ52X/I+377fuT9+/41cJ3bf9FFPtrC87feufCd+34nwvfuW3WondtOXPhu7cf39VlPC8o6l9y6kIAAQQQKKxAI4Xxjb4RLdoigAACBRDoPHPzX89/+5Y582dsvnnBjC2PRp9/MWz4uF/0ePlx7fC9+q0+lUf6PSrR+biP9mjMfg99xHn/UPTCd11dh9rfmem9zx0S3R/gELHVotWbBj1MPiamXbXDi/wPE73swKGy2MzmHjhEPuTNLqwdJnKeiZ514DB5q1c7qXaIk1eL2StqRzTOi1RkWu2I+k8ylXEHDrGKpHQzkxGm+mLx7pQohw9E+V7prXKzVeXrG3+1/ScL37XtkwvP37F4/nnbX9/Zae0ppUUYBBBAAAEEEGhOoKFeLAA0xEVjBBBAIJ8CB97Zf/vW+fPfvvXrovolM7ncvJ7pvTw/+jwin1WRddwC3nS0mb7evC1WlU+6Ddu/v/D87dcuOm/bqR0d6S1SxF0X4yGAAAIIIFBcgcYqYwGgMS9aI4AAArkS6Dz3yVEL37F1ca/Jt6J3qS+N3vE9PlcFkGxgAR1rXs7zqrcf1bvj2wvfuXXx4vN3Tg6cFOERQAABBBBA4FmBBj+zANAgGM0RQACBvAjMe/vmN2jf8C9Xq7bYm4zNS97kmU0BM5li4hZXre/RBe/advnyd22bkM1MyQoBBBBAAIHyCDRaKQsAjYrRHgEEEMi8gOmCGVuXOJX7o3dvp2U+XRLMl4C5kWI6p8f04UXnb3u3RA/yVQDZIoAAAgggUBiBhgthAaBhMjoggAAC2RXomm5tC87a9r+9t0XmlX/jsztVuc/MnIz3ov97/vlb7+08d+dRuS+IAhBAAAEEEMidQOMJ8+SwcTN6IIAAAhkVMN0wYts1Xuz8jCZIWgUUUKmc6Nr8Fxact+01wg0BBBBAAAEE0hNoIhILAE2g0QUBBBDIosCCt29dXjU7O4u5kVPhBY5RJ/cveve2UwtfKQUigAACCCCQEYFm0mABoBk1+iCAAAIZE5j/9s2neZN5GUuLdEokYKrDzMtNLAKUaNIpFQEEEEAgpEBTsVkAaIqNTggggEB2BGaft2msivufwg2BwAJPLwLojQvO3/XKwKkQHgEEEEAAgYILNFceCwDNudELAQQQyIzAsB5d6c2mZCYhEim1gKmMMOm9dfH5OyeXGoLiEUAAAQQQSFKgybFZAGgSjm4IIIBAFgTmz9jy8ugF1zuzkAs5IPCsgIqb6tX/P8INAQQQQAABBBIRaHZQFgCalaMfAgggEFwgeulftavNlH/Lg88FCRwuYCbTF1yw46zDz/MYAQQQQAABBFoWaHoAnjQ2TUdHBBBAIKzA/Ldvm2GqrwubBdERGFhAvf8fF525fvTALbiCAAIIIIAAAo0LNN+DBYDm7eiJAAIIBBOYOf33I8TssmAJEBiBOgRM9Kgxo4azO0UdVjRBAAEEEECgboEWGrIA0AIeXRFAAIFQAsNHjJ1tIseFik9cBOoV8KqXLOjY/Lx629MOAQQQQAABBAYXaOUqCwCt6NEXAQQQCCAw97QNU8TLnAChCYlAwwIqMlz72pY33JEOCCCAAAIIINCfQEvnWABoiY/OCCCAQPoClfa2y011ZPqRiYhAswL2jsXv3v7aZnvTDwEEEEAAAQSeFWjtMwsArfnRGwEEEEhVYOHbt/6tmpydalCCIdCigImqeX+ViGmLQ9EdAQQQQACBcgu0WD0LAC0C0h0BBBBIT8Ci1/7+Ki/CiyjhljsBdX+78N3b3pG7vEkYAQQQQACBDAm0mgoLAK0K0h8BBBBISWD+jG3neFN+jDolb8IkIGByxcyZNiKBkRkSAQQQQACBMgi0XCMLAC0TMgACCCCQvMAz2/7xi9SSpyZCggIqbsqonTsuEW4IIIAAAggg0IRA611YAGjdkBEQQACBxAVGDB8/10yOTTwQARBIWsBk3tKOXUcnHYbxEUAAAQQQKJxADAWxABADIkMggAACSQpcet7uKWZ+VpIxGBuBFAVG9VX7lqUYj1AIIIAAAggUQiCOIlgAiEORMRBAAIEEBXp6eq40tv1LUJihUxcwOX/xBVtekXpcAiKAAAIIIJBfgVgyZwEgFkYGQQABBJIRmHfGxldHI8+IDj4QKIyAijrxbVcWpiAKQQABBBBAIHGBeAKwABCPI6MggAACCQiYVkSvZtu/BGgZMriAib1xyfnb3xY8ERJAAAEEEEAgDwIx5cgCQEyQDIMAAgjELdB55pZ3euf+Ju5xGQ+BrAh48R/u6LBhWcmHPBBAAAEEEMiqQFx5sQAQlyTjIIAAAjEKdJ775KjoH+jlMQ7JUAhkUMBNO6pv+/szmBgpIYAAAgggkCWB2HKJnl/GNhYDIYAAAgjEJKD7h8/zqsfENBzDIJBlgUULz94+McsJkhsCCCCAAAJhBeKLzgJAfJaMhAACCMQisOSMTceJ2CWxDNbgIOqs2zm5V538/6LPjzbYneYINCygomN1mF/UcEc6IIAAAgggUBaBGOtkASBGTIZCAAEE4hDoq7grTHREHGM1Mkb0gt/Uy4I7H558410PT/589Hm5Ov1EI2PQFoFmBLzoexe+e/vxzfSlDwIIIIAAAkUXiLM+FgDi1GQsBBBAoEWBBTM2vkZMzmpxmOa6q371zkeO+unBnXv27bhFVZ46+Bz3EYhbwIm2qQnbAsYNy3gIIIAAAkUQiLUGF+toDIYAAggg0LRAl5gTqwTZ9u/Aj/7LsFsOT37tYy/qFrNbDz/PYwQSEHjrovO3npzAuAyJAAIIIIBAjgXiTZ0FgHg9GQ0BBBBoWuCpt295lzd5ZdMDtNBRxd29+htj1ks/t7semfxVp/6f+7nEKQRiFTDR2raAlVgHZTAEEEAAAQTyLBBz7iwAxAzKcAgggEAzAheduX60mF7aTN9W+5jahu59E+8feBy1qrNrar8jYOA2XEGgdQEVffExfscFrY/ECAgggAACCBRDIO4qWACIW5TxEEAAgSYERrn2+SZydBNdW+7ixF2/9jHtHmygu79xzK+i6w9HBx8IJCrgvS2bfd6msYkGYXAEEEAAAQTyIRB7liwAxE7KgAgggEBjAnNnbHm+mFzUWK94WjvVX931zYl1vbAf3j78elUbdKEgnqwYpcwCqjppeHvbvDIbUDsCCCCAAAJPC8T/JwsA8ZsyIgIIINCQQJvZldG7/8Mb6hRDY+fEvJNrRDQKL0PebvnqmA0qsla4IZCwgHq5ZFnH1hckHIbhEUAAAQQQyLZAAtmxAJAAKkMigAAC9QosOGvzG73ZGfW2j7Odmj645huTGvrlfr6y/x6ntjHOPBgLgSMEVNt7q7biiPOcQAABBBBAoEQCSZTKAkASqoyJAAII1CHQuMMU4QAAEABJREFUJeaqKlfW0TT2JrVt/9QNu7XRgdd87bi94uWI7QIbHYf2CAwloFI5a2HH9tcJNwQQQAABBMopkEjVLAAkwsqgCCCAwNACT5y16T1q9oqhW8bfQgfZ9k+GuE395uQHncqvh2jGZQRaFlBf/UhXl/FcpWVJBkAAAQQQyJ9AMhnzTTUZV0ZFAAEEBhWobfsXvf2/ZNBGCV0cetu/wQN3iXqx6jXRIoAN3pKrCLQoYJWXbfi/289pcRS6I4AAAgggkD+BhDJmASAhWIZFAAEEBhMYKZVF0fuaRw3WJqlr9Wz7N1TsOx8+5pdm8uhQ7biOQMsCpitWdNjIlsdhAAQQQAABBHIkkFSqLAAkJcu4CCCAwAACi87cMk3MfXCAy4medg1s+zdUIhUdfh3bAg6lxPVWBVRlSk9126xWx6E/AggggAACORJILFUWABKjZWAEEECgf4E+tQ+L+mH9X03urGtw27+hMln9jTHrnVY+OVQ7riPQuoCbu6hj99TWx2EEBBBAAAEE8iCQXI4sACRny8gIIIDAEQKdZ24+QczedsSFFE5oE9v+DZVW1e1boyKbhmrHdQRaFBih1b5lLY5BdwQQQAABBPIhkGCWLAAkiMvQCCCAwMECHR0PVMTLyoPPpXW/2W3/hsqvti2gqjS8neBQ43IdgcMFvNl5C87f9crDz/MYAQQQQACBogkkWQ8LAEnqMjYCCCBwkMCEHad3iLOXHnQqvbvq1tR+ZD+JgFO/MenLjm0Bk6BlzIMEVNVVrHq1iOlBp7mLAAIIIIBA0QQSrYcFgER5GRwBBBB4WmD2eZvGqvmlTz9K98/atn89eyeuTSpqbVtAX/XXRosAbAuYFDLjHhAwJ69Z9K6tZxx4wB8IIIAAAggUUiDZolgASNaX0RFAAIEDAu09ukjUJh54kPIfcWz7N1TKax45+hdRm29FBx8IJCugenlHh6X+SzSTLYrREUAAAQQQeEYg4U8sACQMzPAIIIBA5+lbX2Be3x9CwsW47d9Q+feZ3KAiPUO14zoCLQmom3ZU3/Yg22i2lDedEUAAAQQQqEMg6SYsACQtzPgIIFB6AVV/tRRg27+hJvKehyf/SVQ+NVQ7riPQqoCaLFp8/s7JrY5DfwQQQAABBDImkHg6LAAkTkwABBAos8DCGVtONLW3hjDQBLb9G6qOvX29dynbAg7FxPVWBZyO9q66uNVh6I8AAggggEC2BJLPhgWA5I2JgAACJRWobfvXV7VCbfs31FR+6tGpe8zJbUO14zoCrQpEC1wdi8/f9FetjkN/BBBAAAEEMiOQQiIsAKSATAgEECinwIQdp75PxcK8QElw27+hZvO4hyZ90Tn5l6HacR2BFgUqoi7IAluLedMdAQQQQACBfgXSOMkCQBrKxEAAgdIJLJ2xZVz0DuWiEIWbtw1Jbvs3VE21bQFF7fqh2nEdgVYFTConLnzPzre0Og79EUAAAQQQyIBAKimwAJAKM0EQQKBsAj3elkQvgsNs+1dx1699TLtDmt/59aN+qqLfDpkDscshoL764a7p1laOaqkSAQQQQKC4AulUxgJAOs5EQQCBEgnMPm398WLyvhAlp7nt31D1Vap2vVPZP1Q7riPQmoAev3Hyzo7WxqA3AggggAACgQVSCs8CQErQhEEAgfIItFUqHxZJ/x3J6B90806uEVGTDNxWPzr5cS/+MxlIhRSKLmC2rLNj6/iil0l9CCCAAALFFUirsuj5YlqhiIMAAggUX2D+mRtPiaoM8n+SVfXBNd+Y9M9R/Mx87OurrlaVzZlJiESKKjC+3bd1FrU46kIAAQQQKLxAagWyAJAaNYEQQKDoAh0dVjFxV4SoU8W61Q27NUTswWLWtgUUk9sHa8M1BOIQMO8/tPjd214Yx1iMgQACCCCAQLoC6UVjASA9ayIhgEDBBSbs3PIBEfvLMGW6Nau/MWZ9mNiDR9065jtfUNV/H7wVVxFoUUCl3VQua3EUuiOAAAIIIJC+QIoRWQBIEZtQCCBQXIHO07eOd+YXhqjQatv+9UxcGyJ2PTHXrbuw2iaVa+tpSxsEWhIwPWPhu3ec2NIYdEYAAQQQQCBlgTTDsQCQpjaxEECguAJqy0x0QogCXQa2/Ruq7tu/Mf4nqvbdodpxHYFWBVTsqq4u4/lNq5D0RwABBBBISyDVOHyDTJWbYAggUESBhadtP160emGI2pzqr+765sSHQ8RuNGalXa91bAvYKBvtGxf4603/d/s7G+9GDwQQQAABBEIIpBuTBYB0vYmGAAIFFPBt1ZUiWpGUb9E/4Jna9m+o8lc/OPlxMf27odpxHYFWBby4y664aP3oVsehPwIIIIAAAokLpBwgev6YckTCIYAAAgUS6Dxr06lm/uQQJWkGt/0bymF/e/UOZ7ZtqHZcR6AVARWbvGfPyNmtjEFfBBBAAAEE0hBIOwYLAGmLEw8BBAoj0Pk6axeTK0MUFL3AyeS2f0NZ3PfVo3eZc7cN1Y7rCLQqoCKzlpy357hWx6E/AggggAACCQqkPjQLAKmTExABBIoioEdt+lBUy19ER4CP7G77NxTG1tHffsCZ/sdQ7biOQGsCNsK39V7a2hj0RgABBBBAIEmB9MdmASB9cyIigEABBOac9fgk73VBiFIs49v+DWVS2xaw4irXDNWO6wi0KqBm5yy4YNtrWh2H/ggggAACCCQiEGBQFgACoBMSAQTyL1CxEctUZWyIStrUfWztY9odInZcMWvbAjqnj8U1HuMg0J+Aqap4d6WIaX/XOYcAAggggEBIgRCxWQAIoU5MBBDItcCiszb+ZfSC4oIQRTjVX93x6MRvhogdd0yvcq2o7417XMZD4GABp/bqRR07zzr4HPcRQAABBBDIgECQFFgACMJOUAQQyLNArynb/sUwgWu+PumPTiqfjWEohkBgcAEvly+d8dvhgzfiKgIIIIAAAmkKhInFAkAYd6IigEBOBea/ffNpKvKmEOlrDrf9G8qp3Wy1E7YFHMqJ660K2POqo46+uNVR6I8AAggggEBsAoEGYgEgEDxhEUAgfwIHtv3zdkWIzFUsl9v+DWW16uHJO0Vt9VDtuI5AywKmnZ3v33lUy+MwAAIIIIAAAjEIhBqCBYBQ8sRFAIHcCejkrRebyAvDJJ7fbf+G8toy8rufE6+/Haod1xFoSUBtdFuvLWlpDDojgAACCCAQj0CwUVgACEZPYAQQyJPAnLN2TPLqO0PknPdt/4YyO7AtYJuxLeBQUFxvXcDsgoUdm17a+kCMgAACCCCAQCsC4fqyABDOnsgIIJAjgYrsX67Gtn9JTdkdX5v8YxX5x6TGZ1wEnhGomB+28pn7fEIAAQQQQCCMQMCoLAAExCc0AgjkQ6DzzM1/Labnh8i2SNv+DeXnpPc6Fesbqh3XEWhFwImdsOQ926a3MgZ9EUAAAQQQaEUgZF8WAELqExsBBHIhYOKvFrFK2slG/0Cbd3KNiJqU4HbHQ1N/pyKfL0GplBhYwJte2TXd2gKnQXgEEEAAgXIKBK06en4ZND7BEUAAgUwLdJ6x5Uw1fUOIJLWA2/4N5djudZXztn2odlxHoEWBF22YvPN9LY5BdwQQQAABBJoQCNuFBYCw/kRHAIEMC9S2/VOxy0KkGMUt5LZ/Q1k+vS1g5Y6h2nEdgZYFzJYsf9e2CS2PwwAIIIAAAgg0IhC4LQsAgSeA8AggkGGByZtnmdgLwmRY3G3/hvLcMnrC36nZfw7VjusItCKgKuP2V3RBK2PQFwEEEEAAgUYFQrdnASD0DBAfAQQyKbD4tJ2TxXRuiOSid//X9/RMXBsidhZirlunVVep3JiFXMih2AJe5AML3rXtL4pdJdUhgAACCGRIIHgqLAAEnwISQACBLAr0uv2XidiYELk5c9evfUy7Q8TOSsw7vjbxH1Tk+1nJhzyKKRA9CWpzTq8sZnVUhQACCCCQPYHwGUXf+8InQQYIIIBAlgQWnb75ZdGL/3eGyKlM2/4N5evEXRstArAt4FBQXG9NQOXURe/Z+abWBqE3AggggAACdQhkoAkLABmYBFJAAIFsCfSpXB1llPq/j1HAUm37FxkP+nHHQxN+J6oPDNqIiwjEIWD+yo6OBypxDMUYCCCAAAIIDCSQhfPR880spEEOCCCAQDYE5p25dUb07v/rQ2SjJdz2byhn67ZVzgvbAgq3hAVeenT1zPMTjsHwCCCAAALlFshE9SwAZGIaSAIBBLIgsHTGb4erVC8LlMte8/tvDhQ7s2HXfHvSDnV6V2YTJLHCCJja8kUdG4P83o/CIFIIAggggMAgAtm4xAJANuaBLBBAIAMC+/smzBKT54VIRUXvufPRqRtDxM56zCl7Jnwm+mb1+6znSX75Foj+Dk4yaw+y80e+5cgeAQQQQKAugYw0ip5TZSQT0kAAAQQCCsw9bcMU82z7F3AKBgzd9Zj2eaneMGADLiAQl4C5SxZ0bA6yCBhXCYyDAAIIIJBNgaxkxQJAVmaCPBBAIKhAxVVWiLNRIZJw1lb6bf+Gcl/z0NHfjb5hsS3gUFBcb0lAxYZHfx9XtDQInRFAAAEEEDhSIDNnoudTmcmFRBBAAIEgAvNP2/JyEzsnRHBT96s7Hp34zRCx8xbTe3edmlTzljf55ktAzWYsfvee1+Yra7JFAAEEEMi2QHayYwEgO3NBJgggEETAVLTvI1HoEP8eenV6jUj0sla4DSWw5uEJ/yWq64Zqx3UEWhGw6IvMtOcqEdNWxqEvAggggAACzwlk6E6IJ7wZKp9UEECg7ALzTtt8dvQufJB3+xzb/jX85dfXt/s2Z7ar4Y50QKAhAfe3C96z7eyGutAYAQQQQACBAQSydJoFgCzNBrkggECqAjOn/36Ec7o81aDPBdO9Yn23PPeQO3UJ3PvItK0mcmddjWmEQAsCWnWXz5xpI1oYgq4IIIAAAgjUBDJ1sACQqekgGQQQSFNgWPvYOSZ2XJoxn42lamz79yxGg59tw6RPO5X/Fm4IJCigTqaM2r3jkgRDMDQCCCCAQCkEslUkCwDZmg+yQQCBlARq2/6J2eyUwh0axtv6np6j1h56kkf1Cqz5ufaauBvrbU87BJoW8DJvaceuo5vuT0cEEEAAAQQyJsACQMYmhHQQQCAdgUql7XJRGZlOtEOjmGPbv0NFGn9019cnfMdEf9h4T3og0ICAyqiqr17aQA+aIoAAAgggcIhA1h6wAJC1GSEfBBBIXGD+WRteZeaD/IIvU/eru9n2L5Y5bq+4a5VtAWOxZJCBBcz0XYsv2PKKgVtwBQEEEEAAgQEFMneBBYDMTQkJIYBAsgKmVnVXRzE0OtL+8BXTjwrb/kkct9VfHf+f6vSLcYzFGAgMJKBqTnzblWwLOJAQ5xFAAAEEBhbI3hUWALI3J2SEAAIJCsw7Y/O5ovK3CYYYcGin+uCdj0769YANuNCwwMhed6szZVvAhuXo0IiAOXvjonfvCPM7Q48DbgEAABAASURBVBpJlLYIIIAAAtkSyGA2LABkcFJICQEEkhFY0WEjRXSFBLkp2/4l4H7TI+O3Rgs6dyUwNEMicKiAyvJFF+w899CTPEIAAQQQQGBggSxeYQEgi7NCTgggkIjA3h1b5qrYlEQGH2JQZdu/IYSav7xl1BOfVpPHmx+BngjUJVAR8dctes+O/7XkfXuCbB9aV5Y0QgABBBDIikAm82ABIJPTQlIIIBC3QOdZm441k1lxj1vPeKr6ZE/Pbrb9qweriTbr1r1yv4jd0ERXuiDQuIDZe3xv7yML37397kXv2XlVtCDwwcUXbL8w1uPCaLw8He+P8s3VsevCxe+P+fhQNF6ejkuifAtyLIvqaPS4dObuMy6duecNl84N86ZA4//w0COfAtnMmgWAbM4LWSGAQNwC3l0evUgcEfewdY3n/cfXPvai7rra0qgpgbu+MflbzutPm+pMJwQaF6ioypvF/Ewx+x8m0hXrYdF4MRxi2nXIIdHjJI7D48T1OIlca2M66ZK4j2i+JDo07iP62tIkjn7z1C6N5q6lI/LVJA6nXTrA4aPzjR5VlVuqap+oVvd8d8nMXY8sm73nfy2etf21wg2BOAUyOhYLABmdGNJCAIH4BDrftin6pu5nxDdi/SOp11/c9a2jH66/By2bFfBtlWtVxDfbn34IIIAAAiUUUJ3mzd6j0vbpaCFg3aUzd59RQgVKTkAgq0OyAJDVmSEvBBCIRSB6+8tJRVdGg0WvDaM/0/3w6ty1wrZ/ksZtzdfG/ZuKfimNWMRAAAEEECieQLQQ8IraTwcsnbXrziWz+V0fxZvhVCvKbDAWADI7NSSGAAJxCDx55pbzROyVcYzV+Bj6Nbb9a1ytlR7eVW51YntaGYO+CCCAAALlFjDRU9TswaWz9r213BJU37xAdnuyAJDduSEzBBBoUaDz3CdHiclyCXLTvU76bgoSusRB13xt3GZRWVNiAkpHAAEEEIhBwERGR8PctmzWnrnRZz4QaEwgw61ZAMjw5JAaAgi0KLCvvTN69/+YFkdpqruy7V9TbnF0aq9u/aQT/VMcYzEGAggggEB5BUx8xYtctmTOnkXlVaDyZgSy3MdlOTlyQwABBJoVmDtjy/NF3CXN9m+pn7f1PT1Hse1fS4jNd1718Et6nCrbAjZPSE8EEEAAgYMFvCxZOnv3zINPcR+BQQQyfYkFgExPD8khgECzAq7qLxf1w5vt30o/Vblh7WPKtn+tILbYd/XXJzwaDfGz6OADAQQQQACB1gVMr7h0VvdZrQ/ECMUXyHaFLABke37IDgEEmhA4sO2fyZlNdG25i6n7Fdv+tcwYzwDa9lE1tgWMB5NREEAAgXILmIgzqf6/C2dvP77cElQ/pEDGG7AAkPEJIj0EEGhMoEvMScUF2/avYvpRETXhFlxgTW1bQCcPBk+EBBBAAAEECiHgRUa167CPz5z5+xGFKIgiEhHI+qAsAGR9hsgPAQQaEnjirK3ni/gg2/6p2FfZ9q+h6Uq8cXtf+80itjfxQARAAAEEECiFgPf2V2PdMZeVoliKbEYg831YAMj8FJEgAgjUK3DRmetHuz5ZVm/7eNvpXhUfvdiMd1RGa01g1cNjNznVu1sbhd4IIIAAAggcJGDygeUzd7/6oDPcReAZgex/YgEg+3NEhgggUKfASKssMOePrrN5vM3M3X3no1M3xjsoo8Uh0N63Za0TfSKOsRgDAQQQQAABE3FV5/6/XV3WhgYChwjk4IHLQY6kiAACCAwpMOvMJ6aJdxcN2TCBBqr65P7eHZ9IYGiGjEGgti1gtDB0YwxDMQQCCCCAAAIHBMzspVv/sOeDBx7wBwLPCOThEwsAeZglckQAgSEFhvnhV4r4YUM2TKCBN3fj2sdexLZ/CdjGNeRdX538TVX/87jGYxwEEEAAAQRM3OLFF9tkJBB4RiAXn1gAyMU0kSQCCAwm0Hnm+hOilfjTB2uT1LXatn93Pzrxm0mNz7jxCVS8sC1gfJyMhAACCJRewMTGVNr2Lio9BADPCOTjEwsA+ZgnskQAgQEEOjoeqEi1rbbt3wAtEj3t2fYvUd9YB1/90FH/6lS+GuugDIYAAgggUGoBM3fhspndLyk1AsU/LZCTP1kAyMlEkSYCCPQvMHnbaReI2Ev7v5rsWaf6INv+JWsc9+iuve1Gp7Yn7nEZDwEEEECgnAImviJWvbqc1VP1wQJ5uc8CQF5mijwRQOAIgdq2f9E33iVHXEjlhO4V67sllVAEiU3g9i+P2yJe74ttQAZCAAEEECi9gHdy4rLZe08uPUS5AXJTPQsAuZkqEkUAgcMFRvphi8zkqMPPp/KYbf9SYU4iSPeeHfeL2ZNJjM2YCCCAAALlFDBvKzs6rFLO6qlaJD8GLADkZ67IFAEEDhJYdOaWadGLuDDb73hbv793Itv+HTQfebpb27FBRW/KU87kigACCCCQbQFTOf7Ycfs6sp0l2SUmkKOBWQDI0WSRKgII/FmgGq20i4TZ9k8rlY+tfUzZ9u/P05G7e3c8NPEb0dfPL3KXOAkjgAACCGRWwMyWXDXbxmY2QRJLTCBPA7MAkKfZIlcEEDgg0Hnm5tq2f6ceeJDyH7Vt/+56ZNIjKYclXOwCalbRj5qJj31oBkQAAQQQKKVA9D1l0j7Zs6CUxZe76FxVzwJArqaLZBFAoKPjgYp5CfXbdtn2r0Bfgnc9OPk3zsnXC1QSpSCAAAIIBBfQDy2es++FwdMggRQF8hWKBYB8zRfZIlB6gUnbT70weu/2r0JAsO1fCPVkY/Zq701isi/ZKIyOAAIIIFAWATNpr4itKEu91CkiOUNgASBnE0a6CJRZYOmMLeNMlG3/yvxFEHPt93x1ygZVYVvAmF0ZDgEEECizgDc7c8nsPa8vs0GZas9brSwA5G3GyBeBEgv09Noi8TYxCAHb/gVhTyPovt077lWxp9KIRQwEEEAAgXIIqMnVXV3Ga63iT3fuKuSLMndTRsIIlFNg7pnrXxRV/oHoSP1DRZ/c37uDbf9Sl08nYG1bQFNlW8B0uImCAAIIlELAVF62+fG955Wi2FIXmb/iWQDI35yRMQKlFHDV9g+LWVuQ4p3eUHuRGCQ2QVMRuPNrEx8y0d+lEowgCCCAAAKlEHBqy1essJGlKLasReawbhYAcjhppIxA2QQ6T994sog/JUTdavoLtv0LIZ92zGimzX837ajEQwABBBAoroD3ekx1197Zxa2QyvIowAJAHmeNnBEokUBHh1VU9MOBSvbq+q4VURNuhRdQdVsLXyQFIoAAAgikKuBN5lw616akGpRgaQnkMg4LALmcNpJGoDwCE7Zufp+ZvDhExSr21TsfnfrrELGJGUBA5S+EGwIIIIAAAnEKmIzwto9tAeM0zcxY+UyEBYB8zhtZI1AKgc7Tt453YmG2/fO6V9XfXApoipRFHRvHiMnboUAAAQQQQCBugegNhXOXzel5ZdzjMl5ggZyGZwEgpxNH2giUQcCJX2Ki44PU6tzd0bv/G4PEJmj6At3t80xsbPqBiYgAAgggUHQBHz2ZMev9iIhp0WstU315rZUFgLzOHHkjUHCBhadtP96LvDdImWbr9/dOZNu/IPjpB507Y8vzq2YXpx+ZiAgggAACZRGI1gBefem8njPLUm8J6sxtiSwA5HbqSByBYgt4610Zats/rVQ+tvYx7S62MNU9K9BWcVdEb8kMf/YxnxFAAAEEEEhCwPqqly9d+lu+3ySBm/qY+Q3IAkB+547MESiswLwzNr3VVE4OUaCJ+xXb/oWQDxOz85xNr1WzM8JEJyoCCCCAQJkEvMrz3Z7jPlSmmgtba44LYwEgx5NH6ggUUaBrurWJuasC1eYrqh8Vtv2TMty6usw5abs6WmxS4YYAAggggEAKAl5tweWdO49KIRQhEhTI89AsAOR59sgdgQIKPFnZ8kE1/6IQpTnRB+98dBLb/oXADxBz48+2vlvEXhEgNCERQAABBEoqYKaje/sqYXY4Kql5AmXnekiX6+xJHgEECiVQ2/ZP1c8PUpTXvaJ9twSJTdDUBS46c/1or7I09cAERAABBBAovYCpu2DxvJ1/VXqI3ALkO3EWAPI9f2SPQKEEVKuXRivjE4IUxbZ/QdhDBR3d3r5ATI8OFZ+4CCCAAALlFTDzFecrV5dXIOeV5zx9FgByPoGkj0BRBDrftv3FVrWOIPWw7V8Q9lBBF71zyzRVd1Go+MRFAAEEEEDATE5YOmvfW5HIn0DeM2YBIO8zSP4IFEVAe1eKaiVEOWz7F0I9XMyq1ytNbFi4DIiMAAIIIICAiDq7sqvL2oRbngRynysLALmfQgpAIP8CnadtOzWq4s3RkfoH2/6lTh40YOc7Np8QvetyetAkCI4AAggggEAk4M2O3/LHPe+N7vKRG4H8J8oCQP7nkAoQyLVA5+usXVzflYGKYNu/QPAhwkbvsjjnKleEiE1MBBBAAAEE+hMwkaXLZ24L8/uP+kuIc4MLFOAqCwAFmERKQCDPAjpx64fEy19IkBvb/gVhDxR0/c+3vsez7V8gfcIigAACCPQvoOOqleFhdkDqPyHODiJQhEssABRhFqkBgZwKzDnr8Ule/YIg6Xvd69j2Lwh9iKC1bf/MZEmI2MREAAEEEEBgUAGzDy6fuS/QmyGDZsbFQwUK8YgFgEJMI0UgkE+B9uqoZeplbJDs2fYvCHuooCOHDVtkokeFik9cBBBAAAEEBhIwkbaq+ssHus75rAgUIw9XjDKoAgEE8iaw8O2bXuq9XRAkb7b9C8IeKmht2z8n+sFQ8YmLAAIIIIDAUAKmctry2XtPGqod1wMKFCS0K0gdlIEAAjkT6KvKlaLGtn85m7c8plut6oc92/7lcerIGQEEECiVQFWrV3V0PBDkuVGpoJsstijdWAAoykxSBwI5Eph/2pYz1MubQqTMtn8h1MPFPLDtn8jbwmVAZAQQQAABBOoTMHMvnTr+nHfW15pWKQsUJhwLAIWZSgpBIB8CB7b98/6yQNn6iupHRdSEW+EFau+iqLiVwg0BBBBAAIG8CJitWLRo45i8pFuePItTKQsAxZlLKkEgHwLjN19iKi8Mkyzb/oVxDxN10r4z32NOXhomOlERQAABBBBoXMBMJrf1jJnTeE96JCpQoMFZACjQZFIKAlkXmHPWjknRi/95QfJk278g7KGCLppee/ekujhUfOIigAACCCDQrIAXmblk9p7jmu1Pv/gFijQiCwBFmk1qQSDjAm29vSvUAm37V9E1dz46dWPGiUgvJgE/hm3/YqJkGAQQQACBtAXMhlecLk87LPEGFCjUBRYACjWdFINAdgU6z9z81yb+XUEyrG37t3/SJ4PEJmjqArVt/8TbB1IPTEAEEEAAAQRiEjCzsxfP2vPamIZjmJYEitWZBYBizSfVIJBZAav6q6Pkgmxto5XKx9Y+pt1RfD5KIOD7Kiu92rASlEqJCCCAAAIFFfA8cARTAAAQAElEQVQmqs6uFDEtaIn5KatgmbIAULAJpRwEsiiw4PQtZ6nJG4LkpvrLux6Z9EiQ2ARNXWDxO3ac4MWfmnpgAiKAAAIIIBC3gOmrls3dOyPuYRmvMYGitWYBoGgzSj0IZEygo+PXw7yvBtv2z4m7Rtj2T8pw6+h4oFLVAz9pUoZyqREBBBBAoAQCVrUru2baiBKUmtUSC5cXCwCFm1IKQiBbAhO3TpkZZTQtOgJ8sO1fAPRgISftOf1CL/ZXwRIgMAIIIIAAAjELmOqUrW09F8c8LMPVLVC8hiwAFG9OqQiBzAgsPm3nZDGbGyQhtv0Lwh4q6OzzbKyqLAkVn7gIIIAAAggkJlCtdi6dtevoxMZn4IEFCniFBYACTiolIZAVgT7pvjzKZUx0pP/Btn/pmweM2F7dtsiLTAyYAqERQAABBBBIRMCrjNKKW5rI4Aw6qEARL7IAUMRZpSYEMiCw6PTNLzPR84KkwrZ/QdhDBe08Z+sL1PT9oeITFwEEEEAAgaQFzOTdi+ftekXScRj/EIFCPmABoJDTSlEIhBfoM/uImAX5N0bZ9i/8F0CKGaiXq9n2L0VwQiGAAAIIpC5gKq5N3BXCLUWBYoYK8uS8mJRUhQACzwrMP3XjO6IX/6979nGqn9n2L1Xu0MEWnrvjxOhJ0VtD50F8BBBAAAEEkhaompywrHMfW90mDf3s+AX9zAJAQSeWshAIJTBz+u9HiGqYbf+ceLb9CzXz6cetbftn3q9MPzIREUAAAQQQCCPgq35lZ6e1h4lerqhFrZYFgKLOLHUhEEigvTJqtokdFyS8Z9u/IO6Bgk7ed/r72PYvED5hEUAAAQTCCKhMG2Hd7wsTvFRRC1ssCwCFnVoKQyB9gbmnbZii4uZIkJvudZW+W4KEJmjqAktnbBknJotSD0xABBBAAAEEAgt4X128fOa2CYHTKHj44pbHAkBx55bKEEhdwIm7TMxGph74QEBdc+ejUzceuMsfhRfYX9HFbPtX+GmmQAQQQACB/gRUx1XbhrEI3p9NXOcKPA4LAAWeXEpDIE2Beac+Vdua5uw0Yz4XS239/uqkTz73mDuFFlh49vrjo3f/2fav0LNMcQgggAACQwi8f8Wc7r8cog2XmxQocjcWAIo8u9SGQGoCptG7/1dH7/4H+TdFrfKxtY9pd2rlEiiogMmwq0ykLWgSBEcAAQQQQCCgQPR9sFJVC/NLlwPWnVLoQodxha6O4hBAIBWBBadtPttUX5tKsMOD1Lb9+86kRw4/zeNiCsw/Z8tJXuSUYlZHVQgggAACCNQv4MVPXzJn75vr70HL+gSK3YoFgGLPL9UhkLjAzOm/H2HmVyQeqL8AtW3/nLtGRKOFcOFWcIGODqtYVdn2r+DzTHkIIIAAAvULOLOVte+P9feg5ZACBW/AAkDBJ5jyEEhaYIQbO9dEj006Tr/js+1fvyxFPTl537b3iZOXFLU+6kIAAQQQQKBRAe/kxVPG7Xt3o/1oP7BA0a+wAFD0GaY+BBIUmHva7ilebVaCIQYZmm3/BsEp3KUD2/5VZXHhCqMgBBBAAAEEWhRQtUtnz940tsVh6P60QOH/ZAGg8FNMgQgkJ1CxfVcI2/4lB8zIzwn0Ol0avcsx4bkT3EEAAQQQQACBAwImMmmsjp574AF/tChQ/O4sABR/jqkQgUQE5p2x8dWm/h2JDD7UoGz7N5RQoa4vPHv78dGTm/cWqiiKQQABBBBAIEYBrzbzskV7p8U4ZDmHKkHVLACUYJIpEYH4BUxd1V8tphr/2EOP6KRyHdv+De1UlBZe/MpoAYBt/4oyodSBAAIIIBC7QPR9sr2vxy+PfeCSDViGclkAKMMsUyMCMQt0nrbxnSbub2Ietr7hVH9557cnPVpfY1rlXWD+O7adEj2pOTnvdZA/AggggAACSQt41RnLO/eE2ZY56eLSGb8UUVgAKMU0UyQC8QnMnG4jRHSZhLix7V8I9WAxn97WqHpFsAQIjAACCCCAQM4EfFU/0tVlvMZrat7K0YkvjnLMM1UiEJvA8Mqm+WIyNbYBGxmIbf8a0cp928l7tn/A1P1l7guhAAQQQAABBFIS8Gov3/ZET5jf0ZRSjYmFKcnALACUZKIpE4E4BBZN3zjVzC6JY6zGx9C9vcN6b268Hz3yKHBg2z+zhXnMnZwRQAABBBAIKeDNX75ihY0MmUMeY5clZxYAyjLT1IlADAJ9Tq8S0RES5KZr7n/42E1BQhM0dYH9FVvGtn+psxMQAQQQQKAAAiY2pW/X3pkFKCXNEkoTiwWA0kw1hSLQmsCC0ze+RtSf1dooTfZWW7+/OumTTfamW84Eatv+icmFOUubdBFAAAEEEMiMgIrMWbBg1zGZSSjziZQnQRYAyjPXVIpA0wJdYs57Ydu/pgXp2IiAl+pKE2Xbv0bQaIsAAggggMBBAl5kVHufu/SgU9wdTKBE11gAKNFkUyoCzQo8dfqWd0V9Xxkd6X+w7V/65gEjLjhn03QTYdu/gHNAaAQQQACBggiYvHPZnF1hnr/ljLBM6bIAUKbZplYEmhDoPPfJUWIWZgWZbf+amLH8dumabm1ilSvzWwGZI4AAAgggkB0BU3Gmju+rMuStVA1YACjVdFMsAo0LuH3t883s6MZ7xtCDbf9iQMzPEBtGb/mgF3tRfjImUwQQQAABBLItYCJvWDpv9+nZzjJ0duWKzwJAueabahFoSGDu9D8935tc3FCn2Bqz7V9slDkYqPP0reO96oIcpEqKCCCAAAII5EpARa/s6rBhuUo6zWRLFosFgJJNOOUi0IiA0xFXitnwRvrE15Zt/+KzzP5IOtwuNZPx2c+UDBFAAAEEEMiXQPRmzrQtE/Z8IF9Zp5dt2SKxAFC2GadeBOoU6HzbpteKVMP8yBjb/tU5S8Vo1jlj+4ujhaaOYlRDFQgggAACCGRQwGThwoXbJ2Yws9AplS4+CwClm3IKRmBogS4xZ6JXi6oO3Tr+Fk4q1619TLvjH5kRsyjgnP+wqVaymBs5IYAAAgggUASB6Hnd2La+4YuLUEu8NZRvNBYAyjfnVIzAkAJPvm3TBSr+FUM2TKIB2/4loZrZMRedve1UL8a2f5mdIRJDAAEEECiMgMl7l83sfklh6omjkBKOwQJACSedkhEYTOCiM9ePVm9LB2uT2DW2/UuMNosDd77O2r31sT1RFieHnBBAAAEECidg4ivSVr2icIW1UFAZu7IAUMZZp2YEBhEY1VdZaE6PGqRJcpfY9i852wyOrFO2fsib+4sMpkZKCCCAAAIIFFLAi7xl2eyd/OTd07Nbyj9dKaumaAQQ6Fdg1ilPTDMvH+r3YuIn2fYvceIMBZhz1uOTVIRt/zI0J6SCAAIIIFAOAdPKyo4O43fvSDnm+/AqWQA4XITHCJRYoL3S/mFxNiwMAdv+hXEPE7W9MmqZNxkbJjpREUAAAQQQKK+AqRx/3Ph97ymvwDOVl/QTCwAlnXjKRuBwgc5TN58QfUN42+HnU3nMtn+pMGclSG3bPzO7ICv5kAcCCCCAAAJlE/BiS2fP3lTqhfiyzfmz9bIA8KwEnxEosUBHxwMVUVsZisCx7V8o+iBxnfauNGHbvyD4BEUAAQQQQCASMJFJY3Tk/OhuWT9KWzcLAKWdegpH4M8CkzZNf4+JvfTPZ1K8x7Z/KWKHDzX/7ZtP8+beHD4TMkAAAQQQQKDcAqZ60eI5+15YToXyVs0CQHnnnsoROCCwaPrGMX0qSw48SPsPtv1LWzxovNq2f+rs8qBJEBwBBBBAAAEEDgiYSHtFqisOPCjbHyWu15W4dkpHAIFIoNe5xU5lcnQ3/Q/Tr9z56KRfpx+YiCEE3DFbL4re/WfbvxD4xEQAAQQQQKAfAe/0zCXz97y+n0uFPlXm4lgAKPPsU3vpBRaduWWaeHt/GAjd29vee0uY2ERNW2DFWTsmiQr/1zBteOIhgAACCCAwhICaXN3VZWV6XTiESLEvM9HFnl+qQ2BQgb4+f3W4bf9szf0PH7tp0AS5WBiBfZU+tv0rzGxSCAIIIIBAkQTM5GVb/7T33CLVNHgt5b7KAkC555/qSywwd/qWE01sehCCA9v+HfXJILEJmrrAwrfvfKmZsu1f6vIERAABBBBAoD4BU12+YoWNrK91zluVPH0WAEr+BUD55RSobfun6leGqt5p5bq1j2l3qPjETVegz/VeGS02VdKNSjQEEEAAAQQQqFcg+j49pbpn7+x62+e5XdlzZwGg7F8B1F9KgQmb3vo+UfurMMXrL+/89qRHw8QmatoC89+x5Qw1eVPacYmHAAIIIIAAAo0K6JzlnXuObbRXztqXPl0WAEr/JQBA2QSWztgyzlxlUZC6Vb1rc9dItPog3AovUNv2T7y/rPCFUiACCCCAAAIFEPBmI7zosgKUMkgJXGIBgK8BBEomsK+7ukTFTwxSthnb/gWBDxO0MmXrJabuhWGiExUBBBBAAAEEGhYwO2/Zgp5XNtwvLx3IU1gA4IsAgRIJzD5t/fGi8r4wJeve3t4q2/6FwU89am3bPxOZl3pgAiKAAAIIIIBA0wJeRK3a+xERUyngjZKEBQC+CBAok0Cbr3xYRdqC1KzVNff/I9v+BbEPEHRfW99ybzI2QGhCIoAAAggggEALAib66qWdPWe0MERWu5JXJOCigw8EECiBwPzTtpxkam8JUqrK+v3VKWz7FwQ//aCd527+a/N6fvqRiYgAAggggAACcQioVa9YuvS3w+MYKztjkElNgAWAmgIHAgUX6OiwilWrV4cqk23/QsmHiVupuqtNjG3/wvATFQEEEEAAgZYFvMjz3b7jPtTyQFkagFwOCLAAcICBPxAotsDErZvnmpO/DFKl6s/Z9i+IfJCgtW3/qmZvCBKcoAgggAACCCAQm4Cpdq6YY5NiGzDwQIR/WoAFgKcd+BOBwgrMO23TOeJtSZACVb35vmtF1IRb4QU6On49LCryiujgAwEEEEAAAQRyLuDFxvbq3qU5L+PZ9Pn8jAALAM9A8Klxgc7XPTlq6QlbxqV1LDz5DxNnnfLEtLweC960/pilMyKvFI5F0zdOnXvaxrd0nrr5FjH7mKkE+nFse/Du7x77L8KtFAJH7Tn2YjOZVopiKRIBBBBAAIESCKhz71k2v/sl+S+VCp4VYAHgWYkSfp7zpidf2PmmDWfOfdOGhXPe9NSNc09a//l5J61/JLr/j3NPXv+z6PjNYIcf6X62r733x08f1ehz/Ed3e/XHzx59MvIHbb79kX4Pi84ncWg0bkxHtd091r03qqd27Is+J3H0RONGR6+Tv4/ec7/L1Af8Da66t3d/9eYS/tUqZcmd5+48ykTml7J4ikYAAQQQQKCgAma+Ila9KvflUcBzAiwAPEdR/DsdHQ9UOk9ef8K8N2388Ow3PfVNFfewF4teoNlSFZ0hKn8TvVM8Lbo/WURGRQcfCDQvoMK2f83r5a6nVnsv9Sajj8H6PQAAEABJREFUc5c4CSOAAAIIIIDAoALR9/c3Xzp/3ymDNsr4RdL7swALAH+2KOy9runWNvdN69854YlTHvRe7jfxlzjRFxS2YAoLLhAtJP1p+LDtnwieCAmkIrDo7M0vEzW2/UtFmyAIIIAAAgikL2BmV3V1WVv6kWOJyCAHCbiD7nO3gALzTtp0zuPdGx6NSrvGRI6PPvOBQOIC0T8sH1/18Et6Eg9EgEwI9NW2/fMaTXsm0iEJBBBAAAEEEIhZwJsdv/XJPRfGPGxKwxHmYAGesB2sUaD7tV/MN/fNT3zMtPqx6Gn51AKVRimZF7Bf3vWdox/JfJokGIvAgrO3nBW9+//6WAZjEAQQQAABBBDIroDZ0g932vjsJjhAZpw+RIAFgEM4ivFg1olPvHZvZf9DYpVzilERVeRGoLbtn/mPSvSKULgVXmDpjN8OF5PLC18oBSKAAAIIIICAeHHj98m+3P3CX6buUAEWAA71yP2jWSeuP6FSqdz1zC/yy309FJAzAbOvsO1fzuashXT73KRLvMnzWxiCrggggAACCCCQIwE1++DyBfv+Ikcpk+phAiwAHAaS54fzTl5/epuTu6J35PhN3HmeyNzmrnt7e6u35DZ9Em9IYOmMXUebybyGOtEYAQQQQAABBHItYCLt5m1Ffoog08MF3OEneJxPgdknb3iVeLkh+ks5LJ8VkHXuBbTKtn+5n8T6C+h1vcujd/9ZbKyfjJYIIIAAAggUQsDMzljeuee1uSiGJI8QYAHgCJL8neic/uRRrmo38+I/f3NXlIxN5U/Dh+1i27+iTOgQddS2/TPx7xyiGZcRQAABBBBAoKACVnVXikTPADNeH+kdKcACwJEmuTrT+Tprr+53q0RlSq4SJ9lCCVS0ciPb/hVqSgcpxtR7+R/mle8fgyhxCQEEEEAAgSILmPOvWja/+20Zr5H0+hHgCVw/KHk65YdvnKsir8pTzuRaNAH75Z3fnvRo0aqinv4FFs7Y9nYvyo/99c/DWQQQQAABBEojoF4u6+iwSnYLJrP+BFgA6E8lJ+cWnPjUX1jVOnOSLmkWUYBt/4o4qwPWNHP670eY2mUDNuACAggggAACCJRGwMS/6HmT9mf3vwSWZiYaK5QFgMa8MtTatE/0/6NOhmcoKVIpmwDb/pVqxoePGj/TmzyvVEVTLAIIIIAAAggMKOB93/yOjgcy+VMAAyZd8gssAOT0C2DOiRvOEZUTc5o+aRdAQFX2sO1fASayzhIWnLn+GPM2t87mNEMAAQQQQACBcghMe96E887MYKmkNIAACwADwGT59NM/hivLhRsCAQVM/N33/+OxmwKmQOg0BdqGrRCTUWmGJBYCCCCAAAIIZF+gKr4zezsCZN8tVIYsAISSbyFuW8/oOdHEHdvCEHRFoDUB0yfY9q81wjz1XnD21lea+XPzlDO5IoAAAggggEA6Air20kvnd78lnWh1RqHZgALR68gBr3EhgwJzT9gwJVphm53B1EipTALqrmfbv7JMuKn1+g+z7V9Z5ps6EUAAAQQQaEKgz97bRK/EujDwwAIsAAxsk80rru/yaAFgZDaTI6tSCKj+fM3fT/pWKWqlSJn/9m0zTPV1UCCAAAIIIIAAAgMKVPSUBQt2HTPg9XQvEG0QARYABsHJ2qXo3f+/VamcLdwQCCWg6l21ep2ImnArvEDt941EU822f4WfaQpEAAEEEECgNQEzX2mvtp3R2ihx9WacwQRYABhMJ1PXTL1UV0avujRTaZFMyQTswTsfm/rrkhVd2nJHjBw/y7wcV1oACkcAAQQQQACBugVU/NvqbpxkQ8YeVIAFgEF5snNx3kmbz3bOvTo7GZFJ+QR0b+/+6s3lq7ucFc89bcOUaDWfbf/KOf1UjQACCCCAQMMCqpXXdHZae8MdY+7AcIMLuMEvczULArUfw61KdUUWciGHEguorGHbv/LMf2VYZYWZ8vtGyjPlVIoAAggggEBLAmbVESOqu1/a0iCtd2aEIQRYABgCKAuX2/aPmhVNFNv+ZWEySpqDqvxx+LDtnyhp+aUre8GZW1+pomz7V7qZp2AEEEAAAQRaE6i0tb+otRFa7U3/oQSi15VDNeF6SIEFb1p/jJjwY7ghJ6H0sbXbKm75qodf0lN6ipIAmKvO8l60JOVSJgIIIIAAAgjEJFD18ryYhmpuGHoNKcACwJBEYRtUTZaz7Z9wCyXgZb1VbPaaR4/6t1ApEDd9AZXKCcINAQQQQAABBBBoUMCJH9Vgl1ibM9jQAiwADG0UrMWcN61/pRc5L1gCBwc26zWTnQMfFl2r49CoTQOHj9oGPcx2+qYPjfoOcPjofBKHReO2eERzvEHF/URM/3db9PV397eO+ZVwK5eA2a2q8q9ObZuK7OQ4zCD6t1CTOFwUp67D71TXwKFR2yQOi8Zt4LCobV2H+J3W1BF9j4q+Xq2/I5ovS+LQKGYSR381NHEuegNh5yFH9P1M8nSIHZp/GR9Hz4MkiaNfS4m8Wzyivw+SxBH9/ZUkjiFzjb4Gm/Hv1zcaq5Xzdf7djb5/7w/5pMXUVQLGJ3QdAiwA1IEUpolFf39lZfTEO+gcqekvzPsZO477x9fe+4OpJw58TImu1XH8Y9QmieN70biZO44+8d7vpXx8N4rX4nH3d4859a6/P2rWmu8e/XerHztmd5ivf6KGFLjzkckP3PXNyRfc+c2j3nzXI5NPPOR4OHoc9/FQNGa/x6QT73qohePrUd8Bjjui85k7Hpx04h1JHF+Jxs3T8aUo36aOCSfe8aWUjy9E8ZI41kXjxnDcHo2RyvH5CSfensTx2WjcJI7PjDvx9oSO26JxYz0+Ne7E25I4PhmNe8Qx5sTbPtnisTbqn6fjvijfvBz3RrnWcUx+3qjXur7KO6PXEFtDPJdQqQZ87hii4vzFDPriMn9c6WU856RNZ0Urna9NL+IAkdT+/t4fHveHdesurA7QgtMIIIAAAggggAACCCCQAYGuLvW3rh3x2+h1xPYQ6XjTLSHiHojJH3UJsABQF1O6jZbO+O1wFbs83aj9R7OqnNX/Fc4igAACCCCAAAIIIIBA1gSWztnzGlM5Pkhe1vZfQeKKCHHrE2ABoD6nVFvt2z72EhHLxm/QrMjfzHnLhjenCkAwBBBAAAEEEEAAAQQQaELA1KsGeSPRxPndfsd/NJF0HF0Yo04BFgDqhEqr2eI37pzss7btn9nVHR3GL/RI64uAOAgggAACCCCAAAIINCGwbM6es1QsyH8jVqn+y333Hb2ribRj6MIQ9QqwAFCvVErtut3e5U5lTErh6gqjIsePf2rDhXU1phECCCCAAAIIIIAAAgikLrB06W+Hi+plqQd+LmDb95+7m/Yd4tUtwAJA3VTJN+w8afNfi8r5yUdqPIJ5WzZz+rYJjfekBwIIIIAAAggggAACCCQu0H3cxV7k+YnHGSBAVeSRAS4lfpoA9QuwAFC/VeItvfReHb3bnsk5Uafj23p7FiSOQAAEEEAAAQQQQAABBBBoSGDFHJukpnMb6hRjY9XKr2+/e0So//8fYyXFHyqTLzaLz35khXNP2HCGiL5BsnxT+8DcU9a/KMspkhsCCCCAAAIIIIAAAmUTqGr3Mi82Nlzdfl242ERuRIAFgEa0Emrb+TprF+cD/n+degvTNqnqVfW2ph0CCCCAAAIIIIAAAggkK7C0s/vFJv6CZKMMPLqKbN2xf8PXBm6R8BWGb0iABYCGuJJpbMM2XCSiL5Q83NTeOvvNT56ch1TJEQEEEEAAAQQQQACBogt4q37ERILt2GVS+fTatS/qDuVM3MYEWABozCv21nNO2jHJROfHPnCCA6q6lV3TrS3BEAyNAAIIIIAAAggggAACQwgsm73rVDU5aYhmiV3W6N3/Yd3DP5VYgKEHpkWDAiwANAgWd3PV7mUS9P/rNF5R9Bf9+Cd6N7638Z70QAABBBBAAAEEEEAAgTgEOjosetffBf1vxCZ66w2f0j1x1NPcGPRqVIAFgEbFYmw/56SNfynegv1/nVZK8WJL2RawFUH6IoAAAggggAACCCDQvMCxE7o/4J28uPkRWuup4n7/1PaRX5SQN2I3LMACQMNk8XVQ8StFJVq5k9zdVGVcpbdnYe4SJ2EEEEAAAQQQQAABBHIusHSpjTPzQZ+Lm8oN69ZpNSQlsRsXYAGgcbNYenS+edOp0UBvio7cfqja+2efvP743BZA4ggggAACCCCAAAII5FBA9+5ZbCITJNjN/ezWNSO/Gyz804H5swkBFgCaQGu1S23bv6r3V7Y6Tvj+2lYxYVvA8BNBBggggAACCCCAAAIlEVgyd9+LTPX9oco1cV4q7mOh4v85LveaEWABoBm1Fvv44es/pGJ/0eIwmehuKqd0vnkj2wJmYjZIAgEEEEAAAQQQQKDoAtELuCtNJNiOXKry+VvvHP7r4M4k0JSAa6oXnZoW6Hzd1vHmpbPpATLYsaqebQEzOC+khAACCCCAAAIIIFAsgUs7957gxU8PV5Xf0VvpuS1c/D9H5l5zAiwANOfWdK/qsN5LVXV80wNksOPT2wJuZlvADM4NKSGAAAIIIIAAAggUQ6Cj44GKN1kZuJqb7rhjwrbAOdTCczQpwAJAk3DNdFt48vrj1ayjmb5Z7xOtRLItYNYnifwQQAABBBBAAAEEcitw7IQZF5jZS0MV4Lz+5qntD2dk279QCvmPywJAinPY16cr87rt31BMqjqurbdn0VDtuI4AAggggAACCCCAAAKNCVxxkY02r0sa6xVfaxXx1ub/n3XrLszGtn/xlVa6kVgASGnK55741HRTK/gvy9P3zzxl40tSIiUMAggggAACCCCAAAKlENg/Yt98Uz0qYLFfXnXXmH8KGP+Q0DxoXoAFgObt6u7Z0WEV8XpZ3R3y2lC10u79yrymT94IIIAAAggggAACCGRNYOncvc/3Xi4KlZea7h6m1VtCxe8nLqdaEGABoAW8ertO+OPGD4iTv6y3fZ7bmbiT5r5541vyXAO5I4AAAggggAACCCCQGQHvLxe14cHyUb3lxjXjNgeLf0RgTrQiwAJAK3p19F16wpZxJn5hHU0L00TVf7hrurUVpiAKQQABBBBAAAEEEEAggMDyebtfrapnBgh9IKSp/ef67SM+d+BBVv4gj5YEWABoiW/ozvu0d6moThi6ZXFamLjj/1Td8r7iVEQlCCCAAAIIIIAAAgikLWDqq3K1N9G0Iz8bz1Xd/163TjP1i/+ezY3PzQmwANCcW129Zr9+/fFi9t66GheskfnqkoUn/2FiwcqiHAQQQAABBBBAAAEEUhFYNnfveV70b1IJ1k8QVfv6qntH/bSfSyFPEbtFARYAWgQcrHulIleJail/FF5Vx/XKcLYFHOwLhGsIIIAAAggggAACCPQjMHPm70eY12X9XErllJrtcV5uTCVYQ0Fo3KoACwCtCg7Qf+4J6080lVMGuFyO06bvY1vAcmlU7tEAABAASURBVEw1VSKAAAIIIIAAAgjEJzCu7Zg5JnZsfCM2NpJWKqtvuWfMhsZ6pdCaEC0LsADQMuGRA3R0PFAxtauPvFKyM6qVNi84lGzaKRcBBBBAAAEEEECgeYFL5+6eYl5mNz9Caz2dyR8mbR3xmdZGSaY3o7YuwAJA64ZHjDDuT6e8V0VfcsSFcp44cc4pG8v9kxDlnHeqRgABBBBAAAEEEGhCwJtbYSIjm+gaTxen/2/XOt0fz2CxjsJgMQiwABAD4sFDzH7zprFWlcUHnyv7fa2yLWDZvwaoHwEEEEAAAQQQQGBogeVze14m3s4ZumUyLZy3R29dM+r7yYze6qj0j0OABYA4FA8ao1K1Rc4Jv/3+IBNR96In+ja+/+BT3EcAAQQQQAABBBBAAIFDBbxVP2IqQV6jOdXuSru7XrJ6I69YBIJ8ccWSeQYHWfSGLdNEPC90+5kbb7KYbQH7geEUAggggAACCCCAAAKRwKXzus/yZq+L7ob5MFtz052jnggTfOiotIhHgAWAeBwPjNJT6VtpIsMOPOCPQwT0wLaAI9kW8BAVHiCAAAIIIIAAAgggINLZae2+Wl0R0OJxG/Hk/QHjDxWa6zEJsAAQE2TnietPULFTYxqumMOYvG/eyZv+qpjFURUCCCCAAAIIIIAAAs0JjKjuvSR6I/EFzfVuvZeK++iqVS/pkczeSCwuARYAYpA8sO2f6coYhir2ECq17RFxEm4IIIAAAggggAACCDwtsGKOTRLTeU8/Sv9P5/W7q+4e+Q/pR24gIk1jE2ABIAbK8Y9Pf4+pvTSGoYo/hMmJ896y6a3FL5QKEUAAAQQQQAABBBAYWqCq3cu82NihW8bfQkX2u3bN/C/+i7/y8o7IAkCLc3/R364fHb34Z9u/Bhyr1nd15+usvYEuNEUAAQQQQAABBBBAoHACSzu7X2zmLwhVmIree/OdI/87VPw649IsRgEWAFrEHDZSF6rZUS0OU6ruTiov8CPZFrBUk06xCCCAAAIIIIAAAkcIaLW60kwqR1xI4YQzXV8ZM/KeFEK1GILucQqwANCC5qw3PDHNqX2ohSHK3JVtAcs8+9SOAAIIIIAAAgiUXGDJ3F3TvcmbQzGY+Wtvukn3hYpfd1waxirAAkALnBWtXGnCtn/NEerYXh21pLm+9EIAAQQQQAABBBBAIL8CHR1WsapeFqqC6EXgj1fdN+bRUPEbiUvbeAWiuY93wLKMNuekp94oTk4vS72J1Gn+wjnTN/5lImMzKAIIIIAAAggggAACGRWYOrb7faoa5HmwivT1+t7/nVGaw9PiccwCLAA0Adol5kzclU10pcshAlqRXvsfh5ziAQIIIIAAAggggAACBRZYutTGifpwv0Rc9TN33Dfhd/kgJsu4BVgAaEL0Tyesf7cze0UTXelymEC08nnC3JOfmn7YaR4igAACCCCAAAIIIFBIAd27Z7GZTJAAN2d+R4+OvDNA6OZC0it2ARYAGiStbfsn4pY22I3mgwiY6tUdL//1sEGacAkBBBBAAAEEEEAAgdwLXDZr7zQzfV+oQlQrN69ZoztCxW80Lu3jF2ABoEHTYaOkU9SObrAbzQcRUHPTxh11zPsHacIlBBBAAAEEEEAAAQRyL9DnZKWJtIcoxMT+88kdI78QInaTMemWgIBLYMzCDjn3hD89X0wuLmyBAQtTb4sWnvyHiQFTIDQCCCCAAAIIIIAAAokJLJ619wRvdmpiAYYYuKLu2nXrtDpEswxdJpUkBFgAaEDVi7tcVYY30IWmdQvo2P06gv9aUbcXDRFAAAEEEEAAAQTyItDVZa7iJNgvEXei37717lE/zIvXgTz5IxEBl8ioBRx0zklPvEZVzyxgaZkpSU075p286a8ykxCJIIAAAggggAACCCAQg8Dmx/dd4M1eHsNQDQ+hIr1V0xsb7hi4A+GTEWABoA7XLjEXfVxtItHfH+GWnEDFm786ueEZGQEEEEAAAQQQQACBdAWuuMhGi/gl6Ub9c7ToTcxP3H7vyD/8+Uwu7pFkQgIsANQB+8eTnnpn9OL/lXU0pUmLAtE/UCd0vnVTsP8b1WL6dEcAAQQQQAABBBBA4BCB3mH7OsU0yC8Rj9693Lq7uufuQxLKxQOSTEqABYAhZDtf9+QoV9VLh2jG5RgFqr66km0BYwRlKAQQQAABBBBAAIEgAotm7p5aFbsoSPADQfXj99139K4Dd/P0B7kmJsACwBC0vt3N9U6OGaIZl2MUUHPTJkw+5gMxDslQCCCAAAIIIIAAAgikLtBWcVeJyYjUA0cBo3f//3Xy80d+Jbqbuw8STk6ABYBBbOeesGGKeT9zkCZcSkigKrJo8Wk7Jyc0PMMigAACCCCAAAIIIJCowPJ5u18tYmclGmSQwc3LNV1d6gdpktVL5JWgAAsAg+Ca81eY0yArdoOkVYpLzmRMT8++YL8spRTIFIkAAggggAACCCCQkICpr8rV3sL8EnFn9vBt943+WULFJTwswycpwALAALqz37jhVWLyjgEuczoVAX3P7Dc/8dJUQhEEAQQQQAABBBBAAIGYBJbO2XuOF/2bmIZraBgn2l1pdx9vqFOWGpNLogIu0dFzO7ipE7vSJMyKnXB7VqBSkbaVzz7gMwIIIIAAAggggAACWReYOfP3I8R0eag81eS+m+4c9USo+K3GpX+yAiwA9OM758QN53hnr+3nEqfSFlA9Ye4pm9+WdljiIYAAAggggAACCCDQjMCYyjGzTezYZvq22kdFN7hxI+9tdZyA/QmdsAALAIcBz5z++xFm1WArdoelw8NIQK3vw2wLGEHwgQACCCCAAAIIIJBpgQUX7Tomegd+Tqgknbobb7pJ94WK33pcRkhagAWAw4Tb9o2YI+qCrNgdlgoPnxUwN23SpGM++OxDPiOAAAIIIIAAAgggkEWBYW1uuYmMDJKb2T/dcvfwh4LEjiso4yQuwALAQcS1bf+8l9kHneJuRgSq4hd1Tn/yqIykQxoIIIAAAggggAACCBwisHxuz8uiF//nHXIypQdOxSoq14holILk9kbiyQuwAHCQsVX9ZaKBVuwOyoO7RwqouNHSV2FbQOGGAAIIIIAAAgggkEUB76tXR6++w7y+Mv3qLfeM+b9ZdGkgJ5qmIBDmCzSFwhoNMeuEp17uK3Z2o/1on6aAXsC2gGl6EwsBBBBAAAEEEECgHoGls3ef6c1eX0/bBNp09w3ztyQwbspDEi4NARYADiibmtlH1BSPAx7Z/CNaUa1UpJ1tAbM5PWSFAAIIIIAAAgiUUqCz09pVdEWo4qNXMHetXj1mfaj4scVloFQEeMEbMc954/p3OFG2/YssMv+hcsL8t6w/LfN5kiACCCCAAAIIIIBAKQSGV7sv8iYvDFGsM10/ef+oT4SIHXdMxktHwKUTJrtRlv7lb4dH2QVbsYti89GggIm7im0BG0SjOQIIIIAAAggggEDsAivm7JikVZsf+8B1DqjOXde1VrvrbJ7lZuSWkkDpFwD2TBo9y0SOS8mbMDEImMm0CZOO+VAMQzEEAggggAACCCCAAAJNC/Ra21KvNrbpAVro6ER/ecvdwx9tYYgMdSWVtARcWoGyGOfiN/5psoiy7Z/k72biF7ItYP7mjYwRQAABBBBAAIGiCCzt7H6xmrwnRD1RXC9WLc62fyEQSxqz1AsAw5y7LJr3MdHBR84EtLYtoG9nW0DhhgACCCCAAAIIIBBEoM8+bCKVELFV5Uu33jv21yFiJxGTMdMTKO0CQG3bv6rJO9OjJlLsAt4uWPjmTS+NfVwGRAABBBBAAAEEEEBgEIFL5+w7xcyfPEiTxC6p2J7q8FFF2vYvMSsGPlKgtAsAUeErlW3/jvyKyNGZ2opr1dnVOUqZVBFAAAEEEEAAAQRyLtDRYZU+X70iVBkqbXfffrtuCRU//riMmKZA9Do4zXDZiDXvjRvOMpPXZyMbsmhFIJrHN847ef3prYxBXwQQQAABBBBAAAEE6hWYOrb7fSr6l/W2j7NdFHfDpL7hn4xzzOBjkUCqAqVbAOh8nbVX1bPtX6pfZskGU3VXsi1gssaMjgACCCCAAAIIICCy9IM2TsUvCmZh9vGugm37F8yypIFLtwDQ1/7UTDF5QUnnu5Blm8m08Ucdc1Ehi6MoBBBAAAEEEEAAgcwI6PB9i7zJxDAJ+X+bPG3UQ2FiJxaVgVMWKNUCwJyTdkwSc3NTNiZcKgJ+way3PHV0KqEIggACCCCAAAIIIFA6gctm7Z1mYu8LVbhK5WNdXeqlUDeKSVugVAsA5vcuF7OxaSMTL3kBNTe6TRzbAiZPTQQEEEAAAQQQQKCUAn1qK81kWIjio5f9f7/qnlE/DhE70ZgMnrpAaRYAZr9+00vV9PzUhQmYnoCTC+a9+alXpBeQSAgggAACCCCAAAJlEFg8a+8J3uTUELWqSlXaKjeFiJ10TMZPX6A0CwBa6bvKxCrpExMxNQGvTiuVK1OLRyAEEEAAAQQQQACBwgt0dZmrqITb9k/lc6vWjPivAkJTUgCBUiwAzD5x/elmclIAX0KmLBDN8xvnvnXDGSmHJRwCCCCAAAIIIIBAQQW2/GHfu71ZkJ8yVbFdve29q4tJS1UhBAq/AFDb9k+8XR4Cl5hhBLSqVy6d8dvhYaITFQEEEEAAAQQQQKAoAp2dNsrMLw1Wj1buuuOOCduCxU8yMGMHESj8AkC1bUNte7gXBtElaBgBlef37B5bm/cw8YmKAAIIIIAAAgggUAiB4X37OkU1yE5T6uQJGfWnzxQCsp8iOBVGoNALAHNOenySicwPQ0vUkAJeZT7bAoacAWIjgAACCCCAAAL5Flg0c/dUM7s4VBXm5eOrVr2kJ1T8hOMyfCCBQi8AWLVtKdv+BfrKChy2ti1gu3PhflwrcP2ERwABBBBAAAEEEGhNoM1J7ZdLj2htlOZ6q9r/ve2+Ud9srnceepFjKIHCLgB0vmnDi1XsPaFgiRtewETePWf6+leGz4QMEEAAAQQQQAABBPIksHT27leJ6Nsl0K1S0Y+JaPR0Vop5o6pgAoVdAPDerjZRtv0L9qWVgcBenfOutnKbgWRIAQEEEEAAAQQQQCAfAlZ75b3SRy8mQuTrVB+9ec3oX4SInVZM4oQTKOQCwOwTnjo1WgB4UzhWImdGwOQNnadsODMz+ZAIAggggAACCCCAQKYFLp2991wxeVWIJFWktyp6U4jYKcYkVECBwi0AdE23NjW5IqApoTMmYF6vYFvAjE0K6SCAAAIIIIAAAhkU6JppI7zZpaFSU9XP3H7vyD+Eip9OXKKEFCjcAsDje9d/0EReFBKV2BkTUHl+9+6xwX6Da8Y0SAcBBBBAAAEEEEBgAIGtsmd+9Fri2AEuJ3zadrpqz5qEg4QfngyCChRqAaDzdVvHi7LtX9CvqKwGj74u2BYwq5NDXggggAACCCCAQHiB5Z17jvVql4TKREVW37x24vZQ8dMqPgBiAAAQAElEQVSKS5ywAoVaAOirdC82kwnCDYHDBcyNqmgl2I9zHZ4OjxFAAAEEEEAAAQSyJeB7/YdFNMy2fyJ/7Gkb/Vkp/o0KAwsUZgHg4pMef56qXBjYk/AZFlC1d7EtYIYniNQQQAABBBBAAIFAAotn7TjBiwb7xdHO2Y1r1mhvoPJTDEuo0AKFWQAY5oddaqbDQoMSP8MCXl2lT68WMc1wlqSGAAIIIIAAAgggkKJAR8cDFaduZYohDwmlYr+65Z7R3z7kZFEfUFdwgUIsAMx+/RMvrUr1HcE1SSDzAqb6ms5Ttp6R+URJEAEEEEAAAQQQQCAVgWPHzeiI3kh8aSrBDgviolf/onq9iJqU4EaJ4QUKsQCglcrlalqIWsJ/SRQ/A/PVlTOnW5D/31V8XSpEAAEEEEAAAQTyI7D0gzZOzC0NlbGqPrTq3tG/DBU/5biEy4BA7l80z3vDU28ws5MzYEkKeRFQmdrmN7AtYF7mizwRQAABBBBAAIGEBHTYnsXebGJCww8+rGqP2y+3DN6oSFepJQsCOV8AMPUil2UBkhzyJaAinWwLmK85I1sEEEAAAQQQQCBOgeWzu483kffHOWYjYzmTT930yVFPNNIn121JPhMCuV4AmH3C+umm8qpMSJJEvgTMjWoXW56vpMkWAQQQQAABBBBAIC6BqvSuNJG2uMZrZJzozaitu2XP3Y30yXtb8s+GgMtGGs1lEb3939lcT3ohIGKu8s55b37qFVgggAACCCCAAAIIlEtg6axdbzXTcP+N2Ont99139K4SqVNqRgRyuwAw5/VPvZF3/zPyVZTXNLw6VfeRaCkgWoTNaxHkjQACCCCAAAIIINCIQGentUfP/z7cSJ8426r6367fMfKBOMfM/lhkmBWB3C4AeKezs4JIHvkVMNXXzHvLxjPzWwGZI4AAAggggAACCDQiMKx314dM3F800ieutk4levrp/te6dVqNa8xcjEOSmRFwmcmkgURmveGJaSI+3I/sNJArTXMgYPphtgXMwTyRIgIIIIAAAggg0KLAijk2yZlb0OIwTXe3qj106z2jf970ADntSNrZEcjlAoAT9171msvcszP1ZPKcgMrUYX4z2wI+B8IdBBBAAAEEEECgmAJ9fvcKrzI2RHXOZK9rkxtDxA4ck/AZEsjdi+iODquY2LsyZEgqBRAwqbItYAHmkRIQQAABBBBAAIGBBJbO2vVyMT1/oOtJn1eVO265Z8yGpONkb3wyypJA7hYAxv33U2+O/uJOyhIiuRRA4MC2gBW2BSzAVFICAggggAACCCDQn4CarTSVIK9/1MkTE3eN+pSU8UbNmRII8hegFYGq2jmt9KcvAgMJmLN3zpm+/pUDXec8AggggAACCCCAQD4FlszeM8Ore32o7J1Wbulap/tDxQ8Zl9jZEsjVAkDtx/+dVd6aLUKyKYxA9F3BeV0pYmwLWJhJpRAEEEAAAQQQKLtA10wboX12RSiH6AXXf0183vBvhIofOC7hMyYQfT1mLKNB0pn4+OZXiVmQX9oxSFpcKpKA6WvnvXXT24tUErUggAACCCCAAAJlFtgqe2daRY4NZuDcl7q61AeLHzQwwbMmkKsFgD5ffXPWAMmneAJmdvnM6b8fUbzKqAgBBBBAAAEEECiXQGentZv4D4WqWtVVrdr39VDxg8clgcwJ5GoBQMX/beYESahwAmp6XHt11MzCFUZBCCCAAAIIIIBAyQQqfTummWrAXyDe97tV94/dVDL258rlTvYEcrQAYCqirxBuCKQgEC02dS6avnFqCqEIgQACCCCAAAIIIJCQQKVXLKGh6xpWpfInKe+NyjMokJsFgDkn/WmieZkg3BBIQcCkMqLXZFkKoQiBAAIIIIAAAgggkJDAUS8e/7h63ZLQ8EMPq1IdulFRW1BXFgVyswDgfRvvxmbxK6jQOdl5C6ZvZVvAQs8xxSGAAAIIIIBAkQW6urQveg3+qVA1mvdHhYodPC4JZFIgNwsA4uXoTAqSVHEFvLqq9LItYHFnmMoQQAABBBBAoAQCO3XLJ9XkyRClmrqXdXXYsBCxQ8ckfjYFcrMAoM6GZ5OQrAotYPrauadsmlHoGikOAQQQQAABBBAosMDatS/qVtGPBynRbPjWsd1l3MksCDdBhxbIzQKAE20buhxaIBC/gCrbAsavyogIIIAAAggggEB6AreuHfWwE/llehEPiuT6LjzoUUnuUmZWBaK/B1lN7dC8ql72HHqGRwikJaDHDrNRs9KKRhwEEEAAAQQQQACBuAXUvMm1ziT9XQHMnbJsTk+5fq9U3NPHeLEJ5GYBwJnfGVvVDIRAgwJeZO7c0zZMabAbzRFAAAEEEEAAAQQyInDb2jH/HL36/1ra6UQLD+ql9390dVluXnu1akT/7Ark5otw/7DKE9llJLOiC6joSNery4teJ/UhgAACCCCAAAJFFnBtcpOK7Uu9RtNXbftT9wdSjxsmIFEzLJCbBYBP/XDqRlHdlWFLUiu4gKmd13nK1r8peJmUhwACCCCAAAIIFFbglnvGbDCTe0MU6M1fsXxuz8tCxE43JtGyLJCbBYAaojr9Te0zBwJhBFRF2RYwjD1REUAAAQQQQACBeASOkjH3RS+C1sczWv2jRAsPw7zv+1hXlxX7l5vXT0LLAALR136AqE2GtKr/WZNd6YZALAIm+prOt6x/RyyDMQgCCCCAAAIIIIBA6gJda7W7Kj7ItoBe5MVbH+9+f+pFpxiQUNkWyNUCQFu7fi/bnGRXBgFz7rKZ038/ogy1UiMCWRLoEnNLZ2wZl7Wj8917jl30zi3TsnQsPHv78YvP3fKKRI8LovEbPc7fedLiEEdHFHeAY0nHrrctuWDHWU0dF0b9EjgWvGfrOYsv3H5h1o4l79s5Z/F7d849/Fjy/p2zlrx3x4ylM347PEv/ZpALAoMJ3H7/2IdE5Z8Ga5PYNd+3aPnMbRMSGz/swETPuECuFgDW/GjqP0eef4gOPhAIKKDHttuo2QETIHTJBBaftnPy/Blbz1141pa5nWdtWb7gzM3/Y+Hbt350/tu33ho9vnfB27esm3/Wpofnn7nle/PP2vLjWI4Zm38Rjf2bI44ZW37TGfdxdjRmv8fW33Se/efjybO3/brH6Y/rPipR2wGO3uh800eb/rj3oMP19nzHe30kvaMSxRr8MCdfr0pl3YHDRZ+TOHw0bgOHRW1N/L1DHhq1ifvw0ZgDHN5Xb/NiNzV1VKN+CRxO3cfMpMtaPMQ0Wjc76JDofguHebtczC47/DCzK03lxur4Y1aW7J9nys21gEZftnKtU7G0y/Dqxvu2EYvTjptOPKJkXSBXCwDPYH79mc98QiCYQPSdYg7bAgbjL11g39b38eiJ93VVkcui4ju96gerZu+KnnSfHj0+yZu8wsS90FSOir42x8VyeOWnXCJcPhBAoAEBk/9soDVNEQgusOq+Mf9kXh4KkYiZf9/Szu4Xh4idaEwGz7xA7hYA2sy+pgFW6jI/kySYqoCKjtSqrkg1KMFKK2BO/qO0xVM4AgjkQiB6arZxuB/3pVwkS5IIHCQQLa5/XMS6DzqVyl0zqUjVPpxKsBSDECr7ArlbAFjz8+P+6NV+lX1aMiy8gNm5c9+y4W8LXycFBhfo2997j5rtC54ICSCAAAIDCJjYLTetU/6dGsCH09kVWL12zHqnLsi2gGb+5KWz9r01uzoNZ0aHHAjkbgGgZlrxtrb2mQOBsAKq5vTqaNVYw+ZB9KIL3POdKRvESZAnJ0W3pT4EEGhdQEX/9ei/nvBg6yMxAgJhBHb6jfeqyFMhopvzV3V1FWVbwBCCxGxUIJcLAPf87Lhvq8pvGy2W9gjELRD9BXrVvOkbzo57XMZD4HCBnu5d90VPTp48/DyPEUAAgfAC/pquLvXh8yADBJoTWLv2Rd1O9ZbmerfYy+RFhdkWsEUKuqcjEL1+SSdQvFHU1Ol98Y7JaAg0KVB1l6846fGRTfamGwJ1Cax97EXdJv6muhrTCAEEEEhJwFQeve1zE36WUjjCIJCYwC33jfqaM/eLxAIMMrC36uKFC7dPHKRJLi6RZD4EcroAIPL8kVMecmpP5IOZLAst4GTKrvbhbAtY6EnORnFrHjnqG2r282xkQxYIIFB6AdPeNt/+8dI7AFAQgeg7rPPXOxVLvyAd17Z/eN63BUyfjYhNCeR2AaDrMe3zXu9uqmo6IRCzgNPqnLmn7Z4S87AMh8BhAhq92eauUzV+1PYwGR4igED6AtE/SJ+8dd2oP6YfmYgIJCNQ2xZQzH8jmdGHGtW/d8Wc7r8cqlV2r5NZXgRyuwBQA971F//4xeiJMNtj1TA4ggqYVEZo357LgiZB8FII3PnopF+ruK8JNwQQQCCggFe/tbu7Z03AFAiNQCICWhl7gwTaFrBq1Y8kUlQagxIjNwK5XgBYt+7Cqld3TW60SbToAud0vmXTa4teJPWFF6j0tt0Q/eO9O3wmZIAAAmUVqIject9Xj95V1vqpu7gCt9yjG5xW7g9RoRc5Ma/bAobwImZzAtFzyOY6ZqXX/T+e+pOoiH/ISj7kUWYBVanYVdGqsQo3BBIUuP0747aY8ItQEyRmaAQQGETAm/7XBj/+S4M04RICuRaY5EfeHb2+WB+kCPVXd3Zae5DYzQelZ44Eoq/tHGU7YKr6MTHfN+BlLiCQkoCZ/O286ZvZFjAl7zKHGea23O9M+EWoZf4ioHYEAglUVK5dt06rgcITFoHEBbrWard3/tbEA/UTwEReMLxvz/v7uZThU6SWJ4FCLADc89Opv3eqn88TPLkWWKBqbAtY4OnNSmmrHn5Jj4ry27ezMiHkgUBJBEzlu7c9MO4HJSmXMksscNu9Yx90av8ciCBf2wIGQiJscwKFWAColT5Sh69Sle3CDYHQAk6m7BnOtoChp6EM8e94dNLD4vVnZaiVGhFAILyAqfV59deHz4QMEEhDQM15ucYF2BbQRMe297QvSaPKOGIwRr4ECrMAsOonk3eayZ354ifbwgqYzZn95k3HFbY+CsuMQNswf42yLWBm5oNEECiygKr7zJ2fm/jfRa6R2hA4WODmtWN+JWLfPPhcWvdN3YWL5+38q7TitRCHrjkTKMwCQM39BaOm/p2q8I1JuIUWiFZuR7S1yXLhhkDCAqsfOupfo/coHkw4DMMjgEDZBcx2tndX7yo7A/WXT6DPS+2nXrrTrtzMV5yvXJ123Mbj0SNvAoVaAOh6TPtMDvwlzds8kG8BBUz82WwLWMCJzWBJlb62j0f/mLMtYAbnhpQQKIqAOV1181cm8l8tizKh1FG3wOq1Y9Y700/U3SHGhmZywpK5u6bHOGT8QzFi7gSi54y5y3nQhO/7ybHfdU5/OGgjLiKQioBGb8zq1V1ihft7lgofQeoWuP0747aoyj11d6AhAggg0ICAiv7umA3j+GXLDZjRtFgC3cNG3u3UNgapytzVXR02LEjsdvg9KgAAEABJREFUOoLSJH8ChXxh4vsq10ffrNieJn9fjwXM2L/iqbeyLWABJzZzJW0e+9TaaBHg8cwlRkIIIJB7AXVyXddjynbLuZ9JCmhWYM0a3Svibmm2f0v9TKZtHZfZbQFbKo3OYQQKuQBw38+O/ndT+3IYUqIicKiA93bZipMeH3noWR4hEK/AunWv3K8ibAsYLyujIYCA6o9XfW7cPwKBQNkFJr1g5INO5dchHMxk0cKF2yeGiD14TK7mUaCQCwC1iVA36uboM/8nNkLgI7CAq20LOHJO4CwIXwKBO785+ZGK6P8pQamUiAACKQioarVSsWtSCEUIBDIv0NWl3jTgtoC97dnbFjDzs0aC/QkUdgHg3h+N32pq/J/Y/madc+kLmM1mW8D02csYsWpsC1jGeadmBJIQMNPP3/p343+bxNiMiUAeBVbdO/qXJvZoiNxNsrctYAgHYrYuUNgFgBrNmC17PuHUnqjd50AgpED0zWJEpV1WhMyB2OUQWPPoUf+m5r5SjmqpEgEEEhTY5duqtyc4PkMjkE8B524U0R5J+WaSuW0BUxYgXFwCLq6BsjjOqv98SY9X5f/EZnFyypiT+XewLWAZJz79mkdK5ePOCf8FKn16IiJQGAFzescdfzdhW2EKohAEYhJYdc+oP6lKmG0BVU5YNnvXqTGV0uIwdM+rQKEXAGqTct+Pj33Yi/2idp8DgbACqlW1j7AtYNhZKEP0mx4ZvzWq8+7o4AMBBBBoWEBNHt9UHft3DXekAwIlEehpG7lGzDaFKNerW9nVkYFtAUMUT8xYBAq/AFBTGlZx10UrdVa7z4FASAGn8vI/nbrl3JA5ELscAn7jpLWq9sdyVEuVCCAQq0Cbu27dOt0f65gMhkCBBGrbAlacuzVISSrTtkzY84EgsQ8Kyt38CpRiAWDNj6b+c1X8Q/mdJjIvkoD2+eVsC1ikGc1mLWt+rr3Gf4HK5uSQFQJZFlD9yW2fHfv3WU6R3BDIgsDEF4z8slMNsi2gVN2ixYttckAHQudYoBQLALX5aZO2G1Wsu3afA4GgAk6m7B45fG7QHAheCoE1D09+VJz8qBTFUiQCCLQuYOLF6Q2tD8QICBRfoKtLfdXsWhe9wEi7WnM2xnXvXZx23D/H416eBUqzAHDPT6ZsUOfW5nmyyL04Aup11uwzNh1XnIqoJLMCVbtenVYzmx+JIYBAZgRU5Uu3f3bsv2QmIRJBIOMCt98/+hdi+q0gaarruHT2zpcGiU3QXAu4XGffYPKu198TFbyxwW40RyB2ARMb0dbrL4t9YAZE4DCBA9sCin35sNM8RAABBA4RMNM9am7VISd5gAACQwpYRW4QCbMtoNfKSglwI2S+BaLXw/kuoJHs1/z8uL0q7hbhhkAGBEz0HXNP3fS6DKRCCgUXGOnbbnYquwpeJuUhgEArAiprVq0bG+S3mreSNn0RCC1Q2xYw+h77qRB5mMoJyzr3pb0tYIhSiRmjQKkWAGpuz/vpMQ+qkzC/sKOWAAcCBwlY1a7uEivd38ODCLibgkBtW0ATWZNCKEIggEAOBUzcnyq7Nnwyh6mTMgKZEBjWO/KuYNsCVn3K2wJmgpwkWhAo3QuPLlHvxV+rAX5hRwvzRNeCCjgnL39y+sbzCloeZWVIwDZN+qSq/0OGUiIVBBDIiIATvXHVwy/pyUg6pIFA7gRu+JTuEXG3BUlcZdrm8Xs+mFpsAuVewOW+giYKuP/Hz/uFmnynia50QSB2garo5YumbxwT+8AMiMBBArVtAZ3pjQed4i4CCCAg6tyvbntg9KNQIIBAawJH/cXILzrVIL9EU71beHnnzqNaq6C+3rTKv0ApFwBq01Y1f72q7a/d50AgpED0l3Byn8rskDkQuxwCdzxy1LfN5IflqJYqEUBgSIHaT0NW9RqR6G0R4YYAAq0IdHXVtgWs/ULAVkZprm9tW8AeX0ljW8DmEqRXpgSi1x6Zyie1ZO7/P897XK3ymdQCEgiBQQTMdNaCt21+3iBNuIRALAJtrv16dVqNZTAGQQCBXAuo6FdvWzfmn3NdBMkjkCGB2+8f9ROVMD9lrOLek/y2gMKtAAKlXQCozd2wUXpH9Jd0S+0+BwJhBWx41YxtAcNOQimi3/HNcf+ual8sRbEUiQACAwqYSXdbe+XWARtwAQEEmhKoSvfHVCX1nzI28RWpJLwtYFMidMqagMtaQmnms/qxY3ar6Oo0YxILgQEFzGawLeCAOlyIUWBkte1Wx7aAMYoyFAI5FHByz82fHv1UDjMnZQQyLbD6/smPi1mQnzKumpywfO6+tyUFxLjFECj1AkBtCne88HsPqMlva/c5EAgt4Lx9pEus9H8vQ89D0ePXtgUUlbuKXif1IYBA/wLedMNwP+7+/q9yFgEEWhUY3jt6taptbnWcZvr3mf9wV4cNa6bvEH24XBCB0r/QWLfuwqo6vaYg80kZORcwlZc98daN78x5GaSfAwG/cdKnnPj/zkGqpIgAAjELqMrHb1qn+2IeluEQQOAZgdq2gE7d7c88TPeTyrSt47sT2BYw3TKIlpxA6RcAarT3/GTqj6NVuu/X7nMgEFrAq17GtoChZ6H48WvbAoprv6H4lVIhAggcLBB9j/nNMS8f+9DB57iPAALxCzy54+tfUNV/j3/koUc0qS6KfVvAocPSIicCLAA8M1FWddeK+b5nHvIJgWAC0V/Kyb0ic4IlQODSCNz58IS/d+p/UJqCKRSBsgto7f+YVT7a1aW+7BTUj0DSArWfMnZerk06Tn/jm+joXl9Z0t+1Zs/RrzgC0WuN4hTTSiX3/Wzq78S5da2MQV8E4hPQmWwLGJ8mIw0s4LX9WnXGtoADE3EFgQIJ6MO3f370LwpUEKUgkGmBW+4f9ROn8t0QSZq4Cy6d3f3SmGIzTIEEWAA4aDLb+obfaup3HHSKuwgEEjiwLeDlgYITtkQCax6e8F9q+oUSlUypCJRTQKWn6vffVM7iqRqBcAJtXq/VYNsCVlfGUzmjFEmABYCDZnPNzyfVXvyvOegUdxEIJ2D29vnTN70+XAJELotAr+1dFb1Dsass9VInAmUUUJO1d6476oky1k7NCIQU+Pj9ox5X0b8LkUNtW8Blc/ad1nJsBiiUAAsAh01ne99xnxYvfzjsNA8RCCJgZld3CdsCBsEvUdB7H5m2Nfoqu7NEJVMqAuUSUNnipefechVNtQhkR2CEjbwjetG1LUhGzl/V6raAQfImaGIC0ddiYmPncuCnfzO23pjL5Em6cAJW2xbwbVvYFrBwM5u9gmzDpE87tgXM3sSQEQIxCDh1N61ed8zuGIZiCAQQaELgY/fpLnN6WxNdW+7iTaZtmdD9oRYGomvBBFgA6GdC7/vx1G+ryY/6ucQpBFIX8N6zLWDq6uULWFv8dG1t15evcipGoNgCJvZv6/3DDxa7SqpDIPsC63d8/QGn+h9BMrXqwua3BQySMUETFGABYADcimu/3tT8AJc5jUBqAtFf0sn7ReemFpBApRVY/dDE7zrR75cWgMIRKKCAiru+th2ZcEMAgaACtb+H6uWaEEnYgW0B25vbFjBEwsRMVMAlOnqOB1/zo6P+TU1YMc/xHBYpdRWZ2Xn61hcUqSZqyaaAd+46tgXM5tyQFQINC6j71u3rxvETjQ3D0QGBZASe3hbQPZbM6IOPaubfs3jerlcM3urIq5wpnoArXknxVdTn/cej0fg/cxECH6EFbJj09a0InQXxiy9Q2xZQRNcJNwQQyLtAb/R9o/Y8Ju91kD8CxRKo2LXRGzu9aRdlKq5N3BXS2I3WBRRgAWCQSf3kT5+/RcTuG6QJlxBITcBEzpr31s1vSC0ggUorYL16i1PbXloACkegAALRC4xP3/6liexqVIC5pIRiCdy6ZtQf1elnQ1RV2xZw6bzdp9cfm5ZFFGABYIhZ9SN61kbfRJ8cohmXEUhHQD3bAqYjXeooa749aUf0795dpUageARyLGBiW0ePHc/WnjmeQ1IvtoCNHLk6ehEWZFtAFb2y7m0Biz0Npa0u+torbe11Fb72sRd1e63eXFdjGiGQvMBfP3XqlnclH4YIZReY0j35M87p78vuQP0I5FEgeoK/qrbtWB5zJ2cEyiCwapXujBbqVoeotbYt4Lbxey+qJzZtiinAAkAd83r/j573kPP6izqa0gSBxAV8lW0BE0cmgHQ9pn1iVbYF5GsBgZwJmNh/bZLxX8hZ2qSLQOkE1u/6xudU/W9DFO7FFiydtevoIWJzuaACLADUNbFqXvR6FbG6mtMIgSQFnEzqU52XZAjGRqAmcOc3j34s+nePbQFrGBwI5ERAxa5bt06rOUmXNBEorUBtW0DRSrBtAV2bG2JbwNJOTeELZwGgzim+76dT/il69f9wnc1phkCiAuaNbQETFWbwZwVcW+VaVet79jGfEUAgwwKq/7B63SQW7TI8RaSGwMECq+4Z9ePobcbvHXwurfveywWLB9sWMK1EiJO6AAsADZA7c9eLt+4GutAUgWQEVNqrfX2XJTM4oyLwZ4E7Hprwu+jRA9HBBwIIZFugKiY3ZjtFskMAgcMF+rT6MRVJfaG9ti2gmrvy8Hyefczn4gqwANDA3N7zkykbpKKfbKALTRFITCD6y3sm2wImxsvABwkMU72VbQEPAuEuAhkUUJXPrl43/j8zmBopIYDAIAJ33Hdgof1zgzRJ8tIbL527+4x+AnCqwALRa4gCV5dAaW6/XyOmmxIYmiERaFxA/dUdHQ9UGu9IDwTqF1j18OSd4ip31N+DlgggkKaAiexs329BfqN4mnUSC4HCCowedVu0iLc9RH3m9IqlS387/NDYPCqyAAsADc7ump8ft1dFbm2wG80RSErgrydsfivbAialy7jPCWwZPeHv1BnvLj4nwh0EMiSgetvNX5kY5MVDhhRIBYHcCtS2BXTqgizi1bYF1J7jDt0WMLeSJF6PAAsA9Sgd1uZ5Pznmy171Xw47zUMEwghUdcXsN28aGyY4UcsicOC3imvlhrLUS50I5Ejg91M2jgv148M5YiJVBLIt8OSOEZ81C7PQbt7mH7wtYLalyK5VARYAmhDsEvUq/vomutIFgfgFnEyqDBO2BYxflhEPE7jrGxO/pyL/eNhpHiKAQEABZ3Z912Oa+i8QC1gyoREopEBtob3NhVloN9XR2u6WPgPLp4ILsADQ5ATf+6Njf+pN/77J7nRDIF4Bk4tnnfLEtHgHZTQEjhRwrnKdilWPvMIZBBBIXUDlR7d9YeJjqcclIAIIJCJwy70jv6fqgmzlaeLOX9LZ89ciiZTGoBkSYAGghckY4duiJ8Kyv4Uh6IpATAI2rL0y/IqYBmMYBAYUqG0LqCL8uPGAQlxAIDWBavRC4brUohEIAQRSEaiYXht9n039p3rMfMVZ9X+KWBQ+lVIJEkiABYAW4Ff/n8mPi7jPtjAEXRGITSD6h/uM+adtOSm2ARkIgQEE2uiAMs0AABAASURBVEVXOTF+4dgAPpxGIA0BE113++fH/UcasYiBAALpCdx834jfiboH0ov450he7LVLO/ec8ecz3CuiAAsALc7qCKvcIWY8EW7Rke7xCPhq9coOtgWMB5NRBhQ4sC1gxd0+YAMuIIBAogKqumu/yG2JBmFwBBAIJlCpdkd/v21ngARERS/v6rBhIWITMx0BFgBadF71k8k7VXki3CIj3eMScPLX47dOPz+u4RgHgYEEtoyc+DkR/a1wQwCB1AW893feu2781tQDExABBFIRuHntxO1O5Y5Ugh0SRMSbTNs6ce/Fh53mYYEEWACIYTK3T/uHz5kYT4RjsGSI1gXUy3K2BWzdkREGF6j9tmKt2LWDt+IqAgjEL+Af36wTPhP/uIyIAAJZEpg0bfRnROX3qeb0TDDzNn/prF1HP/OQTwUTYAEghgldt+7CqppeE8NQDIFA6wIqk9pGSGfrAzECAoML3PX1yT+K3qH43uCtuIoAAnEKOGm/LlqA2y/cEECg0AJdXdrnzN+QZpHPxjLV0dLmlj37mM/FEmABIKb5vOcnU3+sJjwRjsmTYVoTiFZuL57ztm0vbG0UeiMwtIBq78dULfXfVjx0ZrRAoHgC3rmf3LZuLFsQF29qqQiBfgVuvW/sdzW9bQEPz+H8ZXN2vfLwkzzOvwALADHOYbUqHxPjiXCMpAzVrIBKu5Pey5vtTj8E6hW446Gpv4vashtKhMAHAkkKmKg3r9cnGYOxEUAggwIVvU5VqslndmgEE3HiKitFTA+9wqO8C7AAEOMM3vez6Imw6udiHJKhEGhF4PR5b9vwplYGoC8C9QgMM73dmW2rpy1tEECgOYHoBcAX7lo39jfN9aYXAgjkVWDVmhH/FeW+LjqS/ehndC/22qWdPWwL2I9Nnk+xABDz7I209tu8F54Ix+zKcM0KOLYFbJaOfnUL1LYFVMduKHWD0RCBhgV0T19Fb2u4Gx0QQKAQAj2VUbc48zuSLGagsdWqVyxd+tvhA13nfP4EWACIec5q2wJWnK6OeViGQ6BJAXvphM3TL2iyM90QqFtg8+hvf96Z/kfdHWiIAAINCNidaz47bnMDHWiKAAIFElizRnd41TUJljTg0F7k+dJ9HNsCDiiUvwssACQwZ9unHcO2gAm4MmTTAsvYFrBpOzrWKXBgNxRlW8A6uWiGQAMC+vgmGf+pBjrQFAEECiiw343+tJr8tyRyG3xQFWFbwMGJcnWVBYAEpmvdOq2ac9cmMDRDItC4gMqkynCZ33hHeiDQmMAdD0/+sXP6WGO9aI0AAoMJqNgN0fMKtv0bDIlrCJRAYM0a7a2oS2ZbwCH8vMgorbhLh2jG5ZwIsACQ0ETd98MpPxKVf0xoeIZFoDEBs4vYFrAxMlo3J+BVrnUqvFhpjo9eCBwioKo/vX3dhG8dcpIHCCBQWoGb7xn599GLtx/EDVDPeKbyLrYFrEcq+22ir6HsJ5nXDH2vXCfGtoB5nb9C5a3S7nzvFYWqiWIyKbDm65P+aKpsC5jJ2SGpPAmYqJdqH9v+5WnSyBWBFATMVa5VkTi3BawraxNxUqlczbaAdXFluhELAAlOzzPbAn4+wRAMjUD9Ak5OY1vA+rlo2bxAb6W62rEtYPOA9EQgElCVL93+xcn/Et3lAwEEEHhOoLYtoIp88bkTLd+pfwBv9poVbAtYP1hGW7IAkPDEjLT2VWK2PeEwDI9AXQLqdWVHh1XqakwjBJoUuO+rR+8y59iyrEk/uiEgonsq5lYJNwQQQKAfgYr13epEd/VzqfFTDfbwbAvYoFj2mrvspVSsjGrbAoo4tgUs1rTmthpz8pcTNm9lW8DczmB+Et86+tsPOLYFzM+EkWm2BNTWrFo3dlO2kiIbBBDIisBN947faqp3xZFPo2OYyPN133GXNNqP9tkRYAEghbnY8YJjPite/jOFUIRAoA4Bz7aAdSjRpDWB2raAFVe5prVR6I1ACQWc/qmya9MnS1g5JSOAQAMCPTriU9ELuT800KW/pk2dU9XOpbN2Hd1UZzoFF4i+boLnUPgE1tW2BWwLs21H4XEpsHEBtUlumF/QeEd6INCYwO3fGP8TVftuY71ojUC5BZzKjasefklPuRWoHgEEhhKobQtoajcO1W7w681dNTG2BWyOLhO9WABIaRru/eEx3zOT76cUjjAIDCqgoh9aMP2pvxi0ERcRiEGg0q5sCxiDI0OUQ0Cd/vK2B8Y9Wo5qqRIBBFoVWHX3mG9HL+Z+2PQ4LXQ0de9atqDnlS0MQddAAtHXTKDIJQw7rE2uFWFbwBJOffZKVmn3WmFbwOzNTOEyWv3g5MejBafPFK4wCkIgZgFT9VXnrhFRE24IIIBAnQLqK9eruKa2BZQWbireqfdsC9iCYaiuLACkKH/H96f+TlTZFjBFc0INLGAqb5tz6oY3D9yCKwjEI6B7++5Qlc3xjMYoCBRVwB688/Njf13U6qgLAQSSEbjlvhH/Hr0S/1ITo7fcxcy/5tJ5PWe2PBADpCrAAkCq3CIjq+2rxBvbAqbsTrj+BZw6tgXsn4azMQqsfuyY3WJye4xDMhQCxRJwsteqlVuKVRTVIIBAWgLOj7rFNbwtYDzZmfgPd820EfGMxihpCLg0ghDjzwIHtgV07s4/n+EeAiEF7MWTNm16T8gMiF0Oga1jvvMFVf33clRLlQg0KGBy951fHruxwV40RwABBA4I3HSvbhWzuw88qPeP2NrZ1K3Dei6ObTgGSlyABYDEiY8MsOP5x9T+PyzbAh5Jw5kAAl516ew3bxobIDQhSyRQ2xYwepfg2hKVTKkI1CfgZP3eMeM/UV9jWiGAAAL9C3RXRn0iemFX97aA/Y/S3Fk137lgwa5jmutNr7QFoq+TtEMSr7YtoIoF2bYDfQSOEFCb1DZM2BbwCBhOxC2w5htH/UTV/j7ucRkPgTwLmOn1a9dqd55rIHcEEAgvcGBbQG831ZlJrM1MbNRw7y6NdVAGS0yABYDEaAcf+O4fHfsPZmwLOLgSV9MSiP7hZlvAtLBLHqfSp9c5lf0lZ6B8BA4IeNVf3fGFcd888IA/EEAAgRYFVt035lEV+T9DDxN/C2/unWwLGL9rEiOyAJCEap1jsi1gnVA0S15Apb1XK1cmH4gIZRdY/ejkx7342n+DKjsF9ZdcQJ1Zm1bY9q/kXweUj0DcAubarlEZYltAif+m4p1W/UdELFqDiH98RoxPgAWA+CwbHqm2LaCqPtBwRzogkIBA9K7sqZ3TN56cwNAMicAhAvv6qquVbQEPMeFB+QRMKl+9bd2Yfy5f5VSMAAJJCty2Zvi/ifmvDBYjqWsm/tXL5vecldT4jBuPAAsA8Tg2PYr2DGNbwKb16Bi3gDn9cEeHVeIel/EQOFjgU49O3RO9PXDbwee4j0CpBFS7+6qVW0tVM8UigEBqAm0y6ib1unuAgMme9v4qtgVMlrjV0VkAaFWwxf5rfj5ph6nc1eIwdEcgJgF78YStmztiGoxhEBhQYOo3Jn3BOfmXARtwAYFiC9yz5kujnyp2iVSHAAKhBGrbAqqze/qPn/RZm7ptWM8lSUdh/OYFWABo3i62ntNGTP2MmPw+tgEZCIEWBJy3SztP3zq+hSHoisCQAl2iXtSuH7IhDRAomEC06L9huI67v2BlUQ4CCGRMoNuNuj/6TvvHI9JK44T5eQvYFjAN6aZisADQFFu8nboe0z4RngjHq8pozQpET07Hq/cLmu1PPwTqFbjz60f9VEW/XW972iFQBAEn7sab1um+ItRCDfkQWP6hPccu+dDOtUsv2vnTJRfvWnXVbBubj8zJshWB2raArlI5YlvAVsast6+JjRpmbcvrbU+7dAVYAEjXe8Bo9/z42Meiiz+MDj4QCC5g5j+wYPpTfxE8ERIovEBlmF3vjG0BCz/RFHhAwEz/6fYvjH3owAP+QCAVAdP9Uv2YiL4x+vobI15O2927438Kt1II3HL38Eed6M8PKja1u2Zy3rIFu16ZWkAC1S3g6m5Jw8QF2ivyUTGpJh6IAAgMJaDSbtrOtoBDOXG9ZYHVD05+XFQ+1fJADIBAxgXUmbkDP+2nlvFUSa9AAss+tOcsJ/q6g0tyUjln6cXbXnPwOe4XVUCjf3cqH43+1fFPV5jen09vC9jGtoDpkdcdydXdkoaJC9S2BRS2BUzcmQD1CZh6tgWsj4pWLQrs6e29U0U2tTgM3RHItIAXfej2L034RaaTJLlCCXR2WrsXW3FEUSbRP7ltV4pY9PmIq5womMDN9wz/12jGHzxQVsp/RM8lX718Xs/bUw5LuCEE3BDXuZyygNvffquZ7Ug5LOEQ6F9A/Uq2BeyfhrPxCdS2BYyenKyKb0RGQiBjAqrdlUr7zRnLinQKLjB8366ZUYnTouOIDxN59ZKL9px5xAVOFFLADx/1cfW6O0RxVWFbwBDug8VkAWAwnQDXatsCRpPCtoAB7AnZj4C64ydt2XxhP1c4hUCsAsd+fdKXon/72BYwVlUGy4qAOrn3ts+NfjIr+ZBH8QVWzLFJIm7uoJU6uTxa5B82aBsuFkLg9tt1i1bsvhDFqNqUrcN7aotRIcITsx+B6PlWP2c5FVTgeSOmftpE/ztoEgRH4FkBtWUzp2+b8OxDPiOQhECXqPfqr4m+KVkS4zMmAqEETN2GYTYuyBPvUDUTN7xA3/7dl5oN8dv+zZ4/deTeD4XPlgzSELART96vIk+kEeuIGOY7r1xkU484z4kgAtFzrSBxCTqIQNdj2ldx7vpBmnAJgdQEzGT8MNfLtoCpiZc30JqvH/0LMflWeQWovJACKjex7V8hZzazRS29pPvFJvbuehI0qS5cfPHOyfW0pU2+BVateklPtABwU5gqbERPtXtZmNhEPVyABYDDRTLyeM0Pjv5u9IbYDzKSDmkg8MFF0zf+JQwIJC3QZ3JD9ASlJ+k4jI9AGgLm5DdTXjH262nEIgYCzwlY70oxrTz3eNA7OlpFFw3ahIuFEKgVces9o7/hRH9eu5/2oebfuaKz52/Sjku8IwXckac4kxUBJ5VrJVqazUo+5FFqgUqf08tKLUDxqQjc8/DkP6nJJ1MJRhAEEhQ4sO2fa/9oV5f6BMMwNAKHCCy6eNep5uXNh5wc8oFeuGzmjpcM2YwGeRZ4LnerVq+Jvs+m/u+SSfTWpvmr2X1Cgt9YAAg+BQMnsOaHU/7LVNcN3IIrCKQpYNM7T996cpoRiVVOAV/puUtF2BawnNNfmKrN9Bu3f3402/4VZkazX0hHh1WcWROL9VaxPnd59iskw+YF/txz1f1jf6OqX/vzmfTu1bYFXDZ/74z0IhKpPwEWAPpTydC5yv72W4xtATM0IyVPxfav7JpubSVXoPyEBdZ87bi90TsEtyQchuERSE5Atdu1tQf6v7bJlcXI2RY4dsSeD4jpi5vJ0pycsuiinSzyN4OXhz6H5ajib44W2vcddjqVh+b1yq6AhTOFAAAQAElEQVSZNiKVYATpV4AFgH5ZsnOyti2gOlmTnYzIpNQC5o5/UtkWsNRfAykVf+xDk7/iRH+dUjjCIBCrgIncz7Z/sZIy2BACSz9o47y3hUM0G/SyU/fh2k8RDNqIi7kUODzpW+4Zs8FU7j38fBqPa9sCbh+2d1YasYjRv4Dr/zRnsyTgetgWMEvzUfpcVNgWsPRfBMkDdIl68b1sC5g8NRFiFjCnW0aP3Me2fzG7MtwQArpriai0umXvi48ZtfsC4VY0gX7r2d278T4VfbLfiwmf9KLzlnfuOTbhMAw/gAALAAPAZOn0mp9rb7RadkOWciKXMgvYuOGV3pbeZSizHrXXL3Dnw8f80rw9Wn8PWiIQXsCJ//gNn5q6J3wmZFAWgSUXbX+RibwvlnqrsmxRx8YxsYzFIBkR6D+NtWtf1O3Vbu7/atJnbYSJY1vApJkHGJ8FgAFgsnb6nh9O/fvoDTG2BczaxJQ0HzP5ANsClnTyUy67osOvU/XdKYclHALNCaj869GvmPBgc53phUBzAqqVK0U0lt/Po04n6YhRc4VbcQQGqeT2u0c9ZKKBflmpP29FJ9sCDjI9iV1iASAx2vgHZlvA+E0ZsWmBSl/Frmi6Nx0RqFNg9TfGrDdTtgWs04tmYQWcyTVdXerDZkH0MglcetHeE8zLdInxpqqXLJm957gYh2SogAKDh1YTqV6jIqn/uxUFVs+2gINPT0JXWQBICDaJYWvbAoqzLyYxNmMi0LCA6SlsC9iwGh2aEXA9a5zpxma60geBtAS86jdv++KEn6UVjzgIdHQ8UPFSXRm/hA3XPl0e/7iMGEBgyJC33z32X1T0oSEbJtCgti3g0s6970hgaIYcRIAFgEFwsnjJrO/WKK9d0cEHAuEF2BYw/ByUIIMD2wK6KtsClmCu81qiOdnPtn95nb385n3M8BkXmMlLk6ggemF29uIPbX9tEmMzZpoC9cVS8x9XkyDbAorpFStW2Mj6MqVVHAIsAMShmOIY9/5o2lZRd2eKIQmFwMAC5o5/orLxvQM34AoC8QhM/frkB50Y2wLGw8kocQuYrV39uVGPxz0s4yEwkMAVF60fbSpLBrre8nkT1UrblRK9Omt5LAYIJ1Bn5Nq2gOokyO4lqjbF72ZbwDqnKpZmLADEwpjuIK7n6E9H/y7/d7pRiYZA/wJqbunM6dta3Xqo/8E5i8AzAl2ivmruo9E3LXvmFJ8QyISAOd2i2ntPJpIhidII7Ncx853JUYkWbPKqJRfvfXuiMRg8UYFGBt+5f+O9KvpUI31ia6uVuWwLGJvmkANFz6WGbEODjAnUtgWMVmRvzFhapFNaARs3rNK7qLTlU3hqAnd/Y+KvzPSbqQUkEAJ1CESLoDetXnfM7jqa0gSBWASWfnDL8723i2IZbIhBVOyypTN+O3yIZlzOpkBDWdW2BRRnQbYFNKmOMK1c2lDCNG5agAWApunCdrz3R1O/E2Xww+jgA4HwAibvZ1vA8NNQhgwq0n69si1gGaY6HzU6+bdjXjnmK/lIliwLI+CGXR7VksqLchN5nj/6uFQWG6Ka+IhVoPHBVt016usu1LaAVj2XbQEbn7NmerhmOtEnGwIm7lqJlsyykQ1ZlFyg0lfxV5fcgPJTEKhtC6i+sjaFUIRAYGgBp2z7N7QSLWIUWPSB3a+OXpSfGeOQQw6lYvMvf//OZP+7wZBZ0KBhgaY6qJnz10cvEKMvs6YGaLpTFFC9+I+ImDY9CB3rEojmt652NMqgwL0/OuY/xSnbAmZwbkqZkrmTFp628S2lrJ2iUxXo3jthTfTsYH2qQQmGwBEC+ujqz4//P0ec5gQCiQmYuop9REyifwITC9LfwKP3t1X4r379yWT4XLOprbprzD+pBtoWUPyrLp239+xmc6dffQIsANTnlNlWZiNuFVG2BRRuWRDwoh/umm5tWciFHIorsPYx7Tav0b99xa2RyjIuYNKr5m/KeJakVzCBZRfvOi968f/KEGVF78l2LJu54yUhYhOzKYHWOvmRN4baFjB6Lnk52wK2Nn1D9WYBYCihjF+/90fjt6rZXRlPk/RKImBmxz9V2fK+kpRLmQEF1jw84cHoG9g/B0yB0CUWiN6H/cTtX5r4hxITUHrKAjNn/n5E1WRZymEPCmcVX3VXHHSCu5kWaC25W+7RDc7p/a2N0lxvVZtS3bN3dnO96VWPQPT8qZ5mtMmygO6f8ilR44lIliepRLlFiwBLFp78h4klKplSgwioVU2vib6JWZDwBC2tgIlt7entubu0ABQeRGBc9ag5anpskODPBlV9y6KLdp787EM+Z1gghtR27N9wjwbaFlClModtASWxW/TcKbGxGTglgdq2gKrKtoApeRNmKAEbVx02kv8rOBQT11sWqG0LqCLfaHkgBkCgEQHVW+776tH817tGzGjbksCl7989xYtk4h1Rp25lR4dVWiqIzokLxBFg7doXdatZkP9uZ1Id4UWXx1EHYxwpwALAkSa5PHP396d+W0zYFjCXs1fIpN83/4yN/F/BQk5ttooaVhl2g3rZl62syKbAAv++WR/9UoHro7QMCvh2WRE9xxuZkdSOP3bUvgsykgtp9C8Q29lb7xn1VScW5L/bqdg5yzv3vDa2YhjoOQEWAJ6jyP8d7yrXi2hVuCEQXqBi3q8MnwYZFF3glq+O2aAVCfL/FItuS339CKi7ft26C/k+2w8Np5IRWHTRrpdZ1Z+TzOjNjVqtVpfNnr1pbHO96ZW8QJwR1KIXi0H+u52JqIm7UsRUuMUqEM1prOMxWECB+35w9L+rCu9MBJwDQh8kYO6k+W/beMpBZ7iLQCIC3bt33KNqTyUyOIMi8IyAqn579RfG8ZN2z3jwKSUBs4+Iaqaer6vTSaOqo+emJECYRgVibn/z3WN+ZaoPxzxsXcOZ+FdduqCHbQHr0qq/Uab+Qak/bVoOJOD9iFuEbQGFW0YEVK/qYlvAjExGcdNY+9iLup256N++4tZIZYEFTHrFe37XTuBpKFv4JRftPsuJvi6Ldav3MxfN2jsti7mVPack6nd+5PWi0p3E2EON6auebQGHQmrwumuwPc0zLlDbFtDU+O3EGZ+nsqRnZsc/4ba8vyz1Umc4gTsemvA1J/qLcBkQucgCqvJptv0r8gxnr7bOTmsXbyuyl9nTGZlKe8X7S59+xJ8ZEkgklVvu0Q0qujaRwYcYVNWm2J6eTPwSzCFSzc1ll5tMSbRugUr3lE8I2wLW7UXDZAVUbDHbAiZrzOg1AbXoCen10Tc1qz3iQCAuARPbOrp3/J1xjcc4CNQj0L531yVRuxdER2Y/on9sZyyexS9py9YEJZdNj4y8x5ltTC7CwCNHX2tsCzgwT8NXoudKDfehQ8YFatsCiriPZzxN0iuNgI2zYaPZFrA08x2u0Lu+PvGfokWAh8JlQOQiCqjTVR/7qrLtXxEnN6M1rZhjk5y5eRlN789pWfR2U9Wu4pe0/Zkk+L0EE1izRveKhvnvdrVtAaMvt8z+REyC7IkMzQJAIqzhB73nB1O+pSI/Cp8JGSAg4sW/b95pm/4KCwSSFqi63huVbQGTZi7N+NG7//+1ScZ/oTQFU2gmBKo9u5dFX3u5+C370QuJv1180d4ZmYAjCUmaYNLzRj6oJr9OOk7/49vZyzv3sy1g/zgNnY3+3jbUnsY5Eqhq5WMibAso3LIgUFGzlVlIhByKLXDPV6dscBW5r9hVUl1aAmZ27bp1fB9Ny5s4Iksv6X6xN7sgXxZ2RddMG5GvnAuZbeJFdXWp9ybXRG8yWuLBDgsQBYz+Md7PT5wc5tLMQxYAmlHLSZ/atoCi8uWcpEuaxRc4cd6pm95a/DKpMLTAvt077lWxJ0PnQfycC5h8984vTfpBzqsg/bwJVHujxXKt5CltVZm6pbrrojzlXMxc06lq1b2jfymqj6YT7dAoKvq3K+b3nHPoWR41KsACQKNiOWs/vHfkLV5kd87SJt2iCqhc1cW2gEWd3czUVdsWUE1vzkxCJJI7gej7Zl/0Ntf1uUuchHMtsPSiXW81kzfnswg3r/a7C/KZe0GyTrEM7+VGkUpPiiGfCxX943xZFz9x8pxHM3dYAGhGLUd9bv/puC3RyuyaHKVMqgUWiN6VfdFTbVs+UOASKS0jAnd+Y+JDTjzbAmZkPvKWhlP36Tu/MvG/85Y3+eZXoKPDKt708rxWYCpjent3L81r/kXIO80aVt0z6k9O5RNpxnw2lqpN2T6yZ86zj/ncuAALAI2b5a4H2wLmbsoKnbB5W7Tw5O0TC10kxWVAQK2qeo2aRG/mZiAdUsiTwI4+7bsrTwmTa/4Fpgzb8341+8t8V+Les/jinfzC3zCTmHrUvTJ8jZjblHrgKKB5mbNkyZ7jort8NCHAAkATaHnrUtsW0LzekLe8ybewAuP8iL7Fha2OwjIjcPfXJv+LqrAtYGZmJC+J6K1r1k3akZdsyTP/Aks/aONErADb5VpF1a3M/4zksYL0c65tCxi9G39r+pGjvy1WHVHprSwPEbsIMVkAKMIs1lHDvT+a+h1Rzy8zqsOKJskLmJf3si1g8s5EEOlzvR9Xk31YIFCXgNrvjtkybl1dbWmEQEwCXnbVFsUnxDRc6GFOXDpz31tCJ1G6+IEKnvi8kV9WrYTZFlCrZ7MtYHMTzwJAc2657OWscm2UeDU6+EAgsIBVnOjVgZMgfAkEatsCipN7S1AqJcYhoJVrux7TvjiGYgwE6hFYNGvvNKfyvnra5qWN+eqHOzqskpd8i5BnqBq6utSrVK9VEUs7h+jNJPXOX93VZS7t2HmPB1jeZ7CB/Nf8cMp/mSrvbDRgRtPkBEzshAWnb5qeXARGRuBpgZ5dO+5TY1vApzX4c2AB/YfV68Z9f+DrXEEgfoG23upKM22Pf+SAI6ocf8zo3R0BMyhb6KD13rxm9C+iZYBvBUnCV1+x46mes4PEznFQFgByPHnNpF7pbr9FzLY305c+CMQt4MWu7uj49bC4x2U8BA4WqG0LaKI3HXyO+wgcJlAVJzcedo6HCCQqsPiiHSd4k1MTDRJocOfdktmzN40NFL5kYcOXW1W5QUJtC6j+shUrbGR4hfxkwAJAfuYqlkzX/HzSDqm4O2MZjEEQaFXAdNrErVPf3+ow9EdgKIE1D038BtsCDqVU3uum8ner143/z/IKUHnaAl1d5rTqrkw7blrxTG3SGD9yXlrxSh0nA8Uf2BZQ/KdCpKLepvh9bAvYiD0LAI1oFaTtjmOP+YyY8ESnIPOZ9zJM2BYw73OYj/zVrKIfVRO2BczHhKWWpZnsHN5nd6QWkEAIRAKb/2P3BaLy8uhuYT+iv1uX1H7HQWELzEhhWUmjrXvkXRJoW8Dodc1stgWs/yuBBYD6rQrTct06rXrVawpTEIXkWkBFxlaHV5fkugiSz4XAXQ9O/o2qfC0XyZJkagLqdNXNX5m4PbWABCq9wBUXrR8dvAh+1QAAEABJREFUvfgv/Pc9E2mvmGertmS/4jMz+g2f0j3q7LYQCZlVR7RVKytCxM5jTJfHpMm5dYH7fjjlR9Eo/xgdfCAQXsDsQrYFDD8NZcig0t52g1PbU4ZaqbEOgdq2f5vHfb6OljRBIDaBbhnTGQ12dHQU/sNMZiyetee1hS80WIHZCjzxuJFfFKn8S4isokWAd7AtYH3yLADU51TIVt7JdSLWV8jiKCpfAmoVx7aA+ZqznGZ7+5fHbTFTtgXM6fzFnbZJ5boutv2Lm5XxBhFY+sEtzxeziwdpUrhLZnZV9HxTC1dYFgrKWA5dXerN++tDpGVe1KTvI11d5kLEz1NMgPI0WzHnet/3p/5OTP8u5mEZDoGmBEzshM7TNhXytyE3BUKnxASGVbfcr6JPJBaAgXMhED1T/PEdXxjHT8LlYrYKlKQfdrmYDC9QRUOW4kz+dukle98xZEMaNCyQxQ6r7h31UxH9tgS4Rc8lX75tw95zAoTOVUgWAHI1XfEn613ldi+yLf6RGRGBJgTUVrItYBNudGlIYNXDL+mJ3if4eEOdaFw0gWofvwunaHOa+XoWfWD3q60iZ2Y+0QQSNF+9omumjUhg6DIPmdna+/rkehHdLwFu3nQF2wIODs8CwOA+hb963w+O3lURWVX4QikwHwKm0yZsmfqBfCRLlnkWuONrkx429T/Pcw3k3pLA5+764vjftjQCnRFoSMC04qpXi4k21K0ojZ2bssl2leq/PiQ/ddmNsPr+UY9HX+mfDpGheptS3dszN0TsvMRkASAvM5Vgntuf9711KvrvCYZgaATqFlAnixaftnNy3R1oiECTAhUvHzVjW8Am+XLbLZrzndYtq3NbAInnUmDJh3ada+b+JpfJx5d059JZu0rxyw/jIxtkpIxfGrZ35B2ibnOINFVkFtsCDizPAsDANqW5sm7dhdU+b9eWpmAKzbaA2Zhe7Sn89kjZnoRyZLf6oaP+1Tn3YDmqpcpnBdTp6jsemsB/fXsWhM+JC8yc+fsR5uXSxANlPICKG6XmFgu3WASyPkhtW8CKOrYFzOBEsQCQwUkJkdL9P576EzX5TojYxETgCAGv71l46qaXHnGeEwjELODa3MfF6+6Yh2W4jAqY+D/2TRr32YymR1oFFRjde9QcVT22oOU1VJY3uWDxxTv/qqFONO5PIBfn/rTlwS+aVIL8lLFZ9R3LFu5/XS6gUk6SBYCUwbMcrq+9+jEz6clyjuRWEgG1ine6siTVUmZAgdu/PG6LVvSegCkQOkWBiuq1a9Zob4ohCVVygUvfv3uKqswuOcNB5VtF1F190AnuNiWQj061nzJ24oP8lLF5Ua32Xd3VZbzePezLBZDDQMr88P7vPe9xp/qpMhtQe3YE7MC2gNvYFjA7U1LYTNr6Nn1C2RawsPP7bGHRc8Gf3PaFiY89+5jPCKQhUG2T5WIyUrg9J6AiJyy+ZNcpz53gTuMCOepxy5pRPxHRv5cAt+i55Mu3PrX33AChMx2SBYBMT0/6yXXvtrvMNMgv7Ei/WiJmXUC176rO11l71vMkv3wLrHr4JT1m7oZ8V0H2QwhUK16vGaINlxGIVWDx+3e9QrznxUc/qip6ZUeHVfq5xKk6BPLWpFrV66M57w2Rt1O3gm0BD5VnAeBQj9I/+tT/nbpHndws3BDIgICZvFAnbvpQBlIhhYIL3PnQ+EdU5GcFL7O05Znoutu/PO4/SgtA4UEErGIrRaJnVcKtH4EXTx2158J+znNqaIHctbj93pF/EHFBtgX03h/j9+2blzu0BBNmASBB3LwO/fwfHPMVEft1XvMn74IJmFvUOX3nUQWrinIyKKDmr4kWnXwGUyOllgR0t/N6e0tD0BmBBgWWfHDPDGfKLyAbzM108ezZm8YO1oRr/Qnk81xv2847VGRLiOzN3KwVC/Y+L0TsLMZkASCLsxI4py5Rr77yUTWxwKkQHoHoi9BGSxvbAvKlkLxAbVvA6MlJtACafCwipCdg5u+I3v0P8qQzvSqJlCWBpTN+O1yl77Is5ZTFXExt0ujqyM4s5pbpnHKa3OrVx+w2C7QYa9XhXtyKnNLFnjYLALGTFmPAu394zK+82jeLUQ1V5F7A6wVsC5j7WcxFAZVhbTcJ2wLmYq7qStL845vbJnymrrY0QiAmAZs0dZaJ493G+jwvXnbR3hfU15RWNYE8H09t//o6Zxrkv2OZZ1vAZ792WAB4VoLPRwhor/tY9ER43xEXOIFA2gJqFe/cyrTDEq98ArV3ilU92wIWZOqdtF+3bp3uF24IpCSw+OKdk1WNbf/q9DaRdnOed2br9BKRXLesbQto2hbsF7Kq7/tIF9sCisv1VxHJJypwz0+mbDDV+xMNwuAI1Clg4k+Yf8bm0+psTjMEmhaoPm/S/Sryx6YHoGMmBLy4n9z25bFBtp7KBABJBBHQqrvcTMcECZ7ToCZy1rJL9vD7Euqav/w3umXNsJ+o6ndDVGJmL9v+5N7zQsTOUkwWALI0GxnMpdq+5x5v8lQGUyOlMgqYXtXR8ethZSydmtMTWLNGe1Xcx4VbngWq2tdzbZ4LIPf8CSy6aNfLRHzpX1w0M3MmdpWIRWuvzfQuUZ+ClFqpyLUqGmRbwOir7PJFizaWepGOBYCC/EVKqoy1j72ou6KVm5Ian3ERaETAzE+btO3YDzbSh7YINCOw+usTHo2enPyfZvrSJwsC9sU7vnr0v2chE3IokYDZR0TY9k+auJnI3yyetffsJrqWqktRiv346lGPR3P+2RD1mMnkdj+m1P9NhwWAEF95OYt59/ePekhMfpGztEm3qAJmbAtY1LnNWF3R4uc10SJANWNpkc5QAl739PVWbhuqGdcRiFOgtu2fsu1fS6TaV728a6aNaGmQYncuVHU2fORqFbdNAtys5NsCsgAQ4IsufyHVqs4+aiI+f7mTcdEETGy0a+tdUrS6qCd7Ard9bdy/Rf/ufTl7mZHRYAJa0TvWfG3c5sHacA2BOAVq2/55tv1rndS5KVt07yWtD1TUEYpV16pVutObrA5SlVWHV81fFiR2BoKyAJCBSchDCvf/47G/UZGv5SFXciy+gFf/nnmnbnlF8SulwtACI0e6m1V0V+g8iF+ngOnjG93YT9fZmmYIxCJQ2/ZP2fZP4rh5X523dNauo+MYq3BjFLCg9du/9jkT/W2Q0kxnrJi/5/VBYgcO6gLHJ3yOBIYPH3VDtFK3O0cpk2pRBbw45+SKopZHXdkRuGnd+K0i/u7sZEQmgwmo2A1s+zeYENfiFqht+2fGtn9xuaq4UeIdP+UnR96KeKa2LaBUJNi2gF706q4SbgvIAkAR/zYlVNPt3xm3xanck9DwDItAQwIm/oR5p20+vaFONEagCYHqcZM+oSp/aKIrXVIUUNOf3v7lCd9KMSShEBCpustF2fYvzi8FE7tg6axdL49zzAKMVdgSVt0x6scq7nsS4BYt3r1s6/p97wwQOmhIFgCC8ucv+I6tm9d6sT/mL3MyLqKAU72SbQGLOLPZqqm2LaBXY1vAbE3LIdlET+K8uL7rDznJAwQSFjiw7Z+x7V8CzM57vTKBcXM8ZLFT176ej0n0j3iIKtXssrJtC8gCQIivtBzHXPebV+5v844nwjmewyKlbrVtAbcee1GRaqKWbArc9dXJ34reYf5hNrMjK1X50u1fnPwvSCCQqoC3j0Tv/vNcOgF0FTlh6axdb01g6HwOWfCsb75vwu+iOf9ciDJr2wK2VcfMCRE7VEz+0Qoln+O4a3445VGp6k9zXAKpF0rAFsya8RS/MKhQc5rRYiqV61WUbQGzNj3e9lQqbauylhb5FFvgwLZ/oq8rdpWBq6u6K7u6rC1wFpkIX4Yk/PARt5m67WFqdTNXLNj7vDCx04/q0g9JxCIIeOeuEeOJcBHmMu81mNjoYfuH8QuD8j6ROcj/jq+O+3eJ3mnOQarlSlF1zap1YzeVq2iqDSlwYNs/6yvtFmJp2Zva8Zv/e8+FacXLcJxSpLZqle6MXpiuDlKsVYd7kcuDxA4QNHIOEJWQuRe47wdH/7uKfCn3hVBAIQTM+QvYFrAQU5n5IkaMcLco2wJmaJ7sT5XuTZ/MUEKkUgKBA9v+qSvNu4VBp9Tb0s7OreOD5hA8eHkSeHLriM+K6H9KgFv0htLby7ItIAsAAb7AihLS+xG3RLXsig4+EAgr4MVpW5VfGBR2FkoRvbYtoKncVYpi81Ck0xtWPfySnjykSo7FEGDbv5TnUXX88P3DOlOOmq1wJcpm3TqtquoNoUr2rhzbArIAEOorrABx7/3R+K0idmcBSqGEIgh4feP807acUYRSqCHbAn7qhE+pyH8Lt6AC6uWXq78wnm3/gs5CCYOz7V/6k27yocVz9r0w/cDZiFi2LG65a+T3TN33Q9RtZi/bun5/4bcFZAEgxFdXgWK6fVM/baI8ES7QnOa6FJUrls747fBc10DymReobQvozN2Y+UQLnGD0JM1XtXKNiJpwQyAlAbb9Swn6sDDRX/J2rfatOOx0WR6Wss6K02sl1LaA2lf4bQFZACjlX6v4il7zc+0189fHNyIjIdC8QPS1OK2nbwLbAjZPSM86BW7/+oTvqOgP6mxOs7gFVB+888tjfx33sIyHwKACbPs3KE+iF1XPXHbJnhLuupCoamYHv/mOEb9zTj4fIsHatoDDbMzcELHTiskCQFrSBY5z3w+O/a6JBflRnQKzUlqTAtGLsvlsC9gkHt0aEqhW9FoVYVvAhtRiabzXrLv2O2hiGYxBEKhHgG3/6lFKtk30wuwjXV1WrtcuyZJmevRq+4hVFmhbQC8yc1nn3hdkGqiF5PhL1AIeXf8sMEyGXytifX8+wz0EwghEi1Gj2/valoaJTtQyCaz5yoT/MrUvlqnmjNR6951fnroxI7mQRgkEls747XDPtn/BZ9oq9rIt/7337OCJpJhAmUM9sy1gmN81ZjZMK1LY/3bCAkCZ/2bFWPsd35/wOxEN8qM6wg2BIwXeveDM9a888jRnEIhXoLdn763R4ie7ocTLOvBo5tfvHTf+EwM34AoC8Quw7V/8ps2OGC3yX9Y100Y02z9n/Uqf7pNbR3xGQm0LaHZWUbcFZAFAuMUlMLK3skrMtsc1HuMg0IKAM9+2Mnphpi2MQVcEhhS495FpW9UkzDsUQ2ZXvAZWqVy/dq12F68yKsqqANv+ZWxmVKZslr0zM5ZVQukwbG1bQOf046EkirotIAsAob6iChh31U8m71Rxtws3BDIgYGqv7TxjI9sCZmAuip5C9bhJn45WmtgNJeGJ9ia/uuML476ZcBiGR+BQAbb9O9QjA49MqnOXztp1dAZSSTYFRj8gcPOdIx+zgNsCbt+4/10HEinQHywAFGgys1DK9uO++zkz+48s5EIOCJgo2wLyZZC4QG1bQFVlN5QEpTX6xtLW1sa2fwkaM/SRAmz7d6RJFs6oulFRHsuio9AfFKOwGDcAABAASURBVPdngdq2gCouyC/dNetbsWjRxjFSoBsLAAWazCyUsm7dhVUVuzYLuZADAir6/O7eCRcjgUDSAqu/OvG7osJuKElBqz5427ox/5zU8IyLQL8CbPvXL0sWTprp+Ysv2fWKLOSSUA4Me5BAbVtAE3ngoFOp3TWTycNsXKG2BWQBILUvn/IEuucHU39sXr5bnoqpNMsCTrWTbQGzPEPFyc07d50K2wImMKPdVmm7NYFxGRKBAQXY9m9AmmxcUHFO3RVS2BuFHS4wUkbcKqo7Dj+fxmMzP6tI2wKyAJDGV00JYwxvq1wbPRHeX8LSKTljAiY2elhvOz8qmLF5KWI6a74y4b9EdJ1wi1nA37N63Zj1MQ/KcAgMKMC2fwPSZOqCqZ2w6OJdp2YqqbiSYZwjBK5bozuc17uOuJDCiei5ZLs4uSyFUKmEYAEgFebyBVn9vcmPm+lnylc5FWdRIHqScD7bAmZxZoqXU3WE3aImQd6hKJ6mSPSuy4bhlYn3F7E2asquANv+ZXduDs/MVdwVXV3Wdvj5vD8m//4FJjxvxKfVuUC/dNfOvHTRnjf0n1m+zrp8pUu2eRLoGV1dbWab85QzuRZWwHlpuzp6OaGFrZDCMiGwZt2kHeKUbQFjmg0TufGmdbovpuH+/+zdCXxd9Xng/ef5X8mSd1vGC5DOvOlMppOEThPSydKkHdokLGHJ0ppMlyQGG2MgEMySAJ1+XrUzwWazjW3JtrxgMLvCYsISlgSzhfKmkLQFEiYJJJCAjbGNd9m69zzvkYFg2ZZ8l7P8zzm/Gx2se+85/+d5vo8iXf1l62EZBA4qwNi/gxJ5doK9d8PLPV/2LCnSiUmgvV3L5iS1X7pbCfTiyZNvLcVUXmLLsgGQGHXxAq16YNJ2J8HC4lVOxV4KmH14+mc3MhbQy+bkK6mJW8bcEH5xfSlfVSVfTfjN/78uvmPsPdFFZiUEqhBg7F8VSH6dYkHl7OnTN472KyuyiUtgfufQh8W5J+Jaf7B1ndh/PWzcCZkfCxi+RhmsTJ5DoDGBw5+Y9J1A5LnGVuFqBKIRMKlc0PdvO6NZjVUQOLBA+xotB6ap/YTiwFll69G+sX/hC5TQUMN9gIhyZxkEDiLA2L+DAPn6tMqoobtbp/uaHnlFL2CBzlZNZyygiM089dT1I6OvKrkVw6+vyQUjUvEE2kXD18G9s/pezBWveir2TUBF37OrMuZrvuVFPvkTWHz32DXCWMC6G2tqd3fcPuaZuhc4wIU8hMBBBRj7d1AiX08IJPi7s6bu/I++5kde0Qos6Gr9pal8J9pVq1st3JVuG9k6MtNjAdkAqK7XnNWAwDWPHf5MoJUHG1iCSxGITEBNT2MsYGScLDSIgJPS5cpYwEGEBngqCHqkNGTuAM/W+zDXITCowJl/t+1YFf3IoCfxpLcC4TeDzS6o5Oa3tHsL7VFipaGtC8S5rWmkZBX56rnTtx+aRuwoYrIBEIUiaxxUoKWpabZYpeegJ3ICAjELmNjw5krzN2IOw/IISOddo38hqrdAUZuAlkrLox/7V1sOnF0sgT3/NCyonF+sqvNXbfiT2c9+/dTtf5y/yqjoQAJz5+pGUUnnl+5qpcVK8vUD5ZWFx9gAyEKXcpBj55oJa0X0OuGGgA8CZl84/dMbPuBDKuSQb4EWJwvVZEu+q4yuuvAF/LohbtSK6FZ8eyX+QGAQgcq4SVNU3eGDnMJTGRFwgXyzvd34/iYj/Wo0zZ5K6/Wm7uVG16nvenfSuWe8+fv1XZvuVfwfJF3/QkV3PUGXaPB6oYqmWF8FnJXs70VMfU2QvPIhMO/OsW+aakc+qom/CnVuThxj/+LPnAhZFegb+6eBTc1q/uTdXyBQO2LTyztO6P8o9/Iq0NWlveELuSvSqM8sKJm0nJJG7EZjsgHQqCDXVy3Q9fRhO0x0XtUXcCICcQqYfXjGZzYeHWcI1kagT2DS1jE3memLfe9zDCYQ/HvnbSPvHuyMOp/jMgQGFijreaI6YuATeCZrAkFQmdk+xVqzljf51icwf8nQ76uTp+q7urGrTOzEs8/eOr6xVZK/mg2A5M0LHXH5YxNWiwT/XmgEivdGIJDKt6YcxYsEbxqS00Ta12i5ycnlOS0vkrJUwi0SdZeJqEnkNxZE4MACe8b+iX3+wM/yaFYFTN3EN2TbqVnNn7zrENBSOmMBzYa4XveFOjJO9RKXanSCF1BATQM3S9V4kVfA7ntXsuqkIUM2ftW7vEgodwIdd419VFQez11hERVkpvfFNvYvohxZJm8CplqRvxcNf3aYt9KoR5zYqWefkr2fzNK6+gSuXtT6Qtj02+u7urGrwq9fmdtEZAOgsZ5zdR0CS3844ScWyD11XMolCEQvULHpM45eOyH6hVkRgf4CWnGzxaTc/1HuhSY9LuidE5cE6yJwIIGv/+2OY0XlyAM9x2PZFwjUDVMRJv5kv5VVV+BaW68Wl8JYQLXfn3lmz3+uOlEPTmQDwIMmFDKFslwlYjsLWTtF+yXgbJhYEy8S/OpKLrNZdM+YF8NvOBgLuE93zdk1C+8a/+o+D0d1l3UQ2E/g7ON+3hJY+bz9nuCBXAmEP5n9wllf2/rBXBVFMQMKvD0WcOmAJ8T4RCD2P2JcPvKl2QCInJQFqxFY9tTEdeHO7PJqzuUcBOIWCD9xf37G0RuPiDsO6yPQXLYFocKb4cFbKGBiG4Zv2xXj2L8wCG8I7CNgbZNOUcb+7aOSv7um4tS5C4VbYQR6Kq3Xhv/f/nXSBZvJR5OO2Ug8NgAa0ePahgR6m3asEDV+6tOQIhdHJOAqZpeIhC8XIlqQZRA4kMCC+8ZtUZXOAz1XyMdMrrrygUnbY6udhRHYR6Bv7J+Z8Qvi9nHJ71376Dmn7vzz/NZHZXsL9I0FDKwyd+/HknhfTTL1QyQ2AJL4qCDGAQVWrnlvj6jy7z4PqMODSQuoBB86/ZiNxyQdl3jFE5i4ZezN4U8LXixe5f0rDkSem/ihMXf1fzTae6yGwH4CjP3bjyTvDwQWXNDebk15r5P63hJY0DXiAVX96Vv3kvmvSTB25kxrSyZa41HYAGjckBUaEFj26Pj7ROXfGliCSxGITiCwC6Yc9RKzg6MTZaUDCLSv0bIryWUHeKowD2nf2D+T2e3tGu4DxFY2CyPQT2DGlzceIRZk7jd29yuCO3UI2Hs3vrTt9Dou5JLsCryceOq7tx2aeMw6A7IBUCccl0UloBb+7/qoVmMdBBoRMLHDhjSP/loja3AtAtUILFrd9piKPFbNuXk8J/yJ3AOL7hzzdLy1sToCewuYllzpovARXvuGCEV7M3Ezzjl1x8lFq7tI9ba3m/vWdBv9jdN7Pmsiif9SPquUxmTFm0+CWelUjvN8c+O6BwKVbTkukdKyJBAEpzEWMEsNy3Cuwe7LxKRwYwHDF2a7mlzfJJiYe8fyCOwlcOZfbzkmvMvYvxChiG/mrBRY0H7OlC3XnT1lx5fO/ur2D/dNCDjQce6UbR8699Qdnxjs+PrUHZ/8xik9xwx4nBY+Fx7heZPPOXXryYMdXz9l2ynnTN0+bbDjG1N3fP2c03acN+gxbcdF50zb2T74sf3/nD1t29x+x/Tw/j7HWadtXz7QcU743FvHtlvOOa2ne9Dj9B13n3v69vsHPabvXHPO9B3/PNjxjek7/uWc6dufH+zY+OqOZ3fKjifNKleLWWvyH+fanHzM+iKyAVCfG1dFKND9/BG7NZDk/6pOhDWwVI4EnA0zc+fmqCJK8VRg0T2TXlQnN3maXnxpmV274PZxv4kvwFsr818E3hE4+7ift4jK+e/c58/iCgTq/tg0+D9WshvUafeBjrLKjWULlr91WPjn/ocEtrQilbkDHpXwufAIvxH9x0Bc+2CHqF4YmJw32FExOzMwmzboIfbVQIKTBz/kSyZ6TL/Dwvv7HCryiYGO8KPnE28d+ocilQ8OeGj4nNnvh3X93qCHBBNEbNRgh4kNC2N6/ma9nif4u/Tc797jHQRSFFAnTANI0Z/Q/QXCL4wnzTh6baZ+o2v/CriXFYGmXusIcy3QWEB7Y/iOXUnMaQ5ZeUPgLYHKmElT1OTwt+7xXwQQQCB6gYoFmfnbzGwARN9/VqxPINz5q+9CrkIgBgFXsWbGAsYAy5L9BfrGAopK3yZA/yfye2/elYmM/csvIJXVJtA39k/VptZ2FWcjgAACtQm4iqyt7Yr0zmYDID17IvcTsPf0u8sdBFIWUAk+dNrRm45NOQ3CF0BgQ8vYm9WCX+a/1MpPJ/zRmDsTqZMgCLwj0Df2z2zEO3f5EwEEEIhaQFV3XL1s+OtRrxvXemwAxCXLulULnPrJ3/6BmB5W9QWciEBSAlb+5pSj0vhFMkkVSBwfBLq7tSLa/G0fcok1B21KbOxfrHWweGYEzvzy1vcLY/8y0y8SRSCrAoHocyJqkpEbGwAZaVSe03Ta9D/zXB+1ZVdARSe2NL8xJbsVkHlWBBZ9d/Q/q5NHspJvrXm6wB7svH30j2q9rs7zuQyBUMBUXfD34Tu81g0ReEMAgfgESqI/jm/16Ffmk2L0pqxYg8C0o37zHhP9Qg2XcCoCiQqYyPQzP7dtUqJBCVZIgUpFZoU/QMjMbxGuvknWWx5iV1V/fqNncj0CImf9zZbjQgfG/oUIvCGAQLwClaD8cLwRol2dDYBoPVmtVoHKkPNVpKXWyzgfgQQFWsvlnm8kGI9QBRXourvtZVHN3VjA8HP8tV3dYW1J9ZU4hRc4+7ift4SbtzMLDwEAAgjEL2C6dsGS4f8Wf6DoIrABEJ0lK9UocNqfvP4hFTu6xss4HYHkBcxOmv6ZjX+YfGAiFk1glI3tEJVNuak7sI27KuVEx/7lxo5C6haw0ZNOUcb+1e3HhQggUL2AOrlPJPyMI9m5sQGQnV7lKtN2MWdNcomZhj8cylVpFJNPAZVScJGI8fEq3OIUuPwu3epMFsYZI8m11enVK+4avzXBmIQquMCMr2ydYBZMKzgD5SOAQEICZqVwAyChYBGFYQMgIkiWqU3gt596/fMSyBG1XcXZCKQoYPbh6ce88bkUMyB0QQTWtz50q6j+36yXG34T9sIbTQ/cnmwdRCu6QKls54qTYUV3oH4EEIhfQFWfnb+45dn4I0UbgQ2AaD1ZrQqBvrFqgejZVZzKKQh4JWCBXTBzsg31KimSyZ1Ad/fJlZK6WVkvrGR2RV8tidZBsEIL7Bn7J3ZSoREoHgEEEhMINFiWWLAIA7EBECEmS1Un0FxZf5qK8FvVq+PiLI8Ewp3eids2bzjFo5RIJacCHatHPyXOZeq3Cu/dCjV7qHP1uB/u/VgS7xOj4AKufEkowGvbEIE3BBCIV0Cd/Gbt+nu/H2+UeFbnk2Q8rqw6gMCZR70+KfwpKt9ADeDDw/4LaGBTp3163UT/MyXDzAuoXSFqGRwLaL2VZrsyBX9CFljg63+7+TgV9xHhhgACCCTrEOXtAAAQAElEQVQgEATu2qz+LTc2ABL4ACHEuwK9FT1fVFvffYT3EMiYgJOhJVeambGsSTeDAovvHPsrJ6Ubspa6E12Vzti/rEmRb1QCfWP/ApPzolqPdRBAAIHBBFT1tXEbWrsHO8fn55zPyZFbvgRO/dS6PxIJ+CVq+WprIasxsROnH7P+yEIWT9HJCrTs7lSVDckGrT+aBraxp9K7pP4VGriSSwsrwNi/wraewhFIRcCstLC9W3enEjyCoGwARIDIEtUImJZMLmTsXzVWnOO9gIqKuQuFsYDetyrrCXZ2T9im6jIzFtCpzk9r7F/We03+9Qmc9dUt4wK1qfVdzVUIIIBAbQLq3EuvbRhyV21X+XU2GwB+9SO32Uz91BsnmCo/Mc1th4tYWPBHpx39xvFFrJyakxVYP+SB75iTF5KNWnu0cFfsl683j76t9isjuYJFiirQK+eHH3vDi1o+dSOAQMICFZ3X3a2VhKNGGo4NgEg5WexAAlOOeqnVLDj3QM/xGAKZFjA7n7GAme5gJpLv7j650iSl2b4na2qz03tR5LsO+cUhcOaXt75fGPsXBy1rIoDAAQRU3b9evaTloQM8lamH2ADIVLuymWxTefhUp3poNrMnawQGFlDVidvf3HDqwGfwDALRCPSNBVQnP4hmtRhWMXl48e1tT8SwcnVLclYxBRj7V8y+UzUCKQioimkluEJETTJ+YwMg4w30Pf1pH1s3UQLjGyTfG0V+9Qs4mTr9mPVscNUvyJVVCoSvPS5T9fGXDlk5/Cls+KKoykJiOI0liydw1t9s/pwy9k+4IYBAMgIqpXvndQ1/RnJwYwMgB030uQRr1pnidKjPOZIbAg0JmLWK6LnCDYGYBTpXj3sl/Ebbu7GATvX6vpGFMZc/2PI8VzCBs4/7eUv4I7iZBSubchFAICUBFe11GsxPKXzkYdkAiJyUBd8ROOVPX/tA+GL1hHfu8ycCuRUI7ITpx7zJL7nMbYP9KWxbT99YQHvDl4w0kM3lUpDy2D9fNMgjKQHG/iUlTRwEENgj4NzKOZ3Dwk34Pfcy/x82ADLfQl8LMC0F7pJwx4yPMV9bRF7RCYQf6FLp/Wa44aXRLcpKCOwvsOqBSdvNAm/GAqrq/K7uts37Z5rgI4QqlABj/wrVbopFIHUBVbdxa8/WZaknEmECfHMWISZLvSsw7ZPrjxPG/r0Lwnv5F3Dy32YcvYmxgPnvdOoVTvpI23fEyXNpJ2KBvbi+edStaedB/IIJMPavYA2nXATSFTCzhStWjN+abhbRRmcDIFpPVgsF+v5tnqjxb/NCC96KJVCxgLGAxWp5KtW2t2sQSPnKVILvFbTkvBj7t1dGvJt3gTMZ+5f3FlMfAn4JmL742oah3X4l1Xg2bAA0bsgK+wj0bBl1iogeLtwQKJiAqk3cvoWxgAVreyrldq0+5Cl1ltosYhV5pPOOtsdTKb5fUO4USoCxf4VqN8UikLaANunl3d1aSTuPqOOzARC1aMHXO+vTW8ZVRBn7V/CPg4KXP/XUz64/rOAGlJ+AgEpwRbjptDuBUP1CqFhFTa/q92Bad4hbGAHG/hWm1RSKgBcC4Ub3U1d3DH3Ui2QiToINgIhBi77crp6e85zKiKI7UH+BBcxam1QYCyjc4hboGwtoIqvijrPf+qo3dt41+hf7PZ7CA4QshkDfPy0MP9b5p4XFaDdVIpC6gJkLAmu6IvVEYkqADYCYYIu47LQ/e+P9pvb5ItZOzQj0EzA5nrGA/US4E5PA9p5di8XZ+piW329Z1WBLi9ii/Z5I5wGiFkSAsX8FaTRlIuCJQEnl9gVLWp73JJ3I02ADIHLS4i6o5d6LVZSPqeJ+CFD5OwLh/xHMyhe3i/H/h3dM+DMWgb6xgE50QSyLH2BR1dKCeXeOffMAT6XwECGLIHDWV7eMC9SmFqFWakQAgfQFVHVHpbmc2NfVNCp2aQQlZv4ETvvTdceYK/1x/iqjIgTqE1CxD7529BuMBayPj6tqEJjw4dG3JzEW0MRenLBp1C01pBbvqaxeDIFeOT/8fDq8GMVSJQIIpC1g4pYtWDAysb9Zl0a9bACkoZ6zmNM/Ys0VC/i3eTnrK+U0LhCYnjdzsg1tfCVWQGBggfa+sYAVmaXObOCzGn/GSemy9jVabnylaFZglfwLnP23Wz8gYiflv1IqRAABHwRMdV2pteVaH3KJMwc2AOLULcjaNmzdlPCF4X8oSLmUiUDVAqo2ceeWDfzV1arFOLFega67xzxj6h6s9/qDXefUnly0etRjBzsvwecJVQCBSlC+OCyT16ohAm8IIBC/gBObO3eu7ow/UroR+KSarn/mo0/9xOY2M52W+UIoAIGYBAKRUxkLGBMuy/YTKLvylaayq9+DEdxRsUql5GZHsFSES7BU3gUY+5f3DlMfAn4JqOpPx04cdrdfWcWTDRsA8bgWZlV1PeeK2MjCFEyhCNQqYNbarC78/0mtF3I+ArUJLLt93G9KatfVdtXBzzaxm5fcNvrnBz8zwTMIlWuBs4/7eYuZ8E8Lc91likPAL4HwBzZXtLdr+IdfecWRjYtjUdYshsCpn1z/B2GlXwwP3hBAYBABs4CxgIP48FR0Alt37uqKciygarBFy64zugyjWYlV8i3A2L9895fqEPBOQPWhBYuG/bN3ecWUEBsAMcEWYVkXVC4UtVIRaqVGBBoSUFGx8iXtjAVsiJGLDy7QNxZQVOcf/MzqzlDTzkX3jNlU3dmJnUWgHAvsGftnxu9OyXGPKQ0BrwTUlZ3qHK9yijkZNgBiBs7r8qd9au1npCR/ktf6qAuB6AXsA7899o0Tol+XFRHoLzDpQ6Pv0JI82//R2u+FP/1/uTxxzE21Xxn3Fayfa4Hdcr6qMfYv102mOAQ8ElC7cd7iob/yKKPYU2EDIHbi/AXoG/tnZufnrzIqQiBmgYrOnMlYwJiRWb7v3zBaYA2PBTTR2V1d2uudKAnlVmDP2D9j7F9uG0xhCPgmoLrF9exa7FtacefDBkDcwjlcPxi6/u9E9T/msDRKQiBWgfCnWhN3bN7A1IxYlVm8T2DxXWN/bBWpfyygVp5afOfYNX1r+XaQT34FKpXyxaLCa1PhhgACiQg4XTRv5dg3E4nlURA+yXrUjCykMvUTr7SJBDOykCs5IuCjgKmcwlhAHzuTv5zc0ObZKkFPrZWpSKWkwaxar0vofMLkVICxfzltLGUh4KmAU3ml7Y3WQv4zNzYAPP2g9DUtLTWdHebG2L8QgTcE6hIwa21y7ry6ruUiBGoQ6OwesVZEax4LaGq3dtwx/v+KlzeSyqPA2Yz9y2NbqQkBvwVc6Yr2bt3td5LxZMcGQDyuuVx1yp+9/j4x/atcFkdRCCQpEATHzfjM6x9OMiSxiimwbdeupSK2vvrqbWtvs+uo/vyEzyRcLgUqYyZNUZPDc1kcRSGAgIcC7l/mLWp9yMPEEkmJDYBEmPMRpKlS/qaoMPZPuCHQoICKBs79fbsYn4MbpOTywQX2jAUUmSfV3lQWLe8evbHa05M+j3j5E+gb+yeB8btR8tdaKkLASwFTF4grX+5lcgklxYvPhKCzHubUT77256Luk1mvg/wR8EfAPvDaMRtO9CcfMsmrwKQPj1mtagcdC2gSvLKhecyNHjuQWh4FGPuXx65SEwLeCjiV1fMXjzzo10RvC4ggMTYAIkDM+xLtR1mTE70g73VSHwJJC5jYBV85ei3zrpOGL1i89nYNVOTScBPABiu9ZDq72+t/DzlY9jyXRQHG/mWxa+SMQHYFVHTHLilfnd0KosncRbMMq+RZ4JXetX8rKu/Nc43UhkAqAibjhrqmqanEJmihBDrvHPsTM7l/wKJVn+q8a+zDAz7vwxPkkDsBxv7lrqUUhIDXAqZu2eLFI1/3OskEkmMDIAHkLIc4+2MbRqnI6VmugdwR8FrA9JQZJ7zBL7/yukn5SM4Nab5cDzAWMPwcX9Fg92zfqyS/fAkw9i9f/aQaBHwXMNN1bbtaVvqeZxL5sQGQhHKGY+xs7j1bVMdkuARSR8BzgaDFysZYQM+7lIf0+sYCquq1+9Ziarctumv8C/s+7tl90smRwJQpL7WaycwclUQpCCDguYAr2VXtK7XH8zQTSY8NgESYsxnkjE+t/X0x+Z/ZzJ6sEciOgJocO/2Y9UdmJ2MyzapAS/OYLlX7xTv5q1Ze621289+57++fZJYngWG7Dvla+HmPv/mUp6ZSCwIeC4Qb3f929eJh93icYqKpsQGQKHe2gvWKfEuUsX/CDYGYBQIRdeouahfjc7Jwi1Ngbrfu3LZj1187Z/8r/GD7R+kt/VUmxv7FicLaiQrM+MrWCRoEpyUalGAIIFBYAXXhjzNVLxNRE257BMKv/3v+5D8I9BOY9snX/zR8oO8I/+ANAQTiFghMjlh77IbPxx2H9RFY9cCk7Z13jL29c/WYWxbdM2ZTFkTIMT8CpV47N/zhwrD8VEQlCCDgs4Bq6d4Fi4f/2Occk86NDYCkxTMQb/JkK5lUGPuXgV6RYr4EzOy8M496fUS+qqIaBBoWYIGcCDD2LyeNpAwEsiKgpV3lUmVuVtJNKk82AJKSzlCcMa++/j9V9X0ZSplUEciFgIkbV2kpMRYwF92kiOgEWCkvAoz9y0snqQOBrAgEKxcuHP5qVrJNKk82AJKSzkicvrF/FbMzM5IuaSKQR4EpjAXMY1upqW4BLsyFAGP/ctFGikAgMwKqsqFc2rY8MwknmCgbAAliZyHUjqbes8IPirFZyJUcEcijgIm0SFnPz2Nt1IRAPQJck30Bxv5lv4dUgEDWBFSa5nZ2TtiWtbyTyDf8Xi+JMMTIgsD0T278DyrG2L8sNIsccy0QmBx7+ufW/3Gui6Q4BKoT4KwcCAzfecgpasLYvxz0khIQyIJA4PRnYw4dcmcWck0jRzYA0lD3NGZguy4S02ZP0yMtBIol0OsubhfGAhar6VS7vwCPZF3grK9uGWdip2a9DvJHAIHsCDSZXNHerkF2Mk42UzYAkvX2Ntr0T639mIgeJdwQQMALAXPy/rXHvslYQC+6QRKpCRA4+wK75XxVG579QqgAAQQyIaD60Lwlw57MRK4pJckGQErwPoWdPPnWUqWiF/uUE7kggICIWZmxgHwgFFqA4rMtwNi/bPeP7BHImoCK9laa9Kqs5Z10vmwAJC3uYbwxv/2zyeHu/H/xMDVSQqDQAiZuXLmlNK3QCBRfZAFqz7gAY/8y3kDSRyBrAiV3fUfH0F9nLe2k82UDIGlxz+KdedTrIwKxszxLi3QQQOBtgfCT9JTpn9n4H96+yx8IFEiAUrMswNi/LHeP3BHIoIDq5tZKS1cGM0885fC1ZeIxCeiRwO5eO0NFx3mUEqkggMBeAoHIEC3ZzL0e4l0EiiFAlZkVYOxfZltH4ghkV0Dl6su6dHN2C0guczYAkrP2LtKZf7bh99Tsb71LjIQQQKCfgIkcw1jAz/e5rgAAEABJREFUfiTcKYAAJWZXgLF/2e0dmSOQSQHVF1/bMLQ7k7mnkDQbACmg+xKyp1L+VviNxRBf8iEPBBAYRICxgIPg8FQOBSgpowKM/cto40gbgSwLlGR2d7dWslxCkrmzAZCktkexTvn42o85s7/wKCVSQQCBQQTMyftfO3bDFwY5hacQyJEApWRVQHvlAmXsX1bbR94IZE9A3WPzO4c9nr3E08uYDYD07FOL3C7m1OkFqSVAYAQQqE/AbGbfL+6s72KuQiBDAqSaSYG+sX8W2ImZTJ6kEUAgcwKqLvypv16ZucRTTpgNgJQbkEb43/zJ2i85sQ+mEZuYCCBQv4CJG2dDmxkLWD8hV2ZEgDSzKGAaBHKJqPDaUrghgEASAqpy8/wlrT9PIlaeYvBJOk/drKKWr/y3tcPN3DlVnMopCCDgoUAlKJ/CWEAPG0NKUQqwVgYFzvqbLceJBUdmMHVSRgCBLAqobpGeno4spp52zmwApN2BhOO3jtDTVe2QhMMSDgEEIhNwzVoKzotsORZCwDsBEsqaAGP/stYx8kUgBwJO5s9bOfbNHFSSeAlsACROnl7AaR/7zXsCs6+klwGREUAgCgETPfq0Y9/471GsxRoIeCdAQpkTGL7zkFPU5PDMJU7CCCCQSQFV/eVrbwy9JZPJe5A0GwAeNCGpFKw05AJVaUkqHnEQQCA+gVKgF0+efGspvgisjEA6AkTNlsCML26dIBJMzVbWZIsAAlkWCL+fYexfAw10DVzLpRkSmPqJ337YWfDZDKVMqgggMIhAoPJfx235NGMBBzHiqUwKkHTGBJqG2ExRGZaxtEkXAQQyKqBOvz9v8bAnMpq+F2mzAeBFG+JNol36xv41XWwafomONxSrI4BAggIVDWaeetL6kQmGJBQCMQuwfJYEzp689QOM/ctSx8gVgWwLhN/K9JZLjP1rtItsADQqmIHrf/PJ178gZkdkIFVSRACBGgTUXNuQ3Y6xgDWYcarnAqSXKYFKqXxx+KMFXktmqmski0CGBZxb2dEx9NcZrsCL1Pmk7UUb4kti+kdeHSYm34gvAisjgECaAoEFU8763Kb/mGYOxEYgKgHWyY7AWSdv/pwG7iPZyZhMEUAgywIqsqHXbVma5Rp8yZ0NAF86EVMeQaubLmLjY1qeZRFAIHUB11ypBDNTT4MEEGhcgBUyIrBn7J8Kn3cy0i/SRCAPAuaa5nR2TtiWh1rSroENgLQ7EGP8M496fZKYfTXGECyNAAIeCAQiR59+7IZPeJAKKSDQgACXZkWAsX9Z6RR5IpAPARV9vm3SkNX5qCb9KtgASL8HsWWwa3flQhFtFW4IIJB/AbNvMhYw/23OdYUUlwkBxv5lok0kiUBuBFTCH2eWmma1t2v4847clJVqIWwApMofX/DT/uT1DznTY+OLwMoIIOCTgIn+Qdu2T3/Rp5zIBYFaBDg3GwJ7xv4ZY/+y0S2yRCAHAlq6Z/6iIU/noBJvSmADwJtWRJmIqVnA2L8oSVkLgQwIBBacy1jADDSKFA8kwGMZEGDsXwaaRIoI5EhApdRT6a3ME26RCrABECmnH4tN+5N1J4nKH/qRDVkggEBSAto3FnBX3y/+TCoicRCISoB1siDA2L8sdIkcEciRgFWWLVwx/NUcVeRFKWwAeNGG6JKYctRLrYHIOdGtyEoIIJAlgUCCrzIWMEsdI9c9AvzHewHG/nnfIhJEIGcCunZs77AVOSvKi3LYAPCiDdElUeodPi1s6qHRrchKCCCQLQHXXAmC87KVM9kWXYD6/RaYMuWlVjHh84rfbSI7BPIloO7y9pXak6+i/Kgm/F7Rj0TIonGBaR9bN1HNTml8JVZAAIEsCwQmnz3z+A1/kuUayL1QAhTruUDf2D9ROczzNEkPAQRyIqDifjx/Scv9wi0WATYAYmFNadGm8vkiNjSl6IRFAAGPBCplu5CxgB41hFQGEeApnwUY++dzd8gNgfwJmLjAXHmWiJpwi0WADYBYWJNfdNqfrvtvGpSOTz4yERFAwEcBE/2DsVs//SUfcyMnBPoJcMdrAcb+ed0ekkMgdwJO5bb5i0c+m7vCPCqIDQCPmlF/KqYayDdNRetfgysRQCBvAibBNxgLmLeu5q8eKvJXgLF//vaGzBDIo4Cqbm+y3gV5rM2nmtgA8KkbdeZy2ifWHW9mR9Z5OZchgEBOBdRcW3OvOz2n5VFWPgSowmMBxv553BxSQyCHAuEPLjqv6hr1Rg5L86okNgC8akftyUw56qVWUzu39iu5AgEEiiAQfjH9CmMBi9DprNZI3r4KMPbP186QFwK5FXilbePwG3JbnUeFsQHgUTPqSaV5d+upIspv5hVuCCBwQIHANVfMLjjgczyIQNoCxPdSYApj/7zsC0khkGcB59ys9m7dnecafamNDQBfOlFHHn1j/8zc1Dou5RIEECiQQBDYpxkLWKCGZ6hUUvVTgLF/fvaFrBDIscCT8xYPXZPj+rwqjQ0Ar9pRYzKu76/+M/avRjVOR6CQApXALpo82UqFLJ6ifRUgLw8FGPvnYVNICYEcC6i4imhptnBLTIANgMSoow007eOvvt9ETox2VVZDAIG8Clig/3nclo1/mdf6qCuLAuTsowBj/3zsCjkhkF8BVblx/pLWn+e3Qv8qYwPAv55UmZG7REXoX5VanIYAAqGA6jmnnrR+ZPgebwikL0AG3gkw9s+7lpAQAvkWUN0su3oW5btI/6rjG0j/enLQjE77+NrPiMpHDnoiJyCAAAJ7CQRmbU27ZcZeD/EuAqkJENg3AdPAySXh6wteG/rWGvJBIKcC4Seb+fNWjn0zp+V5W1bo7m1uJDaAQEX19AGe4mEEEEBgcAGVv5tx7Kb/Z/CTeBaB2AUI4JnAWSdvOU4sONKztEgHAQRyKqCqv/ztxqG35rQ8r8tiA8Dr9uyf3LSPv3aUE/vg/s/wCAIIIFCFQOCaTSqMBayCilPiFGBtnwQY++dTN8gFgWIIqMrs7m6tFKNav6pkA8Cvfhw0GxX3N8INAQQQaEDATP/ijOM2fLyBJbgUgcYEuNorgRE7DpkiKod5lRTJIIBAfgVUH5q3eNgT+S3Q78rYAPC7P/2ym3LUpjEm9ol+D3IHAQQQqEMgEPt7xgLWAcclkQiwiD8C3/jrdRNNg2n+ZEQmCCCQZwEV7a2U9ao81+h7bWwA+N6hvfJr3r370+EOfWmvh3gXAQQQqEvAAv1Pbds2/lVdF3MRAo0JcLVHApVg6LliMsyjlEgFAQRyLKAi13QsH/rrHJfofWlsAHjfoncTNCt/7N17vIcAAgg0JqCmZ085ylobW4WrEahVgPN9EZjx5Y1HWGAn+pIPeSCAQM4F1K1v2jl0ac6r9L48NgC8b9G7CQZWev+793gPAQQQaEwgMGtradlwTGOrcDUCNQpwuicCpiVpvkhUeC0o3BBAIAkBZ8HcK1fp9iRiEWNgAT7pD2zj1TN9P6Vzoozu8qorJINAtgWcytZA5dVsV0H2WRMgXz8Evv7lLccy9s+PXpAFAkUQUNFnxxw27K4i1Op7jc73BMnvLYHS7tcmihr//v8tDv4bt4Dpb0Xcs1IJnhSt8gjkfqnhUGd3OnW3Vnuok5tV3LJaDpHS1SIyp+pD9TIzaz/goeHjBzhU3XnOuZnVH3KmOjf1d4eG7+85ZKrq/kdzqekUE5lcyxFY7/FNJscMdgTl8p8v/t64jy393iE/Cn14QyApAeJ4IDBlykutFsj5HqRCCgggUAABFTG14NL2dg0KUK73JbIB4H2L3knQjXznPf5EIA6B8JPzKyb6vyvNLZ/qenj8Z7t+cMjJXY9Mmtr1/SqPNRNmdlV1jA/PGz9zyYMTLln80Lj2ao8lD47/pyXfHzfnoMeD4TlvH10Pti3penD8sqqPBw65dulDE2494HF/+PgBjiX3j/ve4u+Nu7/6Y/yaJd8b92S1R8e9o59aev+452o5lj0w6aXOB8a9Mtix7PsT18XxccSaCAwuwLM+CDD2z4cukAMCRRLQe+YtHfGTIlXsc61sAPjcnb1yC78xYwNgLw/ejVJAAzVZLJvHn7DsB+NvWn7/6I1Rrs5aCCCAwO8EeCd1gRlf3DrBGPuXeh9IAIGiCITfw+yUYChj/zxqOBsAHjVjsFRKEpQHe57nEKhPQANRuajr4Qnzu57W3vrW4CoEEECgOgHOSl+g1GLnCmP/0m8EGSBQEIGS2LKrlyl/69CjfrMB4FEzBkulosGWwZ7nOQTqEVCVBUu/P/7ueq7lGgQQQKBGAU5PWeCcL289Qip2UsppEB4BBIoj8Ns3d79+TXHKzUalbABko0/Surt5c0ZSJc3MCOgLm9oOWZaZdEkUAQQyLkD66QqYVkQuEhVe+wk3BBBIQkBd6cqVK9/bk0QsYlQvwBeB6q1SPXPCj8a/HibA3MwQgbdoBJy6y7u7+14PRrMeqyCAAAKDCvBkqgJnnbzlOMb+pdoCgiNQLAF1z1y9uOWBYhWdjWrZAMhGn6RdNBCTnwk3BCIQCMQ9sOT7456MYCmWQAABBKoS4KT0BKZMeak1fA1xXnoZEBkBBIokYOKCUlCeJaIm3LwTYAPAu5YMkpDKc4M8y1MIVCcQ6O6gvIvfxlqdFmchgEA0AqySosCesX8ih6WYAqERQKBAAuE3mLfNXTqS71s87XnYH08zI639BZysEW4INCigKtde8+jhrzS4DJcjgAACNQhwaloC3/jrdRNNgmlpxScuAggUS0DNbWvS3gXFqjpb1bIBkKF+bT7s0R+Z2oYMpUyqvgmYbCzvFn7xn299IR8E8i5AfakJVMpDzxXG/qXmT2AEiiZgTjqu6hr1RtHqzlK9bABkqFvd3SdXVPR7GUqZVD0TCD8pz1vxxPitnqVFOgggkHMByktHoG/sn4mdmE50oiKAQNEEVNxLPdJ6o3DzWoANAK/bs39yld7KdeFOfmX/Z3gEgYMIBPKzzW1r7jjIWTyNAAIIRC3AeqkImFZMLgpD81ovROANAQTiFwhELu/q0t74IxGhEQG+KDSil8K11/zo8FdU5bsphCZkxgVcqXRF398iyXgZpI8AApkTIOE0BM6YvOVzjP1LQ56YCBRVwO5bsHToI0WtPkt1swGQpW69nau6IYtFjN21tz344+ACau5Bxv4d3IkzEEAgBgGWTFxgypSXWk1sZuKBCYgAAoUUCF9nbioFw79dyOIzWDQbABlsWtcTbS+HaV8fHrwhcHABk96KluYc/ETOQAABBKIXYMXkBYZvH3tK+AKPsX/J0xMRgWIKaDBr7nLdWMzis1d1+PUhe0mTsciQltIiJgLwkVCNgDq9bvkPxv66mnM5BwEEEIhYgOUSFpjxxa0TTGVqwmEJhwACBRXQQB++eunwuwtafibLZgMgk20T6VwzYZsTNy+j6ZN2UgJ9Y/96pCupcMRBAAEE+gtwL2kB12QzhbF/SbMTD4FCCqjIb3YP2ciz+3cAABAASURBVP2/Cll8hot2Gc698Kkf/sMJd4jYs4WHAGAQAZvL2L9BeHgKAQTiFWD1RAVOn7z1A8bYv0TNCYZAUQXU3DYXlM5ctGjMpqIaZLVuNgCy2rkw73bRQLV0qZpYeJc3BPoLBPKzNw955M7+D3IPAQQQSE6ASEkKmJa0fLGK8douSXZiIVBAAVVXCVQunLu89RcFLD/zJfNFIuMtXPrDCT8RZ/dmvAzSj0EgcJXZjP2LAZYlEUCgWgHOS1DgjC9vOVZMP5JgSEIhgEABBcKfOgbhBsD/y8i/7DafDYDs9u53mTc3l64SsZ7fPcA7hRdQcw8u/8Gh/1/hIQBAAIEUBQidlMCesX+BnZ9UPOIggEAxBdSk3OTk4nlLWm4vpkA+qmYDIAd97FwzYa2KLMtBKZQQhQBj/6JQZA0EEGhUgOsTE2DsX2LUBEKguAKBbXFOT5u7ZPh3i4uQj8rZAMhHH6V3SM8KUf1tTsqhjAYEVHQlY/8aAORSBBCIRIBFkhGY9tfrJhpj/5LBJgoCRRUI7F+HtLjJV3cNe6qoBHmqmw2AnHRz5Zr39pjqVTkphzLqFAhMNjSZLa3zci5DAAEEohJgnYQEWipDvyGM/UtImzAIFEvAiW4tOXfpui33/t2czmGvFKv6/Fbr8lta8Spb/viE76nYvxSvcip+R0CdXN25ZsK2d+7zJwIIIJCOAFGTEJjx5a1HBGYnJRGLGAggUByB8BvEHU5sRSkYetzVS4Zezy+Vzlfvw/7mq6CiV6PWfKmIVoRbEQV+trltzR1FLJyaEUDAMwHSSUDA1FlwUbjxz2u5BLQJgUARBJzoc+HnlG+3Vob9+fylI66cu1w3FqHuotXoilZw3uvtevKQn4U13hYevBVMgLF/BWs45SLgsQCpxS/w1tg/OzL+SERAAIE8Cqi4ilN5paR6d8npPzapfHr+0mGTFywdccPlK3SrcMutABsAOWyt2e75YVn8HzdEKMqbKmP/itJr6kQgAwKkGLMAY/9iBmb5xARMZKuobAkDrhfRV0TsFQt/Ct13BCJPm8mTqvq4mtzfd5jZHU711ncOMbvFmSzb+wh/gr3Yic7Z+1CV2S6w9r2PkupFJZGZ/Q5nM5rUTX330PD9Og4JrznIIaqnlUqlmXsfqnKhk6B97yOs59tOZU5Y47uHSIdTXdbvELnBibu1/yE3/e4cC9dQ/ScXVKabueN2udYj5y8dfszVXcO+efWSYbfM6xr+mnArhIArRJUFK3L5k7+30dQ6C1Z2gcvV3b2VXVcWGIDSEUDAKwGSiVtg6I6xU8IXcIfFHYf1EahGIPwGdbea3WYSfDP8xnJq36El+WsTm1ypBF8M3K5j+o5Kb/mTWh7+8UN0+JELrx3xgb6j49oRH1u4csTHw/f/x8Jrhx+z8NqRx3RcO3xy39F57YivdFw3YuqClcOnL1g5Ymbf0bFy5N/PXzG8/Z1j4cqR/zh/5Yg5ex8Lrhk5f/41w5ftfSxYMeK6+deOvHXv4+oVw++6+poR9/c7lo98dN6KYU8mcSxcPuyJq5e23r/3sWD58Hvmrwjz3OtYsGLEDfOXh/XsfSwb3jF/6bA5/Y5lw789f9nQ9v7H8P/9u3P6rl867Ob5K0Y93rF86K+7urS3mv5yTv4Ewq8f+SuKikR+r3nSDSryIhb5Fwj7vOqaRw8Pd83zXysVIoBABgRIMVaBGV/cOiH8vD8t1iAsjkDVAvamVORvFqwa+Q8d1426u+O6YU/2HQtWjPjXjmtHPrfo+lEvdF4z7pW+Y9GNYzYtuEG3tK/UnqqX50QEEIhcgA2AyEn9WLB9jZZN3WV+ZEMWcQkEIhuaxJbEtT7rIoAAArUKcH68AqVmO5exf/Eas3r1AqravuCGkc9XfwVnIoBA2gJsAKTdgRjjL3tiwmOi+kiMIVg6ZQGnNo+xfyk3gfAIILC3AO/HKHD65K0fYOxfjMAsXZOAqj614NoRD9R0EScjgEDqAmwApN6CeBNw0jxLRXYLtzwK/OzNQx65M4+FURMCCGRVgLzjEzAtafliFeO1W3zIrFytgEkg5eCKak/nPAQQ8EeALyL+9CKWTLqeaHvZVG+IZXEWTVXAWemK7u6TK6kmQXAEEEBgbwHej03gjMlbPiemH4ktAAsjUIOAOr2Nv/pfAxinIuCRABsAHjUjrlR2bbVOM30jrvVZN3mBQNwDSx4Z92TykYmIAAIIDCzAM/EITJnyUquJzYxndVZFoGaB7eKChTVfxQUIIOCFABsAXrQh3iRW/duk7arB/HijsHpiAia9pSY3J7F4BEIAAQSqE+CsmASGbx97SviCjbF/MfmybG0CJrpkwTUj19d2FWcjgIAvAuHXE19SIY84Bd7zw0m3i9qzccZg7WQE1OnKrofaXk4mGlEQQACBagU4Lw6BaX+9bmJFhLF/ceCyZu0CKr9x619dVfuFXIEAAr4IsAHgSydizqNdNLAgmKUmFnMolo9TIJCN5d2yLM4QrI0AAgjUJcBFsQgMKQ89N3yxNjSWxVkUgVoFArlqwX3v21XrZZyPAAL+CIRfU/xJhkziFVj+5OE/NtX74o3C6rEKlGzuiifGb401BosjgAACdQhwSfQCfWP/wn37E6NfmRURqF1ARX6ycNVwxv7VTscVCHglwAaAV+1IIJmKXCGiO4VbFgUY+5fFrpEzAsUQoMrIBRj7FzkpC9YvoGJqzZeKKH+TVLghkG0BNgCy3b+as1/21MR14nRFzRdyQeoCjrF/qfeABBBAYCABHo9agLF/UYuyXkMCJnfNX9XC75JqCJGLEfBDgA0AP/qQaBblpu3LRezVRIMSrCGBgLF/DflxMQIIxCzA8pEKMPYvUk4Wa1hAe5oCZZpUw44sgIAfAmwA+NGHRLNYuea9PaqlqxINSrD6BRj7V78dVyKAQCICBIlWgLF/0XqyWqMCwbJ51w9/rdFVuB4BBPwQYAPAjz4knsXSJybcJ2o/SjwwAWsWUMb+1WzGBQggkKgAwSIUYOxfhJgs1biAybrmnSOuaXwhVkAAAV8E2ADwpRMp5OGC5lkiWhFu/gow9s/f3pAZAgi8LcAfUQow9i9KTdZqVEBLOmduN788ulFHrkfAJwE2AHzqRsK5dD15yM9U5faEwxKuFgHG/tWixbkIIJCGADEjE9gz9s+MsX+RibJQQwKmz4/7f4bd09AaXIwAAt4JsAHgXUuSTSgIWq8OI24ND978E2Dsn389ISMEENhHgLtRCZiWrHyxmvHaLCpS1mlIwJrk0vZ2DRpahIsRQMA7Ab7IeNeSZBNa/uTojSK2ONmoRKtKwNys7u6T+ScaVWFxEgIIpCRA2IgEGPsXESTLRCKgIvd1XDP8mUgWYxEEEPBKgA0Ar9qRTjLvGTJplai8lE50oh5IoG/s39JHDuGXNB4Ih8cQQMAjAVKJQmDP2D+zmVGsxRoINC6gu3rFzWl8HVZAAAEfBdgA8LErCefUvkbLGui3Ew5LuIEEGPs3kAyPI4CAbwLkE4nAnrF/JodFshiLINCggJldu/i6Yb9tcBkuRwABTwXYAPC0MUmntfTJiT9UlUeTjku8/QUY+7e/CY8ggICfAmTVuABj/xo3ZIXoBCywjdazY1l0K7ISAgj4JsAGgG8dSTEflSGXqsjuFFMgNGP/+BhAAIHsCJBpBAJ7xv4FMjSCpVgCgYYFtFSa29k9YVvDC7EAAgh4K+C8zYzEEhfoeqLt5UD0xsQDE/BdAcb+vWvBewgg4LkA6TUqwNi/RgW5PkqBwOyFdTvuvjPKNVkLAQT8E2ADwL+epJpRyxDtNNM3Uk2iuMEZ+1fc3lM5AtkTIOMGBUxLlfIljP1rkJHLIxNQLV3O9KHIOFkIAW8F2ADwtjXpJNa5ZsI254KF6UQveFTG/hX8A4DyEciWANk2JrBn7J/qkY2twtUIRCbwUMd1w56MbDUWQgABbwXYAPC2NekldvgTk74jos8Kt8QEGPuXGDWBEEAgGgFWaUCAsX8N4HFp5AJq1mvlpqsiX5gFEUDASwE2ALxsS7pJtYsGVinPUhNLN5OCRGfsX0EaTZkI5EmAWhoRYOxfI3pcG7mAuus7bhz668jXZUEEEPBSgA0AL9uSflLLnzz8x4Ha99LPJP8ZqNOVXQ+1vZz/SqkQAQRyI0AhdQsw9q9uOi6MR2DzrtbdXfEszaoIIOCjABsAPnbFk5y0110uge70JJ18psHYv3z2laoQyLkA5dUvwNi/+u24MnoBVZ3f1dW2OfqVWREBBHwVYAPA1854kNeypyauE6crPEglvykw9i+/vaUyBPIrQGV1CjD2r044LotJwF5cu2P4rTEtzrIIIOCpABsAnjbGl7TKTduXS2Cv+pJPzvJg7F/OGko5CBRDgCrrE2DsX31uXBWXgLOm2d3dWolrfdZFAAE/BdgA8LMv3mS1cs17e0xkrjcJ5SkRxv7lqZvUgkBxBKi0LgHG/tXFxkUxCWggj85fNezxmJZnWQQQ8FiADQCPm+NLast/eOg9Gti/+JJPHvIIxD2w9JFDfpSHWqgBAQSKJUC1tQsw9q92M66IUUCtUpHgyhgjsDQCCHgswAaAx83xKTVrslli/DWxiHrSW2pycyJai2UQQACBJAWIVYcAY//qQOOSGAVKN3deP/oXMQZgaQQQ8FiADQCPm+NTassePeynYT53hAdvDQqoMPavQUIuRwCB1AQIXKsAY/9qFeP8WAXUtlQqvZ2xxmBxBBDwWoANAK/b41dyFrTOE9Gtwq1+AZON5bIsq38BrkQAAQRSFCB0zQKM/auZjAtiFFBznYtuHLMpxhAsjQACnguwAeB5g3xKb/mTozeK6GLhVr8AY//qt+NKBBBIXYAEahNg7F9tXpwdu8Ara3cNvzn2KARAAAGvBdgA8Lo9/iXndo6/Xkxe8i+zTGTE2L9MtIkkEUBgAAEerkmAsX81cXFy7ALOSd/Yv92xByIAAgh4LcAGgNft8S+5rqe1V9Su8C+zLGTkZnV3n8y83Sy0ihwRQOAAAjxUiwBj/2rR4ty4BVT1qfnXjXw47jisjwAC/guwAeB/j7zLcNnjh64Jk3osPHirUiBQxv5VScVpCCDgqwB5VS3A2L+qqTgxCQGzQAJ+eJMENTEQyIIAGwBZ6JKHOQYil4lY2cPUfEypt9TL2D8fG0NOCCBQvQBnVi8wbFvbqc7ksOqv4EwE4hNQp7ctuGHk8/FFYGUEEMiSABsAWeqWR7mueHzSiyqlG4TbQQX2jP17ou3lg57ICQgggIC/AmRWpUDf2L9AbWqVp3MaAjEL2HZpkoUxB2F5BBDIkAAbABlqlm+pNjdJh5m+4VteXuXD2D+v2kEyCCBQrwDXVSvA2L9qpTgvCQETWbLgmpHrk4hFDAQQyIYAGwDZ6JOXWXaumbDNibKrPFh3SjZ3xRPjtw52Cs8hgAAC3guQYFUCjP2riomTkhJQ/Y3bsG5VUuGIgwDTw5HNAAAQAElEQVQC2RBw2UiTLH0VOPyJ8d8JRJ/zNb+U82LsX8oNIDwCCEQjwCrVCDD2rxolzklU4KoF971vV6IRCYYAAt4LsAHgfYv8TrBdNDAtz1Iz8zvTNLJj7F8a6sREAIHIBViwCgHG/lWBxCmJCaiTnyxcNfyBxAISCAEEMiPABkBmWuVvotc8dvgzJsoXmb1aFKg8sPSRQ36010O8iwACCGRUgLQPJsDYv4MJ8XyiAiqmJpeKhP8VbggggEB/ATYA+ntwr06BIc1ymVilp87Lc3aZ9ZZ6m+bkrCjKQQCBogpQ90EFGPt3UCJOSFRAV89fNfLZREMSDAEEMiPABkBmWuV3op1rJqw1Ka3wO8tkslNxK7sY+yfcEEAgHwJUMbgAY/8G9+HZxAV6gpLMTzwqARFAIDMCbABkplX+J1pp3r5MAnvV/0xjzNCCjeWyLIsxAksjgAACSQoQ6yACjP07CBBPJyvgZFnnyhFrkw1KNAQQyJIAGwBZ6pbnua5c894edTbP8zTjTa+kjP2LV5jVEUAgUQGCDSbA2L/BdHgucQG1dc07R1yTeFwCIoBApgTYAMhUu/xPdunjE+8Rs6f9zzSODI2xf3GwsiYCCKQnQORBBExLlfIlasZrqUGUeCo5AZXSnLndulO4IYAAAoMI8EVrEByeqkdATUqlS00sqOfqbF8TzOruPrmS7RrIHgEEEHhXgPcGFjjjS1s+J6pHDnwGzyCQoIDK8+P+07B7EoxIKAQQyKgAGwAZbZzPaS979JCfquidPucYdW7BnrF/hzL2L2pY1kMAgTQFiD2AwJSjXmo1s5kDPM3DCCQuYOYubW/XAv7wJXFqAiKQeQE2ADLfQj8LsErLHBHb6md2UWfF2L+oRVkPAQR8ECCHgQSGHdJ2qnNy2EDP8zgCSQqo6r0d1w9/JsmYxEIAgewKsAGQ3d55nfnyJ0dvVNElXicZUXLK2D/hhgACORSgpAMKTDtp3cTAbOoBn+RBBJIX2NWrbm7yYYmIAAJZFWADIKudy0DeunP8KhP7VQZSrT9Fxv7Vb8eVCCDgtQDJHVigpallZvjiaeiBn+VRBJIVMA2uXXzdsN8mG5VoCCCQZYHwa1iW0yd3nwW6ntZes+AKn3NsODfG/jVMyAIIIOClAEkdQKBv7F8gesIBnuIhBBIXUJEN1rNrWeKBCYgAApkWYAMg0+3zP/kVTxz6sIk97n+m9WTI2L961LgGAQSyIECO+wvYW2P/lLF/+9vwSCoCKnM7uydsSyU2QRFAILMCbABktnXZSXyItMwWsXJ2Mq42U8b+VSvFeQggkDEB0t1PgLF/+5HwQIoCgVZeWNtz3+oUUyA0AghkVIANgIw2LktpL3p8zItmelOWcj5YrgFj/w5GxPMIIJBhAVLvLzCFsX/9QbiXuoCqu7y7++RK6omQAAIIZE6ADYDMtSybCZvoQjHZmM3s983aeku9TXP2fZT7CCCAQE4EKGMfAcb+7QPC3XQFVB7quG7Uk+kmQXQEEMiqABsAWe1cxvJe8cT4rWHKC8Ij82/K2D/hhgACeRagtr0FGPu3twbvpy2gYr1Waboq7TyIjwAC2RVgAyC7vctc5u95Ynx3oPJc5hLfO2HG/u2twfsIIJBHAWrqJ8DYv34c3ElbwLnrO24c+uu00yA+AghkV4ANgOz2LnOZt4sGTaKzVM0yl/w7CTP27x0J/kQAgZwKUNa7Aoz9e9eC97wQ2LyrdXeXF5mQBAIIZFaADYDMti6biXc9Nv6ZwCoPZjN7xv5ls29kjQACNQhw6u8EjLF/v7PgHR8ETOXqrq62zT7kQg4IIJBdATYAstu7zGbe0tQ0W6zSk70CGPuXvZ6RMQII1CbA2e8IMPbvHQn+9EPAXny9Z0S3H7mQBQIIZFmADYAsdy+juXeumbBWtLQyS+kHjP3LUrvIFQEE6hXguj0CjP3bw8B/PBJw2jS7u1sZ++dRT0gFgawKsAGQ1c5lPO9y0/auwOy1bJTB2L9s9IksEUCgUQGuf0uAsX9vOfBfPwRU5NH5q4Y97kc2ZIEAAlkXYAMg6x3MaP4r17y3p6RubhbSV3Eru55oe1m4IYAAAvkWoLpQgLF/IQJv/gioVSoSXOlPQmSCAAJZF2ADIOsdzHD+Sx8/5B5Re9rrEhj753V7SA4BBKIUYK0+Acb+9Slw+CNQurnz+tG/8CcfMkEAgawLsAGQ9Q5mOv9wW1uCWaYWeFsGY/+8bQ2JIYBAxAIsJ4z944PALwHbUqn0dvqVE9kggEDWBdgAyHoHM57/NY8d+rxKZbWXZShj/7zsC0khgEAsAixqjP3jg8ArAVXXuejGMZu8SopkEEAg8wJsAGS+hdkvwJVkbqCyzcNKruzuPpnfuOthY0gJAQQiFyj8gmf95ZbjRPXIwkMA4IWAiv1617DhN3mRDEkggECuBNgAyFU7s1lM15rD3nAqS3zKPtyQeH7poxN/6FNO5IIAAgjEJ1DslfvG/ona+cVWoHqfBMzpFV1d2utTTuSCAAL5EGADIB99zHwVm994fVUgFW9+035J9YnMo1IAAgggUK1Awc8bOm7sFDM5tOAMlO+JgIk9tXDVyB94kg5pIIBAzgTYAMhZQ7NaTvfzR+xuKjVd5kv+QRA0+ZILeSCAAAJxCxR5/b6xfyZyWpENqN0nAa006ZDZPmVELgggkC8BNgDy1c9MV9P1yPiHxcSLn7yryl9N/dN1n8w0KMkjgAAC1QkU+qwhzUPPDV8MDS00AsV7I6DObr/6+tYXvEmIRBBAIHcC4de83NVEQRkWcGbhrrel/4v3TEc60aXT/mztmulHvb7ytD97fcH0P3t9bmTHUeFaSR1/sb59eg3HjPDcfsdn1rfPiPTYEK5X3XH6Z9/41umf3nBeTcdnw/N9OI5+4+zpx6yfVs1xRnjeGcdsmObLcfqxG6bOOGbDyQc8Phc+7vkx/fiNx884fvMxAx4nvvkXp5+w+X0Z/lQZcerFXW7Gl7ceYWYnFleAyr0SMNseqM33KieSQQCB3Am43FVEQZkW6PrhxF+Kmje/9VbVTTCTj4rKp03lmMgOCdeK43DhuvseYidbDUcQntvvCOzkINIjCNcLDzv4YYF9zSSY5sWhYR61HGJniMl5Bz1Ezgt3vLw6wo/58wOR9gMeFj4e9aHhmgc8tD3Q2o/wk+AVgVTmBjrAYcFClcrqM07YdOsZx6/9/fD8Yr8VtnrTUjm4WNV4LVTYjwG/CleVro7rRm3wKyuyQQCBvAnwRS9vHc1BPUN3Ny8Mv/Fg7m0OekkJCPgsYGJHmAy5fvqXthf6l7/53KM4c+sb+xd+DHw4zhisjUDVAqa/kY3rrqv6fE5EAAEE6hRgA6BOOC6LT2DBU+O2lFQXxBeBlRFAAIG3BVTGuF09l759r4h/FLJmxv4Vsu1eF+2czFlw3/t2eZ0kySGAQC4E2ADIRRvzV8Sbkx7uVrUX8lcZFSGAgHcCqh874/g3P+NdXokkVMwgww5pO9UY+1fM5ntYtar8ZP71w+/3MDVSQgCBHAqwAZDDpuahpO7ukyvlPb8QMA/VUAMCCPguEFhw4eTJzw7xPc/I8yvggtNOWjcxMJtawNIp2UcBFQs3AC4VURNuCCCAQAICbAAkgEyI+gSueXzSU4HIA/VdzVUIIIBA9QLq5PfG97znK9VfkY8zi1hFS1PLzPDFz9Ai1k7NHgqYrp6/auSzHmZGSgggkFOB8GtgTiujrFwIlFQvU6v05KIYikAAAc8FKjPOPm7reM+TjDK9wq11+uStHwhETyhc4RTsp4BKT9AsjP3zsztkhUBuBdgAyG1r81FY12PjXzPVa/NRDVUggIDPAoHp8HJT+es+5xhtbkVbzbRUKV+iyti/onXe23pNlnWuHLHW2/xIDAEEcinABkAu25qvonqbJi4Rs9fyVRXVIICAjwJBYH951okbPuhjbpHnVLAFz/jSls+J6pEFK5tyfRVQW9e8e8Q1vqZHXgggkF8BNgDy29vcVLZyjfY4dfNyUxCFIICAtwKq4gJxF0oBbkUqsW/sn5nNLFLN1Oq3gFnpqrndutPvLMkOAQTyKODyWBQ15U9gyeOH3C1qz+SvMipCAAHfBMJvFD96+kkbPutbXhHnU6jl+sb+OSeHFapoivVXwOT58e8bdq+/CZIZAgjkWYANgDx3N1e19f2jzeDScBMgyFVZFIMAAn4KlPWCs4/7eYufyUWRVXHWYOxfcXqdiUpVzJy7tL1deT2TiYaRJAL5E2ADIH89zW1FSx479HkVXZ3bAikMAQS8EVAnv1cuteV3LKA30vEnwti/+I2JUL2Amt7Xcf1w/kZj9WSciQACEQuwARAxKMvFK9A8pHWOqWyLNwqrI4AAAiKqcnpexwJKQW57xv4ZY/8K0m7/y1TZ1Vtyc/1PlAwRQCDPAmwA5Lm7Oayt4/ujNqgES3NYGiUhgIBnAoHp8N5S+WzP0ooinYKswdi/gjQ6M2WaBdcuvm7YbzOTMIkigEAuBdgAyGVb812U7pi4MhD7Vb6rpDoEEPBBwMy+lL+xgD7Ixp/DnrF/okfGH4kICBxcQFU22O5dyw5+JmcggAAC8QqwARCvL6vHIND1tPaqK10Zw9IsiQACCPQTCF+0OzN3sYhpvyeyfKcAuU856qXWcPOGsX8F6HVmSlSZ29k9gX/CmJmGkSgC+RVgAyC/vc11ZcsePeQHovZ4roukOAQQ8EIgEDvy9JM2fsaLZCJIoghLDGtrO9UpY/+K0Oss1BhY5YW1PffxS4yz0CxyRKAAAmwAFKDJeS2xyVpmm1g5r/VRFwII+CNQqrgLczIW0B/UmDKZdtK6ieGmzdSYlmdZBGoW0CZ3eXf3yZWaL+QCBBBAIAYBNgBiQGXJZAQWPT7mRSd2SzLRiIIAAkUWCNTek4+xgPnvImP/8t/jTFXo5KGO60Y9mamcSRYBBHItwAZArtub/+JaepsXmMim/FdKhQggkLaAag7GAqaNGHN8xv7FDMzyNQmoWq9Vmq6q6SJORgABBGIWYAMgZmCWj1dgwVPjtjgJOuKNwuoIIICASGDZHwuY7z4y9i/f/c1kddd33Dj015nMnKQRQCC3AmwA5La1xSls06ETb1Gze0VlV3GqplIEEEhDwMy+dObxb7w/jdgRxMz1Emf95ZbjhLF/ws0Pgb6/nTh0yMjFfmRDFggggMC7AmwAvGvBexkV6O7WStfjEy/oaQ0+ZSoXBFZ+wNR2ZrQc0kYAAY8FVMVZqXSRZPKW36T7xv6J2fn5rZDKMifgZMHlK3Rr5vImYQQQyL0AGwC5b3FxClz1wKTtyx6dcO/yxw87d/PECR+VoDJZJZgjGjzJtIDifBxQKQJxC5jZfz/zhA1Hxx0n8vVzvOCwttGnhj9xPTTHJVJapgTsl6/3jOjOVMokiwAChRFgA6AwrS5WoX1/K2DpE4c+1/XYpGVLH500dddQ+4Qr6VdDhctFALfH1wAAEABJREFU9Z5A7VdqxkieEIQ3BBCoXaCiev7kyc8Oqf3K9K7Ia+S3xv4JY//y2uAM1qXS9O2+1yEZTJ2UEUCgAAJsABSgyZQo0ve3A5asGf8vSx+bsHLpo+MvXP7oxM8d1jThw6VS5XMieoapzVan16jKalV7TJw8F77/igSyLjDbYiLbJLypVHr67vcd4d3fiAUvqtjTYvL98LhNRJdVdWh4XhyHhes2eGh4fb8jzFMjPdwy1fCQjB0W5hvH0Wex55DQJcKjFK4Vx6HhuokdGpoMeNyoIi9KSrcw9u8dsvPQvk3FlDKoOWxuLxjS3HKuEzc0twVSWKYEVIIfLLhh2D9nKmmSRQCBQgmwAVCodlPs3gLta7S8eM2hv1r62PhHlj068bquR8Zf0fXohIu7Hp14+tJHJkzuenTCMeGGwZ+HmwUfX/bIhI+Gj32g65FDj+y733eE949e+uikE7oemfiVpY9OODs8/mHpI+PnVHU8HJ7n6bEkzKvf8f3xc5ZEeowL14vxeDBcO0vH98J84zjuDdfNynF3mOsBj7Fzltw94PF/ltwz9sSS6hV7//86yfdV5fTpJ245JMmY9cfK55Uzvrj1CA3spHxWR1WZE1DrVdd8eebyJmEEECiUABsAhWo3xSKAAAJ5ElBbdPfYa8IvZLenUVUgOrykvd9II3bNMXN5gWnJKhebquayPIrKnED4gbhq/qphL2cucRJGAIFCCYSvmwpVL8UigAACCORMINglV7hA3pQUbkGgX5xx/MYjUghdU8g8njzji5uONycfzmNt1JQ9gUCCjTuG7FqSvczJGAEEiibABkDROk69CCCAQM4Euh5q22wlTWXedvizZ+dKepGIhT/88xY2d4ntGfsn7tzcFUZBmRVQcfNWrBjP2D/hhgACvgs43xMkPwQQQAABBA4msHHomBvUgl8c7Lw4ng/MjjzzhM2fjWPtaNbM3yp9Y/+cymH5q4yKsihggfxs/e777shi7uSMAALFE2ADoHg9p2IEEEAgdwJvjdwqXZlaYc4uOPu4n7ekFn+wwDl7jrF/OWtoHspxwazu7pMreSiFGhBAIP8CbADkv8dUiAACCBRCYMm9Yx9VkcfSKDYwe09vc5uXYwHT8IgzZktTy0zG/sUpzNq1CJjJA503jP5RLddwLgIIIJCmABsAaeoTGwEEEEAgUgEnuy8LNwHKkS5a5WJqcvrZx20dX+XpSZ2WqzinT97wgXCz5YRcFUUx2RUIbHdTqTQnuwWQOQIIFFGADYAidp2aEUAAgZwKLLpn0ouiclMa5ZnosHLz7nPSiD1wzDw9Y1qquEtUldcueWprlmtxtpKxf1luILkjUEwBvogWs+9UjQACCORWYEjFOsIvbpvSKNC7sYBpIMQUs2/sn4geKdwQ8EHAZIPt3rXMh1TIAQEEEKhFIHyNVMvpnIsAAggggIDfAgvuG7fFTBamkaWqOHXuYvFkLKDk5MbYv5w0MkdlqNlVnd0TtuWoJEpBAIGCCLABUJBGUyYCCCBQJIGNwx+61Zn+3zRqNgk+7MlYwDTKjyUmY/9iYWXROgW0Ij895A9G3lXn5VyGAAIIpCrABkCq/ARHAAEEEIhDoG8kV6nJzYpj7arW9GIsYFWZen8SY/+8b1HhEnTOXdrerkHhCqdgBBDIhQAbALloI0UggAACCOwr0LF69FNqwcP7Pp7E/cDsPeWmtq8lEWvAGDl5grF/OWlkbsrQe+ffOPzp3JRDIQggUDgBNgAK13IKRgABBIojUGrS2U50d0oVT09zLGBKNUcalrF/kXKyWIMCZtKjFWXsX4OOXI4AAukKuHTDEx0BBBBAAIH4BDpXj3slELshvggDr9w3FrC3qfcbA58R6zM5WJyxfzloYq5KKImsWHjz8FdzVRTFIIBA4QTYAChcyykYAQQQKJbAzt27O1VtfRpVhz8x/MKM4zcekXzs7Edk7F/2e5inCoLA1jX1jliep5qoBQEEiinABkAx+07VCCCAQGEEVj0wabuYLEij4NTGAqZRbIQxGfsXISZLRSLgXOmqud26M5LFWAQBBBBIUYANgBTxCY0AAgggkIzAoX/cdrsTfTaZaP2jmAQfnvH5LUf3fzTee1lffVjb6FOdymFZr4P88yEQWPCvHTcMuycf1VAFAggUXcAVHYD6EUAAAQTyL9DerkEg5dnOxNKo1iqVb02ZYq0Jxc50GMb+Zbp9+Us+/JzhnF0hoql87hBuCCCAQMQCbABEDMpyCCCAAAJ+CnTdPf4ZU3swjexUZdLQDRu/mkzsbEdh7F+2+5e/7PW7HdePeSZ/dVERAggUVYANgKJ2nroRQACBAgqUgpbZKkFPSqUnMxYwpeKiCHv65zd8IDA7IYq1WAOBRgXMpKfZ6dWNrsP1CCCAgE8CbAD41A1yQQABBBCIVaDz3hFrzfS6WIMMsLiJDis39Z47wNORPZzdhUxL4i5RVZfdGsg8TwIqsnTe9cNfy1NN1IIAAgjwRZaPAQQQQACBYgm4XV0S6OtpFB2YfH7GF7fGORYwjbIiibln7J/TIyNZjEUQaFCgb+zf+CEjrmlwGS5HAAEEvBNgA8C7lpAQAggggECcAl3fPWxH+KPmeXHGGGhtVXFarlwsYuEPFyWGWzaXZOxfNvuW56xLrnR5+0pN658L5ZmW2hBAIGUBNgBSbgDhEUAAAQSSF1j03TGrxeTfk48cfusf51jANAqKIOaesX/C2L8IKFkiAoFwd+4nC28Y9r0IlmIJBBBAwDsBNgC8awkJIYAAAgjEL6BmqpeqhdsA8QfbL0JcYwH3C5SBB6adtG5iEMjUDKRKikUQMAuck0uFsX/CDQEE8inABkA++0pVCCCAAAIHEVhy99h/FZV7DnJaLE+r9o0F3Bz1WMBYco170ZZSy0ynbmjccVgfgSoFVs9fNfLZKs/lNAQQQCBzAmwAZK5lJIwAAgggEJVAr+u9Skx2RrVebetUps/44toJtV0z2NnZe27P2D9h7F/2OpfTjM12uF5N5feD5FSUshBAwEMBNgA8bAopIYAAAggkI7Dsronrwp/Gr0gmWv8ofWMBtTzkG/0fbeBe5i59e+yfKK9FMte73CbctaB75PrcVkdhCCCAQCjAF90QgTcEEEAAgeIK7Ny2ebmYvZqGQJRjAdPIv5GYjP1rRI9roxYw09+4TeuujXpd1kMAAQR8E2ADwLeOkA8CCCCAQKICK9e8t0dF5yYa9O1gqpGNBZQs3Rj7l6VuFSRXLV+54L737SpItZSJAAIFFmADoMDNp3QEEEAAgbcEFt0z9l7T4Om37iX7X5Pgw2eetPGYxqJm62rG/mWrX7nP1vSZzhtGP5j7OikQAQQQCAXYAAgReEMAAQQQKLqAWviz+FkWfjeehkQl0G9OmWKtdcfO0IWM/ctQs4qQqlkgZrOEsX/CDQEEiiHABkAx+kyVCCCAAAIHEViyetzzzrnVBzktlqdVZVLrpk1fq3fxLF3H2L8sdasAuare1nHTyOcKUCklIoAAAnsE2ADYw8B/EEAAAQQQEHFNbo4Eui0NCw3stDrHAqaRbl0xz/rLDR8Mf9x6Ql0XcxECEQuY2fbewBZEvCzLIYAAAl4LsAHgdXtIDgEEEEAgSYGOO0ZtUA2WJRnznVh7xgIGrXWMBXxnBd//NLWyu1iFsX++d6oo+TnnOrtuGvVGUeqlTgQQQKBPgA2APgUOBBBAAAEE3haoHN52jYq8/PbdRP8ILPj8jC9uPaKmoBk5mbF/GWlUQdJUk1fW7Rp+Q0HKpUwEEEDgdwJsAPyOgncQQAABBBAQ6erSXhWbk4ZF+E2Jk0rvJSIW7kFUl0EWzmLsXxa6VLAcS3JZd7fuLljVlIsAAggIGwB8ECCAAAIIILCPQOfd4x5wok/u83Ayd00+VMNYwGRyajBKS9voU53IYQ0uw+UIRCNQsacWrhr5g2gWYxUEEEAgWwLh1+NsJUy2CCCAAAIIJCFgrnS5ilaSiLVvjOrHAu57pX/3+8b+aSBT/cuMjIoo0Pf/6aBJZhexdmpGAAEE+gTYAOhT4EAAAQQQQGAfgUV3jXpBVG7f5+FE7qpWORYwkWwaC9Jcapkp6oY2tgpXIxCNgIl1L7o+/P92NMuxCgIIIJA5ATYAMtcyEkYAAQQQSEqgtdVdLWJbk4q3d5xqxgLufb6P7zP2z8euFDgnk62BGmP/CvwhQOkIICDCBgAfBQgggAACCAwgMLd79EYVWTzA07E+XMVYwFjjN764aYWxf40zskJkAs5Jx6Ibx2yKbEEWQgABBDIowAZABptGyggggAACyQlUDmu7PtwE+FVyEd+N1DcW8Ouf3/iH7z6y93t+v8/YP7/7U7TsgkBe3jVi1E1Fq5t6EUAAgX0F2ADYV4T7CCCAAAII7CWwZyygVa7Y66HE3u0bC1g2uVgONBYwsSxqD8TYv9rNuCJeAVdyl/b9fzneKKyOAAII+C/ABoD/PSJDBBBAAIGUBTrvGf9wmMLj4ZH8m8mHzvjCpmP3Dezz/Za20aeG+TH2L0TgzQcB/eeOG0c+6kMm5IAAAgikLcAGQNodID4CCCCAQCYE1Fzf6LByGskGZblwyhRr3Su2t+8y9s/b1hQyMRWrlNRmFbJ4ikYAAQQOIMAGwAFQeAgBBBBAAIF9BRbdM+ZFFb1138eTuK8qk4Zu3DTl3Vj+vsfYP397U9DMbp5/4+ifF7R2ykYAAQT2E2ADYD8SHkAAAQQQQODAAk2VYH74zJvhkfybBdPPnLxt0p7Anv6HsX+eNqawadmWphbrKGz5FI4AAggcQIANgAOg8BACCCCAAAIHElhw37gt4U/jOw/0XNyPmbhW27X7nL44fh6M/fOzL8XNylQXzFs5Np0Nu+KyUzkCCHguwAaA5w0iPQQQQAABvwTeaBl7k5qk81eKVT7/9c9v+0O/RN7KhrF/bznwXz8EVIIXJ7w66hY/siELBBBAwB8BNgD86QWZIIAAAghkQKC7WyuipVR+qZgFomUrXyxi6hMVY/986ga59AkEUprdvkZT+aWdffE5EEAAAV8F2ADwtTPkhQACCCDgrcCi747+Z1V5JJUETT50+uc3HZdK7AGCMvZvABgeTkdAZU3nTaMeTyc4URFAAAG/BdgA8Ls/ZIcAAggg4KlAJZBZKro76fT64mkgF06ZYq1976d9TDtp3cQwn6lp50F8BPoETKysvXZF3/scCCCAAAL7C7ABsL8JjyCAAAIIIHBQga67214WsZsOemK0J7y9mps4dOPmKW/fSfUPxv6lyk/wfQRU3Q0Lu8e8tM/D3EUAAQQQeFuADYC3IfgDAQQQQACBWgW0tdyhIhtqva7+8/e60oLpZ07eNmmvRxJ/l7F/iZMTcBABNd3c21tePMgpPIUAAggUXoANgMJ/CACAAAIIIFCvQGf3hG3q3MJ6r6/5ur0uMHGttqt8zl4PJfyuaaXsLlZRXkskLE+4AQRKOnDaEA4AABAASURBVK+ru23zAM/yMAIIIIBAKMAX7RCBNwQQQAABBOoVWD/kge+YyAv1Xl/Ldfudq/b5r39+WypjARn7t183eCBFgcD0l+t2j/hOiikQGgEEEMiEABsAmWgTSSKAAAII+CrQ3X1yxVwwO4H89gthgWrZkh8LyNi//VrBAykLlEoyu7tbKymnQXgEEEDAewE2ALxvEQkigAACCPgu0LX6kKdU5KF48xxg9RTGAg4dPbrvt/4fNkBGPIxAogJq8v2FN4x6ItGgBEMAAQQyKsAGQEYbR9oIIIAAAn4JqLMrTGVXbFkNsrAGyY0F7Bv7F9Z56iDp8BQCCQpor7ngygQDEgoBBBDItAAbAJluH8kjgAACCPgi0Ll63CtOdFVc+Qy+rpvYunHzKYOfE82ze8b+mRsazWqsgkBjAiZyXceNY3/d2CpcjQACCBRHwBWnVCpFAAEEEEAgXoFtPbuWiNj6GKIcdEm14LTpX9p+6EFPbOCEs07c8MEgsBMaWIJLEYhMILBgY8/2XV2RLchCCCCAQAEE2AAoQJMpEQEEEEAgGYFVD0za7tRdHX20g6/YNxawqdIb41hA04pzjP07eCs4IyEBlaZ5K+4avzWhcIRBAAEEciHABkAu2kgRCCCAAAK+CEw4csydavZspPlUuZiJnRTXWMA9Y/9Ej6wyFU5DIFaB8GP9Z+sr990RaxAWRwABBHIowAZADptKSQgggAAC6Qm0t2tgrjJLRSyqLKpdJ66xgHvG/pk7t9o8OA+B2AWczuruPpmxf7FDEwABBPIm4PJWEPUggAACCCCQtsDiuyb82ETvjyiP2pYx+dAZJ236XG0XDX72nrF/Joz9G5yJZxMSMJEHOm8Y/aOEwhEGAQQQyJUAGwC5aifFIIAAAgj4IuAqzZerBT2N51P7CmZywZQp1lr7lftfwdi//U14JE0B3d3U1DwnzQyIjQACCGRZgA2ALHeP3BFAAAEEvBXovHfEWtHSNQ0nWNcC0Y0FZOxfXQ3gotgEbOX8VcNejm15FkYAAQRyLsAGQM4bTHkIIIAAAukJ7Nz65lI1e62RDOq9VlUaHgvI2L969bkuFgGTDVbetSyWtVkUAQQQKIgAGwAFaTRlIoAAAggkL7ByzXt7VHReA5HrvtQCaS1Ver9R9wLC2L/67bgyDgFVvaqze8K2ONZmTQQQQKAoAmwAFKXT1IkAAgggkIpA591j73aqz9QXvNGr7MR6xwIy9q9Re66PUkBNf3rIH4y8K8o1WQsBBBAoogAbAEXsOjUjgAACCCQoEH7rYsEsMwlqDtrgBRaoVqR8iYQ/za9lKcb+1aLFuUkIOFe6tL1dE///UBK1EQMBBBBIUoANgCS1iYUAAgggUEiBju+Oe06d3FNr8VGcbyJ/VOtYQMb+RSHPGtEJ6L3zbxz+dHTrsRICCCBQXAE2AIrbeypHAAEEEEhQoCy9faPLdtYQMrJTzckFMyfb0GoWZOxfNUqck5RAuIHVo1bq+/9OUiGJgwACCORagA2AXLeX4hBAAAEEfBFYdtfEdaJSw28wjzBzcxN37N50SjUrNrnm88RcVZsF1azHOQg0IlBSt2LhzcNfbWQNrkUAAQQQeFeADYB3LXgPAQQQQACBWAV6tmy+Rk1/W1WQiE9y6qZN/9L2Qwdbtm/sn5keP9g5PIdAUgKB6Lqm3hHLk4pHHAQQQKAIAmwAFKHL1IgAAggg4IXAnrGALriqmmSiPsdMWks22FhAxv5Fbc56jQk4J1fN7dZU/tlMY5lzNQIIIOCvABsA/vaGzBBAAAEEcijQeVfb/aLBwcYCxlO5DTwW8K1fFKhHxhOYVRGoTcBE/q3jhpGp/OLM2jLlbAQQQCBbAmwAZKtfZIsAAgggkHkBNVeRb4c/kQ8GLiWeZ8xUe3X3P7UfZU17R/jmSTZSnLtg78d4H4HUBFRMzS4XURNuCCCAAAKRCrABECkniyGAAAIIIHBwgc57DvmpqtwpA91ifFzN/cHrYzd/S8S0L8z06da81W260kwm9t3nQCBtAQvs7o5bxjyTdh7ERwABBPIowAZAHrtKTQgggAAC3gsE0jTPiW0/UKJxPxYE8rdnfGHLNWd8cfNZ7vUt3WbuT+OOyfoIVCMQ/sh/Z7NrYuxfNVicgwACCNQhwAZAHWhcggACCCCAQKMCXd8d9Ub4U/clB1gnkYfM7KPhT1rPErP/kkhAgiBQhYCaW3b1TSPWVXEqpyCAAAII1CHABkAdaFyCAAIIIIBAFAKVw9quVZVf91+LewgUUyAQXTd+6Ihrilk9VSOAAALJCLABkIwzURBAAAEEENhPoKtLe0Vd/7GA+53FAwgUQ6Bkdnn7Su0pRrVUiQACCKQjwAZAOu5ERQABBBBAYI/AotVjHlLRJ/bcERH+RKCIAiruJwtvGfU94YYAAgggEKsAGwCx8rI4AggggAACBxeolHS2OqmIyMFP5gwE8iZgEjiTS4Wxf8INAQQQiFuADYC4hVkfAQQQQACBgwh03Tnml2b2HZGDnMjTCORRQHX1/FtGPpvH0qgJAQQQ8E2ADQDfOkI+CCCAAAKFFAhadJ6qbC5k8RRdXAGTHa6i84oLQOUIIIBAsgJsACTrTTQEEEAAAQQOKNDV3bZZRBcLNwQKJWBdC7pHri9UyRSLAAIIpCjABkCK+IRGAAEEEEBgLwGZuGXMDeEX5pf2foz3EcirgAXuN27L+mvzWh91IYAAAj4KhK8zfEyLnBBAAAEEECiagEj7Gi2b6OXFq5yKCymglSsX3Pe+XYWsnaIRQACBlATYAEgJnrAIIIAAAgj0E3j7zqLvjn1EVB5/+y5/IJBPAXXPdN4y+sF8FkdVCCCAgL8CbAD42xsyQwABBBAokMDepWqTmx1uApT3foz3EciNgEkQ1jJLGPsn3BBAAIGkBdgASFqceAgggAACCOwv0O+RRbePeVFVbu73IHcQyIuAc7d13DTyubyUQx0IIIBAlgTYAMhSt8gVAQQQQCCnAvuXVRkiHeLkTeGGQK4EdKs02/xclUQxCCCAQIYE2ADIULNIFQEEEEAgpwIHKKuru22ziiw8wFM8hEBmBcxsfsd1ozZktgASRwABBDIuwAZAxhtI+ggggAAC2RcYqII3hoy9RSX4xUDP8zgCWRJQcc+uD+7nn7YINwQQQCA9ATYA0rMnMgIIIIAAAn0CAx7d3VpxrvnbA57AEwhkRkB3Vyr2D93dJ1cykzKJIoAAAjkUYAMgh02lJAQQQACBLAkMnmvH6tFPiQseHvwsnkXAbwFVd+Wi7lEv+J0l2SGAAAL5F2ADIP89pkIEEEAAAZ8FqsnNlf9RnWyp5lTOQcA7gcA9uPCm4Td4lxcJIYAAAgUUYAOggE2nZAQQQAABfwSqyWTxHZNeV7ErqzmXcxDwSSAwfX78sBHfElETbggggAACqQuwAZB6C0gAAQQQQKDAAlWX3rm67TYxe6DqCzgRgZQFTPRXrkVOb1+pPcINAQQQQMALATYAvGgDSSCAAAIIFFOglqrVerZtuUhUfiLcEPBdwPSlIU2lqYz8871R5IcAAkUTYAOgaB2nXgQQQAABfwRqzGTlmvf2aEXOUmc/r/FSTkcgMQEV95OgFPzdvOuHvybcEEAAAQS8EmADwKt2kAwCCCCAQJEE6ql10T1jNm3buetvVOSJeq7nGgTiFFBxt+4eNeJri24cs0m4IYAAAgh4J8AGgHctISEEEEAAgYII1F3mqgcmbX+jdfRZqnZb3YtwIQIRCpjKb53o6QtvHtne1aW9ES7NUggggAACEQq4CNdiKQQQQAABBBCoWqCxE7u7dfeiu8b+g5TsTHG2vrHVuBqBOgXMtojpvJbyqJMW3DzqsTpX4TIEEEAAgYQEXEJxCIMAAggggAACewtE9P7iO8euad4dnKhiXc7Z9oiWZRkEBhVQCV5UKV26c1fvZztuGdU1t1t3CjcEEEAAAe8F2ADwvkUkiAACCCCQR4Eoa1pw37gti747dl55iH3GXLBQVX4d5fqshYCp7FTVHzl1nU2mX1x469gTFt464voVd43fig4CCCCAQHYE2ADITq/IFAEEEEAgPwKxVNLV3bZ5yeq2zkV3jTlOguBkcbY4DPR4eLwZHrwhMLiASSBq68XJv6vK98OPn+tF3T9pSb+0Phj10YW3jPragltGLry6e9QLgy/EswgggAACvgqwAeBrZ8gLAQQQQCDHAvGXtvietmcXrx47f/HqMdPD409Kzv1poHJiqSR/Z85NbfiQcI23D6d2ljidOdjhwuerOlRnuqgPCdeM4Ag3VaZraBf7EbpqFYeJfEWDyuSBDgnc5H5HKby/11FxwefMlY8ZYqM+5ZpHfXz8+lEf6rhlzP/ouHn0lxfeMvrsjpvHXNpxy8ibF9406mfd3VoRbggggAACmRdgAyDzLaQABBBAAIHMCaSQcMcdozZ03Tnmlx23j3lmyR2jnozy6Lx97MOLbxt9/2DHwvD5rB+dd7Q93tE96klfjkXdY57uuG3ccwMfI8Pn9jpuCt/f61h889hfdd487pW53bpxwQ26pX2NllP40CQkAggggECCAmwAJIhNKAQQQAABBPoEOBBAAAEEEEAAgTQE2ABIQ52YCCCAAAJFFqB2BBBAAAEEEEAgFQE2AFJhJygCCCCAQHEFqBwBBBBAAAEEEEhHgA2AdNyJigACCCBQVAHqRgABBBBAAAEEUhJgAyAleMIigAACCBRTgKoRQAABBBBAAIG0BNgASEueuAgggAACRRSgZgQQQAABBBBAIDUBNgBSoycwAggggEDxBKgYAQQQQAABBBBIT4ANgPTsiYwAAgggUDQB6kUAAQQQQAABBFIUYAMgRXxCI4AAAggUS4BqEUAAAQQQQACBNAXYAEhTn9gIIIAAAkUSoFYEEEAAAQQQQCBVATYAUuUnOAIIIIBAcQSoFAEEEEAAAQQQSFeADYB0/YmOAAIIIFAUAepEAAEEEEAAAQRSFmADIOUGEB4BBBBAoBgCVIkAAggggAACCKQtwAZA2h0gPgIIIIBAEQSoEQEEEEAAAQQQSF2ADYDUW0ACCCCAAAL5F6BCBBBAAAEEEEAgfQE2ANLvARkggAACCORdgPoQQAABBBBAAAEPBNgA8KAJpIAAAgggkG8BqkMAAQQQQAABBHwQYAPAhy6QAwIIIIBAngWoDQEEEEAAAQQQ8EKADQAv2kASCCCAAAL5FaAyBBBAAAEEEEDADwE2APzoA1kggAACCORVgLoQQAABBBBAAAFPBNgA8KQRpIEAAgggkE8BqkIAAQQQQAABBHwRYAPAl06QBwIIIIBAHgWoCQEEEEAAAQQQ8EaADQBvWkEiCCCAAAL5E6AiBBBAAAEEEEDAHwE2APzpBZkggAACCORNgHoQQAABBBBAAAGPBNgA8KgZpIIAAgggkC8BqkEAAQQQQAABBHwSYAPAp26QCwIIIIBAngSoBQEEEEAAAQRycNZyAAABlElEQVQQ8EqADQCv2kEyCCCAAAL5EaASBBBAAAEEEEDALwE2APzqB9kggAACCORFgDoQQAABBBBAAAHPBNgA8KwhpIMAAgggkA8BqkAAAQQQQAABBHwTYAPAt46QDwIIIIBAHgSoAQEEEEAAAQQQ8E6ADQDvWkJCCCCAAALZF6ACBBBAAAEEEEDAPwE2APzrCRkhgAACCGRdgPwRQAABBBBAAAEPBdgA8LAppIQAAgggkG0BskcAAQQQQAABBHwUYAPAx66QEwIIIIBAlgXIHQEEEEAAAQQQ8FKADQAv20JSCCCAAALZFSBzBBBAAAEEEEDATwE2APzsC1khgAACCGRVgLwRQAABBBBAAAFPBdgA8LQxpIUAAgggkE0BskYAAQQQQAABBHwVYAPA186QFwIIIIBAFgXIGQEEEEAAAQQQ8FaADQBvW0NiCCCAAALZEyBjBBBAAAEEEEDAXwE2APztDZkhgAACCGRNgHwRQAABBBBAAAGPBdgA8Lg5pIYAAgggkC0BskUAAQQQQAABBHwW+P8BAAD//5MYzXUAAAAGSURBVAMAQI3/ZWpn0yUAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
};

export default FeatureAnimation;
