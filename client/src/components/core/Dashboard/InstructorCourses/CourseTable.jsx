
import { MdDelete, MdEdit } from "react-icons/md";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { ConfirmationModal } from "../../../common/ConfirmationModal";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";

export const CourseTable = ({ courses, setCourses }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleCourseDelete = async (courseId) => {
    setLoading(true);
    await deleteCourse({ courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div className="w-full px-2">
      {courses.length === 0 ? (
        <p className="text-center text-richblack-200 my-4">No Courses Found</p>
      ) : (
        courses.map((course) => (
          <div
            key={course._id}
            className="border border-richblack-800 rounded-lg p-4 mb-6 bg-richblack-900"
          >
            {/* Top Details: Name, Description, Image */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <img
                src={course?.thumbnail}
                alt="Course"
                className="w-full sm:w-[200px] h-auto object-cover rounded-md"
              />
              <div className="flex-1 space-y-1">
                <p className="text-xl font-semibold text-white">{course.courseName}</p>
                <p className="text-richblack-100 text-sm">{course.courseDescription}</p>
                <p className="text-sm text-richblack-200">
                  Created by:{" "}
                  <span className="text-white">
                    {course?.instructor?.firstName} {course?.instructor?.lastName}
                  </span>
                </p>
                <p className={`${course.status === COURSE_STATUS.DRAFT ? "text-pink-400" : "text-yellow-50"} text-sm`}>
                  {course.status === COURSE_STATUS.DRAFT ? "Drafted" : "Published"}
                </p>
              </div>
            </div>

            {/* Bottom Details: Duration, Price, Action */}
            <div className="flex flex-col sm:flex-row justify-between mt-4 text-sm gap-2 sm:gap-0">
              <div className="flex justify-between sm:block">
                <span className="font-semibold text-white">Duration:</span>{" "}
                <span className="text-richblack-100">{course?.timeDuration || "0min"}</span>
              </div>
              <div className="flex justify-between sm:block">
                <span className="font-semibold text-white">Price:</span>{" "}
                <span className="text-richblack-100">₹{course?.price}</span>
              </div>
              <div className="flex justify-between sm:block items-center">
                <span className="font-semibold text-white">Action:</span>{" "}
                <div className="flex gap-3 text-lg">
                  <button
                    disabled={loading}
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                  >
                    <MdEdit className="text-richblack-200 hover:text-yellow-200" />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2: "All data related to this course will be deleted.",
                        btnText1: "Delete",
                        btnText2: "Cancel",
                        btn1Handler: () =>
                          !loading ? handleCourseDelete(course._id) : {},
                        btn2Handler: () => (!loading ? setConfirmationModal(null) : {}),
                      })
                    }
                  >
                    <MdDelete className="text-richblack-200 hover:text-pink-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};
