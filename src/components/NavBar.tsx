import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NavBar.css";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmailIcon from "@mui/icons-material/Email";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Menu, MenuItem, TextField } from "@mui/material";
import RegisterModal from "../RegisterModal";
import LoginModal from "../Loginmodal";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <nav className="navbar">
      <div className="logo">Finger Chat</div>
      <ul className="menu">
        <li onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Live Cams
        </li>
        <li>
          <EmojiEventsIcon style={{ color: "white" }} />
        </li>
        <li>
          <EmailIcon />
        </li>
        <li>
          <FavoriteIcon />
        </li>
        <li>
          <select className="language-select">
            <option value="EN">EN</option>
            <option value="TR">TR</option>
          </select>
        </li>
        <li>
          <button
            className="credits-button"
            onClick={() => setIsRegisterOpen(true)}
          >
            Register
          </button>
          <RegisterModal
            open={isRegisterOpen}
            handleClose={() => setIsRegisterOpen(false)}
            openLogin={() => setIsLoginOpen(true)}
          />
        </li>
        <li className="login-container">
          <TextField
            className="textField"
            label="Email"
            margin="dense"
            size="small"
          />
          <TextField
            className="textField"
            label="Password"
            type="password"
            margin="dense"
            size="small"
          />
        </li>
        <li>
          <button className="credits-button">Login</button>
          <LoginModal
            open={isLoginOpen}
            handleClose={() => setIsLoginOpen(false)}
            openRegister={() => setIsRegisterOpen(true)}
          />
        </li>
        <li>
          <button
            className="userButton"
            style={{ color: "white" }}
            onClick={handleMenuClick}
          >
            Tocoglum
          </button>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Kredi Yükle</MenuItem>
            <MenuItem onClick={handleClose}>Bilgileri Güncelle</MenuItem>
            <MenuItem onClick={handleClose}>Arkadaşlar</MenuItem>
            <MenuItem onClick={handleClose}>Log Out</MenuItem>
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
