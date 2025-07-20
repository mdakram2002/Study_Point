/** @format */

import toast from "react-hot-toast";
import { studentEndpoints } from "./apis";
import { apiConnector } from "./apiConnector";
import SP_LOGO from "../Assets/logo/SP_LOGO.png";
import { resetCart } from "../slices/cartSlice";
import { setPaymentLoading } from "../slices/courseSlice";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("Loading...");

  try {
    const sdkLoaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!sdkLoaded) {
      toast.error("RazorPay SDK failed to load");
      return;
    }
    console.log("Razorpay SDK loaded successfully");

    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      { Authorization: `Bearer ${token}` }
    );
    // console.log("Raw token:", token);

    if (!orderResponse || !orderResponse.data.success) {
      throw new Error(orderResponse?.data?.message || "Order creation failed");
    }

    // console.log("Order created: ", orderResponse.data.data);
    console.log("Order created: ", orderResponse);

    const keyResponse = await apiConnector(
      "GET",
      "/payment/getKey",
      null,
      null,
      null
    );
    // console.log("Key response:", keyResponse);

    const razorpayKey = keyResponse.data.key;
    // console.log("Extracted key:", razorpayKey);

    if (!razorpayKey) {
      throw new Error("Failed to fetch Razorpay Key");
    }

    const options = {
      key: razorpayKey,
      currency: orderResponse.data.data.currency,
      amount: orderResponse.data.data.amount,
      order_id: orderResponse.data.data.id,
      name: "StudyPoint",
      description: "Thank You For Purchasing the Course",
      image: SP_LOGO,
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          token,
          orderResponse.data.data.amount
        );
        verifyPayment(token, navigate, { ...response, courses }, dispatch);
      },
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
    };
    console.log("PAYMENT OPTOIN FRON STUDENTFEATURES_API", options);

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (err) {
    console.error("Payment initiation failed:", err);

    // Extract a readable error message
    const message =
      err?.response?.data?.message ||
      err?.message ||
      "Something went wrong while initiating payment";

    toast.error(message);
  } finally {
    toast.dismiss(toastId);
  }
}
async function sendPaymentSuccessEmail(response, token, amount) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (err) {
    console.log("PAYMENT SUCCESS EMAIL ERROR: ", err);
    toast.error(err);
  }
}

async function verifyPayment(token, navigate, bodyData, dispatch) {
  const toastId = toast.loading("Verifying Payment...");
  dispatch(setPaymentLoading(true));

  try {
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Payment Successful, you're enrolled!");
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());
    
  } catch (err) {
    console.error("Payment Verification Failed", err);
    toast.error(
      err?.response?.data?.message || err.message || "Verification failed"
    );
  }
  toast.dismiss(toastId);
}
