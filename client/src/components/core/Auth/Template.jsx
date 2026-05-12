import { useSelector } from "react-redux";
import { LoginForm } from "./LoginForm";
import { SignupForm } from "./SignupForm";

export function Template({ title, description1, description2, formType }) {
  const { loading } = useSelector((state) => state.auth);

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-richblack-900 py-10">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col justify-center gap-8 rounded-[32px] border border-richblack-600/40 bg-richblack-900/90 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.45)] backdrop-blur-xl md:p-12 lg:flex-row lg:items-stretch">
          <div className="flex-1 space-y-6 text-richblack-5">
            <div className="max-w-xl space-y-3">
              <p className="text-sm uppercase tracking-[0.35em] text-blue-100">
                StudyPoint
              </p>
              <h1 className="text-[2rem] font-semibold leading-[2.4rem] md:text-[2.4rem]">
                {title}
              </h1>
              <p className="text-base leading-7 text-richblack-100 md:text-lg">
                <span className="text-richblack-100">{description1}</span>{" "}
                <span className="font-semibold text-blue-100">{description2}</span>
              </p>
            </div>
            <div className="hidden rounded-[28px] border border-richblack-600/50 bg-richblack-900/80 p-6 text-sm text-richblack-200 lg:block">
              <p className="font-semibold text-blue-100">Why choose StudyPoint?</p>
              <ul className="mt-4 space-y-3 text-richblack-200">
                <li>• Smooth onboarding with a refined experience.</li>
                <li>• Secure access and modern form interactions.</li>
                <li>• Designed for learners, instructors, and admins.</li>
              </ul>
            </div>
          </div>
          <div className="flex-1 rounded-[28px] bg-richblack-900/90 p-8 shadow-[0_16px_32px_rgba(0,0,0,0.25)]">
            {formType === "signup" ? <SignupForm /> : <LoginForm />}
          </div>
        </div>
      )}
    </div>
  );
}
