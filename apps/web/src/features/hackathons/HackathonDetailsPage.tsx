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
  getHackathonDetails,
} from "./constants/constants";
import { getPrizePoolDisplay, isOnlineHackathon } from "./constants/utils";
import type { HackathonDetailsPageProps } from "./constants/interfaces";
import { useHackathonsCatalog } from "./hooks/useHackathons";

const HackathonDetailsPage: React.FC<HackathonDetailsPageProps> = ({
  user,
  onSignOut,
}) => {
  const { hackathonId, tabId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: catalog, isLoading } = useHackathonsCatalog();
  const basePath = location.pathname.startsWith("/hackathons/")
    ? "/hackathons"
    : "";
  const allHackathons = [
    ...(catalog?.featuredHackathons ?? []),
    ...(catalog?.openHackathons ?? []),
    ...(catalog?.upcomingHackathons ?? []),
    ...(catalog?.pastHackathons ?? []),
  ];
  const hackathon = allHackathons.find((item) => item.id === hackathonId);
  const detail = hackathon ? getHackathonDetails(hackathon) : undefined;
  const moreHackathons = (catalog?.openHackathons ?? []).filter(
    (item) => item.id !== hackathonId
  ).slice(0, 3);
  const activeTab = tabId ?? "overview";
  const isOnline = hackathon && detail ? isOnlineHackathon(hackathon, detail) : false;
  const prizePool = detail ? getPrizePoolDisplay(detail.prizePool) : null;
  const disabledTabs = ["projects", ...(isOnline ? [] : ["application"])];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-(--bg-page) text-(--text-primary) overflow-x-hidden font-inter">
        <GlobalNav user={user} onSignOut={onSignOut} />
        <main className="max-w-275 mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="rounded-[2.5rem] border border-(--border-default) bg-(--bg-surface) p-10 text-center space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-(--accent-text)">
              Loading
            </p>
            <h1 className="text-3xl lg:text-4xl font-geist font-black text-(--text-heading)">
              Fetching hackathon details...
            </h1>
          </div>
        </main>
      </div>
    );
  }

  if (!hackathon || !detail) {
    return (
      <div className="min-h-screen bg-(--bg-page) text-(--text-primary) overflow-x-hidden font-inter">
        <GlobalNav user={user} onSignOut={onSignOut} />
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 left-0 h-130 w-130 rounded-full bg-indigo-600/15 blur-[140px]"></div>
          <div className="absolute top-1/3 right-0 h-105 w-105 rounded-full bg-teal-500/10 blur-[160px]"></div>
          <div className="absolute bottom-0 left-1/3 h-120 w-120 rounded-full bg-rose-500/10 blur-[160px]"></div>
        </div>
        <main className="max-w-275 mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="rounded-[2.5rem] border border-(--border-default) bg-(--bg-surface) p-10 text-center space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-(--accent-text)">
              Hackathon not found
            </p>
            <h1 className="text-3xl lg:text-4xl font-geist font-black text-(--text-heading)">
              We could not find that hackathon.
            </h1>
            <p className="text-sm text-(--text-secondary) max-w-xl mx-auto">
              Head back to Hackathons to explore live opportunities.
            </p>
            <div className="flex justify-center">
              <Button
                className="px-6! py-3! rounded-xl!"
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
    <div className="min-h-screen bg-(--bg-page) text-(--text-primary) overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-130 w-130 rounded-full bg-indigo-600/15 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-105 w-105 rounded-full bg-teal-500/10 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-120 w-120 rounded-full bg-rose-500/10 blur-[160px]"></div>
      </div>

      <main className="max-w-350 mx-auto px-6 lg:px-12 pt-28 pb-24 space-y-16">
        <div className="flex items-center justify-between">
          <button
            className="text-xs font-black uppercase tracking-widest text-(--accent-text) hover:text-(--accent-text-soft)"
            onClick={() => navigate("/hackathons")}
          >
            Back to hackathons
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
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
                    { label: "Tracks", value: `${detail.tracks.length} tracks` },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-(--border-default) bg-(--bg-surface) px-4 py-4"
                    >
                      <p className="text-[10px] font-black uppercase tracking-widest text-(--text-tertiary)">
                        {item.label}
                      </p>
                      <p className="text-sm font-bold text-(--text-primary) mt-2">
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
                    <div className="rounded-4xl border border-(--accent-border) bg-gradient-to-br from-indigo-500/20 via-transparent to-emerald-500/10 p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--accent-text)">
                        Payout snapshot
                      </p>
                      <div className="flex items-end gap-2">
                        <p className="text-5xl leading-none font-geist font-black tracking-tight text-(--text-heading)">
                          {prizePool?.amount}
                        </p>
                        {prizePool?.label ? (
                          <p className="text-sm font-black uppercase tracking-[0.2em] text-(--text-secondary) pb-1">
                            {prizePool.label}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
                        Sponsor awards
                      </p>
                      <div className="space-y-3">
                        {detail.sponsors.map((sponsor) => (
                          <div
                            key={sponsor.name}
                            className="flex items-center gap-3 rounded-xl border border-(--border-default) bg-(--bg-input) px-3 py-3"
                          >
                            <img
                              src={sponsor.logoUrl}
                              alt={sponsor.name}
                              className="h-9 w-9 rounded-lg border border-(--border-default) bg-(--bg-surface) p-1"
                            />
                            <div>
                              <p className="text-sm font-bold text-(--text-heading)">
                                {sponsor.name}
                              </p>
                              <p className="text-[10px] uppercase tracking-widest text-(--text-tertiary)">
                                {sponsor.tier} partner
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-6 space-y-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-(--text-tertiary)">
                        Focus tracks
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {detail.tracks.slice(0, 6).map((track) => (
                          <span
                            key={track}
                            className="text-[10px] font-black uppercase tracking-widest text-(--text-secondary) bg-(--bg-input) border border-(--border-default) px-3 py-1.5 rounded-full"
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
                <section className="rounded-[1.75rem] border border-(--border-default) bg-(--bg-surface) p-4 md:p-5">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="text-[10px] font-black uppercase tracking-[0.22em] text-(--text-tertiary)">
                          Timezone
                        </span>
                        <span className="rounded-full border border-(--accent-border) bg-(--accent-bg-soft) px-3 py-1 text-xs font-bold text-(--accent-text)">
                          GMT +05:30
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-(--text-tertiary) md:max-w-[34ch]">
                        Times update as sessions are confirmed.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 md:flex md:flex-wrap md:justify-end md:gap-3">
                    <button
                      type="button"
                      className="min-h-10 rounded-full px-4 py-2.5 text-[10px] font-black uppercase tracking-widest bg-(--accent-bg) text-(--text-on-accent) shadow-lg shadow-indigo-600/20"
                    >
                      Add to calendar
                    </button>
                    <button
                      type="button"
                      className="min-h-10 rounded-full border border-(--border-default) bg-(--bg-input) px-4 py-2.5 text-[10px] font-black uppercase tracking-widest text-(--text-secondary)"
                    >
                      Download schedule
                    </button>
                    </div>
                  </div>
                </section>

                <HackathonSchedule detail={detail} />
              </>
            )}
            {activeTab === "projects" && (
              <section className="rounded-4xl border border-(--border-default) bg-(--bg-surface) p-10 text-center space-y-4">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-(--accent-text)">
                  Projects opening soon
                </p>
                <h2 className="text-3xl font-geist font-black text-(--text-heading)">
                  Submissions launch after kickoff.
                </h2>
                <p className="text-sm text-(--text-secondary) max-w-xl mx-auto">
                  Teams will be able to showcase demos, pitch decks, and
                  repos once the build window starts.
                </p>
                <div className="flex justify-center">
                  <Button className="px-6! py-3! rounded-xl!">
                    Get notified
                  </Button>
                </div>
              </section>
            )}
          </div>
          <div className="lg:col-span-4">
            <HackathonInfoCard
              hackathon={hackathon}
              detail={detail}
              activeTab={activeTab}
            />
          </div>
        </section>

        <HackathonMore hackathons={moreHackathons} />
      </main>
    </div>
  );
};

export default HackathonDetailsPage;
