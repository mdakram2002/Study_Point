
import React, { useEffect, useState } from "react";
import { getInstructorData } from "../../../../services/operations/profileAPI";
import { useSelector } from "react-redux";
import { fetchInstructorCourses } from "../../../../services/operations/courseDetailsAPI";
import { Link } from "react-router-dom";
import { InstructorChar } from "./InstructorChar";

export const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            if (instructorApiData?.data?.course) {
                setInstructorData(instructorApiData.data.course);
            }
            if (result) setCourses(result);

            setLoading(false);
        };
        getCourseDataWithStats();
    }, []);

    const totalStudent = courses.reduce(
        (acc, course) => acc + (course.studentsEnrolled?.length || 0),
        0
    );

    const totalAmount = courses.reduce(
        (acc, course) => acc + ((course.studentsEnrolled?.length || 0) * course.price),
        0
    );

    return (
        <div className="text-richblack-5 px-6 py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-3xl font-semibold">Hi, {user?.firstName}</h1>
                <p className="text-richblack-300 text-lg">Let’s start something new</p>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="flex items-center justify-center h-40">
                    <span className="loading loading-spinner text-primary"></span>
                </div>
            ) : courses?.length > 0 ? (
                <>
                    {/* Chart */}
                    <div className="mb-10 bg-richblack-800 p-4 rounded-2xl shadow-lg">
                        <InstructorChar courses={courses} />
                    </div>

                    {/* Statistics */}
                    <div className="grid md:grid-cols-3 gap-4 mb-10">
                        <div className="bg-richblack-800 rounded-xl p-4 shadow">
                            <p className="text-sm text-richblack-300">Courses</p>
                            <p className="text-2xl font-bold">{courses.length}</p>
                        </div>
                        <div className="bg-richblack-800 rounded-xl p-4 shadow">
                            <p className="text-sm text-richblack-300">Total Students</p>
                            <p className="text-2xl font-bold">{totalStudent}</p>
                        </div>
                        <div className="bg-richblack-800 rounded-xl p-4 shadow">
                            <p className="text-sm text-richblack-300">Total Earnings</p>
                            <p className="text-2xl font-bold">₹ {totalAmount}</p>
                        </div>
                    </div>

                    {/* Your Courses Preview */}
                    <div className="mb-6 flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Your Courses</h2>
                        <Link
                            to="/dashboard/my-courses"
                            className="text-yellow-400 hover:underline"
                        >
                            View all
                        </Link>
                    </div>

                    {/* Courses Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.slice(0, 3).map((course) => (
                            <div
                                key={course._id}
                                className="bg-richblack-800 rounded-xl overflow-hidden shadow hover:scale-[1.02] transition-all duration-300"
                            >
                                <img
                                    src={course.thumbnail}
                                    alt={course.courseName}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-4">
                                    <p className="text-lg font-semibold mb-2">
                                        {course.courseName}
                                    </p>
                                    <div className="flex items-center justify-between text-sm text-richblack-300">
                                        <span>{course.studentsEnrolled.length} students</span>
                                        <span className="text-richblack-100">|</span>
                                        <span>₹ {course.price}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <div className="bg-richblack-800 text-center py-10 rounded-xl shadow">
                    <p className="text-lg text-richblack-100 mb-4">
                        You have not created any courses yet
                    </p>
                    <Link
                        to="/dashboard/add-course"
                        className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition"
                    >
                        Create a Course
                    </Link>
                </div>
            )}
        </div>
    );
};
