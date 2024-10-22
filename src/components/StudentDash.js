import { Link } from "react-router-dom";

const StudentDash = () => {
  const studentName = localStorage.getItem("name");

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 h-full bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Student Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/available-courses"
                className="block text-lg font-medium hover:text-gray-400"
              >
                View Available Courses
              </Link>
            </li>
            <li>
              <Link
                to="/my-courses"
                className="block text-lg font-medium hover:text-gray-400"
              >
                My Courses
              </Link>
            </li>
            <li>
              <Link
                to="/completed-courses"
                className="block text-lg font-medium hover:text-gray-400"
              >
                Completed Courses
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-12 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {`${studentName[0].toUpperCase()}${studentName.slice(1)}`} 🧑🏼‍🎓!
          </h1>
          <p className="text-lg text-gray-600">
            Use the sidebar to view available courses, access your current courses, or check completed courses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentDash;
