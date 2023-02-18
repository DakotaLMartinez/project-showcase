import { BsLinkedin } from "react-icons/bs";

function LinkedInLink({ url }) {
  return (
    <a href={url}>
      <BsLinkedin className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default LinkedInLink;
