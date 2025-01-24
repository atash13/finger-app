import React, { useEffect, useState, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/NavBar";
import "./App.css";
const Chat = lazy(() => import("./Chat")); // Lazy load Chat
const CardList = lazy(() => import("./components/CardList")); // Lazy load CardList

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
    fetch("https://picsum.photos/v2/list?page=1&limit=300")
      .then((response) => response.json())
      .then((data) => setImages(data))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <div className="content">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<MainLayout images={images} />} />
              <Route path="/chat/:title" element={<Chat />} />
            </Routes>
          </Suspense>
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
        <Suspense fallback={<div>Loading...</div>}>
          <CardList images={images} />
        </Suspense>
      </div>
    </>
  );
};

export default App;
