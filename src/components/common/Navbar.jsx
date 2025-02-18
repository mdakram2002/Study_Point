/** @format */

import React, {useState, useEffect} from "react";
import { Link, matchPath } from "react-router-dom";
import { NavbarLinks } from "../../data/Navbar_Link";
import LOGO from "../../Assets/logo/SP_LOGO.png";
import { useLocation } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { ProfileDropdown } from "../core/Auth/ProfileDropdown";
import { useSelector } from "react-redux";
import { categories } from "../../services/apis";
import { apiConnector } from "../../services/apiConnector";
import { IoIosArrowDropdown } from "react-icons/io";
// import { LoginForm } from "../../pages/Signup";
// import { SignupForm } from "../../pages/Login";

// const subLinks = [
//   {
//     title: "AIML",
//     link: "/catalog/aiml",
//   },
//   {
//     title: "AIDS",
//     link: "/catalog/aids",
//   },
//   {
//     title: "AI",
//     link: "/catalog/ai",
//   },
// ];

export const Navbar = () => {
  const location = useLocation();

  // fetch the token, user and totalItems from reducer
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [subLinks, setSubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const results = await apiConnector("GET", categories.CATEGORIS_API);
      console.log(
        "Printing the results of Categories list from Namvbar: ",
        results
      );
      setSubLinks(results.data.data);
    } catch (err) {
      console.log(err);
      console.log("Could not fetch the category list");
    }
  };
  useEffect(() => {
    fetchSubLinks();
  }, []);

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700">
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
        <nav>
          <ul className="flex gap-6 ring-richblack-25 text-base">
            {NavbarLinks.map((link, index) => (
              <li key={index}>
                {link.title === "Catalog" ? (
                  <div className="relative text-richblack-25 flex items-center gap-1 group">
                    <p>{link.title}</p>
                    <IoIosArrowDropdown />

                    <div
                      className="inivisible absolute left-[50%] top-[50%] translate-y-[27%]  translate-x-[-56%] flex flex-col rounded-md
                    bg-richblack-25 p-4 text-richblue-800 opacity-0 transition-all duration-200
                    group-hover:visible group-hover:opacity-100 lg:w-[250px] md:w-[80px] lg:h-[100px] md:h-[50px] "
                    >
                      <div className="absolute left-[50%] top-0 lg:h-20 md:h-10 lg:w-20 md:w-10 translate-x-[10%] rotate-45 rounded bg-richblack-25">
                      </div>

                      {
                        subLinks? (
                          subLinks.map((subLinks, index) =>(
                            <Link to={`${subLinks.link}`} key={index}>
                              <p>{subLinks.title}</p>
                            </Link>
                          ))
                        ) : (<div></div>)
                      }

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
        <div className="flex gap-2 items-center">
          {user && user?.accountType !== "Instructor" && (
            <Link to={"/dashboard/cart"} className="relative">
              <FaCartArrowDown className="text-richblack-50 cursor-pointer" />
              {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          )}
          {token === null && (
            <Link to={"/login"}>
              <button className="border border-richblue-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                {/* <LoginForm/> */}
                Log In
              </button>
            </Link>
          )}
          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblue-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md">
                {/* <SignupForm/> */}
                Sign In
              </button>
            </Link>
          )}
          {token == null && <ProfileDropdown />}
        </div>
      </div>
    </div>
  );
};
