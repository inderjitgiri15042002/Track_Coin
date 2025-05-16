import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CryptoContext } from "../../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link, NavLink } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import Spinner from "../Spinner";

function Carousel() {
  const { currency, symbol } = useContext(CryptoContext);
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState([]);

  const fetchTrendingCoins = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets`,
        {
          params: {
            vs_currency: currency,
            order: "gecko_desc",
            per_page: 10,
            page: 1,
            sparkline: false,
            price_change_percentage: "24h",
          },
        }
      );
      setTrending(res.data);
    } catch (error) {
      console.error("Failed to fetch trending coins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  function numberWithCommas(x) {
    if (!x && x !== 0) return ""; // handle undefined/null
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  if (loading) {
    return <Spinner />;
  }

  const responsive = {
    0: { items: 2 },
    512: { items: 4 },
  };

  const items = trending.map((coin) => {
    const profit = coin.price_change_percentage_24h >= 0;

    return (
      <NavLink to={`/coins/${coin.id}`} key={coin.id}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: 2,
          }}
        >
          <img
            src={coin.image}
            alt={coin.name}
            style={{ height: 80, marginBottom: 10 }}
          />
          <Box sx={{ display: "flex", gap: 1 }}>
            <Typography variant="subtitle2" sx={{ textTransform: "uppercase" }}>
              {coin.symbol}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ color: profit ? "green" : "red" }}
            >
              {profit && "+"}
              {coin.price_change_percentage_24h.toFixed(2)}%
            </Typography>
          </Box>
          <Typography variant="body2">
            {symbol}
            {numberWithCommas(coin.current_price.toLocaleString())}
          </Typography>
        </Container>
      </NavLink>
    );
  });

  return (
    <div
      className="h-[50%] flex items-center justify-center w-full py-4"
      style={{ marginTop: "2.5rem" }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </div>
  );
}

export default Carousel;
