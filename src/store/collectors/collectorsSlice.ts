import { createSlice } from "@reduxjs/toolkit";

import { ICollector, TLoading } from "@/types";
import actGetCollectors from "./act/actGetCollectors";


interface ICollectorsState {
  collectors: ICollector[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICollectorsState = {
  collectors: [],
  loading: "idle",
  error: null,
};

export const collectorsSlice = createSlice({
  name: "collectors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCollectors.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCollectors.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.collectors = action.payload;
    });
    builder.addCase(actGetCollectors.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export default collectorsSlice.reducer;
