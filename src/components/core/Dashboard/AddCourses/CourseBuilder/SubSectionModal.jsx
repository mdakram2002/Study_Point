
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";
import { FileUpload } from "../Upload";
import { IconButtonModal } from "../../../../common/IconButtonModal";

export const SubSectionModal = ({
  modalData,
  setModalData,
  add = false,
  view = false,
  edit = false,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const dispatch = useDispatch();

  console.log("Redux Course State:", course);
  // useEffect(() => {
  //   console.log("SubSectionModal opened with modalData:", modalData);
  //   console.log("SubSection ID:", modalData?._id);
  // }, [modalData]);

  useEffect(() => {
    console.log("SubSectionModal opened with modalData:", modalData);
    console.log("SubSection ID:", modalData._id);

    if (modalData && (view || edit)) {
      setValue("lectureTitle", modalData.title || "");
      setValue("lectureDesc", modalData.description || "");
      setValue("lectureVideo", modalData.videoUrl || "");
    }
  }, [view, edit, modalData, setValue]);


  const isFormUpdated = () => {
    const currentValues = getValues();
    if (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    ) {
      return true;
    } else {
      return false;
    }
  };
  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("courseId", course?._id);
    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }

    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }

    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("videoFile", currentValues.lectureVideo);
    }

    console.log("Course ID: ", course._id);
    // console.log("SubSection  ID is: ", modalData._id)
    // console.log("Editing SubSection:", [...formData.entries()]);
    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    console.log(data)
    if (view) return

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
      } else {
        handleEditSubSection()
      }
      return
    }

    if (!add && (!modalData?._id || !modalData?.sectionId)) {
      toast.error("SubSection ID is required.");
      return;
    }

    const formData = new FormData()
    formData.append("sectionId", modalData?.sectionId)
    formData.append("title", data.lectureTitle)
    formData.append("description", data.lectureDesc)
    formData.append("videoFile", data.lectureVideo)


    setLoading(true)
    const result = await createSubSection(formData, token)
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === modalData.sectionId ? result : section
      )
      const updatedCourse = { ...course, courseContent: updatedCourseContent }
      dispatch(setCourse(updatedCourse))
    }
    setModalData(null)
    setLoading(false)
  }


  return (
    <div>
      <div className="">
        <div>
          <p>
            {view && "viewing"}
            {add && "Adding"} {edit && "Editing"}Lecture
          </p>
          <button onClick={() => (!loading ? setModalData(null) : {})}>
            <RxCross2 />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-4 mt-1"
        >
          <FileUpload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            videoFile={true}
            error={errors}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          <div>
            <label
              htmlFor="lectureTitle"
              className="text-richblack-25 text-[16px]"
            >
              Lecture Title<sub className="text-pure-reds-300">*</sub>
            </label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              {...register("lectureTitle", { required: true })}
              className="w-full rounded-md bg-richblack-700 placeholder:text-richblack-500 placeholder:p-2 placeholder:py-3"
            />
            {errors.lectureTitle && (
              <span className="text-pure-reds-300">
                Lecture title is required
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="lectureDesc"
              className="text-richblack-25 text-[16px]"
            >
              Lecture Description<sup className="text-pure-reds-300">*</sup>
            </label>
            <textarea
              id="lectureDesc"
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="min-h-[150px] w-full bg-richblack-700 placeholder:text-richblack-300 rounded-md p-1 mt-1"
            />
            {errors.lectureDesc && (
              <span className="text-pure-reds-300">
                Lecture description is required
              </span>
            )}
          </div>
          {!view && (
            <div>
              <IconButtonModal
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
