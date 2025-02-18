import React from "react";
import { HighlightText } from "./HighlightText";
import { CTAButton } from "./CTAButton";

import KnowYourProgress from "../../../Assets/Image/Know_your_progress (1).svg";
import CompairWithOthers from "../../../Assets/Image/Compare_with_others.svg";
import PlanYourLession from "../../../Assets/Image/Plan_your_lessons (1).svg";

export const LearningLanguageSection = () => {
  return (
    <div className="mt-24">
      <div className="flex flex-col gap-5 items-center w-11/12 max-w-maxContent">
        <div className="text-4xl items-center text-richblack-700 font-semibold">
          Your swiss knife for
          <HighlightText text={"learning any language"} />
        </div>
        <div className="mx-auto text-center text-richblack-700 text-base w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-row items-center justify-center ml-20">
          <img
            src={KnowYourProgress}
            alt="KnowYourProgressImg"
            className="object-contain -mr-32"
          />
          <img
            src={CompairWithOthers}
            alt="CompairWithOthers"
            className="object-contain"
          />
          <img
            src={PlanYourLession}
            alt="PlanYourLession"
            className="object-contain -ml-36"
          />
        </div>

        <div className="mb-20">
          <CTAButton active={true} linkto={"/signup"}>
            <div>Learn More</div>
          </CTAButton>
        </div>
      </div>
    </div>
  );
};
