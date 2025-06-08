import { TLoading } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import actAuthLogin from "./act/actAuthLogin";

type TAuthState = {
  email: string;
  password: string;
  accessToken: string | null;
  error: string | null;
  loading: TLoading;
};

const initialState: TAuthState = {
  email: "",
  password: "",
  accessToken: null,
  loading: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload;
    });
  },
});

export default authSlice.reducer;
