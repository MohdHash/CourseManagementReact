import axios from 'axios'

export const markCourseAsCompleted = async ({courseId}) => {
    const token = localStorage.getItem("token");
    try{
      await axios.put(`https://localhost:7131/api/Enrollment/mark-completed/${courseId}`, null,{
        headers: { Authorization: `Bearer ${token}` },
      });
    }catch(error){
      console.error("Failed to mark course as completed", error);
    }
  }