import type { User } from "@buildora/shared";

export interface BuildersPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface BuilderDetailsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface BuilderProfileAboutProps {
  profile: import("./types").BuilderProfile;
}

export interface BuilderProfileHeroProps {
  profile: import("./types").BuilderProfile;
}

export interface BuilderProfileProjectsProps {
  profile: import("./types").BuilderProfile;
}

export interface BuilderProfileStatsProps {
  profile: import("./types").BuilderProfile;
}

export interface BuilderHighlightsProps {
  panel: import("./types").BuilderPanel;
}

export interface BuildersLeaderboardProps {
  activeSort: import("./types").BuilderStatKey;
}

export interface BuildersSortBarProps {
  activeSort: import("./types").BuilderStatKey;
  onChange: (value: import("./types").BuilderStatKey) => void;
}

export interface FeaturedBuildersProps {
  builders: import("./types").FeaturedBuilder[];
}

export interface FeaturedBuilderCardProps {
  builder: import("./types").FeaturedBuilder;
}

export interface HighlightPanelProps {
  panel: import("./types").BuilderPanel;
}

export interface LeaderboardRowProps {
  builder: import("./types").LeaderboardBuilder;
  rank: number;
  activeSort: import("./types").BuilderStatKey;
}
