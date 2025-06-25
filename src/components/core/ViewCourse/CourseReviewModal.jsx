
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IconButtonModal } from "../../common/IconButtonModal";
import { createRatingAndReview } from "../../../services/operations/courseDetailsAPI";

export const CourseReviewModal = ({ setReviewModal }) => {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { courseEntrieData } = useSelector((state) => state.viewCourse);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = FormData();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
  }, []);

  const ratingChanged = (newRating) => {
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
    <div>
      <div>
        {/* Modal Header  */}
        <div>
          <p>Add Review</p>
          <button onClick={() => setReviewModal(false)}>Close</button>
        </div>

        {/* Modal of Body */}
        <div>
          <div>
            <img
              src={user?.image}
              alt="user image"
              className="aspect-square w-[50pc] rounded-full object-cover"
            />
          </div>

          <div>
            <p>
              {user?.firstName} {user?.lastName}
            </p>
            <p>Posting Publicly</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="">
          <ReactStars
            count={5}
            onChange={ratingChanged}
            size={24}
            activeColor="#ffc70"
          />

          <div>
            <label htmlFor="courseExperience">Add Your Experience</label>
            <textarea
              name="courseExperience"
              id="courseExperience"
              placeholder="Add Your Exprience here"
              {...register("courseExperience", { required: true })}
              className="form-style min-h-[130px] w-full"
            />
            {errors.courseExperience && <span>Please add your experience</span>}
          </div>

          <div>
            <button onClick={() => setReviewModal(false)}>Cancel</button>
            <IconButtonModal text={"save"} />
          </div>
        </form>
      </div>
    </div>
  );
};
