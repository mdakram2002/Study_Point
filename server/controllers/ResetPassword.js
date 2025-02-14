
const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
    try {
        // get email from req body and check user for this email, email verification
        const email = req.body.email;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Your email is not registered with us",
            });
        }

        const token = crypto.randomBytes(20).toString("hex"); // generate token and update user by adding token and expiration time
        const updateDetails = await User.findOneAndUpdate(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 10 * 36 * 1000,
            },
            { new: true }
        );
        console.log("DETAILS:", updateDetails);

        // create reset password link for client side and send mail with reset link
        const url = `http://localhost:3000/reset-password/${token}`; // create url and send mail conating with url
        await mailSender(
            email,
            "Password Updated Link",
            `Click the following link to reset your password: ${url}`
        );

        return res.json({
            success: true,
            message:
                "Email Sent successfully, Please check the email and change your Password",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating your password",
        });
    }
};

// Resets password
exports.resetPassword = async (req, res) => {
    try {
        // Fetch the data from request body & validation performed
        const { password, confirmPassword, token } = req.body;

        if (confirmPassword !== password) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match. Please try again.",
            });
        }

        // Get user details from DB using token
        const userDetails = await User.findOne({ token: token });
        console.log("USER DETAILS: ", userDetails)
        // If no entry - invalid token
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid token. Please try again.",
            });
        }

        // Check if token has expired
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.status(401).json({
                success: false,
                message: "Token has expired. Please generate a new token.",
            });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update the password and invalidate the token
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword, token: null, resetPasswordExpires: null },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating your password.",
        });
    }
};