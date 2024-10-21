import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const ManageStudents = () => {
    const [students, setStudents] = useState([]);
    const token = localStorage.getItem('token');

  useEffect(() => {
    // Fetch pending student requests
    const fetchStudents = async () => {
      try {
        const response = await axios.get('https://localhost:7131/api/Auth/pending-requests', {
            headers: { Authorization: `Bearer ${token}` },
        });
        // console.log(response)
        const pendingStudents = response.data.$values.filter(user => user.role === 'student');
        setStudents(pendingStudents);
      } catch (error) {
        console.error('Error fetching student requests', error);
      }
    };

    fetchStudents();
  }, [token]);

  const approveStudent = async (userId) => {
    try {
        // console.log(token);
        // console.log(localStorage.getItem('role'));
        // eslint-disable-next-line
        const response = await axios.put(`https://localhost:7131/api/Auth/approve/${userId}`, null, {
            headers: { Authorization: `Bearer ${token}` },  
          });
    //   console.log(response);
      setStudents(students.filter(student => student.userId !== userId)); // Remove the approved student from the list
      toast('Student approved successfully');
    } catch (error) {
      console.error('Error approving student', error);
    }
  };

  const rejectStudent = (userId) => {
    // For now, we do nothing but you can add logic if needed
    toast(`Rejected student request with ID: ${userId}`);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Student Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.map((student) => (
          <div key={student.userId} className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">{student.name}</h3>
            <p className="text-gray-600 mb-4">Email: {student.email}</p>
            <div className="flex justify-between">
              <button
                onClick={() => approveStudent(student.userId)}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 ease-in-out"
              >
                Approve
              </button>
              <button
                onClick={() => rejectStudent(student.userId)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-300 ease-in-out"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStudents;
