import { useState } from "react";
import UserProfile from "../UserProfile/UserProfile";
import TasksTable from "../TasksTable/TasksTable";
import Community from "../Community/Community";
import { logout } from "../../services/auth";
import { useNavigate} from "react-router-dom";


function TeacherDashboard() {
  const [visibleComponent, setVisibleComponent] = useState("home");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                {/* <h1 className="text-xl font-bold">Dashboard</h1> */}
                <div className="flex-shrink-0 flex items-center">
                <img src="/glitch.png" width="50px" height="50px" />
              </div>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <a
                  onClick={() => {
                    setVisibleComponent("reviewe");
                  }}
                  className={`cursor-pointer border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-bold ${
                    visibleComponent === "reviewe" ? "border-b-2" : ""
                  } `}
                >
                  Reviewe Student Tasks
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
              ) : visibleComponent === "community" ? (
                <Community> </Community>
              ) : (
                <TasksTable></TasksTable>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;
