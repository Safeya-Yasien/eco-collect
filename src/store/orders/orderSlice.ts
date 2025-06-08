import { createSlice } from "@reduxjs/toolkit";
import actGetOrders from "./act/actGetOrders";
import { TLoading } from "@/types";

// interface IOrder {
//   user_id: number;
//   collector_id: number;
//   waste_type_id: number;
//   quantity: number;
//   price_for_kg: number;
//   status: string;
//   arrival_time: string | null;
//   points_for_kg: number | null;
//   created_at: string;
//   updated_at: string;
//   location_name: string;
//   pickup_time: string;
//   is_converted: boolean;
// }

// interface IOrdersResponse {
//   success: boolean;
//   message: string;
//   orders: IOrder[];
// }

interface IOrdersState {
  orders: [] | null;
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
