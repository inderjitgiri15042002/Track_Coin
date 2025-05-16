import { createContext, useEffect, useState } from "react";
import React from "react";

export const CryptoContext = createContext();

const ThemeCryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (currency === "INR") setCurrency("₹");
    else if (currency === "$") setSymbol("$");
  }, []);

  function handleChange(e) {
    setValue(e.target.value);
  }

  return (
    <CryptoContext.Provider
      value={{
        currency,
        setCurrency,
        handleChange,
        dark,
        setDark,
        symbol,
        setSymbol,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default ThemeCryptoContext;
