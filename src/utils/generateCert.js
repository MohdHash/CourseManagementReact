import jsPDF from "jspdf";
import "jspdf-autotable"; // Optional for table-based layouts

export const generateCert = ({studentName,courseName})=>{
    const doc = new jsPDF({
        orientation: "landscape", // Landscape certificate
        unit: "pt",
        format: "A4",
      });
  
      // Certificate Border
      doc.setLineWidth(5);
      doc.setDrawColor(0, 0, 0); // Black border
      doc.rect(20, 20, 800, 550); // Draw a rectangle around the certificate
  
      // Title: Kinstone University
      doc.setFont("Times", "bold");
      doc.setFontSize(30);
      doc.text("Kinstone University", 420, 100, { align: "center" });
  
      // Subtitle: Certificate of Completion
      doc.setFont("Times", "italic");
      doc.setFontSize(24);
      doc.text("Certificate of Completion", 420, 160, { align: "center" });
  
      // Horizontal Line
      doc.setLineWidth(2);
      doc.line(200, 170, 640, 170); // Line below the subtitle
  
      // Main Content
      doc.setFont("Times", "normal");
      doc.setFontSize(18);
      doc.text(`This is to certify that`, 420, 250, { align: "center" });
  
      // Student Name
      doc.setFont("Times", "bold");
      doc.setFontSize(22);
      doc.text(studentName, 420, 300, { align: "center" }); // Dynamic student name
  
      // Course Information
      doc.setFont("Times", "normal");
      doc.setFontSize(18);
      doc.text(`has successfully completed the course`, 420, 350, { align: "center" });
  
      // Course Name
      doc.setFont("Times", "bold");
      doc.setFontSize(22);
      doc.text(courseName, 420, 400, { align: "center" }); // Dynamic course name
  
      // Grade (Optional)
      doc.setFont("Times", "normal");
      doc.setFontSize(18);
      doc.text(`with a grade of A.`, 420, 450, { align: "center" });
  
      // Signature Line
      doc.setFont("Times", "italic");
      doc.setFontSize(16);
      doc.text("Signature", 680, 500, { align: "center" });
      doc.line(630, 510, 750, 510); // Signature line
  
      // Footer: Date of completion (Optional)
      const completionDate = new Date().toLocaleDateString(); // Dynamic date
      doc.setFont("Times", "italic");
      doc.setFontSize(16);
      doc.text(`Date: ${completionDate}`, 100, 520);
  
      // Save PDF
      doc.save(`${courseName}_certificate.pdf`);
}

