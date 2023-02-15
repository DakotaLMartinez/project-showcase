import React from "react";
import { RxAvatar } from "react-icons/rx";
import { BsLinkedin, BsTwitter, BsGithub } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

function ProfilePage() {
  const { currentUser } = useAuth();

  const socialLinks = [];
  currentUser.github_url &&
    socialLinks.push(
      <BsGithub className="fill-amber-50 hover:fill-amber-200 transition" />
    );
  currentUser.linkedin_url &&
    socialLinks.push(
      <BsLinkedin className="fill-amber-50 hover:fill-amber-200 transition" />
    );
  currentUser.twitter_url &&
    socialLinks.push(
      <BsTwitter className="fill-amber-50 hover:fill-amber-200 transition" />
    );

  const renderedLinks = socialLinks.map((link) => {
    return <a href="#">{link}</a>;
  });

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
        <h3 className="text-center sm:text-left border-b">Projects</h3>
        <section className="sm:grid sm:grid-cols-2 md:grid-cols-3">
          {currentUser.projects.map((project) => {
            return (
              <article key={project.id}>
                <h3>{project.name}</h3>
                <img src={project.imageUrl} />
              </article>
            );
          })}
        </section>
      </>
    );
  };

  return (
    <div className="sm:grid sm:grid-cols-3 mt-4">
      <aside className="flex flex-col justify-center items-center sm:items-start text-lg tracking-wide">
        <figure className="mb-4">{renderAvatar()}</figure>
        <p>{currentUser.name || "your name here"}</p>
        {currentUser.hide_email ? null : (
          <p>
            <a href={`mailto:${currentUser.email}`}>{currentUser.email}</a>
          </p>
        )}

        <p className="flex gap-4 my-2 text-2xl hover:fill-cyan-700">
          {renderedLinks}
        </p>
        <div className="mt-6">
          <Link className="flex items-center gap-2" to="/profile/edit">
            <Button>
              <MdEdit as={"button"} className="text-2xl" /> Edit Profile
            </Button>
          </Link>
        </div>
      </aside>
      <section className="sm:col-span-2">
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
