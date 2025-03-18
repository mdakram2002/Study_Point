
import toast from "react-hot-toast";
import { IoMdAddCircleOutline } from "react-icons/io";
import { BiRightArrow } from "react-icons/bi";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { IconButtonModal } from "../../../../common/IconButtonModal";
import { setCourse, setEditCourse, setStep } from "../../../../../slices/courseSlice";
import { createSection, updateSection } from "../../../../../services/operations/courseDetailsAPI";
import { NestedView } from "./NestedView";

export const CourseIBuilderForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [editSectionName, setEditSectionName] = useState(null);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    if (editSectionName) {
      result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        },
        token
      );
    } else {
      result = await createSection(
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },
        token
      );
    }
    // console.log("API Response:", result);
    // Update the section values
    if (result) {
      dispatch(setCourse(result));
      setEditSectionName(null);
      setValue("sectionName", "");
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNextPage = () => {
    if (course.courseContent.length === 0) {
      toast.error("Please add atleast one section.");
      return;
    }
    if (
      course.courseContent.some((section) => section.subSection.length === 0)
    ) {
      toast.error("Please add atleast one lecture in section.");
      return;
    }
    // If everything is OKOK then on the next page
    dispatch(setStep(3));
  };

  const handleChangeSectionName = (sectionId, sectionName) => {
    if (editSectionName === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div>
      <h2 className="text-xl text-white font-semibold mt-5">Corse Builder</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-4 mt-1"
      >
        <div>
          <label
            htmlFor="sectionName"
            className="text-richblack-25 text-[16px]"
          >
            Section Name<sub className="text-pure-reds-300">*</sub>{" "}
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add Section Name"
            {...register("sectionName", { required: true })}
            className="w-full bg-richblack-700 placeholder:text-richblack-300 rounded-md mt-1 p-1"
          />
          {errors.sectionName && <span className="text-pure-reds-300">Section name is required</span>}
        </div>
        <div className="mt-10 flex">
          <IconButtonModal
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            className="text-white w-fit"
          >
            <IoMdAddCircleOutline className="text-yellow-50" size={20} />
          </IconButtonModal>
          {editSectionName && (
            <button
              type="button"
              className="text-sm text-richblack-600 underline ml-6"
              onClick={cancelEdit}
            >
              Cancle Edit
            </button>
          )}
        </div>
      </form>

      {/* Nested View of Section  */}
      {course.courseContent.length > 0 && (
        <NestedView handleChangeSectionName={handleChangeSectionName} />
      )}
      <div className="flex justify-end gap-x-3 mt-3">
        <button
          className="text-richblack-900 bg-richblack-500 font-medium px-3 py-2 rounded-md cursor-pointer items-center flex"
          onClick={goBack}
        >
          Back
        </button>
        <IconButtonModal text="Next" onclick={goToNextPage}>
          <BiRightArrow />
        </IconButtonModal>
      </div>
    </div>
  );
};
