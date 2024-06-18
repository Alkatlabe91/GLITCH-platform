import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  registerToCourse,
  getModulesByInstanceId,
  getAllUserProgress,
} from "../../services/domines";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
function Modules() {
  const navigate = useNavigate();
  const location = useLocation();
  const [modules, setModules] = useState([]);

  const { instance } = location.state || [];
  useEffect(() => {
    getModulesByInstanceId(instance.instance_id)
      .then((_modules) => {
        getAllUserProgress(_modules.map((mod) => mod.module_id))
          .then((response) => {
            _modules.forEach((el) => {
              el.activities = response.find((mod) =>
                mod.some((e) => e.module_id === el.module_id)
              );
            });
            setModules(_modules);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((err) => {});
  }, []);

  const registerModules = (module) => {
    registerToCourse(module.module_id)
      .then((response) => {
        navigate("/activities", { state: { module } });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const completeLearning = (module) => {
    navigate("/activities", { state: { module } });
  };
  const maxEarnedPointArray = Math.max(
    ...modules.map((module) => {
      return module.activities
        ? module.activities.reduce((a, i) => {
            if (i.passed) {
              a += i.point;
            }
            return a;
          }, 0)
        : 0;
    })
  );

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
                  modules && modules.length > 0 ? modules[0].course_id : null,
                course_name:
                  modules && modules.length > 0 ? modules[0].course_name : null,
                course_description:
                  modules && modules.length > 0
                    ? modules[0].course_description
                    : null,
              },
            },
            url: "/instances",
          },
          {
            display: "Modules",
            valueToPass: null,
            url: "/",
            current: true,
          },
        ]}
      ></NavigationHeader>

      <div className="container mx-auto p-4">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          Modules
        </div>
        <div className="flex flex-col space-y-4">
          {instance &&
            modules &&
            modules.map((module, index) => {
              const totalRequredPoints = module.required_point;
              const progressPoint =
                module.activities && module.activities.length > 0
                  ? module.activities.reduce((acc, item) => {
                      return (acc += item.point);
                    }, 0)
                  : 0;
              const earnedPoint =
                module.activities && module.activities.length > 0
                  ? module.activities.reduce((acc, item) => {
                      if (item.passed) {
                        acc += item.point;
                      }
                      return acc;
                    }, 0)
                  : 0;
              const completed = (earnedPoint / progressPoint) * 100;
              return (
                <div
                  key={module.module_id}
                  className="mb-4 border-b pb-4 bg-white rounded-lg shadow-md p-6 mb-4 border-b pb-4 mt-8 ml-8 mr-8 mb-8"
                >
                  <p className="text-lg font-bold text-gray-900 mb-2">
                    <strong>Module Name:</strong> {module.module_name}
                  </p>
                  <p className="text-base text-gray-600">
                    <strong>Module Description:</strong>{" "}
                    {module.module_description}
                  </p>
                  {!isNaN(completed) ? (
                    <div className="w-full bg-gray-200 rounded-full mt-6 mb-6">
                      <div
                        className="bg-green-600 text-xs leading-none py-1 text-center rounded-full"
                        style={{ width: `${completed}%` }}
                      >
                        {completed.toFixed(0)}%
                      </div>
                    </div>
                  ) : null}
                  {module.activities && module.activities.length > 0 ? (
                    <button
                      onClick={() => {
                        completeLearning(module);
                      }}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
                    >
                      Complete Learning
                    </button>
                  ) : totalRequredPoints <= maxEarnedPointArray ? (
                    <button
                      onClick={() => {
                        registerModules(module);
                      }}
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
                    >
                      Start Learning
                    </button>
                  ) : (
                    <button className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600">
                      You Need {totalRequredPoints} points to unlock this module
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Modules;
