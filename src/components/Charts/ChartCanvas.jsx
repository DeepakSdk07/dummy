import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

const ChartCanvas = () => {
  const [selectedCrypto, setSelectedCrypto] = useState("bitcoin"); // Default crypto
  const [selectedCurrency, setSelectedCurrency] = useState("usd"); // Default currency
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: `Price (${selectedCurrency.toUpperCase()})`,
        data: [],
        borderColor: "#ff7300",
        backgroundColor: "rgba(255, 115, 0, 0.2)",
        fill: true,
      },
    ],
  });

  const chartType = useSelector((state) => state.globalStore.chartType);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=${selectedCurrency}&days=2`
        );

        const formattedData = {
          labels: response.data.prices.map((price) =>
            new Date(price[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          ),
          datasets: [
            {
              label: `Price (${selectedCurrency.toUpperCase()})`,
              data: response.data.prices.map((price) => price[1]),
              borderColor: "#ff7300",
              backgroundColor: "rgba(255, 115, 0, 0.2)",
              fill: true,
            },
          ],
        };

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
    const interval = setInterval(fetchChartData, 60000); // Update every 1 minute

    return () => clearInterval(interval);
  }, [selectedCrypto, selectedCurrency]); // ✅ Re-fetch data when crypto or currency changes

  // Chart Options (removes point labels)
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true, // Show/hide legend
      },
      tooltip: {
        enabled: true, // Show tooltips on hover
      },
      datalabels: {
        display: false, // ❌ Disables number labels on chart
      },
    },
    elements: {
      point: {
        radius: 0, // Remove data point labels
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "99%", height: "400px", marginTop: "1rem" }}>
       {/* Dropdown to select cryptocurrency */}
      <select onChange={(e) => setSelectedCrypto(e.target.value)}
      value={selectedCrypto}
      style={{
        border: "2px solid black",
        borderRadius: "5px",
        padding: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "gray",
      }}
      >
        <option value="bitcoin">Bitcoin</option>
        <option value="ethereum">Ethereum</option>
        <option value="dogecoin">Dogecoin</option>
        <option value="tether">Tether</option>
        <option value="binancecoin">BNB</option>
        <option value="ripple">XRP</option>
        <option value="solana">Solana</option>
        <option value="cardano">Cardano</option>
        <option value="usd-coin">USDC</option>
        <option value="staked-ether">Lido Staked Ether</option>
      </select>

      {/* Dropdown to select currency */}
      <select onChange={(e) => setSelectedCurrency(e.target.value)}
      value={selectedCurrency}
      style={{
        border: "2px solid black",
        borderRadius: "5px",
        padding: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        backgroundColor: "gray",
        marginLeft: "10px",
      }}
      >
        <option value="usd">USD</option>
        <option value="inr">INR</option>
        <option value="eur">EUR</option>
        <option value="gbp">GBP</option>
        <option value="aud">AUD</option>
        <option value="jpy">JPY</option>
      </select>

      {/* Render Chart with Options */}
      {chartType === "Bar Chart" ? (
        <Bar data={chartData} options={chartOptions} />
      ) : (
        <Line data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default ChartCanvas;
