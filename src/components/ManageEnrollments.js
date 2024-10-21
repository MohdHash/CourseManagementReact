import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const ManageEnrollments = () => {
    const [enrollments, setEnrollments] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch unapproved enrollments
        const fetchUnapprovedEnrollments = async () => {
            try {
                const response = await axios.get('https://localhost:7131/api/Enrollment/unapproved', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setEnrollments(response.data.$values);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching enrollments', error);
            }
        };

        fetchUnapprovedEnrollments();
    }, [token]);

    const approveEnrollment = async (enrollmentId) => {
        try {
            await axios.put(`https://localhost:7131/api/Enrollment/approve/${enrollmentId}`, null, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setEnrollments(enrollments.filter(enrollment => enrollment.enrollmentId !== enrollmentId));
            toast('Enrollment approved successfully');
        } catch (error) {
            console.error('Error approving enrollment', error);
        }
    };

    const rejectEnrollment = async (enrollmentId) => {
        try {
            // You can implement rejection logic here (e.g., by calling an API endpoint)
            setEnrollments(enrollments.filter(enrollment => enrollment.enrollmentId !== enrollmentId));
            toast(`Enrollment with ID: ${enrollmentId} has been rejected`);
        } catch (error) {
            console.error('Error rejecting enrollment', error);
        }
    };

    return (
        <div className="p-10 bg-gray-50 min-h-screen">
            <h2 className="text-4xl font-bold mb-10 text-gray-800">Manage Enrollment Requests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                {enrollments.map((enrollment) => (
                    <div key={enrollment.enrollmentId} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition hover:scale-105 duration-300 ease-in-out">
                        <div className="relative bg-gradient-to-r from-blue-500 via-green-500 to-teal-500 h-32">
                            <div className="absolute bottom-0 left-0 px-6 py-4">
                                <h3 className="text-2xl font-semibold text-white">Student: {enrollment?.userName}</h3>
                                <p className="text-white">Course: {enrollment?.courseName}</p>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-600 mb-4">Batch ID: <span className="text-gray-800 font-medium">{enrollment?.batchId}</span></p>
                            <p className="text-gray-600 mb-4">Enrollment ID: <span className="text-gray-800 font-medium">{enrollment?.enrollmentId}</span></p>
                            <div className="flex justify-between space-x-3">
                                <button
                                    onClick={() => approveEnrollment(enrollment?.enrollmentId)}
                                    className="w-full py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition ease-in-out"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => rejectEnrollment(enrollment?.enrollmentId)}
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

export default ManageEnrollments;
