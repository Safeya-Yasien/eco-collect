import { axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const actGetOrders = createAsyncThunk(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get("/orders");

      const orders = response.data.orders.map((order) => ({
        transaction_id: order.id,
        customer_name: order.id,
        collector_name: order.id,
        waste_amount: order.id,
        price: order.id,
        payment_method: order.id,
        status: order.id,
      }));

      console.log("response", response);
      return response.data;
    } catch (error) {
      console.log("error", error);
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
