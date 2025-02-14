const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

// Create Section
exports.createSection = async (req, res) => {
    try {
        // Fetch the data from the request body and validate sectionName and courseId
        const { sectionName, courseId } = req.body;
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Both sectionName and courseId are required.",
            });
        }

        // Create section with course reference
        const newSection = await Section.create({ sectionName, course: courseId });

        // Update the course with the new section's ID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        )
            .populate("courseContent").exec();

        // Populate the section with subSections (if subSections exist in schema)
        const populatedSection = await Section.findById(newSection._id)
        // .populate("subSections");

        return res.status(201).json({
            success: true,
            message: "Section created successfully.",
            section: populatedSection,
            course: updatedCourseDetails,
        });
    } catch (err) {
        console.error("Error creating section:", err);
        return res.status(500).json({
            success: false,
            message: "Unable to create section, please try again.",
            error: err.message,
        });
    }
};

// Update Section
exports.updateSection = async (req, res) => {
    try {
        // Fetch input data and validate
        const { sectionId, sectionName, courseId } = req.body;
        if (!sectionId || !sectionName) {
            return res.status(400).json({
                success: false,
                message: "Both sectionId and sectionName are required.",
            });
        }

        // Update the section
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName },
            { new: true }
        );

        if (!updatedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found.",
            });
        };
        const course = await Course.findById(courseId)
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Section updated successfully.",
            section: updatedSection,
        });
    } catch (err) {
        console.error("Error updating section:", err);
        return res.status(500).json({
            success: false,
            message: "Unable to update section, please try again.",
            error: err.message,
        });
    }
};

// Delete Section
exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body; // Changed from req.params to req.body

        if (!sectionId || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Both sectionId and courseId are required.",
            });
        }

        // Remove the section from the course content array
        await Course.findByIdAndUpdate(courseId, {
            $pull: { courseContent: sectionId },
        });

        // Delete the section
        const deletedSection = await Section.findByIdAndDelete(sectionId);

        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found.",
            });
        }

        // Delete associated sub-sections
        if (deletedSection.subSection && deletedSection.subSection.length > 0) {
            await SubSection.deleteMany({ _id: { $in: deletedSection.subSection } });
        }
        await Section.findByIdAndDelete(sectionId);
        
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Section deleted successfully.",
            data: course,
        });

    } catch (err) {
        console.error("Error deleting section:", err);
        return res.status(500).json({
            success: false,
            message: "Unable to delete section, please try again.",
            error: err.message,
        });
    }
};
