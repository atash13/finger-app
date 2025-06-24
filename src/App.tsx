import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";

// Lazy load bileşenler
const Chat = lazy(() => import("./Chat"));
const CardList = lazy(() => import("./components/CardList"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// Tip tanımı
interface Image {
  id: string;
  download_url: string;
  author: string;
  category: "girl" | "boy" | "couple";
  tags: Record<string, string[]>;
  videoId?: string;
}

// Kategori ve alt kategoriler
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
  Age: ["18-22", "22-30", "30-40", "40+"],
  Build: ["Skinny", "Athletic", "Medium", "Curvy", "BBW"],
  "Butt Size": ["Small", "Normal", "Big", "Huge"],
  "Breast Size": ["Tiny", "Normal", "Big", "Huge"],
  Ethnicity: ["Asian", "Ebony", "Latina", "White"],
  Fetishes: [
    "Anal",
    "Ball Busting",
    "BDSM",
    "CBT",
    "Chastity Training",
    "Cuckolding",
    "Dominant",
    "Feminisation",
    "Fetish Toys",
    "Foot Fetish",
    "Giantees",
    "High Heels",
    "JOI",
    "Latex",
    "Panty Fetish",
    "Roleplay",
    "Smoking",
    "SPH",
    "Spanking",
    "Submissive",
  ],
  Hair: ["Black Hair", "Blonde", "Brunette", "Redhead", "Long", "short"],
  Height: ["<155", "155-160", "160-170", "170+"],
  Willingness: [
    "ASMR",
    "Close-up",
    "Cosplay",
    "Deepthroat",
    "Double Penetration",
    "Finger Play",
    "POV",
    "Squirt",
    "Striptease",
    "Twerk",
  ],
};

const App: React.FC = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [columns, setColumns] = useState<number>(7);
  const [selectedCategory, setSelectedCategory] = useState<
    "girl" | "boy" | "couple"
  >("girl");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://picsum.photos/v2/list?page=1&limit=400")
      .then((response) => response.json())
      .then((data) => {
        const processedData: Image[] = data.map((img: any) => {
          const imageTags: Record<string, string[]> = {};
          categories.forEach((category) => {
            if (category === "Fetishes" || category === "Willingness") {
              const numTags = Math.floor(Math.random() * 3) + 1;
              const availableTags = [...subcategories[category]];
              const selectedTags: string[] = [];
              for (let i = 0; i < numTags; i++) {
                if (availableTags.length === 0) break;
                const randomIndex = Math.floor(
                  Math.random() * availableTags.length
                );
                selectedTags.push(availableTags.splice(randomIndex, 1)[0]);
              }
              imageTags[category] = selectedTags;
            } else {
              const randomIndex = Math.floor(
                Math.random() * subcategories[category].length
              );
              imageTags[category] = [subcategories[category][randomIndex]];
            }
          });
          return {
            ...img,
            category: ["girl", "boy", "couple"][
              Math.floor(Math.random() * 3)
            ] as "girl" | "boy" | "couple",
            tags: imageTags,
            videoId: "_23s2aJiXaU", // Her karta video atanabilir
          };
        });
        setImages(processedData);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const filteredImages = images.filter((img) => {
    if (img.category !== selectedCategory) return false;
    if (selectedTags.length === 0) return true;

    const selectedTagsByCategory: Record<string, string[]> = {};
    for (const category of categories) {
      const tagsInCategory = subcategories[category].filter((tag) =>
        selectedTags.includes(tag)
      );
      if (tagsInCategory.length > 0) {
        selectedTagsByCategory[category] = tagsInCategory;
      }
    }

    for (const [category, tags] of Object.entries(selectedTagsByCategory)) {
      const imageTags = img.tags[category] || [];
      const hasMatch = tags.some((tag) => imageTags.includes(tag));
      if (!hasMatch) return false;
    }

    return true;
  });

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
                  images={filteredImages}
                  columns={columns}
                  setColumns={setColumns}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              }
            />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

// Ana sayfa layout bileşeni
const MainLayout: React.FC<{
  images: Image[];
  columns: number;
  setColumns: React.Dispatch<React.SetStateAction<number>>;
  selectedCategory: "girl" | "boy" | "couple";
  setSelectedCategory: React.Dispatch<
    React.SetStateAction<"girl" | "boy" | "couple">
  >;
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
}> = ({
  images,
  columns,
  setColumns,
  selectedCategory,
  setSelectedCategory,
  selectedTags,
  setSelectedTags,
}) => {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const toggleCategory = (category: string) => {
    setOpenCategory((prev) => (prev === category ? null : category));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
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
                    className={`w-full text-left px-4 py-1 text-sm hover:bg-gray-100 rounded ${
                      selectedTags.includes(sub) ? "bg-blue-100" : ""
                    }`}
                    onClick={() => toggleTag(sub)}
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
            {(["girl", "boy", "couple"] as const).map((cat) => (
              <div
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded shadow cursor-pointer ${
                  selectedCategory === cat ? "bg-blue-500 text-white" : ""
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </div>
            ))}
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
