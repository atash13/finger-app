// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// ⚙️ Ortam değişkenlerini .env dosyasından alıyoruz
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// 🔥 Firebase'i başlat
const app = initializeApp(firebaseConfig);

// 📦 Firebase Storage erişimi
export const storage = getStorage(app);

// 💾 Firestore erişimi
export const db = getFirestore(app);

export default app;

/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIV3cMFAyB9isx3IymfJ6GzjXOdx9aj7Y",
  authDomain: "finger-app-73ed8.firebaseapp.com",
  projectId: "finger-app-73ed8",
  storageBucket: "finger-app-73ed8.firebasestorage.app",
  messagingSenderId: "902618479247",
  appId: "1:902618479247:web:bdcf1c2690b60507550efa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
*/