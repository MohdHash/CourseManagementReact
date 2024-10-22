import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookOpen, FaCheckCircle } from 'react-icons/fa';
import { MdOutlineEmojiEmotions } from 'react-icons/md';
import { GiScrollUnfurled } from 'react-icons/gi';
import { motion } from 'framer-motion';
import '../utils/loader.css';

const CompletedCourses = () => {
    const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch completed courses on page load
  useEffect(() => {
    const fetchCompletedCourses = async () => {
      try {
        const response = await axios.get('https://localhost:7131/api/Enrollment/completed',{
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  
        });
        setCompletedCourses(response.data.$values);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data || 'An error occurred');
        setLoading(false);
      }
    };

    fetchCompletedCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          <GiScrollUnfurled className="inline-block mb-2 text-green-600" /> Completed Courses
        </h1>
        <p className="text-lg text-gray-600">Here are the courses you have successfully completed!</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-full mt-10">
          <div className="text-center">
            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-64 w-64 mb-4"></div>
            <p className="text-2xl font-semibold text-gray-600">Loading completed courses...</p>
          </div>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-full">
          <p className="text-xl font-semibold text-red-600">{error}</p>
        </div>
      ) : completedCourses.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {completedCourses.map((course, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaBookOpen className="text-4xl text-blue-500 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{course.courseName}</h2>
              {/* <p className="text-gray-600 mb-4">{course.courseContent.slice(0, 100)}...</p> */}
              <div className="flex items-center justify-between">
                <FaCheckCircle className="text-green-500 text-xl" />
                <p className="text-sm text-gray-500">Course Completed</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="flex flex-col items-center justify-center mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MdOutlineEmojiEmotions className="text-8xl text-yellow-500 mb-4" />
          <p className="text-xl text-gray-600">No completed courses yet! Keep learning!</p>
        </motion.div>
      )}
    </div>
  );
};

export default CompletedCourses;