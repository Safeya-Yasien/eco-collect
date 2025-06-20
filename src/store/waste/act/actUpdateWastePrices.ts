import { axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actUpdateWastePrices = createAsyncThunk(
  "waste/actUpdateWastePrices",
  async (
    { id, price_per_kg }: { id: number; price_per_kg: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/waste-types/prices", {
        waste_types: [
          {
            id,
            price_per_kg: Number(price_per_kg),
          },
        ],
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
