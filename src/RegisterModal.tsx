import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Google } from "@mui/icons-material";

interface RegisterModalProps {
  open: boolean;
  handleClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, handleClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    console.log("Registering:", { username, email, password });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={<Google />}
          fullWidth
          sx={{ mt: 2, bgcolor: "#DB4437", color: "white" }}
        >
          Sign Up with Google
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleRegister} variant="contained" color="primary">
          Sign Up
        </Button>
      </DialogActions>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Already have an account? Login
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
