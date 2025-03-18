
import React from "react";
import { useSelector } from "react-redux";
import { IconButtonModal } from "../../common/IconButtonModal";

export const RenderTotalAmount = () => {
  const { total, cart } = useSelector((state) => state.cart);

  const handleBuyNow = () => {
    const courses = cart.map((course) => course._id);
    console.log("Integrate from payment gateway", courses);
    // TODO: API integrate from payment gateway
  };

  return (
    <div>
      <p>Total: </p>
      <p>Rs: {total}</p>
      <IconButtonModal
        text="Buy Now"
        onclick={handleBuyNow}
        customClasses={"w-full justify-center"}
      />
    </div>
  );
};
