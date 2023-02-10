import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import classNames from "classnames";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const { isLoggedIn } = useAuth();

  const openLoginForm = () => {
    setIsLoginFormVisible(true);
  };

  const closeLoginForm = () => {
    setIsLoginFormVisible(false);
  };

  const loginFormContainerClasses = classNames(
    "absolute right-0 top-0 p-4 z-10 bg-slate-200 shadow-md transition-colors duration-500",
    { hidden: !isLoginFormVisible }
  );

  const profileIconClasses = classNames("text-3xl", {
    "text-slate-300": !isLoggedIn,
    "text-slate-500": isLoggedIn
  });

  return (
    <nav className="bg-slate-50 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <h4 className="px-4 text-slate-800">Project Showcase</h4>
        <NavLink end to="/">
          Home
        </NavLink>
        <NavLink end to="/projects">
          Projects
        </NavLink>
        <NavLink end to="/projects/new">
          New Project
        </NavLink>
        <NavLink end to="/about">
          About
        </NavLink>
      </div>
      <button onClick={openLoginForm} className="mr-2" title="login">
        <RxAvatar className={profileIconClasses} />
      </button>
      <div className={loginFormContainerClasses}>
        <LoginForm onFinish={closeLoginForm} />
      </div>
    </nav>
  );
}

export default Navbar;
