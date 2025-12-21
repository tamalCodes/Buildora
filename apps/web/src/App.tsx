import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthContainer from "./components/Auth/AuthContainer";
import AuthForm from "./components/Auth/AuthForm";
import ExplorePage from "./components/Explore/ExplorePage";
import HackathonsPage from "./components/Hackathons/HackathonsPage";
import { AuthService } from "./services/authService";
import { User } from "@buildora/shared";
import { CustomToastProvider } from "./components/UI/CustomToast";
import Footer from "./components/UI/Footer";
import ScrollToTop from "./components/UI/ScrollToTop";
import PrivacyPolicyPage from "./components/Legal/PrivacyPolicyPage";
import TermsOfUsePage from "./components/Legal/TermsOfUsePage";
import CodeOfConductPage from "./components/Legal/CodeOfConductPage";
import BrandAssetsPage from "./components/Legal/BrandAssetsPage";
import SettingsPage from "./components/Settings/SettingsPage";

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

  const exploreElement = isAuthenticated ? (
    <ExplorePage user={user} onSignOut={handleSignOut} />
  ) : (
    <AuthContainer>
      <AuthForm onLoginSuccess={handleLoginSuccess} />
    </AuthContainer>
  );

  return (
    <CustomToastProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={exploreElement}
          />
          <Route path="/explore" element={exploreElement} />
          <Route
            path="/hackathons"
            element={<HackathonsPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/builders"
            element={<ExplorePage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicyPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/privacy"
            element={<PrivacyPolicyPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/terms"
            element={<TermsOfUsePage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/terms-of-use"
            element={<TermsOfUsePage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/coc"
            element={<CodeOfConductPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/code-of-conduct"
            element={<CodeOfConductPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/brand-assets"
            element={<BrandAssetsPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/settings"
            element={<SettingsPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/account"
            element={<Navigate to="/settings" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CustomToastProvider>
  );
};

export default App;
