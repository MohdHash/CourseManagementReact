import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            // eslint-disable-next-line
            const response = await axios.post('https://localhost:7131/api/Auth/register', { name, email, password, role });
            
            // Show success toast notification
            toast.success("Registration successful! Redirecting to login...", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

            setTimeout(() => navigate('/login'), 3000); // Redirect after a short delay
        } catch (err) {
            if (err.response && err.response.data) {
                // Show error toast notification with server message
                toast.error(err.response.data, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                // Show generic error toast notification
                toast.error('Registration failed due to an unexpected error.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
            console.error('Registration failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <ToastContainer /> {/* Add ToastContainer to render the toasts */}
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register ✅</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500 transition"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500 transition"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500 transition"
                    />
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-green-500 transition"
                    >
                        <option value="student">Student</option>
                        <option value="professor">Professor</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition"
                    >
                        Register 👉
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
