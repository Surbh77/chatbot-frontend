import React from "react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router,  Link } from 'react-router-dom';
import './landing.css';
const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Welcome to the Home Page</h1>
        <div className="tabs">
                <Link to="/ingester_ui" className="tab-link">Upload Document</Link>
                <Link to="/chatui" className="tab-link">Chat with Documents</Link>
        </div>
    </div>
  );
};

export default HomePage;