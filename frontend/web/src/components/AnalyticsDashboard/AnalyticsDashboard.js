import React, { useEffect, useState } from "react";
import { analytics } from "../../services/domines";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Cell,
} from "recharts";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#6A5ACD",
  "#20B2AA",
];

const AnalyticsDashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    analytics()
      .then(setData)
      .catch((error) => {});
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const userData = data.users.map((user) => ({
    name: user.username,
    registration_date: user.registration_date,
  }));

  const courseData = data.courses.map((course) => ({
    name: course.course_name,
    domain_id: course.domain_id,
  }));

  const instanceData = data.instances.reduce((acc, instance) => {
    const course = data.courses.find(
      (course) => course.course_id === instance.course_id
    );
    if (course) {
      const courseName = course.course_name;
      acc[courseName] = (acc[courseName] || 0) + 1;
    }
    return acc;
  }, {});

  const moduleData = data.modules.reduce((acc, module) => {
    const instance = data.instances.find(
      (instance) => instance.instance_id === module.instance_id
    );
    if (instance) {
      const instanceName = instance.instance_name;
      acc[instanceName] = (acc[instanceName] || 0) + 1;
    }
    return acc;
  }, {});

  const activityData = data.activities.reduce((acc, activity) => {
    const module = data.modules.find(
      (module) => module.module_id === activity.module_id
    );
    if (module) {
      const moduleName = module.module_name;
      acc[moduleName] = (acc[moduleName] || 0) + 1;
    }
    return acc;
  }, {});

  const userProgressData = data.user_progress_modules.reduce(
    (acc, progress) => {
      acc.submited += progress.submited ? 1 : 0;
      acc.finished += progress.finished ? 1 : 0;
      acc.passed += progress.passed ? 1 : 0;
      return acc;
    },
    { submited: 0, finished: 0, passed: 0 }
  );

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
      <div>
          <h2 className="text-1xl font-semibold mb-2">
            Check The Progress Of Students
          </h2>
          <PieChart width={600} height={300}>
            <Pie
              data={[
                {
                  name: "Submited",
                  value: userProgressData.submited,
                  fill: COLORS[0],
                },
                {
                  name: "Finished",
                  value: userProgressData.finished,
                  fill: COLORS[1],
                },
                {
                  name: "Passed",
                  value: userProgressData.passed,
                  fill: COLORS[2],
                },
              ]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {[
                { name: "Submited", value: userProgressData.submited },
                { name: "Finished", value: userProgressData.finished },
                { name: "Passed", value: userProgressData.passed },
              ].map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div>
          <h2 className="text-1xl font-semibold mb-2">Courses by Domain</h2>
          <BarChart width={600} height={300} data={courseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="domain_id">
              {courseData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div>
          <h2 className="text-1xl font-semibold mb-2">
            What Is The Number of Instances Per Course ?
          </h2>
          <BarChart
            width={600}
            height={300}
            data={Object.keys(instanceData).map((key, index) => ({
              name: key,
              count: instanceData[key],
              fill: COLORS[index % COLORS.length],
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count">
              {Object.keys(instanceData).map((key, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>

        <div>
          <h2 className="text-1xl font-semibold mb-2"> What Is The Number Of Modules Per Instance</h2>
          <PieChart width={600} height={300}>
            <Pie
              data={Object.keys(moduleData).map((key, index) => ({
                name: key,
                value: moduleData[key],
                fill: COLORS[index % COLORS.length],
              }))}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={100}
            >
              {Object.keys(moduleData).map((key, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
        <div>
          <h2 className="text-1xl font-semibold mb-2">
            User Registrations Over Time
          </h2>
          <LineChart width={600} height={300} data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="registration_date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="name" stroke="#8884d8" />
          </LineChart>
        </div>
        <div>
          <h2 className="text-1xl font-semibold mb-2">Activities Per Module</h2>
          <BarChart
            width={600}
            height={300}
            data={Object.keys(activityData).map((key, index) => ({
              name: key,
              count: activityData[key],
              fill: COLORS[index % COLORS.length],
            }))}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count">
              {Object.keys(activityData).map((key, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </div>

       
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
