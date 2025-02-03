import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./chatui.css";
import   { LOGO } from "D:/Chatbot/app/frontend/src/constants/constant.js";


const App = () => {
  const uuid = crypto.randomUUID();
  const [chats, setChats] = useState([{ id: uuid, title: "Chat 1", messages: [] },]);
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [input, setInput] = useState("");
  const [references, setReferences] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const askQuestion = async (question) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/ask_question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      const data = await response.json();
      
      return {
        answer: data.answer || "Sorry, I couldn't fetch the response.",
        references: data.metadata,
      };
    } catch (error) {
      console.error("Error fetching response:", error);
      return { answer: "Error fetching response.", references: [] };
    }
  };


  const NewChatTitle = async (chat,chatId ) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/chat_name", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat }),
      });
      const data = await response.json();
      const updatedChats = chats.map((chat) =>
        chat.id === chatId  ? { ...chat, title: data.chatname || chat.title } : chat
      );
      setChats(updatedChats);

    } catch (error) {
      console.error("Error fetching response:", error);
      return { answer: "Error fetching response.", references: [] };
    }
  };

  const formatText = (list) => {
    return list.map(obj => `${obj.sender} - ${obj.text}`).join("\n")
};
  const handleSend = async () => {  


    // console.log("activeChat2==>>",activeChat)
    if (input.trim()) {
      setInput("");
      const userMessage = { sender: "user", text: input };
      // const updatedMessages = [...activeChat.messages, userMessage];
      setActiveChat({ ...activeChat, messages: [...activeChat.messages, userMessage] });

      if (activeChat.messages.length==2 ){  
        const formattedText = formatText(activeChat.messages);
        NewChatTitle(formattedText,activeChat.id)
  
        // console.log("activeChat1.title==>>",activeChat.title)
        // console.log("activeChat1==>>",activeChat)
      }


      const { answer,references } = await askQuestion(input);
      const botMessage = { sender: "voxi", text: answer, references };
      const updatedMessages = [...activeChat.messages, userMessage, botMessage];

      const updatedChats = chats.map((chat) =>
        chat.id === activeChat.id ? { ...chat, messages: updatedMessages } : chat
      );

      setChats(updatedChats);
      setActiveChat({ ...activeChat, messages: updatedMessages });
      setInput("");
    }
  };

  const startNewChat = () => {
    const uuid = crypto.randomUUID();
    const newChat = {
      id: uuid,
      title: `Chat ${chats.length + 1}`,
      messages: [],
    }
    setChats([...chats, newChat]);
    setActiveChat(newChat);
  };

  const deleteChat = (chatId) => {
    
    const updatedChats = chats.filter(chat => chat.id !== chatId);
    setChats(updatedChats);
    setActiveChat(chats[0])
  };
  const toggleDrawer = (references) => {
    setReferences(references);
    setShowDrawer(!showDrawer);
  };

  return (
    <div className="app-container">
      {/* Sidebar */}

      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
      {sidebarOpen && <img src={LOGO} alt="Logo" className="sidebar-logo" />}
        <button className="toggle-sidebar-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? "«" : "»"}
        </button>
      </div>

        {sidebarOpen && (
      <div className="sidebar-content">
          
            <button className="new-chat-btn" onClick={startNewChat}>
              + New Chat
            </button>
        <ul>
          {chats.map((chat) => (
            <li
              key={chat.id}
              className={chat.id === activeChat.id ? "active" : ""}
              onClick={() => setActiveChat(chat)}
            >
              {chat.title}
              <button className="delete-chat-btn"  onClick={() => deleteChat(activeChat.id)}>
              🗑️
              </button>
            </li>
            
          ))}
        </ul>
        
        </div>
        
       )}
      </div>

      {/* Chat Window */}
      <div className="chat-container">
        <div className="chat-header">Voxi</div>

        <div className="chat-box">
          {activeChat.messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "user" ? "user-message" : "voxi-message"}`}
            >
              <div className="message-content">
              {message.sender === "voxi" ? (
          <ReactMarkdown>{message.text}</ReactMarkdown>
        ) : (
          message.text
        )}
                {message.sender === "voxi" && message.references.length > 0 && (
                  <div>
                  <button className="references-btn" onClick={() => toggleDrawer(message.references)}>
                    📄
                  </button>
                  <button className="references-btn" >
                    👍
                  </button>
                  <button className="references-btn">
                    👎
                  </button>
                  <button className="references-btn" >
                    ✉
                  </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="chat-footer">
          <input 
            className="chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSend();
              }
            }}
            placeholder="Type a message..."
          />
          <button onClick={handleSend}>Ask</button>
        </div>
      </div>

      {/* Right-side Drawer */}
      {showDrawer && (
        <div className="drawer">
          <div className="close-drawer-btn" onClick={() => setShowDrawer(false)}>✖</div>
          <div className="drawer-header">
            <h3>Referred Documents</h3>
            
          </div>
          <ul>
            {references.map((doc, index) => (
              <li>
                <div className="document-name">{doc.source}</div>
                <div className="document-page">Page {doc.page}</div>
              </li>

            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default <App/>;
