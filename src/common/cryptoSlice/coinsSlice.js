import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../APIs/Api";

// Fetching crypto coins
export const fetchAsyncCoins = createAsyncThunk(
  "coins/fetchAsyncCoins",
  async (term) => {
    const response = await Api.get(
      `coins/markets?vs_currency=${term}&order=market_cap_desc&per_page=10&page=1&sparkline=false`
    );
    return response.data;
  }
);

const initialState = {
  coins: [],
};

// coin slice section

const coinsSlice = createSlice({
  name: "coins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCoins.pending, (state, action) => {})
      .addCase(fetchAsyncCoins.fulfilled, (state, { payload }) => {
        return { ...state, coins: payload };
      })
      .addCase(fetchAsyncCoins.rejected, (state, action) => {
        console.log("Rejected");
      });
  },
});

export const getAllCoins = (state) => state.coins.coins;
export default coinsSlice.reducer;
