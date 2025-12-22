import type { BuilderProfile } from "./types";

export const BUILDER_PROFILES: BuilderProfile[] = [
  {
    id: "vaibhav-saini",
    name: "Vaibhav Saini",
    handle: "@vasa",
    avatarUrl: "https://i.pravatar.cc/240?img=11",
    role: "Product builder",
    location: "New Delhi, India",
    tags: ["Solidity", "React", "Node.js", "MongoDB", "Go"],
    bio: [
      "Building Gem, a trading utility that helps NFT collectors save gas across every marketplace.",
      "Focused on shipping community-led infrastructure and explaining complex systems in simple language.",
      "Previously collaborated with multiple hackathon teams across the Buildora network.",
    ],
    highlights: [
      "Winner at ETHIndia 2019 and ETHGlobal Online.",
      "Writes deep dives on Ethereum tooling and IPFS.",
      "Mentors first-time builders during Buildora sprints.",
    ],
    stats: [
      { label: "Hackathons", value: "22" },
      { label: "Projects", value: "14" },
      { label: "Prizes", value: "6" },
      { label: "Followers", value: "2.3k" },
    ],
    projects: [
      {
        id: "gem-platform",
        title: "Gem",
        summary:
          "Aggregates NFT marketplace listings and optimizes gas usage for collectors.",
        tags: ["Web3", "Marketplaces", "Infra"],
        likes: 128,
        coverUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "mesh-relay",
        title: "Mesh Relay",
        summary:
          "A lightweight relay network to push wallet events to builders in realtime.",
        tags: ["Realtime", "APIs", "Node.js"],
        likes: 92,
        coverUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    id: "kush-shah",
    name: "Kush Shah",
    handle: "@kush",
    avatarUrl: "https://i.pravatar.cc/240?img=51",
    role: "Growth engineer",
    location: "Bangalore, India",
    tags: ["AI", "TypeScript", "Design Systems", "Product"],
    bio: [
      "Leads growth experiments and builder onboarding at Buildora.",
      "Ships product analytics dashboards and outreach automation.",
      "Passionate about pairing engineering with community signals.",
    ],
    highlights: [
      "Organized 8 Buildora demo days.",
      "Top builder for hackathon participation in 2024.",
      "Maintains the Buildora insights API.",
    ],
    stats: [
      { label: "Hackathons", value: "153" },
      { label: "Projects", value: "33" },
      { label: "Prizes", value: "6" },
      { label: "Followers", value: "4.8k" },
    ],
    projects: [
      {
        id: "signalboard",
        title: "Signalboard",
        summary:
          "Tracks builder momentum and community engagement across the network.",
        tags: ["Analytics", "React", "APIs"],
        likes: 214,
        coverUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "driftlabs",
        title: "Drift Labs",
        summary:
          "Experiment runner for rapid community growth and onboarding flows.",
        tags: ["Growth", "Automation", "Experiments"],
        likes: 164,
        coverUrl: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    id: "niraj-kamdar",
    name: "Niraj Kamdar",
    handle: "@niraj",
    avatarUrl: "https://i.pravatar.cc/240?img=32",
    role: "Growth engineer",
    location: "Mumbai, India",
    tags: ["Product", "Growth", "React", "Analytics"],
    bio: [
      "Focuses on onboarding flows and builder retention playbooks.",
      "Pairs community insights with product experiments to drive adoption.",
    ],
    highlights: [
      "Built the Buildora growth dashboard.",
      "Led 12 community launches in 2024.",
    ],
    stats: [
      { label: "Hackathons", value: "88" },
      { label: "Projects", value: "21" },
      { label: "Prizes", value: "3" },
      { label: "Followers", value: "1.7k" },
    ],
    projects: [
      {
        id: "pulse-map",
        title: "Pulse Map",
        summary:
          "Visualizes real-time builder activity for community managers.",
        tags: ["Analytics", "Maps", "React"],
        likes: 86,
        coverUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "launchpad",
        title: "Launchpad",
        summary: "Automates onboarding sequences for new builder cohorts.",
        tags: ["Automation", "Email", "Product"],
        likes: 73,
        coverUrl: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    id: "sarang-parikh",
    name: "Sarang Parikh",
    handle: "@sarang",
    avatarUrl: "https://i.pravatar.cc/240?img=15",
    role: "Creative technologist",
    location: "Pune, India",
    tags: ["Design", "Creative Tech", "AI", "React"],
    bio: [
      "Builds interactive demos and real-time visuals for hackathon teams.",
      "Passionate about blending art direction with rapid prototyping.",
    ],
    highlights: [
      "Designed Buildora's 2025 showcase identity.",
      "Mentored 6 winning teams this year.",
    ],
    stats: [
      { label: "Hackathons", value: "62" },
      { label: "Projects", value: "18" },
      { label: "Prizes", value: "4" },
      { label: "Followers", value: "1.9k" },
    ],
    projects: [
      {
        id: "signal-canvas",
        title: "Signal Canvas",
        summary:
          "Live collaboration space for teams to co-create demo visuals.",
        tags: ["Realtime", "Design", "WebGL"],
        likes: 102,
        coverUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
      },
      {
        id: "storyline",
        title: "Storyline",
        summary: "Turns builder updates into shareable community stories.",
        tags: ["Content", "Automation", "Brand"],
        likes: 77,
        coverUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    id: "jaskirat-singh",
    name: "Jaskirat Singh",
    handle: "@jaskirat",
    avatarUrl: "https://i.pravatar.cc/240?img=49",
    role: "Full-stack builder",
    location: "Chandigarh, India",
    tags: ["Node.js", "React", "Infra", "APIs"],
    bio: [
      "Ships hackathon MVPs with a focus on scalable APIs.",
      "Optimizes developer experience for community tools.",
    ],
    highlights: [
      "Built the team matching API for Buildora.",
      "Led three winning hackathon teams.",
    ],
    stats: [
      { label: "Hackathons", value: "144" },
      { label: "Projects", value: "24" },
      { label: "Prizes", value: "2" },
      { label: "Followers", value: "3.2k" },
    ],
    projects: [
      {
        id: "teamflow",
        title: "Teamflow",
        summary:
          "Matches builders based on skill gaps and location preferences.",
        tags: ["Matching", "APIs", "Node.js"],
        likes: 156,
        coverUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    id: "palash-johri",
    name: "Palash Johri",
    handle: "@palash",
    avatarUrl: "https://i.pravatar.cc/240?img=33",
    role: "Product engineer",
    location: "Jaipur, India",
    tags: ["React", "UX", "Product", "Growth"],
    bio: [
      "Works on builder tooling and community dashboards.",
      "Turns feedback into weekly product releases.",
    ],
    highlights: [
      "Shipped Buildora weekly insights digest.",
      "Collaborated with 20+ early-stage teams.",
    ],
    stats: [
      { label: "Hackathons", value: "80" },
      { label: "Projects", value: "19" },
      { label: "Prizes", value: "2" },
      { label: "Followers", value: "1.4k" },
    ],
    projects: [
      {
        id: "sparkline",
        title: "Sparkline",
        summary: "Weekly digest for builder performance and signals.",
        tags: ["Email", "Product", "Analytics"],
        likes: 64,
        coverUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    id: "anuj-goyal",
    name: "Anuj Goyal",
    handle: "@anuj",
    avatarUrl: "https://i.pravatar.cc/240?img=28",
    role: "Backend builder",
    location: "Hyderabad, India",
    tags: ["APIs", "Databases", "Node.js", "Infra"],
    bio: [
      "Builds reliable data pipelines for hackathon submissions.",
      "Focused on platform stability and developer tooling.",
    ],
    highlights: [
      "Owned the Buildora submissions pipeline.",
      "Helped 10 teams ship their first API.",
    ],
    stats: [
      { label: "Hackathons", value: "74" },
      { label: "Projects", value: "11" },
      { label: "Prizes", value: "0" },
      { label: "Followers", value: "980" },
    ],
    projects: [
      {
        id: "vaultstream",
        title: "Vaultstream",
        summary:
          "Submission storage layer for hackathon judging workflows.",
        tags: ["Infra", "APIs", "Databases"],
        likes: 58,
        coverUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
  {
    id: "aman-raj",
    name: "Aman Raj",
    handle: "@aman",
    avatarUrl: "https://i.pravatar.cc/240?img=38",
    role: "Community engineer",
    location: "Lucknow, India",
    tags: ["Community", "React", "Automation", "Growth"],
    bio: [
      "Coordinates builders and onboarding for new cohorts.",
      "Keeps Buildora workshops running smoothly with tooling.",
    ],
    highlights: [
      "Facilitated 30+ builder workshops.",
      "Built onboarding automation for new teams.",
    ],
    stats: [
      { label: "Hackathons", value: "72" },
      { label: "Projects", value: "12" },
      { label: "Prizes", value: "1" },
      { label: "Followers", value: "1.1k" },
    ],
    projects: [
      {
        id: "campfire",
        title: "Campfire",
        summary:
          "Community hub for managing cohort content and updates.",
        tags: ["Community", "Automation", "Product"],
        likes: 69,
        coverUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
      },
    ],
    links: [
      { label: "GitHub", href: "#" },
      { label: "LinkedIn", href: "#" },
      { label: "X", href: "#" },
    ],
  },
];
