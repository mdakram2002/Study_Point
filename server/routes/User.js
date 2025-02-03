
const express = require("express");
const router = express.Router();
const {
    logIn,
    signUp,
    sendOTP,
    changePassword,
} = require("../controllers/Auth");

const {
    resetPasswordToken,
    resetPassword,
} = require("../controllers/ResetPassword");
const { auth } = require("../middlewares/auth");

const {
    createCategory,
    showAllCategories,
    categoryPageDetails,
} = require("../controllers/Category");

const {
    createCourse,
    showAllCourses,
    getCoursesDetails,
} = require("../controllers/Course");

router.post("/login", logIn);
router.post("/signup", signUp);
router.post("/sendOTP", sendOTP);
router.post("/changePassword", auth, changePassword);

router.post("/resetPassword", resetPassword);
router.post("/resetPasswordToken", resetPasswordToken);

router.post("/createCategory", createCategory);
router.get("/showAllCategories", showAllCategories);
router.get("/categoryPageDetails", categoryPageDetails);

router.post("/createCourse", createCourse);
router.get("/showAllCourses", showAllCourses);
router.get("/getCourseDetails", getCoursesDetails);

module.exports = router;
