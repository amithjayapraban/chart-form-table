import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Chart from "./pages/Chart";
import Table from "./pages/Table";
import Form from "./pages/Form";
import Nav from "./pages/Nav";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App flex flex-col items-center h-screen  w-full  ">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Chart />} />
          <Route path="/table" element={<Table />} />
          <Route path="/form" element={<Form />} />
          <Route path="/details/:id" element={<Details h="h-screen"/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
