
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI";
import GetAvgRating from "../utils/avgRating";
import { ConfirmationModal } from "../components/common/ConfirmationModal";
import RatingStars from "../components/common/RatingStars";
import { formattedDate } from "../utils/dateFormatter";
import { TbWorld } from "react-icons/tb";
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard";

export const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { courseId } = useParams();
  const { loading } = useSelector((state) => state.profile);
  const { paymentLoading } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState(null);
  const [avgRatingCount, setAvgRatingCount] = useState(0);
  const [totalNumOfLecture, setTotalNumOfLecture] = useState(0);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const [isActive, setIsActive] = useState([]);

  // Fetch full course details on component mount or when courseId changes
  useEffect(() => {
    const getCourseFullDetails = async () => {
      if (!courseId) {
        console.error("No courseId found in params!");
        return;
      }

      try {
        const result = await fetchCourseDetails(courseId);
        console.log("Fetched course data:", result);
        setCourseData(result);
      } catch (err) {
        console.error("Could not fetch course details", err);
      }
    };

    getCourseFullDetails();
  }, [courseId]);

  // Calculate and update the average course rating when course data is loaded
  useEffect(() => {
    const count = GetAvgRating(
      courseData?.data?.courseDetails?.ratingAndReview
    );
    setAvgRatingCount(count);
  }, [courseData]);

  // Count total number of lectures by summing subSections in all courseContent sections
  useEffect(() => {
    let lecture = 0;
    courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
      lecture += sec.subSection?.length || 0;
    });

    setTotalNumOfLecture(lecture);
  }, [courseData]);

  // Handle course purchase if user is authenticated
  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "you are not logged in",
      text2: "Please login to purches the course",
      btnText1: "Login",
      btnText2: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  console.log("Fetched course data:", courseData);
  console.log(
    "courseData?.data?.courseDetails:",
    courseData?.data?.courseDetails
  );

  if (loading || !courseData?.data?.courseDetails) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="spinner border-4 border-blue-500 border-t-transparent rounded-full w-14 h-14 animate-spin"></div>
      </div>
    );
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    instructor,
    studentEnrolled = [],
    courseContent,
    ratingAndReview = [],
    createdAt,
    whatYouWillLearn,
  } = courseData?.data?.courseDetails;


  const handleActive = (id) => {
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat(id)
        : isActive.filter((e) => e !== id)
    );
  };


  return (
    <div className="relative w-11/12 max-w-screen-xl mx-auto flex flex-col text-richblack-100 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-8">
        {/* Left Section - Course Details */}
        <div className="col-span-2 space-y-3">
          <h1 className="text-3xl font-bold text-white">{courseName}</h1>

          <p className="text-lg text-richblack-200 leading-relaxed">
            {courseDescription}
          </p>

          {/* Ratings & Enrollments */}
          <div className="flex items-center gap-3 text-sm text-richblack-300">
            <RatingStars Review_Count={avgRatingCount} Star_Size={24} />
            <span>{`(${ratingAndReview.length}) review`}</span>
            <span className="text-yellow-50"></span>
            <span>{`${studentEnrolled.length} enrolled`}</span>
          </div>

          {/* Instructor Info */}
          <div className="flex gap-2 items-center text-sm text-richblack-200">
            <p>Created by:</p>
            <p className="text-white font-medium">{`${instructor?.firstName}`}</p>
          </div>

          {/* Created Date and Language */}
          <div className="flex md:flec-col gap-3 items-center text-sm text-richblack-200 mb-5">
            <p>Created on:</p>
            <p className="text-white">{formattedDate(createdAt)}</p>
            <span className="text-yellow-50">•</span>
            <TbWorld className="text-xl text-white" />
            <p>English</p>
          </div>

          <div className="text-richblack-100 space-y-1 ">
            <div className="bg-richblack-800 h-[100px] w-full mt-3 p-8">
              <p className="text-xl font-semibold">What You Will Learn</p>
              <div>{whatYouWillLearn}</div>
            </div>
            <div className="bg-richblack-700 mt-1 h-[2px] w-full"></div>

            <div>
              <div className="">
                <p className="mt-1 text-richblack-50">Course Contents: </p>
              </div>
            </div>

            <div className="flex gap-x-2 justify-between">
              <span>{courseContent.length} section(s)</span>
              <span>{totalNumOfLecture} lectures</span>
              <span>
                {
                  courseData?.data?.courseDetails?.courseContent?.reduce((acc, section) => {
                    return acc + section.subSection?.reduce((sum, sub) => {
                      return sum + parseFloat(sub.timeDuration || 0);
                    }, 0);
                  }, 0).toFixed(2)
                } minutes total length
              </span>
            </div>

            <div>
              <button
                className="text-yellow-50"
                onClick={() => setIsActive([])}
              >
                collapse all Sections
              </button>
            </div>
            <div className="mt-6 space-y-4">
              {courseContent?.map((section) => (
                <div
                  key={section._id}
                  className="bg-richblack-700 rounded-lg overflow-hidden"
                >
                  {/* Section Header */}
                  <button
                    onClick={() => handleActive(section._id)}
                    className="w-full flex justify-between items-center p-4 bg-richblack-800 hover:bg-richblack-900 transition-colors"
                  >
                    <span className="text-lg font-medium text-white">{section.sectionName}</span>
                    <span className="text-white text-xl">
                      {isActive.includes(section._id) ? "^" : "˅"}
                    </span>
                  </button>

                  {/* Section Body */}
                  {isActive.includes(section._id) && (
                    <div className="p-4 space-y-3">
                      {section.subSection?.length > 0 ? (
                        section.subSection.map((sub) => (
                          <div
                            key={sub._id}
                            className="border border-richblack-600 p-3 rounded bg-richblack-800"
                          >
                            <h4 className="text-yellow-50 font-semibold">{sub.title}</h4>
                            <p className="text-richblack-200 text-sm">{sub.description}</p>
                            <p className="text-richblack-300 text-xs mt-1">
                              Duration: {sub.timeDuration} min
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-richblack-300 text-sm">No lectures available</p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Course Card */}
        <div className="col-span-1">
          <div className="sticky top-20 mx-auto">
            <CourseDetailsCard
              course={courseData?.data?.courseDetails}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div>

      </div>

      {/* Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};
