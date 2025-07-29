import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./ModelSidebar.css";

const menuItems = [
  { name: "Dashboard", path: "/dashboard" },
  {
    name: "MyProfile",
    children: [
      { name: "Basic Info", path: "/myprofile/basicInfo" },
      { name: "Additional Info", path: "/myprofile/additionalInfo" },
      { name: "Settings", path: "/myprofile/settings" },
      { name: "Stream Settings", path: "/myprofile/streamSettings" },
      { name: "Account Info", path: "/myprofile/accountInfo" },
    ],
  },
  { name: "Messenger", path: "/messenger" },
  {
    name: "Media",
    children: [
      { name: "Photos", path: "/media/photos" },
      { name: "Videos", path: "/media/videos" },
      { name: "Recorded Shows", path: "/media/recordedShows" },
    ],
  },
  {
    name: "Members",
    children: [
      { name: "Top Spenders", path: "/members/topSpenders" },
      { name: "Banned Users", path: "/members/bannedUsers" },
      { name: "Kicked Users", path: "/members/kickedUsers" },
    ],
  },
  {
    name: "MyStats",
    children: [
      { name: "Earnings", path: "/mystats/earnings" },
      { name: "Activity Report", path: "/mystats/activityReport" },
      { name: "Fan Club Reports", path: "/mystats/fanClubReports" },
      {
        name: "Referral Program Report",
        path: "/mystats/referralProgramReport",
      },
    ],
  },
  { name: "Support", path: "/support" },
  { name: "TermsOfUse", path: "/termsofuse" },
];

const ModelSidebar: React.FC = () => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);

  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name]
    );
  };

  return (
    <div className="model-sidebar">
      <div className="logo">LiveCamMates</div>
      <nav>
        {menuItems.map((item) =>
          item.children ? (
            <div key={item.name}>
              <div
                className="sidebar-link dropdown-header"
                onClick={() => toggleDropdown(item.name)}
              >
                {item.name}
                <span className="dropdown-arrow">
                  {openDropdowns.includes(item.name) ? "▲" : "▼"}
                </span>
              </div>
              {openDropdowns.includes(item.name) && (
                <div className="dropdown-content">
                  {item.children.map((child) => (
                    <NavLink
                      key={child.name}
                      to={child.path}
                      className={({ isActive }) =>
                        isActive
                          ? "sidebar-link sub-link active"
                          : "sidebar-link sub-link"
                      }
                    >
                      {child.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.name}
              to={item.path!}
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              {item.name}
            </NavLink>
          )
        )}
      </nav>
    </div>
  );
};

export default ModelSidebar;
