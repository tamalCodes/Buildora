import type {
  SearchCategory,
  SearchCommand,
  SearchFacet,
  SearchGuidance,
  SearchResult,
  SearchShortcut,
} from "./types";

export const SEARCH_CATEGORIES: SearchCategory[] = [
  {
    id: "hackathons",
    label: "Hackathons",
    description: "Find challenges, tracks, and prizes.",
    iconKey: "trophy",
    accentClass: "bg-indigo-500/20 text-indigo-200",
  },
  {
    id: "projects",
    label: "Projects",
    description: "Explore launches and winning builds.",
    iconKey: "folder",
    accentClass: "bg-amber-500/20 text-amber-200",
  },
  {
    id: "builders",
    label: "Builders",
    description: "Search teammates and creators.",
    iconKey: "users",
    accentClass: "bg-emerald-500/20 text-emerald-200",
  },
];

export const SEARCH_FACETS: SearchFacet[] = [
  {
    id: "hackathon-tracks",
    label: "Tracks",
    description: "Filter by focus area",
    categoryId: "hackathons",
  },
  {
    id: "hackathon-location",
    label: "Location",
    description: "Remote or in-person",
    categoryId: "hackathons",
  },
  {
    id: "hackathon-status",
    label: "Status",
    description: "Open, upcoming, or past",
    categoryId: "hackathons",
  },
  {
    id: "hackathon-sort",
    label: "Sort by",
    description: "Deadline, prize, or relevance",
    categoryId: "hackathons",
  },
  {
    id: "project-stack",
    label: "Technologies",
    description: "Filter by stack",
    categoryId: "projects",
  },
  {
    id: "project-built",
    label: "Built at",
    description: "Hackathon or lab",
    categoryId: "projects",
  },
  {
    id: "project-platform",
    label: "Platform",
    description: "Web, mobile, or protocol",
    categoryId: "projects",
  },
  {
    id: "project-sort",
    label: "Sort by",
    description: "Newest, trending, or liked",
    categoryId: "projects",
  },
  {
    id: "builder-skills",
    label: "Skills",
    description: "Find by skill",
    categoryId: "builders",
  },
  {
    id: "builder-college",
    label: "College",
    description: "Campus communities",
    categoryId: "builders",
  },
  {
    id: "builder-city",
    label: "City",
    description: "Filter by location",
    categoryId: "builders",
  },
  {
    id: "builder-sort",
    label: "Sort by",
    description: "Most followed or recent",
    categoryId: "builders",
  },
];

export const SEARCH_COMMANDS: SearchCommand[] = [
  {
    id: "hackathons-applied",
    label: "My hackathons",
    description: "Jump to your applied events",
    categoryId: "hackathons",
    urlLabel: "/hackathons/applied",
  },
  {
    id: "hackathons-deadlines",
    label: "Upcoming deadlines",
    description: "View hackathons ending soon",
    categoryId: "hackathons",
    urlLabel: "/hackathons/ending",
  },
  {
    id: "projects-saved",
    label: "Saved projects",
    description: "Review bookmarked launches",
    categoryId: "projects",
    urlLabel: "/projects/saved",
  },
  {
    id: "projects-trending",
    label: "Trending builds",
    description: "Explore what is hot right now",
    categoryId: "projects",
    urlLabel: "/projects/trending",
  },
  {
    id: "builders-followed",
    label: "Followed builders",
    description: "See who you follow",
    categoryId: "builders",
    urlLabel: "/builders/following",
  },
  {
    id: "builders-team",
    label: "Find a teammate",
    description: "Match with active builders",
    categoryId: "builders",
    urlLabel: "/builders/match",
  },
];

export const SEARCH_RESULTS: SearchResult[] = [
  {
    id: "result-hackathons-1",
    title: "My hackathons",
    subtitle: "Applied events and updates",
    categoryId: "hackathons",
    urlLabel: "buildora.app/hackathons/applied",
    badge: "Shortcut",
  },
  {
    id: "result-hackathons-2",
    title: "Hacktober Hypes",
    subtitle: "Build with open source teams",
    categoryId: "hackathons",
    urlLabel: "buildora.app/hackathons/hacktober",
  },
  {
    id: "result-hackathons-3",
    title: "DevQuest 25",
    subtitle: "Chain, infra, and tooling prizes",
    categoryId: "hackathons",
    urlLabel: "buildora.app/hackathons/devquest",
  },
  {
    id: "result-projects-1",
    title: "Signal Forge",
    subtitle: "AI-powered market scanner",
    categoryId: "projects",
    urlLabel: "buildora.app/projects/signal-forge",
    badge: "Top 10",
  },
  {
    id: "result-projects-2",
    title: "Orbit Pay",
    subtitle: "Cross-chain payroll platform",
    categoryId: "projects",
    urlLabel: "buildora.app/projects/orbit-pay",
  },
  {
    id: "result-builders-1",
    title: "Adrian Collin",
    subtitle: "Full-stack builder, SF",
    categoryId: "builders",
    urlLabel: "buildora.app/builders/adrian-collin",
  },
  {
    id: "result-builders-2",
    title: "Priya Nair",
    subtitle: "Product designer, Mumbai",
    categoryId: "builders",
    urlLabel: "buildora.app/builders/priya-nair",
  },
];

export const SEARCH_SHORTCUTS: SearchShortcut[] = [
  {
    id: "shortcut-open",
    label: "Open search",
    keys: ["Ctrl", "K"],
  },
  {
    id: "shortcut-nav",
    label: "Navigate results",
    keys: ["Up", "Down"],
  },
  {
    id: "shortcut-select",
    label: "Select result",
    keys: ["Enter"],
  },
];

export const SEARCH_GUIDANCE: SearchGuidance[] = [
  {
    categoryId: "hackathons",
    title: "Search hackathons",
    description: "Type a challenge name, organizer, or track.",
  },
  {
    categoryId: "projects",
    title: "Search projects",
    description: "Find launches by stack, team, or prize.",
  },
  {
    categoryId: "builders",
    title: "Search builders",
    description: "Filter by skill, city, or university.",
  },
];
