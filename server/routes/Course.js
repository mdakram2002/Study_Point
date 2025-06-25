
const express = require("express");
const router = express.Router();
const { auth, isStudent, isInstructor, isAdmin } = require("../middlewares/auth");

const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");

// Section Controllers Imports
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

// SubSection Controllers Imports
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

// Course Controllers Import
const {
  createCourse,
  editCourse,
  deleteCourse,
  showAllCourses,
  getCoursesDetails,
  getFullCourseDetails,
  updateCourseProgress,
  getInstructorCourses,

} = require("../controllers/Course");

// Rating Controllers Import
const {
  createRatingAndReview,
  getAverageRating,
  getAllRatingAndReview,
} = require("../controllers/RatingAndReview");

// Review and Rating routes
router.post("/createRating", auth, isStudent, createRatingAndReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getReview", getAllRatingAndReview);

// Sections routes
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.delete("/deleteSection", auth, isInstructor, deleteSection);

// SubSection routes
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);

// Category routes (Only by Admin)
router.post("/createCategory", auth, isAdmin, createCategory);
// Public routes
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);

// Course routes
router.post('/createCourse', auth, isInstructor, createCourse);
router.put("/editCourse", auth, isInstructor, editCourse);
router.delete("/deleteCourse", deleteCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCoursesDetails", getCoursesDetails);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);

module.exports = router;