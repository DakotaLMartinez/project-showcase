import React from 'react'
import { Link } from 'react-router-dom';
import ProjectCard from './ProjectCard'
import Button from './ui/Button';


function ProjectsList({projects}) {
  return (
    <div>
      <h1 className="flex justify-between mb-4">
        <span>Projects</span>
        <Button 
          as={Link} 
          primary
          to="/projects/new"
          className="text-lg"
        >New Project</Button>
      </h1>
      <section className="px-0 sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </section>
    </div>
  );
}

export default ProjectsList