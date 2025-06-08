import { IWasteTypes } from "@/types";
import { axiosErrorHandler } from "@/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IWasteTypesResponse {
  success: boolean;
  message: string;
  data: IWasteTypes;
}

export const actGetWasteTypes = createAsyncThunk(
  "waste/getWasteTypes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IWasteTypesResponse>("/waste-by-type");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);
