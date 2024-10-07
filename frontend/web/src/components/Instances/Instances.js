import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getInstancesByCourseId } from "../../services/domines";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
function Instances() {
  const location = useLocation();
  const navigate = useNavigate();
  const [instances, setInstances] = useState([]);
  const { course } = location.state || [];

  useEffect(() => {
    getInstancesByCourseId(course.course_id)
      .then((instances)=>{
        setInstances(instances)
      })
      .catch((error) => {});
  }, [course.course_id]);
  const registerModules = (instance) => {
    navigate("/modules", { state: { instance } });
  };
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <NavigationHeader  navigations={[
          {
            display: "Domains & Courses",
            valueToPass: null,
            url: "/user-dashboard/learning",
          },
          {
            display: "Instances",
            valueToPass: null,
            url: "/",
            current: true,
          },
        ]}></NavigationHeader>
     <div className="p-6">

     <h1 className="text-2xl font-bold mb-4">{course.course_name}</h1>
      <p className="text-base text-gray-600 mb-10">
        {course.course_description}
      </p>

     </div>
      <div className="flex flex-col space-y-4">
        {instances &&
          instances.map((instance, index) => {
            return (
              <div
                key={instance.instance_id}
                className=" bg-white rounded-lg shadow-md p-6 mb-4 border-b pb-4 mt-8 ml-8 mr-8 mb-8"
              >
                <p className="text-lg font-bold text-gray-900 mb-2">
                  {instance.instance_name}
                </p>
                {/* <p className="text-base text-gray-600">
                  <strong>Instance Id:</strong> {instance.instance_id}
                </p> */}
                <p className="text-base text-gray-600">
                  <strong>Start Date:</strong> {instance.start_date}
                </p>
                <p className="text-base text-gray-600">
                  <strong>End Date:</strong> {instance.end_date}
                </p>
                <button
                  onClick={() => {
                    registerModules(instance);
                  }}
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
                >
                  GO
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Instances;
