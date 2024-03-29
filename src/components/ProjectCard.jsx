import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button from "./ui/Button";
import GitHubLink from "./ui/GitHubLink";

function ProjectCard({ project, small = false }) {
  const { id, name, about, code_url, featured_image_url } = project;

  const aboutClasses = classNames("mt-2 whitespace-normal", {
    "sm:h-12 md:h-20": small,
    "sm:h-20 md:h-24 lg:h-20": !small,
  });

  const placeHolderImageClasses = classNames("max-w-full py-4 object-cover", {
    "px-2 md:px-0 md:h-40 lg:h-44": small,
    "sm:h-56 md:h-44 lg:h-52": !small,
  });

  const featuredImageClasses = classNames("object-cover", {
    "md:h-40 lg:h-44": small,
    "sm:h-56 md:h-44 lg:h-52": !small,
  });

  const shortAboutText = about.slice(0, small ? 74 : 84);
  const aboutText =
    shortAboutText === about ? about : `${shortAboutText.trim()}...`;

  const renderPictureOrFallback = (imgUrl) => {
    return imgUrl ? renderFeaturedImage(imgUrl) : renderPlaceholder();
  };

  const renderPlaceholder = () => {
    return (
      <img
        className={placeHolderImageClasses}
        src="https://via.placeholder.com/850x450?text=No%20Image"
      />
    );
  };

  const renderFeaturedImage = (imgUrl) => {
    return (
      <img className={featuredImageClasses} src={imgUrl} alt="Featured Image" />
    );
  };

  return (
    <article className="flex flex-col h-full justify-between border-slate-50 border rounded-lg shadow-black shadow-md bg-slate-900 text-slate-100">
      <div className="px-4 pt-2">
        <figure className="flex justify-center">
          {renderPictureOrFallback(featured_image_url)}
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
        {code_url && (<div className="text-3xl pr-2">
          <GitHubLink url={code_url} />
        </div>)}
      </footer>
    </article>
  );
}

export default ProjectCard;
