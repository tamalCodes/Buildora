import React from "react";
import { Navigate } from "react-router-dom";

type GuardProps = {
  isAuthenticated: boolean;
};

export const withAuthGuard = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const Wrapped: React.FC<P & GuardProps> = (props) => {
    const { isAuthenticated, ...rest } = props;
    if (!isAuthenticated) {
      return <Navigate to="/explore" replace />;
    }
    return <Component {...(rest as P)} />;
  };

  return Wrapped;
};

export const withGuestGuard = <P extends object>(
  Component: React.ComponentType<P>
) => {
  const Wrapped: React.FC<P & GuardProps> = (props) => {
    const { isAuthenticated, ...rest } = props;
    if (isAuthenticated) {
      return <Navigate to="/explore" replace />;
    }
    return <Component {...(rest as P)} />;
  };

  return Wrapped;
};

export const withAuthSwitch = <P extends object>(
  AuthedComponent: React.ComponentType<P>,
  GuestComponent: React.ComponentType<P>
) => {
  const Wrapped: React.FC<P & GuardProps> = (props) => {
    const { isAuthenticated, ...rest } = props;
    if (isAuthenticated) {
      return <AuthedComponent {...(rest as P)} />;
    }
    return <GuestComponent {...(rest as P)} />;
  };

  return Wrapped;
};
