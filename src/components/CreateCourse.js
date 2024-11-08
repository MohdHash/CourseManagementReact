import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [moduleContent, setModuleContent] = useState("");
  const [courseModules, setCourseModules] = useState([]);

  const handleAddModule = () => {
    if (moduleContent.trim()) {
      setCourseModules([...courseModules, moduleContent.trim()]);
      setModuleContent("");
    }
  };

  const handleRemoveModule = (index) => {
    setCourseModules(courseModules.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const courseContent = courseModules.join("; ");
      await axios.post(
        "https://localhost:7131/api/Course/create",
        {
          courseName,
          courseContent,
          isActive: false,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Course created successfully!");
      setCourseName("");
      setCourseModules([]);
    } catch (error) {
      toast.error("Failed to create course. Please try again!");
      console.error("Failed to create course", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 mt-10 max-w-lg mx-auto bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-4xl font-semibold mb-6 text-center text-blue-700">Create a New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-lg font-medium mb-1">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter course name"
            required
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-lg font-medium mb-1">Add Module</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={moduleContent}
              onChange={(e) => setModuleContent(e.target.value)}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter module content"
            />
            <button
              type="button"
              onClick={handleAddModule}
              className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
            >
              <FiPlus size={24} />
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h3 className="text-xl font-semibold mb-2">Course Modules:</h3>
          {courseModules.length > 0 ? (
            <ul className="space-y-2">
              {courseModules.map((module, index) => (
                <motion.li 
                  key={index}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
                >
                  <span>{module}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveModule(index)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No modules added yet.</p>
          )}
        </motion.div>

        <motion.button 
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full py-3 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-500 transition"
        >
          Create Course
        </motion.button>
      </form>
    </motion.div>
  );
};

export default CreateCourse;
