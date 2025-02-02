
const mailSender = require("../utils/mailSender");
const Contact = require("../models/Contact");
const User = require("../models/User");

exports.contactUs = async (req, res) => {
    try {
        // Fetch user details from request body
        const { firstName, lastName, email, contactNumber, message, userId } =
            req.body;

        // Validate the request
        if (!firstName || !lastName || !email || !contactNumber || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        let userType = "Guest User"; // Default for random users

        // Check if the user is registered
        if (userId) {
            const registeredUser = await User.findById(userId);
            if (registeredUser) {
                userType = registeredUser.accountType; // Admin, Student, Instructor
            }
        }

        // Save user query in the database
        const contactEntry = await Contact.create({
            firstName,
            lastName,
            email,
            contactNumber,
            message,
        });

        // Email to User (Confirmation Email)
        await mailSender(
            email,
            "Query Received - StudyPoint",
            `<p>Hello ${firstName},</p>
             <p>We have received your query and will get back to you shortly.</p>
             <p>Thank you for reaching out!</p>
             <p>Best Regards,<br>StudyPoint Team</p>`
        );

        // Email to StudyPoint (Admin Notification)
        await mailSender(
            process.env.ADMIN_EMAIL, // Assuming admin email is set in environment variables
            "New Query Received - StudyPoint",
            `<p>A new query has been submitted by a ${userType}:</p>
             <p><strong>Name:</strong> ${firstName} ${lastName}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Contact Number:</strong> ${contactNumber}</p>
             <p><strong>Message:</strong> ${message}</p>
             <p>Please review and respond accordingly.</p>
             <p>StudyPoint Team</p>`
        );

        return res.status(200).json({
            success: true,
            message:
                "Your query has been submitted successfully. A confirmation email has been sent to you.",
            contactEntry,
        });
    } catch (error) {
        console.error("Error in Contact Us Controller:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
            error: error.message,
        });
    }
};
