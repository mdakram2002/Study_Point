
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { IconButtonModal } from "../../common/IconButtonModal";
import { MdKeyboardArrowDown } from "react-icons/md";
export const VedioDetailsSidebar = ({ setReviewModal }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntrieData,
    completedLecture,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    (() => {
      if (!courseSectionData.length) return;
      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );

      const currentSubSectionIndex = courseSectionData?.[
        currentSectionIndex
      ]?.subSection.findIndex((data) => data._id === subSectionId);

      const activeSubSectionId =
        courseSectionData[courseSectionData]?.subSection?.[
          currentSubSectionIndex
        ]?._id;
      // Set Current Section and SubSection Here
      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    })();
  }, [courseSectionData, courseEntrieData, location.pathname]);

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] w-[320px] max-w-[350px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
          <div className="flex w-full items-center justify-between ">
            <div
              className="cursor-pointer py-2 p-4 border bg-richblack-800 rounded-md"
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              Back
            </div>

            <div>
              <IconButtonModal
                text={"Add Review"}
                customClasses="ml-auto"
                onclick={() => setReviewModal(true)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <p>{courseEntrieData?.courseName}</p>
            <p className="text-sm font-semibold text-richblack-500">
              {completedLecture?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((course, _id) => (
            <div
              className="mt-2 cursor-pointer text-sm text-richblack-5"
              key={course._id}
              onClick={() =>
                setActiveStatus((prev) =>
                  prev === course?._id ? "" : course?._id
                )
              }
            >
              <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
                <div className="w-[70%] font-semibold">{course?.sectionName}</div>
                <MdKeyboardArrowDown
                  className={`transform transition-transform duration-300 ${activeStatus === course._id ? "rotate-90" : "rotate-0"
                    }`}
                />
              </div>
            </div>
          ))}
        </div>

        {/* SubSection */}
        <div>
          {courseSectionData
            .filter((course) => course._id === activeStatus)
            .map((course) => (
              <div key={course._id}>
                {course.subSection.map((topic, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      navigate(
                        `/view-course/${courseEntrieData?._id}/section/${course._id}/subSection/${topic._id}`
                      );
                      setVideoBarActive(topic._id);
                    }}
                    className={`flex gap-3 p-5 ${videoBarActive === topic._id
                        ? "bg-yellow-100 text-richblack-900"
                        : "bg-richblack-900 text-richblack-5"
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLecture
                        .map((id) => id.toString())
                        .includes(topic?._id.toString())}
                      readOnly
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            ))}
        </div>

      </div>
    </>
  );
};
