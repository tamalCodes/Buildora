import React from "react";
import LegalPageShell from "./LegalPageShell";
import type { PrivacyPolicyPageProps } from "./constants/interfaces";

const DATA_COLLECTION = [
  {
    title: "Account details",
    body: "Name, email, role, and team information needed to create and secure your Buildora account.",
  },
  {
    title: "Event participation",
    body: "Hackathon registrations, submissions, and collaboration details shared with organizers.",
  },
  {
    title: "Usage analytics",
    body: "Pages viewed, clicks, and feature usage that help us improve the platform experience.",
  },
  {
    title: "Device and access data",
    body: "Browser type, IP address, and security logs used to prevent fraud and abuse.",
  },
  {
    title: "Support conversations",
    body: "Messages you send to our support team so we can resolve issues quickly.",
  },
];

const USE_CASES = [
  "Provide the Buildora platform and core features.",
  "Secure accounts, detect fraud, and keep sessions safe.",
  "Improve hackathon discovery, collaboration, and recommendations.",
  "Communicate product updates, security notices, and policy changes.",
];

const SHARING = [
  "Hackathon organizers when you opt into an event or submit a project.",
  "Service providers that power infrastructure, analytics, and support tooling.",
  "Law enforcement or regulators when we are legally required to disclose data.",
];

const RIGHTS = [
  "Request access, correction, or deletion of your personal data.",
  "Export a copy of your data in a portable format.",
  "Opt out of marketing messages at any time.",
];

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  user,
  onSignOut,
}) => {
  return (
    <LegalPageShell
      user={user}
      onSignOut={onSignOut}
      eyebrow="Privacy Policy"
      title="Respect for your data is built into Buildora."
      subtitle="This policy explains what we collect, why we collect it, and how you can control your information when using Buildora."
      meta={["Effective date: Jan 20, 2026", "Last updated: Jan 20, 2026"]}
      accent="indigo"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Applicability
            </h2>
            <p className="text-sm text-slate-400">
              This Privacy Policy applies to Buildora websites, services, and
              events. By using Buildora, you agree to the practices described
              here.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Information we collect
            </h2>
            <div className="space-y-3">
              {DATA_COLLECTION.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-slate-400 mt-2">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              How we use data
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {USE_CASES.map((item) => (
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
              Sharing of information
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {SHARING.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-500">
              We do not sell personal data or share it for third-party
              advertising.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Data retention and security
            </h2>
            <p className="text-sm text-slate-400">
              We retain data only as long as needed to deliver services and meet
              legal obligations. Security safeguards include encrypted
              transport, access controls, and incident monitoring.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-geist font-black text-white">
              Your rights
            </h2>
            <ul className="space-y-3 text-sm text-slate-400">
              {RIGHTS.map((item) => (
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
              Changes to this policy
            </h2>
            <p className="text-sm text-slate-400">
              If we make material changes, we will post an update on this page
              and notify you through the product or email.
            </p>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6 lg:sticky top-28 self-start">
          <div className="glass-card rounded-4xl p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
              Quick summary
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Only collect what we need to run Buildora.</li>
              <li>Share data with organizers only when you opt in.</li>
              <li>Never sell personal information.</li>
            </ul>
          </div>

          <div className="glass-card rounded-4xl p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
              Contact privacy
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>privacy@buildora.dev</p>
              <p>Legal team, Buildora Protocol Labs</p>
              <p>160 Bay Street, San Francisco, CA 94107</p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-white hover:border-indigo-500/40 hover:bg-white/10 transition"
              href="mailto:privacy@buildora.dev"
            >
              Email privacy team
            </a>
          </div>
        </aside>
      </div>
    </LegalPageShell>
  );
};

export default PrivacyPolicyPage;
