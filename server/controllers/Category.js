const Category = require("../models/category");

exports.createCategory = async (req, res) => {
    try {
        // fetch the data from request body and validation performed
        const { name, description } = req.body;
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required.",
            });
        }
        // create entry in DB
        const categryDetails = await Category.create({
            name: name,
            description: description,
        });
        console.log(categryDetails);

        return res.status(200).json({
            success: true,
            message: "Categorys created successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            message: "Something went wrong, Please try again",
        });
    }
};

// GetAll Categorys
exports.showAllCategorys = async (req, res) => {
    try {
        const allCategorys = await Category.find({}, { name: true, description: true });
        return res.status(200).json({
            success: true,
            message: "Categorys found successfully",
            allCategorys,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
            message: "Categorys are not found, Please try again",
        });
    };
};