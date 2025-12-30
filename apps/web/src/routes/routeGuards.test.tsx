import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { withAuthGuard, withAuthSwitch, withGuestGuard } from "./routeGuards";

const renderRoutes = (initialPath: string, elements: React.ReactElement) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>{elements}</Routes>
    </MemoryRouter>,
  );

describe("route guards", () => {
  it("redirects unauthenticated users to home for auth guard", () => {
    const Secret: React.FC<{ label: string }> = ({ label }) => (
      <div>Secret {label}</div>
    );
    const Guarded = withAuthGuard(Secret);

    renderRoutes(
      "/secret",
      <>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/secret"
          element={<Guarded isAuthenticated={false} label="area" />}
        />
      </>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders protected content when authenticated", () => {
    const Secret: React.FC<{ label: string }> = ({ label }) => (
      <div>Secret {label}</div>
    );
    const Guarded = withAuthGuard(Secret);

    renderRoutes(
      "/secret",
      <>
        <Route path="/" element={<div>Home</div>} />
        <Route
          path="/secret"
          element={<Guarded isAuthenticated={true} label="area" />}
        />
      </>,
    );

    expect(screen.getByText("Secret area")).toBeInTheDocument();
  });

  it("redirects authenticated users away from guest routes", () => {
    const GuestOnly: React.FC = () => <div>Guest</div>;
    const Guarded = withGuestGuard(GuestOnly);

    renderRoutes(
      "/auth",
      <>
        <Route path="/explore" element={<div>Explore</div>} />
        <Route
          path="/auth"
          element={<Guarded isAuthenticated={true} />}
        />
      </>,
    );

    expect(screen.getByText("Explore")).toBeInTheDocument();
  });

  it("switches between guest and authed components", () => {
    const Authed: React.FC = () => <div>Authed</div>;
    const Guest: React.FC = () => <div>Guest</div>;
    const Switch = withAuthSwitch(Authed, Guest);

    renderRoutes(
      "/",
      <Route path="/" element={<Switch isAuthenticated={false} />} />,
    );

    expect(screen.getByText("Guest")).toBeInTheDocument();
  });
});
