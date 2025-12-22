import { User } from "@buildora/shared";

export type ProjectMetric = {
  label: string;
  value: string;
  helper: string;
  trend: "up" | "down" | "flat";
};

export type ProjectHighlight = {
  title: string;
  summary: string;
  metric: string;
};

export type ProjectMilestone = {
  title: string;
  date: string;
  summary: string;
  status: "done" | "in-progress" | "next";
};

export type ProjectUpdate = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

export type ProjectTeamMember = {
  name: string;
  role: string;
  focus: string;
  avatarUrl: string;
};

export type ProjectLink = {
  label: string;
  href: string;
  hint: string;
  tone: "primary" | "outline" | "ghost";
};

export type ProjectStackItem = {
  name: string;
  detail: string;
};

export type ProjectSnapshot = {
  label: string;
  value: string;
};

export type ProjectDetail = {
  id: string;
  tagline: string;
  status: string;
  stage: string;
  location: string;
  founded: string;
  website: string;
  repo: string;
  demo: string;
  about: string;
  problem: string;
  solution: string;
  audience: string;
  differentiators: string[];
  metrics: ProjectMetric[];
  highlights: ProjectHighlight[];
  milestones: ProjectMilestone[];
  updates: ProjectUpdate[];
  team: ProjectTeamMember[];
  links: ProjectLink[];
  stack: ProjectStackItem[];
  gallery: string[];
  snapshot: ProjectSnapshot[];
};

export interface ProjectDetailsPageProps {
  user?: User | null;
  onSignOut?: () => void;
}
