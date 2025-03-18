
import ProgressBar from "@ramonak/react-progress-bar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";

export const EnrolledCourse = () => {
  const { token } = useSelector((state) => state.auth);
  const [enrolledCourses, setEnrolledCourses] = useState(null);

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

  return (
    <div className="text-white">
      <h1 className="text-white font-semibold text-3xl">Enrolled Courses</h1>
      {!enrolledCourses ? (
        <div className="spinner"></div>
      ) : !enrolledCourses.lenght ? (
        <p className="text-richblack-300">You have not enrolled in any course yet.</p>
      ) : (
        <div>
          <div>
            <p>Course Name</p>
            <p>Durations</p>
            <p>Progrss</p>
          </div>

          {/* start cards details from here  */}
          {enrolledCourses.map((course, index) => (
            <div key={index}>
              <div>
                <img src={course.thumbnail} alt="courseThumbnail" />
                <div>
                  <p>{course.courseName}</p>
                  <p>{course.courseDescription}</p>
                </div>
                <div>{course?.totalDuration}</div>

                <div>
                  <p>Progress: {course.progressPercentage || 0}%</p>
                  <ProgressBar
                    completed={course.progressPercentage || 0}
                    hight="8px"
                    isLabelVisible={false}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
