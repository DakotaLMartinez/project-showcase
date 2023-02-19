import classNames from "classnames";
import { useRef, useState } from "react";
import Tag from "./Tag";

function TagsInput({ state }) {
  const [tags, setTags] = state;
  const input = useRef();
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const onAddTag = (tag) => {
    setTags((tags) => [...tags, tag]);
  };

  const onRemoveTag = (tag) => {
    setTags((tags) => tags.filter((t) => t !== tag));
  };

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onKeyUp = (e) => {
    if (["Enter", ",", "Tab"].includes(e.key)) {
      e.preventDefault();
      if (e.target.value === "") { return }
      if (tags.includes(e.target.value)) {
        setError("must be unique")
      } else {
        onAddTag(e.target.value.trim());
        setText("");
      }
    } else {
      setError("");
    }
  };

  const onKeyDown = (e) => {
    if (["Enter",",","Tab","Backspace"].includes(e.key)) {
      if (e.key === "Backspace") {
        e.target.value === "" && tags.length && onRemoveTag(tags[tags.length -1])
      } else {
        e.preventDefault();
      }
    }
  };

  const onClick = (e) => {
    input.current.focus();
  };

  const inputClassNames = classNames(
    "ml-2 py-2 my-2",
    "bg-transparent items-center border-none focus:outline-none"
  );

  return (
    <>
    <div className="border p-2 flex flex-wrap items-start" onClick={onClick}>
        {tags.map(tag => (
          <Tag key={tag} label={tag} onRemoveTag={onRemoveTag} />
      ))}
      <input
        ref={input}
        type="text"
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        onChange={onChange}
        className={inputClassNames}
        value={text}
      />
      </div>
      <p className="text-red-400">{error}</p>
    </>
  );
}

export default TagsInput;
