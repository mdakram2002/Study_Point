import InstructorImage from "../../../Assets/Image/Instructor.png";
import React from "react";
import { HighlightText } from "./HighlightText";
import { CTAButton } from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";

export const Instructor = () => {
  return (
    <div className="w-11/12 max-w-maxContent mt-16">
      <div className="flex flex-row gap-24 items-center">
        <div className="w-[50%]">
          <img
            src={InstructorImage}
            alt="InstructorImage"
            className="shadow-white shadow-[-20px_-20px_0_0]"
          />
        </div>
        <div className="w-[50%] flex flex-col gap-6">
          <div className="text-4xl font-semibold w-[50%]">
            Become an <HighlightText text={"Instructor"} />
          </div>
          <p className="font-medium text-[16px] text-richblack-400">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="flex flex-row gap-2 items-center">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </CTAButton>

          </div>
        </div>
      </div>
    </div>
  );
};
