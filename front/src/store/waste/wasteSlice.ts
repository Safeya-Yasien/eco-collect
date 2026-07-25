import { createSlice } from "@reduxjs/toolkit";
import { actGetWasteTypes } from "./act/actGetWasteTypes";
import { IWastePrice, IWasteTypes, TLoading } from "@/types";
import { actGetWastePrices } from "./act/actGetWastePrices";
import { actUpdateWastePrices } from "./act/actUpdateWastePrices";

interface IWasteState {
  wasteTypes: IWasteTypes;
  wastePrices: IWastePrice[];
  loading: TLoading;
  error: string | null;
}

const initialState: IWasteState = {
  wasteTypes: {},
  wastePrices: [],
  loading: "idle",
  error: null,
};

const wasteSlice = createSlice({
  name: "waste",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetWasteTypes.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWasteTypes.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.wasteTypes = action.payload;
    });
    builder.addCase(actGetWasteTypes.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "Failed to fetch waste types";
    });

    // Add cases for actGetWastePrices
    builder.addCase(actGetWastePrices.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetWastePrices.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.wastePrices = action.payload;
    });
    builder.addCase(actGetWastePrices.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "Failed to fetch waste prices";
    });

    // Add cases for actUpdateWastePrices if needed
    builder.addCase(actUpdateWastePrices.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actUpdateWastePrices.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.wastePrices = action.payload.data;
    });
    builder.addCase(actUpdateWastePrices.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message || "Failed to update waste prices";
    });
  },
});

export default wasteSlice.reducer;
