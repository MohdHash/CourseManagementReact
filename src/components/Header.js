import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUserPlus, FaGraduationCap } from 'react-icons/fa';

const Header = () => {
    const [loginText, setLoginText] = useState({});
    const location = useLocation();

    useEffect(() => {
        const handleChange = () => {
            if (location.pathname !== '/login' && location.pathname !== '/') {
                setLoginText({ text: "Logout", needLogin: false, icon: <FaSignOutAlt size={20} className="mr-1" /> });
            } else {
                setLoginText({ text: "Login", needLogin: true, icon: <FaSignInAlt size={20} className="mr-1" /> });
            }
        };
        handleChange();
    }, [location.pathname]);

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold inline-flex items-center hover:scale-105 transition-transform">
                    <FaGraduationCap className="mr-2" size={30} />
                    <p>Hashsera</p>
                </Link>
                <div className="flex items-center space-x-4">
                    <Link 
                        to="/login" 
                        className="inline-flex items-center hover:underline transition duration-200"
                    >
                        {loginText.icon}
                        {loginText.text}
                    </Link>
                    {loginText.needLogin && (
                        <Link to="/register" className="inline-flex items-center hover:underline transition duration-200">
                            <FaUserPlus className="mr-1" size={20} />
                            Register
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
