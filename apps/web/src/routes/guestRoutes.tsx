import React from "react";
import { withGuestGuard } from "./routeGuards";
import { lazyImport } from "./lazyImport";
import type { RouteConfig, RouteContext } from "./types";

const AuthContainer = lazyImport(
  () => import("../features/auth/components/AuthContainer"),
);
const AuthForm = lazyImport(() => import("../features/auth/components/AuthForm"));

const AuthRoute: React.FC<RouteContext> = ({ onLoginSuccess }) => (
  <AuthContainer>
    <AuthForm onLoginSuccess={onLoginSuccess} />
  </AuthContainer>
);

const GuestOnlyAuthRoute = withGuestGuard(AuthRoute);

export const createGuestRoutes = (ctx: RouteContext): RouteConfig[] => [
  { path: "/auth", element: <GuestOnlyAuthRoute {...ctx} /> },
  { path: "/login", element: <GuestOnlyAuthRoute {...ctx} /> },
];
