
const mongoose = require("mongoose");
const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");

// Create Rating and Review
exports.createRatingAndReview = async (req, res) => {
    try {
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        if (!userId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "User ID and Course ID are required.",
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 1 and 5.",
            });
        }

        const courseDetails = await Course.findById({_id: courseId,
            studentsEnrolled:{$elemMatch: {$eq:userId}}
        });
        if (!courseDetails || !courseDetails.studentsEnrolled.includes(userId)) {
            return res.status(404).json({
                success: false,
                message: "You are not enrolled in this course.",
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId,
        });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "You have already reviewed this course.",
            });
        }

        const ratingReview = await RatingAndReview.create({
            rating,
            review,
            course: courseId,
            user: userId,
        });

        await Course.findByIdAndUpdate(
            courseId,
            { $push: { ratingAndReview: ratingReview._id } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Rating and review created successfully.",
        });
    } catch (err) {
        console.error("Error in createRatingAndReview:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while creating review and rating.",
            error: err.message,
        });
    }
};

// Get Average Rating
exports.getAverageRating = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        if (!courseId) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required.",
            });
        }

        const results = await RatingAndReview.aggregate([
            { $match: { course: new mongoose.Types.ObjectId(courseId) } },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } },
        ]);

        return res.status(200).json({
            success: true,
            averageRating: results.length > 0 ? results[0].averageRating : 0,
            message:
                results.length > 0
                    ? "Average rating fetched successfully."
                    : "No ratings yet, average is 0.",
        });
    } catch (err) {
        console.error("Error in getAverageRating:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, please try again.",
            error: err.message,
        });
    }
};

// Get All Reviews
exports.getAllRatingAndReview = async (req, res) => {
    try {
        const allReviews = await RatingAndReview.find()
            .sort({ rating: -1 })
            .populate({ path: "user", select: "firstName lastName email image" })
            .populate({ path: "course", select: "courseName" })
            .exec();

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully.",
            data: allReviews,
        });
    } catch (err) {
        console.error("Error in getAllRatingAndReview:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while fetching reviews.",
            error: err.message,
        });
    }
};
