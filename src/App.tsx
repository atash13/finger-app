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
  "Appearance",
  "Age",
  "Build",
  "Butt Size",
  "Breast Size",
  "Ethnicity",
  "Fetishes",
  "Hair",
  "Height",
  "Willingness",
];

const subcategories: Record<string, string[]> = {
  Appearance: [
    "Petite",
    "Hairy Pussy",
    "Natural",
    "Piercing",
    "Shaved",
    "Stockings",
    "Tattoo",
    "Gloves",
    "Masks",
    "Rubber",
  ],
  Age: ["Teen", "Adult", "Mature"],
  Build: ["Slim", "Athletic", "Curvy"],
  "Butt Size": ["Small", "Medium", "Large"],
  "Breast Size": ["Small", "Medium", "Large"],
  Ethnicity: ["Asian", "Caucasian", "African"],
  Fetishes: ["BDSM", "Roleplay", "Voyeur"],
  Hair: ["Short", "Long", "Bald"],
  Height: ["Short", "Average", "Tall"],
  Willingness: ["Softcore", "Hardcore", "Extreme"],
};

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [columns, setColumns] = useState<number>(7);

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
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  return (
    <>
      <div className="sidebar">
        {categories.map((category, index) => (
          <div key={index} className="category-container">
            <button
              className="category-button"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
            {openCategory === category && (
              <div className="subcategory-list">
                {subcategories[category]?.map((sub, subIndex) => (
                  <button key={subIndex} className="subcategory-button">
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="main-content">
        <div className="category-name">
          <div className="container-gender">
            <div className="category-information">Girl</div>
            <div className="category-information">Boy</div>
            <div className="category-information">Couple</div>
          </div>
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
    </>
  );
};

export default App;
