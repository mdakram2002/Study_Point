const express = require("express");
const router = express.Router();

const {capturePayment, verifySignature} = require("../controllers/Payments");
const {auth, isInstructorm, isStudent, isAdmin} = require("../middlewares/auth");

router.post("/capturePayment", isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;