import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@shared/components/Button";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import { FEATURED_PROJECTS } from "../explore/constants/constants";
import ProjectGallery from "./components/ProjectGallery";
import ProjectHero from "./components/ProjectHero";
import ProjectLinks from "./components/ProjectLinks";
import ProjectMetrics from "./components/ProjectMetrics";
import ProjectMilestones from "./components/ProjectMilestones";
import ProjectOverview from "./components/ProjectOverview";
import ProjectProfile from "./components/ProjectProfile";
import ProjectStack from "./components/ProjectStack";
import ProjectTeam from "./components/ProjectTeam";
import ProjectUpdates from "./components/ProjectUpdates";
import { PROJECT_DETAILS } from "./constants/constants";
import type { ProjectDetailsPageProps } from "./constants/types";

const ProjectDetailsPage: React.FC<ProjectDetailsPageProps> = ({
  user,
  onSignOut,
}) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = FEATURED_PROJECTS.find((item) => item.id === projectId);
  const details = projectId ? PROJECT_DETAILS[projectId] : undefined;

  if (!project || !details) {
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
              Project not found
            </p>
            <h1 className="text-3xl lg:text-4xl font-geist font-black text-white">
              We could not find that Buildora launch.
            </h1>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              Head back to Explore to browse the latest launches and builder
              showcases.
            </p>
            <div className="flex justify-center">
              <Button
                className="!px-6 !py-3 !rounded-xl"
                onClick={() => navigate("/explore")}
              >
                Back to Explore
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
            onClick={() => navigate("/explore")}
          >
            Back to explore
          </button>
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
            Project details
          </div>
        </div>

        <ProjectHero project={project} details={details} />

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">
            <ProjectGallery gallery={details.gallery} />
            <ProjectOverview details={details} />
            <ProjectMetrics
              metrics={details.metrics}
              highlights={details.highlights}
            />
            <ProjectMilestones milestones={details.milestones} />
            <ProjectUpdates updates={details.updates} />
          </div>
          <aside className="lg:col-span-4 space-y-8">
            <ProjectProfile details={details} />
            <ProjectLinks links={details.links} />
            <ProjectTeam team={details.team} />
            <ProjectStack stack={details.stack} />
          </aside>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetailsPage;
