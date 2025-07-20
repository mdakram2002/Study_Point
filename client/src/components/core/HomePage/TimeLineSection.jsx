import React from "react";
import TimeLineImage from "../../../Assets/Image/TimelineImage.png";

import Logo1 from "../../../Assets/logo/Logo1.svg";
import Logo2 from "../../../Assets/logo/Logo2.svg";
import Logo3 from "../../../Assets/logo/Logo3.svg";
import Logo4 from "../../../Assets/logo/Logo4.svg";

const timeLine = [
  {
    Logo: Logo1,
    Heading: "LeaderShip",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "The ability to switch is an important skills",
  },
];
export const TimeLineSection = () => {
  return (
    <div>
      <div className="flex lg:flex-row gap-16 items-center flex-col mb-20 ">
        <div className="lg:w-[45%] flex flex-col lg:gap-3 gap-14">
          {timeLine.map((element, index) => (
            <div className="flex flex-col lg:gap-3" key={index}>
              {/* Divider - Show for the first item and between elements */}
              {index !== 0 && (
                <div className="hidden lg:block h-14 border-dotted border-r border-richblack-100 w-[26px]"></div>
              )}
              <div className="flex flex-row gap-6 items-center">
                {/* Logo */}
                <div className="w-[52px] h-[52px] bg-richblack-5 rounded-full flex justify-center items-center shadow-white">
                  <img src={element.Logo} alt="logo" className="" />
                </div>

                {/* Heading and Description */}
                <div className="flex flex-col gap-1">
                  <h2 className="font-semibold text-richblack-600 text-[18px]">
                    {element.Heading}
                  </h2>
                  <p className="text-base text-richblack-600">
                    {element.Description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Time Line Image Section  */}
        <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <img
            src={TimeLineImage}
            alt="TLI"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
          <div className="absolute bg-caribbeangreen-700 flex flex-col text-white uppercase p-5 lg:left-16 lg:translate-y-[50%] lg:translate-x-[0] translate-y-[-200%] translate-x-[0] lg:bottom-0 lg:right-6 lg:flex-row first-letter lg:gap-0 ">

            <div className="flex flex-col lg:flex-row gap-4 lg:border-r lg:items-center border-caribbeangreen-200 ">
              <p className="text-3xl font-bold ">10</p>
              <p className=" text-caribbeangreen-200 text-sm pr-5">
                Years of Experience
              </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-5 items-start lg:items-center p-2 lg:p-5">
              <p className="text-3xl font-bold ">250</p>
              <p className=" text-caribbeangreen-200 text-sm">
                Type of Courses
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
