
import React, { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPasswordResetToken } from "../services/operations/authAPI";

export const ForgotPassword = () => {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
    console.log("Email form ForgotPassword", email)
  };

  return (
    <div className="gird min-h[calc(100vh-3.rem)] place-items-center mt-6">
      {loading ? (
        <div> Loading ...</div>
      ) : (
        <div className="max-w-[480px] p- lg:p-8">
          <h1 className="text-3xl font-semibold leading-[2.375rem] text-white">
            {!emailSent ? "Reset your password" : "Check your Email"}
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            {!emailSent
              ? "Have no fear. Well email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label className="w-full">
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                  Email Address <sup className="text-pure-reds-300">*</sup>
                </p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="w-full p-2 rounded-md bg-richblack-5"
                />
              </label>
            )}
            <button
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
              type="submit"
            >
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div className="mt-5 flex flex-row items-center justify-between gap-2">
            <Link to={"/login"}>

              <p className="flex items-center gap-x-2 text-richblack-5">
              <FaLongArrowAltLeft className="font-medium text-white"/>
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
