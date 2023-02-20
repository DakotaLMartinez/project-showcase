import React from "react";
import { AiFillCloseCircle } from "react-icons/ai";


function Tag({ label, onRemoveTag }) {
  return (
    <span
      className="py-2 px-3 mx-1 my-2 flex items-center rounded-full bg-slate-50 text-slate-800"
    >
      {label}
      <button type="button" onClick={(e) => {
        e.preventDefault();
        onRemoveTag(label)
      }} className="ml-1 text-xl">
        <AiFillCloseCircle />
      </button>
    </span>
  );
}

export default Tag;
