import { useContext, createContext, useState } from "react";
import toast from "react-hot-toast";
import classNames from "classnames";
import { MdOutlineClose } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiErrorCircle } from "react-icons/bi";
import { BsFillCheckSquareFill } from "react-icons/bs";
import { AiFillWarning } from "react-icons/ai";

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    setNotifications((notifications) => [...notifications, notification]);
    notify(notification);
  };

  const notify = ({ type, message }) => {
    toast.custom(
      (t) => (
        <div
          className={classNames([
            "flex flex-row items-center justify-between w-96 shadow-2x transition-all duration-500 relative",
            t.visible ? "top-0" : "-top-96",
            {
              "bg-green-800 text-green-200": type === "success",
              "bg-blue-800 text-blue-200": type === "info",
              "bg-red-800 text-red-200": type === "error",
              "bg-yellow-800 text-yellow-200": type === "warning",
            },
          ])}
        >
          <div className="flex flex-row items-start justify-center ml-4 cursor-default py-4">
            <div className="mr-2">
              {type === "info" && <IoMdNotificationsOutline />}
              {type === "error" && <BiErrorCircle />}
              {type === "success" && <BsFillCheckSquareFill />}
              {type === "warning" && <AiFillWarning />}
            </div>
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
  };


  const currentNotification = notifications[notifications.length - 1] || null;
  const sharedValues = {
    notify,
    addNotification,
    notifications,
    currentNotification
  };

  return (
    <NotificationContext.Provider value={sharedValues}>
      {children}
    </NotificationContext.Provider>
  );
};

const useNotifications = () => {
  const notificationInfo = useContext(NotificationContext);

  if (!notificationInfo) {
    throw new Error("must be used inside of NotificationProvider");
  }

  return notificationInfo;
};

export { useNotifications, NotificationContext };

export default NotificationProvider;
