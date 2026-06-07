import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";
import { axiosInstance } from "@/services/axios-global";

const actGetCollectorsPerformance = createAsyncThunk(
  "analytics/actGetCollectorsPerformance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/collectors-performance");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetCollectorsPerformance;
