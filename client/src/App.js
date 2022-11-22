import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/login" exact element={<Login/>} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
  );
}