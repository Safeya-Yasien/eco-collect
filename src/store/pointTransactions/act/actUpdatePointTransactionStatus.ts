import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";

export const actUpdatePointTransactionStatus = createAsyncThunk(
  "pointTransactions/actUpdatePointTransactionStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      await axios.patch(`/transactions/${id}/status`, {
        status,
      });
      return { id, status };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
