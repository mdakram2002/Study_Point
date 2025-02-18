/** @format */

import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { CTAButton } from "../components/core/HomePage/CTAButton";

export const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => {
      return {
        ...prevData,
        [event.target.name]: event.target.value,
      };
    });
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("Logged In Successfully");
    navigate("/deshboard");
  }
  console.log(formData);

  return (
    <form
      className="flex flex-col w-10/12 max-w-[450px] gap-y-2 mt-1 "
      onSubmit={submitHandler}
    >
      <label className="w-full ">
        <p className="text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem]">
          Email Address<sup className="text-pink-200">*</sup>
        </p>
        <input
          className="bg-gray-800 rounded-[0.3rem] text-gray-50 w-full p-[7px]"
          required
          type="text"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email Address"
          name="email"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-gray-50 mb-1 leading-[1.375rem] ">
          Password<sup className="text-pink-200">*</sup>
        </p>
        <input
          className="bg-gray-800 rounded-[0.3rem] text-gray-50 w-full p-[7px]"
          required
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter email password"
          name="password"
        />

        <span
          className="absolute right-3 top-[37px] cursor-pointer "
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={20} fill="#a2abba" />
          ) : (
            <AiOutlineEye fontSize={20} fill="#a2abba" />
          )}
        </span>

        <Link to="#">
          <CTAButton active={false} linkto={"/signup"}>
            Forgot Password
          </CTAButton>
        </Link>
      </label>

      <CTAButton active={true} linkto={"/sginup"}>
        Sign In
      </CTAButton>
    </form>
  );
};
