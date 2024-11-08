import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserGraduate, FaEnvelope , FaBan } from "react-icons/fa";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7131/api/Auth/approved-students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStudents(response.data.$values);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [token]);

  const handleToggleStatus = async (id , isActive) => {
    try{
        const url = `https://localhost:7131/api/Auth/${isActive ? "suspend" : "approve"}/${id}`;
        await axios.put(url , {} , {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStudents(students.map((student)=> 
          student.userId === id ? {...student, isActive: !isActive} : student
        ));
        toast.success(`Student has been ${isActive ? "suspended" : "Enabled" }`)
    }catch(error){
      console.log("Error toggling student status", error);
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
        Approved Students
      </h1>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {students.map((student) => (
              <tr key={student.userId} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-left flex items-center">
                  <FaUserGraduate className="text-blue-500 mr-2" />
                  <span>{student.name}</span>
                </td>
                <td className="py-4 px-6 text-left flex items-center">
                  <FaEnvelope className="text-green-500 mr-2" />
                  <span>{student.email}</span>
                </td>
                <td className="py-4 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${
                      student.isActive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                    }`}
                  >
                    {student.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="py-4 px-6 text-left">
                  <button
                    className={`bg-${student.isActive ? "yellow" : "green"}-500 hover:bg-${student.isActive ? "yellow" : "green"}-600 text-white py-2 px-4 rounded flex items-center`}
                    onClick={() => handleToggleStatus(student.userId, student.isActive)}
                  >
                    <FaBan className="mr-2" />
                    {student.isActive ? "Suspend" : "Enable"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewStudents;
