const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const checkValidateData = require("../utils/validation");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        // Validate email
        const emailError = checkValidateData(email, "");
        if (emailError) {
            return res.status(400).json({
                success: false,
                message: emailError,
            });
        }

        // Check if user already exists
        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }

        // Generate OTP
        let otp = otpGenerator.generate(6, {
            upperCaseAlphabet: false,
            lowerCaseAlphabet: false,
            specialChars: false,
        });

        console.log("OTP generated:", otp);

        // Ensure OTP is unique
        let result = await OTP.findOne({ otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabet: false,
                lowerCaseAlphabet: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp });
        }

        // Save OTP to DB
        await OTP.create({ email, otp });

        // Send OTP Email
        await mailSender(
            email,
            "Your OTP for Verification",
            `<h3>Your OTP for verification is: <strong>${otp}</strong></h3><p>It is valid for 10 minutes.</p>`
        );

        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "OTP generation failed",
        });
    }
};

// Sign Up Handler
exports.signUp = async (req, res) => {
    //fetch the data from the request body.
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // Perform Validation
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "Please enter all required fields.",
            });
        }

        // matching the password
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match, please try again!",
            });
        }


        // check user already exists or not
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already registered.",
            });
        }

        // find most recent OTP stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOtp);

        // validate the OTP
        if (recentOtp.length == 0) {
            return res.status(400).json({
                success: false,
                message: "OTP is not valid",
            })
        } else if (otp !== recentOtp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        };

        // Hash the password & Create entry in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            contactNumber,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        // return response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again",
        });
    };

}

// Login Handler
exports.logIn = async (req, res) => {
    try {

        const { email, password } = req.body; // get data from request body
        // validate the data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again"
            });
        }
        // user check exist or not registered
        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "User does not exist, Please register",
            });
        }
        // generate  the JWT token, after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                role: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            // create cookeis and send response
            const options = {
                expiresIn: new Date(Date.now() + 3 * 34 * 60 * 1000),
                httpOnly: true,
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token: token,
                user,
                message: "Logged in successfully",
            });
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid Password",
            });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Login Failure. Please try again",
        });
    };
};

// changepassword
exports.changePassword = async (req, res) => {
    try {
        // get data from request body
        const { email, password, confirmPassword } = req.body;

        // validation
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update password in db
        user.password = hashedPassword;
        await user.save();

        // Send mail - password changed
        await mailSender(
            email,
            "Password Changed",
            `<h3>Your password has been successfully changed.</h3>`
        );

        // Return response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "An error occurred. Please try again",
        });
    }
};