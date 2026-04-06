import type { User } from "@buildora/shared";
import type {
  Builder,
  ExploreCtaAction,
  ExploreShowcaseIntent,
  Project,
} from "./types";

export interface ExplorePageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface ExploreHeroSectionProps {
  onCta: (action: ExploreCtaAction) => void;
}

export interface ExploreShowcaseSectionProps {
  showcaseIntent: ExploreShowcaseIntent;
  onCta: (action: ExploreCtaAction) => void;
}

export interface FeaturedBuildersSectionProps {
  followedBuilderIds: Set<Builder["id"]>;
  onCta: (action: ExploreCtaAction) => void;
}

export interface FeaturedProjectsSectionProps {
  projects: Project[];
  onCta: (action: ExploreCtaAction) => void;
}

export interface LikesBadgeProps {
  likes: number;
}

export interface FeaturedProjectHeroCardProps {
  project: Project;
  onOpen: () => void;
}

export interface FeaturedProjectCompactCardProps {
  project: Project;
  onOpen: () => void;
  className?: string;
}
