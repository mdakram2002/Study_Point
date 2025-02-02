const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: Number,
        required: true,
        trim: true,
    },
    message: {
        type: String,
    },
});
module.exports = mongoose.model("Contact", contactUsSchema);