
import React from "react";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import { Quote } from "../components/core/AboutPage/Quote";
import { StatsComponent } from "../components/core/AboutPage/StatsComponent";
import { LearningGird } from "../components/core/AboutPage/LearningGird";
import { Footer } from "../components/common/Footer";
import { ContactForm } from "../components/core/AboutPage/ContactForm";

import aboutus1 from "../Assets/Image/aboutus1.jpg";
import aboutus2 from "../Assets/Image/aboutus2.webp";
import aboutus3 from "../Assets/Image/aboutus3.webp";
import FoundingStory from "../Assets/Image/FoundingStory.png";
import { ReviewSlider } from "../components/common/ReviewSlider";

export const About = () => {
  return (
    <div>
      {/* Header Section 1*/}
      <section className="bg-richblack-700">
        <div className="w-11/12 max-w-maxContent flex flex-col justify-between gap-10 mx-auto relative text-richblack-5">
          <header className="font-semibold lg:w-[70%] mx-auto py-20 text-4xl text-center">
            Driving Innovation in Online Education or a
            <HighlightText text={"Brighter Future"} />
            <p className="mx-auto text-base font-medium mt-3 text-center text-richblack-300 lg:w-[95%]">
              StudyPoint is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </header>
          <div className="sm:h-[70px] lg:h-[150px]"></div>
          <div className="absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5">
            <img src={aboutus2} alt="aboutus2" />
            <img src={aboutus1} alt="aboutus1" />
            <img src={aboutus3} alt="aboutus3" />
          </div>
        </div>
      </section>

      {/* Quote Section 2 */}
      <section className="border-b border-richblack-700">
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500 text-center">
          <div className="h-[100px] "></div>
          <Quote />
        </div>
      </section>

      {/* 4-Quotes Section 3 */}
      <section>
        <div className="w-11/12 max-w-maxContent flex flex-col mx-auto justify-between gap-10 text-richblack-500">
          <div className="lg:flex-row flex flex-col items-center gap-10 justify-between">
            <div className="my-24 flex lg:w-[50%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]">
                Our Founding Story
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            {/* Founding Story right image box */}
            <div className="shadow-[10px_-5px_50px_-5px] shadow-blue-300">
              <img
                src={FoundingStory}
                alt="FoundingStory"
                className="shadow-[10px_10px_rgba(255,255,255)]"
              />
            </div>
          </div>

          {/* Vision and Mission Box  */}
          <div className="flex flex-col items-center lg:gap-10 lg:flex-row justify-between">
            {/* left box  */}
            <div className="my-20 flex lg:w-[40%] flex-col gap-10">
              <h1 className=" text-4xl font-semibold text-transparent lg:w-[70%] ">
                {" "}
                <HighlightText text={"Our Vision"} />
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            {/* right box  */}
            <div className="my-24 flex lg:w-[40%] flex-col gap-10">
              <h1 className="bg-gradient-to-b from-[#FF512F] via-[#DD2476] to-[#FF6A00] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%]">
                Our Mission
              </h1>
              <p className="text-base font-medium text-richblack-300 lg:w-[95%]">
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Components Section 4 */}
      <StatsComponent />

      {/* World-Class Section 5 */}
      <section className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white mb-20">
        <LearningGird />
        <ContactForm />
      </section>

      <div className="relative mx-auto my-4 flex w-11/12 max-w-maxContent flex-col items-center justify-between bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold">
          Reviews from other <HighlightText text={"Learners"}/>
        </h1>
        <ReviewSlider />
      </div>

      {/* Footer Scetion  */}
      <Footer />
    </div>
  );
};
