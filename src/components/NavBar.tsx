import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">Finger Chat</div>
      <ul className="menu">
        <li>Live Cams</li>
        <li>New Models</li>
        <li>Promotions</li>
        <li>Club Elite</li>
        <li>Top Members</li>
      </ul>
      <div className="actions">
        <button className="credits-button">Get Credits</button>
        <select className="language-select">
          <option value="EN">EN</option>
          <option value="TR">TR</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;
