// Component renders the dropdown for date range selection with a submit button

// Library imports
import React, { useState } from "react";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

// Files imports
import { fetchAsyncHistoricDataRange } from "../../common/cryptoSlice/chartSlice";
import {
  setFromDate,
  setToDate,
  setIsCustomRange,
} from "../../common/cryptoSlice/cryptoSlice";

const Calendar = () => {
  const dispatch = useDispatch();

  const fromDate = useSelector((state) => state.globalStore.fromDate);
  const toDate = useSelector((state) => state.globalStore.toDate);

  // converting yy-mm-dd into unix timestamp
  const from = Math.floor(new Date(fromDate).getTime() / 1000);
  const to = Math.floor(new Date(toDate).getTime() / 1000);

  // global states from the store
  const currency = useSelector((state) => state.globalStore.currency);
  const coinIDs = useSelector((state) => state.globalStore.coinIDs);

  // State to store whether the dropdown is visible or not
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const fetchData = () => {
    coinIDs.forEach((id) => {
      dispatch(
        fetchAsyncHistoricDataRange({
          id,
          currency: currency,
          from: from,
          to: to,
        })
      );
    });
  };

  const handleClick = () => {
    setIsSubmitted(true);
    fetchData();
    setDropdownVisible(false);
    dispatch(setIsCustomRange(true));
  };

  return (
    <div className="flex flex-col items-center relative  ">
      <button
        className={`relative font-semibold text-sm flex items-center
        justify-between shadow  px-2 py-1 md:px-4 md:py-2 rounded ${
          isSubmitted
            ? "bg-light-button-selected dark:bg-dark-button-selected hover:bg-light-button-selected-hover dark:hover:bg-dark-button-selected-hover"
            : "bg-light-button dark:bg-dark-button hover:bg-light-button-hover dark:hover:bg-dark-button-hover font-semibold"
        }`}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          className="bi bi-calendar"
          viewBox="0 0 16 16"
        >
          {" "}
          <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />{" "}
        </svg>
      </button>
      {/* Dropdown with input fields to select the date range */}
      <div
        className={` absolute bg-light-fill dark:bg-dark-fill border z-10 top-10 border-black dark:border-white ${
          dropdownVisible ? "max-h-60" : "hidden"
        } `}
      >
        <div className=" bg-light-fill dark:bg-dark-fill p-2 w-full overflow-y-auto border z-10 top-12 border-black dark:border-white shadow-xs">
          <div className="py-2">
            <label
              className="block text-sm text-light-base dark:text-dark-base"
              htmlFor="start-date"
            >
              Start Date
            </label>
            <input
              className=" py-2 px-4 block bg-light-muted dark:bg-dark-muted w-full overflow-y-auto border z-10 top-12 border-black dark:border-white leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              id="start-date"
              type="date"
              value={fromDate}
              onChange={(e) => dispatch(setFromDate(e.target.value))}
            />
          </div>
          <div className="py-2">
            <label
              className="block text-sm text-light-base dark:text-dark-base"
              htmlFor="end-date"
            >
              End Date
            </label>
            <input
              className="py-2 px-4 block bg-light-muted dark:bg-dark-muted w-full overflow-y-auto border z-10 top-12 border-black dark:border-white leading-5 rounded-md transition duration-150 ease-in-out sm:text-sm sm:leading-5"
              id="end-date"
              type="date"
              value={toDate}
              onChange={(e) => dispatch(setToDate(e.target.value))}
            />
          </div>
          <div className="py-2">
            <span className="block w-full rounded-md shadow-sm">
              <button
                type="button"
                className="w-full  py-2 px-4 border border-transparent  rounded-md bg-light-button-selected dark:bg-dark-button-selected hover:bg-light-button-selected-hover dark:hover:bg-dark-button-selected-hover hover:text-white font-semibold text-sm flex items-center
                justify-between shadow-lg transition duration-150 ease-in-out"
                onClick={handleClick}
              >
                Submit
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
