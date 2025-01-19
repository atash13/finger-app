import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./Chat.css";

const Chat: React.FC = () => {
  const location = useLocation();
  const image = location.state;

  if (!image) {
    return <h2>Resim bulunamadı!</h2>;
  }

  return (
    <div>
      <Navbar />
      <div className="chat-container">
        <div className="image-container">
          <img src={image.download_url} alt={image.author} />
          <div className="image-author">{image.author}</div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
