import React from "react";
import { withAuthGuard } from "./routeGuards";
import { lazyImport } from "./lazyImport";
import type { RouteConfig, RouteContext } from "./types";

const HackathonApplicationPage = lazyImport(
  () => import("../features/hackathons/HackathonApplicationPage"),
);
const SettingsPage = lazyImport(
  () => import("../features/settings/SettingsPage"),
);
const ProfilePage = lazyImport(() => import("../features/profile/ProfilePage"));

const HackathonApplicationRoute: React.FC<RouteContext> = ({
  user,
  onSignOut,
}) => <HackathonApplicationPage user={user} onSignOut={onSignOut} />;

const SettingsRoute: React.FC<RouteContext> = ({ user, onSignOut }) => (
  <SettingsPage user={user} onSignOut={onSignOut} />
);

const ProfileRoute: React.FC<RouteContext> = ({ user, onSignOut }) => (
  <ProfilePage user={user} onSignOut={onSignOut} />
);

const GuardedHackathonApplication = withAuthGuard(HackathonApplicationRoute);
const GuardedSettings = withAuthGuard(SettingsRoute);
const GuardedProfile = withAuthGuard(ProfileRoute);

export const createPrivateRoutes = (ctx: RouteContext): RouteConfig[] => [
  {
    path: "/hackathons/:hackathonId/application",
    element: <GuardedHackathonApplication {...ctx} />,
  },
  {
    path: "/hackathons/:hackathonId/apply",
    element: <GuardedHackathonApplication {...ctx} />,
  },
  {
    path: "/:hackathonId/application",
    element: <GuardedHackathonApplication {...ctx} />,
  },
  { path: "/settings", element: <GuardedSettings {...ctx} /> },
  { path: "/profile", element: <GuardedProfile {...ctx} /> },
];
