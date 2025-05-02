const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("SubSection", subSectionSchema);
