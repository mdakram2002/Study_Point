
import { FaPlay } from "react-icons/fa";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLecture } from "../../../slices/viewCourseSlice";
import { IconButtonModal } from "../../common/IconButtonModal";

export const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const playRef = useRef();
  const {
    courseSectionData,
    courseEntrieData,
    completedLecture,
    totalNoOfLectures,
  } = useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return;

      if (!courseId || !sectionId || !subSectionId) {
        navigate("/dashboard/enrolled-courses");
        return;
      }

      const currentSection = courseSectionData.find(
        (course) => course._id === sectionId
      );
      const currentSubSection = currentSection?.subSection.find(
        (data) => data._id === subSectionId
      );

      if (currentSubSection) {
        setVideoData(currentSubSection);
        setVideoEnded(false);
      } else {
        setVideoData(null);
      }
    };

    setVideoSpecificDetails();
  }, [courseSectionData, courseEntrieData, location.pathname]);

  const ifFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  const ifLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSection - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSubSectionIndex !== noOfSubSection - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id;
      // go to this URL or next video
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
      const firstSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id;
      // go to this URL or video
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${firstSubSectionId}`
      );
    }
  };

  const goToPreviousVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    );

    const noOfSubSection =
      courseSectionData[currentSectionIndex].subSection.length;

    const currentSubSectionIndex = courseSectionData[
      currentSectionIndex
    ].subSectionId.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex != 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ];
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length;
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };
  const handleLectureCompletion = async () => {
    setLoading(true);
    const resposne = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    );
    if (resposne) {
      dispatch(updateCompletedLecture(subSectionId));
    }
    setLoading(false);
  };

  return (
    <div>
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <div>
          <Player
            ref={playRef}
            aspectRatio="16:9"
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
          >
            <FaPlay />

            {videoEnded && (
              <div>
                {!completedLecture.includes(subSectionId) && (
                  <IconButtonModal
                    disabled={loading}
                    onclick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                  />
                )}

                <IconButtonModal
                  disabled={loading}
                  onclick={() => {
                    if (playRef?.current) {
                      playRef.current?.seek(0);
                      setVideoEnded(false);
                    }
                  }}
                  text={"Rewatch"}
                  customClasses={"text-lg"}
                />

                <div className="">
                  {!ifFirstVideo() && (
                    <button
                      onClick={() => goToPreviousVideo()}
                      className="blackButton"
                    >
                      Prev
                    </button>
                  )}

                  {!ifLastVideo() && (
                    <button
                      onClick={() => goToNextVideo()}
                      className="blackButton"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}
      <h1 className="text-richblack-100 text-lg">{videoData?.title}</h1>
      <p className="text-richblack-100 text-lg">{videoData?.description}</p>
    </div>
  );
};
