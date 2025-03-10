// Component renders the list the coins sorted by marketcap

// Library imports
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

// Files imports
import { fetchAsyncCoins } from "../../common/cryptoSlice/coinsSlice";

// Component imports
import CoinList from "./CoinList";

const TopCoins = ({ currency }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAsyncCoins(currency));
    setLoading(false);
  }, [dispatch, currency]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <div className="">
      <CoinList />
    </div>
  );
};

export default TopCoins;
