/** @format */
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

export const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const location = useLocation();
  const { loading } = useSelector((state) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { password, confirmPassword } = formData;

  const handleOnChangePassword = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleOnSumbmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);
    dispatch(resetPassword(password, confirmPassword, token));
  };

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h1>Choose new Password</h1>
          <p>Almost done. Enter your new password and you're all set. </p>
          <form onSubmit={handleOnSumbmit}>
            <label>
              <p>
                New Password <sup>*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChangePassword}
                required
                placeholder="Enter password"
              />
              <span onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? (
                  <IoMdEyeOff fontSize={20} />
                ) : (
                  <IoMdEye fontSize={20} />
                )}
              </span>
            </label>

            <label>
              <p>
                New Password <sup>*</sup>
              </p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChangePassword}
                required
                placeholder="Enter Confirm Password"
              />
              <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                {showPassword ? (
                  <IoMdEyeOff fontSize={20} />
                ) : (
                  <IoMdEye fontSize={20} />
                )}
              </span>
            </label>
            <button type="submit">Reset Password</button>
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
