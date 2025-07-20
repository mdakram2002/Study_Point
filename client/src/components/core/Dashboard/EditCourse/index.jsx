
import React, { useEffect, useState } from "react";
import { RenderStepsForm } from "../AddCourses/RenderStepsForm";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getFullDetailsOfCourse } from "../../../../services/operations/courseDetailsAPI";
import { setCourse, setEditCourse } from "../../../../slices/courseSlice";

export default function EditCourse() {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!courseId) {
      console.error("Course ID is missing from URL params.");
      return;
    }
    const populateCourseDetails = async () => {
      setLoading(true);
      const result = await getFullDetailsOfCourse(courseId, token);
      if (result?.courseDetils) {
        dispatch(setEditCourse(true));
        dispatch(setCourse(result?.courseDetils));
      }
      setLoading(false);
    };
    // Function call
    populateCourseDetails();
  }, []);

  if (loading) {
    return <div className="spinner flex items-center justify-center"></div>;
  }

  return (
    <div>
      <h1>Edit Course</h1>
      <div>{course ? <RenderStepsForm /> : <p>Course Not Found</p>}</div>
    </div>
  );
}
