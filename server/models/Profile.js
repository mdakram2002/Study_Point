const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    profession:{
        type: String,
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: String,
    },
    about: {
        type: String,
        trim: true,
    },
    contactNumber: {
        type: Number,
        trim: true,
    },
});
module.exports = mongoose.model("Profile", profileSchema);