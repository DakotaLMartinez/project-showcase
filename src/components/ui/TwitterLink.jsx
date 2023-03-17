import { BsTwitter } from "react-icons/bs";

function TiwtterLink({ url, className="" }) {
  return (
    <a className={className} data-cy="twitter-link" href={url}>
      <BsTwitter className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default TiwtterLink;
