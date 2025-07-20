import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import toast from "react-hot-toast";
import Copy from "copy-to-clipboard";
import { FaRegShareSquare } from "react-icons/fa";

function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const {
    thumbnail: ThumbnailImg,
    price: CurrentPrice,
    courseDescription: CourseDescrip,
    studentsEnrolled = [],
    _id: courseId,
  } = course;

  const handleAddToCart = () => {
    // dispatch(addToCart(course));
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You're an Instructor, you cant buy a course");
      return;
    }
    if (token) {
      dispatch(addToCart(course));
    }
  };

  const handleShare = () => {
    Copy(window.location.href);
    toast.success("Link copy to clickboard");
  };

  const isEnrolled = user && studentsEnrolled.includes(user._id);

  const handlePrimaryAction = () => {
    if (isEnrolled) {
      navigate(`/dashboard/enrolled-courses`);
    } else {
      handleBuyCourse();
    }
  };

  return (
    <div className="lg:w-[400px] bg-richblack-800 text-richblack-5 rounded-lg overflow-hidden shadow-lg">
      {/* Thumbnail */}
      <img
        src={ThumbnailImg}
        alt="Course Thumbnail"
        className="w-full object-cover p-2 rounded-2xl h-[180px] sm:h-[200px] md:h-[220px] lg:h-[250px]"
      />

      {/* Description and Price */}
      <div className="p-4 flex flex-col gap-3">
        <p className="text-sm text-richblack-100">
          {CourseDescrip.split(" ").slice(0, 10).join(" ")}...
        </p>
        {/* instruction  */}
        <div className="text-richblack-100 text-sm">
          <p>31-Day Money-Back Guarantee</p>
          <div className="flex gap-1">
            <p className="flex">This Course Includes: </p>
            <div className="flex flex-col gap-y-4">
              {course?.instructions?.map((item, index) => (
                <p key={index} className="flex gap-2">
                  <span>{item}</span>
                </p>
              ))}
            </div>
          </div>
        </div>

        <p className="text-2xl font-bold text-yellow-50">₹{CurrentPrice}</p>

        {/* Primary Action Button */}
        <button
          onClick={handlePrimaryAction}
          className="mt-2 bg-yellow-50 text-richblack-900 font-semibold py-2 px-4 rounded hover:bg-yellow-100 hover:ring-2 hover:ring-yellow-100 transition-all shadow-md"
        >
          {isEnrolled ? "Go to Course" : "Buy Now"}
        </button>

        {/* Add to Cart Button */}
        {!isEnrolled && (
          <button
            onClick={handleAddToCart}
            className="bg-richblack-900 text-richblack-25 font-semibold py-2 px-4 rounded mt-2 hover:bg-richblack-700 transition-all"
          >
            Add to Cart
          </button>
        )}
        {
          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-1 text-sm text-yellow-100 underline mt-1 hover:text-yellow-200 transition-all"
          >
            <FaRegShareSquare />
            <span>Share</span>
          </button>
        }
      </div>
    </div>
  );
}
export default CourseDetailsCard;
