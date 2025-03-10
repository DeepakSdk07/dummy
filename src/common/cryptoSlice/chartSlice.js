import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from "../APIs/Api";

// Fetching coins historical data

export const fetchAsyncHistoricData = createAsyncThunk(
  "market/fetchAsyncHistoricData",
  async (params, thunkAPI) => {
    const { id, currency, days } = params;
    try {
      const response = await Api.get(`coins/${id}/market_chart`, {
        params: {
          vs_currency: currency,
          days,
        },
      });
      return response.data.market_caps;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchAsyncHistoricDataRange = createAsyncThunk(
  "market/fetchAsyncHistoricDataRange",
  async (params, thunkAPI) => {
    const { id, currency, from, to } = params;
    try {
      const response = await Api.get(`coins/${id}/market_chart/range`, {
        params: {
          vs_currency: currency,
          from,
          to,
        },
      });
      return response.data.market_caps;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Chart data slice

const chartSlice = createSlice({
  name: "market",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {
    clearData: (state) => {
      return {
        ...state,
        data: {},
        error: null,
        loading: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncHistoricData.pending, (state, action) => {
        state.loading = true;
        const { id } = action.meta;
      })
      .addCase(fetchAsyncHistoricData.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        state.data[id] = action.payload;

        state.loading = false;
      })
      .addCase(fetchAsyncHistoricData.rejected, (state, action) => {
        const { id } = action.meta;

        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAsyncHistoricDataRange.pending, (state, action) => {
        state.loading = true;
        const { id } = action.meta;
      })
      .addCase(fetchAsyncHistoricDataRange.fulfilled, (state, action) => {
        const { id } = action.meta.arg;
        state.data[id] = action.payload;

        state.loading = false;
      })
      .addCase(fetchAsyncHistoricDataRange.rejected, (state, action) => {
        const { id } = action.meta;

        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearData } = chartSlice.actions;

export default chartSlice.reducer;
