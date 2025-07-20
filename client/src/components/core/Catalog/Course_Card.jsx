
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RatingStars from "react-rating-stars-component";
import GetAvgRating from "../../../utils/avgRating";

export const Course_Card = ({ course }) => {
  const [avgRatingCount, setAvgReviwCount] = useState(0);

  useEffect(() => {
    const count = GetAvgRating(course.ratingAndReview);
    setAvgReviwCount(count);
  }, [course]);

  return (
    <Link to={`/course/${course._id}`}>
      <div className="bg-richblack-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden">
        {/* Thumbnail */}
        <div className="w-full aspect-[16/10] overflow-hidden">
          <img
            src={course?.thumbnail}
            alt="courseThumbnail"
            className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="p-4 flex flex-col gap-1">
          <p className="text-lg font-bold text-richblack-5 truncate">
            {course?.courseName}
          </p>
          <p className="text-sm text-richblack-300 truncate">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-yellow-100 text-sm">
              {(avgRatingCount || 0).toFixed(1)}
            </span>
            <RatingStars
              value={avgRatingCount}
              edit={false}
              size={20}
              activeColor="#ffd700"
            />
            <span className="text-xs text-richblack-400">Ratings</span>
          </div>

          {/* Price */}
          <p className="text-yellow-100 text-base font-semibold mt-1">
            ₹{course?.price}
          </p>
        </div>
      </div>
    </Link>
  );
};
