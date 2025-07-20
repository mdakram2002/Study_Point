
import React from "react";
import ChangeDisplayPicture from "./ChangeDisplayPicture";
import EditProfile from "./EditProfile";
import UpdatePassword from "./UpdatePasswords";
import DeleteAccount from "./DeleteAccount";

export default function Settings() {
  return (
    <>
      <h1 className="mb-12 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <EditProfile />
      <ChangeDisplayPicture />
      <UpdatePassword />
      <DeleteAccount />
    </>
  );
}
