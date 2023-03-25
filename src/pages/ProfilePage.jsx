import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import ProjectCard from "../components/ProjectCard";
import GitHubLink from "../components/ui/GitHubLink";
import LinkedInLink from "../components/ui/LinkedInLink";
import TiwtterLink from "../components/ui/TwitterLink";
import Avatar from "../components/ui/Avatar";
import AvatarPlaceholder from "../components/ui/AvatarPlaceholder";

function ProfilePage() {
  const navigate = useNavigate();
  const { currentUser, authFetch, logout } = useAuth();
  const { notify } = useNotifications();

  const githubLink = currentUser.github_url && (
    <GitHubLink url={currentUser.github_url} />
  );

  const linkedinLink = currentUser.linkedin_url && (
    <LinkedInLink url={currentUser.linkedin_url} />
  );

  const twitterLink = currentUser.twitter_url && (
    <TiwtterLink url={currentUser.twitter_url} />
  );

  const renderAvatar = () => {
    return currentUser.avatar_url ? (
      <Avatar
        className="rounded-full w-44 h-44 object-cover"
        src={currentUser.avatar_url}
      />
    ) : (
      <AvatarPlaceholder className="text-9xl" />
    );
  };

  const renderProjects = () => {
    return (
      <>
        <h3 className="text-center md:text-left md:border-b mb-4">Projects</h3>
        <section className="px-0 md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
          {currentUser.projects.map((project) => {
            return <ProjectCard key={project.id} small project={project} />;
          })}
        </section>
      </>
    );
  };

  const handleProfileDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This will also delete all of your projects."
      )
    ) {
      try {
        const deleteResponse = await authFetch(
          `${import.meta.env.VITE_API_URL}/signup`,
          { method: "DELETE" }
        );
        if (deleteResponse.ok) {
          logout();
          navigate("/");
          notify({
            type: "success",
            message: "Successfully deleted your account.",
          });
          return;
        }
        const error = await deleteResponse.json();
        console.error(error);
      } catch (e) {
        notify({ type: "error", message: e.message });
      }
    }
  };

  return (
    <div className="md:grid md:grid-cols-3 xl:grid-cols-4 mt-4">
      <aside className="flex flex-col mt-10 md:justify-start items-center md:items-start text-lg tracking-wide mb-4">
        <figure className="mb-4">{renderAvatar()}</figure>
        <p>{currentUser.name || "your name here"}</p>
        {currentUser.hide_email ? null : (
          <p>
            <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
          </p>
        )}

        <p
          data-cy="social-links"
          className="flex gap-4 my-2 text-2xl hover:fill-cyan-700"
        >
          {githubLink}
          {linkedinLink}
          {twitterLink}
        </p>
        <div className="mt-6">
          <Link className="flex items-center gap-2" to="/profile/edit">
            <Button>
              <MdEdit className="text-2xl" /> Edit Profile
            </Button>
          </Link>
        </div>
        <div className="mt-6">
          <Button onClick={handleProfileDelete}>
            <BsTrashFill className="text-2xl" /> Delete Profile
          </Button>
        </div>
      </aside>
      <section className="px-0 md:col-span-2 xl:col-span-3 w-full">
        {currentUser.projects?.length ? (
          renderProjects()
        ) : (
          <>
            <h3 className="text-center sm:text-left border-b sm:mt-0 mt-6 w-full">
              No Projects Yet
            </h3>
            <Link
              to="/projects/new"
              className="mt-8 inline-block text-center border py-2 px-4"
            >
              Add your first project
            </Link>
          </>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
