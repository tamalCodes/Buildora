import type {
  Builder,
  ExploreCta,
  Project,
  Signal,
  Team,
} from "./types";

export const FEATURED_PROJECTS: Project[] = [
  {
    id: "p1",
    title: "Lume Atlas",
    summary: "Visual ops layer for shipping open data pipelines in days.",
    teamName: "CoinSlayers",
    stack: ["Next.js", "Vector", "Postgres"],
    likes: 824,
    awards: 3,
    highlightLabel: "Featured pick",
    coverUrl:
      "https://images.unsplash.com/photo-1523966211575-eb4a01e7dd51?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "p2",
    title: "Signal Forge",
    summary: "Realtime insights for distributed engineering teams.",
    teamName: "Neon Protocol",
    stack: ["Rust", "Kafka", "WebGL"],
    likes: 563,
    awards: 6,
    coverUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "p3",
    title: "Mintstream",
    summary: "Creator economy rails for communities and on-chain clubs.",
    teamName: "BlockTrain Labs",
    stack: ["Solidity", "ZK", "React"],
    likes: 417,
    awards: 2,
    coverUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "p4",
    title: "Northstar OS",
    summary: "Workflow command center for shipping AI operations without tool sprawl.",
    teamName: "Aperture Stack",
    stack: ["TypeScript", "Workers", "AI SDK"],
    likes: 298,
    awards: 4,
    coverUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: "p5",
    title: "Cinder Note",
    summary: "A research-to-shipping notebook for founders turning raw findings into product moves.",
    teamName: "Paper Trail",
    stack: ["React", "RAG", "Supabase"],
    likes: 351,
    awards: 5,
    coverUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop",
  },
];

export const TOP_BUILDERS: Builder[] = [
  {
    id: "b1",
    name: "Anya Dsouza",
    role: "Product Engineer",
    badge: "Top 1% Builder",
    avatarUrl: "https://i.pravatar.cc/150?u=anya",
  },
  {
    id: "b2",
    name: "Rahil K",
    role: "Protocol Designer",
    badge: "Hackathon Winner",
    avatarUrl: "https://i.pravatar.cc/150?u=rahil",
  },
  {
    id: "b3",
    name: "Meera Das",
    role: "AI Engineer",
    badge: "Community Lead",
    avatarUrl: "https://i.pravatar.cc/150?u=meera",
  },
];

export const TEAM_SPOTLIGHTS: Team[] = [
  {
    id: "t1",
    name: "Helios Labs",
    focus: "Spatial analytics for climate response.",
    members: 7,
    location: "Nairobi + Remote",
  },
  {
    id: "t2",
    name: "Kintsugi Systems",
    focus: "On-chain treasury tools for DAOs.",
    members: 4,
    location: "Berlin",
  },
  {
    id: "t3",
    name: "Threadline",
    focus: "Story-driven onboarding for AI apps.",
    members: 6,
    location: "Austin + Remote",
  },
];

export const TRENDING_STACKS = [
  "Agents",
  "Rust",
  "Solidity",
  "RAG",
  "Design Systems",
  "ZK",
  "Edge",
];

export const SIGNALS: Signal[] = [
  {
    id: "s1",
    title: "Signal Forge hit 10k teams",
    meta: "Milestone - 3 hours ago",
  },
  {
    id: "s2",
    title: "Lume Atlas opens beta waitlist",
    meta: "Launch - Today",
  },
  {
    id: "s3",
    title: "Mintstream announces creator grants",
    meta: "Announcement - Today",
  },
];

export const EXPLORE_BY: ExploreCta[] = [
  {
    label: "Projects",
    action: { type: "scroll", targetId: "explore-projects" },
  },
  {
    label: "Builders",
    action: { type: "scroll", targetId: "explore-builders" },
  },
  {
    label: "Teams",
    action: { type: "scroll", targetId: "explore-teams" },
  },
  {
    label: "Stacks",
    action: { type: "scroll", targetId: "explore-stacks" },
  },
];
