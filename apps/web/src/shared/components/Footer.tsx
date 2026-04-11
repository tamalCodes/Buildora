import React from "react";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa6";
import Logo from "./Logo";
import SocialIcon from "./SocialIcon";
import type { SocialIconType } from "./SocialIcon";

type FooterLink = {
  label: string;
  href: string;
};

const FOOTER_LINKS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Community",
    links: [
      { label: "Organize a hackathon", href: "#" },
      { label: "Explore hackathons", href: "#" },
      { label: "Code of Conduct", href: "/coc" },
      { label: "Brand assets", href: "/brand-assets" },
      { label: "Documentation", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Privacy policy", href: "/privacy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Buildora", href: "#" },
      { label: "Leadership", href: "#" },
      { label: "Press kit", href: "#" },
      { label: "Open positions", href: "#" },
      { label: "Security", href: "#" },
      { label: "Partners", href: "#" },
      { label: "Terms of service", href: "/terms" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help center", href: "#" },
      { label: "Contact support", href: "#" },
      { label: "Report a bug", href: "#" },
      { label: "Status", href: "#" },
      { label: "API access", href: "#" },
      { label: "Community forum", href: "#" },
      { label: "Trust & safety", href: "#" },
    ],
  },
];

const SOCIALS: {
  label: string;
  href: string;
  type?: SocialIconType;
  Icon?: typeof FaYoutube;
}[] = [
  { label: "X", href: "#", type: "X" },
  { label: "GitHub", href: "#", type: "GitHub" },
  { label: "Discord", href: "#", type: "Discord" },
  { label: "YouTube", href: "#", Icon: FaYoutube },
  { label: "LinkedIn", href: "#", type: "LinkedIn" },
];

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-(--border-default) bg-(--bg-page)">
      <div className="max-w-350 mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="text-4xl lg:text-5xl font-geist font-black text-(--text-heading) leading-[1.05]">
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
                  className="h-11 w-11 rounded-xl border border-(--border-default) bg-(--bg-input) text-(--text-secondary) flex items-center justify-center hover:border-indigo-500/50 hover:text-(--text-heading) hover:bg-(--bg-surface-hover) transition"
                >
                  {social.type ? (
                    <SocialIcon type={social.type} className="h-5 w-5" />
                  ) : (
                    social.Icon && (
                      <social.Icon className="h-5 w-5" aria-hidden="true" />
                    )
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8">
            {FOOTER_LINKS.map((group) => (
              <div key={group.title} className="space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-(--text-secondary)">
                  {group.title}
                </p>
                <div className="space-y-3">
                  {group.links.map((link) =>
                    link.href.startsWith("/") ? (
                      <Link
                        key={link.label}
                        to={link.href}
                        className="block text-sm text-(--text-tertiary) hover:text-(--text-heading) transition"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        key={link.label}
                        href={link.href}
                        className="block text-sm text-(--text-tertiary) hover:text-(--text-heading) transition"
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-(--border-default) pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <Logo size="sm" />
          <div className="flex flex-wrap items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
            <span>(c) 2025 Buildora Protocol Labs</span>
            <span className="flex items-center gap-2 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Global mainnet active
            </span>
          </div>
          <div className="rounded-full border border-(--border-default) bg-(--bg-input) px-6 py-2 text-[10px] font-black uppercase tracking-[0.4em] text-(--text-tertiary)">
            Never stop building
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
