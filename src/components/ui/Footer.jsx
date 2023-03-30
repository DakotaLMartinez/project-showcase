import React from "react";
import { FaDiscord } from "react-icons/fa"
import GitHubLink from "./GitHubLink";
import LinkedInLink from "./LinkedInLink";
import TiwtterLink from "./TwitterLink";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-20">
      <div className="container mx-auto">
        <div className="flex justify-center mb-4 text-3xl">
          <GitHubLink
            url="https://github.com/DakotaLMartinez/project-showcase"
            className="mr-4"
          />
          <LinkedInLink
            url="https://www.linkedin.com/in/dakota-lee-martinez/"
            className="mr-4"
          />
          <TiwtterLink
            url="https://twitter.com/dakotaleedev"
            className="mr-2"
          />
          <a
            href="https://discord.gg/PvPcaTFmKm"
            target="_blank"
            rel="noreferrer"
            className=""
          >
            <FaDiscord className="fill-amber-50 hover:fill-amber-200 transition text-4xl relative -top-0.5" />
          </a>
        </div>
        <p className="text-center text-gray-500 text-sm">
          © 2023 Developer Showcase App. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
