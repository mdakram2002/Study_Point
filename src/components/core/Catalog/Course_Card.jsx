
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../common/RatingStars";
import GetAvgRating from "../../../utils/avgRating";

export const Course_Card = ({ course, Height }) => {
  const [avgRatingCount, setAvgReviwCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview);
    setAvgReviwCount(count);
  }, [course]);

  return (
    <div>
      <Link to={`/course/${course._id}`}>
        <div>
          <div className="w-full rounded-md object-cover">
            <img
              src={course?.thumbnail}
              alt="courseThumbnail"
              className={`${Height} w-full rounded-md object-cover`}
            />
          </div>

          <div className="flex flex-col gap-1 px-1 py-3">
            <p className="text-lg text-richblack-50">{course?.courseName}</p>
            <p className="text-lg text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 font-bold">{avgRatingCount || 0}</span>
              <RatingStars Review_Count={avgRatingCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-xl text-richblack-5">${course?.price}</p>
          </div>

        </div>
      </Link>
    </div>
  );
};
