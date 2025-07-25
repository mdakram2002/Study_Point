
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { PrivateRoute } from "./components/core/Auth/PrivateRoute";

import MyProfile from "./components/core/Dashboard/MyProfile";
import Cart from "./components/core/Dashboard/Cart";
import Settings from "./components/core/Dashboard/Settings/Index";
import { Navbar } from "./components/common/Navbar";
import { EnrolledCourse } from "./components/core/Dashboard/EnrolledCourse";
import AddCourses from "./components/core/Dashboard/AddCourses";
import { MyCourses } from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import { CourseDetails } from "./pages/CourseDetails";
import { About } from "./pages/About";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import UpdatePasswordProfile from "./pages/UpdatePasswordProfile";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Contact } from "./pages/Contact";
import { Error } from "./pages/Error";
import { Dashboard } from "./pages/Dashboard";
import { ViewCourses } from "./pages/ViewCourses";
import { Instructor } from "./components/core/Dashboard/InstructorDashboard/Instructor";

import { ACCOUNT_TYPE } from "./utils/constants";
import { VideoDetails } from "./components/core/ViewCourse/VideoDetails";

function App() {
  const { user } = useSelector((state) => state.profile);
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="course/:courseId" element={<CourseDetails />} />
        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="reset-password/:id"
          element={
            <OpenRoute>
              <UpdatePasswordProfile/>
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="/about"
          element={
            <About />
          }
        />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="/dashboard/cart" element={<Cart />} />
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourse />}
              />
            </>
          )}

          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="/dashboard/instructor" element={<Instructor />} />
              <Route path="/dashboard/add-course" element={<AddCourses />} />
              <Route path="/dashboard/my-courses" element={<MyCourses />} />
              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse />}
              />
            </>
          )}
        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourses/>
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              />
              </>
            )
          }
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
