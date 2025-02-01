
const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const bcrypt = require("bcrypt");

exports.resetPassword = async (req, res) => {
    try {
        // get email from req body and check user for this email, email verification
        const { email } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(403).json({
                success: false,
                message: "Your email is not registered with us",
            });
        }

        const token = crypto.randomUUID(); // generate token and update user by adding token and expiration time
        const updateDetails = await User.findOneAndDelete(
            { email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 10 * 6 * 1000,
            },
            { new: true }
        );

        const url = `https://localhost:4000/update-password/${token}`; // create url and send mail conating with url
        await mailSender(
            email,
            "Password Updated Link",
            `Password Reset Link:${url}`
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
exports.resetPasswordToken = async (req, res) => {
    try {
        //fetch the data from request body & validation performed
        const { password, confirmPassword, token } = req.body;
        if (password != confirmPassword) {
            return res.status(500).json({
                success: false,
                message: "Your Password is incorrect, Please try again",
            });
        }
        // get userdetails from db using token
        const userDetails = await User.findOne({ token: token });

        // if no entry - invalid token
        if (!userDetails) {
            return res.status(500).json({
                success: false,
                message: "Token is invalid, Please try again",
            });
        }
        // token time check & hash the password
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: "Token Is Expired, Please Generate Your Token",
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // password update and return response
        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );
        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating your password",
        });
    }
};
