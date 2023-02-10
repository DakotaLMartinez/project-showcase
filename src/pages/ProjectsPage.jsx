import { useEffect } from "react";
// import PropTypes from 'prop-types'
import { Routes, Route } from "react-router-dom";
import ProjectsList from "../components/ProjectsList";

const ProjectsContainer = ({ args }) => {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/projects`)
      .then((res) => res.json())
      .then(console.log);
  });

  return (
    <Routes>
      Working
      <Route exact path="/" element={<ProjectsList />} />
      <Route path="/new" element={<div>Working on Projects/new</div>} />
    </Routes>
  );
};

// ProjectsContainer.propTypes = {

// }

export default ProjectsContainer;
