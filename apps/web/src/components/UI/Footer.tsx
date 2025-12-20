import React from "react";
import Logo from "./Logo";

const FOOTER_LINKS = [
  {
    title: "Community",
    links: [
      "Organize a hackathon",
      "Explore hackathons",
      "Code of Conduct",
      "Brand assets",
      "Documentation",
      "Careers",
      "Privacy policy",
    ],
  },
  {
    title: "Company",
    links: [
      "About Buildora",
      "Leadership",
      "Press kit",
      "Open positions",
      "Security",
      "Partners",
      "Terms of service",
    ],
  },
  {
    title: "Support",
    links: [
      "Help center",
      "Contact support",
      "Report a bug",
      "Status",
      "API access",
      "Community forum",
      "Trust & safety",
    ],
  },
];

const SOCIALS = [
  { label: "X", shortLabel: "X", href: "#" },
  { label: "GitHub", shortLabel: "GH", href: "#" },
  { label: "Discord", shortLabel: "DC", href: "#" },
  { label: "YouTube", shortLabel: "YT", href: "#" },
  { label: "LinkedIn", shortLabel: "IN", href: "#" },
];

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 border-t border-white/10 bg-[#05060c]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-geist font-black text-white leading-[1.05]">
              We love{" "}
              <span className="text-indigo-400 drop-shadow-[0_0_12px_rgba(129,140,248,0.35)]">
                software
              </span>{" "}
              and the{" "}
              <span className="text-amber-300 drop-shadow-[0_0_12px_rgba(251,191,36,0.25)]">
                people
              </span>{" "}
              who build it.
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-11 w-11 rounded-xl border border-white/10 bg-white/5 text-xs font-black uppercase tracking-[0.2em] text-slate-300 flex items-center justify-center hover:border-indigo-500/50 hover:text-white hover:bg-white/10 transition"
                >
                  {social.shortLabel}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">
                  {group.title}
                </p>
                <div className="space-y-3">
                  {group.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="block text-sm text-slate-500 hover:text-white transition"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <Logo size="sm" />
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            <span>(c) 2025 Buildora Protocol Labs</span>
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Global mainnet active
            </span>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
            Never stop building
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
