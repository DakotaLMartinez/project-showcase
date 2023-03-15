import { BsGithub } from "react-icons/bs";

function GitHubLink({ url, title="View Code" }) {
  return (
    <a data-cy="github-link" href={url} target="_blank" rel="noreferrer" title={title}>
      <BsGithub className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default GitHubLink;
