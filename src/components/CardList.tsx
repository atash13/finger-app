import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const [visibleImages, setVisibleImages] = useState<number>(20);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        === document.documentElement.offsetHeight
      ) {
        setVisibleImages(prev => Math.min(prev + 20, images.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  const handleCardClick = (image: Image) => {
    navigate(`/chat/${image.id}`, { state: { image } });
  };

  return (
    <div 
      className="grid gap-4 p-4" 
      style={{ 
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {images.slice(0, visibleImages).map((image) => (
        <div
          key={image.id}
          onClick={() => handleCardClick(image)}
          className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            src={image.download_url}
            alt={image.author}
            className="w-full h-48 object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <p className="text-white text-sm font-medium truncate">{image.author}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardList;
