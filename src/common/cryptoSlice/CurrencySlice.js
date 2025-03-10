import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../APIs/Api";

// fetching list of supported currencies
export const fetchAsyncCurrencies = createAsyncThunk(
  "coins/fetchAsyncCurrencies",
  async () => {
    const response = await Api.get(`simple/supported_vs_currencies`);
    return response.data;
  }
);

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCurrencies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAsyncCurrencies.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
      })
      .addCase(fetchAsyncCurrencies.rejected, (state, { error }) => {
        state.status = error;
      });
  },
});

export const {} = currencySlice.actions;
export default currencySlice.reducer;
