import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({ data, labels }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "$",
        data: data,
        backgroundColor: ["gray", "blue", "green"],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    aspectRatio: 2,
    plugins: {
      legend: {
        position: "right",
        fullWidth: false,
        labels: {
          color: "#5c5c5c",
          padding: 20,
          usePointStyle: true,
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
      datalabels: {
        align: "center",
        color: "#FFF",
        font: {
          size: 18,
          weight: "bold",
        },
        formatter: (value, context) => {
          return "$" + value;
        },
      },
    },
  };

  const plugins = {
    plugins: [ChartDataLabels],
  };

  return (
    <div className="pl-5 flex items-center justify-center pt-4 pb-4 w-[350px]">
      <Pie data={chartData} options={options} plugins={plugins}></Pie>
    </div>
  );
};

export default PieChart;
