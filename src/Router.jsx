import { createBrowserRouter } from "react-router";
import MainLayout from "./pages/mainLayout/MainLayout";
import Home from "./pages/home/Home";
import Resources from "./pages/resources/Resources";
import Shop from "./pages/shop/Shop";
import AboutUs from "./pages/about/AboutUs";
import ContactUs from "./pages/contact/ContactUs";
import LoginPage from "./pages/shared/LoginPage";
import SignUpPage from "./pages/shared/SignUpPage";
import Dashboard from "./pages/dashboard/Dashboard";
import AddBlog from "./pages/dashboard/add-blog/AddBlog";
import DashHome from "./pages/dashboard/DashHome";
import OverView from "./pages/dashboard/overview/OverView";
import ActivityLog from "./pages/dashboard/activity/ActivityLog";
import ProfileSetting from "./pages/dashboard/profile-setting/ProfileSetting";





const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h2>Something Went Wrong</h2>,
    children: [
      { path: "/", Component: Home },
      { path: "/resources", Component: Resources },
      { path: "/shop", Component: Shop },
      { path: "/about-us", Component: AboutUs },
      { path: "/contact", Component: ContactUs },
      { path: "/login", Component: LoginPage },
      { path: "/signup", Component: SignUpPage },
    ]
  },
  {
    path: "/dashboard", Component: Dashboard,
    children: [
      { index: true, Component: DashHome },
      { path: "add-blog", element: <AddBlog /> },
      { path: "overview", element: <OverView /> },
      { path: "activity", element: <ActivityLog /> },
      { path: "profile-setting", element: <ProfileSetting /> },

    ]
  }
]);

export default router;