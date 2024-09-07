import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/auth";
import { notesReducer } from "./slices/notes";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notes: notesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
