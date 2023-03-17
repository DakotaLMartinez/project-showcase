import { RiMovieFill } from "react-icons/ri";

function VideoLink({ url, className="", title="Video" }) {
  return (
    <a className={className} data-cy="video-link" href={url} target="_blank" rel="noreferrer" title={title}>
      <RiMovieFill className="fill-amber-50 hover:fill-amber-200 transition" />
    </a>
  );
}

export default VideoLink;
