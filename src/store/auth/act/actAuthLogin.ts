import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/services/axios-global";

type TFormData = {
  email: string;
  password: string;
};
type TResponse = {
  accessToken: string;
};

const actAuthLogin = createAsyncThunk(
  "auth/actAuthLogin",
  async (formData: TFormData, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
      const res = await axios.post<TResponse>("/login", formData);
      console.log("response data", res);
      return res.data;
    } catch (error) {
      console.log("response error", error);
      return rejectWithValue("Login failed. Please try again.");
    }
  }
);

export default actAuthLogin;
