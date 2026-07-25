import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";
import { axiosInstance } from "@/services/axios-global";

const actGetMostContributedLocation = createAsyncThunk(
  "analytics/actGetMostContributedLocation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/most-contributed-location");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetMostContributedLocation;
