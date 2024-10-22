import React, { useEffect, useState } from "react";
import { FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EnrolledCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Fetch enrolled courses
  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://localhost:7131/api/Enrollment/enrolled", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(response.data.$values);  // Assuming API returns list of courses the student is enrolled in
      } catch (error) {
        console.error("Failed to fetch enrolled courses", error);
      }
    };

    fetchEnrolledCourses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">My Courses</h1>
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course.courseId} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <FaBook className="text-indigo-500 text-3xl mr-3" />
                <h2 className="text-2xl font-bold text-gray-900 capitalize">{course.courseName}</h2>
              </div>
              <div className="text-lg text-gray-600 mb-4">
                <span className="font-medium text-indigo-500">Lectures:</span> {course.lecturesCount}
              </div>
              <button
                className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600"
                onClick={() => navigate(`/course/${course.courseId}`, { state: { batchContent: course.batchContent , courseName: course.courseName} })}
              >
                Open Course
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">You have not enrolled in any courses yet.</p>
      )}
    </div>
  );
};

export default EnrolledCourses;
