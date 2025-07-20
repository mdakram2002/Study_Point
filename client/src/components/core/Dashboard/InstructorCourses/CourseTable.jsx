
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










// import { MdDelete, MdEdit } from "react-icons/md";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { COURSE_STATUS } from "../../../../utils/constants";
// import { useNavigate } from "react-router-dom";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
// } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import { ConfirmationModal } from "../../../common/ConfirmationModal";
// import {
//   deleteCourse,
//   fetchInstructorCourses,
// } from "../../../../services/operations/courseDetailsAPI";

// export const CourseTable = ({ courses, setCourses }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(false);
//   const [confirmationModal, setConfirmationModal] = useState(null);

//   const handleCourseDelete = async (courseId) => {
//     setLoading(true);
//     await deleteCourse({ courseId: courseId }, token);
//     const result = await fetchInstructorCourses(token);
//     if (result) {
//       setCourses(result);
//     }
//     setConfirmationModal(null);
//     setLoading(false);
//   };

//   return (
//     <div className="overflow-x-auto w-full">
//       <Table className="w-full border border-richblack-800 text-left">
//         <Thead>
//           <Tr className="bg-richblack-900 text-richblack-5 text-sm md:text-base">
//             <Th className="p-2">Courses</Th>
//             <Th className="p-2">Duration</Th>
//             <Th className="p-2">Price</Th>
//             <Th className="p-2">Action</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {courses.length === 0 ? (
//             <Tr>
//               <Td colSpan="4" className="text-center py-4 text-richblack-200">
//                 No Courses Found
//               </Td>
//             </Tr>
//           ) : (
//             courses.map((course) => (
//               <Tr key={course._id} className="border-b border-richblack-800">
//                 <Td className="p-2">
//                   <div className="flex flex-col md:flex-row gap-3">
//                     <img
//                       src={course?.thumbnail}
//                       alt="CourseImg"
//                       className="w-full md:w-[250px] h-auto rounded-md object-cover"
//                     />
//                     <div className="flex flex-col gap-1">
//                       <p className="text-base font-semibold text-richblack-5">
//                         {course.courseName}
//                       </p>
//                       <p className="text-sm text-richblack-200">
//                         {course.courseDescription}
//                       </p>
//                       <p className="text-xs text-richblack-300">
//                         Created by: {course?.instructor?.firstName}{" "}
//                         {course?.instructor?.lastName}
//                       </p>
//                       <p
//                         className={`text-xs font-bold ${
//                           course.status === COURSE_STATUS.DRAFT
//                             ? "text-pure-red-200"
//                             : "text-yellow-50"
//                         }`}
//                       >
//                         {course.status}
//                       </p>
//                     </div>
//                   </div>
//                 </Td>
//                 <Td className="p-2 text-sm md:text-base">
//                   {course?.timeDuration}
//                 </Td>
//                 <Td className="p-2 text-sm md:text-base">
//                   ₹{course.price}
//                 </Td>
//                 <Td className="p-2 flex gap-2">
//                   <button
//                     disabled={loading}
//                     onClick={() =>
//                       navigate(`/dashboard/edit-course/${course._id}`)
//                     }
//                     className="text-xl text-richblack-100 hover:text-caribbeangreen-300"
//                   >
//                     <MdEdit />
//                   </button>
//                   <button
//                     disabled={loading}
//                     onClick={() =>
//                       setConfirmationModal({
//                         text1: "Do you want to delete this course?",
//                         text2:
//                           "All data related to this course will be deleted.",
//                         btnText1: "Delete",
//                         btnText2: "Cancel",
//                         btn1Handler: () =>
//                           !loading ? handleCourseDelete(course._id) : {},
//                         btn2Handler: () =>
//                           !loading ? setConfirmationModal(null) : {},
//                       })
//                     }
//                     className="text-xl text-pure-red-200 hover:text-pure-red-300"
//                   >
//                     <MdDelete />
//                   </button>
//                 </Td>
//               </Tr>
//             ))
//           )}
//         </Tbody>
//       </Table>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </div>
//   );
// };







// import { MdDelete, MdEdit } from "react-icons/md";
// import React, { useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { COURSE_STATUS } from "../../../../utils/constants";
// import { useNavigate } from "react-router-dom";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import  "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import { ConfirmationModal } from "../../../common/ConfirmationModal";
// import {
//   deleteCourse,
//   fetchInstructorCourses,
// } from "../../../../services/operations/courseDetailsAPI";

// export const CourseTable = ({ courses, setCourses }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.auth);
//   const [loading, setLoading] = useState(false);
//   const [confirmationModal, setConfirmationModal] = useState(null);

//   console.log("Course form CourseTable for Duration", courses)

//   const handleCourseDelete = async (courseId) => {
//     setLoading(true);
//     await deleteCourse({ courseId: courseId }, token);
//     const result = await fetchInstructorCourses(token);
//     if (result) {
//       setCourses(result);
//     }
//     setConfirmationModal(null);
//     setLoading(false);
//   };

//   return (
//     <div>
//       <Table>
//         <Thead className="flex w-11/12 lg:flex-col bg-richblack-900 items-center text-center lg:h-10 justify-center mt-5 rounded-sm">
//           <Tr className="flex space-x-20">
//             <Th>Courses</Th>
//             <Th>Duration</Th>
//             <Th>Price</Th>
//             <Th>Action</Th>
//           </Tr>
//         </Thead>
//         <Tbody>
//           {courses.length === 0 ? (
//             <Tr>
//               <Td colSpan="4" className="text-center">
//                 No Courses Found
//               </Td>
//             </Tr>
//           ) : (
//             courses?.map((course) => (
//               <Tr
//                 key={course._id}
//                 className="flex gap-x-10 border-richblack-800"
//               >
//                 <Td className="flex space-y-4">
//                   <img
//                     src={course?.thumbnail}
//                     alt="CourseImg"
//                     className="h-[160px] w-[250px] rounded-md object-cover"
//                   />
//                   <div className="flex flex-col space-x-4">
//                     <p className="ml-4 font-semibold text-xl">{course.courseName}</p>
//                     <p className="text-richblack-100 ">{course.courseDescription}</p>
//                     <p>Created:{course?.instructor?.firstName} {course?.instructor?.lastName}</p>
//                     {course.status === COURSE_STATUS.DRAFT ? (
//                       <p className="text-pure-reds-200">DRAFTED</p>
//                     ) : (
//                       <p className="text-yellow-50">PUBLISHED</p>
//                     )}
//                   </div>
//                 </Td>
//                 <Td className="mt-4">{course?.timeDuration}</Td>
//                 <Td className="mt-4">₹{course.price}</Td>
//                 <Td className="mt-4">
//                   <button
//                     disabled={loading}
//                     onClick={() =>
//                       navigate(`/dashboard/edit-course/${course._id}`)
//                     }
//                     className="ml-[15px]"
//                   >
//                     <MdEdit />
//                   </button>

//                   <button
//                     disabled={loading}
//                     onClick={() =>
//                       setConfirmationModal({
//                         text1: "Do you want to delete this course?",
//                         text2:
//                           "All data related to this course will be deleted.",
//                         btnText1: "Delete",
//                         btnText2: "Cancel",
//                         btn1Handler: () =>
//                           !loading
//                             ? handleCourseDelete(course._id)
//                             : {},
//                         btn2Handler: () =>
//                           !loading
//                             ? setConfirmationModal(null)
//                             :{},
//                       })
//                     }
//                   >
//                     <MdDelete />
//                   </button>
//                 </Td>
//               </Tr>
//             ))
//           )}
//         </Tbody>
//       </Table>
//       {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
//     </div>
//   );
// };
