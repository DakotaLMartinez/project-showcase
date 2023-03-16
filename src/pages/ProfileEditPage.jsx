import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import { FaRegSave, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

import Avatar from "../components/ui/Avatar";
import AvatarPlaceholder from "../components/ui/AvatarPlaceholder";

const schema = yup.object().shape({
  avatar: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      return !value || !value[0] || value[0]?.size <= 2000000;
    })
    .test("type", "We only support jpeg or png files", (value) => {
      return (
        !value ||
        !value[0] ||
        ["image/jpeg", "image/png"].includes(value[0]?.type)
      );
    })
    .nullable(),
  name: yup.string(),
  email: yup.string().required().email("must be valid"),
  linkedin_url: yup
    .string()
    .matches(/^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)/gim, {
      excludeEmptyString: true,
      message: "must be a valid linkedin profile url",
    }),
  github_url: yup
    .string()
    .matches(/^(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_]{1,25}$/gim, {
      excludeEmptyString: true,
      message: "must be a valid github profile url",
    }),
  twitter_url: yup
    .string()
    .matches(/^(https?:\/\/)?(www\.)?twitter\.com\/[a-zA-Z0-9_]{1,25}$/gim, {
      excludeEmptyString: true,
      message: "must be a valid twitter profile URL",
    }),
});

function ProfileEditPage() {
  const navigate = useNavigate();
  const { currentUser, updateProfile } = useAuth();
  const { notify } = useNotifications();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      avatar: "",
      name: currentUser.name || "",
      email: currentUser.email,
      hide_email: currentUser.hide_email,
      linkedin_url: currentUser.linkedin_url || "",
      github_url: currentUser.github_url || "",
      twitter_url: currentUser.twitter_url || "",
    },
    resolver: yupResolver(schema),
  });

  const avatar = watch("avatar");

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (avatar && avatar[0]) {
      formData.append("avatar", avatar[0]);
    } else if (avatar === null) {
      formData.append("purge_avatar", true);
    }
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("hide_email", data.hide_email);
    formData.append("linkedin_url", data.linkedin_url);
    formData.append("github_url", data.github_url);
    formData.append("twitter_url", data.twitter_url);
    updateProfile(formData)
      .then((user) => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error(error);
        notify({
          type: "error",
          message: error.message,
        });
      });
  };

  const inputClasses = (inputName) => {
    return classNames(
      "h-12 border outline-none focus:ring px-2 text-slate-700",
      {
        "border-red-400 focus:border-red-400 ring-red-400": errors[inputName],
        "border-slate-400 focus:border-slate-400 ring-slate-400":
          !errors[inputName],
      }
    );
  };

  const renderError = ({ message }) => (
    <p className="text-sm text-red-300">{message}</p>
  );

  const renderAvatar = () => {
    let imgUrl = currentUser.avatar_url;
    let file = avatar && avatar[0];
    const validTypes = ["image/jpeg", "image/png"];

    if (!file) {
      return renderProfilePicOrFallback(imgUrl);
    }
    if (!validTypes.includes(file.type)) {
      return (
        <>
          {renderProfilePicOrFallback(imgUrl)}
          <span>File must be a jpeg or png formatted image</span>
        </>
      );
    }
    imgUrl = URL.createObjectURL(avatar[0]);
    return (
      <>
        <Avatar src={imgUrl} />
        <span>{file.name}</span>
      </>
    );
  };

  const renderProfilePicOrFallback = (imgUrl) => {
    return imgUrl ? (
      <Avatar src={imgUrl} />
    ) : (
      <AvatarPlaceholder className="text-9xl" />
    );
  };

  const handleDeleteProfilePic = (e) => {
    e.preventDefault();
    setValue("avatar", null);
  };

  console.log(errors);

  return (
    <section>
      <h1 className="text-center mb-2">Edit Profile</h1>
      <form
        id="editProfile"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <div className="w-44 mt-2 mx-auto relative">
          <button
            data-cy="delete-avatar"
            type="button"
            className="absolute top-0 right-0"
            onClick={handleDeleteProfilePic}
          >
            <FaTrash />
          </button>
          <label className="flex flex-col gap-2 cursor-pointer items-center">
            <input
              type="file"
              accept="image"
              {...register("avatar")}
              className="hidden"
            />
            {renderAvatar()}
            <span className="underline">Update Profile Picture</span>
            <div className="h-2">
              <ErrorMessage
                errors={errors}
                name="avatar"
                render={renderError}
              />
            </div>
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span>Name</span>
          <input
            {...register("name")}
            type="text"
            placeholder="Your name here"
            className={inputClasses("name")}
          />
          <div className="h-2">
            <ErrorMessage errors={errors} name="name" render={renderError} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span>Email</span>
          <input
            {...register("email", {
              required: true,
            })}
            type="text"
            placeholder="Your email here"
            className={inputClasses("email")}
          />
          <div className="h-2">
            <ErrorMessage errors={errors} name="email" render={renderError} />
          </div>
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            {...register("hide_email")}
            type="checkbox"
            className={`h-8 justify-items-start`}
          />
          <span>Hide email in public profile</span>
        </label>
        <label className="flex flex-col gap-1">
          <span>LinkedIn Profile URL</span>
          <input
            {...register("linkedin_url")}
            type="text"
            placeholder="https://linkedin.com/in/your-profile"
            className={inputClasses("linkedin_url")}
          />
          <div className="h-2">
            <ErrorMessage
              errors={errors}
              name="linkedin_url"
              render={renderError}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <span>GitHub Profile URL</span>
          <input
            {...register("github_url")}
            type="text"
            placeholder="https://github.com/your-github-username"
            className={inputClasses("github_url")}
          />
          <div className="h-2">
            <ErrorMessage
              errors={errors}
              name="github_url"
              render={renderError}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <span>Twitter Profile URL</span>
          <input
            {...register("twitter_url")}
            type="text"
            placeholder="https://twitter.com/your-twitter-handle"
            className={inputClasses("twitter_url")}
          />
          <div className="h-2">
            <ErrorMessage
              errors={errors}
              name="twitter_url"
              render={renderError}
            />
          </div>
        </label>
        <div className="flex gap-2">
          <Link
            to="/profile"
            className="w-1/2 cursor-pointer flex justify-center items-center gap-2 text-center py-2 border mt-6 hover:bg-slate-600 transition"
          >
            Cancel
          </Link>
          <button className="w-1/2 cursor-pointer flex justify-center items-center gap-2 text-center py-2 border mt-6 bg-green-200 text-slate-600 hover:bg-green-300 transition">
            <FaRegSave /> Save Profile
          </button>
        </div>
      </form>
    </section>
  );
}

export default ProfileEditPage;
