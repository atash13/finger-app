import React, { useState } from "react";
import "./AccountSettings.css";

export default function AccountSettings(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"email" | "password">("email");

  return (
    <div className="accountSettings-container">
      <div className="accountSettings-header">
        <h2 className="accountSettings-title">MyProfile / Account Info</h2>
      </div>
      <div className="account-settings">
        <h2 className="title">Account Settings</h2>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "email" ? "active" : ""}`}
            onClick={() => setActiveTab("email")}
          >
            Change Email
          </button>
          <button
            className={`tab ${activeTab === "password" ? "active" : ""}`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>

        {activeTab === "email" && (
          <form className="form">
            <label>New Email Address</label>
            <input type="email" placeholder="Enter new email" />
            <div className="actions">
              <button type="button" className="cancel">
                Cancel
              </button>
              <button type="submit" className="save">
                Save
              </button>
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form className="form">
            <label>Current Password</label>
            <input type="password" placeholder="Enter current password" />

            <label>New Password</label>
            <input type="password" placeholder="Enter new password" />

            <label>Confirm New Password</label>
            <input type="password" placeholder="Confirm new password" />

            <div className="actions">
              <button type="button" className="cancel">
                Cancel
              </button>
              <button type="submit" className="save">
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
