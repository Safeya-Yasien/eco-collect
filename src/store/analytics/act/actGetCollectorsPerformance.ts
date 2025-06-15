import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";

const actGetCollectorsPerformance = createAsyncThunk(
  "analytics/actGetCollectorsPerformance",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/collectors-performance");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCollectorsPerformance;
