
import React from "react";
import { ContactUsForm } from "../../ContactPage/ContactUsForm";

export const ContactForm = () => {
  return (
    <div className="mx-auto">
      <h1 className="text-4xl font-semibold text-center">Get in Touch</h1>
      <p className="text-[18px] text-richblack-300 text-center mt-1">
        We’d love to hear from you! Please complete this form.
      </p>
      <div className="mt-10 items-center mx-auto">
        <ContactUsForm />
      </div>
    </div>
  );
};
