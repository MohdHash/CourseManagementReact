import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChalkboardTeacher, FaEnvelope, FaTrashAlt, FaBan } from "react-icons/fa";

const ViewProfessors = () => {
  const [professors, setProfessors] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await axios.get("https://localhost:7131/api/Auth/approved-professors", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfessors(response.data.$values);
      } catch (error) {
        console.error("Error fetching professors:", error);
      }
    };

    fetchProfessors();
  }, [token]);

  const handleSuspend = async (id, isActive) => {
    try {
      if (isActive) {
        await axios.put(`https://localhost:7131/api/Auth/suspend/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`Professor ${id} suspended`);
      } else {
        await axios.put(`https://localhost:7131/api/Auth/approve/${id}`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(`Professor ${id} resumed`);
      }
      // Update professor's status in the local state
      setProfessors((prevProfessors) =>
        prevProfessors.map((prof) =>
          prof.userId === id ? { ...prof, isActive: !isActive } : prof
        )
      );
    } catch (error) {
      console.error("Error updating professor status:", error);
    }
  };

  const handleRemove = async (id) => {
    try {
      alert(`Professor ${id} removed`);
      setProfessors((prevProfessors) => prevProfessors.filter((prof) => prof.userId !== id));
    } catch (error) {
      console.error("Error removing professor:", error);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Approved Professors</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg bg-white">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr className="bg-purple-600 text-white uppercase text-sm leading-normal">
              <th className="py-4 px-6 text-left">Professor ID</th>
              <th className="py-4 px-6 text-left">Name</th>
              <th className="py-4 px-6 text-left">Email</th>
              <th className="py-4 px-6 text-left">Status</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {professors.map((professor) => (
              <tr key={professor.userId} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-4 px-6 text-left flex items-center">
                  <FaChalkboardTeacher className="text-purple-600 mr-2" /> {professor.userId}
                </td>
                <td className="py-4 px-6 text-left">{professor.name}</td>
                <td className="py-4 px-6 text-left flex items-center">
                  <FaEnvelope className="text-blue-500 mr-2" /> {professor.email}
                </td>
                <td className="py-4 px-6 text-left">
                  <span
                    className={`py-1 px-3 rounded-full text-xs font-semibold ${
                      professor.isActive ? "bg-green-200 text-green-600" : "bg-red-200 text-red-600"
                    }`}
                  >
                    {professor.isActive ? "Active" : "Suspended"}
                  </span>
                </td>
                <td className="py-4 px-6 text-left flex space-x-4">
                  <button
                    className={`${
                      professor.isActive ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
                    } text-white py-2 px-4 rounded flex items-center`}
                    onClick={() => handleSuspend(professor.userId, professor.isActive)}
                  >
                    <FaBan className="mr-2" /> {professor.isActive ? "Suspend" : "Enable"}
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center"
                    onClick={() => handleRemove(professor.userId)}
                  >
                    <FaTrashAlt className="mr-2" /> Remove
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

export default ViewProfessors;
