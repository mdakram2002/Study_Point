const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                password: process.env.MAIL_PASSWORD,
            },
        });

        let info = await transporter.sendMail({
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