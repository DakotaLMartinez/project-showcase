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

  const renderProjects = () => {
    return (
      <>
        <h1>Projects</h1>
        <section className="sm:grid sm:grid-cols-2 md:grid-cols-3">
          {currentUser.projects.map((project) => {
            return (
              <article>
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
    <div className="sm:grid sm:grid-cols-3">
      <aside className="flex flex-col justify-center items-center sm:items-start text-lg tracking-wide">
        <RxAvatar className="text-9xl" />
        <p>Name: </p>
        <p>Email: {currentUser.email}</p>

        <p className="flex gap-4 mt-2 text-2xl hover:fill-cyan-700">
          {renderedLinks}
        </p>
        <div className="">
          <Link className="flex items-center gap-2" to="/profile/edit">
            <Button>
              <MdEdit as={"button"} className="text-2xl" /> Edit Profile
            </Button>
          </Link>
        </div>
      </aside>
      <section className="col-span-2">
        {currentUser.projects?.length ? (
          renderProjects()
        ) : (
          <h3>No Projects Yet</h3>
        )}
      </section>
    </div>
  );
}

export default ProfilePage;
