const mongoose = require("mongoose");
const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mainSender = require("../utils/mailSender");
const { courseEnrollEmail } = require("../email/template/courseEnrollEmail");

exports.capturePayment = async (req, res) => {
    try {
        const { course_id } = req.body;
        const userId = req.user.id;

        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid course ID."
            });
        }

        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        if (course.studentsEnrolled.some(student => student.toString() === userId)) {
            return res.status(200).json({
                success: false,
                message: "Student is already enrolled in this course."
            });
        }

        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100,
            currency,
            receipt: `${Date.now()}_${Math.floor(Math.random() * 100)}`,
            notes: { courseId: course_id, userId }
        };

        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount
        });
    } catch (err) {
        console.error("Error in capturePayment:", err);
        return res.status(500).json({
            success: false,
            message: "An error occurred while processing the payment.",
            error: err.message
        });
    }
};

exports.verifySignature = async (req, res) => {
    try {
        const webhookSecret = "123456";
        const signature = req.headers["x-razorpay-signature"];
        const shasum = crypto.createHmac("sha256", webhookSecret);
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if (signature !== digest) {
            return res.status(400).json({
                success: false,
                message: "Invalid Request. Signature verification failed."
            });
        }

        console.log("Payment is Authorized");
        const { courseId, userId } = req.body.payload.payment.entity.notes;

        const enrolledCourse = await Course.findByIdAndUpdate(
            courseId,
            { $push: { studentsEnrolled: userId } },
            { new: true }
        );

        if (!enrolledCourse) {
            return res.status(404).json({
                success: false,
                message: "Course not found."
            });
        }

        const enrolledStudent = await User.findByIdAndUpdate(
            userId,
            { $push: { courses: courseId } },
            { new: true }
        );

        if (!enrolledStudent) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        await mainSender(
            enrolledStudent.email,
            "Congratulations from StudyPoint",
            "Congratulations, you have been enrolled in a new StudyPoint course."
        );

        return res.status(200).json({
            success: true,
            message: "Signature Verified and Course Added."
        });
    } catch (err) {
        console.error("Error in verifySignature:", err);
        return res.status(500).json({
            success: false,
            message: "Signature verification failed.",
            error: err.message
        });
    }
};
