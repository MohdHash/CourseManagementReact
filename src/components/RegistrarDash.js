import { Link } from "react-router-dom";


const RegistrarDash = ()=>{
    return (
        <div className="flex h-screen">
          {/* Sidebar */}
          <div className="w-1/5 h-full bg-gray-800 text-white p-6">
            <h2 className="text-2xl font-bold mb-8">Professor Dashboard</h2>
            <nav>
              <ul className="space-y-4">
                <li>
                  <Link
                    to="/manage-students"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    Manage students
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage-professors"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    Manage Professors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/manage-enrollments"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    Manage Enrollments
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-students"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    All Students
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-professors"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    All Professors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-courses"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    All courses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pending-courses"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    Course Requests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report"
                    className="block text-lg font-medium hover:text-gray-400"
                  >
                    Reports
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
    
          {/* Main Content */}
          <div className="flex-grow p-12 bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome, Admin 😎!
              </h1>
              <p className="text-lg text-gray-600">
                Use the sidebar to navigate to different operations.
              </p>
            </div>
          </div>
        </div>
      );
};

export default RegistrarDash;