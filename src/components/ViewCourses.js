import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import to handle navigation

const ViewCourses = ()=>{
    const [courses, setCourses] = useState([]);
  const navigate = useNavigate(); // Initialize history for navigation

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://localhost:7131/api/Course/Getapproved", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.$values) {
          setCourses(response.data.$values); // Set available courses
        } else {
          console.error("No courses data found in response.");
        }
      } catch (error) {
        console.error("Failed to fetch available courses", error);
      }
    };

    fetchAvailableCourses();
  }, []);

  // Function to handle card click and navigate to the course batches
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}/batches`); // Navigate to batches of the course
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Available Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.courseId}
              onClick={() => handleCourseClick(course.courseId)}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer transition duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {course.courseName}
              </h2>
              <p className="text-gray-600 mb-4">
                {course.courseContent.length > 100
                  ? `${course.courseContent.substring(0, 100).split(';').join(' ')}...`
                  : course.courseContent.split(';').join(' ')}
              </p>
              <button
                className="text-blue-600 font-semibold hover:text-blue-800"
                onClick={() => handleCourseClick(course.courseId)}
              >
                View Batches
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No available courses found.</p>
      )}
    </div>
  );
}

export default ViewCourses;