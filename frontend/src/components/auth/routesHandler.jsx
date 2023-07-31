import React from "react";
import { Route, Routes } from "react-router-dom";
import PersistLogin from "../containers/auth/persistLogin";
import RequireAuth from "../containers/auth/requireAuth";
import AuthLayout from "../layout/authLayout";
import Register from "../containers/auth/register";
import Login from "../containers/auth/login";
import ForgotPassword from "../containers/auth/forgotPassword";
import MaterialPage from "../pages/course/material/material";
import Home from "../pages/homePage";
import SubjectPage from "../pages/course/subject/subject";
import MyCourses from "../pages/course/myCourses";
import EachSubGradesPage from "../pages/course/grade/eachGrades";
import MyAssignment from "../pages/assignment/assignmentPage";
import AssignmentUpload from "../pages/assignment/assignmentUpload";
import AssignmentSubmitted from "../pages/assignment/assignmentSubmitted";
import AntdCalendar from "../pages/calendar/calendar";
import MyProfile from "../pages/profile/myProfile";
import Security from "../pages/profile/security/security";
import DashboardLayout from "../layout/dashboardLayout";
import NotificationSettings from "../pages/profile/notificationSettings";
import LanguageSettings from "../pages/profile/language";
import EditProfile from "../pages/profile/editProfile/editProfile";
import HelpCenter from "../pages/profile/helpCenter";
import CustomerService from "../containers/profile/customerService";
import SearchPage from "../containers/home/searchPage";
import NotificationDisplay from "../pages/notification";
import BlogsDetails from "../pages/blog/blogsDetails";
import AllBlogs from "../pages/blog/allBlogs";
import User from "../containers/user/user";
import EditUser from "../containers/user/editUser";
import AddUser from "../containers/user/addUser";
import EditPermission from "../containers/user/editPermission";

const RoutesHandler = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/courses/:coursesId/:id" element={<MaterialPage />} />
            <Route path="/courses/:id" element={<SubjectPage />} />
            <Route path="/courses" element={<MyCourses />} />
            <Route path="/grades/:id" element={<EachSubGradesPage />} />
            <Route path="/assignment" element={<MyAssignment />} />
            <Route path="/assignment/upload" element={<AssignmentUpload />} />
            <Route
              path="/assignment/submitted"
              element={<AssignmentSubmitted />}
            />
            <Route path="/calendar" element={<AntdCalendar />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/security" element={<Security />} />
            <Route
              path="/notificationSetting"
              element={<NotificationSettings />}
            />
            <Route path="/language" element={<LanguageSettings />} />
            <Route path="/editProfile" element={<EditProfile />} />
            <Route path="/helpcenter" element={<HelpCenter />} />
            {/* <Route path="/privacy" element={< />} /> */}
            <Route path="/customerService" element={<CustomerService />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/notification" element={<NotificationDisplay />} />
            <Route path="//blog/:id" element={<BlogsDetails />} />
            <Route path="/blog" element={<AllBlogs />} />
            <Route path="/user" element={<User />} />
            <Route path="/addUser" element={<AddUser />} />
            <Route path="/editUser" element={<EditUser />} />
            <Route path="/editPermission" element={<EditPermission />} />
            <Route path="/*" element={<Home />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default RoutesHandler;
