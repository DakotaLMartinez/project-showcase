import React from "react";
import { RxAvatar } from "react-icons/rx";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import ProjectCard from "../components/ProjectCard";

function ProfilePage() {
  const { currentUser } = useAuth();

  const githubLink = currentUser.github_url && (
    <a href={currentUser.github_url} target="_blank" rel="noreferrer">
      <BsGithub className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );

  const linkedinLink = currentUser.linkedin_url && (
    <a href={currentUser.linkedin_url} target="_blank" rel="noreferrer">
      <BsLinkedin className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );

  const twitterLink = currentUser.twitter_url && (
    <a href={currentUser.twitter_url} target="_blank" rel="noreferrer">
      <BsTwitter className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );

  const renderAvatar = () => {
    if (currentUser.avatar_url) {
      return (
        <img
          className="rounded-full w-44 h-44 object-cover"
          src={currentUser.avatar_url}
          alt="Profile picture"
        />
      );
    }
    return <RxAvatar className="text-9xl" />;
  };

  const renderProjects = () => {
    return (
      <>
        <h3 className="text-center sm:text-left border-b mb-4">Projects</h3>
        <section className="px-0 sm:grid sm:grid-cols-2 md:grid-cols-3">
          {currentUser.projects.map((project) => {
            return <ProjectCard project={project} />;
          })}
        </section>
      </>
    );
  };

  return (
    <div className="sm:grid sm:grid-cols-3 xl:grid-cols-4 mt-4">
      <aside className="flex flex-col justify-center items-center sm:items-start text-lg tracking-wide">
        <figure className="mb-4">{renderAvatar()}</figure>
        <p>{currentUser.name || "your name here"}</p>
        {currentUser.hide_email ? null : (
          <p>
            <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
          </p>
        )}

        <p className="flex gap-4 my-2 text-2xl hover:fill-cyan-700">
          {githubLink}
          {linkedinLink}
          {twitterLink}
        </p>
        <div className="mt-6">
          <Link className="flex items-center gap-2" to="/profile/edit">
            <Button>
              <MdEdit as={"button"} className="text-2xl" /> Edit Profile
            </Button>
          </Link>
        </div>
      </aside>
      <section className="px-0 sm:col-span-2 xl:col-span-3">
        {currentUser.projects?.length ? (
          renderProjects()
        ) : (
          <>
            <h3 className="text-center sm:text-left border-b sm:mt-0 mt-6">
              No Projects Yet
            </h3>
            <Link
              to="/projects/new"
              className="w-full mt-4 block text-center border py-2"
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
