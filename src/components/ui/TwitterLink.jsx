import { BsTwitter } from "react-icons/bs";

function TiwtterLink({ url }) {
  return (
    <a data-cy="twitter-link" href={url}>
      <BsTwitter className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default TiwtterLink;
