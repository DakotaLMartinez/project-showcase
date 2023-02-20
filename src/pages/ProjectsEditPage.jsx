import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import TagsInput from "../components/ui/TagsInput";

const schema = yup.object().shape({
  featured_image: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      return !value[0] || value[0]?.size <= 2000000;
    })
    .test("type", "We only support jpeg or png files", (value) => {
      return !value[0] || ["image/jpeg", "image/png"].includes(value[0]?.type);
    }),
  name: yup.string().required(),
  about: yup.string().required(),
  live_demo_url: yup.string().url().nullable(),
  code_url: yup.string().url().nullable(),
  video_url: yup.string().url().nullable(),
});

function ProjectsEditPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser, updateProject, token } = useAuth();
  const { notify } = useNotifications();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: async () =>
      (await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`)).json(),
    resolver: yupResolver(schema),
  });
  const project = currentUser.projects.find((p) => p.id === parseInt(id));
  const [technologies, setTechnologies] = useState(project.technologies);
  const [collaborators, setCollaborators] = useState(project.collaborators);


  if (!project) {
    navigate(-1);
    notify({
      type: "error",
      message: "Can't edit a project that doesn't belong to you",
    });
    return <div></div>;
  }

  const featured_image = watch("featured_image");

  const onSubmit = async (data) => {
    const formData = new FormData();
    if (featured_image && featured_image[0]) {
      formData.append("featured_image", featured_image[0]);
    }
    formData.append("name", data.name);
    formData.append("about", data.about);
    formData.append("live_demo_url", data.live_demo_url);
    formData.append("code_url", data.code_url);
    formData.append("video_url", data.video_url);
    technologies.forEach((technology) => {
      formData.append("technologies[]", technology);
    });
    collaborators.forEach((collaborator) => {
      formData.append("collaborators[]", collaborator);
    });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: "PATCH",
        headers: {
          Authorization: token,
        },
        body: formData,
      });
      if (response.ok) {
        const project = await response.json();
        updateProject(project);
        navigate(`/projects/${id}`);
      } else {
        const error = await response.json();
        notify({
          type: "error",
          message: error.message,
        });
      }
    } catch (error) {
      console.error(error);
      notify({
        type: "error",
        message: "Something wen't wrong"
      });
    }
  };

  const inputClasses = (inputName) => {
    return classNames("border outline-none focus:ring px-2 text-slate-700", {
      "border-red-400 focus:border-red-400 ring-red-400": errors[inputName],
      "border-slate-400 focus:border-slate-400 ring-slate-400":
        !errors[inputName],
      "h-12": inputName !== "about",
      "h-24 py-2": ["about"].includes(inputName),
      "h-16 py-2": ["technologies", "collaborators"].includes(inputName),
    });
  };

  const renderError = ({ message }) => (
    <p className="text-sm text-red-300">{message}</p>
  );

  const renderImage = () => {
    let imgUrl = project.featured_image_url;
    let file = featured_image && featured_image[0];
    const validTypes = ["image/jpeg", "image/png"];

    if (!file) {
      return renderPictureOrFallback(imgUrl);
    }
    if (!validTypes.includes(file.type)) {
      return (
        <>
          {renderPictureOrFallback(imgUrl)}
          <span>File must be a jpeg or png formatted image</span>
        </>
      );
    }
    imgUrl = URL.createObjectURL(file);
    return (
      <>
        {renderFeaturedImage(imgUrl)}
        <span>{file.name}</span>
      </>
    );
  };

  const renderPictureOrFallback = (imgUrl) => {
    return imgUrl ? renderFeaturedImage(imgUrl) : renderPlaceholder();
  };

  const renderPlaceholder = () => {
    return (
      <img src="https://via.placeholder.com/384x224?text=Your%20Featured%20Image" />
    );
  };

  const renderFeaturedImage = (imgUrl) => {
    return (
      <img
        className="w-96 h-56 object-cover"
        src={imgUrl}
        alt="Featured Image"
      />
    );
  };

  return (
    <section>
      <h1 className="text-center mb-2">Edit Your Project</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-lg mx-auto"
      >
        <label className="flex flex-col gap-2 cursor-pointer items-center">
          <input
            type="file"
            accept="image"
            {...register("featured_image")}
            className="hidden"
          />
          {renderImage()}
          <span className="underline">Update Featured Image</span>
          <div className="h-2">
            <ErrorMessage
              errors={errors}
              name="featured_image"
              render={renderError}
            />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span>Project Name</span>
          <input
            {...register("name")}
            type="text"
            placeholder="Project name here"
            className={inputClasses("name")}
          />
          <div className="h-2">
            <ErrorMessage errors={errors} name="name" render={renderError} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span>About</span>
          <textarea
            {...register("about")}
            type="text"
            placeholder="app that does something awesome"
            className={inputClasses("about")}
          />
          <div className="h-2">
            <ErrorMessage errors={errors} name="about" render={renderError} />
          </div>
        </label>

        <label className="flex flex-col gap-1">
          <span>Technologies</span>
          <TagsInput state={[technologies, setTechnologies]} />
        </label>

        <label className="flex flex-col gap-1">
          <span>Collaborators</span>
          <TagsInput state={[collaborators, setCollaborators]} />
        </label>

        <label className="flex flex-col gap-1">
          <span>Live Project URL</span>
          <input
            {...register("live_demo_url")}
            type="text"
            placeholder="https://mycoolproject.netlify.app"
            className={inputClasses("live_demo_url")}
          />
          <div className="h-2">
            <ErrorMessage
              errors={errors}
              name="live_demo_url"
              render={renderError}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <span>Code URL</span>
          <input
            {...register("code_url")}
            type="text"
            placeholder="https://github.com/my-username/my-repo"
            className={inputClasses("code_url")}
          />
          <div className="h-2">
            <ErrorMessage
              errors={errors}
              name="code_url"
              render={renderError}
            />
          </div>
        </label>
        <label className="flex flex-col gap-1">
          <span>Video Demo URL</span>
          <input
            {...register("video_url")}
            type="text"
            placeholder="https://youtube.com/watch?v=myVideoID"
            className={inputClasses("video_url")}
          />
          <div className="h-2">
            <ErrorMessage
              errors={errors}
              name="video_url"
              render={renderError}
            />
          </div>
        </label>
        <button className="w-full cursor-pointer flex justify-center items-center gap-2 text-center py-2 border mt-6 hover:bg-slate-600 transition">
          <FaRegSave /> Save Project
        </button>
      </form>
    </section>
  );
}

export default ProjectsEditPage;
