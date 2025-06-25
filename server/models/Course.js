const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        trim: true,
        required: true,
    },
    courseDescription: {
        type: String,
        trim: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    whatYourWillLearn: {
        type: String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
    ratingAndReview: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview",
        },
    ],
    price: {
        type: Number,
    },
    thumbnail: {
        type: String,
    },
    tag: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
    ],
    status:{
        type: String,
        enum: ["Draft","Pending", "Published"],
    },
    instructions: {
        type: [String],
        required: true,
    },
    createdAt: {
        type:Date,
        default:Date.now
    }
});
module.exports = mongoose.model("Course", courseSchema);
