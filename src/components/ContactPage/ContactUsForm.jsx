
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { apiConnector } from "../../services/apiConnector";
import { contactusEndpoint } from "../../services/apis";
import toast from "react-hot-toast";
import { CountryCode } from "../../data/CountryCode";

export const ContactUsForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {
    console.log(data);
    try {
      setLoading(true);
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      );

      console.log("LGGING RESPONSE: ", res);
      setLoading(false);
      toast.success("Message sent successfully");
    } catch (err) {
      console.log("ERROR: ", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: "",
        message: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5">
        <div className=" flex flex-col lg:flex-row gap-5 lg:w-[60%]">
          {/* firstName  */}
          <div className="flex flex-col">
            <label className="text-[15px] mb-2 text-richblack-5" htmlFor="firstName">
              First Name<sup className="text-pure-reds-300">*</sup>
            </label>
            <input
              className="p-3 rounded-md bg-richblack-700 hover:border-none  drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] placeholder-richblack-400"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Enter your first name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <span>Please Enter Your First Name</span>}
          </div>

          {/* lastName  */}
          <div className="flex flex-col">
            <label className="text-[15px] mb-2 text-richblack-5" htmlFor="lastName">
              Last Name<sup className="text-pure-reds-300">*</sup>
            </label>
            <input
              className="p-3 rounded-md bg-richblack-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] placeholder-richblack-400"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Enter your first name"
              {...register("lastName", { required: true })}
            />
            {errors.firstName && <span>Please Enter Your Last Name</span>}
          </div>
        </div>
        {/* email address  */}
        <div className="flex flex-col">
          <label className="text-[15px] mb-2 text-richblack-5" htmlFor="email">
            Email Address<sup className="text-pure-reds-300">*</sup>
          </label>
          <input
            className="p-3 rounded-md bg-richblack-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] placeholder-richblack-400"
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email address"
            {...register("email", { required: true })}
          />

          {errors.email && <span>Please enter your email address</span>}
        </div>

        {/* contact Number  */}
        <div className="flex flex-col">
          <label
            htmlFor="contactNumber"
            className="text-[15px] mb-2 text-richblack-5 "
          >
            Phone Number<sup className="text-pure-reds-300">*</sup>
          </label>

          <div className="flex flex-row gap-2">
            {/* Dropdown  */}
            <div className="flex flex-col gap-2 w-[60px] rounded-l-md bg-richblack-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] placeholder-richblack-400">
              <select
                className="bg-richblack-700 text-richblack-300 mt-[13px] mb-2 text-[15px]"
                name="dropdown"
                id="dropdown"
                {...register("CountryCode", { required: true })}
              >
                {CountryCode.map((element, index) => (
                  <option
                    key={index}
                    value={element.code}
                    className="bg-richblack-700   text-richblack-5"
                  >
                    {element.code}-{element.country}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-[calc(100%-60px)] flex-col">
              <input
                className="p-3 rounded-r-md bg-richblack-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] placeholder-richblack-400"
                type="number"
                id="contactNumber"
                name="contactNumber"
                placeholder="12345 67890"
                {...register("contactNumber", {
                  required: {
                    value: true,
                    message: "Please enter Phone Number",
                  },
                  maxLength: { value: 10, message: "Invalid Phone Number" },
                  minLength: { value: 8, message: "Invalid Phone Number" },
                })}
              />
              {errors.contactNumber && (
                <span>{errors.contactNumber.message}</span>
              )}
            </div>
          </div>
        </div>

        {/* message  */}
        <div className="flex flex-col">
          <label className="text-[15px] mb-2 text-white" htmlFor="message">
            Message<sup className="text-pure-reds-300">*</sup>
          </label>
          <textarea
            className="rounded-md font-medium bg-richblack-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] placeholder-richblack-400 p-3"
            id="message"
            cols="30"
            rows="6"
            placeholder="Enter Your Message"
            {...register("message", { required: true })}
          >
            {errors.message && <span>Please Enter Your Message</span>}
          </textarea>
        </div>

        <button
          className="p-2 text-black font-bold bg-yellow-50 rounded-md drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};
