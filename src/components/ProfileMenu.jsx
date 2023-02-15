import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

function ProfileMenu({ onFinish }) {
  const { currentUser, logout } = useAuth();
  const { notify } = useNotifications();
  const element = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!element.current) {
        return;
      }
      if (!element.current.contains(event.target)) {
        onFinish();
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler, true);
    };
  }, []);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleLogout = (e) => {
    logout().then((message) => {
      onFinish();
      setTimeout(() => {
        notify(message);
      }, 200)
    });
  };

  return (
    <div className="w-44 flex flex-col" onClick={handleClick} ref={element}>
      <h6 className="border-b-2 border-slate-300">
        Signed in as <strong>{currentUser?.email}</strong>
      </h6>
      <div className="sm:hidden flex flex-col border-b border-slate-400 my-2 ">
        <Link onClick={onFinish} to="/">
            Home
        </Link>
        <Link onClick={onFinish} to="/projects">
          Projects
        </Link>
        <Link onClick={onFinish} to="/profile">
          Profile
        </Link>
        <Link onClick={onFinish} className="mb-2" to="/about">
          About
        </Link>
      </div>
      <Link to="/profile" onClick={onFinish}>
        View Profile
      </Link>
      <Link to="/" onClick={handleLogout}>
        Log out
      </Link>
    </div>
  );
}

export default ProfileMenu;
