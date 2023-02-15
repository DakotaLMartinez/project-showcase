import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

function LoginForm({ onFinish }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useAuth();
  const { notify } = useNotifications();

  const onSubmit = (credentials) => {
    login(credentials)
      .then((message) => {
        notify(message);
        onFinish();
        navigate("/profile")
      })
      .catch(notify)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-slate-700">
      <h2 className="text-center mb-2">Login</h2>
      <label className="relative block mb-2">
        <span className="sr-only">Email address</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <HiOutlineMail className="h-5 w-5" />
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="your@email.com"
          type="text"
          {...register("email")}
        />
      </label>
      <label className="relative block mb-4">
        <span className="sr-only">Password...</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <RiLockPasswordLine className="h-5 w-5" />
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="***"
          type="password"
          {...register("password")}
        />
      </label>
      <div className="flex justify-between">
        <input
          type="submit"
          className="cursor-pointer bg-slate-700 rounded-md py-1 px-6 text-white"
        />
        <button type="button" onClick={onFinish} className="bg-slate-200 rounded-md py-1 px-6 text-slate-700 border border-slate-700">
          Cancel
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
