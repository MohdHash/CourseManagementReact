import { Link } from "react-router-dom";

const ProfessorDash = () => {
    const ProfessorName = localStorage.getItem("name");
    return (
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-1/5 h-full bg-gray-800 text-white p-6">
          <h2 className="text-2xl font-bold mb-8">Professor Dashboard</h2>
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/create-course"
                  className="block text-lg font-medium hover:text-gray-400"
                >
                  Create a Course
                </Link>
              </li>
              <li>
                <Link
                  to="/approved-courses"
                  className="block text-lg font-medium hover:text-gray-400"
                >
                  View Approved Courses
                </Link>
              </li>
            </ul>
          </nav>
        </div>
  
        {/* Main Content */}
        <div className="flex-grow p-12 bg-gray-100">
          <div className="bg-white shadow-lg rounded-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Welcome, {ProfessorName}!
            </h1>
            <p className="text-lg text-gray-600">
              Use the sidebar to create new courses or view the approved ones.
            </p>
          </div>
        </div>
      </div>
    );
  };
  

export default ProfessorDash;