import React from "react";
import type { AuthContainerProps } from "@/features/auth/constants/interfaces";

const RibbonVisual: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute -left-44 -top-44 h-[640px] w-[640px] rounded-full border-[56px] border-indigo-300/25 rotate-[-18deg]" />
    <div className="absolute -left-16 top-[28%] h-[460px] w-[760px] rounded-full border-[48px] border-cyan-300/20 rotate-[14deg]" />
    <div className="absolute right-[-190px] bottom-[-170px] h-[480px] w-[480px] rounded-full border-[42px] border-violet-300/25" />
    <div className="absolute right-12 top-16 h-36 w-36 rounded-3xl border border-white/15 bg-white/5 rotate-12" />
  </div>
);

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1320px] min-h-[720px] flex flex-col lg:flex-row rounded-[2rem] overflow-hidden border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-[0_40px_110px_-80px_rgba(15,23,42,0.65)] animate-in fade-in zoom-in-95 duration-500">
        <section className="w-full lg:w-[53%] relative overflow-hidden p-8 lg:p-14 flex flex-col justify-between bg-[linear-gradient(140deg,#090d1c_0%,#141c35_45%,#13203a_100%)]">
          <RibbonVisual />

          <div className="relative z-10 space-y-10 rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.03] backdrop-blur-[6px] px-6 py-7 lg:px-8 lg:py-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl border border-white/20 bg-white/10 flex items-center justify-center">
                <div className="w-5 h-5 border-[2.5px] border-white rounded-lg" />
              </div>
              <span className="text-white font-geist font-black text-3xl tracking-tighter">
                Buildora
              </span>
            </div>

            <div className="space-y-5 max-w-xl">
              <p className="text-[11px] font-black uppercase tracking-[0.28em] text-slate-300">
                Hacker Infrastructure
              </p>
              <h1 className="text-4xl lg:text-5xl font-geist font-black text-white leading-[1.03] tracking-[-0.04em]">
                Command center for{" "}
                <span className="bg-gradient-to-r from-indigo-300 via-sky-300 to-cyan-300 bg-clip-text text-transparent">
                  technical hackathons
                </span>
                .
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed max-w-md">
                Run applications, review tracks, and scale communities with a fast,
                secure, engineer-first workspace.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-12 lg:mt-0">
            <div className="rounded-3xl border border-white/15 bg-black/20 px-6 py-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-indigo-300" />
                  <span className="h-2.5 w-2.5 rounded-full bg-violet-300" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
                  92 countries hosting events
                </p>
              </div>
              <blockquote className="text-sm text-slate-200 leading-relaxed">
                "Fast enough for live judging, stable enough for global finals."
              </blockquote>
            </div>
          </div>
        </section>

        <section className="w-full lg:w-[47%] border-l border-[var(--border-subtle)] bg-[var(--bg-page)] p-6 lg:p-16 flex items-center justify-center">
          <div className="w-full max-w-[500px] animate-in fade-in slide-in-from-right-4 duration-300">
            {children}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthContainer;
