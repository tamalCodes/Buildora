import React from "react";
import { User } from "@buildora/shared";
import LegalPageShell from "./LegalPageShell";

const EXPECTATIONS = [
  "Be respectful and inclusive across all Buildora spaces.",
  "Give credit for ideas, code, and prior work.",
  "Keep feedback constructive and centered on the work.",
  "Ask for consent before recording or sharing content.",
];

const UNACCEPTABLE = [
  "Harassment, threats, or discriminatory conduct.",
  "Plagiarism or misrepresenting past work as new.",
  "Sharing private information without permission.",
  "Disruptive behavior that interrupts sessions or events.",
];

const REPORTING = [
  "Report concerns to organizers or the Buildora safety team.",
  "Provide details so we can investigate quickly.",
  "We will respond with confidentiality and respect.",
];

const CONSEQUENCES = [
  "Warnings or required corrective action.",
  "Removal from sessions, events, or the platform.",
  "Account suspension or permanent bans when necessary.",
];

interface CodeOfConductPageProps {
  user?: User | null;
  onSignOut?: () => void;
}

const CodeOfConductPage: React.FC<CodeOfConductPageProps> = ({
  user,
  onSignOut,
}) => {
  return (
    <LegalPageShell
      user={user}
      onSignOut={onSignOut}
      eyebrow="Code of Conduct"
      title="Buildora is a safe space for ambitious builders."
      subtitle="This Code of Conduct applies to all Buildora events, online spaces, and community interactions."
      meta={["Effective date: Jan 20, 2026", "Last updated: Jan 20, 2026"]}
      accent="emerald"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Applicability
            </h2>
            <p className="text-sm text-slate-400">
              This policy covers hackathons, workshops, community channels, and
              any Buildora-hosted or sponsored spaces.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Expectations
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {EXPECTATIONS.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Unacceptable behavior
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {UNACCEPTABLE.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Recording and consent
            </h2>
            <p className="text-sm text-slate-400">
              Ask for permission before recording or photographing others. If
              someone requests removal of content, comply quickly and notify
              the organizers if needed.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Reporting concerns
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {REPORTING.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Consequences
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {CONSEQUENCES.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6 lg:sticky top-28 self-start">
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
              Safety contacts
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>safety@buildora.dev</p>
              <p>Buildora community support</p>
              <p>Available 24/7 during live events</p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-white hover:border-emerald-500/40 hover:bg-white/10 transition"
              href="mailto:safety@buildora.dev"
            >
              Report an issue
            </a>
          </div>

          <div className="glass-card rounded-[2rem] p-6 space-y-3">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-300">
              Commitment
            </p>
            <p className="text-sm text-slate-400">
              We are committed to a harassment-free experience for everyone,
              regardless of experience level, identity, or background.
            </p>
          </div>
        </aside>
      </div>
    </LegalPageShell>
  );
};

export default CodeOfConductPage;
