
const express = require("express");
const router = express.Router();
const {
    logIn,
    signUp,
    sendOTP,
    logOut,
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
router.delete("/logOut", logOut);

router.post("/reset-password", resetPassword);
router.post("/resetPasswordToken", resetPasswordToken);

router.post("/createCourse", createCourse);
router.get("/showAllCourses", showAllCourses);
router.get("/getCourseDetails", getCoursesDetails);

module.exports = router;
