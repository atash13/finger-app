import React, { useEffect, useState } from "react";
import Navbar from "./components/NavBar";
import "./App.css";

interface Image {
  id: string;
  download_url: string;
  author: string;
}

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const categories: string[] = [
    "Exclusive",
    "Certified",
    "Girl",
    "Hot Flirt",
    "Soul Mate",
    "Mature",
    "New Models",
    "Amateur",
    "Fetish",
    "Transgirl",
    "Lesbian",
    "Couple",
  ];

  // Fetch images from API
  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=100")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div className="app">
      <Navbar />
      <div className="content">
        <div className="sidebar">
          {categories.map((category, index) => (
            <button key={index} className="category-button">
              {category}
            </button>
          ))}
        </div>
        <div className="main-content">
          <div className="card-list">
            {images.map((image) => (
              <div className="card" key={image.id}>
                <img src={image.download_url} alt={image.author} />
                <h3>{image.author}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
