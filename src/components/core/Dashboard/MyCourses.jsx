
import { IoMdAdd } from "react-icons/io";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI";
import { IconButtonModal } from "../../common/IconButtonModal";
import { CourseTable } from "./InstructorCourses/CourseTable";
import { setCourse } from "../../../slices/courseSlice";

export const MyCourses = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token);
      if (result) {
        setCourse(result);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="text-white">
      <div className="flex justify-between">
        <h1>My Courses</h1>
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
