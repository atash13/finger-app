// 📄 ModelPage.tsx
import React from "react";
import ModelSidebar from "../ModelSidebar";
import ModelNavbar from "../ModelNavbar";
import { Routes, Route } from "react-router-dom";
import BasicInfo from "./BasicInfo"; // 📌 Bu önemli: BasicInfo bileşenini ekle
import "../ModelNavbar.css";
import "../ModelSidebar.css";
import AdditionalInfoView from "./additionalInfo/AdditionalInfoView";
import Settings from "./settings/Settings";
import StreamSettings from "./streamSettings/StreamSettings";

const ModelPage: React.FC = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <ModelSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <ModelNavbar />
        <div style={{ padding: "20px", flex: 1 }}>
          <Routes>
            <Route path="/myprofile/basicInfo" element={<BasicInfo />} />
            <Route
              path="/myprofile/additionalInfo"
              element={<AdditionalInfoView />}
            />
            <Route path="/myprofile/settings" element={<Settings />} />
            <Route
              path="/myprofile/streamSettings"
              element={<StreamSettings />}
            />
            {/* Diğer alt route'lar buraya eklenebilir */}
            <Route
              path="*"
              element={
                <>
                  <h1>Welcome to the Model Dashboard</h1>
                  <p>
                    This is where you can manage your live cams, users, and
                    settings.
                  </p>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
