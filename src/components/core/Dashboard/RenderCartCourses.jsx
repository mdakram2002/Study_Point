
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GiNinjaStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from "../../../slices/cartSlice";
import ReactStars from "react-rating-stars-component";


export const RenderCartCourses = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  return (
    <div className="text-white">
      {cart.map((index, course) => (
        <div key={index}>
          <div>
            <img src={course?.thumbnail} alt="courseThumbnail" />
            <div>
              <p>{course?.courseName}</p>
              <p>{course?.category?.name}</p>
              <div>
                {/* fetch the average rating from backend data  */}
                {/* this is hard code rating  */}

                <span>4.8</span>
                <ReactStars
                  count={5}
                  size={20}
                  edit={false}
                  aactiveColor="#ffd700"
                  emptyIcon={<GiNinjaStar />}
                  fullIcon={<GiNinjaStar />}
                />

                <span>{course?.ratingAndReview.length}Ratings</span>
              </div>
            </div>
          </div>
          <div>
            <button onClick={() => dispatch(removeFromCart(course._id))}>
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>

            <p>Rs:{course?.price}</p>

          </div>
        </div>
      ))}
    </div>
  );
};
