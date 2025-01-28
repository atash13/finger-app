import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./CardList.css";

interface Image {
  id: string;
  download_url: string;
  author: string;
}

interface CardListProps {
  images: Image[];
  columns: number;
}

const CardList: React.FC<CardListProps> = ({ images, columns }) => {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleImages, setVisibleImages] = useState<number>(10);

  const formatTitleForURL = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleImages((prev) => prev + 40);
        }
      },
      { threshold: 1.0 }
    );

    const loadMoreElement = document.getElementById("load-more");
    if (loadMoreElement) {
      observerRef.current.observe(loadMoreElement);
    }

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div
      className="card-list"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: "15px",
        justifyItems: "center",
      }}
    >
      {images.slice(0, visibleImages).map((image) => (
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
          <LazyLoadImage
            src={image.download_url}
            alt={image.author}
            effect="blur"
            width="100%"
            height="100%"
          />
          <h3>{image.author}</h3>
        </div>
      ))}
      <div id="load-more" style={{ height: "20px" }}></div>
    </div>
  );
};

export default CardList;
