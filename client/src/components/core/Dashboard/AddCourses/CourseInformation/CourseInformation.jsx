
import toast from "react-hot-toast";
import { HiOutlineCurrencyRupee } from "react-icons/hi";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { addCourseDetails, editCourseDetails, fetchCourseCategories } from "../../../../../services/operations/courseDetailsAPI";
import { TagInput } from "./TagInput";
import { RequirmentField } from "./RequirmentField";
import { IconButtonModal } from "../../../../common/IconButtonModal";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { FileUpload } from "../Upload";

export const CourseInformation = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { course, editCourse } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const [courseCategory, setCourseCategory] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        setLoading(true);
        const response = await fetchCourseCategories();
        setCourseCategory(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Error fetching course categories:", error);
        setCourseCategory([]);
      } finally {
        setLoading(false);
      }
    };

    if (editCourse) {
      setValue("courseTitle", course.courseName);
      setValue("courseShortDesc", course.courseDescription);
      setValue("coursePrice", course.price);
      setValue("courseCategory", course.category);
      setValue("courseTags", course._tag);
      setValue("courseRequirements", course.instructions);
      setValue("courseBenefits", course.whatYouWillLearn);
      setValue("courseImage", course.thumbnailImage);
    }

    getCategory();
  }, [editCourse, course, setValue]);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseCategory !== course.category ||
      currentValues.courseTags !== course.tag ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseImage !== course.thumbnailImage ||
      currentValues.courseRequirements.toString() !==
        course.instructions.toString()
    );
  };

  const onSubmit = async (data) => {
    if (editCourse) {
      if (isFormUpdated()) {
        const currentValues = getValues();
        const formData = new FormData();
        formData.append("courseId", course._id);

        console.log("CourseID from CourseInformation form:", course._id);
        console.log("course object, CourseINformation:", course);

        if (currentValues.courseTitle !== course.courseName) {
          formData.append("courseName", data.courseTitle);
        }
        if (currentValues.courseShortDesc !== course.courseDescription) {
          formData.append("courseDescription", data.courseShortDesc);
        }
        if (currentValues.coursePrice !== course.price) {
          formData.append("price", data.coursePrice);
        }
        if (currentValues.courseCategory !== (course.category?._id || course.category)) {
          formData.append("category", data.courseCategory);
        }
        if (currentValues.courseTags !== course.tag) {
          formData.append("tag", data.courseTags);
        }
        if (currentValues.courseBenefits !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.courseBenefits);
        }
        if (currentValues.courseImage !== course.thumbnailImage) {
          formData.append("thumbnailImage", data.courseImage);
        }
        if (
          currentValues.courseRequirements.toString() !==
          course.instructions.toString()
        ) {
          formData.append(
            "instructions",
            JSON.stringify(data.courseRequirements)
          );
        }
        setLoading(true);
        const result = await editCourseDetails(formData, token);

        setLoading(false);
        if (result) {
          setStep(2);
          dispatch(setCourse(result));
        }
      } else {
        toast.error("NO CHANGE MADE TO THE FORM: ");
      }
      console.log("API Response:", result);
      console.log("I AM IN FORMDATA: " + formData);

      return;
    }

    {
      /* --------Create New Course--------- */
    }

    const formData = new FormData();
    formData.append("courseName", data.courseTitle);
    formData.append("courseDescription", data.courseShortDesc);
    formData.append("price", data.coursePrice);
    formData.append("category", data.courseCategory);
    formData.append("tag", JSON.stringify(data.courseTags));
    formData.append("instructions", JSON.stringify(data.courseRequirements));
    formData.append("whatYouWillLearn", data.courseBenefits);
    formData.append("courseImage", data.thumbnailImage);
    formData.append("status", COURSE_STATUS.DRAFT);

    console.log("Final FormData Before API Call:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    // Append the file
    if (data.courseImage) {
      formData.append("thumbnailImage", data.courseImage);
    } else {
      toast.error("Thumbnail image is required.");
      return;
    }

    setLoading(true);
    const result = await addCourseDetails(formData, token);

    if (result) {
      dispatch(setStep(2));
      dispatch(setCourse(result));
    }

    setLoading(false);
    // console.log("API Response:", result);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-4 mt-6"
    >
      {/* Course Title  */}
      <div>
        <label htmlFor="courseTitle" className="text-richblack-25 text-[16px]">
          Course Title<sup className="text-pure-reds-300">*</sup>
        </label>
        <input
          id="courseTitle"
          placeholder="Enter Course Title"
          {...register("courseTitle", { required: true })}
          className="w-full bg-richblack-700 placeholder:text-richblack-300 rounded-md mt-1 p-1"
        />
        {errors.courseTitle && <span>Course Title is Required</span>}
      </div>
      {/* Course Descriptions */}
      <div>
        <label
          htmlFor="courseShortDesc"
          className="text-richblack-25 text-[16px]"
        >
          Course Short Description<sup className="text-pure-reds-300">*</sup>
        </label>
        <textarea
          id="courseShortDesc"
          placeholder="Enter Course Short Description"
          {...register("courseShortDesc", { required: true })}
          className="min-h-[150px] w-full bg-richblack-700 placeholder:text-richblack-300 rounded-md p-1 mt-1"
        />
        {errors.courseShortDesc && (
          <span className="text-pure-reds-300">
            Course Short Description is Required
          </span>
        )}
      </div>
      {/* Course Price  */}
      {/* TODO: in this code we should set the currency icon when we enter the amount then the currency icon should be hidden */}
      <div className="relative">
        <label htmlFor="coursePrice" className="text-richblack-25 text-[16px]">
          Price<sup className="text-pure-reds-300">*</sup>
        </label>
        <input
          id="coursePrice"
          placeholder="Enter Course Price"
          {...register("coursePrice", { required: true, valueAsNumber: true })}
          className="w-full placeholder:pl-5 bg-richblack-700 placeholder:text-richblack-300 rounded-md p-1 mt-1"
        />
        <HiOutlineCurrencyRupee className="absolute top-1/2 mt-[3px] text-md ml-1 items-center text-richblack-300" />
        {errors.coursePrice && (
          <span className="text-pure-reds-300">Course Price is Required</span>
        )}
      </div>
      {/* course Category  */}
      <div>
        <label
          htmlFor="courseCategory"
          className="text-richblack-25 text-[16px]"
        >
          Category<sup className="text-pure-reds-300">*</sup>
        </label>
        <select
          className="w-full bg-richblack-700 placeholder:text-richblack-300 rounded-md p-[6px] mt-1"
          name="courseCategory"
          id="courseCategory"
          {...register("courseCategory", { required: true })}
        >
          <option value="" className="text-richblack-25">
            Choose a Category
          </option>
          {loading ? (
            <option disabled>Loading categories...</option>
          ) : courseCategory.length > 0 ? (
            courseCategory.map((category) => (
              <option
                key={category._id}
                value={category._id}
                className="text-richblack-50"
              >
                {category.name}
              </option>
            ))
          ) : (
            <option disabled>No categories found</option>
          )}
        </select>
      </div>
      {/* Course tag  */}
      <TagInput
        label="Tag"
        name="courseTags"
        placeholder="Enter Course Tags and Press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />

      {/* Course Thumbnail  */}
      <FileUpload
        label="Course Image"
        name="courseImage"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
        editData={editCourse ? course?.thumbnail : null}
      />

      {/* Course Benefits  */}
      <div>
        <label
          htmlFor="courseBenefits"
          className="text-richblack-25 text-[16px]"
        >
          Benefits of the course<sup className="text-pure-reds-300">*</sup>
        </label>
        <textarea
          id="courseBenefits"
          placeholder="Enter Course Benefits"
          {...register("courseBenefits", { required: true })}
          className="min-h-[120px] w-full bg-richblack-700 placeholder:text-richblack-300 rounded-md p-1 mt-1"
        />
        {errors.courseBenefits && (
          <span className="text-pure-reds-300">
            Course Benefits are Required
          </span>
        )}
      </div>
      {/* Course Requrement field */}
      <RequirmentField
        name="courseRequirements"
        label="Requirements/Instructions"
        error={errors}
        setValue={setValue}
        getValue={getValues}
        register={register}
      />
      <div className="lg:flex lg:space-x-4">
        {editCourse && (
          <button
            onClick={() => dispatch(setStep(2))}
            className="flex text-richblack-300 items-center p-2 bg-richblack-700 rounded-md sm:gap-y-3"
          >
            Continue Without Saving
          </button>
        )}
        <IconButtonModal text={!editCourse ? "Next" : "Save Changes"} />
      </div>
    </form>
  );
};
