import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@shared/components/Button";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import BuilderProfileAbout from "./components/BuilderProfileAbout";
import BuilderProfileHero from "./components/BuilderProfileHero";
import BuilderProfileProjects from "./components/BuilderProfileProjects";
import BuilderProfileStats from "./components/BuilderProfileStats";
import { BUILDER_PROFILES } from "./constants/profiles";
import type { BuilderDetailsPageProps } from "./constants/interfaces";

const BuilderDetailsPage: React.FC<BuilderDetailsPageProps> = ({
  user,
  onSignOut,
}) => {
  const { builderId } = useParams();
  const navigate = useNavigate();
  const profile = BUILDER_PROFILES.find((item) => item.id === builderId);

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
        <GlobalNav user={user} onSignOut={onSignOut} />
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600/15 blur-[140px]"></div>
          <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[160px]"></div>
          <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500/10 blur-[160px]"></div>
        </div>
        <main className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
              Builder not found
            </p>
            <h1 className="text-3xl lg:text-4xl font-geist font-black text-white">
              We could not find that builder profile.
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Head back to Builders to explore top contributors in the
              community.
            </p>
            <div className="flex justify-center">
              <Button
                className="!px-6 !py-3 !rounded-xl"
                onClick={() => navigate("/builders")}
              >
                Back to Builders
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600/15 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-teal-500/10 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500/10 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-24 space-y-14">
        <div className="flex items-center justify-between">
          <button
            className="text-xs font-black uppercase tracking-widest text-indigo-300"
            onClick={() => navigate("/builders")}
          >
            Back to builders
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Builder details
          </div>
        </div>

        <BuilderProfileHero profile={profile} />
        <BuilderProfileStats profile={profile} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-10">
            <BuilderProfileAbout profile={profile} />
          </div>
          <div className="lg:col-span-5 space-y-10">
            <BuilderProfileProjects profile={profile} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuilderDetailsPage;
