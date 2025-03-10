import { configureStore } from "@reduxjs/toolkit";
import cryptoSliceReducer from "../cryptoSlice/cryptoSlice";
import coinsSliceReducer from "../cryptoSlice/coinsSlice";
import chartSliceReducer from "../cryptoSlice/chartSlice";
import CurrencySliceReducer from "../cryptoSlice/CurrencySlice";

export const store = configureStore({
  reducer: {
    globalStore: cryptoSliceReducer,
    coins: coinsSliceReducer,
    market: chartSliceReducer,
    currencies: CurrencySliceReducer,
  },
});
