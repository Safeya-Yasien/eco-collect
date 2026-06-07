import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";
import { ICustomer } from "@/types";
import { axiosInstance } from "@/services/axios-global";

const actGetCustomers = createAsyncThunk(
  "customers/actGetCustomers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/users");

      const users = response.data.users.map((user: ICustomer) => ({
        id: user.user_id,
        user_id: user.user_id,
        name: user.name,
        total_points: user.total_points,
        total_balance: user.total_balance,
      }));

      return users;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actGetCustomers;
