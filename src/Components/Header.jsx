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
import AuthModel from "../Authentication/AuthModel";
import UserSidebar from "../Authentication/UserSidebar";

export default function Header() {
  const { currency, setCurrency, symbol, setSymbol, user, setUser } =
    React.useContext(CryptoContext);

  const navigate = useNavigate();

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
    <ThemeProvider theme={darkTheme}>
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
            {user ? <UserSidebar /> : <AuthModel />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
