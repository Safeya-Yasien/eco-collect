import { createSlice } from "@reduxjs/toolkit";

import {
  ICollectorsPerformance,
  IMostContributedLocations,
  TLoading,
} from "@/types";
import actGetMostContributedLocation from "./act/actGetMostContributedLocation";
import actGetCollectorsPerformance from "./act/actGetCollectorsPerformance";

interface IAnalyticsState {
  mostContributedLocations: IMostContributedLocations[];
  collectorsPerformance: ICollectorsPerformance[];
  loading: TLoading;
  error: string | null;
}

const initialState: IAnalyticsState = {
  mostContributedLocations: [],
  collectorsPerformance: [],
  loading: "idle",
  error: null,
};

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // most contributed location
    builder.addCase(actGetMostContributedLocation.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(
      actGetMostContributedLocation.fulfilled,
      (state, action) => {
        state.loading = "succeeded";
        state.mostContributedLocations = action.payload;
      }
    );
    builder.addCase(actGetMostContributedLocation.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });

    // Collectors Performance
    builder.addCase(actGetCollectorsPerformance.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCollectorsPerformance.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.collectorsPerformance = action.payload;
    });
    builder.addCase(actGetCollectorsPerformance.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export default analyticsSlice.reducer;
