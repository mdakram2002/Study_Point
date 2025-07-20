
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { HighlightText } from "../../core/HomePage/HighlightText";
import { useNavigate } from "react-router-dom";
export const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const getEnrolledCourses = async () => {
    try {
      const response = await getUserEnrolledCourses(token);
      setEnrolledCourses(response);
    } catch (err) {
      console.log("Unable to Fetch Enrolled Courses: ", err);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  const scroll = (direction) => {
    const { current } = containerRef;
    if (current) {
      const scrollAmount = 330; // adjust based on card width + margin
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-white font-semibold text-3xl mb-5">
        <HighlightText text={"Enrolled Course"} />
      </h1>

      {!enrolledCourses ? (
        <div className="spinner"></div>
      ) : !enrolledCourses.length ? (
        <p className="text-richblack-300">
          You have not enrolled in any course yet.
        </p>
      ) : (
        <>
          {/* Horizontal Scroll Area */}
          <div className="relative">
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 bg-richblack-700 rounded-full"
            >
              ◀
            </button>

            <div
              ref={containerRef}
              className="flex overflow-x-auto gap-6 px-10 scroll-smooth no-scrollbar"
            >
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-richblack-800 p-4 rounded-lg w-[22rem] flex-shrink-0"
                >
                  <div
                  onClick={()=>{
                    navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)
                  }}
                  className="w-80 h-48 overflow-hidden rounded-md">
                    <img
                      src={course.thumbnail}
                      alt="courseThumbnail"
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="text-richblack-100 mt-3">
                    <p className="text-[16px] text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-[14px]">
                      {course.courseDescription.split(" ").slice(0, 10).join(" ")}
                      ...
                    </p>
                  </div>

                  <div className="text-richblack-25 mt-1">
                    Lecture Duration: {course?.totalDuration}
                  </div>

                  <div className="text-richblack-25 mt-2">
                    <p>Progress: {course.progressPercentage || 0}%</p>
                    <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="6px"
                      isLabelVisible={false}
                      bgColor="#00ADB5"
                      baseBgColor="#393E46"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 px-2 py-1 bg-richblack-700 rounded-full"
            >
              ▶
            </button>
          </div>
        </>
      )}
    </div>
  );
};
