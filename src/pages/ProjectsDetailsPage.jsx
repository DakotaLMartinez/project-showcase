import React, { useEffect, useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import GitHubLink from "../components/ui/GitHubLink";
import VideoLink from "../components/ui/VideoLink";
import LiveDemoLink from "../components/ui/LiveDemoLink";
import { useNotifications } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import Button from "../components/ui/Button";

function ProjectDetailsPage() {
  const { id } = useParams();
  const { currentUser, deleteProject, token } = useAuth();
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

  const handleDeleteProject = async (e) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/projects/${id}`,
          {
            method: "DELETE",
            headers: {
              "Authorization": token
            }
          }
        );
        if (response.ok) {
          deleteProject(project);
          navigate("/profile");
          notify({
            type: "success",
            message: "Project deleted successfully",
          });
        } else {
          notify({
            type: "error",
            message: `${response.statusText} - Couldn't delete that project'`,
          });
        }
      } catch (error) {
        console.error(error);
        notify({
          type: "error",
          message: "Couldn't delete that project",
        });
      }
    }
  };

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

  const renderPictureOrFallback = (imgUrl) => {
    return imgUrl ? renderFeaturedImage(imgUrl) : renderPlaceholder();
  };

  const renderPlaceholder = () => {
    return (
      <img
        className="p-4"
        src="https://via.placeholder.com/850x450?text=No%20Image"
      />
    );
  };

  const renderFeaturedImage = (imgUrl) => {
    return (
      <img
        className="p-2"
        src={imgUrl}
        alt="Featured Image"
      />
    );
  };
  

  return (
    <>
      <nav className="flex justify-between mb-2">
        <Button secondary rounded onClick={() => navigate(-1)}>
          Go Back
        </Button>
        <div
          className={project.user_id === currentUser?.id ? "flex" : "hidden"}
        >
          <Button as={Link} to={`/projects/${id}/edit`} secondary rounded>
            <FaPencilAlt className="mr-2" /> Edit Project
          </Button>
          <Button danger rounded onClick={handleDeleteProject}>
            <FaTrash className="mr-2" /> Delete
          </Button>
        </div>
      </nav>
      <article className="px-2 pt-2 pb-8 flex flex-col items-center justify-center max-w-2xl mx-auto">
        <figure className="max-w-xl">{renderPictureOrFallback(featured_image_url)}</figure>

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
