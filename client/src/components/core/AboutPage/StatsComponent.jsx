
import React from "react";

const Stats = [
  { count: "10K", label: "Active Students" },
  { count: "10+", label: "Mentors" },
  { count: "250+", label: "Courses" },
  { count: "50+", label: "Awards & Achievements" },
];

export const StatsComponent = () => {
  return (
    <section>
      <div className="w-full flex flex-col gap-10 mx-auto text-richblack-5 justify-between mb-20 bg-richblack-700">
        <div className="grid grid-cols-2 md:grid-cols-4 text-center">
          {Stats.map((data, index) => {
            return (
              <div key={index} className="flex flex-col py-10 text-center">
                <h1 className="text-richblue-5 text-[30px] font-bold">
                  {data.count}
                </h1>
                <h2 className="text-richblack-500 font-semibold text-base">
                  {data.label}
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
