import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../CryptoContext";
import axios from "axios";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography, Box, Button } from "@mui/material";
import parse from "html-react-parser";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currency, symbol, watchlist, user } = useContext(CryptoContext);

  const inWatchlist = watchlist.includes(coin?.id);

  const fetchCoin = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      setCoin(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  const numberWithCommas = (x) =>
    x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleWatchlist = async () => {
    if (!user) {
      toast.error("You need to be logged in to manage watchlist");
      return;
    }

    const coinRef = doc(db, "watchlist", user.uid);

    try {
      let updatedCoins;
      if (inWatchlist) {
        updatedCoins = watchlist.filter((w) => w !== coin.id);
        await setDoc(coinRef, { coins: updatedCoins });
        toast.success("Removed from Watchlist");
      } else {
        updatedCoins = [...watchlist, coin.id];
        await setDoc(coinRef, { coins: updatedCoins });
        toast.success("Added to Watchlist");
      }
    } catch (error) {
      toast.error("Error updating watchlist");
      console.error(error);
    }
  };

  if (loading || !coin)
    return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
          backgroundColor: "black",
          padding: 3,
          gap: 4,
          minHeight: "90vh",
        }}
      >
        {/* Left */}
        <Box
          sx={{
            width: { xs: "100%", md: "30%" },
            borderRight: { xs: "none", md: "2px solid gray" },
            paddingRight: { xs: 0, md: 3 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: { xs: 4, md: 0 },
          }}
        >
          <img
            src={coin?.image.large}
            alt={coin?.name}
            height="200"
            style={{ marginBottom: 20 }}
          />

          <Typography
            variant="h3"
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              marginBottom: 2,
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            {coin?.name}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Montserrat",
              padding: "0 25px 15px 25px",
              textAlign: "justify",
              maxWidth: 500,
              color: "white",
            }}
          >
            {coin?.description?.en
              ? parse(coin.description.en.split(". ")[0] + ".")
              : ""}
          </Typography>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 3,
              marginTop: 2,
              alignItems: { xs: "center", md: "flex-start" },
              color: "white",
            }}
          >
            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Rank:
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {coin?.market_cap_rank}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Current Price:
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.current_price[currency.toLowerCase()]
                )}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Market Cap:
              </Typography>
              <Typography variant="h5" sx={{ fontFamily: "Montserrat" }}>
                {symbol}{" "}
                {numberWithCommas(
                  coin?.market_data.market_cap[currency.toLowerCase()]
                )}
              </Typography>
            </Box>

            {user && (
              <Button
                variant="contained"
                onClick={handleWatchlist}
                sx={{
                  width: "100%",
                  height: 45,
                  backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D",
                  "&:hover": {
                    backgroundColor: inWatchlist ? "#cc0000" : "#d4af37",
                  },
                  marginTop: 2,
                }}
              >
                {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
              </Button>
            )}
          </Box>
        </Box>

        {/* Right */}
        <Box sx={{ flex: 1 }}>
          <CoinInfo coin={coin} />
        </Box>
      </Box>

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default CoinPage;
