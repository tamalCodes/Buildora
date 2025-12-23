import type {
  ApplicationContactField,
  ApplicationLinkItem,
  ApplicationProgress,
  ApplicationRoleOption,
  ApplicationSection,
  ApplicationSidebarMetric,
  ApplicationSkillTag,
  ApplicationTab,
} from "./types";
import type { Hackathon, HackathonDetail } from "../../constants/types";

export const APPLICATION_TABS: ApplicationTab[] = [
  { id: "overview", label: "Overview", route: "overview" },
  { id: "prizes", label: "Prizes", route: "prizes" },
  { id: "schedule", label: "Schedule", route: "schedule" },
  { id: "projects", label: "Projects", route: "projects" },
  { id: "application", label: "Application", route: "application" },
];

export const APPLICATION_SECTIONS: ApplicationSection[] = [
  {
    id: "about",
    title: "About you",
    description: "Your personal details",
    status: "completed",
  },
  {
    id: "experience",
    title: "Experience",
    description: "Your skills and preferences",
    status: "in-progress",
  },
  {
    id: "links",
    title: "Links",
    description: "Portfolio and social profiles",
    status: "completed",
  },
  {
    id: "contact",
    title: "Contact",
    description: "Where we can reach you",
    status: "pending",
  },
];

export const APPLICATION_PROGRESS: ApplicationProgress = {
  percent: 90,
  label: "Application filled",
  deadline: "Sep 7 - Dec 24, 2026",
  countdown: "0d:7h:15m",
  countdownMinutes: 435,
  happening: "Online",
};

export const buildApplicationMetrics = (
  hackathon: Hackathon,
  detail: HackathonDetail,
  isOnline: boolean
): ApplicationSidebarMetric[] => [
  { label: "Runs from", value: hackathon.dates },
  { label: "Happening", value: isOnline ? "Online" : detail.mode },
  { label: "Team size", value: detail.teamSize },
  { label: "Submission", value: "Public repo + demo" },
];

export const APPLICATION_ROLES: ApplicationRoleOption[] = [
  {
    id: "designer",
    label: "Designer",
    description: "UX, product, and visual design",
    selected: true,
  },
  {
    id: "frontend",
    label: "Frontend Developer",
    description: "Web and UI engineering",
    selected: true,
  },
  {
    id: "backend",
    label: "Backend Developer",
    description: "APIs, infra, and systems",
  },
  {
    id: "mobile",
    label: "Mobile Developer",
    description: "iOS, Android, cross-platform",
  },
  {
    id: "blockchain",
    label: "Blockchain Developer",
    description: "Smart contracts and protocols",
  },
  {
    id: "other",
    label: "Other",
    description: "PM, research, or ops",
  },
];

export const APPLICATION_SKILLS: ApplicationSkillTag[] = [
  { id: "python", label: "Python", selected: true },
  { id: "go", label: "Go", selected: true },
  { id: "javascript", label: "JavaScript", selected: true },
  { id: "nodejs", label: "Node.js", selected: true },
  { id: "typescript", label: "TypeScript", selected: true },
];

export const APPLICATION_LINKS: ApplicationLinkItem[] = [
  {
    id: "github",
    label: "GitHub",
    value: "https://github.com/tamalcodes",
    placeholder: "GitHub profile",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "https://www.linkedin.com/in/tamalcodes",
    placeholder: "LinkedIn profile",
  },
  {
    id: "x",
    label: "X",
    value: "https://x.com/tamalCodes",
    placeholder: "X profile",
  },
];

export const APPLICATION_CONTACT_FIELDS: ApplicationContactField[] = [
  {
    id: "email",
    label: "Email address",
    type: "email",
    placeholder: "you@buildora.dev",
    value: "tamalcodes@gmail.com",
  },
  {
    id: "phone",
    label: "Phone number",
    type: "tel",
    placeholder: "+1 (555) 324-5567",
    value: "+91 90000 11223",
  },
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "E.g. Bengaluru",
    value: "Bengaluru",
  },
];
