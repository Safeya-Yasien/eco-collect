import { axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actGetWastePrices = createAsyncThunk(
  "waste/actGetWastePrices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/waste-types");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
