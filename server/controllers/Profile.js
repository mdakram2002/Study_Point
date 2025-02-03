
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
    try {
        // Get data, userId and validate the data
        const {
            name, profession = "",
            about = "",
            contactNumber,
            gender,
            dateOfBirth = "",
        } = req.body;

        const id = req.user.id;
        if (!name || !contactNumber || !gender || !id) {
            return res.status(400).json({
                success: false,
                message: "All fields are required for update profile",
            });
        }
        // find Profile in database
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await User.findById(profileId);

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        // update the profile and sent return response to the user
        profileDetails.name = name;
        profileDetails.profession = profession;
        profileDetails.about = about;
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        return res.status(200).json({
            success: true,
            message: "Your Profile is update successfully",
            profileDetails,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: err.message,
            message: "Something went wrong while deleting profile, Please try again",
        });
    }
};

// Delete a Account
exports.deleteAccount = async (req, res) => {
    try {
        // get user id and validate the data
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: err.message,
                message: "User not found"
            });
        }
        // Found the account id from additionalDetails and then delete it.
        await Profile.findByIdAndDelete(userDetails.additionalDetails); // ✅ Properly deletes the profile
        await User.findByIdAndDelete(id);
        // TODO: HW unenrolled user form all enrolled course

        // TODO: how can we shedule(task sheduling) a account for deletion.
        return res.status(200).json({
            success: true,
            message: err.message,
            message: "User Deleted Successfully"
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            message: "Something went wrong while deleting profile, Please try again",
        });
    };
};

// Get All Details of User
exports.getAllDetails = async (req, res) => {
    try {
        // get user id and validate the data
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            message: err.message,
            message: "Fetched The User Details Successfully",
            userDetails,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            message: "Something went wrong while fetching user details, Please try again",
        });
    };
};
