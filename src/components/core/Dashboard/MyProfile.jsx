
import { RiEditBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IconButtonModal } from "../../common/IconButtonModal";
import { formattedDate } from "../../../utils/dateFormatter";

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  return (
    <div className="w-11/12 flex flex-col mx-auto ">
      <h1 className="mb-5 mt-10 text-3xl text-richblack-5 font-semibold">
        My Profile
      </h1>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 sm:p-8 px-6 sm:px-12">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconButtonModal
          text="Edit"
          onclick={() => navigate("/dashboard/settings")}
        >
          <RiEditBoxLine />
        </IconButtonModal>
      </div>
      {/* About Section */}
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 px-7">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconButtonModal
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
          >
            <RiEditBoxLine />
          </IconButtonModal>
        </div>
        <p
          className={`${user?.additionalDetails?.about
            ? "text-richblack-5"
            : "text-richblack-400"
            } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      {/* Personal Details */}
      <div className="my-10 flex flex-col lg:gap-y-8 md:gap-x-4 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-5 px-7">
        <div className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4">
          <p className="text-lg font-semibold text-richblack-5">Personal Details</p>
          <IconButtonModal
            text="Edit"
            onclick={() => navigate("/dashboard/settings")}
            customClasses={"mb-2"}
          >
            <RiEditBoxLine />
          </IconButtonModal>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5 gap-x-2">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
