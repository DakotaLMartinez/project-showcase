import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";

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
  technologies: yup.string(),
  collaborators: yup.string(),
  live_demo_url: yup.string().url().nullable(),
  code_url: yup.string().url().nullable(),
  video_url: yup.string().url().nullable(),
});

function ProjectsNewPage() {
  const navigate = useNavigate();
  const { addProject, token } = useAuth();
  const { notify } = useNotifications();
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      name: "Appointment Tracker",
      about:
        "A rails 6 application that can track appointments with multiple clients in multiple locations. ",
      technologies: "Ruby on Rails, HTML, CSS, Ruby, RSpec, Capybara",
      collaborators: "Joe Schmoe, Jane Doe",
      live_demo_url: "https://rails-appointments.dakotaleemartinez.com",
      code_url: "https://github.com/DakotaLMartinez/rails-appointments",
      video_url: "https://www.youtube.com/watch?v=rJK_NEU-Qg0",
    },
    resolver: yupResolver(schema),
  });

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
    data.technologies.trim().split(',').forEach(technology => {
      formData.append("technologies[]", technology.trim());
    })
    data.collaborators.trim().split(',').forEach(collaborator => {
      formData.append("collaborators[]", collaborator.trim());
    })
    
    console.log(formData);
    console.log(data);
    try {   
      const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: "POST",
        headers: {
          "Authorization": token
        },
        body: formData,
      });
      if (response.ok) {
        const project = await response.json();
        addProject(project);
        navigate("/profile")
      } else {
        const error = await response.json();
        notify({
          type: "error", message: error.message
        })
      }
    } catch (error) {
      
    }
  };

  const inputClasses = (inputName) => {
    return classNames(
      "border outline-none focus:ring px-2 text-slate-700",
      {
        "border-red-400 focus:border-red-400 ring-red-400": errors[inputName],
        "border-slate-400 focus:border-slate-400 ring-slate-400":
          !errors[inputName],
        "h-12": inputName !== "about",
        "h-24 py-2": ["about"].includes(inputName),
        "h-16 py-2": ["technologies", "collaborators"].includes(inputName)
      }
    );
  };

  const renderError = ({ message }) => (
    <p className="text-sm text-red-300">{message}</p>
  );

  const renderImage = () => {
    let file = featured_image && featured_image[0];
    let imgUrl = file && URL.createObjectURL(file);
    const validTypes = ["image/jpeg", "image/png"];

    if (!file) {
      return renderPlaceholder();
    }
    if (!validTypes.includes(file.type)) {
      return (
        <>
          {renderPlaceholder()}
          <span>File must be a jpeg or png formatted image</span>
        </>
      );
    }
    return (
      <>
        {renderFeaturedImage(imgUrl)}
        <span>{file.name}</span>
      </>
    );
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
      <h1 className="text-center mb-2">New Project</h1>
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
          <textarea
            {...register("technologies")}
            className={inputClasses("technologies")}
            placeholder="HTML, CSS, Javascript"
          ></textarea>
          <div className="h-2">
            <ErrorMessage errors={errors} name="technologies" render={renderError} />
          </div>
        </label>
        
        <label className="flex flex-col gap-1">
          <span>Collaborators</span>
          <textarea
            {...register("collaborators")}
            className={inputClasses("collaborators")}
            placeholder="Joe Schmoe, Jane Doe"
          ></textarea>
      
          <div className="h-2">
            <ErrorMessage errors={errors} name="collaborators" render={renderError} />
          </div>
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

export default ProjectsNewPage;
