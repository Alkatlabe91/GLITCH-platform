import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  getAllDomaines,
  addNewActivity,
  addNewCourse,
  addNewDomain,
  addNewInstace,
  addNewModule,
} from "../../services/domines";

const NewDomine = () => {
  const [domains, setDomains] = useState([]);
  const [courses, setCourses] = useState([]);
  const [instances, setInstances] = useState([]);
  const [modules, setModules] = useState([]);
  const [activities, setActivities] = useState([]);

  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedInstance, setSelectedInstance] = useState("");
  const [selectedModule, setSelectedModule] = useState("");

  const [courseName, setCourseName] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [instanceName, setInstanceName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [moduleName, setModuleName] = useState("");
  const [moduleDescription, setModuleDescription] = useState("");
  const [requiredPoint, setRequiredPoint] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityPoint, setActivityPoint] = useState("");

  useEffect(() => {
    getAllDomaines()
      .then((data) => {
        const domaines = data.map((domain) => {
          return {
            domain_id: domain.domain_id,
            domain_name: domain.domain_name,
          };
        });
        const courses = data
          .map((domain) => {
            return domain.courses.map((course) => {
              return {
                course_id: course.course_id,
                course_name: course.course_name,
              };
            });
          })
          .flat();
        const instances = data
          .map((domain) => {
            return domain.courses.map((course) => {
              return course.instances.map((instance) => {
                return {
                  instance_id: instance.instance_id,
                  instance_name: instance.instance_name,
                };
              });
            });
          })
          .flat(2);
        const modules = data
          .map((domain) => {
            return domain.courses.map((course) => {
              return course.instances.map((instance) => {
                return instance.modules.map((module) => {
                  return {
                    module_id: module.module_id,
                    module_name: module.module_name,
                  };
                });
              });
            });
          })
          .flat(3);
        setDomains(domaines);
        setCourses(courses);
        setInstances(instances);
        setModules(modules);
      })
      .catch((error) => {});
  }, []);

  const handleAddDomain = () => {
    addNewDomain(selectedDomain)
      .then((response) => {
        setDomains([...domains, response.data]);
        setSelectedDomain("");
        toast("Added successfully");
      })
      .catch((error) => console.error("Error adding domain:", error));
  };

  const handleAddCourse = () => {
    console.log(courseName, courseDescription, selectedDomain);
    addNewCourse(courseName, courseDescription, selectedDomain)
      .then((response) => {
        setCourseName("");
        setCourseDescription("");
        setCourses([...courses, response.data]);
        toast("Added successfully");
      })
      .catch((error) => console.error("Error adding course:", error));
  };

  const handleAddInstance = () => {
    addNewInstace(selectedCourse, instanceName, startDate, endDate)
      .then((response) => {
        setStartDate(null);
        setEndDate(null);
        setInstances([...instances, response.data]);
        toast("Added successfully");
      })
      .catch((error) => console.error("Error adding instance:", error));
  };

  const handleAddModule = () => {
    addNewModule(selectedInstance, moduleName, moduleDescription, requiredPoint)
      .then((response) => {
        setModuleDescription("");
        setModules([...modules, response.data]);
        toast("Added successfully");
        setRequiredPoint("");
      })
      .catch((error) => console.error("Error adding module:", error));
  };

  const handleAddActivity = () => {
    addNewActivity(
      selectedModule,
      activityName,
      activityDescription,
      activityLevel,
      activityPoint,
      activityType
    )
      .then((response) => {
        setActivityName("");
        setActivityDescription("");
        setActivityLevel("");
        setActivityType("");
        setActivityPoint("");
        toast("Added successfully");
        setActivities([...activities, response.data]);
      })
      .catch((error) => console.error("Error adding activity:", error));
  };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Domain</h2>
        <input
          type="text"
          value={selectedDomain}
          onChange={(e) => setSelectedDomain(e.target.value)}
          placeholder="Domain Name"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleAddDomain}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Domain
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Course</h2>
        <select
          onChange={(e) => {
            const value = domains[e.target.value].domain_id
            setSelectedDomain(value)
          }}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        >
          <option value="">Select Domain</option>
          {domains.map((domain,index) => (
            <option key={index} value={index}>
              {domain.domain_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          placeholder="Course Name"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <input
          type="text"
          value={courseDescription}
          onChange={(e) => setCourseDescription(e.target.value)}
          placeholder="Course Description"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleAddCourse}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Course
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Instance</h2>
        <select
          onChange={(e) => {
           const value = courses[e.target.value].course_id;
            setSelectedCourse(value)
          }}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        >
          <option value="">Select Course</option>
          {courses.map((course,index) => (
            <option key={index} value={index}>
              {course.course_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={instanceName}
          onChange={(e) => setInstanceName(e.target.value)}
          placeholder="Instance Name"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <input
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <input
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleAddInstance}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Instance
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Module</h2>
        <select
          onChange={(e) => {
           const value = instances[e.target.value].instance_id;
            setSelectedInstance(value)
          }}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        >
          <option value="">Select Instance</option>
          {instances.map((instance,index) => (
            <option key={index} value={index}>
              {instance.instance_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="Module Name"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <input
          type="text"
          value={moduleDescription}
          onChange={(e) => setModuleDescription(e.target.value)}
          placeholder="Module Description"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <input
          type="number"
          value={requiredPoint}
          onChange={(e) => setRequiredPoint(e.target.value)}
          placeholder="Required Point"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleAddModule}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Module
        </button>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add Activity</h2>
        <select
          onChange={(e) => {
            setSelectedModule(modules[e.target.value].module_id)
          }}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        >
          <option value="">Select Module</option>
          {modules.map((module, index) => (
            <option key={index}  value={index}>
              {module.module_name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          placeholder="Activity Name"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <input
          type="text"
          value={activityDescription}
          onChange={(e) => setActivityDescription(e.target.value)}
          placeholder="Activity Description"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <input
          type="number"
          value={activityLevel}
          onChange={(e) => setActivityLevel(e.target.value)}
          placeholder="Activity Level"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <select
          value={activityType}
          onChange={(e) => setActivityType(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        >
          <option value="">Select Activity Type</option>
          <option value="task">Task</option>
          <option value="concept-challenge">Concept Challenge</option>
          <option value="point-challenge">Point Challenge</option>
        </select>
        <input
          type="number"
          value={activityPoint}
          onChange={(e) => setActivityPoint(e.target.value)}
          placeholder="Activity Point"
          className="p-2 border border-gray-300 rounded mb-4 w-full"
        />
        <button
          onClick={handleAddActivity}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Activity
        </button>
      </div>
    </div>
  );
};

export default NewDomine;
