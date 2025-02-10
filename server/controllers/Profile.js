/** @format */

const Profile = require("../models/Profile");
const CourseProgrss = require("../models/CourseProgress");
const Course = require("../models/Course");

const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../utils/SecToDuration");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CourseProgress = require("../models/CourseProgress");
dotenv.config();
const fileUpload = require("express-fileupload");

exports.updateProfile = async (req, res) => {
    try {
        const {
            name,
            profession = "",
            about = "",
            contactNumber,
            gender,
            dateOfBirth = "",
        } = req.body;

        const id = req.user?.id || req.body.id;

        if (!name || !contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required for update profile",
            });
        }

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        if (!profileDetails) {
            return res.status(404).json({
                success: false,
                message: "Profile not found",
            });
        }
        profileDetails.name = name;
        profileDetails.profession = profession;
        profileDetails.about = about;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Your Profile is updated successfully",
            profileDetails,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while updating profile, Please try again",
        });
    }
};

// Delete a Account
exports.deleteAccount = async (req, res) => {
    try {
        // get user id and validate the data
        const id = req.user.id;
        const userDetails = await User.findById({ _id: id });
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: err.message,
                message: "User not found",
            });
        }
        // Found the account id from additionalDetails and then delete it.
        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(userDetails.additionalDetails),
        });
        for (const courseId of userDetails.courses) {
            await Course.findByIdAndUpdate(
                courseId,
                { $pull: { studentsEnrolled: id } },
                { new: true }
            );
        }
        await User.findByIdAndDelete({ _id: id });
        await CourseProgress.deleteMany({ userId: id });

        return res.status(200).json({
            success: true,
            message: err.message,
            message: "User Deleted Successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            message: "Something went wrong while deleting profile, Please try again",
        });
    }
};

// Get All Details of User
exports.getAllDetails = async (req, res) => {
    try {
        // Get user id and validate the data
        const id = req.user.id;
        const userDetails = await User.findById(id)
            .populate("additionalDetails")
            .exec();
        console.log(userDetails);

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Fetched The User Details Successfully",
            userDetails,
        });
    } catch (err) {
        // Return error response
        return res.status(500).json({
            success: false,
            message: `Something went wrong while fetching user details: ${err.message}`,
        });
    }
};

// Update Display Picture
exports.updateDisplayPicture = async (req, res) => {
    try {
        console.log("Request received:", req.files);
        const displayPicture = req.files?.displayPicture;
        const userId = req.user?.id || req.body.id; // Added fallback for testing

        if (!displayPicture) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        console.log("Uploading to Cloudinary...");
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log("Cloudinary upload successful:", image);

        console.log("Updating user profile...");
        const updateProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        );

        console.log("Profile updated:", updateProfile);
        return res.status(200).json({
            success: true,
            message: "Your profile picture is updated successfully",
            data: updateProfile,
        });
    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while updating profile picture, Please try again",
        });
    }
};

// Get Enrolled Courses via User
exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        let userDetails = await User.findOne({
            _id: userId,
        })
            .populate({
                path: "courses",
                populate: {
                    path: "courseContent",
                    populate: {
                        path: "subSection",
                    },
                },
            })
            .exec();

        userDetails = userDetails.toObject();
        var subSectionLength = 0;

        for (var i = 0; i < userDetails.courses.length; i++) {
            let totalDurationInSeconds = 0;
            subSectionLength = 0;

            for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                ].subSection.reduce(
                    (acc, curr) => acc + parseInt(curr.timeDuration),
                    0
                );

                userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                );
                subSectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length;
            }

            let courseProgrssCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            });

            courseProgrssCount = courseProgrssCount?.completedVideos.length;
            if (subSectionLength === 0) {
                userDetails.courses[i].progressPercentage = 100;
            } else {
                const multiplier = Math.pow(10, 2);
                userDetails.courses[i].progressPercentage =
                    Math.round(
                        (courseProgrssCount / subSectionLength) * 100 * multiplier
                    ) / multiplier;
            }
        }
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user details with ID: ${userDetails}`,
            });
        }

        return res.status(200).json({
            success: true,
            data: userDetails.courses,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message:
                "Something went wrong while gating enrolled courses, Please try again",
        });
    }
};

// Instructor Dashboard
exports.instructorDashboard = async (req, res) => {
    try {
        const courseDetails = await Course.find({ instructor: req.user.id });

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length;
            const totalAmountGenerated = totalStudentsEnrolled * course.price;

            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,

                totalStudentsEnrolled,
                totalAmountGenerated,
            };

            return courseDataWithStats;
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, when going to instructor Dashboard",
        });
    }
};
