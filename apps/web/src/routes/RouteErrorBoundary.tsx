import React from "react";

/**
 * RouteErrorBoundary wraps the router tree to catch render-time failures
 * from route components or lazy imports and render a safe fallback UI.
 *
 * Keep it minimal and side-effect free; this boundary is meant to prevent
 * full-app crashes while routing. Logging is centralized here.
 */

type RouteErrorBoundaryProps = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};

type RouteErrorBoundaryState = {
  hasError: boolean;
};

class RouteErrorBoundary extends React.Component<
  RouteErrorBoundaryProps,
  RouteErrorBoundaryState
> {
  state: RouteErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error("Route render failed", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}

export default RouteErrorBoundary;
