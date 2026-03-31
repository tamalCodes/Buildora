import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthService } from "./services/authService";
import { User } from "@buildora/shared";
import { CustomToastProvider } from "@shared/components/CustomToast";
import Footer from "@shared/components/Footer";
import ScrollToTop from "@shared/components/ScrollToTop";
import GlobalSearchModal from "@shared/components/search/GlobalSearchModal";
import { SearchOverlayProvider } from "@shared/components/search/SearchOverlayContext";
import { createGuestRoutes } from "./routes/guestRoutes";
import { createPrivateRoutes } from "./routes/privateRoutes";
import { createPublicRoutes } from "./routes/publicRoutes";
import RouteErrorBoundary from "./routes/RouteErrorBoundary";
import { RouteErrorFallback, RouteLoadingFallback } from "./routes/RouteFallbacks";

type AppRoutesProps = {
  routes: Array<{ path: string; element: React.ReactNode }>;
  isAuthenticated: boolean;
};

const AppRoutes: React.FC<AppRoutesProps> = ({ routes, isAuthenticated }) => {
  const location = useLocation();
  const hideFooterForGuests = new Set(["/", "/auth", "/login"]);
  const shouldHideFooter =
    !isAuthenticated && hideFooterForGuests.has(location.pathname);

  return (
    <>
      <Suspense fallback={<RouteLoadingFallback />}>
        <RouteErrorBoundary fallback={<RouteErrorFallback />}>
          <Routes>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Routes>
        </RouteErrorBoundary>
      </Suspense>
      {!shouldHideFooter && <Footer />}
    </>
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
