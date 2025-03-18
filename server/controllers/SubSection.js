const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// Create SubSection
exports.createSubSection = async (req, res) => {
    try {
        // fetch the data from the request body and extract the vedio url and validate the data.
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;

        if ((!sectionId || !title || !timeDuration || !description, !video)) {
            return res.status(400).json({
                success: false,
                message:
                    "All fields are required, please field the required fields data.",
            });
        }
        console.log("VIDEO: " + video);
        // upload the video on cloudinary server and create subsection
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        );
        console.log("VIDEO UPLOADED ON CLOUDINARY: " + uploadDetails);
        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });
        // update the section with this subsection objectId and sent return response to user.
        const updatedSection = await Section.findByIdAndUpdate(
            { _id: sectionId },
            {
                $push: {
                    subSection: subSectionDetails._id,
                },
            },
            { new: true }
        ).populate("subSection");

        console.log("Updated subSections: " + updatedSection);

        // TODO: we want stor the data of section in subsection using populate and also when we console.log(updatedDetails) then no any id is shown, (log update section here, after adding populate query)
        return res.status(200).json({
            success: true,
            message: "SubSection created and section updated successfully",
            updatedSection,
        });
    } catch (err) {
        console.error("Error updating SubSection: ", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating SubSection.",
            error: err.message,
        });
    }
};

// Update SubSection
exports.updateSubSection = async (req, res) => {
    try {
        const { subSectionId, title, timeDuration, description } = req.body;
        let videoUrl;

        if (!subSectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID is required.",
            });
        }

        // Check if a new video file is provided and update it
        if (req.files && req.files.videoFile !== undefined) {
            const video = req.files?.videoFile || req.files?.file;
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            );
            videoUrl = uploadDetails.secure_url;
        }

        // Update subsection fields
        const updatedSubSection = await SubSection.findByIdAndUpdate(
            subSectionId,
            {
                title,
                timeDuration,
                description,
                ...(videoUrl && { videoUrl }), // Update video only if provided
            },
            { new: true }
        );

        if (!updatedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully.",
            updatedSubSection,
        });
    } catch (err) {
        console.error("Error updating SubSection: ", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating SubSection.",
            error: err.message,
        });
    }
};

// Delete SubSection
exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId, sectionId } = req.body;

        if (!subSectionId || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "SubSection ID and Section ID are required.",
            });
        }

        // Remove subsection from the section's subSections array
        await Section.findByIdAndUpdate({ _id: sectionId }, {
            $pull: { subSections: subSectionId },
        });

        // Delete the subsection
        const deletedSubSection = await SubSection.findByIdAndDelete({ _id: subSectionId });

        if (!deletedSubSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found.",
            });
        }
        const updatedSubSection = await Section.findById(sectionId).populate("subSection");

        return res.status(200).json({
            success: true,
            data: updatedSubSection,
            message: "SubSection deleted successfully.",
        });
    } catch (err) {
        console.error("Error deleting SubSection: ", err);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting SubSection.",
            error: err.message,
        });
    }
};
