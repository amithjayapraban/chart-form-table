import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Chart from "./pages/Chart";
import Table from "./pages/Table";
import Form from "./pages/Form";

import Index from "./pages/Index";

function App() {
  return (
    <div className="App flex flex-col items-center h-screen w-full justify-center ">
      <Router>
        
          <Index />
          <Routes>
            <Route path="/" element={<Chart />} />
            <Route path="/table" element={<Table />} />
            <Route path="/form" element={<Form />} />
          </Routes>

      </Router>
    </div>
  );
}

export default App;
