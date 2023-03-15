import { BiLinkExternal } from "react-icons/bi";

function LiveDemoLink({ url, title="Deployed App" }) {
  return (
    <a data-cy="livedemo-link" href={url} target="_blank" rel="noreferrer" title={title}>
      <BiLinkExternal className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default LiveDemoLink;
