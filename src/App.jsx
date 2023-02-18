import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import { useNotifications } from "./context/NotificationContext";
import { useAuth } from "./context/AuthContext";
import ProfilePage from "./pages/ProfilePage";
import ProfileEditPage from "./pages/ProfileEditPage";
import ProtectedRoute from "./components/ProtectedRoute";

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

      <section className="max-w-6xl mx-auto py-4 sm:py-8 mt-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/*" element={<ProjectsPage />} />
          <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
