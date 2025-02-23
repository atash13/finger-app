import React from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="login-modal-title"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          textAlign: "center",
        }}
      >
        <Typography id="login-modal-title" variant="h6" sx={{ mb: 2 }}>
          Login
        </Typography>
        <TextField fullWidth label="Email" margin="dense" />
        <TextField fullWidth label="Password" type="password" margin="dense" />
        <Button fullWidth variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
        <Button fullWidth variant="outlined" sx={{ mt: 1 }}>
          Sign in with Google
        </Button>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <span style={{ color: "blue", cursor: "pointer" }}>Register</span>
        </Typography>
      </Box>
    </Modal>
  );
};

export default LoginModal;
