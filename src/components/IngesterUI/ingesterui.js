
import React, { useState, useEffect } from "react";
import axios from "axios";
import './ingesterui.css';

const App = () => {
  const [uploaderName, setUploaderName] = useState("");  // Add state for uploader's name
  // const [selectedFile, setSelectedFile] = useState(null); // File state
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchPdfs();
  }, []);

  // const fetchPdfs = async () => {
  //   try {
  //     const response = await axios.get("http://127.0.0.1:8000/get_all_document/");
  //     setPdfFiles(response.data);
  //     console.log(response.data)
  //   } catch (error) {
  //     console.error("Error fetching PDFs:", error);
  //   }
  // };

  const fetchPdfs = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/get_all_document/");
  
      // If the response has a 'data' field, use it. Otherwise, fallback to an empty array
      setPdfFiles(Array.isArray(response.data.data) ? response.data.data : []);
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      setPdfFiles([]); // Fallback to empty array in case of error
    }
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // const handleUpload = async () => {
  //   if (!selectedFile) return alert("Please select a file!");

  //   const formData = new FormData();
  //   formData.append("file", selectedFile);

  //   try {
  //     await axios.post("http://127.0.0.1:8000/upload_document/", formData, {
  //       headers: { "Content-Type": "multipart/form-data" },
  //     });
  //     alert("File uploaded successfully!");
  //     fetchPdfs();
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //     alert("Failed to upload file.");
  //   }
  // };

  const handleUpload = async () => {
    // if (!selectedFile) return alert("Please select a file!");
    if (!selectedFile || !uploaderName) return alert("Please select a file and enter your name!");

    try {
      // const fileReader = new FileReader();
      // fileReader.onload = async () => {
      // const binaryData = fileReader.result;

      // Create a FormData object and append the file
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("uploader_name", uploaderName)

      console.log(formData)
      // Send the file to the FastAPI endpoint
      await axios.post("http://127.0.0.1:8000/upload_document/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    
      alert("File uploaded successfully!");
      fetchPdfs(); // Refresh the list of PDFs
    // };
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };
  

  const handleDelete = async (pdfId) => {
    const isConfirmed = window.confirm("Do you really want to delete the selected document?");
    
    if (!isConfirmed) {
      return; // Exit the function if the user clicks "Cancel"
    }
  
    try {
      await axios.post("http://127.0.0.1:8000/delete_document/", { document_id: pdfId });
      alert("File deleted successfully!");
      fetchPdfs();
    } catch (error) {
      console.error("Error deleting file:", error);
      alert("Failed to delete file.");
    }
  };
  return (
    <div className="ingester" style={{ padding: "20px" }}>
      <h1 className="title">Document Ingester</h1>
      <hr/>
      <div className="input-parameters" style={{ marginBottom: "20px" }}>
        <p>Name of uploader:- </p>
        <input type="text" placeholder="Enter your name" value={uploaderName} onChange={(e) => setUploaderName(e.target.value)}/>
        <input type="file" className="custom-file-input" accept="application/pdf" onChange={handleFileChange} />
        <div className="file-choose-button" onClick={handleUpload}>Upload</div>
      </div>
      <hr/>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>File Name</th>
            <th>Uploader</th>
            <th>Date</th>
            <th>Actions</th>
            
          </tr>
        </thead>
        <tbody>
          {pdfFiles.map((pdf) => (
            <tr key={pdf.document_id}>
              <td>{pdf.document_id}</td>
              <td>{pdf.document_name}</td>
              <td>{pdf.uploader_name}</td>
              <td>{pdf.datetime}</td>
              <td>
                <button onClick={() => handleDelete(pdf.document_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default <App/>;