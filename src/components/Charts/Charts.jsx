// component renders the charts based on selected coins from a drop and type of chart selected. It fetches the data based on date and custom date ranges selected from a calendar component.

// Library imports
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// Files imports
import {
  clearData,
  fetchAsyncHistoricData,
} from "../../common/cryptoSlice/chartSlice";
import { getAllCoins } from "../../common/cryptoSlice/coinsSlice";
import { compactNumbers } from "../../common/miscelleneous/compactNumbers";
import { filteredData } from "../../common/miscelleneous/filterData";
import { getRandomColor } from "../../common/miscelleneous/randomColor";

// component imports
import ButtonGroup from "./ButtonGroup";
import ChartCanvas from "./ChartCanvas";
import ChartType from "./ChartType";
import MultiCoinSelectionBtn from "./MultiCoinSelectionBtn";
import { chartDays } from "./days";

const Charts = () => {
  const dispatch = useDispatch();
  const [days, setDays] = useState(1);
  const [selectedValue, setSelectedValue] = useState(null);
  const currency = useSelector((state) => state.globalStore.currency);
  const symbol = useSelector((state) => state.globalStore.symbol);
  const isCustomRange = useSelector((state) => state.globalStore.isCustomRange);

  const coinIDs = useSelector((state) => state.globalStore.coinIDs);

  const marketCapData = useSelector((state) => state.market.data);

  const loading = useSelector((state) => state.market.loading);

  const fetchData = () => {
    coinIDs.forEach((id) => {
      dispatch(fetchAsyncHistoricData({ id, currency: currency, days: days }));
    });
  };

  useEffect(() => {
    if (!isCustomRange) {
      // Dispatch the action to fetch marketcap
      fetchData();
      dispatch(clearData());
    }
  }, [currency, coinIDs, days]);

  useEffect(() => {}, []);

  const coins = useSelector(getAllCoins);

  const cdata = filteredData(marketCapData[coinIDs[0]]);

  if (loading) {
    return <div className="h-[260px] text-center p-4">Loading...</div>;
  }

  // Labels: converts the data into proper dates format
  // also returns time in hours if 1 day is selected else return days with dates
  const labels = cdata.map((data) => {
    let date = new Date(data[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12} PM`
        : `${date.getHours()} AM`;
    return days === 1
      ? time
      : date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  });

  // maps the datasets based on selected coins to display charts in a single canvas
  const datasets = Object.keys(marketCapData).map((id) => ({
    label: id,
    data: filteredData(marketCapData[id]).map((datum) => datum[1]),
    fill: false,
    borderColor: getRandomColor(),
    tension: 0.1,
    pointColor: getRandomColor(),
    backgroundColor: getRandomColor(),
    hitRadius: 20,
    hoverRadius: 5,
  }));

  const data = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    interaction: {
      intersect: false,
      mode: "index",
    },
    aspectRatio: 2,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          // Include a selected currency symbol in the ticks
          callback: function (value, index, ticks) {
            return `${symbol}` + compactNumbers(value);
          },
          maxTicksLimit: 7,
          grid: {
            borderWidth: 2,
            borderDash: [5, 5],
            borderDashOffset: 2,
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            // formats the tooltip to show values of both charts in one tooltip
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += `${symbol}` + compactNumbers(context.parsed.y);
            }
            return label;
          },
        },
      },
      title: {
        display: true,
        text: "Charts Canvas",
      },
      datalabels: {
        display: false,
      },
      legend: {
        position: "top",
        fullWidth: false,
        labels: {
          color: "#5C5C5C",
          usePointStyle: true,
          font: {
            size: 12,
            weight: "bold",
          },
        },
      },
    },
  };

  return (
    <Fragment>
      {marketCapData && (
        <div className="bg-light-fill dark:bg-dark-fill rounded-lg">
          <div className=" flex justify-around pt-4 flex-wrap gap-1">
            <ButtonGroup
              chartDays={chartDays}
              setDays={setDays}
              setSelectedValue={setSelectedValue}
              selectedValue={selectedValue}
            />

            <div className=" flex gap-2 items-center justify-center flex-wrap">
              <MultiCoinSelectionBtn coins={coins} />
              <ChartType />
            </div>
          </div>

          <ChartCanvas data={data} options={options} />
        </div>
      )}
    </Fragment>
  );
};

export default Charts;
