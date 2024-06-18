import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getRequestedTasksToReview,
  markUserProgressModuleAsFailed,
  markUserProgressModuleAsPassed,
} from "../../services/domines";
import { ToastContainer, toast } from "react-toastify";

function TasksTable() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = () => {
    getRequestedTasksToReview()
      .then((tasks) => {
        setTasks(tasks);
      })
      .catch((error) => {});
  };

  const markAsFailed = (task) => {
    markUserProgressModuleAsFailed(task.user_progress_module_id).then(
      (response) => {
        toast("changes has been saved successfully");
        getTasks();
      },
      (error) => {}
    );
  };
  const markAsPassed = (task) => {
    markUserProgressModuleAsPassed(task.user_progress_module_id).then(
      (response) => {
        toast("changes has been saved successfully");
        getTasks();
      },
      (error) => {}
    );
  };
  return (
    <div className="overflow-x-auto" style={{ overflow: "scroll" }}>
      <ToastContainer />

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              User Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Module
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Course
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Instance
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Start Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              End Date
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Activity
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Point
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks.map((progressItem, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.first_name} {progressItem.last_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.module_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.course_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.instance_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.start_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.end_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.activity_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {progressItem.activity_point}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {!progressItem.reviwed_by ? (
                  <>
                    <button
                      onClick={() => markAsFailed(progressItem)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Mark as Failed
                    </button>
                    <button
                      onClick={() => markAsPassed(progressItem)}
                      className="text-green-600 hover:text-green-900 ml-2"
                    >
                      Mark as Passed
                    </button>
                  </>
                ) : (
                  <div  style={{display:"flex",justifyContent:"center"}} className={`px-4 py-2 rounded ${
                    progressItem.passed
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                  }`}>{progressItem.passed ? "Passed" : "Failed"}</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default TasksTable;
