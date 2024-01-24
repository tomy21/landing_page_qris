import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Generate from "./pages/generate";
import Selesai from "./pages/selesai";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/done" element={<Selesai />} />
      </Routes>
    </Router>
  );
}

export default App;
