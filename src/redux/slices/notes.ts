import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "../../axios";

export type Note = {
  id: string;
  documentStatus: string;
  employeeNumber: string;
  documentType: string;
  documentName: string;
  companySignatureName: string;
  employeeSignatureName: string;
  employeeSigDate: string;
  companySigDate: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface NotesSliceState {
  items: Note[];
  status: Status;
}

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
  async (id: string) =>
    await axios.delete(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`)
);

const initialState: NotesSliceState = {
  items: [],
  status: Status.LOADING,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    createNote: (state, action: PayloadAction<Note>) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTableData.pending, (state) => {
        state.items = [];
        state.status = Status.LOADING;
      })
      .addCase(fetchTableData.fulfilled, (state, action) => {
        console.log(action.payload);
        state.items = action.payload;
        state.status = Status.SUCCESS;
      })
      .addCase(fetchTableData.rejected, (state) => {
        state.items = [];
        state.status = Status.ERROR;
      });
  },
});

export const notesReducer = notesSlice.reducer;

export const { createNote } = notesSlice.actions;
