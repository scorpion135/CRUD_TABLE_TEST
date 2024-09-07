import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "../../axios.js";

export const fetchTableData = createAsyncThunk(
  "notes/fetchTableData",
  async () => {
    const { data } = await axios.get(
      "/ru/data/v3/testmethods/docs/userdocs/get"
    );

    return data.data;
  }
);

export const fetchRemoveNote = createAsyncThunk(
  "notes/fetchRemoveNote",
  async (id) =>
    await axios.delete(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`)
);

const initialState = {
  items: [],
  status: "loading",
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.items = [];
        state.status = "loading";
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.items = action.payload;
        state.status = "loaded";
      })
      .addCase(fetchTableData.rejected, (state) => {
        state.items = [];
        state.status = "error";
      });
  },
});

export const notesReducer = notesSlice.reducer;

export const { createNote } = notesSlice.actions;
