import type { ProjectDetail } from "./types";

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  p1: {
    id: "p1",
    tagline: "Ops intelligence for teams shipping data systems at startup speed.",
    status: "Live beta",
    stage: "Series A",
    location: "Remote, SF",
    founded: "2022",
    website: "https://lumeatlas.io",
    repo: "https://github.com/lumeatlas/atlas",
    demo: "https://lumeatlas.io/demo",
    about:
      "Lume Atlas helps data teams model, monitor, and ship open pipelines without the usual months of setup. It pairs live lineage graphs with declarative controls so growth teams can trust the data they are making decisions on.",
    problem:
      "Open data pipelines move fast, but most teams still rely on manual runbooks and scattered dashboards. When downstream teams need answers, the context is often missing.",
    solution:
      "Lume Atlas blends infrastructure visibility with human-friendly ops workflows. You can see every dependency, annotate incidents, and share playbooks directly in the product.",
    audience:
      "Data platform teams, growth operators, and startup analytics leads shipping pipelines in production.",
    differentiators: [
      "Live lineage with change tracking built into every release.",
      "Playbooks that auto-populate when alerts fire.",
      "Native support for open table formats and streaming sources.",
      "Ops summaries designed for non-technical stakeholders.",
    ],
    metrics: [
      {
        label: "Weekly active teams",
        value: "320",
        helper: "+18% vs last month",
        trend: "up",
      },
      {
        label: "Incident response time",
        value: "14 min",
        helper: "Down from 41 min",
        trend: "up",
      },
      {
        label: "Pipelines monitored",
        value: "8.4k",
        helper: "+1.2k this quarter",
        trend: "up",
      },
    ],
    highlights: [
      {
        title: "Ops command center",
        summary: "Unified alerts, owners, and runbooks in one surface.",
        metric: "98% alert routing accuracy",
      },
      {
        title: "Lineage layers",
        summary: "Visual diffing for every pipeline change.",
        metric: "3x faster root cause analysis",
      },
      {
        title: "Stakeholder views",
        summary: "Auto-generated briefings for exec updates.",
        metric: "74% fewer support pings",
      },
    ],
    milestones: [
      {
        title: "Beta waitlist opened",
        date: "Aug 2024",
        summary: "1,400 teams joined the early access list in 10 days.",
        status: "done",
      },
      {
        title: "Streaming observability pack",
        date: "Oct 2024",
        summary: "Real-time health metrics for Kafka and Flink stacks.",
        status: "done",
      },
      {
        title: "Enterprise onboarding",
        date: "Jan 2025",
        summary: "SOC2 workflows, SSO, and audit trails.",
        status: "in-progress",
      },
      {
        title: "Marketplace launch",
        date: "Q2 2025",
        summary: "Templates, playbooks, and connectors shared by partners.",
        status: "next",
      },
    ],
    updates: [
      {
        title: "Incident recap workflows",
        date: "2 days ago",
        summary:
          "Post-incident summaries now auto-generate from chat + logs.",
        tags: ["Release", "Ops"],
      },
      {
        title: "New connector: Iceberg",
        date: "1 week ago",
        summary: "Ingest and monitor Iceberg tables without custom scripts.",
        tags: ["Integrations"],
      },
      {
        title: "Partnership with DataUnion",
        date: "3 weeks ago",
        summary: "Co-branded playbooks for data reliability teams.",
        tags: ["Partnership"],
      },
    ],
    team: [
      {
        name: "Noah Park",
        role: "Founder, CEO",
        focus: "Data reliability",
        avatarUrl: "https://i.pravatar.cc/150?u=noah-park",
      },
      {
        name: "Riya Patel",
        role: "Founding Engineer",
        focus: "Infrastructure",
        avatarUrl: "https://i.pravatar.cc/150?u=riya-patel",
      },
      {
        name: "Jules Chen",
        role: "Design Lead",
        focus: "Systems UX",
        avatarUrl: "https://i.pravatar.cc/150?u=jules-chen",
      },
    ],
    links: [
      {
        label: "Visit website",
        href: "https://lumeatlas.io",
        hint: "Product overview and docs",
        tone: "primary",
      },
      {
        label: "Read the docs",
        href: "https://lumeatlas.io/docs",
        hint: "Setup guides and API",
        tone: "outline",
      },
      {
        label: "Watch demo",
        href: "https://lumeatlas.io/demo",
        hint: "10 min walkthrough",
        tone: "ghost",
      },
    ],
    stack: [
      { name: "Next.js", detail: "Control center and dashboard UI" },
      { name: "Vector", detail: "Streaming ingest and alerting" },
      { name: "Postgres", detail: "Metadata store" },
      { name: "Grafana", detail: "Operational metrics" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1600&auto=format&fit=crop",
    ],
    snapshot: [
      { label: "Active customers", value: "48" },
      { label: "Retention", value: "93%" },
      { label: "Data sources", value: "27" },
      { label: "Runbooks", value: "180+" },
    ],
  },
  p2: {
    id: "p2",
    tagline: "Realtime insights and rituals for distributed engineering teams.",
    status: "Public launch",
    stage: "Seed",
    location: "New York",
    founded: "2023",
    website: "https://signalforge.dev",
    repo: "https://github.com/signalforge/core",
    demo: "https://signalforge.dev/demo",
    about:
      "Signal Forge is a ritual-driven insights hub for engineering orgs. It blends realtime telemetry with weekly rituals so teams can ship faster without burning out.",
    problem:
      "Remote teams struggle to spot friction until it becomes a release delay. Context is split across chat, dashboards, and incident reports.",
    solution:
      "Signal Forge turns telemetry into ritual-ready briefs and highlights. Leaders can coach with clarity while teams stay aligned on what matters.",
    audience:
      "Distributed engineering managers, platform teams, and developer experience leaders.",
    differentiators: [
      "Ritual dashboards tuned for weekly planning and retros.",
      "Playback clips generated from CI/CD events.",
      "Team health indicators that flag burnout risks early.",
      "Customizable signal packs for each squad.",
    ],
    metrics: [
      {
        label: "Teams onboarded",
        value: "112",
        helper: "+24 this month",
        trend: "up",
      },
      {
        label: "Release tempo",
        value: "2.8x",
        helper: "Median velocity improvement",
        trend: "up",
      },
      {
        label: "Signal accuracy",
        value: "91%",
        helper: "Auto-classified incidents",
        trend: "up",
      },
    ],
    highlights: [
      {
        title: "Ritual briefs",
        summary: "Weekly summaries crafted for decision makers.",
        metric: "6 hrs saved per team",
      },
      {
        title: "Burnout radar",
        summary: "Flags late nights and noisy on-call patterns.",
        metric: "38% reduction in pager fatigue",
      },
      {
        title: "Release storyboards",
        summary: "Visual timelines for every deploy.",
        metric: "2 min postmortems",
      },
    ],
    milestones: [
      {
        title: "Founding design partners",
        date: "May 2024",
        summary: "10 engineering orgs signed for early pilots.",
        status: "done",
      },
      {
        title: "Ritual pack marketplace",
        date: "Sep 2024",
        summary: "Teams shared 80+ ritual templates.",
        status: "done",
      },
      {
        title: "Global launch",
        date: "Dec 2024",
        summary: "Public release with SOC2 compliance.",
        status: "in-progress",
      },
      {
        title: "AI coach beta",
        date: "Q2 2025",
        summary: "Automated coaching insights for managers.",
        status: "next",
      },
    ],
    updates: [
      {
        title: "On-call clarity pack",
        date: "4 days ago",
        summary: "New alert triage scores for ops teams.",
        tags: ["Release"],
      },
      {
        title: "Launch storyboards",
        date: "2 weeks ago",
        summary: "Merge PR activity with deploy timelines.",
        tags: ["Feature"],
      },
      {
        title: "DevRel AMA",
        date: "Last month",
        summary: "Live walkthrough on building ritual analytics.",
        tags: ["Community"],
      },
    ],
    team: [
      {
        name: "Cassidy Wren",
        role: "Founder, CEO",
        focus: "Developer experience",
        avatarUrl: "https://i.pravatar.cc/150?u=cassidy-wren",
      },
      {
        name: "Luis Ortega",
        role: "Product Lead",
        focus: "Team workflows",
        avatarUrl: "https://i.pravatar.cc/150?u=luis-ortega",
      },
      {
        name: "Samira Noor",
        role: "Data Engineer",
        focus: "Realtime pipelines",
        avatarUrl: "https://i.pravatar.cc/150?u=samira-noor",
      },
    ],
    links: [
      {
        label: "Launch site",
        href: "https://signalforge.dev",
        hint: "Product updates",
        tone: "primary",
      },
      {
        label: "Docs hub",
        href: "https://signalforge.dev/docs",
        hint: "Integration guides",
        tone: "outline",
      },
      {
        label: "Book a demo",
        href: "https://signalforge.dev/demo",
        hint: "Schedule a walkthrough",
        tone: "ghost",
      },
    ],
    stack: [
      { name: "Rust", detail: "Realtime ingestion" },
      { name: "Kafka", detail: "Event streaming" },
      { name: "WebGL", detail: "Timeline rendering" },
      { name: "ClickHouse", detail: "Analytics store" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1600&auto=format&fit=crop",
    ],
    snapshot: [
      { label: "Active squads", value: "76" },
      { label: "Weekly rituals", value: "540" },
      { label: "Deploys tracked", value: "14k" },
      { label: "Signal packs", value: "28" },
    ],
  },
  p3: {
    id: "p3",
    tagline: "Creator economy rails for communities and on-chain clubs.",
    status: "Growing",
    stage: "Community round",
    location: "London",
    founded: "2021",
    website: "https://mintstream.xyz",
    repo: "https://github.com/mintstream/protocol",
    demo: "https://mintstream.xyz/demo",
    about:
      "Mintstream powers community-owned storefronts for creators and clubs. It connects membership, rewards, and on-chain commerce in one toolkit.",
    problem:
      "Community revenue stacks are fragmented across merch, memberships, and crypto wallets. Creators struggle to connect those touchpoints.",
    solution:
      "Mintstream delivers a unified rails layer to launch memberships, issue rewards, and track community health in real time.",
    audience:
      "Creators, community managers, and Web3 collectives running membership programs.",
    differentiators: [
      "Drop-in storefronts with gated content support.",
      "Reward loops tuned for community engagement.",
      "On-chain analytics for wallet activity.",
      "Token-gated CRM integrations.",
    ],
    metrics: [
      {
        label: "Communities live",
        value: "260",
        helper: "+32 since last month",
        trend: "up",
      },
      {
        label: "Monthly GMV",
        value: "$1.4M",
        helper: "+22% MoM",
        trend: "up",
      },
      {
        label: "Reward redemption",
        value: "68%",
        helper: "Up 9 points",
        trend: "up",
      },
    ],
    highlights: [
      {
        title: "Membership loops",
        summary: "Keep fans engaged with dynamic access tiers.",
        metric: "2.4x repeat engagement",
      },
      {
        title: "Creator dashboards",
        summary: "Live revenue splits and cohort analytics.",
        metric: "30 min weekly reporting",
      },
      {
        title: "Community grants",
        summary: "On-chain grants with instant reporting.",
        metric: "$420k issued",
      },
    ],
    milestones: [
      {
        title: "Creator fund launch",
        date: "Jun 2024",
        summary: "$250k allocated to early communities.",
        status: "done",
      },
      {
        title: "Storefront v2",
        date: "Sep 2024",
        summary: "New templates and token gating options.",
        status: "done",
      },
      {
        title: "NFT loyalty beta",
        date: "Jan 2025",
        summary: "Loyalty rewards for top supporters.",
        status: "in-progress",
      },
      {
        title: "Cross-chain payments",
        date: "Q3 2025",
        summary: "Unlock global settlements for communities.",
        status: "next",
      },
    ],
    updates: [
      {
        title: "Rewards analytics",
        date: "5 days ago",
        summary: "New cohort dashboards for membership drops.",
        tags: ["Release"],
      },
      {
        title: "Creator playbook",
        date: "2 weeks ago",
        summary: "New guides for on-chain community growth.",
        tags: ["Guide"],
      },
      {
        title: "Mintstream Connect",
        date: "Last month",
        summary: "Partnership with top payment providers.",
        tags: ["Partnership"],
      },
    ],
    team: [
      {
        name: "Ari Moon",
        role: "Founder, CEO",
        focus: "Community growth",
        avatarUrl: "https://i.pravatar.cc/150?u=ari-moon",
      },
      {
        name: "Kareem Sol",
        role: "Protocol Engineer",
        focus: "Payments",
        avatarUrl: "https://i.pravatar.cc/150?u=kareem-sol",
      },
      {
        name: "Leah Park",
        role: "Creator Partnerships",
        focus: "Ecosystem",
        avatarUrl: "https://i.pravatar.cc/150?u=leah-park",
      },
    ],
    links: [
      {
        label: "Explore Mintstream",
        href: "https://mintstream.xyz",
        hint: "Creator hub",
        tone: "primary",
      },
      {
        label: "Protocol docs",
        href: "https://mintstream.xyz/docs",
        hint: "Developer resources",
        tone: "outline",
      },
      {
        label: "Schedule demo",
        href: "https://mintstream.xyz/demo",
        hint: "Live walkthrough",
        tone: "ghost",
      },
    ],
    stack: [
      { name: "Solidity", detail: "Membership contracts" },
      { name: "ZK", detail: "Privacy-preserving rewards" },
      { name: "React", detail: "Creator dashboards" },
      { name: "Supabase", detail: "Community data" },
    ],
    gallery: [
      "https://images.unsplash.com/photo-1526948128573-703ee1aeb6fa?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    ],
    snapshot: [
      { label: "Creator collectives", value: "120" },
      { label: "Membership tiers", value: "640" },
      { label: "Reward events", value: "18k" },
      { label: "Payout speed", value: "24h" },
    ],
  },
};
