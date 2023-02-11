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
