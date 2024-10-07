import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getUserProgress,
  submitModuleActivity,
  createPost,
} from "../../services/domines";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialMediaShare from "../SocialMediaShare/SocialMediaShare";

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
        toast.success("Your post has been published");
      })
      .catch((error) => {
        toast.error("Failed to publish post");
      });
  };

  const onSubmit = (activity) => {
    submitModuleActivity(activity.user_progress_module_id)
      .then((response) => {
        getActivities();
      })
      .catch((error) => {
        toast.error("Failed to submit activity");
      });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-4xl">
      <ToastContainer />
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
      />
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Activities
          </div>
          <ul className="mt-2 space-y-4">
            {activities.map((activity, index) => (
              <li
                key={index}
                className={`p-4 border rounded-lg ${
                  activity.type === "Task"
                    ? "bg-white border-gray-300"
                    : "bg-blue-50 border-blue-200"
                }`}
              >
                <div
                  className="flex justify-between items-center"
                  style={{ position: "relative" }}
                >
                  <div className="flex-1">
                    <div className="text-lg leading-tight font-medium text-black">
                      <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
                        {activity.type}
                        {activity.type !== "Task"
                          ? `POINT CHALLENGE EARN  ${activity.point} POINTS`
                          : null}
                      </div>
                      <div className="flex items-center mt-2">
                        <img
                          style={{
                            position: "absolute",
                            top: "-68px",
                            width: "100px",
                            height: "100px",
                            right: "0px",
                          }}
                          src={`/${
                            activity.type.includes("concept")
                              ? "conecpt-challenge.png"
                              : activity.type.includes("point")
                              ? "point-challenge.png"
                              : "task.png"
                          }`}
                          alt={activity.type}
                          className="w-6 h-6 mr-2"
                        />
                        {activity.activity_name} {activity.type}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      {activity.activity_description}
                    </p>
                    <div className="mt-4 space-x-2">
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
                      <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                        Points: {activity.point}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                          activity.reviwed_by
                            ? "bg-purple-100 text-purple-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
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
                        }`}
                      >
                        {activity.submited ? "Submitted" : "Not Submitted"}
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
                        className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-700"
                      >
                        Submit
                      </button>
                    )}
                  </div>
                </div>
                {activity.passed && activity.user_post_id === null ? (
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold text-center text-gray-800">
                      Share Your Progress
                    </h2>
                    <p className="text-gray-600 text-center mb-4">
                      Congratulations! You earned {activity.point} points for
                      completing this task.
                    </p>
                    <div className="text-center">
                      <button
                        onClick={() => {
                          createNewPost(
                            activity,
                            `Hello everyone, I have completed a task and earned ${activity.point} points!`
                          );
                        }}
                        className="bg-pink-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                      >
                        Share Task
                      </button>

                      <div className="flex justify-center mt-8 mb-4">
                        <SocialMediaShare
                          defaultTitle={`Hello everyone, I have completed a task and earned ${activity.point} points!`}
                        ></SocialMediaShare>
                      </div>
                    </div>
                  </div>
                ) : null}

                {activity.passed && activity.user_post_id ? (
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-inner">
                    <h2 className="text-xl font-semibold text-center text-gray-800">
                      Check This Out!
                    </h2>
                    <p className="text-gray-600 text-center mb-4">
                      {activity.post_content}
                    </p>
                    <div className="flex justify-center">
                      <button
                        onClick={() => navigate("/user-dashboard/community")}
                        className="text-blue-500 hover:text-blue-700 underline"
                      >
                        Go to community to see reactions
                      </button>
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
