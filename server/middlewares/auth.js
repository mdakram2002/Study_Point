const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        // Extract token from request body, cookie, or Authorization header
        const token =
            req.cookies.token ||
            req.body.token ||
            (req.header("Authorization") &&
                req.header("Authorization").replace("Bearer ", ""));

        // If token is missing, return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // Verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            // Check if the user exists in the database
            const user = await User.findById(decode.id);
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found",
                });
            }

            // Attach the user to the request object
            req.user = user;
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (err) {
        console.error("Error in auth middleware:", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while verifying the token",
        });
    }
};

exports.isStudent = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Student") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected route for Student Only.",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannt be determined,please try again",
        });
    }
};

exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected route for Instructor Only.",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannt be determined,please try again",
        });
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a Protected route for Admin Only.",
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User role cannt be determined,please try again",
        });
    }
};
