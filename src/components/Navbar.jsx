import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import classNames from "classnames";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import ProfileMenu from "./ProfileMenu";

function Navbar() {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [isSignupFormVisible, setIsSignupFormVisible] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const { isLoggedIn } = useAuth();

  const openLoginForm = () => {
    setIsLoginFormVisible(true);
    setIsSignupFormVisible(false);
  };

  const closeLoginForm = () => {
    setIsLoginFormVisible(false);
  };

  const loginFormContainerClasses = classNames(
    "absolute right-0 p-4 z-10 bg-slate-200 shadow-md transition-all duration-500 ease-in-out",
    {
      "top-0": isLoginFormVisible,
      "-top-96": !isLoginFormVisible,
    }
  );

  const openSignupForm = () => {
    setIsSignupFormVisible(true);
    setIsLoginFormVisible(false);
  };

  const closeSignupForm = () => {
    setIsSignupFormVisible(false);
  };

  const signupFormContainerClasses = classNames(
    "absolute right-0 p-4 z-10 bg-slate-200 shadow-md transition-all duration-500 ease-in-out",
    {
      "top-0": isSignupFormVisible,
      "-top-96": !isSignupFormVisible,
    }
  );

  const openProfileMenu = () => {
    setIsProfileMenuVisible(true);
  };

  const closeProfileMenu = () => {
    setIsProfileMenuVisible(false);
  };

  const profileMenuContainerClasses = classNames(
    "absolute right-0 p-4 z-10 bg-slate-200 text-slate-800 shadow-md transition-all duration-500 ease-in-out",
    {
      "top-0": isProfileMenuVisible,
      "-top-96": !isProfileMenuVisible,
    }
  );

  const profileIconClasses = classNames("text-3xl", {
    "text-slate-300": !isLoggedIn,
    "text-slate-500": isLoggedIn,
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
        <NavLink end to="/profile">
          Profile
        </NavLink>
        <NavLink end to="/about">
          About
        </NavLink>
      </div>

      {!isLoggedIn ? (
        <div className="flex justify-between w-40 mx-4">
          <Button primary onClick={openSignupForm}>
            Signup
          </Button>
          <Button outline secondary onClick={openLoginForm}>
            Login
          </Button>
        </div>
      ) : (
        <button onClick={openProfileMenu} className="mr-2" title="login">
          <RxAvatar className={profileIconClasses} />
        </button>
      )}
      <div className={loginFormContainerClasses}>
        <LoginForm onFinish={closeLoginForm} />
      </div>
      <div className={signupFormContainerClasses}>
        <SignupForm onFinish={closeSignupForm} />
      </div>
      <div className={profileMenuContainerClasses}>
        {isLoggedIn && <ProfileMenu onFinish={closeProfileMenu} />}
      </div>
    </nav>
  );
}

export default Navbar;
