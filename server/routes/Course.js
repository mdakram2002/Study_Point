
const express = require("express");
const router = express.Router();

const { auth, isStudent } = require("../middlewares/auth");
const {
  createRatingAndReview,
  getAverageRating,
  getAllRatingAndReview,
} = require("../controllers/RatingAndReview");

const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/SubSection");

router.post("/createRating", auth, isStudent, createRatingAndReview);
router.get("/getAverageRating", getAverageRating);
router.get("/getReview", getAllRatingAndReview);

router.post("/createSection", createSection);
router.post("/updateSection", updateSection);
router.delete("/deleteSection", deleteSection);

router.post("/createSubSection", createSubSection);
router.post("/updateSubSection", updateSubSection);
router.delete("/deleteSubSection", deleteSubSection);

module.exports = router;