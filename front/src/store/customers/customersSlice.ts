import { createSlice } from "@reduxjs/toolkit";

import { ICustomer, TLoading } from "@/types";
import actGetCustomers from "./act/actGetCustomers";

interface ICustomerState {
  customers: ICustomer[];
  loading: TLoading;
  error: string | null;
}

const initialState: ICustomerState = {
  customers: [],
  loading: "idle",
  error: null,
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actGetCustomers.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetCustomers.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.customers = action.payload;
    });
    builder.addCase(actGetCustomers.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
  },
});

export default customersSlice.reducer;
