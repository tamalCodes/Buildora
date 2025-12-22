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

export type BuilderProfileStat = {
  label: string;
  value: string;
};

export type BuilderProfileProject = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  likes: number;
  coverUrl: string;
};

export type BuilderProfileLink = {
  label: string;
  href: string;
};

export type BuilderProfile = {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  role: string;
  location: string;
  tags: string[];
  bio: string[];
  highlights: string[];
  stats: BuilderProfileStat[];
  projects: BuilderProfileProject[];
  links: BuilderProfileLink[];
};

export interface BuildersPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface BuilderDetailsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}
