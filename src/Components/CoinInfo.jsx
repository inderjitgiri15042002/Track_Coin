import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CircularProgress,
  ThemeProvider,
  createTheme,
  Box,
} from "@mui/material";
import React from "react";
import SelectButton from "./SelectButton";
import { chartDays } from "../config/data";
import { CryptoContext } from "../CryptoContext";
import { HistoricalChart } from "../config/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(CryptoContext);

  const fetchHistoricData = async () => {
    if (!coin) return;
    try {
      const url = HistoricalChart(coin.id, days, currency);
      const { data } = await axios.get(url);
      setHistoricData(data.prices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (coin) fetchHistoricData();
  }, [coin, days, currency]);

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: { main: "#fff" },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          width: { xs: "100%", md: "75%", lg: "100%" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: { xs: 0, md: 3 },
          p: { xs: 2, md: 5 },
          pt: { xs: 0, md: 5 },
        }}
      >
        {!historicData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  let date = new Date(coin[0]);
                  let minutes = date.getMinutes();
                  minutes = minutes < 10 ? `0${minutes}` : minutes;
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${minutes} PM`
                      : `${date.getHours()}:${minutes} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: `Price (Past ${days} Days) in ${currency}`,
                    borderColor: "#EEBC1D",
                    fill: false,
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
                scales: {
                  x: {
                    ticks: { color: "#fff" },
                    grid: { color: "rgba(255,255,255,0.1)" },
                  },
                  y: {
                    ticks: { color: "#fff" },
                    grid: { color: "rgba(255,255,255,0.1)" },
                  },
                },
                plugins: {
                  legend: { labels: { color: "#fff" } },
                },
              }}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                width: "100%",
                mt: 3,
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => setDays(day.value)}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </Box>
          </>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CoinInfo;
