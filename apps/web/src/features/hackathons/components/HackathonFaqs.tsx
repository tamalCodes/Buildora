import React from "react";
import type { HackathonFaqsProps } from "@/features/hackathons/constants/interfaces";

const HackathonFaqs: React.FC<HackathonFaqsProps> = ({ detail }) => {
  return (
    <section id="faqs" className="space-y-8">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent-text)]">
          FAQs
        </p>
        <h2 className="text-3xl font-geist font-black text-[var(--text-heading)] mt-3">
          Answered before you ask
        </h2>
      </div>
      <div className="space-y-4">
        {detail.faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-[1.5rem] border border-[var(--border-default)] bg-[var(--bg-surface)] p-6"
          >
            <p className="text-sm font-bold text-[var(--text-heading)]">{faq.question}</p>
            <p className="text-sm text-[var(--text-secondary)] mt-3">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HackathonFaqs;
