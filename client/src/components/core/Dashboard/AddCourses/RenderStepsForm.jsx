
import React from "react";
import { FaCheck } from "react-icons/fa";

import { useSelector } from "react-redux";
import { CourseInformation } from "./CourseInformation/CourseInformation";
import { CourseIBuilderForm } from "./CourseBuilder/CourseIBuilderForm";
import { CoursePublishedForm } from "./CoursePublished/CoursePublishedForm";

export const RenderStepsForm = () => {

  const { step } = useSelector((state) => state.course);
  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Course Published" },
  ];

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        {steps.map((item, index) => (
          <React.Fragment key={item.id}>
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 font-semibold mt-5 ${
                  step > item.id
                    ? "bg-yellow-500 border-yellow-500 text-black"
                    : step === item.id
                    ? "bg-yellow-200 border-yellow-700 text-white"
                    : "border-richblack-700 bg-richblack-800 text-richblack-300"
                }`}
              >
                {step > item.id ? <FaCheck /> : item.id}
              </div>
              <p className=" w-full mt-2 text-sm text-white items-center text-center">
                {item.title}
              </p>
            </div>

            {/* Render Dash (Only between steps) */}
            {index < steps.length - 1 && (
              <div className="flex items-center justify-center gap-1 h-[1px] w-[40%] bg-richblack-500" />
            )}
          </React.Fragment>
        ))}
      </div>
      {step === 1 && <CourseInformation />}
      {step === 2 && <CourseIBuilderForm />}
      {step === 3 && <CoursePublishedForm />}

    </>
  );
};
