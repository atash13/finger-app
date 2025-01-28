import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import "./App.css";

const Chat = lazy(() => import("./Chat"));
const CardList = lazy(() => import("./components/CardList"));

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
  const [columns, setColumns] = useState<number>(7); // Varsayılan olarak 7 sütun

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
              <Route
                path="/"
                element={
                  <MainLayout
                    images={images}
                    columns={columns}
                    setColumns={setColumns}
                  />
                }
              />
              <Route path="/chat/:title" element={<Chat />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

const MainLayout: React.FC<{
  images: Image[];
  columns: number;
  setColumns: React.Dispatch<React.SetStateAction<number>>;
}> = ({ images, columns, setColumns }) => {
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
        <div className="category-name">
          <div className="category-information">Girl</div>
          <div className="button-container">
            <button onClick={() => setColumns(8)}>8 Kolon</button>
            <button onClick={() => setColumns(6)}>6 Kolon</button>
            <button onClick={() => setColumns(3)}>3 Kolon</button>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CardList images={images} columns={columns} />
        </Suspense>
      </div>
      <style>
        {`.card-list {
            display: grid;
            grid-template-columns: repeat(${columns}, 1fr);
            gap: 20px;
            padding: 20px;
          }`}
      </style>
    </>
  );
};

export default App;
