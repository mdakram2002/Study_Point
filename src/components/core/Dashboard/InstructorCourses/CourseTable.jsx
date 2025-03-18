
import { MdDelete, MdEdit } from "react-icons/md";
import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { COURSE_STATUS } from "../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
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
    await deleteCourse({ courseId: courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) {
      setCourses(result.data.data);
    }
    setConfirmationModal(null);
    setLoading(false);
  };

  return (
    <div>
      <Table>
        <Thead>
          <Tr className="flex">
            <Th>Courses</Th>
            <Th>Duration</Th>
            <Th>Price</Th>
            <Th>Action</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.length === 0 ? (
            <Tr>
              <Td colSpan="4" className="text-center">
                No Courses Found
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-richblack-800"
              >
                <Td className="flex gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt="CourseImg"
                    className="h-[150px] w-[180px] rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <p>{course.courseName}</p>
                    <p>{course.courseDescription}</p>
                    <p>Created: </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="text-pure-reds-200">DRAFTED</p>
                    ) : (
                      <p className="text-yellow-50">PUBLISHED</p>
                    )}
                  </div>
                </Td>
                <Td>2hr 40min</Td>
                <Td>${course.price}</Td>
                <Td>
                  <button
                    disabled={loading}
                    onClick={() =>
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }
                    className="ml-[15px]"
                  >
                    <MdEdit />
                  </button>

                  <button
                    disabled={loading}
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All data related to this course will be deleted.",
                        btnText1: "Delete",
                        btnText2: "Cancel",
                        btn1Handler: () =>
                          !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                        btn2Handler: () =>
                          !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                      })
                    }
                  >
                    <MdDelete />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};
