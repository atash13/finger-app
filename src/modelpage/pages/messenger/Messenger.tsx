import React from "react";
import "./Messenger.css";

export default function Messenger(): JSX.Element {
  return (
    <div className="messenger-container">
      <div className="messenger-header">
        <h2 className="messenger-title">MyProfile / Messenger</h2>
      </div>
      <div className="messenger-content"></div>
    </div>
  );
}
