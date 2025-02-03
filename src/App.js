import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from "./components/Langingpage/landing";
import ingester_ui from './components/IngesterUI/ingesterui';
import chatui from './components/ChatUI/chatui';
// import chatui from './components/ChatUI/chatui1';
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

