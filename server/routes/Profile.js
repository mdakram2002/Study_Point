
const express = require("express");
const router = express.Router();

const {
    updateProfile,
    deleteAccount,
    getAllDetails,
} = require("../controllers/Profile");

const {contact} = require("../controllers/Contact");
router.post("/contact", contact);

router.post("/updateProfile", updateProfile);
router.post("/deleteAccount", deleteAccount);
router.post("/getAllDetails", getAllDetails);

module.exports = router;
