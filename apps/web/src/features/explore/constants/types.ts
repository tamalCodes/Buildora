import { User } from "@buildora/shared";

export type Project = {
  id: string;
  title: string;
  summary: string;
  stack: string[];
  upvotes: number;
  coverUrl: string;
};

export type Builder = {
  id: string;
  name: string;
  role: string;
  badge: string;
  avatarUrl: string;
};

export type Team = {
  id: string;
  name: string;
  focus: string;
  members: number;
  location: string;
};

export type Signal = {
  id: string;
  title: string;
  meta: string;
};

export type ExploreSectionId =
  | "explore-hero"
  | "explore-projects"
  | "explore-teams"
  | "explore-stacks"
  | "explore-pulse"
  | "explore-builders"
  | "explore-signals"
  | "explore-showcase";

export type ExploreCtaAction =
  | { type: "scroll"; targetId: ExploreSectionId }
  | { type: "navigate"; to: string }
  | { type: "viewProject"; projectId: Project["id"] }
  | { type: "followBuilder"; builderId: Builder["id"] }
  | { type: "viewSignal"; signalId: Signal["id"] }
  | { type: "showcase"; intent: "create" | "highlights" };

export type ExploreCta = {
  label: string;
  action: ExploreCtaAction;
};

export interface ExplorePageProps {
  user?: User | null;
  onSignOut?: () => void;
}
