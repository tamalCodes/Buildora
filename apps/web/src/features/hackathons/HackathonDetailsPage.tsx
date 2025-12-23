import React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { isOnlineHackathon } from "./constants/utils";
import type { HackathonDetailsPageProps } from "./constants/interfaces";

const HackathonDetailsPage: React.FC<HackathonDetailsPageProps> = ({
  user,
  onSignOut,
}) => {
  const { hackathonId, tabId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.startsWith("/hackathons/")
    ? "/hackathons"
    : "";
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
  const activeTab = tabId ?? "overview";
  const isOnline = hackathon && detail ? isOnlineHackathon(hackathon, detail) : false;
  const disabledTabs = ["projects", ...(isOnline ? [] : ["application"])];

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

  if (activeTab === "application") {
    return (
      <Navigate
        to={`${basePath}/${hackathon.id}/application`}
        replace
      />
    );
  }

  if (!["overview", "prizes", "schedule", "projects"].includes(activeTab)) {
    return (
      <Navigate
        to={`${basePath}/${hackathon.id}/overview`}
        replace
      />
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

        <HackathonHero
          hackathon={hackathon}
          detail={detail}
          activeTab={activeTab}
          disabledTabs={disabledTabs}
          onNavigate={(tab) => {
            if (tab === "application") {
              if (isOnline) {
                navigate(`${basePath}/${hackathon.id}/application`);
              }
              return;
            }
            navigate(`${basePath}/${hackathon.id}/${tab}`);
          }}
        />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            {activeTab === "overview" && (
              <>
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Applications close",
                      value: detail.applicationDeadline,
                    },
                    { label: "Format", value: detail.mode },
                    { label: "Team size", value: detail.teamSize },
                    { label: "Eligibility", value: detail.eligibility },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-white mt-2">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </section>

                <HackathonOverview detail={detail} />
                <HackathonSponsors detail={detail} />
                <HackathonFaqs detail={detail} />
              </>
            )}
            {activeTab === "prizes" && (
              <>
                <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-5 space-y-6">
                    <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-indigo-500/20 via-transparent to-emerald-500/10 p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">
                        Prize pool
                      </p>
                      <p className="text-3xl font-geist font-black text-white">
                        {detail.prizePool}
                      </p>
                      <p className="text-sm text-slate-400">
                        Top prizes plus sponsor awards across multiple tracks.
                      </p>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                        Sponsor awards
                      </p>
                      <div className="space-y-3">
                        {detail.sponsors.map((sponsor) => (
                          <div
                            key={sponsor.name}
                            className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                          >
                            <img
                              src={sponsor.logoUrl}
                              alt={sponsor.name}
                              className="h-9 w-9 rounded-lg border border-white/10 bg-white/5 p-1"
                            />
                            <div>
                              <p className="text-sm font-bold text-white">
                                {sponsor.name}
                              </p>
                              <p className="text-[10px] uppercase tracking-widest text-slate-500">
                                {sponsor.tier} partner
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                        Focus tracks
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {detail.tracks.slice(0, 6).map((track) => (
                          <span
                            key={track}
                            className="text-[10px] font-black uppercase tracking-widest text-slate-200 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
                          >
                            {track}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <HackathonPrizes detail={detail} />
                  </div>
                </section>
              </>
            )}
            {activeTab === "schedule" && (
              <>
                <section className="rounded-[2rem] border border-white/10 bg-white/5 p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Timezone
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-indigo-200">
                      GMT +05:30
                    </span>
                    <span className="text-xs text-slate-500">
                      Times update as sessions are confirmed.
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    >
                      Add to calendar
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-300 border border-white/10"
                    >
                      Download schedule
                    </button>
                  </div>
                </section>

                <HackathonSchedule detail={detail} />
              </>
            )}
            {activeTab === "projects" && (
              <section className="rounded-[2rem] border border-white/10 bg-white/5 p-10 text-center space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">
                  Projects opening soon
                </p>
                <h2 className="text-3xl font-geist font-black text-white">
                  Submissions launch after kickoff.
                </h2>
                <p className="text-sm text-slate-400 max-w-xl mx-auto">
                  Teams will be able to showcase demos, pitch decks, and
                  repos once the build window starts.
                </p>
                <div className="flex justify-center">
                  <Button className="!px-6 !py-3 !rounded-xl">
                    Get notified
                  </Button>
                </div>
              </section>
            )}
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
