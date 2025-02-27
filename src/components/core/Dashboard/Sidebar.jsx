/** @format */

import React from "react";
import { sidebarLinks } from "../../../data/Dashboard";
import { logOut } from "../../../services/operations/authAPI";
import { useDispatch, useSelector } from "react-redux";
import { SidebarLink } from "./SidebarLink";

export const Sidebar = () => {
  const { user, loading: profileLoading } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (profileLoading || authLoading) {
    return <div className="spinner mt-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex min-w-[220px] flex-col border border-r-[1px] border-r-richblue-700 h-[calc(100vh-3.5rem)] bg-richblue-800 py-10">
        <div className="flex flex-col">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null;
            return (
              <SidebarLink key={link.id} link={link} iconName={link.icon} />
            );
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600"></div>

        {/* SidebarLink for Setting  */}
        <div className="flex flex-col">
          <SidebarLink
            link={{ name: "Settings", path: "dashboard/settings" }}
            iconName="VscSettingsGear"
          />
        </div>
        


      </div>
    </div>
  );
};
