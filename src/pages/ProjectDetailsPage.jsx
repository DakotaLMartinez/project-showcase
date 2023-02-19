import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useParams } from "react-router-dom";
import GitHubLink from "../components/ui/GitHubLink";
import VideoLink from "../components/ui/VideoLink";
import LiveDemoLink from "../components/ui/LiveDemoLink";
import { useNotifications } from "../context/NotificationContext";

function ProjectDetailsPage() {
  const { notify } = useNotifications();
  const [project, setProject] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/projects/${id}`
      );
      if (response.ok) {
        const project = await response.json();
        setProject(project);
      } else {
        notify({
          type: "error",
          message: "Couldn't fetch that project",
        });
      }
    };

    fetchProject();
  }, []);

  if (!project) {
    return <LoaderIcon />;
  }

  const {
    name,
    about,
    live_demo_url,
    code_url,
    video_url,
    collaborators,
    technologies,
    featured_image_url,
  } = project;

  console.dir(project);
  return (
    <article className="flex flex-col items-center justify-center max-w-xl mx-auto">
      <figure className="max-w-xl">
        <img src={featured_image_url} alt={`${name} screenshot`} />
      </figure>

      <div className="px-6">
        <h1 className="mb-2 text-center">{name}</h1>
        <div className="my-4 w-32 text-2xl mx-auto flex items-center justify-between">
          {live_demo_url && <LiveDemoLink url={live_demo_url} />}
          {code_url && <GitHubLink url={code_url} />}
          {video_url && <VideoLink url={video_url} />}
        </div>
        <h5>Developed by {collaborators.join(", ")}</h5>
        <p>{about}</p>
        <p>Technologies used: {technologies.join(", ")}</p>
      </div>
    </article>
  );
}

export default ProjectDetailsPage;
