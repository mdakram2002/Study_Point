
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
    if (signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const {
      accountType,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      otp,
      navigate,
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
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>Verify Email</h1>
          <p>A verification code has sent to you. Enter the code below</p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props) => <input {...props} />}
            />
            <button type="submit">Verify Email</button>
          </form>

          <div>
            <Link to={"/login"}>
              <p>Back to Login</p>
            </Link>
          </div>
          <button onClick={() => dispatch(sendOTP(signupData.email))}>
            Resend it
          </button>
        </div>
      )}
    </div>
  );
};
