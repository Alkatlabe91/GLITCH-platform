import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUserProgress,
  submitModuleActivity,
  createPost,
} from "../../services/domines";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import { ToastContainer, toast } from "react-toastify";

function UserActivity() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  const { module } = location.state || [];

  useEffect(() => {
    getActivities();
  }, []);

  const getActivities = () => {
    if (module && module.module_id) {
      getUserProgress(module.module_id)
        .then((response) => {
          setActivities(response);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const createNewPost = (activity, content) => {
    createPost(activity.user_progress_module_id, content)
      .then(() => {
        getActivities();
        toast("Your post has been published");
      })
      .catch((error) => {});
  };
  const onSubmit = (activity) => {
    submitModuleActivity(activity.user_progress_module_id)
      .then((response) => {
        getActivities();
      })
      .catch((error) => {});
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <ToastContainer></ToastContainer>
      <NavigationHeader
        navigations={[
          {
            display: "Domains & Courses",
            valueToPass: null,
            url: "/user-dashboard/learning",
          },

          {
            display: "Instances",
            valueToPass: {
              course: {
                course_id:
                  activities && activities.length > 0
                    ? activities[0].course_id
                    : null,
                course_name:
                  activities && activities.length > 0
                    ? activities[0].course_name
                    : null,
                course_description:
                  activities && activities.length > 0
                    ? activities[0].course_description
                    : null,
              },
            },
            url: "/instances",
          },
          {
            display: "Modules",
            valueToPass: {
              instance: {
                instance_id:
                  activities && activities.length > 0
                    ? activities[0].instance_id
                    : null,
                instance_name:
                  activities && activities.length > 0
                    ? activities[0].instance_name
                    : null,
              },
            },
            url: "/modules",
          },
          {
            display: "Activities",
            valueToPass: null,
            url: "/",
            current: true,
          },
        ]}
      ></NavigationHeader>
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Activities
          </div>
          <ul className="mt-2 space-y-4">
            {activities.map((activity, index) => (
              <li
                key={index}
                className={`p-4 border ${
                  activity.type === "Task" ? "bg-white" : "bg-red-100"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm sm:text-base md:text-lg leading-tight font-medium text-black">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {activity.type !== "Task"
                          ? `POINT CHALLANGE EARN MORE ${activity.point}`
                          : null}
                      </div>
                      <br></br>
                      {activity.activity_name}
                    </div>
                    <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-500">
                      {activity.activity_description}
                    </p>
                    <div className="mt-4">
                      {activity.reviwed_by ? (
                        <span
                          className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                            activity.passed
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {activity.passed ? "Passed" : "Not Passed"}
                        </span>
                      ) : null}
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 ml-2">
                        Points: {activity.point}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          activity.reviwed_by
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        } ml-2`}
                      >
                        {activity.reviwed_by
                          ? `Reviewed by: ${activity.first_name} ${activity.last_name}`
                          : "Not Reviewed"}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          activity.submited
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        } ml-2`}
                      >
                        {activity.submited ? "submited" : "Not submited"}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    {activity.submited ? (
                      activity.reviwed_by ? (
                        <div
                          className={`px-4 py-2 rounded ${
                            activity.passed
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {activity.passed ? "Passed" : "Failed"}
                        </div>
                      ) : (
                        <div className="px-4 py-2 bg-gray-500 text-white rounded">
                          Under Review
                        </div>
                      )
                    ) : (
                      <button
                        onClick={() => onSubmit(activity)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700"
                      >
                        Submit
                      </button>
                    )}
                    {/* {activity.submited &&
                    activity.reviwed_by &&
                    activity.passed === 0 ? (
                      <button
                        onClick={() => onSubmit(activity)}
                        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 mt-4"
                      >
                        Submit again
                      </button>
                    ) : null} */}
                  </div>
                </div>
                {activity.passed && activity.user_post_id === null ? (
                  <div className="flex justify-center items-center mt-8  bg-gray-100">
                    <div className=" rounded-lg p-2 mt-2 w-full max-w-lg">
                      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                        Share Your Progrees
                      </h2>
                      <p className="text-gray-600 text-center mb-8">
                        Hello Guys i have finsihed a task and earned a
                        {activity.point} points
                      </p>
                      <div className="text-center">
                        <button
                          onClick={() => {
                            createNewPost(
                              activity,
                              ` Hello Guys i have finsihed a task and earned 
                        ${activity.point} points`
                            );
                          }}
                          className="bg-indigo-600 text-white font-semibold py-2 px-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                          Share Task
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}

                {activity.passed && activity.user_post_id ? (
                  <div className="flex justify-center items-center mt-8  bg-gray-100">
                    <div className=" rounded-lg p-2 mt-2 w-full max-w-lg">
                      <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                        Watch Out
                      </h2>
                      <p className="text-gray-600 text-center mb-8">
                        {activity.post_content}
                      </p>
                      <div className="flex justify-center">
                        <a
                          className="text-blue-500 hover:text-blue-700 underline"
                          onClick={() => {
                            navigate("/user-dashboard/community");
                          }}
                        >
                          {" "}
                          Go to communty to see reaction
                        </a>
                      </div>
                    </div>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default UserActivity;
