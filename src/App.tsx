import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import BirdhouseDetail from "./components/BirdhouseDetail/BirdhouseDetail";
import Cart from "./components/Cart/Cart";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import CreateBirdhouse from "./components/CreateBirdhouse/CreateBirdhouse";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route  path="/" element={<Home />}/>
        <Route path='/birdhouse/:id' element={<BirdhouseDetail />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/birdhouse/create" element={<CreateBirdhouse />}/>
        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
