/** @format */

const mongoose = require("mongoose");
const crypto = require("crypto");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const User = require("../models/User");
const mainSender = require("../utils/mailSender");
require("dotenv").config();
const {
    courseEnrollmentEmail,
} = require("../email/template/courseEnrollEmail");
const {
    paymentSuccessEmail,
} = require("../email/template/PaymentSuccessEmail");

exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    // console.log("User ID:", userId);
    // console.log("Courses to enroll:", courses);

    // 1) Validate input
    if (!Array.isArray(courses) || courses.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide at least one course ID.",
        });
    }

    // 2) Sum up prices and check enrollment
    let totalAmount = 0;
    for (const courseId of courses) {
        let course;
        try {
            course = await Course.findById(courseId);
            if (!course) {
                return res.status(404).json({
                    success: false,
                    message: `Course not found: ${courseId}`,
                });
            }
            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(409).json({
                    success: false,
                    message: `Already enrolled in course ${courseId}`,
                });
            }
            totalAmount += course.price;
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    }

    // 3) Create a single Razorpay order for the total amount
    try {
        console.log("Total amount for order:", totalAmount);
        console.log("Order Params:", {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        });

        const order = await instance.orders.create({
            amount: totalAmount * 100,
            currency: "INR",
            receipt: `${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        });

        console.log("PAYMENT ORDER RESPONSE", order);
        res.status(200).json({ success: true, data: order });
    } catch (err) {
        console.error("Razorpay error details:", err);
        return res.status(502).json({
            success: false,
            message: "Payment gateway error. Please try again later.",
            error: err.message,
        });
    }
};

exports.verifySignature = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        courses,
    } = req.body;
    const userId = req.user.id;

    // 1) Validate request body
    if (
        !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !Array.isArray(courses) ||
        courses.length === 0
    ) {
        return res.status(400).json({
            success: false,
            message: "Incomplete payment data.",
        });
    }

    // 2) Verify signature with HMAC-SHA256
    const generatedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

    if (generatedSignature !== razorpay_signature) {
        return res.status(400).json({
            success: false,
            message: "Invalid payment signature.",
        });
    }

    // 3) Enroll student in courses
    try {
        for (const courseId of courses) {
            // Enroll user in course
            await Course.findByIdAndUpdate(
                courseId,
                { $addToSet: { studentsEnrolled: userId } },
                { new: true }
            );

            // Create course progress
            const courseProgress = await CourseProgress.create({
                courseID: courseId,
                userId: userId,
                completedVideos: [],
            });

            // Add course and progress to user
            await User.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {
                        courses: courseId,
                        courseProgress: courseProgress._id,
                    },
                },
                { new: true }
            );
        }

        // Optionally return the updated list of enrolled courses to the frontend
        const updatedUser = await User.findById(userId).populate("courses");
        console.log("UPDATED USER:", updatedUser);

        // 4) Send enrollment email
        const user = await User.findById(userId);
        await mainSender(
            user.email,
            "Congratulations on your purchase!",
            paymentSuccessEmail(
                user.firstName,
                user.lastName,
                razorpay_order_id,
                razorpay_payment_id
            ),
            courseEnrollmentEmail(courses.courseName, user.firstName)
        );

        return res.status(200).json({
            success: true,
            message: "Payment verified and courses enrolled.",
            enrolledCourse: updatedUser.courses,
        });
    } catch (err) {
        console.error("Enrollment after payment failed:", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Server error during enrollment.",
        });
    }
};

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;
    const userId = req.user.id;

    if (!userId || !orderId || !paymentId || !amount) {
        return res.status(400).json({
            success: false,
            message: "Please Provide All The Details, From Payment",
        });
    }

    try {
        const enrolledStudent = await User.findById(userId);
        await mainSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName}`,
                amount / 100,
                orderId,
                paymentId
            )
        );
    } catch (err) {
        console.log("Error in sending mail", err);
        return res.status(500).json({
            success: false,
            message: err.message || "Could not send email",
        });
    }
};