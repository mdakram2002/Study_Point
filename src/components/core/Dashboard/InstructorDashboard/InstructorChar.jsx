
import React, { useState } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const InstructorChar = ({ courses }) => {
  const [currChart, setCurrChart] = useState("students");

  const getRandomColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
      const color = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
        Math.random() * 256
      )}, ${Math.floor(Math.random() * 256)})`
      colors.push(color);
    }
    return colors;
  };

  const chartData = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: currChart === "students" ? "Students" : "Earnings",
        data: courses.map((course) =>
          currChart === "students"
            ? course.totalStudentsEnrolled
            : course.totalAmountGenerated
        ),
        backgroundColor: getRandomColors(courses.length),
        borderWidth: 1,
      },
    ],
  };
  console.log("Courses:", courses);


  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#fff",
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text:
          currChart === "students"
            ? "Total Students per Course"
            : "Earnings per Course",
        color: "#fff",
        font: {
          size: 20,
        },
      },
    },
  };

  return (
    <div className="bg-richblack-900 p-4 rounded-xl shadow-lg">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-white">
          Visualize Course Data
        </h2>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrChart("students")}
            className={`px-4 py-1 rounded-md font-medium transition ${currChart === "students"
              ? "bg-yellow-400 text-black"
              : "bg-richblack-700 text-white hover:bg-richblack-600"
              }`}
          >
            Students
          </button>
          <button
            onClick={() => setCurrChart("earnings")}
            className={`px-4 py-1 rounded-md font-medium transition ${currChart === "earnings"
              ? "bg-yellow-400 text-black"
              : "bg-richblack-700 text-white hover:bg-richblack-600"
              }`}
          >
            Earnings
          </button>
        </div>
      </div>

      <div className="w-full aspect-[1/1] max-w-[500px] mx-auto">
        {courses.length > 0 ? (
          <PolarArea data={chartData} options={options} />
        ) : (
          <p className="text-white text-center">No data available to display chart</p>
        )}
      </div>
    </div>
  );
};
