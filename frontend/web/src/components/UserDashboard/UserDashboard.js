import { useEffect, useState } from "react";
import { getAllDomines } from "../../services/domines";
import { logout } from "../../services/auth";
import { useNavigate, useParams } from "react-router-dom";
import Domines from "../Domines/Domines";
import UserProfile from "../UserProfile/UserProfile";
import Community from "../Community/Community";
import Home from "../Home/Home";

function UserDashboard() {
  const [getDomines, setDomines] = useState([]);
  const { component } = useParams();
  const [loading, setLoading] = useState(false);
  const [visibleComponent, setVisibleComponent] = useState("home");
  const navigate = useNavigate();

  const goTo = (component) => {
    if (!component) {
      return;
    }
    navigate(`/${component}`);
  };
  useEffect(() => {
    setLoading(true);
    if (component) {
      setVisibleComponent(component);
    }
    getAllDomines()
      .then((response) => {
        setDomines(response);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img src="/glitch.png" width="50px" height="50px" />
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <a
                  className={`cursor-pointer border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-bold ${
                    visibleComponent === "home" ? "border-b-2" : ""
                  } `}
                  onClick={() => {
                    setVisibleComponent("home");
                  }}
                >
                  Home
                </a>
                <a
                  className={`cursor-pointer border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-bold ${
                    visibleComponent === "profile" ? "border-b-2" : ""
                  } `}
                  onClick={() => {
                    setVisibleComponent("profile");
                  }}
                >
                  My Profile
                </a>
                <a
                  className={`cursor-pointer border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-bold ${
                    visibleComponent === "learning" ? "border-b-2" : ""
                  } `}
                  onClick={() => {
                    setVisibleComponent("learning");
                  }}
                >
                  Learning
                </a>

                <a
                  className={`cursor-pointer border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-bold ${
                    visibleComponent === "community" ? "border-b-2" : ""
                  } `}
                  onClick={() => {
                    setVisibleComponent("community");
                  }}
                >
                  Community
                </a>
                <button
                  className={`font-bold`}
                  onClick={() => {
                    logout().then(() => {
                      navigate("/login");
                    });
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>
      </header>
      <main>
        <div
          className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8"
          style={{ height: "100vh" }}
        >
          <div className="px-4 py-6 sm:px-0">
            <div className="border-gray-200 rounded-lg h-96">
              {visibleComponent === "profile" ? (
                <UserProfile></UserProfile>
              ) : visibleComponent === "home" ? (
                <Home></Home>
              ) : visibleComponent === "learning" ? (
                <Domines domines={getDomines}></Domines>
              ) : (
                <Community></Community>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserDashboard;
