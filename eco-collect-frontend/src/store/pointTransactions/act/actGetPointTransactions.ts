import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";
import { axiosInstance } from "@/services/axios-global";

export const actGetPointTransactions = createAsyncThunk(
  "pointTransactions/actGetPointTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get("/transactions/pending");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
