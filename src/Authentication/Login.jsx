import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      setSuccess("Logged in successfully!");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        handleClose();
      }, 1000);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError(error.message);
      }
    }

    // Simulate login logic
    setSuccess("Logged in successfully!");
    setEmail("");
    setPassword("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 4,
        color: "white",
      }}
    >
      <Typography variant="h6" textAlign="center" color="#eebc1d">
        Log into your account
      </Typography>

      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ input: { color: "white" }, label: { color: "#bbb" } }}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ input: { color: "white" }, label: { color: "#bbb" } }}
      />

      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mt: 1 }}>
          {success}
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        sx={{
          backgroundColor: "#eebc1d",
          color: "black",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#d4a017",
          },
        }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
