import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CryptoContext } from "../CryptoContext";
import axios from "axios";
import CoinInfo from "../Components/CoinInfo";
import { LinearProgress, Typography, Box, useTheme } from "@mui/material";
import parse from "html-react-parser";

const CoinPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);

  const { currency, symbol } = useContext(CryptoContext);
  const theme = useTheme();

  const fetchCoin = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}`
      );
      const data = await res.data;
      setCoin(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoin();
  }, [id]);

  if (!coin) return <LinearProgress sx={{ backgroundColor: "gold" }} />;

  function numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, "$1,$2");
    return x;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
        backgroundColor: "black",
        padding: 3,
        gap: 4,
      }}
    >
      {/* Left Column */}
      <Box
        sx={{
          width: { xs: "100%", md: "30%" },
          borderRight: { xs: "none", md: "2px solid gray" },
          paddingRight: { xs: 0, md: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: { xs: "center", md: "justify-center" },
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
            textAlign: { xs: "center", md: "center" },
            width: "100%",
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
            width: "100%",
            maxWidth: 500,
          }}
        >
          {coin?.description?.en &&
            parse(coin.description.en.split(". ")[0] + ".")}
        </Typography>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            marginTop: 2,
            alignItems: { xs: "center", md: "flex-start" },
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
              M
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Right Column (Chart) */}
      <Box sx={{ flex: 1, width: { xs: "100%", md: "70%" } }}>
        <CoinInfo info={coin} />
      </Box>
    </Box>
  );
};

export default CoinPage;
