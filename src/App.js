import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Generate from "./pages/generate";
import Selesai from "./pages/selesai";
import PaidOff from "./pages/paidOff";
import FreeTicket from "./pages/freeTicket";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Generate />} />
        <Route path="/done" element={<Selesai />} />
        <Route path="/paidOff" element={<PaidOff />} />
        <Route path="/free" element={<FreeTicket />} />
      </Routes>
    </Router>
  );
}

export default App;
