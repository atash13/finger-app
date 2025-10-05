import React from "react";
import "./KickedUsers.css";

export default function KickedUsers(): JSX.Element {
  return (
    <div className="KickedUsers-container">
      <div className="KickedUsers-header">
        <h2 className="KickedUsers-title">Members / Kicked Users</h2>
      </div>
      <div className="KickedUsers-content"></div>
    </div>
  );
}
