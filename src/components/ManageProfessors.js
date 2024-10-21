import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const ManageProfessors = () => {
    const [professors, setProfessors] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch pending professor requests
        const fetchProfessors = async () => {
            try {
                const response = await axios.get('https://localhost:7131/api/Auth/pending-requests', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const pendingProfessors = response.data.$values.filter(user => user.role === 'professor');
                setProfessors(pendingProfessors);
            } catch (error) {
                console.error('Error fetching professor requests', error);
            }
        };

        fetchProfessors();
    }, [token]);

    const approveProfessor = async (userId) => {
        try {
            // eslint-disable-next-line
            const response = await axios.put(`https://localhost:7131/api/Auth/approve/${userId}`, null, {
                headers: { Authorization: `Bearer ${token}` },  
            });
            setProfessors(professors.filter(professor => professor.userId !== userId)); // Remove the approved professor from the list
            toast('Professor approved successfully');
        } catch (error) {
            console.error('Error approving professor', error);
        }
    };

    const rejectProfessor = (userId) => {
        toast(`Rejected professor request with ID: ${userId}`);
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold mb-10 text-gray-800">Manage Professor Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {professors.map((professor) => (
                    <div key={professor.userId} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 duration-300 ease-in-out">
                        <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-32">
                            <div className="absolute bottom-0 left-0 px-6 py-4">
                                <h3 className="text-2xl font-semibold text-white">{professor.name}</h3>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 mb-4">Email: <span className="text-gray-800 font-medium">{professor.email}</span></p>
                            <div className="flex justify-between space-x-3">
                                <button
                                    onClick={() => approveProfessor(professor.userId)}
                                    className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition ease-in-out"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => rejectProfessor(professor.userId)}
                                    className="w-full py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition ease-in-out"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProfessors;
