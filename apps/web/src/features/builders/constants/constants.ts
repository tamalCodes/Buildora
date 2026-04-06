import type {
  BuilderPanel,
  BuilderSortOption,
  FeaturedBuilder,
  LeaderboardBuilder,
} from "./types";

export const FEATURED_BUILDERS: FeaturedBuilder[] = [
  {
    id: "vaibhav-saini",
    name: "Vaibhav Saini",
    subtitle: "Product builder, Bangalore",
    badge: "Featured builder",
    gradient: "linear-gradient(135deg, #f97316, #ef4444)",
    imageUrl: "https://i.pravatar.cc/200?img=11",
    variant: "profile",
  },
  {
    id: "niraj-kamdar",
    name: "Niraj Kamdar",
    subtitle: "Growth engineer, Mumbai",
    badge: "Featured builder",
    gradient: "linear-gradient(135deg, #6366f1, #14b8a6)",
    imageUrl: "https://i.pravatar.cc/200?img=32",
    variant: "profile",
  },
  {
    id: "sarang-parikh",
    name: "Sarang Parikh",
    subtitle: "Creative technologist, Pune",
    badge: "Featured builder",
    gradient: "linear-gradient(135deg, #0f172a, #ec4899)",
    imageUrl: "https://i.pravatar.cc/200?img=15",
    variant: "profile",
  },
  {
    id: "nominate",
    name: "Nominate a Builder",
    subtitle: "Spotlight someone building in the open.",
    badge: "Community picks",
    gradient: "linear-gradient(135deg, #facc15, #fb7185)",
    variant: "cta",
    ctaLabel: "Nominate",
    ctaDescription: "Give a peer a boost with a quick submission.",
  },
];

export const BUILDER_SORTS: BuilderSortOption[] = [
  { id: "hackathons", label: "Most hackathons attended" },
  { id: "projects", label: "Most projects built" },
  { id: "prizes", label: "Most prizes won" },
];

export const BUILDER_EXPLORE_BY = [
  { label: "Featured", targetId: "builders-featured" },
  { label: "Leaderboard", targetId: "builders-leaderboard" },
  { label: "Highlights", targetId: "builders-highlights" },
];

export const LEADERBOARD_BUILDERS: LeaderboardBuilder[] = [
  {
    id: "kush-shah",
    rank: 1,
    name: "Kush Shah",
    handle: "@kush",
    avatarUrl: "https://i.pravatar.cc/120?img=51",
    stats: { hackathons: 153, projects: 33, prizes: 6 },
  },
  {
    id: "jaskirat-singh",
    rank: 2,
    name: "Jaskirat Singh",
    handle: "@jaskirat",
    avatarUrl: "https://i.pravatar.cc/120?img=49",
    stats: { hackathons: 144, projects: 24, prizes: 2 },
  },
  {
    id: "palash-johri",
    rank: 3,
    name: "Palash Johri",
    handle: "@palash",
    avatarUrl: "https://i.pravatar.cc/120?img=33",
    stats: { hackathons: 80, projects: 19, prizes: 2 },
  },
  {
    id: "anuj-goyal",
    rank: 4,
    name: "Anuj Goyal",
    handle: "@anuj",
    avatarUrl: "https://i.pravatar.cc/120?img=28",
    stats: { hackathons: 74, projects: 11, prizes: 0 },
  },
  {
    id: "aman-raj",
    rank: 5,
    name: "Aman Raj",
    handle: "@aman",
    avatarUrl: "https://i.pravatar.cc/120?img=38",
    stats: { hackathons: 72, projects: 12, prizes: 1 },
  },
];

export const BUILDER_PANELS: BuilderPanel[] = [
  {
    id: "hackathons-won",
    title: "Most hackathons won",
    description: "Builders who have stacked up the most wins on Buildora.",
    gradient: "linear-gradient(160deg, #1e1b4b, #0f172a)",
    entries: [
      {
        id: "archisman-das",
        name: "Archisman Das",
        handle: "@archisman",
        avatarUrl: "https://i.pravatar.cc/120?img=12",
        metricLabel: "prizes",
        metricValue: "13",
      },
      {
        id: "kenil-shah",
        name: "Kenil Shah",
        handle: "@kenil",
        avatarUrl: "https://i.pravatar.cc/120?img=24",
        metricLabel: "prizes",
        metricValue: "12",
      },
      {
        id: "karan-pargal",
        name: "Karan Pargal",
        handle: "@karan",
        avatarUrl: "https://i.pravatar.cc/120?img=19",
        metricLabel: "prizes",
        metricValue: "12",
      },
      {
        id: "anudit-nagar",
        name: "Anudit Nagar",
        handle: "@anudit",
        avatarUrl: "https://i.pravatar.cc/120?img=47",
        metricLabel: "prizes",
        metricValue: "9",
      },
      {
        id: "kamal-singh",
        name: "Kamal Singh",
        handle: "@kamal",
        avatarUrl: "https://i.pravatar.cc/120?img=56",
        metricLabel: "prizes",
        metricValue: "9",
      },
    ],
  },
  {
    id: "projects-built",
    title: "Most projects built",
    description:
      "Builders who have shipped and submitted the most projects.",
    gradient: "linear-gradient(160deg, #0f172a, #134e4a)",
    entries: [
      {
        id: "pete-adam",
        name: "Pete Adam",
        handle: "@pete",
        avatarUrl: "https://i.pravatar.cc/120?img=63",
        metricLabel: "projects",
        metricValue: "60",
      },
      {
        id: "tahjay-twilight",
        name: "Tahjay Twilight",
        handle: "@tahjay",
        avatarUrl: "https://i.pravatar.cc/120?img=61",
        metricLabel: "projects",
        metricValue: "60",
      },
      {
        id: "herb-robinson",
        name: "Herb Robinson",
        handle: "@herb",
        avatarUrl: "https://i.pravatar.cc/120?img=68",
        metricLabel: "projects",
        metricValue: "60",
      },
      {
        id: "zac-wait",
        name: "Zac Wait",
        handle: "@zac",
        avatarUrl: "https://i.pravatar.cc/120?img=59",
        metricLabel: "projects",
        metricValue: "60",
      },
      {
        id: "chad-brigham",
        name: "Chad Brigham",
        handle: "@chad",
        avatarUrl: "https://i.pravatar.cc/120?img=53",
        metricLabel: "projects",
        metricValue: "60",
      },
    ],
  },
];
