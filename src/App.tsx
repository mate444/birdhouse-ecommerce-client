import React from "react";
import Home from "./components/Home/Home";
import BirdhouseDetail from "./components/BirdhouseDetail/BirdhouseDetail";
import Cart from "./components/Cart/Cart";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route  path="/" element={<Home />}/>
        <Route path='/birdhouse/:id' element={<BirdhouseDetail />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
