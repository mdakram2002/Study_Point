
import { GiFallingStar } from "react-icons/gi";
import { RenderStepsForm } from "./RenderStepsForm";

export default function AddCourses() {
  return (
    <>
      <div className="w-full text-richblack-5 flex lg:flex-row flex-col gap-x-5 space-x-5">
        <div className="lg:w-[60%] lg:mb-0 mb-10">
          <h1 className="text-3xl font-semibold text-white">Add Course</h1>
          <div>
            <RenderStepsForm />
          </div>
        </div>

        <div className="lg:w-[40%] h-fit flex flex-col bg-richblack-800 rounded-md px-5 py-5 shadow-lg">
          <p className="flex gap-3 text-2xl font-semibold mb-4 text-richblack-5">
            <GiFallingStar className="text-yellow-50" />
            Course Upload Tips
          </p>
          <ul className="list-disc list-inside text-[13px] text-richblack-25 space-y-3">
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>
              Add Topics in the Course Builder section to create lessons,
              quizzes, and assignments.
            </li>
            <li>
              Information from the Additional Data section shows up on the
              course single page.
            </li>
            <li>Make Announcements to notify any important updates.</li>
            <li>Send Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
}