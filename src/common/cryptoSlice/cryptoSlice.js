import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currency: "USD",
  symbol: "$",
  price_s: "0",
  price_b: "0",
  price_symbol: "",
  days: 365,
  chartType: "Line chart",
  selectedCoins: [],
  coinIDs: [],
  toDate: "",
  fromDate: "",
  isCustomRange: false,
};

export const cryptoSlice = createSlice({
  name: "globalStore",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currency = action.payload;
    },
    setSymbol: (state, action) => {
      state.symbol = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setPrice_s: (state, action) => {
      state.price_s = action.payload;
    },
    setPrice_b: (state, action) => {
      state.price_b = action.payload;
    },
    setPrice_symbol: (state, action) => {
      state.price_symbol = action.payload;
    },
    setDays: (state, action) => {
      state.days = action.payload;
    },
    setChartType: (state, action) => {
      state.chartType = action.payload;
    },
    setSelectedCoins: (state, action) => {
      state.selectedCoins = action.payload;
    },
    setCoinIDs: (state, action) => {
      state.coinIDs = action.payload;
    },
    setToDate: (state, action) => {
      state.toDate = action.payload;
    },
    setFromDate: (state, action) => {
      state.fromDate = action.payload;
    },
    setIsCustomRange: (state, action) => {
      state.isCustomRange = action.payload;
    },
  },
});

export const {
  setCurrency,
  setSymbol,
  setPrice_b,
  setPrice_s,
  setPrice_symbol,
  setDays,
  setChartType,
  setSelectedCoins,
  setCoinIDs,
  setToDate,
  setFromDate,
  setIsCustomRange,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
