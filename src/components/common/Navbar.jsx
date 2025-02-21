/** @format */

import React, { useState, useEffect } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import { NavbarLinks } from "../../data/Navbar_Link";
import LOGO from "../../Assets/logo/SP_LOGO.png";

import { FaCartArrowDown } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { AiOutlineMenu } from "react-icons/ai";

import { ProfileDropdown } from "../core/Auth/ProfileDropdown";
import { useSelector } from "react-redux";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import { ACCOUNT_TYPE } from "../../utils/constants";

export const Navbar = () => {
  const location = useLocation();

  // fetch the token, user and totalItems from reducer
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState([]);

  console.log("TOKEN: ", token);
  console.log("USER: ", user);

  const fetchSubLinks = async () => {
    try {
      setLoading(true); // Set loading to true before fetching data
      const results = await apiConnector("GET", categories.CATEGORIES_API);
      console.log(
        "Printing the results of Categories list from Navbar: ",
        results
      );

      if (results.data.success) {
        setSubLinks(results.data.categories);
      } else {
        console.log("Could not fetch categories");
      }
    } catch (err) {
      console.log(err);
      console.log("Could not fetch the category list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div
      className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-800 ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
      } transition-all duration-200`}
    >
      <div className="flex w-11/12 max-w-maxContent items-center justify-between ">
        {/* logo of StudyPoint  */}
        <Link to="/">
          <div className="flex flex-row items-center justify-center">
            <img
              src={LOGO}
              alt="Logo"
              loading="lazy"
              className="h-[40px] w-[40px] object-contain rounded-full"
            />
            <h1 className="text-white text-[20px] pl-0 font-bold">
              StudyPoint
            </h1>
          </div>
        </Link>

        {/* NavLink  */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6 ring-richblack-25 text-base">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative text-richblack-25 flex items-center gap-2 group">
                    <p>{link.title}</p>
                    <FaAngleDown />

                    <div
                      className="invisible absolute left-[50%] top-[50%] translate-y-[6%] z-[100]  translate-x-[-55%] flex flex-col rounded-md
                    bg-richblack-25 p-4 text-richblack-800 opacity-0 transition-all duration-200
                    group-hover:visible group-hover:opacity-100 lg:w-[280px] md:w-[150px]"
                    >
                      <div className="absolute left-[50%] top-0 -z-10 lg:h-20 md:h-10 lg:w-20 md:w-10 translate-x-[10%] rotate-45 select-none rounded bg-richblack-25"></div>
                      {loading ? (
                        <p className="text-start">Loading...</p>
                      ) : subLinks && subLinks.length > 0 ? (
                        subLinks.map((category, index) => (
                          <Link
                            to={`/catalog/${category.name
                              .split(" ")
                              .join("-")
                              .toLowerCase()}`}
                            className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                            key={index}
                          >
                            <p>{category.name}</p>
                          </Link>
                        ))
                      ) : (
                        <p className="text-start">No Courses Found</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <Link to={link?.path}>
                    <p
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-50"
                      }`}
                    >
                      {link.title}
                    </p>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Login / SignUp/ Dashboard */}
        <div className="hidden items-center gap-x-4 md:flex">
          {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
            <Link to={"/dashboard/cart"} className="relative">
              <FaCartArrowDown className="text-richblack-50 cursor-pointer" />
              {totalItems > 0 && (
                <span className="absolute -bottom-2 -right-2 gird h-5 w-5 place-items-start overflow-hidden bg-richblack-600 text-center text-sm font-bold text-yellow-100">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                Sign In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                {/* <LoginForm/> */}
                Log In
              </button>
            </Link>
          )}
          {token !== null && <ProfileDropdown/>}
        </div>
        <button className="mr-4 md:hidden">
          <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
      </div>
    </div>
  );
};
