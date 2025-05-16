import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import CoinPage from "./Pages/CoinPage";
import { CryptoContext } from "./CryptoContext";

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
      </div>
    </BrowserRouter>
  );
};

export default App;
