const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { passwordUpdate } = require("../email/template/passwordUpdated");
const Profile = require("../models/Profile");
require("dotenv").config();

exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        //  Check if user already exists
        const checkExistingUser = await User.findOne({ email });

        if (checkExistingUser) {
            return res.status(409).json({
                // 409: Conflict
                success: false,
                message: "User is already registered",
            });
        }

        // Generate Unique OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: true,
            lowerCaseAlphabets: true,
            specialChars: true,
        });
        console.log("Generated OTP:", otp);
        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: true,
                lowerCaseAlphabets: true,
                specialChars: true,
            });
            // result = await OTP.findOne({ otp: otp });
        }

        //  Save OTP to Database with Expiry Time
        const otpPayload = { email, otp };
        const otpBody = await OTP.create(otpPayload);
        console.log("OTP Body", otpBody);

        //  Secure Response
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
            otp,
        });
    } catch (err) {
        console.error("Unexpected Error:", err);
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred. Please try again.",
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
                message: "User already registered. Please sign in to continue to learning.",
            });
        }

        // find most recent OTP stored for the user
        const recentOtp = await OTP.find({ email })
            .sort({ createdAt: -1 })
            .limit(1);
        console.log(recentOtp);

        // validate the OTP
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP is not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP, Please check your OTP",
            });
        }

        // Hash the password & Create entry in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);

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
            // approved: approved,
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
    }
};

// Login Handler
exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body; // get data from request body
        // validate the data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",
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
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            // create cookeis and send response
            const options = {
                expiresIn: new Date(Date.now() + 3 * 34 * 60 * 1000),
                httpOnly: true,
            };
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
    }
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