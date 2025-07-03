
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI";
import { updateCompletedLecture } from "../../../slices/viewCourseSlice";
import { IconButtonModal } from "../../common/IconButtonModal";
import { BiSolidSkipPreviousCircle } from "react-icons/bi";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { MdOutlineReplayCircleFilled } from "react-icons/md";

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
    ].subSection.findIndex((data) => data._id === subSectionId);

    if (currentSectionIndex != 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id;
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
    <div className="md:w-[calc(100vw-320px)] w-screen p-3">
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <div>
          <Player
            fluid
            className="!w-full !h-[calc(100vh-100px)] object-cover"
            ref={playRef}
            aspectRatio="16:9"
            onEnded={() => setVideoEnded(true)}
            src={videoData?.videoUrl}
            autoPlay={false}
          >

            {videoEnded && (
              <div className="flex justify-center items-center">
                <div className="absolute left-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                  <IconButtonModal
                    disabled={loading}
                    onclick={handleLectureCompletion}
                    className="bg-yellow-100 text-richblack-900 hover:scale-90 font-medium md:text-sm px-4 py-2 rounded-md"
                    text={!loading ? "Mark As Completed" : "Loading..."}
                  />
                </div>

                <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                  {!ifFirstVideo() && (
                    <button
                      className=" z-20 left-0 top-1/2 transform -translate-y-1/2 absolute m-5"
                      disabled={loading}
                      onClick={() => goToPreviousVideo()}
                    >
                      <BiSolidSkipPreviousCircle />
                      Prev
                    </button>
                  )}

                  {
                    <MdOutlineReplayCircleFilled
                      onClick={() => {
                        playRef.current.seek(0);
                        playRef.current.play(); // auto play true, when click on rewatch icon/circle
                        setVideoEnded(false);
                      }}
                      className="text-2xl md:text-5xl bg-richblack-600 rounded-full cursor-pointer hover:scale-90 absolute left-1/2 top-1/2 z-20"
                    />
                  }

                  {!ifLastVideo() && (
                    <button
                      className=" z-20 right-4 top-1/2 transform -translate-y-1/2 absolute m-5"
                      disabled={loading}
                      onClick={() => goToNextVideo()}
                    >
                      <BiSolidSkipNextCircle />
                      Next
                    </button>
                  )}
                </div>
              </div>
            )}
          </Player>
        </div>
      )}
      <div className="mt-5">
        <h1 className="text-richblack-100 text-lg">{videoData?.title}</h1>
        <p className="text-richblack-100 text-lg">{videoData?.description}</p>
      </div>
    </div>
  );
};
