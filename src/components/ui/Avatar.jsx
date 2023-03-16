import classNames from "classnames";
import React from "react";

function Avatar({ src, className }) {
  const classes = classNames("rounded-full w-44 h-44 object-cover", className);
  return (
    <img
      data-cy="avatar"
      className={classes}
      src={src}
      alt="Profile picture"
    />
  );
}

export default Avatar;
