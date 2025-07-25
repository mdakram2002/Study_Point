
import signupImg from "../Assets/Image/signup.jpg";
import { Template } from "../components/core/Auth/Template";

export function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyPoint for free"

      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={signupImg}
      formType="signup"
    />
  );
}
