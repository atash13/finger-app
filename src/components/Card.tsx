import React from "react";
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
  return (
    <div className="card">
      <img src={image.url} alt={image.title} />
      <h3>{image.title}</h3>
    </div>
  );
};

export default Card;
