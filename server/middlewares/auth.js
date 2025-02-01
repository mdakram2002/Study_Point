const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

exports.auth = async (req, res, next) => {
    try {
        // extract token from request body , cookie and Bearer
        const token =
            req.cookies.token ||
            req.body.token ||
            req.header("Authorisation").replace("Bearer", "");
        // if token is missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        // varify the tok en
        try {
            const decode = await jwt.verify(token, process.env.JWT_SECERT);
            console.log(decode);
            req.user = decode;
        } catch (e) {
            return res.status(401).json({
                success: false,
                message: "token is invalid",
            });
        }
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Somthing went wrong while verifying the token",
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