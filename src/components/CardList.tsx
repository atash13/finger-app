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
}

const CardList: React.FC<CardListProps> = ({ images }) => {
  const navigate = useNavigate();
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [visibleImages, setVisibleImages] = useState<number>(10); // Başlangıçta 10 resim göster

  // URL için başlık formatlama fonksiyonu
  const formatTitleForURL = (title: string) => {
    return title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  // Intersection Observer ile lazy loading
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleImages((prev) => prev + 40); // 10 resim daha yükle
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
    <div className="card-list">
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
          {/* Lazy Load Image Component */}
          <LazyLoadImage
            src={image.download_url}
            alt={image.author}
            effect="blur" // Bulanık yükleme efekti
            width="100%"
            height="auto"
          />
          <h3>{image.author}</h3>
        </div>
      ))}
      {/* Sayfanın sonunda yükleme tetikleyicisi */}
      <div id="load-more" style={{ height: "20px" }}></div>
    </div>
  );
};

export default CardList;
