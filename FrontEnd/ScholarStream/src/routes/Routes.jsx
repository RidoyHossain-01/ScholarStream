import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SingUp/SignUp";
import Loader from "../components/shared/Loader";
import PrivateRoute from "./PrivateRoute";
import AllScholarships from "../pages/AllScholarships/AllScholarships";

import ScholarshipDetails from "../pages/ScholarshipDetails/ScholarshipDetails";
import DashBoard from "../layouts/DashBoard";
import PaymentSuccess from "../pages/Payment/PaymentSuccess";
import PaymentFailed from "../pages/Payment/PaymentFailed";
import PostAScholarship from "../pages/DashboardPages/Admin/PostAScholarship/PostAScholarship";
import Profile from "../pages/MyProfile/Profile";
import ReviewApplications from "../pages/DashboardPages/Moderator/ReviewScholarships/ReviewApplications";
import ManageScholarships from "../pages/DashboardPages/Admin/ManageScholarship/ManageScholarship";
import ManageUsers from "../pages/DashboardPages/Admin/ManageUsers/ManageUsers";
import MyApplications from "../pages/DashboardPages/Student/MyApplications/MyApplications";
import MyReviews from "../pages/DashboardPages/Student/MyReviews/MyReviews";
import ManageReview from "../pages/DashboardPages/Moderator/ManageReview/ManageReview";
import AdminRoute from "./AdminRoute";
import ModeratorRoute from "./ModeratorRoute";
import ErrorPage from "../pages/Error/ErrorPage";
import StudentRoute from "./StudentRoute";
import AboutUs from "../pages/AboutUs/AboutUs";
import DashboardHome from "./../pages/DashboardPages/DashboardHomepage/DashboardHome";
import Blogs from "../pages/Blogs/Blogs";
import BlogDetails from "../pages/Blogs/BlogDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "all-scholarships",
        Component: AllScholarships,
      },
      {
        path: "blogs",
        element: (
          <PrivateRoute>
            <Blogs />
          </PrivateRoute>
        ),
      },
      {
        path: "blogs/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "scholarship/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-failed",
        element: (
          <PrivateRoute>
            <PaymentFailed />
          </PrivateRoute>
        ),
      },
    ],
  },
  // {

  // path: "*",
  // element: <ErrorPage />

  // },
  {
    path: "about",
    Component: AboutUs,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/dashboard",

        element: <DashboardHome />,
      },
      {
        path: "manage-scholarships",
        element: (
          <AdminRoute>
            <ManageScholarships />
          </AdminRoute>
        ),
      },
      {
        path: "post-A-Scholarship",
        element: (
          <AdminRoute>
            <PostAScholarship />
          </AdminRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "review-applications",
        element: (
          <ModeratorRoute>
            <ReviewApplications />
          </ModeratorRoute>
        ),
      },
      {
        path: "my-profile",
        Component: Profile,
      },
      {
        path: "my-applications",
        element: (
          <StudentRoute>
            <MyApplications />
          </StudentRoute>
        ),
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      },
      {
        path: "manage-reviews",
        element: (
          <ModeratorRoute>
            <ManageReview />
          </ModeratorRoute>
        ),
      },
    ],
  },
]);
