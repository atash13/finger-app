import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Chat.css";
import YouTubePlayer from "./YouTubePlayer";

const Chat: React.FC = () => {
  const location = useLocation();
  const image = location.state;
  const [messages, setMessages] = useState([
    { sender: "AnnFleminge", text: "Hello! How's your day?" },
    { sender: "You", text: "Hey! It's going great. You?" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

  const isNearBottom = () => {
    if (!chatBoxRef.current) return true;
    const { scrollTop, scrollHeight, clientHeight } = chatBoxRef.current;
    return scrollHeight - (scrollTop + clientHeight) < 100;
  };

  const handleScroll = () => {
    if (chatBoxRef.current) {
      setShouldAutoScroll(isNearBottom());
    }
  };

  useEffect(() => {
    if (shouldAutoScroll && chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, shouldAutoScroll]);

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { sender: "You", text: newMessage }]);
    setNewMessage("");
    setShouldAutoScroll(true);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  if (!image) {
    return <h2>Resim bulunamadı!</h2>;
  }

  return (
    <div className="chat-main-container">
      <div className="chat-video-container">
        <div className="video-section">
          <YouTubePlayer />
          <div className="video-author">
            {image?.author || "Unknown Author"}
          </div>
        </div>
        <div className="chat-section">
          <h4 className="chat-title">Live Chat</h4>
          <div 
            className="chat-box" 
            ref={chatBoxRef}
            onScroll={handleScroll}
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-message ${msg.sender === "You" ? "own-message" : ""}`}
              >
                <strong>{msg.sender}:</strong> {msg.text}
              </div>
            ))}
          </div>
          <div className="input-container">
            <input
              className="chat-input"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
