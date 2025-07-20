
import React from "react";
import { HighlightText } from "../HomePage/HighlightText";

export const Quote = () => {
  return (
    <div className="mx-auto py-5 text-xl pb-20 text-center text-white md:text-4xl font-semibold">
      We are deeply passionate about transforming the way we learn and grow. Our
      cutting-edge platform seamlessly{" "}
      <span className="bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text font-bold">
        combines technology
      </span>
      , {" "}
      <span className="bg-gradient-to-b from-[#A0CFFF] via-[#72B8FF] to-[#C2E9FB] text-transparent bg-clip-text">
        expertise
      </span>
      ,{" "}and a thriving community to create an
      <HighlightText text={"unparalleled educational experience."} />
    </div>
  );
};
