import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@shared/components/Button";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import HackathonFaqs from "./components/HackathonFaqs";
import HackathonHero from "./components/HackathonHero";
import HackathonInfoCard from "./components/HackathonInfoCard";
import HackathonMore from "./components/HackathonMore";
import HackathonOverview from "./components/HackathonOverview";
import HackathonPrizes from "./components/HackathonPrizes";
import HackathonSchedule from "./components/HackathonSchedule";
import HackathonSponsors from "./components/HackathonSponsors";
import {
  FEATURED_HACKATHONS,
  OPEN_HACKATHONS,
  PAST_HACKATHONS,
  UPCOMING_HACKATHONS,
  getHackathonDetails,
} from "./constants/constants";
import type { HackathonDetailsPageProps } from "./constants/types";

const HackathonDetailsPage: React.FC<HackathonDetailsPageProps> = ({
  user,
  onSignOut,
}) => {
  const { hackathonId } = useParams();
  const navigate = useNavigate();
  const allHackathons = [
    ...FEATURED_HACKATHONS,
    ...OPEN_HACKATHONS,
    ...UPCOMING_HACKATHONS,
    ...PAST_HACKATHONS,
  ];
  const hackathon = allHackathons.find((item) => item.id === hackathonId);
  const detail = hackathon ? getHackathonDetails(hackathon) : undefined;
  const moreHackathons = OPEN_HACKATHONS.filter(
    (item) => item.id !== hackathonId
  ).slice(0, 3);

  if (!hackathon || !detail) {
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
              Hackathon not found
            </p>
            <h1 className="text-3xl lg:text-4xl font-geist font-black text-white">
              We could not find that hackathon.
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Head back to Hackathons to explore live opportunities.
            </p>
            <div className="flex justify-center">
              <Button
                className="!px-6 !py-3 !rounded-xl"
                onClick={() => navigate("/hackathons")}
              >
                Back to Hackathons
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

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-24 space-y-16">
        <div className="flex items-center justify-between">
          <button
            className="text-xs font-black uppercase tracking-widest text-indigo-300"
            onClick={() => navigate("/hackathons")}
          >
            Back to hackathons
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Hackathon details
          </div>
        </div>

        <HackathonHero hackathon={hackathon} detail={detail} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            <HackathonOverview detail={detail} />
            <HackathonPrizes detail={detail} />
            <HackathonSchedule detail={detail} />
            <HackathonSponsors detail={detail} />
            <HackathonFaqs detail={detail} />
          </div>
          <div className="lg:col-span-4">
            <HackathonInfoCard hackathon={hackathon} detail={detail} />
          </div>
        </section>

        <HackathonMore hackathons={moreHackathons} />
      </main>
    </div>
  );
};

export default HackathonDetailsPage;
