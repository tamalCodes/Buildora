import type {
  Hackathon,
  HackathonDetail,
  HackathonsHeroStat,
  HackathonsOpenFilter,
} from "./types";

export const FEATURED_HACKATHONS: Hackathon[] = [
  {
    id: "fh-1",
    title: "Atlas Ascend 2026",
    organizer: "Buildora x Atlas Labs",
    location: "Global",
    dates: "Sep 12 - Oct 21, 2026",
    status: "Open",
    tags: ["AI", "Infra", "Open Source"],
    prize: "$350k prizes",
    participants: "7.5k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2400&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=atlas",
    sponsor: "Sponsored by Neon",
  },
  {
    id: "fh-2",
    title: "Orbital Frontier Sprint",
    organizer: "Orbital Network",
    location: "Singapore + Remote",
    dates: "Oct 04 - Nov 09, 2026",
    status: "Open",
    tags: ["ZK", "DeFi", "Security"],
    prize: "$220k prizes",
    participants: "4.2k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2400&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=orbital",
    sponsor: "Sponsored by Sable",
  },
];

export const OPEN_HACKATHONS: Hackathon[] = [
  {
    id: "oh-1",
    title: "GenAI Forge Week",
    organizer: "Buildora Labs",
    location: "Online",
    dates: "Aug 18 - Sep 08, 2026",
    status: "Open",
    tags: ["GenAI", "Agents", "Product"],
    prize: "$95k prizes",
    participants: "2.1k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=forge",
  },
  {
    id: "oh-2",
    title: "CloudCraft Horizons",
    organizer: "Nimbus Cloud",
    location: "Bengaluru, India",
    dates: "Aug 22 - Sep 12, 2026",
    status: "Open",
    tags: ["Cloud", "DevOps", "SRE"],
    prize: "$80k prizes",
    participants: "1.7k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=cloud",
  },
  {
    id: "oh-3",
    title: "Rustline Circuit",
    organizer: "Ferris Collective",
    location: "Berlin, DE",
    dates: "Aug 30 - Sep 17, 2026",
    status: "Open",
    tags: ["Rust", "Systems", "Tooling"],
    prize: "$60k prizes",
    participants: "980 builders",
    coverUrl:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=rust",
  },
  {
    id: "oh-4",
    title: "Civic Stackathon",
    organizer: "OpenGov",
    location: "New Delhi, IN",
    dates: "Sep 05 - Sep 19, 2026",
    status: "Open",
    tags: ["Civic", "Data", "Impact"],
    prize: "$50k prizes",
    participants: "1.2k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=civic",
  },
  {
    id: "oh-5",
    title: "Chaincraft 3.0",
    organizer: "Northbridge",
    location: "Remote + Dubai",
    dates: "Sep 10 - Oct 01, 2026",
    status: "Open",
    tags: ["Web3", "Gaming", "NFT"],
    prize: "$140k prizes",
    participants: "3.4k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=chain",
  },
  {
    id: "oh-6",
    title: "Vision Lab: Spatial",
    organizer: "Parallax Studio",
    location: "Seoul, KR",
    dates: "Sep 14 - Oct 02, 2026",
    status: "Open",
    tags: ["XR", "Media", "Design"],
    prize: "$70k prizes",
    participants: "860 builders",
    coverUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=vision",
  },
];

export const UPCOMING_HACKATHONS: Hackathon[] = [
  {
    id: "uh-1",
    title: "ETHMumbai 2027",
    organizer: "ETH Global Guild",
    location: "Mumbai, IN",
    dates: "Nov 08 - Nov 11, 2026",
    status: "Upcoming",
    tags: ["Ethereum", "DeFi", "Infra"],
    prize: "$180k prizes",
    participants: "3.8k expected",
    coverUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=eth",
  },
  {
    id: "uh-2",
    title: "Binary 4.0",
    organizer: "Binary Labs",
    location: "San Francisco, US",
    dates: "Nov 16 - Nov 30, 2026",
    status: "Upcoming",
    tags: ["AI", "Search", "Infra"],
    prize: "$120k prizes",
    participants: "2.6k expected",
    coverUrl:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=binary",
  },
  {
    id: "uh-3",
    title: "Cartographers 2.0",
    organizer: "Mapstack",
    location: "Amsterdam, NL",
    dates: "Dec 02 - Dec 18, 2026",
    status: "Upcoming",
    tags: ["Maps", "Web", "Open Data"],
    prize: "$55k prizes",
    participants: "900 expected",
    coverUrl:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=map",
  },
  {
    id: "uh-4",
    title: "HealthOps Buildout",
    organizer: "CareOS",
    location: "Austin, US",
    dates: "Dec 05 - Dec 20, 2026",
    status: "Upcoming",
    tags: ["Health", "Data", "Automation"],
    prize: "$65k prizes",
    participants: "1.1k expected",
    coverUrl:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=health",
  },
];

export const PAST_HACKATHONS: Hackathon[] = [
  {
    id: "ph-1",
    title: "Dawn Protocol S1",
    organizer: "Dawn Labs",
    location: "Remote",
    dates: "Jun 01 - Jun 24, 2026",
    status: "Past",
    tags: ["DeFi", "Security", "Research"],
    prize: "$90k prizes",
    participants: "1.4k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=dawn",
  },
  {
    id: "ph-2",
    title: "Buildora Summit Jam",
    organizer: "Buildora",
    location: "Lisbon, PT",
    dates: "May 12 - May 15, 2026",
    status: "Past",
    tags: ["Community", "Product", "Design"],
    prize: "$40k prizes",
    participants: "720 builders",
    coverUrl:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=buildora",
  },
  {
    id: "ph-3",
    title: "Aurora AI Sprint",
    organizer: "Aurora Group",
    location: "Toronto, CA",
    dates: "Apr 05 - Apr 19, 2026",
    status: "Past",
    tags: ["AI", "Ops", "B2B"],
    prize: "$70k prizes",
    participants: "1.9k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=aurora",
  },
  {
    id: "ph-4",
    title: "GreenTech Relay",
    organizer: "Sustain Labs",
    location: "Copenhagen, DK",
    dates: "Mar 01 - Mar 18, 2026",
    status: "Past",
    tags: ["Climate", "IoT", "Energy"],
    prize: "$55k prizes",
    participants: "1.1k builders",
    coverUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1800&auto=format&fit=crop",
    logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=green",
  },
];

export const FILTERS = [
  "All",
  "Open",
  "Online",
  "Onsite",
  "Teams",
  "Solo",
  "Student",
];

export const HACKATHON_HERO_STATS: HackathonsHeroStat[] = [
  { label: "Hackathons live", value: "48" },
  { label: "Prize pool", value: "$3.6M" },
  { label: "Builders active", value: "18k" },
];

export const HACKATHON_OPEN_FILTERS: HackathonsOpenFilter[] = [
  { id: "open-now", label: "Open now" },
  { id: "ending-soon", label: "Ending soon" },
  { id: "highest-prize", label: "Highest prize" },
];

const BASE_HACKATHON_DETAIL: Omit<HackathonDetail, "id" | "bannerUrl"> = {
  heroSubtitle: "A flagship build sprint for high-signal student teams.",
  applicationDeadline: "Jan 30, 2026",
  statusLabel: "Applications open",
  mode: "Hybrid",
  teamSize: "2-4 builders",
  eligibility: "Students and early-stage builders worldwide.",
  about: [
    "Buildora Hack Week is a 48 hour sprint focused on shipping real product moments.",
    "Teams work with mentors, live demos, and review panels to test ideas fast.",
    "Finalists present to sponsor partners for prizes, pilots, and hiring calls.",
  ],
  tracks: [
    "AI copilots and workflows",
    "Fintech and commerce",
    "Climate and civic impact",
    "Creator tools and media",
    "Developer productivity",
    "Future of education",
    "Health and wellbeing",
    "Open data and infrastructure",
  ],
  perks: [
    "Mentor office hours and live reviews",
    "Perk packs for cloud, AI, and design tools",
    "Demo day production and streaming support",
    "Curated recruiting intros",
    "Founder AMAs and investor panels",
  ],
  rules: [
    "Original work built during the hackathon window.",
    "Teams must submit a public demo and short pitch.",
    "Open source encouraged but not required.",
    "All participants agree to the Buildora code of conduct.",
  ],
  prizePool: "$120k total prizes",
  prizes: [
    {
      title: "Grand prize",
      amount: "$30,000",
      description: "Best overall product with standout execution.",
    },
    {
      title: "Product craft",
      amount: "$18,000",
      description: "Best UX, narrative, and polish.",
    },
    {
      title: "Technical depth",
      amount: "$18,000",
      description: "Hardest technical achievement or research.",
    },
    {
      title: "Impact award",
      amount: "$12,000",
      description: "Biggest measurable social benefit.",
    },
  ],
  schedule: [
    {
      time: "Day 1, 6:00 PM",
      title: "Kickoff and team formation",
      description: "Opening ceremony, mentor intros, and idea matchmaking.",
    },
    {
      time: "Day 1, 9:00 PM",
      title: "Build sprint begins",
      description: "Repo creation, mentor office hours, and rapid prototyping.",
    },
    {
      time: "Day 2, 1:00 PM",
      title: "Midpoint demo checks",
      description: "Lightning demos for feedback and course corrections.",
    },
    {
      time: "Day 2, 10:00 PM",
      title: "Final submissions",
      description: "Submit code, demo video, and slide deck.",
    },
    {
      time: "Day 3, 4:00 PM",
      title: "Finals and awards",
      description: "Live demos, judging, and prize announcements.",
    },
  ],
  sponsors: [
    {
      name: "Nebula Cloud",
      tier: "Platinum",
      logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=nebula",
    },
    {
      name: "Atlas Labs",
      tier: "Gold",
      logoUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=atlas",
    },
    {
      name: "Pulse AI",
      tier: "Community",
      logoUrl: "https://api.dicebear.com/7.x/identicon/svg?seed=pulse",
    },
  ],
  faqs: [
    {
      question: "Is this hackathon online or in-person?",
      answer:
        "It is hybrid. You can build remotely and still demo live, or join the onsite hub for mentor access.",
    },
    {
      question: "Do I need a team before applying?",
      answer:
        "No. We host a team matching session during kickoff for solo builders.",
    },
    {
      question: "Are there application fees?",
      answer: "No application fees. Participation is free for accepted teams.",
    },
    {
      question: "What should I submit?",
      answer:
        "You will submit a public repo, a demo video, and a short pitch deck.",
    },
    {
      question: "Can we use existing projects?",
      answer:
        "Teams can iterate on existing work, but the core build must happen during the hackathon window.",
    },
    {
      question: "How are winners selected?",
      answer:
        "Judges score on impact, execution, and originality with bonus points for live demo quality.",
    },
  ],
  socials: [
    { label: "Discord", href: "https://discord.com" },
    { label: "Twitter", href: "https://twitter.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "YouTube", href: "https://youtube.com" },
  ],
  contactEmail: "hello@buildora.dev",
};

const HACKATHON_DETAIL_OVERRIDES: Record<
  string,
  Partial<Omit<HackathonDetail, "id" | "bannerUrl">>
> = {
  "fh-1": {
    heroSubtitle: "A global sprint for builders shipping AI infrastructure.",
    applicationDeadline: "Aug 22, 2026",
    prizePool: "$350k total prizes",
  },
  "fh-2": {
    heroSubtitle: "Deep technical challenges for frontier protocol teams.",
    applicationDeadline: "Sep 05, 2026",
    prizePool: "$220k total prizes",
  },
};

export const getHackathonDetails = (hackathon: Hackathon): HackathonDetail => {
  const overrides = HACKATHON_DETAIL_OVERRIDES[hackathon.id] ?? {};
  const statusLabel =
    overrides.statusLabel ??
    (hackathon.status === "Open"
      ? "Applications open"
      : hackathon.status === "Upcoming"
      ? "Applications opening soon"
      : "Event concluded");

  return {
    ...BASE_HACKATHON_DETAIL,
    ...overrides,
    id: hackathon.id,
    bannerUrl: hackathon.coverUrl,
    prizePool: overrides.prizePool ?? hackathon.prize,
    statusLabel,
  };
};
