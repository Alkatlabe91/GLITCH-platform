import { createBrowserRouter } from "react-router-dom";
import Login from "./components/Login/Login";
import App from "./App";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Instances from "./components/Instances/Instances";
import Modules from "./components/Modules/Modules";
import UserActivity from "./components/UserActivity/UserActivity";
import UserProfile from "./components/UserProfile/UserProfile";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/user-dashboard/:component?",
    Component: UserDashboard,
  },
  {
    path: "/teacher-dashboard/:component?",
    Component: TeacherDashboard,
  },
  {
    path: "/instances",
    Component: Instances,
  },
  {
    path: "/modules",
    Component: Modules,
  },
  {
    path: "/activities",
    Component: UserActivity,
  },
  {
    path: "/profile",
    Component: UserProfile,
  },
]);

export default router;
