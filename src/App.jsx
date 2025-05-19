import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import CoinPage from "./Pages/CoinPage";
import { CryptoContext } from "./CryptoContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { dark } = useContext(CryptoContext);

  return (
    <BrowserRouter>
      <div className={`h-[100vh] ${"bg-black text-white"} `}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins/:id" element={<CoinPage />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
    </BrowserRouter>
  );
};

export default App;
