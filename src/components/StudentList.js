import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StudentList = () => {
  const { courseId } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://localhost:7131/api/Enrollment/${courseId}/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(response.data.$values);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      }
    };

    fetchEnrolledStudents();
  }, [courseId]);

  const handleDownloadReport = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://localhost:7131/api/Enrollment/download-report/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob', // Important to set the response type to blob
      });

      // Create a URL for the blob and download it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `StudentReport_Course_${courseId}.pdf`); // Set the file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link); // Clean up
    } catch (error) {
      console.error("Failed to download report", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Enrolled Students</h1>
      {students.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {students.map((student) => (
            <div
              key={student.name}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                {`${student.name[0].toUpperCase()}${student.name.slice(1)}`}
              </h2>
              <p className="text-gray-600 mb-4">Email: {student.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No students enrolled in this course.</p>
      )}

      <button
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        onClick={handleDownloadReport}
      >
        Download Report
      </button>
    </div>
  );
};

export default StudentList;
