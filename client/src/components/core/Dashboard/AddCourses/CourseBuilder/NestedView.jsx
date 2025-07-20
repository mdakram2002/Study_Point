
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit, MdDelete } from "react-icons/md";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { SubSectionModal } from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { ConfirmationModal } from "../../../../common/ConfirmationModal";

export const NestedView = ({ handleChangeSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token,
    });
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    const result = await deleteSubSection({ subSectionId, sectionId, token });
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === sectionId ? result : section
      );

      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setConfirmationModal(null);
  };


  const handleOpenSubSectionModal = (mode, subSection, sectionId) => {
    if (mode === "add") {
      setAddSubSection({ sectionId }); // Ensure it's an object
    } else if (mode === "edit") {
      setEditSubSection({ ...subSection, sectionId });
    } else if (mode === "view") {
      setViewSubSection({ ...subSection, sectionId });
    }
  };

  return (
    <div className="text-white mt-5">
      <h2 className="text-xl font-semibold text-richblack-5 mt-1">Sections</h2>
      <div className="rounded-md bg-richblack-800 p-5">
        {course?.courseContent?.length > 0 ? (
          course.courseContent.map((section) => (
            <details key={section._id} open>
              <summary className="flex items-center justify-between gap-x-3 border-b-2">
                <div className="flex gap-x-3 items-center">
                  <RxDropdownMenu />
                  <p>{section.sectionName}</p>
                </div>
                <div className="flex items-center gap-x-2">
                  <button
                    onClick={() =>
                      handleChangeSectionName(section._id, section.sectionName)
                    }
                  >
                    <MdEdit />
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Delete this Section",
                        text2: "All the lectures in this section will be deleted",
                        btnText1: "Delete",
                        btnText2: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <MdDelete />
                  </button>
                  <span>|</span>
                  <BiSolidDownArrow className="text-xl text-richblack-300" />
                </div>
              </summary>

              <div>
                {section.subSection.map((subSection) => (
                  <div
                    key={subSection?._id}
                    onClick={() =>
                      handleOpenSubSectionModal("view", subSection, section._id)
                    }
                    className="flex items-center justify-between gap-x-3 border-b-2 "
                  >
                    <div className="flex gap-x-3 items-center">
                      <RxDropdownMenu />
                      <p>{subSection.title}</p>
                    </div>

                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-x-3"
                    >
                      <button
                        onClick={() =>
                          handleOpenSubSectionModal(
                            "edit",
                            subSection,
                            section._id
                          )
                        }
                      >
                        <MdEdit />
                      </button>
                    </div>

                    <div>
                      <button
                        onClick={() => {
                          setConfirmationModal({
                            text1: "Delete this Sub Section",
                            text2: "Selected lecture will be deleted",
                            btnText1: "Delete",
                            btnText2: "Cancel",
                            btn1Handler: () =>
                              handleDeleteSubSection(subSection._id, section._id), // FIXED: Pass `_id`
                            btn2Handler: () => setConfirmationModal(null),
                          });
                        }}
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => handleOpenSubSectionModal("add", {}, section._id)}
                  className="text-yellow-50 flex items-center gap-x-2"
                >
                  <IoMdAdd />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          ))
        ) : (
          <p>No sections available</p>
        )}
      </div>

      {/* Render Modal Correctly */}
      {addSubSection && (
        <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add />
      )}
      {viewSubSection && (
        <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view />
      )}
      {editSubSection && (
        <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit />
      )}

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
  


  // return (
  //   <div className="text-white mt-5">
  //     <h2 className="text-xl font-semibold text-richblack-5 mt-1">Sections</h2>
  //     <div className="rounded-md bg-richblack-800 p-5">
  //       {course?.courseContent?.length > 0 ? (
  //         course.courseContent.map((section) => (
  //           <details key={section._id} open>
  //             <summary className="flex items-center justify-between gap-x-3 border-b-2">
  //               <div className="flex gap-x-3 items-center">
  //                 <RxDropdownMenu />
  //                 <p>{section.sectionName}</p>
  //               </div>
  //               <div className="flex items-center gap-x-2">
  //                 <button
  //                   onClick={() =>
  //                     handleChangeSectionName(section._id, section.sectionName)
  //                   }
  //                 >
  //                   <MdEdit />
  //                 </button>
  //               </div>
  //               <div>
  //                 <button
  //                   onClick={() => {
  //                     setConfirmationModal({
  //                       text1: "Delete this Section",
  //                       text2:
  //                         "All the lectures in this section will be deleted",
  //                       btnText1: "Delete",
  //                       btnText2: "Cancle",
  //                       btn1Handler: () => handleDeleteSection(section._id),
  //                       btn2Handler: () => setConfirmationModal(null),
  //                     });
  //                   }}
  //                 >
  //                   <MdDelete />
  //                 </button>
  //                 <span>|</span>
  //                 <BiSolidDownArrow className={`text-xl text-richblack-300`} />
  //               </div>
  //             </summary>


  //             <div>
  //               {section.subSection.map((data) => (
  //                 <div
  //                   key={data?._id}
  //                   onClick={() => setViewSubSection(data)}
  //                   className="flex items-center justify-between gap-x-3 border-b-2 "
  //                 >
  //                   <div className="flex gap-x-3 items-center">
  //                     <RxDropdownMenu />
  //                     <p>{data.title}</p>
  //                   </div>

  //                   <div
  //                   onClick={(e)=>e.stopPropagation()}
  //                   className="flex items-center gap-x-3">
  //                     <button
  //                       onClick={() =>
  //                         setEditSubSection({ ...data, sectionId: section._id })
  //                       }
  //                     >
  //                       <MdEdit />
  //                     </button>
  //                   </div>

  //                   <div>
  //                     <button
  //                       onClick={() => {
  //                         setConfirmationModal({
  //                           text1: "Delete this Sub Section",
  //                           text2: "Selected lectures will be deleted",
  //                           BtnText1: "Delete",
  //                           BtnText2: "Cancle",
  //                           btn1Handler: () =>
  //                             handleDeleteSubSection(data, section._id),
  //                           btn2Handler: () => setConfirmationModal(null),
  //                         });
  //                       }}
  //                     >
  //                       <MdDelete />
  //                     </button>
  //                   </div>
  //                 </div>
  //               ))}

  //               <button
  //                 onClick={() => setAddSubSection(section._id)}
  //                 className="text-yellow-50 flex items-center gap-x-2 "
  //               >
  //                 <IoMdAdd />
  //                 <p>Add Lecture</p>
  //               </button>
  //             </div>
  //           </details>
  //         ))
  //       ) : (
  //         <p>No sections available</p>
  //       )}
  //     </div>

  //     {addSubSection ? (
  //       <SubSectionModal setModalData={setAddSubSection} add={true} />
  //     ) : viewSubSection ? (
  //       <SubSectionModal setModalData={setViewSubSection} view={true} />
  //     ) : editSubSection ? (
  //       <SubSectionModal setModalData={setEditSubSection} edit={true} />
  //     ) : (
  //       <div></div>
  //     )}

  //     {confirmationModal ? (
  //       <ConfirmationModal modalData={confirmationModal} />
  //     ) : (
  //       <div></div>
  //     )}
  //   </div>
  // );
};
