import React from "react";
import LegalPageShell from "./LegalPageShell";
import type { TermsOfUsePageProps } from "./constants/interfaces";

const TERMS_SECTIONS = [
  {
    title: "About Buildora",
    body: "Buildora provides discovery, collaboration, and project hosting for hackathons and builder communities. These terms govern your use of our services.",
  },
  {
    title: "Eligibility",
    body: "You must be at least 13 years old to use Buildora. If you are under 18, you must have permission from a parent or legal guardian.",
  },
  {
    title: "Account responsibilities",
    body: "You are responsible for maintaining the security of your account, keeping your profile accurate, and safeguarding access credentials.",
  },
  {
    title: "Acceptable use",
    body: "Do not misuse Buildora by attempting to gain unauthorized access, distributing malware, harassing others, or violating any laws.",
  },
  {
    title: "Content and submissions",
    body: "You retain ownership of your work. By submitting content to Buildora, you grant us a license to host, display, and distribute it to deliver the service.",
  },
  {
    title: "Payments and fees",
    body: "If paid services or transactions are offered, you agree to provide accurate billing information and pay applicable fees and taxes.",
  },
  {
    title: "Third-party services",
    body: "Buildora may link to third-party services. We are not responsible for their content or practices.",
  },
  {
    title: "Disclaimers",
    body: "Buildora is provided on an as-is basis without warranties of any kind. We do not guarantee uninterrupted or error-free service.",
  },
  {
    title: "Limitation of liability",
    body: "To the maximum extent permitted by law, Buildora is not liable for indirect or incidental damages arising from your use of the platform.",
  },
  {
    title: "Termination",
    body: "We may suspend or terminate access if you violate these terms or pose a security risk to the community.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the State of California, without regard to conflict of law principles.",
  },
  {
    title: "Changes to these terms",
    body: "We may update these terms from time to time. Continued use of Buildora means you accept the revised terms.",
  },
];

const TermsOfUsePage: React.FC<TermsOfUsePageProps> = ({
  user,
  onSignOut,
}) => {
  return (
    <LegalPageShell
      user={user}
      onSignOut={onSignOut}
      eyebrow="Terms of Use"
      title="Clear terms for building together."
      subtitle="These terms outline how you can use Buildora, what you can expect from us, and how we keep the community safe."
      meta={["Effective date: Jan 20, 2026", "Last updated: Jan 20, 2026"]}
      accent="amber"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {TERMS_SECTIONS.map((section) => (
            <section
              key={section.title}
              className="rounded-[2rem] border border-white/10 bg-white/5 px-6 py-6 space-y-3"
            >
              <h2 className="text-xl font-geist font-black text-white">
                {section.title}
              </h2>
              <p className="text-sm text-slate-400">{section.body}</p>
            </section>
          ))}
        </div>

        <aside className="lg:col-span-4 space-y-6 lg:sticky top-28 self-start">
          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Highlights
            </p>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>You own your work and submissions.</li>
              <li>Keep your account secure and accurate.</li>
              <li>Respect other builders and organizers.</li>
            </ul>
          </div>

          <div className="glass-card rounded-[2rem] p-6 space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">
              Contact
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <p>legal@buildora.dev</p>
              <p>Buildora Protocol Labs</p>
              <p>160 Bay Street, San Francisco, CA 94107</p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-white hover:border-amber-500/40 hover:bg-white/10 transition"
              href="mailto:legal@buildora.dev"
            >
              Email legal team
            </a>
          </div>
        </aside>
      </div>
    </LegalPageShell>
  );
};

export default TermsOfUsePage;
