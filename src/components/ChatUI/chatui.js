import React, { useState } from 'react';
import axios from "axios";
import './chatui.css'

const ChatWithDocuments = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { sender: "You", text: inputMessage }]);
      setInputMessage("");
      console.log(inputMessage)
    //   try {
      const response = await axios.post("http://127.0.0.1:8000/ask_question/", { question: inputMessage ,headers: { "Content-Type": "multipart/form-data" }});
      console.log(response.data)
      setMessages([...messages, { sender: "Bot", text: response.data.answer }]);
      setInputMessage("");
        // alert("File deleted successfully!");
        // fetchPdfs();
    //   } catch (error) {
    //     console.error("Error deleting file:", error);
    //     alert("Failed to delete file.");
    //   }
      // Add logic here to handle document chat response
    }
  };

  return (
    <div className="chat-with-documents">
      <h1 className="title">Chat Assistant</h1>
      <div className="chat-box">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender.toLowerCase()}`}>
            <strong>{message.sender}: </strong>{message.text}
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
      </div>
    </div>
  );
};

export default <ChatWithDocuments/>;
