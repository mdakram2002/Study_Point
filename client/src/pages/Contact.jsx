
import { Footer } from "../components/common/Footer";
import { ContactForm } from "../components/ContactPage/ContactForm";
import { ContactDetails } from "../components/ContactPage/ContactDetails";
import { ReviewSlider } from "../components/common/ReviewSlider";
import { HighlightText } from "../components/core/HomePage/HighlightText";


export const Contact = () => {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[50%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>
      </div>


      <div className="relative mx-auto my-4 mt-14 flex w-11/12 max-w-maxContent flex-col items-center justify-between bg-richblack-900 text-white">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold">
          Reviews from other <HighlightText text={"Learners"}/>
        </h1>
        <ReviewSlider />
      </div>


      <Footer />
    </div>
  );
};
