
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLecture,
  setCourseEntrieData,
  setCourseSectionData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";
import { VedioDetailsSidebar } from "../components/core/ViewCourse/VedioDetailsSidebar";
import { CourseReviewModal } from "../components/core/ViewCourse/CourseReviewModal";

export const ViewCourses = () => {
  const [reviewModal, setReviewModal] = useState(false);
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const setCourseSpecificDetails = async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token);
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
      dispatch(setCourseEntrieData(courseData.courseDetails));
      dispatch(setCompletedLecture(courseData.completedVideos));

      let lecture = 0;
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lecture += sec.subSection.length;
      });
      dispatch(setTotalNoOfLectures(lecture));
    };
    setCourseSpecificDetails();
  }, []);

  return (
    <>
      <div className="relative flex min-h-[calc(100vh-3.5rem)]">
        <div className="hidden md:block">
          <VedioDetailsSidebar setReviewModal={setReviewModal} />
        </div>

        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};
