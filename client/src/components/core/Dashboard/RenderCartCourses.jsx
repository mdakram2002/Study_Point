
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";

export const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="text-white flex flex-col gap-6 mt-6">
      {cart.map((course, index) => (
        <div
          key={course._id || index}
          className="flex flex-col lg:flex lg:flex-row w-full rounded-lg overflow-hidden shadow-md"
        >
          {/* Left Half: Thumbnail (Yellow) */}
          <div className=" bg-richblack-800 p-4 flex items-center justify-center">
            <img
              src={course?.thumbnail}
              alt="courseThumbnail"
              className=" min-h-[210px] max-h-[310px] w-full rounded-md object-contain"
            />
          </div>

          {/* Right Half: Details (Rich Black) */}
          <div className=" bg-richblack-800 p-4 flex flex-col justify-between">
            <div>
              <div className="flex flex-col gap-2">
                <p className="text-xl font-semibold">{course?.courseName}</p>
                <p className="text-sm text-richblack-100">
                  {course?.courseDescription}
                </p>
                <p className="text-sm text-richblack-100 mb-2">
                  Categroy: {course?.category?.name}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <ReactStars
                  count={5}
                  size={24}
                  value={course?.ratingAndReview?.length}
                  isHalf={true}
                  edit={false}
                  activeColor="#FFD700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                  classNames="custom-star-style"
                />
                <span>{course?.ratingAndReview?.length || 0} Ratings</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between items-center">
              <p className="text-lg font-bold text-yellow-50">
                ₹ {course?.price}
              </p>
              <button
                onClick={() => dispatch(removeFromCart(course._id))}
                className="flex items-center gap-1 text-red-400 hover:text-red-500 transition-colors"
              >
                <RiDeleteBin6Line />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
