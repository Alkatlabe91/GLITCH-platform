import { useEffect, useState } from "react";
import Domine from "../DominCart/DomineCart";
import { getRegisteredModules } from "../../services/domines";
import { useNavigate} from "react-router-dom"

function Domines(props = {}) {
const navigate = useNavigate()
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    getRegisteredModules()
      .then((modules) => {
        setActivities(modules);
      })
      .catch((error) => {});
  }, []);

  const activeCourses = {};
  activities.forEach((ele) => {
    if (!activeCourses[ele.domain_name]) {
      Object.assign(activeCourses, { [ele.domain_name]: ele });
    }
  });
  return (
    <div className="">


{Object.values(activeCourses).map((activeCourse, index) => {
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 mb-4 border-b pb-4 mt-2"
          >
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
                const module = {module_name: activeCourse.module_name, module_id: activeCourse.module_id}
                navigate("/activities", {state: {module} });
              }}
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
            >
              Complete Learning{" "}
            </button>
          </div>
        );
      })}

      <h1 className="text-2xl font-bold mb-4">Courses</h1>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {props.domines.map((domin, index) => {
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-2">
                {domin.domain_name}
              </h2>

              <Domine
                key={index}
                domin_id={domin.domain_id}
                domin_name={domin.domain_name}
                courses={domin.courses}
              ></Domine>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Domines;
