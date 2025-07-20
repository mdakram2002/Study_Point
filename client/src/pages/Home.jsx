
import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { HighlightText } from "../components/core/HomePage/HighlightText";
import { CTAButton } from "../components/core/HomePage/CTAButton";
import BANNER_VIDEO from "../Assets/Image/banner.mp4";
import { CodeBlocks } from "../components/core/HomePage/CodeBlocks";
import { Footer } from "../components/common/Footer";
import { ExploreMore } from "../components/core/HomePage/ExploreMore";
import { LearningLanguageSection } from "../components/core/HomePage/LearningLanguageSection";
import { TimeLineSection } from "../components/core/HomePage/TimeLineSection";
import { Instructor } from "../components/core/HomePage/Instructor";
import { ReviewSlider } from "../components/common/ReviewSlider";

const Home = () => {
  return (
    <div>
      {/* Section 1 -- Become an Instructor*/}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-center">
        <Link to={"/signup"}>
          <div
            className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold
            text-richblack-200 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none"
          >
            <div
              className=" flex flex-row items-center gap-2 rounded-full px-8 py-[5px]
             transition-all duration-200 group-hover:bg-richblack-900 "
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-center text-4xl font-semibold mt-4">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="mt-5 w-[90%] text-center items-center font-bold text-md text-richblack-300">
          With our online courses, you can learn at your own pace, from anywhere
          in the world, and get access to a wealth of resources, including
          interactive lessons, hands-on projects, quizzes, and personalized
          feedback from instructors.
        </div>

        <div className="flex flex-row gap-7 mt-11">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>

          <CTAButton active={false} linkto={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div className="mx-10 my-10 shadow-[10px_-5px_50px_-5px] shadow-blue-300">
          <video
            muted
            loop
            autoPlay
            className="shadow-[20px_20px_rgba(255,255,255)]"
          >
            <source src={BANNER_VIDEO} type="video/mp4" />
          </video>
        </div>

        {/*CodeBlocks Section*/}
        <div>
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses
              </div>
            }
            subHeading={
              "Our courses are carefully designed and taught by seasoned industry experts who bring years of hands-on coding experience and are deeply passionate about sharing their expertise and knowledge with you."
            }
            ctabtn1={{
              btnText: "Try It Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html> \n <html lang="en"> \n <head> \n <meta charset="UTF-8" /> \n<title> StudyPoint - India's No-1 Education Platform </title> \n </head> \n<body> \n<div id="root"></div> \n</body> \n </html>`}
            codeColor={"text-richblack-50"}
          />
        </div>

        <div>
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="text-4xl font-semibold w-[100%] lg:w-[50%]">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subHeading={
              "Go ahead, give it a try! Our hands-on, interactive learning environment ensures that you'll be writing real, practical code right from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lession",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codeblock={`<About Me:/>\n<This is MOHAMMAD AKRAM/>,\n <Full-Stack Developer/>\n<I Specialize in building modern and reponsive web applications/>.\n<I am open to discussaing web development projects\n patnership opportunites./>\n<email: mdakram12022002@gmail.com>\n<portfolio: https://portfolio-mdakram.netlify.app/>\n<Github: https://github.com/mdakram2002/Study_Point> \n<LinkedIn: https://www.linkedin.com/in/mdakram2002/>`}
            codeColor={"text-richblack-50"}
          />
        </div>

        {/* Explore More Section */}
        <ExploreMore />
      </div>

      {/* Section 2-- Explore Full Catalog*/}
      <div className="bg-white  text-richblue-100">
        <div className="homepage_bg lg:h-[320px] h-[200px]">
          <div className=" mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
            <div className="lg:h-[175px] h-10"></div>
            <div className="flex flex-row gap-7 text-white">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  {" "}
                  Explore Full Catalog
                  <FaArrowRight className="mt-0.5" />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div className="flex items-center gap-3">Learn More</div>
              </CTAButton>
            </div>
          </div>
        </div>

        {/* white section  */}
        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7 mt-10 mb-16">
          {/* big box */}

          <div className="flex flex-col gap-20 mb-5 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] text-richblack-700">
              Get the skills you need for a
              <HighlightText text={"Job that is in demand."} />
            </div>

            <div className="flex flex-col gap-10 lg:w-[53%] items-start">
              <div className="text-[15px] text-pure-greys-500 font-semibold">
                The modern educational landscape dictates its own terms. Today,
                to be a competitive and versatile specialist requires more than
                just professional skills, it demands continuous learning,
                adaptability, and innovative thinking.
              </div>
              <CTAButton active={true} linkto={"/signup"}>
                <div>Learn More</div>
              </CTAButton>
            </div>
          </div>
          {/* TimeLine Section  */}
          <TimeLineSection />

          {/* Learning Language Section */}
          <LearningLanguageSection />
        </div>
      </div>
      {/* Instructors Section  */}

      <div className="relative mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8 bg-richblack-900 text-white ">
        <Instructor />

        <h2 className="text-center text-4xl font-semibold mt-10 mb-5">
          Review from other
          <HighlightText text={"learners"} />
          <ReviewSlider/>
        </h2>
      </div>

      {/*Footer Section*/}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
