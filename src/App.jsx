import "./App.css";
import { NavLink, Routes, Route } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <nav className="bg-slate-50 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <h4 className="px-4 text-slate-800">Project Showcase</h4>
          <NavLink end to="/">
            Home
          </NavLink>
          <NavLink end to="/projects">
            Projects
          </NavLink>
          <NavLink end to="/projects/new">
            New Project
          </NavLink>
          <NavLink end to="/about">
            About
          </NavLink>
        </div>
        <div className="mr-2">
          <RxAvatar className="text-blue-500 text-3xl" />
        </div>
      </nav>
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
