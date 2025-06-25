
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
      <div className="bg-richblack-800 mt-2">
        {/* For button and heading  */}
        <div>
          {/* for button  */}
          <div className="flex gap-x-3">
            <div
              onClick={() => {
                navigate("/dashboard/enrolled-courses");
              }}
            >
              Back
            </div>

            <div>
              <IconButtonModal
                text={"Add Review"}
                onClick={() => setReviewModal(true)}
              />
            </div>
          </div>
          {/* for heading */}
          <div>
            <p>{courseEntrieData?.courseName}</p>
            <p>
              {completedLecture?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        {/* for section and subsection   */}
        <div>
          {courseSectionData.map((course, _id) => (
            <div
              key={course._id}
              onClick={() =>
                setActiveStatus((prev) =>
                  prev === course?._id ? "" : course?._id
                )
              }
            >
              <div className="flex justify-between items-center cursor-pointer">
                <div>{course?.sectionName}</div>

                <MdKeyboardArrowDown
                  className={`transform transition-transform duration-300 ${
                    activeStatus === course._id ? "rotate-90" : "rotate-0"
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
                    className={`flex gap-3 p-5 ${
                      videoBarActive === topic._id
                        ? "bg-yellow-100 text-richblack-900"
                        : "bg-richblack-900 text-richblack-5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLecture.includes(topic?._id)}
                      onChange={() => {}}
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
