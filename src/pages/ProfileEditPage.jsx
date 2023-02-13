import classNames from "classnames";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

function ProfileEditPage() {
  const { currentUser } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: currentUser,
  });
  

  const onSubmit = (data) => {

  }

  const inputClasses = classNames(
    "h-12 border outline-none focus:ring focus:border-slate-400",
    "px-2 text-slate-700"
  )

  console.log(currentUser.email);

  return (
    <section>
      <h1 className="text-center">Edit Profile</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <label className="flex flex-col gap-1">
          <span>Name</span>
          <input
            {...register("name")}
            type="text"
            placeholder="Your name here"
            className={inputClasses}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            {...register("email")}
            type="text"
            placeholder="Your name here"
            className={inputClasses}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>LinkedIn Profile URL</span>
          <input
            {...register("linkedin_url")}
            type="text"
            placeholder="https://linkedin.com/in/your-profile"
            className={inputClasses}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>GitHub Profile URL</span>
          <input
            {...register("linkedin_url")}
            type="text"
            placeholder="https://github.com/your-github-username"
            className={inputClasses}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span>Twitter Profile URL</span>
          <input
            {...register("twitter_url")}
            type="text"
            placeholder="https://twitter.com/your-twitter-handle"
            className={inputClasses}
          />
        </label>
      </form>
    </section>
  );
}

export default ProfileEditPage;
