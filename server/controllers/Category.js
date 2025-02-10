
const Category = require("../models/category");

exports.createCategory = async (req, res) => {
    try {
        // Fetch data from request body and validate
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }

        // Create entry in DB
        const categoryDetails = await Category.create({ name, description });
        console.log("CATEGORY DETAILS: ", categoryDetails);

        return res.status(201).json({
            success: true,
            message: "Category created successfully.",
            category: categoryDetails,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again.",
            error: err.message,
        });
    }
};

// Get all categories
exports.showAllCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({},
            { name: true, description: true }
        );

        return res.status(200).json({
            success: true,
            message: "Categories fetched successfully.",
            categories: allCategories,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Categories not found. Please try again.",
            error: err.message,
        });
    }
};

// Get Category Page Details
exports.categoryPageDetails = async (req, res) => {
    try {
        // Get category ID from request body
        const { categoryId } = req.body;

        // Find selected category with courses
        const selectedCategory = await Category.findById(categoryId)
            .populate({
                path: "courses",
                match: {
                    status: "published"
                },
                populate: "ratingAndReview",
            })
            .exec();

        if (!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: "Category not found.",
            });
        }

        // when no courses found there
        if (selectedCategory.course.length === 0) {
            console.log("No courses found for selected category " + categoryId);
            return res.status(404).json({
                success: false,
                message: "No courses found for selected category " + categoryId,
            });
        }
        // Get courses for different categories
        const differentCategories = await Category.find(
            {_id: { $ne: categoryId },})
            .populate("courses")
            .exec();

        // Get top-selling courses (assumption: sorting by number of enrollments)
        const topSellingCourses = await Category.findById(categoryId)
            .populate({
                path: "courses",
                options: { sort: { enrollments: -1 } }, // Assuming 'enrollments' field exists
            })
            .exec();

        // Return response
        return res.status(200).json({
            success: true,
            message: "Category details fetched successfully.",
            data: {
                selectedCategory,
                differentCategories,
                topSellingCourses,
            },
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category details. Please try again.",
            error: err.message,
        });
    }
};