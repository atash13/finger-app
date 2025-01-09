import React from "react";
import Card from "./Card";
import "./CardList.css";

interface Image {
  id: number;
  url: string;
  title: string;
}

interface CardListProps {
  images: Image[];
}

const CardList: React.FC<CardListProps> = ({ images }) => {
  return (
    <div className="card-list">
      {images.map((image) => (
        <Card key={image.id} image={image} />
      ))}
    </div>
  );
};

export default CardList;
