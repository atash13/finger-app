import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import Chat from "./Chat";
import "./App.css";
import CardList from "./components/CardList";

interface Image {
  id: string;
  download_url: string;
  author: string;
}

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

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=100")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<MainLayout images={images} />} />
            <Route path="/chat/:title" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const MainLayout: React.FC<{ images: Image[] }> = ({ images }) => {
  return (
    <>
      <div className="sidebar">
        {categories.map((category, index) => (
          <button key={index} className="category-button">
            {category}
          </button>
        ))}
      </div>
      <div className="main-content">
        <CardList images={images} />
      </div>
    </>
  );
};

export default App;
