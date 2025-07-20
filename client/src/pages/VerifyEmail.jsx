
import { FaLongArrowAltLeft } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OTPInput from "react-otp-input";
import { Link, useNavigate } from "react-router-dom";
import { sendOTP, signUp } from "../services/operations/authAPI";

export const VerifyEmail = () => {
  const { signupData, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, [signupData, navigate]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    } = signupData;

    dispatch(
      signUp(
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-richblack-900 px-4">
      {loading ? (
        <div className="text-white"></div>
      ) : (
        <div className="w-full max-w-md rounded-lg border border-richblack-600 bg-richblack-800 p-8 shadow-lg">
          <h1 className="text-center text-3xl font-semibold text-white">
            Verify Email
          </h1>
          <p className="mt-2 text-center text-richblack-400">
            A verification code has been sent to your email. Enter the code
            below.
          </p>

          <form
            className="mt-6 flex flex-col items-center gap-4"
            onSubmit={handleOnSubmit}
          >
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span className="text-white mx-1">-</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="h-12 w-10 rounded-md border border-richblack-600 bg-transparent text-center text-lg text-white focus:border-yellow-500 focus:outline-none"
                />
              )}
            />

            <button
              className="mt-4 w-full rounded-md bg-yellow-50 py-2 text-lg font-medium text-richblack-900 transition-all duration-200 hover:bg-yellow-200"
              type="submit"
            >
              Verify Email
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="flex items-center justify-center gap-x-2 text-richblack-5 hover:underline"
            >
              <FaLongArrowAltLeft className="text-white" />
              <span>Back to Login</span>
            </Link>
          </div>

          <button
            className="mt-4 w-full text-center text-sm font-medium text-yellow-500 hover:text-yellow-300"
            onClick={() => dispatch(sendOTP(signupData.email))}
          >
            Resend OTP
          </button>
        </div>
      )}
    </div>
  );
};
