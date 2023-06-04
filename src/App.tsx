import React from "react";
import Home from "./components/Home/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Home />} path="/"/>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
