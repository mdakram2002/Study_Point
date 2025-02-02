
const express = require("express");
const router = express.Router();
const {
    login,
    signup,
    sendotp,
    changepassword,
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

router.post("/login", login);
router.post("/signup", signup);
router.get("/sendotp", sendotp);
router.post("/changepassword", auth, changepassword);

router.post("/resetPassword", resetPassword);
router.post("/resetPasswordToken", resetPasswordToken);

router.post("/createCategory", createCategory);
router.get("/showAllCategries", showAllCategories);
router.get("/categoryPageDetails", categoryPageDetails);

router.post("/createCourse", createCourse);
router.get("/showAllCourses", showAllCourses);
router.get("/getCourseDetails", getCoursesDetails);

module.exports = router;