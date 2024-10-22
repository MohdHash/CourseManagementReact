import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
// import jsPDF from "jspdf";
import {generateCert} from '../utils/generateCert.js'

const CoursePage = () => {
  // eslint-disable-next-line
  const { courseId } = useParams(); // Get courseId from URL params
  const location = useLocation();
  const { batchContent, courseName } = location.state; // Get batch content, course name, and student name from state
  const studentName = localStorage.getItem("name");
  // Split the batch content into separate lectures
  const lectures = batchContent.split(";").map((lecture, index) => ({
    title: `Lecture ${index + 1}`,
    content: lecture.trim(),
  }));

  // State to track completed lectures
  const [completedLectures, setCompletedLectures] = useState([]);

  // Handle marking a lecture as completed
  const handleCompleteLecture = (index) => {
    setCompletedLectures((prevCompleted) =>
      prevCompleted.includes(index)
        ? prevCompleted.filter((i) => i !== index)
        : [...prevCompleted, index]
    );
  };

  // Check if all lectures are completed
  const allLecturesCompleted = completedLectures.length === lectures.length;

  // Generate PDF certificate
  const handleGenerateCertificate = () => {
    generateCert({studentName , courseName});
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
        Course Lectures
      </h1>

      {lectures.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {lectures.map((lecture, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{lecture.title}</h2>
              <p className="text-lg text-gray-600 mb-4">{lecture.content}</p>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={completedLectures.includes(index)}
                  onChange={() => handleCompleteLecture(index)}
                  className="mr-2"
                />
                <span className="text-gray-800">Mark as Completed</span>
              </label>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">
          No lectures available for this batch.
        </p>
      )}

      {/* Show "Generate Certificate" button if all lectures are completed */}
      {allLecturesCompleted && (
        <div className="mt-10 text-center">
          <button
            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
            onClick={handleGenerateCertificate}
          >
            Generate Certificate
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
