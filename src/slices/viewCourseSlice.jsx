
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseSectionData: [],
  courseEntrieData: [],
  completedLecture: [],
  totalNoOfLectures: 0,
};

const viewCourseDetails = createSlice({
  name: "viewCourse",
  initialState,
  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload;
    },
    setCourseEntrieData: (state, action) => {
      state.courseEntrieData = action.payload;
    },
    setCompletedLecture: (state, action) => {
      state.completedLecture = action.payload;
    },
    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload;
    },
    updateCompletedLecture: (state, action) => {
      state.completedLecture = [...state.completedLecture, action.payload];
    },
  },
});
export const {
  setCourseSectionData,
  setCourseEntrieData,
  setCompletedLecture,
  setTotalNoOfLectures,
  updateCompletedLecture,
} = viewCourseDetails.actions;
export default viewCourseDetails.reducer;
