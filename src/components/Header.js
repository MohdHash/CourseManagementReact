import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold">
                    Home
                </Link>
                <div>
                    <Link to="/login" className="mr-4 hover:underline">Login</Link>
                    <Link to="/register" className="hover:underline">Register</Link>
                </div>
            </div>
        </nav>
    );
};

export default Header;