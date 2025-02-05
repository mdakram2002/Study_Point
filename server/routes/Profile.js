
const express = require("express");
const router = express.Router();

// Import controllers
const { updateProfile, deleteAccount, getAllDetails } = require("../controllers/Profile");
const { contact } = require("../controllers/ContactUs.js");

// Debugging output:
// console.log("updateProfile:", updateProfile);
// console.log("deleteAccount:", deleteAccount);
// console.log("getAllDetails:", getAllDetails);
// console.log("contact:", contact);

// Define routes
router.post("/contact", contact);
router.put("/updateProfile", updateProfile);
router.delete("/deleteAccount", deleteAccount);
router.get("/getAllDetails", getAllDetails);

// Export router
module.exports = router;