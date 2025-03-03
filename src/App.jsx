
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { OpenRoute } from "./components/core/Auth/OpenRoute";
import { PrivateRoute } from "./components/core/Auth/PrivateRoute";

import { Navbar } from "./components/common/Navbar";
import Home from "./pages/Home";
import { About } from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import { Dashboard } from "./pages/Dashboard";

import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";
import { ForgotPassword } from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Contact } from "./pages/Contact";
import { Error } from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings/Index";

function App() {
  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

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
              <UpdatePassword />
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
          path="about"
          element={
            <OpenRoute>
              <About />
            </OpenRoute>
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
        </Route>

        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
