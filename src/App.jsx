import "./App.css";
import { NavLink, Routes, Route } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import classNames from "classnames";
import toast, { Toaster } from "react-hot-toast";
import { MdOutlineClose } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useEffect } from "react";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import Navbar from "./components/Navbar";
import { useAuth } from "./context/AuthContext";

const notify = (message) =>
  toast.custom(
    (t) => (
      <div
        className={classNames([
          "flex flex-row items-center justify-between w-96 shadow-2xl bg-slate-700 text-slate-100 transition-all duration-500 relative",
          t.visible ? "top-0" : "-top-96",
        ])}
      >
        <div className="flex flex-col items-start justify-center ml-4 cursor-default py-4">
          <IoMdNotificationsOutline />
          <h1 className="text-base text-slate-200 font-semibold leading-none tracking-wider">
            {message}
          </h1>
        </div>
        <div
          className="absolute top-2 right-2 cursor-pointer text-lg"
          onClick={() => toast.dismiss(t.id)}
        >
          <MdOutlineClose />
        </div>
      </div>
    ),
    { id: "authentication-notice", position: "top-center" }
  );

function App() {
  const { authMessage } = useAuth();
  useEffect(() => {
    if (authMessage !== null) {
      notify(authMessage);
    }
  }, [authMessage]);
  return (
    <>
      <Navbar />
      <Toaster
        containerStyle={{
          top: 72,
          left: 40,
          bottom: 40,
          right: 40,
        }}
      />

      <section className="max-w-6xl mx-auto py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/*" element={<ProjectsPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </section>
    </>
  );
}

export default App;
