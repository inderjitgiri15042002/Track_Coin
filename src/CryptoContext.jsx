import { createContext, useEffect, useState } from "react";
import React from "react";

export const CryptoContext = createContext();

const ThemeCryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    console.log(currency);
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  function handleChange(e) {
    setCurrency(e.target.value);
  }

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        handleChange,
        symbol,
        setSymbol,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default ThemeCryptoContext;
