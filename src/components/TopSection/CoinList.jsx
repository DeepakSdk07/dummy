import React from "react";
import { useSelector } from "react-redux";
import { getAllCoins } from "../../common/cryptoSlice/coinsSlice";
import CoinCard from "./CoinCard";

const CoinList = () => {
  const coins = useSelector(getAllCoins);

  return (
    <div className="pt-4 px-2  overflow-hidden">
      <div className="text-l mb-4 text-center font-semibold">
        Cryptocurrencies by market cap
      </div>
      <div className="">
        {coins?.slice(0, 10).map((coin) => (
          <CoinCard coin={coin} key={coin.id} />
        ))}
      </div>
    </div>
  );
};

export default CoinList;
