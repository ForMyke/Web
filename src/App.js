import React from "react";
import Productos from "./components/Productos";
import AcercaDe from "./components/AcercaDe";
import Carrito from "./components/Carrito";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Admin from "./Admin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inicio from "./components/Inicio";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Productos" element={<Productos />} />
            <Route path="/acerca-de" element={<AcercaDe />} />
            <Route path="/Carrito" element={<Carrito />} />
            <Route path="/Registro" element={<Registro />} />
            <Route path="/Admin" element={<Admin />} />

            <Route path="/Login" element={<Login />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
