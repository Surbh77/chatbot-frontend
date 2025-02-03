import React, { useState } from 'react';
import axios from "axios";
import './chatui.css'

const ChatWithDocuments = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [metadata, setMetadata] = useState([]);
  // const handleSendMessage = async () => {
  //   if (inputMessage.trim()) {
  //     setMessages([...messages, { sender: "You", text: inputMessage }]);
  //     setInputMessage("");
  //     console.log(inputMessage)
  //     const response = await axios.post("http://127.0.0.1:8000/ask_question/", { question: inputMessage ,headers: { "Content-Type": "multipart/form-data" }});
  //     console.log(response.data)
  //     setMessages([...messages, { sender: "Bot", text: response.data.answer }]);
  //     setInputMessage("");
  //   }
  // };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      // Add user's message
      setMessages((prevMessages) => [...prevMessages, { sender: "You", text: inputMessage }]);
  
      try {
        const response = await axios.post("http://127.0.0.1:8000/ask_question/", { 
          question: inputMessage 
        }, {
          headers: { "Content-Type": "application/json" }
        });
  
        // Add bot's response
        setMessages((prevMessages) => [...prevMessages, { sender: "Bot", text: response.data.answer }]);
        setMetadata(response.data.metedata);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [...prevMessages, { sender: "Bot", text: "Sorry, something went wrong!" }]);
      }
  
      // Clear input field
      setInputMessage("");
    }
  };
  

  return (
    <div className="chat-with-documents">
      <h1 className="title">Chat Assistant</h1>
      {/* Drawer Toggle Button */}
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <button onClick={() => setIsDrawerOpen(false)} className="btn-close-drawer">X</button>
        <h2>Documents Referred</h2>
        {metadata.length > 0 ? (
          metadata.map((item, index) => (
            <div className='docs-referred' key={index}>
              <div className='docs-referred-name'>{item.source}</div>
              <div className='docs-referred-page'>Page {item.page}</div>
            </div>
          ))
        ) : (
          <p>No metadata available.</p>
        )}
      </div>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div className="chat-container">
          <div key={index} className={`message ${message.sender.toLowerCase()}`}>
            <strong>{message.sender}: </strong>{message.text}
            <button onClick={() => setIsDrawerOpen(true)} className="btn-drawer-toggle">Docs</button>
          </div>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={handleSendMessage} className="btn-send">Send</button>
        {/* <button onClick={() => setIsDrawerOpen(true)} className="btn-drawer-toggle">Docs</button> */}
      </div>
    </div>
  );
};

export default <ChatWithDocuments/>;
