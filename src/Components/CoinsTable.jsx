import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CryptoContext } from "../CryptoContext";
import {
  Container,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Typography,
  TableRow,
  LinearProgress,
  TableBody,
  Pagination,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currency } = useContext(CryptoContext);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
      );
      setCoins(res.data);
    } catch (error) {
      console.error("Failed to fetch trending coins", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const handleSearch = () => {
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <Container style={{ textAlign: "center" }}>
      <Typography variant="h4" style={{ margin: 18, fontFamily: "Montserrat" }}>
        Cryptocurrency Prices by Market Cap
      </Typography>
      <TextField
        label="Search For a Crypto Currency..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        fullWidth
        InputProps={{ style: { color: "white" } }}
        InputLabelProps={{ style: { color: "white" } }}
        sx={{
          "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: "white" },
            "&:hover fieldset": { borderColor: "#ccc" },
            "&.Mui-focused fieldset": { borderColor: "white" },
          },
          marginBottom: 3,
        }}
      />
      <TableContainer>
        {loading ? (
          <LinearProgress style={{ background: "gold" }} />
        ) : (
          <Table>
            <TableHead>
              <TableRow style={{ backgroundColor: "#eebc1d" }}>
                {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                  <TableCell
                    key={head}
                    align={head === "Coin" ? "left" : "right"}
                    style={{
                      color: "black",
                      fontWeight: "700",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                      sx={{
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "#212529",
                        },
                        fontFamily: "Montserrat",
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 15,
                          }}
                        >
                          <img
                            src={row.image}
                            alt={row.name}
                            className="h-25"
                          />
                          <div>
                            <span
                              style={{
                                color: "white",
                                textTransform: "uppercase",
                                fontWeight: 500,
                                fontSize: "1.2rem",
                              }}
                            >
                              {row.symbol}
                            </span>
                            <br />
                            <span style={{ color: "#555" }}>{row.name}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="right" style={{ color: "white" }}>
                        {currency === "USD" ? "$" : "₹"}
                        {row.current_price.toLocaleString()}
                      </TableCell>
                      <TableCell
                        align="right"
                        className="text-white"
                        style={{
                          color: profit ? "rgb(14, 203, 129)" : "red",
                          fontWeight: 500,
                        }}
                      >
                        {profit && "+"}
                        {row.price_change_percentage_24h?.toFixed(2)}%
                      </TableCell>
                      <TableCell
                        align="right"
                        className="text-white"
                        style={{ color: "white" }}
                      >
                        {currency === "usd" ? "$" : "₹"}
                        {row.market_cap.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        )}
      </TableContainer>
      <div style={{ margin: "1rem " }}>
        <Pagination
          count={Math.ceil(handleSearch().length / 10)}
          page={page}
          onChange={(_, value) => setPage(value)}
          color="primary"
          style={{ padding: "1rem 0rem" }}
          sx={{
            display: "flex",
            justifyContent: "center",

            "& .MuiPaginationItem-root": {
              color: "white",
              fontWeight: "600",
              fontFamily: "Montserrat",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#fcab10",
              color: "black",
              fontWeight: "700",
            },
            "& .MuiPaginationItem-root:hover": {
              backgroundColor: "#eebc1d",
              color: "black",
            },
          }}
        />
      </div>
    </Container>
  );
};

export default CoinsTable;
