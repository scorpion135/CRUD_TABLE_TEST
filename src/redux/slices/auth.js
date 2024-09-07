import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios.js";

export const fetchAuthLogin = createAsyncThunk(
  "auth/fetchAuthLogin",
  async (params) => {
    const { data } = await axios.post(
      "/ru/data/v3/testmethods/docs/login",
      params
    );

    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    setAuthData: (state, action) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthLogin.pending, (state) => {
        state.data = null;
        state.status = "loading";
      })
      .addCase(fetchAuthLogin.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.status = "loaded";
      })
      .addCase(fetchAuthLogin.rejected, (state) => {
        state.data = null;
        state.status = "error";
      });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout, setAuthData } = authSlice.actions;
