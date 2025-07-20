
import { IoMdAdd } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { IconButtonModal } from "../../common/IconButtonModal";
import { CourseTable } from "./InstructorCourses/CourseTable";

export const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const result = await fetchInstructorCourses(token);
        if (result) {
          setCourses(result);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [token]);

  return (
    <div className="flex flex-col w-11/12 text-white">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-richblack-5">
          My Courses
        </h1>

        <IconButtonModal
          text="Add Courses"
          customClasses="w-full sm:w-auto text-sm sm:text-base px-4 py-2"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <IoMdAdd size={20} />
        </IconButtonModal>
      </div>
      {/* Course Table */}
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};
