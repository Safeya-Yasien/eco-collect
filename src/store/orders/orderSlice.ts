import { createSlice } from "@reduxjs/toolkit";
import actGetOrders from "./act/actGetOrders";
import { IOrder, TLoading } from "@/types";

interface IOrdersState {
  orders: IOrder[];
  loading: TLoading;
  error: string | null;
}

const initialState: IOrdersState = {
  orders: [],
  loading: "idle",
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetOrders.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetOrders.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.orders = action.payload;
    });
    builder.addCase(actGetOrders.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export default orderSlice.reducer;
