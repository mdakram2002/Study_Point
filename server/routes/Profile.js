
const express = require("express");
const router = express.Router();

// Import controllers
const {
    updateProfile,
    deleteAccount,
    getAllDetails,
    updateDisplayPicture,
    getEnrolledCourses,
    instructorDashboard,
} = require("../controllers/Profile");

const { auth, isInstructor } = require("../middlewares/auth");

// Debugging output:
// console.log("updateProfile:", updateProfile);
// console.log("deleteAccount:", deleteAccount);
// console.log("getAllDetails:", getAllDetails);
// console.log("contact:", contact);

// Define routes
router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteAccount", auth, deleteAccount);
router.get("/getAllDetails", auth,  getAllDetails);

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);

// Export router
module.exports = router;