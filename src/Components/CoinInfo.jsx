import React, { useContext, useEffect, useState } from "react";
import { CryptoContext } from "../CryptoContext";
import axios from "axios";
import { HistoricalChart } from "../config/api";
import { buttonBaseClasses, CircularProgress } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  elements,
} from "chart.js";
import { chartDays } from "../config/data";
import SelectButton from "./SelectButton";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Title
);

const CoinInfo = ({ info }) => {
  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);
  const { currency } = useContext(CryptoContext);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(info.id, days, currency));
    setHistoricalData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
  }, [currency, days]);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-8 px-4">
      <div className="lg:w-[75%] lg:h-[70vh] w-full flex flex-col items-center lg:justify-center lg:items-center  rounded-2xl p-6 shadow-xl">
        {!historicalData ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={100}
            thickness={1}
          />
        ) : (
          <Line
            className="w-full h-full"
            data={{
              labels: historicalData.map((coin) => {
                const date = new Date(coin[0]);
                const hours = date.getHours();
                const minutes = date.getMinutes();
                const time =
                  hours > 12
                    ? `${hours - 12}:${minutes} PM`
                    : `${hours}:${minutes} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                  backgroundColor: "#eebcid",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
        )}
      </div>
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        {chartDays.map((day) => {
          return (
            <SelectButton
              key={day.value}
              onClick={() => setDays(day.value)}
              selected={day.value === days}
            >
              {day.label}
            </SelectButton>
          );
        })}
      </div>
    </div>
  );
};

export default CoinInfo;
