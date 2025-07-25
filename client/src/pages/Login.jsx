import loginImg from "../Assets/Image/login.jpg"
import { Template } from "../components/core/Auth/Template";

export function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tomorrow, and beyond."
      description2="Education to future-proof your career."
      image={loginImg}
      formType="login"
    />
  );
}
