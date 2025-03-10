// component renders a dropdown selector with list of supported currencies

// Library imports
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// File imports
import { setCurrency, setSymbol } from "../../common/cryptoSlice/cryptoSlice";
import { fetchAsyncCurrencies } from "../../common/cryptoSlice/CurrencySlice";
import { convertCurrency } from "../../common/miscelleneous/currencyToSymbol";

const Currency = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  const currencies = useSelector((state) => state.currencies.data);
  const error = useSelector((state) => state.currencies.error);
  const loading = useSelector((state) => state.currencies.loading);
  const [isOpen, setIsOpen] = useState(false);

  // setting default currency and symbol in a global state
  const currency = useSelector((state) => state.globalStore.currency);

  const fetchCurrencies = () => {
    dispatch(fetchAsyncCurrencies());
  };
  useEffect(() => {
    fetchCurrencies();
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center animate-pulse bg-white dark:bg-dark-button h-full">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div ref={ref} className="relative flex items-center justify-center">
      <button
        className=" min-w-full h-[3.5rem] flex items-center justify-between  bg-white dark:bg-dark-button font-bold  hover:bg-slate-200 dark:hover:bg-dark-button-hover shadow-lg"
        onClick={() => setIsOpen(!isOpen)}>
        <p className="text-center">{currency.toUpperCase()}</p>
        <span>
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`${isOpen ? "-rotate-180" : ""}`}>
            <path
              d="M6.1018 8C5.02785 8 4.45387 9.2649 5.16108 10.0731L10.6829 16.3838C11.3801 17.1806 12.6197 17.1806 13.3169 16.3838L18.8388 10.0731C19.5459 9.2649 18.972 8 17.898 8H6.1018Z"
              fill="#000"
            />
          </svg>
        </span>
      </button>

      <div
        className={`absolute top-full max-h-60 overflow-y-auto border-2 border-black min-w-full w-max bg-light-fill dark:bg-dark-fill z-10 mt-1 rounded-lg shadow-xl ${
          isOpen ? "block" : "hidden"
        }`}>
        <ul className="">
          {currencies.map((currency) => (
            <li
              key={currency}
              className={`p-4 cursor-pointer hover:bg-light-list-hover dark:hover:bg-dark-list-hover font-bold  hover:text-white rounded-lg `}
              onClick={() => {
                dispatch(setCurrency(currency));
                dispatch(setSymbol(convertCurrency(currency)));
                setIsOpen(false);
              }}>
              {currency.toUpperCase()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Currency;
