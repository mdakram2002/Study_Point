const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const info = await transporter.sendMail({
            from: "StudyPoint - By Akram",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        });
        console.log("Email sent: ",info.messageId);
        return info;

    } catch (error) {
        console.error(error);
        console.log("Error occur from mail sender: " + error);
        throw new Error("Failed to send email");
    }
};
module.exports = mailSender;