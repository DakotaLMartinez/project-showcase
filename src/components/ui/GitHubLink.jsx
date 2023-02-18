import { BsGithub } from "react-icons/bs";

function GitHubLink({ url }) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <BsGithub className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default GitHubLink;
