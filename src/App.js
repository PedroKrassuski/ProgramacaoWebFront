import React from "react";
import Login from "./pages/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Artefatos from "./pages/Artefatos";
import Dashboard from "./pages/Dashboard";
import Validacao from "./pages/Validacao";
import Validar from "./pages/Validar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Artefatos" element={<Artefatos />}></Route>
        <Route path="/Dashboard" element={<Dashboard />}></Route>
        <Route path="/Validacao" element={<Validacao />}></Route>
        <Route path="/Validar" element={<Validar />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
