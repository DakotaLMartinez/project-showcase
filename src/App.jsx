import "./App.css";
import { Routes, Route } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import { useNotifications } from "./context/NotificationContext";

function App() {
  const { notify, currentNotification } = useNotifications();
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

      <section className="max-w-6xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/*" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
