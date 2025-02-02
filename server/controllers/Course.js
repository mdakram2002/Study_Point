
const Course = require("../models/Course");
const Category = require("../models/category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
    try {
        // fetch the data from request body and get thumbnail
        const { courseName, courseDescription, whatYouWillLearn, price, category } =
            req.body;
        const thumbnail = req.files.themnaiImage;

        // validate the course data, no any empty data
        if (
            !courseName ||
            !courseDescription ||
            !whatYouWillLearn ||
            !price ||
            !category ||
            !thumbnail
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }

        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details: ", instructorDetails);
        // TODO: verify that userId and instructorDetails._id are the same?

        if (!instructorDetails) {
            return res.status(404).json({
                success: false,
                message: "Instruct Details not found",
            });
        }
        const categoryDetails = await User.findById(Category);
        if (!categoryDetails) {
            return res.status(404).json({
                success: false,
                message: "Categorys Details not found",
            });
        }
        // Uploading image on cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
        );

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price: price,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });
        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    course: newCourse._id,
                },
            },
            { new: true }
        );
        // update the category schema
        //TODO: update the category schema

        return res.status(200).json({
            success: true,
            message: "Course Created successfully",
            data: newCourse,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
        });
    }
};

// getAllCourse
exports.showAllCourses = async (req, res) => {
    try {
        const allCourse = await Course.find(
            {},
            {
                courseName: true,
                price: true,
                institution: true,
                ratingAndReview: true,
                studendEnrolled: true,
            }
        )
            .populate("instructor")
            .exec();
            
        return res.status(200).json({
            success: true,
            message: "Data for all courses fetchd successfully.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error: err.message,
        });
    }
};

exports.getCoursesDetails = async (req, res) => {
    try {
        const { courseId } = req.body;

        const courseDetails = await Course.findById({ _id: courseId })
            .populate({
                path: "instructor",
                populate: {
                    path: "additionalDetails",
                },
            })
            .populate("category")
            .populate("ratingAndReview")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: `Could not find course with ${courseId}`,
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course Details Fetched Successfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message,
            message: "Something went wrong, Please try again",
        });
    }
};
