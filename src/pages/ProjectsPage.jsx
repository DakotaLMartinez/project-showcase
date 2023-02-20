import { useEffect, useState } from "react";
// import PropTypes from 'prop-types'
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import ProjectsList from "../components/ProjectsList";
import ProjectsNewPage from "./ProjectsNewPage";
import ProjectDetailsPage from "./ProjectsDetailsPage";
import ProjectsEditPage from "./ProjectsEditPage";

const ProjectsContainer = ({ args }) => {
  const { isLoggedIn, currentUser } = useAuth();
  const [projects, setProjects] = useState([])
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/projects`)
      .then((res) => res.json())
      .then(projects => {
        setProjects(projects);
      });
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<ProjectsList projects={projects} />} />
      <Route exact path="/:id" element={<ProjectDetailsPage />} />
      <Route element={<ProtectedRoute isAllowed={isLoggedIn} />}>
        <Route path="/new" element={<ProjectsNewPage />} />    
        <Route path="/:id/edit" element={<ProjectsEditPage />} />    
      </Route>
    </Routes>
  );
};

// ProjectsContainer.propTypes = {

// }

export default ProjectsContainer;
