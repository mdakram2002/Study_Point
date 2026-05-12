const Razorpay = require("razorpay");
require("dotenv").config();


let razorpayInstance = null;

if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
} else {
  console.warn(
    "Razorpay keys are not configured. Payment routes will be disabled until RAZORPAY_KEY_ID and RAZORPAY_SECRET are set."
  );
}

exports.instance = razorpayInstance;