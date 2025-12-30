import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { withAuthSwitch } from "./routeGuards";
import { lazyImport } from "./lazyImport";
import type { RouteConfig, RouteContext } from "./types";

const AuthContainer = lazyImport(
  () => import("../features/auth/components/AuthContainer"),
);
const AuthForm = lazyImport(() => import("../features/auth/components/AuthForm"));
const ExplorePage = lazyImport(() => import("../features/explore/ExplorePage"));
const HackathonsPage = lazyImport(
  () => import("../features/hackathons/HackathonsPage"),
);
const HackathonDetailsPage = lazyImport(
  () => import("../features/hackathons/HackathonDetailsPage"),
);
const BuildersPage = lazyImport(() => import("../features/builders/BuildersPage"));
const BuilderDetailsPage = lazyImport(
  () => import("../features/builders/BuilderDetailsPage"),
);
const ProjectDetailsPage = lazyImport(
  () => import("../features/projects/ProjectDetailsPage"),
);
const PrivacyPolicyPage = lazyImport(
  () => import("../features/legal/PrivacyPolicyPage"),
);
const TermsOfUsePage = lazyImport(
  () => import("../features/legal/TermsOfUsePage"),
);
const CodeOfConductPage = lazyImport(
  () => import("../features/legal/CodeOfConductPage"),
);
const BrandAssetsPage = lazyImport(
  () => import("../features/legal/BrandAssetsPage"),
);

const HackathonDetailsRedirect: React.FC = () => {
  const { hackathonId } = useParams();
  if (!hackathonId) {
    return <Navigate to="/hackathons" replace />;
  }
  return <Navigate to={`/hackathons/${hackathonId}/overview`} replace />;
};

const ExploreRoute: React.FC<RouteContext> = ({ user, onSignOut }) => (
  <ExplorePage user={user} onSignOut={onSignOut} />
);

const AuthRoute: React.FC<RouteContext> = ({ onLoginSuccess }) => (
  <AuthContainer>
    <AuthForm onLoginSuccess={onLoginSuccess} />
  </AuthContainer>
);

const ExploreOrAuthRoute = withAuthSwitch(ExploreRoute, AuthRoute);

export const createPublicRoutes = (ctx: RouteContext): RouteConfig[] => [
  { path: "/", element: <ExploreOrAuthRoute {...ctx} /> },
  { path: "/explore", element: <ExploreOrAuthRoute {...ctx} /> },
  {
    path: "/hackathons",
    element: <HackathonsPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  { path: "/hackathons/:hackathonId", element: <HackathonDetailsRedirect /> },
  {
    path: "/hackathons/:hackathonId/:tabId",
    element: <HackathonDetailsPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/:hackathonId/:tabId",
    element: <HackathonDetailsPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/builders",
    element: <BuildersPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/builders/:builderId",
    element: <BuilderDetailsPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/projects/:projectId",
    element: <ProjectDetailsPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicyPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicyPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/terms",
    element: <TermsOfUsePage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/terms-of-use",
    element: <TermsOfUsePage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/coc",
    element: <CodeOfConductPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/code-of-conduct",
    element: <CodeOfConductPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  {
    path: "/brand-assets",
    element: <BrandAssetsPage user={ctx.user} onSignOut={ctx.onSignOut} />,
  },
  { path: "/account", element: <Navigate to="/settings" replace /> },
  { path: "*", element: <Navigate to="/" replace /> },
];
