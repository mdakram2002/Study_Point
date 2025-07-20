import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createRatingAndReview } from "../../../services/operations/courseDetailsAPI";
import { useForm } from "react-hook-form";

export const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntrieData } = useSelector((state) => state.viewCourse);
  const [rating, setRating] = useState(0);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
    setRating(0);
  }, [setValue]);

  const ratingChanged = (newRating) => {
    setRating(newRating);
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    await createRatingAndReview(
      {
        courseId: courseEntrieData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    );
    setReviewModal(false);
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-9 w-11/12 max-w-[600px] rounded-lg border border-richblack-400 bg-richblack-800">
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button
            onClick={() => setReviewModal(false)}
            className="text-white font-medium"
          >
            Close
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt="user"
              className="aspect-square w-[60px] rounded-full object-cover"
            />
          </div>

          <div className="flex flex-col mt-2 items-center justify-center">
            <p className="font-semibold text-richblack-5">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-sm text-richblack-5">Posting Publicly</p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-3 flex flex-col items-center"
        >
          <ReactStars
            count={5}
            value={rating}
            onChange={ratingChanged}
            size={24}
            activeColor="#E7C009"
          />

          <div className="flex w-11/12 flex-col space-y-2">
            <label
              htmlFor="courseExperience"
              className="text-sm text-richblack-5"
            >
              Add Your Experience
            </label>
            <textarea
              id="courseExperience"
              placeholder="Add your experience here"
              {...register("courseExperience", { required: true })}
              className="form-style min-h-[130px] w-full"
            />
            {errors.courseExperience && (
              <span className="ml-2 text-xs tracking-wide text-pink-200">
                Please add your experience
              </span>
            )}
          </div>

          <div className="mt-6 flex w-11/12 justify-end gap-x-2 p-4">
            <button
              type="button"
              onClick={() => setReviewModal(false)}
              className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
            >
              Cancel
            </button>
            <button type="submit" className="flex cursor-pointer items-center gap-x-2 rounded-md bg-yellow-50 py-[8px] px-[20px] font-semibold text-richblack-900 hover:bg-yellow-100 transition-all duration-200">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
