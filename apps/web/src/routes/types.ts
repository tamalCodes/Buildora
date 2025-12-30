import type React from "react";
import type { User } from "@buildora/shared";

export type RouteConfig = {
  path: string;
  element: React.ReactElement;
};

export type RouteContext = {
  user: User | null;
  isAuthenticated: boolean;
  onSignOut: () => void;
  onLoginSuccess: () => void;
};
