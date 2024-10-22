import React, { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    localStorage.clear();
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('https://localhost:7131/api/Auth/login' ,{
                email,
                password
            });

            const {token} = response.data;

            const decodedToken = jwtDecode(token);
            console.log(decodedToken);
            const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
            const role =  decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
            console.log(role);
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId)
            localStorage.setItem('role', role);
            localStorage.setItem('name',decodedToken.name);
            if(role === 'registrar'){
                navigate('/adminPage');
            }else if(role === 'student'){
                navigate('/studentPage');
            }else if(role === 'professor'){
                navigate('/professorPage');
            }
        }catch(error){
            console.log("Failed to login" , error);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login 👤</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email 💌"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500 transition"
                    />
                    <input
                        type="password"
                        placeholder="Password 🔑"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-6 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-500 transition"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        Login 🚀
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;