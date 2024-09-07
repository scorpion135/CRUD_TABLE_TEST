import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Container from "@mui/material/Container";

import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { AddNote } from "./pages/addNote";

import { setAuthData } from "./redux/slices/auth";

function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(setAuthData(token));
    }
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="2xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-note" element={<AddNote />} />
          <Route path="/add-note/:id/edit" element={<AddNote />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
