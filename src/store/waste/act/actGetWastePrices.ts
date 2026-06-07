import { axiosInstance } from "@/services/axios-global";
import { axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetWastePrices = createAsyncThunk(
  "waste/actGetWastePrices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/waste-types");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
