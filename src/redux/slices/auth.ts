import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";
import { Status } from "../slices/notes";
import { RootState } from "../store";

export type AuthProps = {
  username: string;
  password: string;
};

interface AuthSliceState {
  data: string | null;
  status: Status;
}

export const fetchAuthLogin = createAsyncThunk(
  "auth/fetchAuthLogin",
  async (params: AuthProps) => {
    const { data } = await axios.post(
      "/ru/data/v3/testmethods/docs/login",
      params
    );

    return data;
  }
);

const initialState: AuthSliceState = {
  data: null,
  status: Status.LOADING,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
    setAuthData: (state, action: PayloadAction<string>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthLogin.pending, (state) => {
        state.data = null;
        state.status = Status.LOADING;
      })
      .addCase(fetchAuthLogin.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload.data;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchAuthLogin.rejected, (state) => {
        state.data = null;
        state.status = Status.ERROR;
      });
  },
});

export const selectIsAuth = (state: RootState) => Boolean(state.auth.data);

export const authReducer = authSlice.reducer;

export const { logout, setAuthData } = authSlice.actions;
