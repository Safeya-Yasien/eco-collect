import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/services/axios-global";
import { axiosErrorHandler } from "@/utils";

type TFormData = {
  email: string;
  password: string;
};
type TResponse = {
  token: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post<TResponse>("/register", formData);
      return res.data.token;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actAuthLogin;
