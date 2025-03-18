
import { useSelector } from "react-redux";
import { RenderCartCourses } from "../RenderCartCourses";
import { RenderTotalAmount } from "../RenderTotalAmount";

export default function Cart() {
  const { total, totalItems } = useSelector((state) => state.auth);

  return (
    <div className="text-white gap-3">
      <h1 className="text-3xl font-semibold mx-auto flex flex-col">Your Cart</h1>
      <p className="font-medium text-richblack-300 mt-4">{totalItems} Courses in Cart</p>

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
