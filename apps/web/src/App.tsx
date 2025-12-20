import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthContainer from "./components/Auth/AuthContainer";
import AuthForm from "./components/Auth/AuthForm";
import ExplorePage from "./components/Explore/ExplorePage";
import HackathonsPage from "./components/Hackathons/HackathonsPage";

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  // useEffect(() => {
  //   const token = AuthService.getToken();

  //   if (!token) {
  //     setIsCheckingSession(false);
  //     return;
  //   }

  //   AuthService.getMe().then((result) => {
  //     if (result.success) {
  //       setIsAuthenticated(true);
  //     } else {
  //       AuthService.clearToken();
  //     }
  //     setIsCheckingSession(false);
  //   });
  // }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  // if (isCheckingSession) {
  //   return null;
  // }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/explore" replace />} />
        <Route
          path="/explore"
          element={
            isAuthenticated ? (
              <ExplorePage />
            ) : (
              <AuthContainer>
                <AuthForm onLoginSuccess={handleLoginSuccess} />
              </AuthContainer>
            )
          }
        />
        <Route path="/hackathons" element={<HackathonsPage />} />
        <Route path="/builders" element={<ExplorePage />} />
        <Route path="*" element={<Navigate to="/explore" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
