import { createAsyncThunk } from "@reduxjs/toolkit";

import { axiosErrorHandler } from "@/utils";
import { ICollector } from "@/types";
import { axiosInstance } from "@/services/axios-global";

const actGetCollectors = createAsyncThunk(
  "collectors/actGetCollectors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/waste-collectors");
      const collectors = response.data.collectors.map(
        (collector: ICollector) => ({
          id: collector.id,
          name: collector.name,
          email: collector.email,
          phoneNumber: collector.phone,
        })
      );

      return collectors;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetCollectors;
