import { createSlice } from "@reduxjs/toolkit";
import { IPointTransaction, TLoading } from "@/types";
import { actGetPointTransactions } from "./act/actGetPointTransactions";
import { actUpdatePointTransactionStatus } from "./act/actUpdatePointTransactionStatus";

interface IPointTransactionsState {
  loading: TLoading;
  error: string | null;
  data: IPointTransaction[];
}

const initialState: IPointTransactionsState = {
  loading: "idle",
  error: null,
  data: [],
};

const pointTransactionsSlice = createSlice({
  name: "pointTransactions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(actGetPointTransactions.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetPointTransactions.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(actGetPointTransactions.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.error.message as string;
    });

    builder.addCase(actUpdatePointTransactionStatus.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actUpdatePointTransactionStatus.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(
      actUpdatePointTransactionStatus.rejected,
      (state, action) => {
        state.loading = "failed";
        state.error = action.error.message as string;
      }
    );
  },
});

export default pointTransactionsSlice.reducer;
