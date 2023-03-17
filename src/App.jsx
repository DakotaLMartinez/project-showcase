import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useNotifications } from "./context/NotificationContext";
import { useAuth } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Container from "./components/ui/Container";
import Footer from "./components/ui/Footer";

function App() {
  const { notify, currentNotification } = useNotifications();
  const { isLoggedIn, currentUser } = useAuth();
  useEffect(() => {
    if (currentNotification !== null) {
      notify(currentNotification);
    }
  }, [currentNotification]);
  return (
    <>
      <Navbar />
      <Toaster
        containerStyle={{
          top: 72,
          left: 40,
          bottom: 40,
          right: 40,
        }}
      />

      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/projects/*"
            element={
              <Container>
                <ProjectsPage />
              </Container>
            }
          />
          <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
            <Route
              path="/profile"
              element={
                <Container>
                  <ProfilePage />
                </Container>
              }
            />
            <Route
              path="/profile/edit"
              element={
                <Container>
                  <ProfileEditPage />
                </Container>
              }
            />
          </Route>
        </Routes>
        <Footer />
      </>
    </>
  );
}

export default App;
