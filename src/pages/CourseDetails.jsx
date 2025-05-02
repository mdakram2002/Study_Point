
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../services/studentFeaturesAPI";
import { useNavigate, useParams } from "react-router-dom";

export const CourseDetails = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state)=> state.profile);
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch);
      return;
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={() => handleBuyCourse()}
        className="bg-yellow-50 p-4 mt-10"
      >
        By Now
      </button>
    </div>
  );
};
