import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCheck, FaTimes, FaExclamationTriangle } from "react-icons/fa"; // Importing icons for approval and rejection

const CourseRequests = () => {
  const [courseRequests, setCourseRequests] = useState([]);

  useEffect(() => {
    const fetchCourseRequests = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("https://localhost:7131/api/Course/pending-course", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response.data);
        if (response.data) {
          setCourseRequests(response.data);
        } else {
          console.error("No course requests found in response.");
        }
      } catch (error) {
        console.error("Failed to fetch course requests", error);
      }
    };

    fetchCourseRequests();
  }, []);

  // Function to approve a course request
  const handleApprove = async (courseId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(`https://localhost:7131/api/Course/approve/${courseId}`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh the course requests
      setCourseRequests((prev) => prev.filter((course) => course.courseId !== courseId));
    } catch (error) {
      console.error("Failed to approve course request", error);
    }
  };

  // Function to reject a course request
  const handleReject = async (courseId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(`https://localhost:7131/api/Course/${courseId}/reject`, null, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Refresh the course requests
      setCourseRequests((prev) => prev.filter((course) => course.courseId !== courseId));
    } catch (error) {
      console.error("Failed to reject course request", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Course Requests for Approval</h1>
      {courseRequests.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courseRequests.map((request) => (
            <div key={request.courseId} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">{request.courseName}</h2>
              <p className="text-gray-600 mb-4">
                {request.courseContent.length > 100
                  ? `${request.courseContent.substring(0, 100)}...`
                  : request.courseContent}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleApprove(request.courseId)}
                  className="flex items-center text-green-600 hover:text-green-800"
                >
                  <FaCheck className="mr-1" /> Approve
                </button>
                <button
                  onClick={() => handleReject(request.courseId)}
                  className="flex items-center text-red-600 hover:text-red-800"
                >
                  <FaTimes className="mr-1" /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-48">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-500 text-3xl mr-2" />
            <p className="text-xl font-semibold text-gray-500">No course requests found.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseRequests;
