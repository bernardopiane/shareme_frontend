import React from "react";
// React Router
import { Routes, Route, useNavigate } from "react-router-dom";
// Import Login & Home components
import Login from "./components/Login";
import Home from "./container/Home";

export default function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}
