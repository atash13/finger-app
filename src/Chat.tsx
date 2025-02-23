import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./Chat.css";
import LiveVideo from "./LiveVideo";
import YouTubePlayer from "./YouTubePlayer";

const Chat: React.FC = () => {
  const location = useLocation();
  const image = location.state;
  const [messages, setMessages] = useState([
    { sender: "AnnFleminge", text: "Hello! How's your day?" },
    { sender: "You", text: "Hey! It's going great. You?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
  };

  if (!image) {
    return <h2>Resim bulunamadı!</h2>;
  }

  return (
    <div className="chat-main-container">
      <Navbar />
      <main className="main-content">
        <div className="chat-video-container">
          {/* video bölümü*/}
          <div className="video-section">
            <YouTubePlayer />
            <div className="video-author">
              {image?.author || "Unknown Author"}
            </div>
          </div>
          {/* Chat Bölümü */}
          <div className="chat-section">
            <h2 className="chat-title">Live Chat</h2>
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <strong>{msg.sender}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div className="input-container">
              <input
                className="chat-input"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage} className="send-button">
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
