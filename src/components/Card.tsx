import React from "react";
import { useNavigate } from "react-router-dom";
import "./Card.css";

interface Image {
  id: number;
  url: string;
  title: string;
}

interface CardProps {
  image: Image;
}

const Card: React.FC<CardProps> = ({ image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${image.id}`, { state: image });
  };

  return (
    <div className="card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={image.url} alt={image.title} />
      <h3>{image.title}</h3>
    </div>
  );
};

export default Card;
