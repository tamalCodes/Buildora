import type { User } from "@buildora/shared";
import type {
  ProjectDetail,
  ProjectHighlight,
  ProjectLink,
  ProjectMetric,
  ProjectMilestone,
  ProjectStackItem,
  ProjectTeamMember,
  ProjectUpdate,
} from "./types";
import type { Project } from "../../explore/constants/types";

export interface ProjectDetailsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

export interface ProjectHeroProps {
  project: Project;
  details: ProjectDetail;
}

export interface ProjectOverviewProps {
  details: ProjectDetail;
}

export interface ProjectProfileProps {
  details: ProjectDetail;
}

export interface ProjectLinksProps {
  links: ProjectLink[];
}

export interface ProjectUpdatesProps {
  updates: ProjectUpdate[];
}

export interface ProjectMilestonesProps {
  milestones: ProjectMilestone[];
}

export interface ProjectMetricsProps {
  metrics: ProjectMetric[];
  highlights: ProjectHighlight[];
}

export interface ProjectStackProps {
  stack: ProjectStackItem[];
}

export interface ProjectTeamProps {
  team: ProjectTeamMember[];
}

export interface ProjectGalleryProps {
  gallery: string[];
}
