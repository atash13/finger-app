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
import AccountSettings from "./accountSettings/AccountSettings";
import Messenger from "./messenger/Messenger";
import Photos from "./media/Photos/Photos";
import Videos from "./media/Videos/Videos";
import RecordedShows from "./media/RecordedShows/RecordedShows";
import BannedUsers from "./members/bannedUsers/BannedUsers";
import KickedUsers from "./members/kickedUsers/KickedUsers";
import TopSpenders from "./members/topSpenders/TopSpenders";
import Earnings from "./mystats/earnings/Earnings";
import ActivityReport from "./mystats/activityReport/ActivityReport";
import FanClubReport from "./mystats/fanClubReport/FanClubReport";
import ReferralProgramReport from "./mystats/referralProgramReport/ReferralProgramReport";

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
            <Route
              path="/myprofile/accountInfo"
              element={<AccountSettings />}
            />
            <Route path="/messenger" element={<Messenger />} />"
            <Route path="/media/photos" element={<Photos />} />
            <Route path="/media/videos" element={<Videos />} />
            <Route path="/media/recordedShows" element={<RecordedShows />} />
            <Route path="/members/bannedUsers" element={<BannedUsers />} />
            <Route path="/members/kickedUsers" element={<KickedUsers />} />
            <Route path="/members/topSpenders" element={<TopSpenders />} />
            <Route path="/mystats/earnings" element={<Earnings />} />
            <Route
              path="/mystats/activityReport"
              element={<ActivityReport />}
            />
            <Route path="/mystats/fanClubReports" element={<FanClubReport />} />
            <Route
              path="/mystats/referralProgramReport"
              element={<ReferralProgramReport />}
            />
            <Route path="/support" element={<div>Support Page</div>} />
            <Route path="/termsofuse" element={<div>Terms of Use Page</div>} />
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
