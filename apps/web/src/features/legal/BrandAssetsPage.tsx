import React from "react";
import LegalPageShell from "./LegalPageShell";
import type { BrandAssetsPageProps } from "./constants/interfaces";

const COLORS = [
  { name: "Buildora Indigo", hex: "#6366F1", className: "bg-indigo-500" },
  { name: "Signal Cyan", hex: "#06B6D4", className: "bg-cyan-500" },
  { name: "Solar Amber", hex: "#F59E0B", className: "bg-amber-500" },
  { name: "Night Slate", hex: "#0B1120", className: "bg-slate-950" },
];

const DO_LIST = [
  "Use the full Buildora logotype whenever possible.",
  "Maintain clear space equal to the height of the B mark.",
  "Use approved colors on neutral backgrounds.",
  "Request approval for press releases or co-branding.",
];

const DONT_LIST = [
  "Do not stretch, skew, or rotate the logo.",
  "Do not change the colors or add effects.",
  "Do not place the logo on busy imagery.",
  "Do not use the wordmark as part of your own logo.",
];

const BrandAssetsPage: React.FC<BrandAssetsPageProps> = ({
  user,
  onSignOut,
}) => {
  return (
    <LegalPageShell
      user={user}
      onSignOut={onSignOut}
      eyebrow="Brand Assets"
      title="Buildora brand kit and usage guidelines."
      subtitle="Everything you need to represent Buildora clearly and consistently across events, press, and community assets."
      meta={["Updated: Jan 20, 2026"]}
      accent="amber"
    >
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-amber-500/10 via-transparent to-cyan-500/10 p-8 space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Brand kit
            </p>
            <h2 className="text-3xl font-geist font-black text-white">
              Buildora identity assets for partners and press.
            </h2>
            <p className="text-sm text-slate-400">
              Use these assets for hackathon announcements, partnership decks,
              and editorial coverage. For co-branding or new placements, request
              approval to keep everything aligned.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:border-amber-500/40 hover:bg-white/10 transition"
                href="mailto:brand@buildora.dev"
              >
                Request brand kit
              </a>
              <a
                className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-black uppercase tracking-widest text-white hover:border-cyan-500/40 hover:bg-white/10 transition"
                href="mailto:brand@buildora.dev"
              >
                Ask for approval
              </a>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Logo usage
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 space-y-3">
              <p className="text-sm font-bold text-white">Primary lockup</p>
              <p className="text-xs text-slate-400">
                Use on light or dark backgrounds with the full wordmark.
              </p>
              <div className="h-12 rounded-xl border border-white/10 bg-[#0B1120] flex items-center px-4 text-sm font-geist font-black">
                Buildora
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-6 space-y-3">
              <p className="text-sm font-bold text-white">Monochrome</p>
              <p className="text-xs text-slate-400">
                Use when printing or on limited color materials.
              </p>
              <div className="h-12 rounded-xl border border-white/10 bg-white flex items-center px-4 text-sm font-geist font-black text-slate-900">
                Buildora
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-6">
          <div className="glass-card rounded-[2.5rem] p-8 space-y-6">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
                Color palette
              </p>
              <h3 className="text-2xl font-geist font-black text-white mt-3">
                Primary Buildora colors
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {COLORS.map((color) => (
                <div
                  key={color.name}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-4"
                >
                  <div
                    className={`h-12 w-12 rounded-xl border border-white/10 ${color.className}`}
                  ></div>
                  <div>
                    <p className="text-sm font-bold text-white">{color.name}</p>
                    <p className="text-xs text-slate-400">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[2.5rem] p-8 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Typography
            </p>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Headlines
                </p>
                <p className="text-2xl font-geist font-black text-white">
                  Plus Jakarta Sans Bold
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  Body
                </p>
                <p className="text-lg font-inter text-slate-200">
                  Plus Jakarta Sans Regular
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Do
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              {DO_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Do not
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              {DONT_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Press inquiries
            </p>
            <p className="text-sm text-slate-400">
              Email brand@buildora.dev for logos, press kits, and approvals.
            </p>
          </div>
        </div>
      </section>
    </LegalPageShell>
  );
};

export default BrandAssetsPage;
