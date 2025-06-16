import { TLoading } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import actAuthLogin from "./act/actAuthLogin";

type AuthError = {
  message: string;
  errors?: Record<string, string[]>;
};

type TAuthState = {
  email: string;
  password: string;
  accessToken: string | null;
  error: AuthError | null;
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
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.email = "";
      state.password = "";
      state.error = null;
      state.loading = "idle";
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actAuthLogin.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actAuthLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.accessToken = action.payload;
    });
    builder.addCase(actAuthLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as AuthError;
    });
  },
});

export const { logout, clearAuthError } = authSlice.actions;

export default authSlice.reducer;
