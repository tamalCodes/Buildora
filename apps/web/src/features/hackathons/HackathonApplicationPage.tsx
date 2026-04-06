import Button from "@shared/components/Button";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ApplicationAboutForm from "./application/components/ApplicationAboutForm";
import ApplicationContactForm from "./application/components/ApplicationContactForm";
import ApplicationExperienceForm from "./application/components/ApplicationExperienceForm";
import ApplicationHero from "./application/components/ApplicationHero";
import ApplicationLinksForm from "./application/components/ApplicationLinksForm";
import ApplicationNotice from "./application/components/ApplicationNotice";
import ApplicationSectionCard from "./application/components/ApplicationSectionCard";
import ApplicationSidebar from "./application/components/ApplicationSidebar";
import {
  APPLICATION_CONTACT_FIELDS,
  APPLICATION_LINKS,
  APPLICATION_PROGRESS,
  APPLICATION_ROLES,
  APPLICATION_SECTIONS,
  APPLICATION_SKILLS,
  buildApplicationMetrics,
} from "./application/constants/data";
import type { HackathonApplicationPageProps } from "./application/constants/interfaces";
import { applicationTheme } from "./application/constants/themes";
import {
  getHackathonDetails,
} from "./constants/constants";
import { isOnlineHackathon } from "./constants/utils";
import { useHackathonsCatalog } from "./hooks/useHackathons";

const HackathonApplicationPage: React.FC<HackathonApplicationPageProps> = ({
  user,
  onSignOut,
}) => {
  const { hackathonId } = useParams();
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
  const isOnline =
    hackathon && detail ? isOnlineHackathon(hackathon, detail) : false;

  if (isLoading) {
    return (
      <div className={applicationTheme.page}>
        <GlobalNav user={user} onSignOut={onSignOut} />
        <main className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-200">
              Loading
            </p>
            <h1 className="text-3xl lg:text-4xl font-geist font-black text-white">
              Preparing application details...
            </h1>
          </div>
        </main>
      </div>
    );
  }

  if (!hackathon || !detail) {
    return (
      <div className={applicationTheme.page}>
        <GlobalNav user={user} onSignOut={onSignOut} />
        <main className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-32 pb-24">
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-200">
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

  if (!isOnline) {
    return (
      <div className={applicationTheme.page}>
        <GlobalNav user={user} onSignOut={onSignOut} />
        <main className="max-w-[1100px] mx-auto px-6 lg:px-12 pt-32 pb-24 space-y-8">
          <button
            className="text-xs font-black uppercase tracking-widest text-emerald-200"
            onClick={() => navigate(`${basePath}/${hackathon.id}/overview`)}
          >
            Back to hackathon
          </button>
          <div className="rounded-[2.5rem] border border-white/10 bg-white/5 p-10 text-center space-y-5">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-emerald-200">
              Application flow unavailable
            </p>
            <h1 className="text-3xl lg:text-4xl font-geist font-black text-white">
              This application is only open for online hackathons.
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Visit the hackathon details page for in-person instructions and
              application links.
            </p>
            <div className="flex justify-center">
              <Button
                className="!px-6 !py-3 !rounded-xl"
                onClick={() => navigate(`${basePath}/${hackathon.id}/overview`)}
              >
                View hackathon details
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className={applicationTheme.page}>
      <GlobalNav user={user} onSignOut={onSignOut} />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-[140px]"></div>
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-amber-500/10 blur-[160px]"></div>
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-cyan-500/10 blur-[160px]"></div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 pb-24 space-y-12">
        <div className="flex items-center justify-between">
          <button
            className="text-xs font-black uppercase tracking-widest text-emerald-200"
            onClick={() => navigate(`${basePath}/${hackathon.id}/overview`)}
          >
            Back to hackathon
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Application flow
          </div>
        </div>

        <ApplicationHero
          hackathon={hackathon}
          detail={detail}
          activeTab="application"
          onNavigate={(tabId) => {
            if (tabId === "application") {
              return;
            }
            navigate(`${basePath}/${hackathon.id}/${tabId}`);
          }}
        />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-6">
            <ApplicationNotice
              message="Join the Buildora Discord to meet teammates, get mentor support, and track challenge updates."
              ctaLabel="Join Discord"
              onCtaClick={() => window.open("https://discord.com", "_blank")}
            />

            <ApplicationSectionCard
              title={APPLICATION_SECTIONS[0].title}
              description={APPLICATION_SECTIONS[0].description}
              status={APPLICATION_SECTIONS[0].status}
              defaultOpen
            >
              <ApplicationAboutForm
                firstName="Tamal"
                lastName="Das"
                headline="Frontend builder focused on AI workflows"
                portfolio="https://buildora.dev/tamal"
                bio="Building AI-native product experiences with clean interfaces, strong demos, and lightweight infra. Excited to ship with a focused team and iterate fast."
              />
            </ApplicationSectionCard>

            <ApplicationSectionCard
              title={APPLICATION_SECTIONS[1].title}
              description={APPLICATION_SECTIONS[1].description}
              status={APPLICATION_SECTIONS[1].status}
            >
              <ApplicationExperienceForm
                roles={APPLICATION_ROLES}
                skills={APPLICATION_SKILLS}
              />
            </ApplicationSectionCard>

            <ApplicationSectionCard
              title={APPLICATION_SECTIONS[2].title}
              description={APPLICATION_SECTIONS[2].description}
              status={APPLICATION_SECTIONS[2].status}
            >
              <ApplicationLinksForm links={APPLICATION_LINKS} />
            </ApplicationSectionCard>

            <ApplicationSectionCard
              title={APPLICATION_SECTIONS[3].title}
              description={APPLICATION_SECTIONS[3].description}
              status={APPLICATION_SECTIONS[3].status}
            >
              <ApplicationContactForm fields={APPLICATION_CONTACT_FIELDS} />
            </ApplicationSectionCard>
          </div>
          <div className="lg:col-span-4 self-start">
            <ApplicationSidebar
              hackathon={hackathon}
              detail={detail}
              progress={APPLICATION_PROGRESS}
              metrics={buildApplicationMetrics(hackathon, detail, isOnline)}
              isOnline={isOnline}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HackathonApplicationPage;
