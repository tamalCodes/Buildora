import { User } from "@buildora/shared";
import { CustomToastProvider } from "@shared/components/CustomToast";
import Footer from "@shared/components/Footer";
import MaintenanceBanner from "@shared/components/MaintenanceBanner";
import ScrollToTop from "@shared/components/ScrollToTop";
import GlobalSearchModal from "@shared/components/search/GlobalSearchModal";
import { SearchOverlayProvider } from "@shared/components/search/SearchOverlayContext";
import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { createGuestRoutes } from "./routes/guestRoutes";
import { createPrivateRoutes } from "./routes/privateRoutes";
import { createPublicRoutes } from "./routes/publicRoutes";
import RouteErrorBoundary from "./routes/RouteErrorBoundary";
import {
  RouteErrorFallback,
  RouteLoadingFallback,
} from "./routes/RouteFallbacks";
import { AuthService } from "./services/authService";

type AppRoutesProps = {
  routes: Array<{ path: string; element: React.ReactNode }>;
  isAuthenticated: boolean;
};

const MAINTENANCE_MODE_ENABLED =
  import.meta.env.VITE_MAINTENANCE_MODE !== "false";

const AppRoutes: React.FC<AppRoutesProps> = ({ routes, isAuthenticated }) => {
  const location = useLocation();
  const hideFooterForGuests = new Set(["/", "/explore", "/auth", "/login"]);
  const shouldHideFooter =
    !isAuthenticated && hideFooterForGuests.has(location.pathname);
  const maintenanceBannerOffset = MAINTENANCE_MODE_ENABLED ? "3rem" : "0px";

  return (
    <div
      style={
        {
          "--maintenance-banner-offset": maintenanceBannerOffset,
        } as React.CSSProperties
      }
    >
      {MAINTENANCE_MODE_ENABLED && <MaintenanceBanner />}
      <Suspense fallback={<RouteLoadingFallback />}>
        <RouteErrorBoundary fallback={<RouteErrorFallback />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </RouteErrorBoundary>
      </Suspense>
      {!shouldHideFooter && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = AuthService.getToken();

    if (!token) {
      setIsCheckingSession(false);
      return;
    }

    AuthService.getMe().then((result) => {
      if (result.success && result.data) {
        setUser(result.data);
        setIsAuthenticated(true);
      } else {
        AuthService.clearToken();
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsCheckingSession(false);
    });
  }, []);

  const refreshSession = async () => {
    const result = await AuthService.getMe();
    if (result.success && result.data) {
      setUser(result.data);
      setIsAuthenticated(true);
      return;
    }

    AuthService.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  const handleLoginSuccess = () => {
    void refreshSession();
  };

  const handleSignOut = () => {
    AuthService.clearToken();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (isCheckingSession) {
    return null;
  }

  const routeContext = {
    user,
    isAuthenticated,
    onSignOut: handleSignOut,
    onLoginSuccess: handleLoginSuccess,
  };

  const routes = [
    ...createGuestRoutes(routeContext),
    ...createPrivateRoutes(routeContext),
    ...createPublicRoutes(routeContext),
  ];

  return (
    <CustomToastProvider>
      <SearchOverlayProvider>
        <BrowserRouter>
          <ScrollToTop />
          <GlobalSearchModal />
          <AppRoutes routes={routes} isAuthenticated={isAuthenticated} />
        </BrowserRouter>
      </SearchOverlayProvider>
    </CustomToastProvider>
  );
};

export default App;
