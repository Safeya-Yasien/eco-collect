import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@/utils";
import { IOrder, IRawOrder } from "@/types";

const actGetOrders = createAsyncThunk<IOrder[], void>(
  "orders/actGetOrders",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const response = await axios.get("/orders");

      const orders = (response.data.orders as IRawOrder[]).map(
        (order): IOrder => ({
          id: order.order_id,
          transaction_id: order.order_id,
          arrival_time: order.arrival_time,
          customer_name: order.user_name,
          collector_name: order.collector_name,
          waste_amount: order.quantity,
          price: order.price_for_kg,
          payment_method: order.payment_method,
          status: order.status,
        })
      );

      return orders;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetOrders;
