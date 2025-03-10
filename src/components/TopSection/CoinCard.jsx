// component renders the coin name and it's mcap.
//  also renders the 24h percentage change.

// Library imports
import React from "react";
import { useSelector } from "react-redux";

// Files imports
import upArrow from "../../assets/caret-up.svg";
import downArrow from "../../assets/caret-down.svg";
import { compactNumbers } from "../../common/miscelleneous/compactNumbers";

const CoinCard = ({ coin }) => {
  const symbol = useSelector((state) => state.globalStore.symbol);

  return (
    <div className="flex justify-between items-center p-2 cursor-pointer duration-300">
      <div className="">
        <div className="font-bold pb-1 text-sm">{coin?.name}</div>
        <div className="font-semibold text-xs text-light-muted dark:text-dark-muted">
          Mkt.Cap: {symbol}
          {compactNumbers(coin?.market_cap)}
        </div>
      </div>
      <div className="col-span-1 flex flex-nowrap gap-x-1">
        <img
          src={coin?.price_change_percentage_24h > 0 ? upArrow : downArrow}
          alt="arrow"
        />
        <div
          className={`font-semibold  ${
            coin?.price_change_percentage_24h > 0
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {`${coin?.price_change_percentage_24h.toFixed(2)}%`}
        </div>
      </div>
    </div>
  );
};

export default CoinCard;
