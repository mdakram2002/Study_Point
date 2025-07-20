
import { useSelector } from "react-redux";
import { RenderCartCourses } from "../RenderCartCourses";
import { RenderTotalAmount } from "../RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.cart);
  // console.log("Cart items", totalItems);
  return (
    <div className="text-white gap-3">
      <h1 className="text-3xl font-semibold mx-auto flex flex-col">Your Cart</h1>
      <p className="font-medium text-richblack-300 mt-4">{totalItems} Courses in Your Cart</p>
      <div className="bg-richblack-700 h-[2px] w-full mt-1"></div>
      {total > 0 ? (
        <div className="gap-y-3">
          <RenderCartCourses />
          <RenderTotalAmount />
        </div>
      ) : (
        <p className="text-richblack-300">Your Cart is Empty</p>
      )}
    </div>
  );
}
