
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
    createCourse,
    showAllCourses,
    getCoursesDetails,
} = require("../controllers/Course");

router.post("/login", logIn);
router.post("/signUp", signUp);
router.post("/sendOTP", sendOTP);
router.put("/change-password", auth, changePassword);

router.post("/reset-password",auth, resetPassword);
router.post("/resetPasswordToken",auth, resetPasswordToken);

router.post("/createCourse", createCourse);
router.get("/showAllCourses", showAllCourses);
router.get("/getCourseDetails", getCoursesDetails);

module.exports = router;
