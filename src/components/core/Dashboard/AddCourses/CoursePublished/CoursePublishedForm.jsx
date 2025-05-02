
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { IconButtonModal } from "../../../../common/IconButtonModal";
import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

import { useNavigate } from "react-router-dom";

export const CoursePublishedForm = () => {
  const { register, handleSubmit, setValue, getValues } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true);
    }
  }, []);

  const goToCourse = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses");
  };

  const handleCoursePublish = async () => {
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // no updation in form so no need to make api call
      goToCourse();
      return;
    }
    const formData = new FormData();
    formData.append("courseId", course._id);

    console.log("CourseID from Course Published form:", course._id);
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT;
    formData.append("status", courseStatus);

    setLoading(true);

    const result = await editCourseDetails(formData, token);
    if (result) {
      goToCourse();
    }

    setLoading(false);
  };

  const onSubmit = (data) => {
    // console.log("Printing the DATA from CoursePublishedForm:", data)
    handleCoursePublish();
  };
  const goBack = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="rounded-md border-[1px] text-white bg-richblack-800 p-4 border-richblue-700 mt-8">
      <p className="text-richblack-5">Publish Course</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-4 mt-1"
      >
        <div>
          <label htmlFor="public">
            <input
              type="checkbox"
              name=""
              id="public"
              {...register("public")}
              className="rounded h-4 w-4 "
            />
            <span className="ml-3">Make this Course as Public</span>
          </label>
        </div>
        <div className="flex justify-end gap-x-3">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex items-center rounded-md bg-richblack-300 p-3 "
          >
            Back
          </button>
          <IconButtonModal disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  );
};
