import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import Instances from "./components/Instances/Instances";
import Modules from "./components/Modules/Modules";
import UserActivity from "./components/UserActivity/UserActivity";
import UserProfile from "./components/UserProfile/UserProfile";
import TeacherDashboard from "./components/TeacherDashboard/TeacherDashboard";
import NewDomine from "./components/NewDomine/NewDomine";
import { isAuthenticated } from "./services/auth";
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
    path: "/signUp",
    Component: SignUp,
  },
  {
    path: "/user-dashboard/:component?",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      return null;
    },
    Component: UserDashboard,
  },
  {
    path: "/teacher-dashboard/:component?",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      return null;
    },

    Component: TeacherDashboard,
  },
  {
    path: "/instances",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      return null;
    },
    Component: Instances,
  },
  {
    path: "/modules",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      return null;
    },
    Component: Modules,
  },
  {
    path: "/activities",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      return null;
    },
    Component: UserActivity,
  },
  {
    path: "/profile",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      return null;
    },
    Component: UserProfile,
  },
  {
    path: "/new-data",
    loader: async () => {
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        return redirect("/login");
      }
      return null;
    },
    Component: NewDomine,
  },
]);

export default router;
