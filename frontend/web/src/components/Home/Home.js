import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRegisteredModules } from "../../services/domines";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getRegisteredModules()
      .then((modules) => {
        setActivities(modules);
      })
      .catch((error) => {});
  }, []);

  const totalPassedPoints = activities.reduce((total, activity) => {
    return activity.passed ? total + activity.point : total;
  }, 0);

  const totalFinishedTasks = activities.filter(
    (activity) => activity.passed
  ).length;

  const activeCourses = {};
  activities.forEach((ele) => {
    if (!activeCourses[ele.domain_name]) {
      Object.assign(activeCourses, { [ele.domain_name]: ele });
    }
  });
  return (
    <>
      <div className="flex" style={{ height: 200 }}>
        <div
          className="bg-green-500 text-white p-6 rounded-lg shadow-md "
          style={{ maxWidth: 200, height: 200 }}
        >
          <h2 className="text-xl font-bold mb-2">Total Finished Tasks</h2>
          <p className="text-2xl">{totalFinishedTasks}</p>
        </div>

        <div
          className="bg-blue-500 text-white p-6 rounded-lg shadow-md ml-8"
          style={{ maxWidth: 200, height: 200 }}
        >
          <h2 className="text-xl font-bold mb-2">Total Passed Points</h2>
          <p className="text-2xl">{totalPassedPoints}</p>
        </div>

        <div
          className="bg-red-500 text-white p-6 rounded-lg shadow-md ml-8"
          style={{ maxWidth: 200, height: 200 }}
        >
          <h2 className="text-xl font-bold mb-2">Total Active Courses</h2>
          <p className="text-2xl">{Object.values(activeCourses).length}</p>
        </div>
        <div>
          <img alt="my points" src="/point.svg" width={300} height={200} />
        </div>
      </div>

      {Object.values(activeCourses).map((activeCourse, index) => {
        return (
          <div
            key={index}
            className="bg-white flex rounded-lg shadow-md p-6 mb-4 border-b pb-4 mt-8"
          >
            <div>
              <img alt="keep learning" src="/motivated.svg" width={200} height={200} />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-700 mb-4 mt-2">
                Complete your course
              </h1>

              <p className="text-sm font-semibold text-gray-700 mb-1">
                <strong>Domine :</strong> {activeCourse.domain_name}
              </p>
              <p className="text-lg font-bold text-gray-900 mb-2">
                <strong>Module Name:</strong> {activeCourse.module_name}
              </p>
              <p className="text-base text-gray-600">
                <strong>Course Name:</strong> {activeCourse.course_name}
              </p>
              <button
                onClick={() => {
                  const module = {
                    module_name: activeCourse.module_name,
                    module_id: activeCourse.module_id,
                  };
                  navigate("/user-dashboard");
                  navigate("/activities", { replace: true, state: { module } });
                }}
                className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
              >
                Complete Learning{" "}
              </button>
            </div>
          </div>
        );
      })}

      <div className="max-w">
        <div className="bg-white text-black p-6 rounded-lg shadow-md mt-4">
          <h2 className="text-xl font-semibold mb-4">
            Your Activity Breakdown
          </h2>
          <div className="flex flex-wrap">
            <ul className="list-disc">
              {activities.map(
                (activity, index) =>
                  activity.reviwed_by && (
                    <li key={index} className="mb-2 space-y-4">
                      <span className="font-semibold">
                        {activity.domain_name} {activity.course_name}{" "}
                        {activity.module_name} {activity.activity_name}:
                      </span>
                      <span
                        className={
                          activity.passed ? "text-green-600" : "text-red-600"
                        }
                      >
                        {activity.passed ? "(Passed)" : "(Not Passed)"}
                      </span>
                    </li>
                  )
              )}
            </ul>
            <img alt="am first" src="/first.svg" width={400} height={200} />
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;

