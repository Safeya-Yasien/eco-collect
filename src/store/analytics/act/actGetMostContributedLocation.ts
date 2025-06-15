import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";

const actGetMostContributedLocation = createAsyncThunk(
  "analytics/actGetMostContributedLocation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/most-contributed-location");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetMostContributedLocation;
