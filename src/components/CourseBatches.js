import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa"; // Importing an icon from react-icons

const CourseBatches = () => {
  const { courseId } = useParams(); // Get the course ID from the URL
  const [batches, setBatches] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);

  useEffect(() => {
    const fetchBatches = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`https://localhost:7131/api/Course/${courseId}/batches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBatches(response.data.$values); // Assuming response.data contains the batches
      } catch (error) {
        console.error("Failed to fetch batches", error);
      }
    };

    fetchBatches();
  }, [courseId]);

  const handleBatchClick = async (batchId) => {
    setSelectedBatch(batchId); // Set the selected batch
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`https://localhost:7131/api/Course/${courseId}/batches/${batchId}/students`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStudents(response.data.$values); // Set the students for the selected batch
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-600">Batches for Course ID: {courseId}</h1>
      {batches.length > 0 ? (
        batches.map((batch) => (
          <div 
            key={batch.batchId} 
            className="border rounded-lg p-4 mb-4 bg-gray-50 hover:shadow-md transition-shadow duration-200 transform hover:scale-105"
            onClick={() => handleBatchClick(batch.batchId)} // Handle batch click
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Batch: {new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}
            </h2>
            <p className="mt-2 text-gray-600">{batch.batchContent}</p>
            {/* Additional batch details can be displayed here */}
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-48">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-500 text-3xl mr-2" />
            <p className="text-xl font-semibold text-gray-500">
              No batches found for this course.
            </p>
          </div>
        </div>
      )}

      {selectedBatch && students.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold text-center mb-4">Students Enrolled in Batch {selectedBatch}</h2>
          <ul className="list-disc list-inside">
            {students.map((student) => (
              <li key={student.userId} className="text-lg text-gray-800">
                {student.name} - {student.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedBatch && students.length === 0 && (
        <div className="flex items-center justify-center h-48">
          <div className="flex items-center">
            <FaExclamationTriangle className="text-yellow-500 text-3xl mr-2" />
            <p className="text-xl font-semibold text-gray-500">
              No students found for this batch.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseBatches;
