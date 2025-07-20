
import { IoMdEyeOff, IoMdEye } from "react-icons/io";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from "react-router-dom";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePasswordProfile = () => {
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
    <div className="gird min-h[calc(100vh-3.rem)] place-items-center mt-6">
      {loading ? (
        <div>loading...</div>
      ) : (
        <div className="max-w-[480px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Choose new Password
          </h1>
          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            Almost done. Enter your new password and you're all set.{" "}
          </p>
          <form onSubmit={handleOnSumbmit}>
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Password <sup className="text-pure-reds-200">*</sup>
              </p>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChangePassword}
                required
                placeholder="Enter password"
                className="p-2 rounded-md bg-richblack-5 w-full !pr-10"
              />
              <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <IoMdEyeOff fontSize={20} />
                ) : (
                  <IoMdEye fontSize={20} />
                )}
              </span>
            </label>

            <label className="relative mt-3 block">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                New Confirm Password <sup className="text-pure-reds-200">*</sup>
              </p>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChangePassword}
                required
                placeholder="Enter Confirm Password"
                className="p-2 rounded-md bg-richblack-5 w-full !pr-10 "
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showPassword ? (
                  <IoMdEyeOff fontSize={20} />
                ) : (
                  <IoMdEye fontSize={20} />
                )}
              </span>
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Reset Password
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between">
            <Link to={"/login"}>
              <p className="flex items-center gap-x-2 text-richblack-5">
                <FaLongArrowAltLeft className="font-medium text-white" />
                Back to Login
              </p>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default UpdatePasswordProfile;