require("dotenv").config();
const express = require("express");
const router = express.Router();

const {capturePayment, verifySignature, sendPaymentSuccessEmail} = require("../controllers/Payments");
const {auth, isStudent} = require("../middlewares/auth");

// Razorpay Key Route - NO auth needed
router.get("/getKey", (req, res) => {
  console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
  res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifySignature", auth, isStudent, verifySignature);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;