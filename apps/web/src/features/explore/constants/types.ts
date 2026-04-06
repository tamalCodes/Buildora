export type Project = {
  id: string;
  title: string;
  summary: string;
  teamName: string;
  stack: string[];
  likes: number;
  awards: number;
  coverUrl: string;
  highlightLabel?: string;
};

export type Builder = {
  id: string;
  name: string;
  role: string;
  badge: string;
  avatarUrl: string;
};

export type BuilderMetric = {
  label: string;
  value: string;
};

export type FeaturedBuilder = Builder & {
  headline: string;
  summary: string;
  currentProject: string;
  imageUrl: string;
  metrics: BuilderMetric[];
};

export type BuilderSpotlight = FeaturedBuilder & {
  title: string;
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

export type ExploreShowcaseIntent =
  | Extract<ExploreCtaAction, { type: "showcase" }>["intent"]
  | null;

export type PulseStat = {
  label: string;
  value: string;
};
