import React from "react";

function HomePage() {
  return (
    <div className="py-4 sm:py-8 mt-6">
      <div className="min-h-80v grid text-center items-center justify-center py-4 px-8">
        <h1 className="text-5xl">Showcase Your Best Work as a Developer</h1>
        <section className="mt-6 grid gap-8 md:grid-cols-3 px-0">
          <div className="md:col-span-2 flex items-center justify-center text-3xl">
            Welcome to our platform for developers to showcase their projects
            and connect with other like-minded developers. Join our community of
            tech enthusiasts, show off your coding skills, and get discovered by
            potential collaborators and employers.
          </div>
          <div>
            <figure className="flex justify-center">
              <img src="https://res.cloudinary.com/dnocv6uwb/image/upload/c_scale,h_300/v1679005000/project-showcase-app/DALL_E_2023-03-16_15.15.06_-_Generate_an_image_of_a_young_woman_in_intricately_decorated_wizard_s_robes_with_purple_coloring_stars_and_silver_streaks._Cinematic_lighting._Woman_l.png" />
            </figure>
          </div>
        </section>
      </div>
      <div className="bg-black min-h-85v grid text-center items-center justify-center py-4 px-8">
        <h1 className="text-5xl">Create Your Developer Profile</h1>
        <section className="mt-6 grid gap-8 md:grid-cols-3 px-0">
          <div>
            <figure className="">
              <img src="https://res.cloudinary.com/dnocv6uwb/image/upload/c_scale,w_334/v1679008890/project-showcase-app/DALL_E_2023-03-16_16.19.24_-_Generate_an_image_of_a_young_woman_in_intricately_decorated_wizard_s_robes_with_purple_coloring_stars_and_silver_streaks._Cinematic_lighting._Woman_l.png" />
            </figure>
          </div>
          <div className="md:col-span-2 flex items-center justify-center text-3xl">
            Create a profile that showcases your coding skills, projects, and
            achievements. Add your social media links and portfolio to help
            potential collaborators and employers find you.
          </div>
        </section>
      </div>
      <div className="min-h-85v grid text-center items-center justify-center py-4 px-8">
        <h1 className="text-5xl">Showcase Your Projects</h1>
        <section className="mt-6 grid gap-8 md:grid-cols-3 px-0">
          <div className="md:col-span-2 flex items-center justify-center text-3xl">
            Upload links to your projects, including the code, deployed site,
            the technologies used, and the people you collaborated with. Share
            your thought process, inspiration, and challenges you faced while
            building your projects.
          </div>
          <div>
            <figure>
              <img src="https://res.cloudinary.com/dnocv6uwb/image/upload/c_scale,w_334/v1679008890/project-showcase-app/DALL_E_2023-03-16_16.19.13_-_Generate_an_image_of_a_young_woman_in_intricately_decorated_wizard_s_robes_with_purple_coloring_stars_and_silver_streaks._Cinematic_lighting._Woman_l.png" />
            </figure>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
