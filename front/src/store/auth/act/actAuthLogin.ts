import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@/utils";
import { axiosInstance } from "@/services/axios-global";

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
      const res = await axiosInstance.post<TResponse>("/register", formData);
      return res.data.token;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default actAuthLogin;
