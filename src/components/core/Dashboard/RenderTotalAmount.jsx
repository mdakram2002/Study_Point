
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButtonModal } from "../../common/IconButtonModal";
import { buyCourse } from "../../../services/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

export const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state)=>state.profile);

  const handleBuyNow = () => {
    const courses = cart.map((course) => course._id);
    console.log("Integrate from payment gateway", courses);
    buyCourse(token, courses, user, navigate, dispatch);
  };

  return (
    <div>
      <div className="bg-richblack-700 h-[2px] w-full mt-4"></div>
      <div className="w-fit max-w-sm sm:max-w-md">
        <div className="flex gap-1 mt-5 mb-3">
          <p className="text-2xl">Total Rs: </p>
          <p className="text-yellow-50 text-2xl font-semibold">₹{total}</p>
        </div>
        <IconButtonModal
          text="Buy Now"
          onclick={handleBuyNow}
          customClasses="w-fit p-3 max-w-sm sm:max-w-md  justify-center"
        />
      </div>
    </div>
  );
};
