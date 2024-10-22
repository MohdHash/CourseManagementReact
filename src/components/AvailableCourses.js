import React, { useEffect, useState } from "react";
import { FaBook, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons for courses and dropdowns
import axios from "axios";

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [expandedCourse, setExpandedCourse] = useState(null);

  // Fetch available courses when component mounts
  useEffect(() => {
    const fetchAvailableCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://localhost:7131/api/Course/Getapproved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.$values) {
          setCourses(response.data.$values);
        } else {
          console.error("No courses data found.");
        }
      } catch (error) {
        console.error("Failed to fetch available courses", error);
      }
    };

    fetchAvailableCourses();
  }, []);

  // Toggle expanded state for a course
  const handleCourseClick = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId); // Toggle the expanded course
  };

  // Handle student enrollment
  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
    const startDate = new Date(); // Current date for enrollment
    const endDate = new Date(new Date().setMonth(new Date().getMonth() + 3)); // Assuming a 3-month course duration

    try {
        // eslint-disable-next-line
      const response = await axios.post(
        "https://localhost:7131/api/Enrollment/enrollnew",
        {
          userId,         // Passing userId
          courseId,       // Passing courseId from the selected course
          startDate,      // Enrollment start date
          endDate         // Enrollment end date
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Successfully enrolled in the course!");
    } catch (error) {
      if (error.response && error.response.data) {
        alert(`Failed to enroll: ${error.response.data}`);
      } else {
        alert("An error occurred while enrolling.");
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">Available Courses</h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.courseId}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 relative"
              onClick={() => {handleCourseClick(course.courseId); handleEnroll(course.courseId)}}
            >
              {/* Course Title and Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FaBook className="text-indigo-500 text-3xl mr-3" />
                  <h2 className="text-2xl font-bold text-gray-900 capitalize">
                    {course.courseName}
                  </h2>
                </div>

                {/* Chevron for expanding content */}
                <button
                  className="text-indigo-500 text-xl"
                  onClick={() => handleCourseClick(course.courseId)}
                >
                  {expandedCourse === course.courseId ? <FaChevronUp /> : <FaChevronDown />}
                </button>
              </div>

              {/* Course Price */}
              <div className="text-lg text-gray-600 mb-4">
                <span className="font-medium text-indigo-500">Price:</span> ₹1000
              </div>

              {/* Toggle the dropdown to show course content */}
              {expandedCourse === course.courseId && (
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-2 text-indigo-500">Course Content:</h3>
                  <ul className="list-disc list-inside text-gray-700">
                    {course.courseContent.split(";").map((item, index) => (
                      <li key={index} className="my-2">{item.trim()}</li> // Split the content by semicolon and display
                    ))}
                  </ul>
                </div>
              )}

              {/* Enroll Button */}
              <button
                className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                onClick={() => handleEnroll(course.courseId)}
              >
                Enroll Now
              </button>

              {/* Card Border Animation */}
              <div className={`absolute inset-0 rounded-lg border-2 transition-colors duration-300 ${expandedCourse === course.courseId ? 'border-indigo-500' : 'border-transparent'}`}></div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No available courses found.</p>
      )}
    </div>
  );
};

export default AvailableCourses;
