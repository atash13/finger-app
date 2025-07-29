import React from "react";
import "./ModelNavbar.css";

const ModelNavbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <h2>Dashboard</h2>
      </div>
      <div className="navbar-right">
        <span className="navbar-username">Ateş</span>
        <img
          src="https://via.placeholder.com/32"
          alt="profile"
          className="navbar-avatar"
        />
      </div>
    </header>
  );
};

export default ModelNavbar;
