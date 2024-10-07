import { useEffect, useState } from "react";
import { getAllDomaines } from "../../services/domines";
import { getAllUsers } from "../../services/auth";
import DominesTable from "./DomainesTable";
import CoursesTable from "./CoursesTable";
import InstancesTable from "./InstancesTable";
import ModulesTable from "./ModulesTable";
import ActivitiesTable from "./ActivitiesTable";
import NewDomine from "../NewDomine/NewDomine";
import UsersTable from "./UsersTable";
function DataPanel() {
  const [domaines, setDomains] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getAllDomaines()
      .then((domaines) => {
        setDomains(domaines);
        console.log({ domaines });
      })
      .catch((error) => {});

      getAllUsers()
      .then((users) => {
        setUsers(users);
        console.log({ users });
      })
      .catch((error) => {});
  };
  const [activeItem, setActiveItem] = useState("domaines"); // Initial active item state

  const handleClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex h-screen">
      <div className="bg-gray-200 w-1/4 p-4">
        <ul>

        <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeItem === "users" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleClick("users")}
          >
            Students
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeItem === "domaines" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleClick("domaines")}
          >
            Domaines
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeItem === "courses" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleClick("courses")}
          >
            Courses
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeItem === "instances" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleClick("instances")}
          >
            Instances
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeItem === "modules" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleClick("modules")}
          >
            Modules
          </li>
          <li
            className={`cursor-pointer py-2 px-4 rounded ${
              activeItem === "activities" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => handleClick("activities")}
          >
            Activities
          </li>

          <li
            className={`cursor-pointer py-2 px-4 rounded bg-blue-500 text-white mt-10`}
            onClick={() => handleClick("new-data")}
          >
            ADD NEW
          </li>
        </ul>
      </div>

      <div className="flex-1 p-4">
        {activeItem === "domaines" && (
          <DominesTable
            domaines={domaines.map((domain) => {
              return {
                domain_name: domain.domain_name,
                domain_id: domain.domain_id,
              };
            })}
          ></DominesTable>
        )}
        {activeItem === "courses" && (
          <CoursesTable
            courses={domaines
              .map((domain) => {
                return domain.courses.map((course) => {
                  return {
                    domain_name: domain.domain_name,
                    course_id: course.course_id,
                    course_name: course.course_name,
                    course_description: course.course_description,
                  };
                });
              })
              .flat()}
          ></CoursesTable>
        )}
        {activeItem === "instances" && (
          <InstancesTable
            instances={domaines
              .map((domain) => {
                return domain.courses.map((course) => {
                  return course.instances.map((instance) => {
                    return {
                      domain_name: domain.domain_name,
                      course_name: course.course_name,
                      instance_name: instance.instance_name,
                      instance_id: instance.instance_id,
                      instance_end_date: instance.instance_end_date,
                      instance_start_date: instance.instance_start_date,
                    };
                  });
                });
              })
              .flat(2)}
          ></InstancesTable>
        )}
        {activeItem === "modules" && (
          <ModulesTable
            modules={domaines
              .map((domain) => {
                return domain.courses.map((course) => {
                  return course.instances.map((instance) => {
                    return instance.modules.map((module) => {
                      return {
                        domain_name: domain.domain_name,
                        course_name: course.course_name,
                        instance,
                        module_description: module.module_description,
                        module_id: module.module_id,
                        module_name: module.module_name,
                        required_point: module.required_point,
                      };
                    });
                  });
                });
              })
              .flat(3)}
          ></ModulesTable>
        )}
        {activeItem === "activities" && (
          <ActivitiesTable
            activities={domaines
              .map((domain) => {
                return domain.courses.map((course) => {
                  return course.instances.map((instance) => {
                    return instance.modules.map((module) => {
                      return module.activities.map((activity) => {
                        return {
                          activity_description: activity.activity_description,
                          activity_id: activity.activity_id,
                          activity_name: activity.activity_name,
                          level: activity.level,
                          point: activity.point,
                          type: activity.type,
                          domain_: domain.domain_name,
                          course_name: course.course_name,
                          instance,
                          module_description: module.module_description,
                          module_id: module.module_id,
                          module_name: module.module_name,
                          required_point: module.required_point,
                        };
                      });
                    });
                  });
                });
              })
              .flat(4)}
          ></ActivitiesTable>
        )}
        {activeItem === "new-data" && <NewDomine></NewDomine>}
        {activeItem === "users" && <UsersTable users={users} ></UsersTable>}
      </div>
    </div>
  );
}
export default DataPanel;
