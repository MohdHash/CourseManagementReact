
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = () => {
    const[loginText,setLoginText] = useState({});
    const location = useLocation();

    useEffect(()=>{
        const handleChange = ()=>{
            if(location.pathname !== '/login' && location.pathname !== '/'){
                setLoginText({text: "Logout" , needLogin:false});
            }else{
                setLoginText({text: "Login" , needLogin:true});
            }
        }
        handleChange();
    },[location.pathname])

  

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-lg font-bold inline-flex hover:scale-125">
                    <FaHome className=" mr-2"size={27} /> 
                    <p>Home</p>
                </Link>
                <div>
                    <Link to="/login" className="mr-4 hover:underline">{loginText.text}</Link>
                    {loginText.needLogin && <Link to="/register" className="hover:underline">Register</Link>}
                </div>
            </div>
        </nav>
    );
};

export default Header;