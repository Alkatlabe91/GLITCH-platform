import { useNavigate } from 'react-router-dom';

function Domine(domin = { domin_name: "", domin_id: "", courses: [] }) {
  const navigate = useNavigate();

  const registerCourse = (course) => {
    navigate('/instances', { state: { course } });
  };
  return (
    <div className="container mx-auto p-4">
      {/* <h1 className="text-2xl font-bold mb-4">Courses</h1> */}
      <div className="flex flex-col space-y-4">
        {domin.courses &&
          domin.courses.map((course, index) => {
            return (
              <div key={course.course_id} className="mb-4 border-b pb-4">
                {/* <p className="text-sm font-semibold text-gray-700 mb-1">
                  <strong>Course Id:</strong> {course.course_id}
                </p> */}
                <p className="text-lg font-bold text-gray-900 mb-2">
                  <strong>Course Name:</strong> <br/>{course.course_name}
                </p>
                <p className="text-base text-gray-600">
                  <strong>Course Description:</strong> {course.course_description}
                </p>
                <button
                  onClick={() => {
                    registerCourse(course);
                  }}
                  class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-6 focus-visible:outline-indigo-600"
                >
                  Start Learning{" "}
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Domine;
