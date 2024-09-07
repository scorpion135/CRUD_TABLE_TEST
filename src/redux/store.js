import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth.js";
import { notesReducer } from "./slices/notes.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

export default store;
