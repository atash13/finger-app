import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardList.css";

interface Image {
  id: string;
  download_url: string;
  author: string;
}

interface CardListProps {
  images: Image[];
}

const CardList: React.FC<CardListProps> = ({ images }) => {
  const navigate = useNavigate();

  const formatTitleForURL = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  return (
    <div className="card-list">
      {images.map((image) => (
        <div
          className="card"
          key={image.id}
          onClick={() =>
            navigate(`/chat/${formatTitleForURL(image.author)}`, {
              state: image,
            })
          }
          style={{ cursor: "pointer" }}
        >
          <img src={image.download_url} alt={image.author} />
          <h3>{image.author}</h3>
        </div>
      ))}
    </div>
  );
};

export default CardList;
