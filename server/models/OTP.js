const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../email/template/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
        expires: 5 * 60,
    },
});

// A function to send an email
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verification Email from StudyPoint: ",
            emailTemplate(otp)
        );
        console.log("Email sent Successfully: ", mailResponse.response);
    } catch (error) {
        console.log(
            "Error occurred while sending verification email OTP: " + error
        );
        throw error;
    }
}

OTPSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
});
module.exports = mongoose.model("OTP", OTPSchema);