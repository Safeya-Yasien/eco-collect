import { createSlice } from "@reduxjs/toolkit";
import { actGetWasteTypes } from "./act/actGetWasteTypes";
import { IWasteTypes, TLoading } from "@/types";

interface IWasteState {
  wasteTypes: IWasteTypes;
  loading: TLoading;
  error: string | null;
}

const initialState: IWasteState = {
  wasteTypes: {},
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
  },
});

export default wasteSlice.reducer;
