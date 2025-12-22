import React from "react";
import GlobalNav from "../../shared/components/global-nav/GlobalNav";
import { User } from "@buildora/shared";

type Accent = "indigo" | "emerald" | "amber";

const ACCENTS: Record<
  Accent,
  { badge: string; heading: string; glowA: string; glowB: string; glowC: string }
> = {
  indigo: {
    badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-300",
    heading: "text-indigo-200",
    glowA: "bg-indigo-600/15",
    glowB: "bg-cyan-500/10",
    glowC: "bg-fuchsia-500/10",
  },
  emerald: {
    badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
    heading: "text-emerald-200",
    glowA: "bg-emerald-600/15",
    glowB: "bg-teal-500/10",
    glowC: "bg-cyan-500/10",
  },
  amber: {
    badge: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    heading: "text-amber-200",
    glowA: "bg-amber-500/15",
    glowB: "bg-orange-500/10",
    glowC: "bg-rose-500/10",
  },
};

interface LegalPageShellProps {
  user?: User | null;
  onSignOut?: () => void;
  eyebrow: string;
  title: string;
  subtitle: string;
  meta?: string[];
  accent?: Accent;
  children: React.ReactNode;
}

const LegalPageShell: React.FC<LegalPageShellProps> = ({
  user,
  onSignOut,
  eyebrow,
  title,
  subtitle,
  meta,
  accent = "indigo",
  children,
}) => {
  const accentStyles = ACCENTS[accent];

  return (
    <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className={`absolute -top-40 left-0 h-[520px] w-[520px] rounded-full ${accentStyles.glowA} blur-[140px]`} />
        <div className={`absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full ${accentStyles.glowB} blur-[160px]`} />
        <div className={`absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full ${accentStyles.glowC} blur-[160px]`} />
      </div>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-12">
        <header className="space-y-6">
          <div
            className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-xs font-black uppercase tracking-widest ${accentStyles.badge}`}
          >
            {eyebrow}
          </div>
          <h1 className="text-4xl lg:text-6xl font-geist font-black text-white leading-[1.05] tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-slate-400 max-w-3xl">{subtitle}</p>
          {meta && meta.length ? (
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em] text-slate-500">
              {meta.map((item) => (
                <span key={item} className={`rounded-full border px-4 py-2 ${accentStyles.heading} border-white/10 bg-white/5`}>
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </header>
        {children}
      </main>
    </div>
  );
};

export default LegalPageShell;
