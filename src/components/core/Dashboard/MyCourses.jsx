
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
          console.log("Fetched courses MyCourses:", result);
          setCourses(result);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [token, setCourses]);

  return (
    <div className="flex flex-col w-11/12 text-white">
      <div className="flex justify-between">
        <h1 className="text-2xl text-richblack-5 font-semibold">My Courses</h1>
        <IconButtonModal
          text="Add Courses"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <IoMdAdd />
        </IconButtonModal>
      </div>
      {courses && <CourseTable courses={courses} setCourses={setCourses} />}
    </div>
  );
};
