import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import React from "react";
import { auth, db } from "./Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import axios from "axios";
import { CoinList } from "./config/api";
import axios from "axios";

export const CryptoContext = createContext();

const ThemeCryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("₹");
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      const unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));

    setCoins(data);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

    fetchCoins();
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
        user,
        setUser,
        watchlist,
        coins,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};

export default ThemeCryptoContext;
