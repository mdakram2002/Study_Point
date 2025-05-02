
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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
// Get Category Page Details
exports.categoryPageDetails = async (req, res) => {
  try {

    const { categoryId } = req.body;
    console.log("CATEGORY ID FORM BACKEND: ", categoryId);

    // Find selected category with courses
    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: {
          status: "Published",
        },
        populate: "ratingAndReview",
      })
      .exec();

    console.log("SELECTED CATEGORY: ", selectedCategory);

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found.",
      });
    }

    // when no courses found there
    if (selectedCategory.courses.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No courses found, but category exists.",
        data: {
          selectedCategory,
          differentCategory: null,
          topSellingCourses: [],
        }
      });
    }

    // Get courses for different categories
    const expectedCategories = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      expectedCategories[getRandomInt(expectedCategories.length)]._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    console.log("DEFFERENT CATEGORY COURSES:", differentCategory);

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor"
        }
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);
    const topSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);

    console.log("TOP SELLING COURSES:", topSellingCourses);
    // Return response
    return res.status(200).json({
      success: true,
      message: "Category details fetched successfully.",
      data: {
        selectedCategory,
        differentCategory,
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