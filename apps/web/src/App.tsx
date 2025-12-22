import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthContainer from "./features/auth/components/AuthContainer";
import AuthForm from "./features/auth/components/AuthForm";
import ExplorePage from "./features/explore/ExplorePage";
import HackathonsPage from "./features/hackathons/HackathonsPage";
import HackathonDetailsPage from "./features/hackathons/HackathonDetailsPage";
import { AuthService } from "./services/authService";
import { User } from "@buildora/shared";
import { CustomToastProvider } from "@shared/components/CustomToast";
import Footer from "@shared/components/Footer";
import ScrollToTop from "@shared/components/ScrollToTop";
import GlobalSearchModal from "@shared/components/search/GlobalSearchModal";
import { SearchOverlayProvider } from "@shared/components/search/SearchOverlayContext";
import PrivacyPolicyPage from "./features/legal/PrivacyPolicyPage";
import TermsOfUsePage from "./features/legal/TermsOfUsePage";
import CodeOfConductPage from "./features/legal/CodeOfConductPage";
import BrandAssetsPage from "./features/legal/BrandAssetsPage";
import SettingsPage from "./features/settings/SettingsPage";
import ProjectDetailsPage from "./features/projects/ProjectDetailsPage";
import BuildersPage from "./features/builders/BuildersPage";
import BuilderDetailsPage from "./features/builders/BuilderDetailsPage";
import ProfilePage from "./features/profile/ProfilePage";

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
      <SearchOverlayProvider>
        <BrowserRouter>
          <ScrollToTop />
          <GlobalSearchModal />
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
            path="/hackathons/:hackathonId"
            element={
              <HackathonDetailsPage user={user} onSignOut={handleSignOut} />
            }
          />
          <Route
            path="/builders"
            element={<BuildersPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/builders/:builderId"
            element={<BuilderDetailsPage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetailsPage user={user} onSignOut={handleSignOut} />}
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
            path="/profile"
            element={<ProfilePage user={user} onSignOut={handleSignOut} />}
          />
          <Route
            path="/account"
            element={<Navigate to="/settings" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
          <Footer />
        </BrowserRouter>
      </SearchOverlayProvider>
    </CustomToastProvider>
  );
};

export default App;
