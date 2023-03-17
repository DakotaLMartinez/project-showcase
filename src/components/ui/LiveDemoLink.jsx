import { BiLinkExternal } from "react-icons/bi";

function LiveDemoLink({ url, className="", title="Deployed App" }) {
  return (
    <a className={className} data-cy="livedemo-link" href={url} target="_blank" rel="noreferrer" title={title}>
      <BiLinkExternal className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default LiveDemoLink;
