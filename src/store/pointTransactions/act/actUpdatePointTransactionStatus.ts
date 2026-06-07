import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";
import { axiosInstance } from "@/services/axios-global";

export const actUpdatePointTransactionStatus = createAsyncThunk(
  "pointTransactions/actUpdatePointTransactionStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      await axiosInstance.patch(`/transactions/${id}/status`, {
        status,
      });
      return { id, status };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
