import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import ThemeCryptoContext from "./CryptoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeCryptoContext>
      <App />
    </ThemeCryptoContext>
  </StrictMode>
);
