export type ApplicationTab = {
  id: string;
  label: string;
  route: "overview" | "prizes" | "schedule" | "projects" | "application";
};

export type ApplicationSectionStatus = "completed" | "in-progress" | "pending";

export type ApplicationSection = {
  id: string;
  title: string;
  description: string;
  status: ApplicationSectionStatus;
};

export type ApplicationSidebarMetric = {
  label: string;
  value: string;
};

export type ApplicationProgress = {
  percent: number;
  label: string;
  deadline: string;
  countdown: string;
  countdownMinutes?: number;
  happening: string;
};

export type ApplicationRoleOption = {
  id: string;
  label: string;
  description: string;
  selected?: boolean;
};

export type ApplicationSkillTag = {
  id: string;
  label: string;
  selected?: boolean;
};

export type ApplicationLinkItem = {
  id: string;
  label: string;
  value: string;
  placeholder: string;
};

export type ApplicationContactField = {
  id: string;
  label: string;
  type: "text" | "email" | "tel";
  placeholder: string;
  value: string;
};
