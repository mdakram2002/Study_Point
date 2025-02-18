import React from "react";
import { CTAButton } from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export const CodeBlocks = ({
  position,
  heading,
  subHeading,
  ctabtn1,
  ctabtn2,
  codeColor,
  codeblock,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-col lg:gap-10`}>
      {/*Section one */}
      <div className="flex flex-col w-[100%] lg:w-[50%] gap-7 ">
        {heading}
        <div className="text-pure-greys-200 font-semibold text-[15px]">
          {subHeading}
        </div>

        <div className="flex gap-7 mt-4">
          <CTAButton active={true} linkto={ctabtn1.linkto}>
            <div className="flex gap-2 items-center">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>

          <CTAButton active={false} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/*Section two (code animation)*/}
      <div className="h-fit flex flex-row text-[15px] sm:text-sm sm:leading-6  w-[100%] py-3 lg:w-[500px] code-border relative">
        <div className="text-center flex flex-col w-[10%] text-richblue-400 font-bold ">
          <div className="codeblock2 absolute"></div>
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
        </div>
        <div
          className={`w-[90%] flex flex-col font-bold font-mono ${codeColor} pr-2 `}
        >
          {/*code animation */}
          <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
};
