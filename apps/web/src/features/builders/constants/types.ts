import { User } from "@buildora/shared";

export type FeaturedBuilder = {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  gradient: string;
  imageUrl?: string;
  variant?: "profile" | "cta";
  ctaLabel?: string;
  ctaDescription?: string;
};

export type BuilderStatKey = "hackathons" | "projects" | "prizes";

export type LeaderboardBuilder = {
  id: string;
  rank: number;
  name: string;
  handle: string;
  avatarUrl: string;
  stats: Record<BuilderStatKey, number>;
};

export type BuilderHighlight = {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  metricLabel: string;
  metricValue: string;
};

export type BuilderPanel = {
  id: string;
  title: string;
  description: string;
  gradient: string;
  entries: BuilderHighlight[];
};

export type BuilderSortOption = {
  id: BuilderStatKey;
  label: string;
};

export interface BuildersPageProps {
  user?: User | null;
  onSignOut?: () => void;
}
