import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

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
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4">
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
            <Route path="/chat/:id" element={<Chat />} />
          </Routes>
        </Suspense>
      </div>
    </div>
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
    <div className="flex">
      <div className="w-64 bg-white shadow-lg p-4">
        {categories.map((category, index) => (
          <div key={index} className="mb-2">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => toggleCategory(category)}
            >
              {category}
            </button>
            {openCategory === category && (
              <div className="ml-4 mt-2 space-y-2">
                {subcategories[category]?.map((sub, subIndex) => (
                  <button 
                    key={subIndex} 
                    className="w-full text-left px-4 py-1 text-sm hover:bg-gray-100 rounded"
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="px-4 py-2 bg-white rounded shadow">Girl</div>
            <div className="px-4 py-2 bg-white rounded shadow">Boy</div>
            <div className="px-4 py-2 bg-white rounded shadow">Couple</div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setColumns(8)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              8 Kolon
            </button>
            <button 
              onClick={() => setColumns(6)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              6 Kolon
            </button>
            <button 
              onClick={() => setColumns(3)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              3 Kolon
            </button>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <CardList images={images} columns={columns} />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
