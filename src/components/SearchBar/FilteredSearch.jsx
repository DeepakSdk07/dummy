// Library imports
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncHistoricData } from "../../common/cryptoSlice/chartSlice";

const FilteredSearch = ({ coin, setIsOpen, setCoin }) => {
  const symbol = useSelector((state) => state.globalStore.symbol); // Currency symbol (e.g., USD)
  const days = useSelector((state) => state.globalStore.days); // Time range for fetching data
  const dispatch = useDispatch();

  const handleSelect = (e) => {
    e.preventDefault();
    setIsOpen(false);
    setCoin(coin.name); // Set the search input field with the selected coin

    dispatch(
      fetchAsyncHistoricData({
        id: coin.id, // Pass only the `id`, not the whole object
        currency: symbol, // Use `symbol` from Redux state
        days: days, // Time range for the data
      })
    );
  };

  return (
    <div
      className="cursor-pointer py-4 px-4 hover:bg-light-list-hover dark:hover:bg-dark-list-hover rounded-lg font-semibold flex justify-between items-center"
      onClick={handleSelect} // Ensure correct event handling
    >
      <img src={coin.image} alt={coin.name} width="40px" className="mr-2" />
      <div>{coin.name}</div>
      <div>
        {symbol}
        {coin.current_price}
      </div>
    </div>
  );
};

export default FilteredSearch;
