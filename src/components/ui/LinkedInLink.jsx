import { BsLinkedin } from "react-icons/bs";

function LinkedInLink({ url, className="" }) {
  return (
    <a data-cy="linkedin-link" href={url} className={className}>
      <BsLinkedin className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default LinkedInLink;
