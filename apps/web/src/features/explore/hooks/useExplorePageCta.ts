import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type {
  Builder,
  ExploreCtaAction,
  ExploreSectionId,
  ExploreShowcaseIntent,
  Signal,
} from "../constants/types";

type UseExplorePageCtaResult = {
  followedBuilderIds: Set<Builder["id"]>;
  showcaseIntent: ExploreShowcaseIntent;
  handleCta: (action: ExploreCtaAction) => void;
};

export const useExplorePageCta = (): UseExplorePageCtaResult => {
  const navigate = useNavigate();
  const location = useLocation();
  const [followedBuilderIds, setFollowedBuilderIds] = useState<
    Set<Builder["id"]>
  >(new Set());
  const [, setViewedSignalId] = useState<Signal["id"] | null>(null);
  const [showcaseIntent, setShowcaseIntent] =
    useState<ExploreShowcaseIntent>(null);

  const scrollToSection = useCallback((targetId: ExploreSectionId) => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleCta = useCallback(
    (action: ExploreCtaAction) => {
      switch (action.type) {
        case "scroll": {
          const hash = `#${action.targetId}`;
          if (location.hash === hash) {
            scrollToSection(action.targetId);
            return;
          }
          navigate(`/explore${hash}`);
          return;
        }
        case "navigate":
          navigate(action.to);
          return;
        case "viewProject": {
          navigate(`/projects/${action.projectId}`);
          return;
        }
        case "followBuilder":
          setFollowedBuilderIds((prev) => {
            const next = new Set(prev);
            if (next.has(action.builderId)) {
              next.delete(action.builderId);
            } else {
              next.add(action.builderId);
            }
            return next;
          });
          return;
        case "viewSignal": {
          setViewedSignalId(action.signalId);
          const hash = "#explore-signals";
          if (location.hash === hash) {
            scrollToSection("explore-signals");
            return;
          }
          navigate(`/explore${hash}`);
          return;
        }
        case "showcase": {
          setShowcaseIntent(action.intent);
          const targetId =
            action.intent === "highlights"
              ? "explore-projects"
              : "explore-showcase";
          const hash = `#${targetId}`;
          if (location.hash === hash) {
            scrollToSection(targetId);
            return;
          }
          navigate(`/explore${hash}`);
          return;
        }
        default:
          return;
      }
    },
    [location.hash, navigate, scrollToSection]
  );

  useEffect(() => {
    if (!location.hash) {
      return;
    }
    const targetId = location.hash.replace("#", "") as ExploreSectionId;
    scrollToSection(targetId);
  }, [location.hash, scrollToSection]);

  return {
    followedBuilderIds,
    showcaseIntent,
    handleCta,
  };
};
