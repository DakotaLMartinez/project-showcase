import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button from "./ui/Button";
import GitHubLink from "./ui/GitHubLink";

function ProjectCard({ project, small = false }) {
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

  const aboutClasses = classNames("mt-2 whitespace-normal", {
    "sm:h-12 md:h-20": small,
    "sm:h-16 md:h-20": !small,
  });

  const shortAboutText = about.slice(0,small ? 74 : 84);
  const aboutText =
    shortAboutText === about ? about : `${shortAboutText.trim()}...`;

  console.log(project);
  return (
    <article className="border-slate-50 border rounded-lg shadow-black shadow-md bg-slate-900 text-slate-100">
      <div className="px-4 pt-2">
        <figure>
          <img src={featured_image_url} />
        </figure>
        <h4 className="md:text-lg lg:text-xl border-b w-full">{name}</h4>
        <p className={aboutClasses}>{aboutText}</p>
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
