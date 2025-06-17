import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";

export const actGetPointTransactions = createAsyncThunk(
  "pointTransactions/actGetPointTransactions",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/transactions/pending");
      return res.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
