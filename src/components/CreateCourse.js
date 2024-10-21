import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications

const CreateCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [courseContent, setCourseContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // eslint-disable-next-line
      const response = await axios.post(
        "https://localhost:7131/api/Course/create",
        {
          courseName,
          courseContent,
          isActive:false
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success("Course created successfully!"); // Show success notification
      setCourseName("");
      setCourseContent("");
    } catch (error) {
      toast.error("Failed to create course. Please try again!"); // Show error notification
      console.error("Failed to create course", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Create a New Course</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Course Name</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1">Course Content</label>
          <textarea
            value={courseContent}
            onChange={(e) => setCourseContent(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
        >
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
