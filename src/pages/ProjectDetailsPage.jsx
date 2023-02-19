import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import GitHubLink from "../components/ui/GitHubLink";
import VideoLink from "../components/ui/VideoLink";
import LiveDemoLink from "../components/ui/LiveDemoLink";
import { useNotifications } from "../context/NotificationContext";
import Button from "../components/ui/Button";

function ProjectDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notify } = useNotifications();
  const [project, setProject] = useState(null);

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
    <>
      <nav className="flex justify-between mb-2">
        <Button secondary rounded onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <Button rounded>
          <FaPencilAlt className="mr-2" /> Edit Project
        </Button>
      </nav>
      <article className="px-2 pt-2 pb-8 flex flex-col items-center justify-center max-w-2xl mx-auto">
        <figure className="max-w-xl">
          <img src={featured_image_url} alt={`${name} screenshot`} />
        </figure>

        <div className="px-8 sm:px-16">
          <h1 className="mb-2 text-center">{name}</h1>
          <div className="mt-4 mb-8 w-32 text-3xl mx-auto flex items-center justify-between">
            {live_demo_url && <LiveDemoLink url={live_demo_url} />}
            {code_url && <GitHubLink url={code_url} />}
            {video_url && <VideoLink url={video_url} />}
          </div>
          <h5>Developed by: {collaborators.join(", ")}</h5>
          <p className="my-4">{about}</p>
          <p>
            <strong>Technologies used:</strong> {technologies.join(", ")}
          </p>
        </div>
      </article>
    </>
  );
}

export default ProjectDetailsPage;
