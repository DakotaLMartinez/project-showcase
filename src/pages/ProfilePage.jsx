import React from "react";
import { RxAvatar } from "react-icons/rx";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import ProjectCard from "../components/ProjectCard";
import GitHubLink from "../components/ui/GitHubLink";
import LinkedInLink from "../components/ui/LinkedInLink";
import TiwtterLink from "../components/ui/TwitterLink";

function ProfilePage() {
  const { currentUser } = useAuth();

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
        <h3 className="text-center md:text-left md:border-b mb-4">Projects</h3>
        <section className="px-0 md:grid md:grid-cols-2 xl:grid-cols-3 gap-2">
          {currentUser.projects.map((project) => {
            return <ProjectCard key={project.id} small project={project} />;
          })}
        </section>
      </>
    );
  };

  return (
    <div className="md:grid md:grid-cols-3 xl:grid-cols-4 mt-4">
      <aside className="flex flex-col justify-center items-center md:items-start text-lg tracking-wide mb-4">
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
