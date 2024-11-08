import React from "react";
import axios from "axios";
import { FaUserGraduate, FaUserTie, FaBook } from "react-icons/fa";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Importing the jspdf-autotable plugin


const Reports = () => {
  const token = localStorage.getItem("token");
//   const decodedtoken = jwtDecode(token);
//   console.log(decodedtoken);
//   console.log(token);

  const handleDownloadReport = async (reportType) => {
    let url;
    let fileName;

    switch (reportType) {
      case "students":
        url = "https://localhost:7131/api/Auth/approved-students";
        fileName = "ApprovedStudentsReport.pdf";
        break;
      case "professors":
        url = "https://localhost:7131/api/Auth/approved-professors";
        fileName = "ApprovedProfessorsReport.pdf";
        break;
      case "courses":
        url = "https://localhost:7131/api/Course/Getapproved";
        fileName = "ApprovedCoursesReport.pdf";
        break;
      default:
        return;
    }
    try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: 'json'
        });
      
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(`Report: ${reportType.charAt(0).toUpperCase() + reportType.slice(1)}`, 105, 10, { align: "center" });
        doc.setFontSize(10);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 10, 15);
      
        // Set column headers and row mapping based on the report type
        let columns;
        let rows;
      
        if (reportType === "courses") {
          // For courses report, use "Description" instead of "Email"
          columns = ["SI.NO", "Course Name", "Description"];
          rows = response.data.$values.map((item, index) => [
            index + 1,
            item.courseName || "N/A",
            item.courseContent ? item.courseContent.split(';').join(' ') : "N/A"
          ]);
        } else {
          // For students or professors report, use "Email" as usual
          columns = ["SI.NO", "Name", "Email"];
          rows = response.data.$values.map((item, index) => [
            index + 1,
            item.name || "N/A",
            item.email || "N/A"
          ]);
        }
      
        doc.autoTable({
          startY: 20,
          head: [columns],
          body: rows,
          theme: "striped",
          headStyles: { fillColor: [100, 149, 237], textColor: 255, fontStyle: "bold" },
          alternateRowStyles: { fillColor: [240, 248, 255] },
          margin: { top: 20 },
          styles: { fontSize: 10, cellPadding: 5 },
          didDrawPage: (data) => {
            // Footer with page number
            const pageCount = doc.internal.getNumberOfPages();
            doc.setFontSize(10);
            doc.text(`Page ${data.pageNumber} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
          }
        });
      
        doc.save(fileName);
      
      } catch (error) {
        console.error("Failed to download report", error);
      }
      
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">Reports</h1>
      <div className="flex justify-center space-x-6">
        <button
          onClick={() => handleDownloadReport("students")}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
        >
          <FaUserGraduate className="mr-2 text-xl" />
          Download Student Report
        </button>
        <button
          onClick={() => handleDownloadReport("professors")}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition duration-200"
        >
          <FaUserTie className="mr-2 text-xl" />
          Download Professor Report
        </button>
        <button
          onClick={() => handleDownloadReport("courses")}
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg hover:bg-purple-700 transition duration-200"
        >
          <FaBook className="mr-2 text-xl" />
          Download Course Report
        </button>
      </div>
    </div>
  );
};

export default Reports;
