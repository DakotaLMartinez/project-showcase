import React from "react";
import { Link } from "react-router-dom";
import Button from "./ui/Button";
import GitHubLink from "./ui/GitHubLink";

function ProjectCard({ project }) {
  const {
    id,
    name,
    about,
    live_demo_url,
    code_url,
    video_url,
    collaborators,
    technologies,
    featured_image_url,
  } = project;
  console.log(project);
  return (
    <article className="border-slate-50 border rounded-lg shadow-black shadow-md bg-slate-900 text-slate-100">
      <div className="p-4">
        <figure>
          <img src={featured_image_url} />
        </figure>
        <h4 className="border-b w-full">{name}</h4>
        <p className="mt-2 h-20 whitespace-normal">{about.slice(0, 84)}...</p>
      </div>
      <footer className="flex justify-between items-center bg-slate-900 border-b-2 border-slate-800 rounded-b-lg p-4">
        <Link to={`/projects/${id}`}>
          <Button rounded primary>
            Read More
          </Button>
        </Link>
        <div className="text-3xl pr-2">
          <GitHubLink url={code_url} />
        </div>
      </footer>
    </article>
  );
}

export default ProjectCard;
