import React, { useMemo, useState } from "react";
import GlobalNav from "@shared/components/global-nav/GlobalNav";
import ProfileSidebar from "./components/ProfileSidebar";
import ProfileHeader from "./components/ProfileHeader";
import ProfileMobileNav from "./components/ProfileMobileNav";
import ProfileAboutSection from "./components/ProfileAboutSection";
import ProfileLinksSection from "./components/ProfileLinksSection";
import ProfileEducationSection from "./components/ProfileEducationSection";
import ProfileExperienceSection from "./components/ProfileExperienceSection";
import ProfileContactSection from "./components/ProfileContactSection";
import { ProfileSectionId } from "./constants/enums";
import type { ProfilePageProps } from "./constants/interfaces";

const ProfilePage: React.FC<ProfilePageProps> = ({ user, onSignOut }) => {
  const [activeSection, setActiveSection] = useState<ProfileSectionId>(
    ProfileSectionId.About
  );
  const userLabel = user?.name || "tamalCodes";
  const userEmail = user?.email || "tamalcodes@gmail.com";

  const avatarUrl = useMemo(() => {
    if (user?.avatarUrl) return user.avatarUrl;
    const seed = user?.email || "guest";
    return `https://i.pravatar.cc/160?u=${encodeURIComponent(seed)}`;
  }, [user?.avatarUrl, user?.email]);

  const profileSkills = ["React", "TypeScript", "Solana", "UI/UX"];

  return (
    <div className="min-h-screen bg-[#05060c] text-slate-100 overflow-x-hidden font-inter">
      <GlobalNav user={user} onSignOut={onSignOut} />

      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-0 h-[520px] w-[520px] rounded-full bg-indigo-600/15 blur-[140px]" />
        <div className="absolute top-1/3 right-0 h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full bg-rose-500/10 blur-[160px]" />
      </div>

      <main className="mx-auto max-w-[1200px] px-6 pb-24 pt-32 lg:px-12">
        <ProfileHeader
          avatarUrl={avatarUrl}
          userLabel={userLabel}
          userEmail={userEmail}
          skills={profileSkills}
        />

        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <ProfileSidebar
            activeId={activeSection}
            onSelect={setActiveSection}
          />

          <div className="space-y-6">
            <ProfileMobileNav
              activeSection={activeSection}
              onChange={setActiveSection}
            />

            {activeSection === ProfileSectionId.About && (
              <ProfileAboutSection />
            )}
            {activeSection === ProfileSectionId.Links && (
              <ProfileLinksSection />
            )}
            {activeSection === ProfileSectionId.Education && (
              <ProfileEducationSection />
            )}
            {activeSection === ProfileSectionId.Experience && (
              <ProfileExperienceSection />
            )}
            {activeSection === ProfileSectionId.Contact && (
              <ProfileContactSection userEmail={userEmail} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
