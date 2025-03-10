// Component renders the dropdown from the list of coins with checkboxes. User can select a maximum of two coins else the dropdown get grayed out.

// Library imports
import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Files imports
import {
  setCoinIDs,
  setSelectedCoins,
} from "../../common/cryptoSlice/cryptoSlice";

const MultiCoinSelectionBtn = ({ coins }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const ref = useRef();

  const dispatch = useDispatch();

  const selectedCoins = useSelector((state) => state.globalStore.selectedCoins);

  const coinID = useSelector((state) => state.globalStore.coinIDs);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(
      setSelectedCoins(
        coins.filter((coin) => coin.name === "Bitcoin").map((coin) => coin.name)
      )
    );

    dispatch(
      setCoinIDs(
        coins.filter((coin) => coin.name === "Bitcoin").map((coin) => coin.id)
      )
    );
  }, [coins]);

  const filteredOptions = coins.filter((coin) =>
    coin?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCheckboxChange = (option, id) => {
    if (selectedCoins.includes(option)) {
      dispatch(
        setSelectedCoins(
          selectedCoins.filter((selectedOption) => selectedOption !== option)
        )
      );
      dispatch(setCoinIDs(coinID.filter((selectedID) => selectedID !== id)));
    } else if (selectedCoins.length < 2) {
      dispatch(setSelectedCoins([...selectedCoins, option]));
      dispatch(setCoinIDs([...coinID, id]));
    }
  };

  return (
    <div ref={ref} className={"relative"}>
      {isOpen && (
        <div className="absolute h-60 overflow-auto border border-black dark:border-white left-0 z-30 mt-2 py-2 w-full flex flex-col rounded-md bg-light-fill dark:bg-dark-fill shadow-xl">
          <input
            className={`bg-light-fill dark:bg-dark-fill p-2 outline-none border-b border-black dark:border-white `}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search coins..."
          />

          {filteredOptions.map((coin) => (
            <label
              className={`w-full py-2 text-sm leading-5 text-left focus:outline-none hover:bg-light-list-hover transition duration-150 ease-in-out ${
                selectedCoins.includes(coin?.name) || selectedCoins.length >= 2
                  ? "text-gray-500 cursor-not-allowed"
                  : ""
              }`}
              key={coin?.id}
            >
              <input
                className="mx-4 text-sm"
                type="checkbox"
                disabled={
                  selectedCoins.length >= 2 &&
                  !selectedCoins.includes(coin?.name)
                }
                checked={selectedCoins.includes(coin?.name)}
                onChange={() => handleCheckboxChange(coin?.name, coin?.id)}
                onClick={() => {
                  setSearchTerm("");
                }}
              />
              {coin?.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiCoinSelectionBtn;
