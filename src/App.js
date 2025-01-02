// // import logo from './logo.svg';
// // import './App.css';

// // function App() {
// //   return (
// //     <div className="App">
// //       <header className="App-header">
// //         <img src={logo} className="App-logo" alt="logo" />
// //         <p>
// //           Edit <code>src/App.js</code> and save to reload.
// //         </p>
// //         <a
// //           className="App-link"
// //           href="https://reactjs.org"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           Learn React
// //         </a>
// //       </header>
// //     </div>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './App.css';

// const App = () => {
//   const [uploaderName, setUploaderName] = useState("");  // Add state for uploader's name
//   // const [selectedFile, setSelectedFile] = useState(null); // File state
//   const [pdfFiles, setPdfFiles] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);

//   useEffect(() => {
//     fetchPdfs();
//   }, []);

//   // const fetchPdfs = async () => {
//   //   try {
//   //     const response = await axios.get("http://127.0.0.1:8000/get_all_document/");
//   //     setPdfFiles(response.data);
//   //     console.log(response.data)
//   //   } catch (error) {
//   //     console.error("Error fetching PDFs:", error);
//   //   }
//   // };

//   const fetchPdfs = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/get_all_document/");
  
//       // If the response has a 'data' field, use it. Otherwise, fallback to an empty array
//       setPdfFiles(Array.isArray(response.data.data) ? response.data.data : []);
//     } catch (error) {
//       console.error("Error fetching PDFs:", error);
//       setPdfFiles([]); // Fallback to empty array in case of error
//     }
//   };
//   const handleFileChange = (event) => {
//     setSelectedFile(event.target.files[0]);
//   };

//   // const handleUpload = async () => {
//   //   if (!selectedFile) return alert("Please select a file!");

//   //   const formData = new FormData();
//   //   formData.append("file", selectedFile);

//   //   try {
//   //     await axios.post("http://127.0.0.1:8000/upload_document/", formData, {
//   //       headers: { "Content-Type": "multipart/form-data" },
//   //     });
//   //     alert("File uploaded successfully!");
//   //     fetchPdfs();
//   //   } catch (error) {
//   //     console.error("Error uploading file:", error);
//   //     alert("Failed to upload file.");
//   //   }
//   // };

//   const handleUpload = async () => {
//     // if (!selectedFile) return alert("Please select a file!");
//     if (!selectedFile || !uploaderName) return alert("Please select a file and enter your name!");

//     try {
//       // const fileReader = new FileReader();
//       // fileReader.onload = async () => {
//       // const binaryData = fileReader.result;

//       // Create a FormData object and append the file
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       formData.append("uploader_name", uploaderName)

//       console.log(formData)
//       // Send the file to the FastAPI endpoint
//       await axios.post("http://127.0.0.1:8000/upload_document/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
    
//       alert("File uploaded successfully!");
//       fetchPdfs(); // Refresh the list of PDFs
//     // };
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Failed to upload file.");
//     }
//   };
  

//   const handleDelete = async (pdfId) => {
//     try {
//       await axios.post("http://127.0.0.1:8000/delete_document/", { document_id: pdfId });
//       alert("File deleted successfully!");
//       fetchPdfs();
//     } catch (error) {
//       console.error("Error deleting file:", error);
//       alert("Failed to delete file.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>Document Ingester</h1>
//       <div style={{ marginBottom: "20px" }}>
//         <p>Name</p>
//         <input type="text" placeholder="Enter your name" value={uploaderName} onChange={(e) => setUploaderName(e.target.value)}/>
//         <input type="file" accept="application/pdf" onChange={handleFileChange} />
//         <button onClick={handleUpload}>Upload</button>
//       </div>
//       <table border="1" cellPadding="10" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>File Name</th>
//             <th>Uploader</th>
//             <th>Date</th>
//             <th>Actions</th>
            
//           </tr>
//         </thead>
//         <tbody>
//           {pdfFiles.map((pdf) => (
//             <tr key={pdf.document_id}>
//               <td>{pdf.document_id}</td>
//               <td>{pdf.document_name}</td>
//               <td>{pdf.uploader_name}</td>
//               <td>{pdf.datetime}</td>
//               <td>
//                 <button onClick={() => handleDelete(pdf.document_id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;


// ****************************************************
// **********************New Code**********************
// ****************************************************


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/Langingpage/landing";
import ingester_ui from './components/IngesterUI/ingesterui';
import chatui from './components/ChatUI/chatui';
import './App.css'; // Make sure to import the CSS file

function App() {
  return (
    <Router>
      {/* <div className="app-container"> */}
        <Routes>
          <Route path="/ingester_ui" element={ingester_ui}  />
          <Route path="/chatui" element={chatui}  />
          <Route path="/" element={<LandingPage />} />
        </Routes>
      {/* </div> */}
    </Router>
  );
}

export default App;

