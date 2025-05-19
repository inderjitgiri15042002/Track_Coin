import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import Login from "./Login";
import Signup from "./Signup";
import GoogleButton from "react-google-button";
import { auth } from "../Firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#1e1e2f",

  boxShadow: 24,
  p: 2,
  outline: "none",
};

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);

    const user = result.user;

    toast.success(`Welcome ${user.displayName || "user"}!`);
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    toast.error("Google Sign-In failed. Please try again.");
  }
};

export default function AuthModel() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          width: 85,
          height: 40,
          ml: 2,
          backgroundColor: "#eebc1d",
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#d4a017",
          },
        }}
      >
        Log In
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AppBar
            position="static"
            sx={{
              background: "transparent",
              boxShadow: "none",
              mb: 2,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="fullWidth"
              textColor="inherit"
              indicatorColor="secondary"
              sx={{
                borderRadius: 2,
                backgroundColor: "#2c2c3e",
                "& .MuiTab-root": {
                  color: "white",
                  fontWeight: "bold",
                },
              }}
            >
              <Tab label="Login" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          {value === 0 && <Login handleClose={handleClose} />}
          {value === 1 && <Signup handleClose={handleClose} />}
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
            }}
          >
            <span
              style={{
                textAlign: "center",
                color: "white",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              OR
            </span>
            <GoogleButton
              style={{ width: "100%", outline: "none" }}
              onClick={signInWithGoogle}
            />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
