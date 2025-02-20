
import React, { useState } from "react";
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
    dispatch(getPasswordResetToken(emailSent, setEmail));
  };

  return (
    <div className="text-white flex items-center justify-center ">
      {loading ? (
        <div> Loading ...</div>
      ) : (
        <div>
          <h1>{!emailSent ? "Reset your password" : "Check your Email"}</h1>
          <p>
            {!emailSent
              ? "Have no fear. Well email you instructions to reset your password. If you dont have access to your email we can try account recovery"
              : `We have sent the reset email to ${email}`}
          </p>
          <form onSubmit={handleOnSubmit}>
            {!emailSent && (
              <label>
                <p>Email Address</p>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                />
              </label>
            )}
            <button type="submit">
              {!emailSent ? "Reset Password" : "Resend Email"}
            </button>
          </form>

          <div>
            <Link to={"/login"}>
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
