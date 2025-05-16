import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Select,
  MenuItem,
  Container,
  createTheme,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { CryptoContext } from "../CryptoContext";

export default function Header() {
  const { currency, setCurrency, dark, setDark, symbol, setSymbol } =
    React.useContext(CryptoContext);

  const navigate = useNavigate();

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: { main: "#000" },
      background: { default: "#fff", paper: "#f0f0f0" },
      text: { primary: "#000", secondary: "#555" },
    },
    typography: { fontFamily: "'Montserrat', sans-serif" },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fff" },
      background: { default: "#121212", paper: "#1e1e1e" },
      text: { primary: "#fff", secondary: "#bbb" },
    },
    typography: { fontFamily: "'Montserrat', sans-serif" },
  });

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#1e1e1e",
          boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
          borderBottom: "1px solid #333",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              sx={{
                flexGrow: 1,
                color: "#fdd835",
                cursor: "pointer",
                letterSpacing: "0.05rem",
                transition: "color 0.3s",
                "&:hover": {
                  color: "#fff176",
                },
              }}
            >
              Track Coin
            </Typography>

            <Select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              variant="outlined"
              sx={{
                color: "#fff",
                backgroundColor: "#2e2e2e",
                borderRadius: "8px",
                border: "1px solid #555",
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  backgroundColor: "#3e3e3e",
                },
                width: 120,
                height: 40,
              }}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
            <Button
              onClick={() => setDark(!dark)}
              variant="outlined"
              sx={{
                marginLeft: "4rem",
                border: `1px solid ${dark ? "white" : "white"}`,
                transition: "border-color 0.3s ease",
                color: dark ? "white" : "white",
              }}
            >
              {dark ? "Light Mode" : "Dark Mode"}
            </Button>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
