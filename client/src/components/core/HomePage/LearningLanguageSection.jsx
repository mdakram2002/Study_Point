
import { HighlightText } from "./HighlightText";
import { CTAButton } from "./CTAButton";

import KnowYourProgress from "../../../Assets/Image/Know_your_progress (1).svg";
import CompairWithOthers from "../../../Assets/Image/Compare_with_others.svg";
import PlanYourLession from "../../../Assets/Image/Plan_your_lessons (1).svg";

export const LearningLanguageSection = () => {
  return (
    <div className="flex flex-col items-center">
      <div>
        <div className="text-4xl items-center text-center text-richblack-700 font-semibold my-10">
          Your swiss knife for
          <HighlightText text={"learning any language"} />
        </div>
        <div className="mx-auto text-center text-richblack-700 text-base w-[75%]">
          Using spin making learning multiple languages easy. with 20+ languages
          realistic voice-over, progress tracking, custom schedule and more.
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center">
          <img
            src={KnowYourProgress}
            alt="KnowYourProgressImg"
            className="object-contain lg:-mr-32 lg:mt-0 mt-10"
          />
          <img
            src={CompairWithOthers}
            alt="CompairWithOthers"
            className="object-contain lg:-mb-10 lg:-mt-0"
          />
          <img
            src={PlanYourLession}
            alt="PlanYourLession"
            className="object-contain  lg:-ml-36 lg:-mt-5"
          />
        </div>
      </div>
      <div className="flex mb-10 lg:mt-14 lg:mb-12 w-fit items-center">
        <CTAButton active={true} linkto={"/signup"}>
          <div>Learn More</div>
        </CTAButton>
      </div>
    </div>
  );
};
