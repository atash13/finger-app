import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ModelPage from "./modelpage/pages/ModelPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      {/* AuthProvider ile sarmala, böylece tüm uygulama auth bilgilerine erişebilir */}
      <BrowserRouter>
        {/*<App />*/}
        <ModelPage />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
