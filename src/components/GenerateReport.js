import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GenerateReport = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfessorCourses = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://localhost:7131/api/Course/MyApproved', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.$values) {
          setCourses(response.data.$values);
        } else {
          console.error("No courses data found in response.");
        }
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };

    fetchProfessorCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    navigate(`/report/${courseId}/students`);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Generate Student Report</h1>
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
                  ? `${course.courseContent.substring(0, 100)}...`
                  : course.courseContent}
              </p>
              <button className="text-blue-600 font-semibold hover:text-blue-800">
                View Enrolled Students
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default GenerateReport;
