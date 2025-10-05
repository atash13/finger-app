import React from "react";
import "./BannedUsers.css";

export default function BannedUsers(): JSX.Element {
  return (
    <div className="BannedUsers-container">
      <div className="BannedUsers-header">
        <h2 className="BannedUsers-title">Members / Banned Users</h2>
      </div>
      <div className="BannedUsers-content"></div>
    </div>
  );
}
