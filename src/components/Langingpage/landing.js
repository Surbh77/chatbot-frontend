// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { BrowserRouter as Router,  Link } from 'react-router-dom';
// import './landing.css';
// const HomePage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="page-container">
//       <h1>Welcome to the Voxi</h1>
//         <div className="tabs">
//                 <Link to="/ingester_ui" className="tab-link">Upload Document</Link>
//                 <Link to="/chatui" className="tab-link">Chat with Documents</Link>
//         </div>
//     </div>
//   );
// };

// export default HomePage;


import React from "react";
import { Link } from "react-router-dom";
import './landing.css';
import {UPLOAD,ASK_QUESTION,ANSWER} from "../../constants/constant"

const HomePage = () => {
  return (
    <div className="page-container">
      <header className="header">
        <h1>Welcome to Voxi 🚀</h1>
        <p>Discover the Power of Intelligent Document Assistance</p>
      </header>

      <section className="intro">
        <p>
          Are you overwhelmed with information overload? Do you struggle to find the right answers from a pile of documents? We’ve got you covered!
        </p>
        <p>
          Your Smart Assistant is here to revolutionize the way you interact with your documents. Whether you're a student, professional, or anyone looking to streamline information, our chatbot can help you get answers, instantly!
        </p>
      </section>

      <section className="why-choose">
        <h2>🌟 Why Choose Your Smart Assistant?</h2>
        <ul>
          <li>Instant Answers from Your Documents</li>
          <li>Easy Document Upload</li>
          <li>Smart, Efficient, and Intuitive AI</li>
        </ul>
      </section>

      <section className="how-it-works">
        <h2>🚀 How It Works</h2>
        <div className="steps">
          <div className="step">
            <img src={UPLOAD} alt="Upload" />
            <h3>Upload Your Documents</h3>
            <p>Visit our second page to easily upload your files. You can add all kinds of documents — from technical manuals to research papers, and everything in between.</p>
          </div>
          <div className="step">
            <img src={ASK_QUESTION} alt="Ask Questions" />
            <h3>Ask Your Questions</h3>
            <p>Once your documents are uploaded, head over to our chatbot interface where you can ask any questions. The chatbot will browse your documents and provide quick, accurate answers based on the information it finds.</p>
          </div>
          <div className="step">
            <img src={ANSWER} alt="Get Answers" />
            <h3>Get Relevant Answers in Real Time</h3>
            <p>No more waiting or browsing multiple documents. Our AI assistant fetches the most relevant data, giving you precise answers fast!</p>
          </div>
        </div>
      </section>

      <section className="what-can-upload">
        <h2>📑 What Can You Upload?</h2>
        <ul>
          <li>Research Papers</li>
          <li>Instruction Manuals</li>
          <li>E-books and PDFs</li>
          <li>Product Catalogs</li>
          <li>Legal Documents</li>
        </ul>
      </section>

      <section className="features">
        <h2>🌟 Features You'll Love</h2>
        <ul>
          <li>Advanced Search Capabilities: Ask questions in natural language.</li>
          <li>Easy Navigation: Simple and intuitive interface.</li>
          <li>24/7 Access: Always available to assist you!</li>
        </ul>
      </section>

      <section className="cta">
        <h2>Ready to get started?</h2>
        <p>Explore more about our chatbot, upload your documents, and start asking questions today. Let Your Smart Assistant change the way you access and understand information!</p>
      </section>

      <div className="tabs">
        <Link to="/ingester_ui" className="tab-link">Upload Document</Link>
        <Link to="/chatui" className="tab-link">Chat with Documents</Link>
      </div>
    </div>
  );
};

export default HomePage;
