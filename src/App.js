import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Productos from "./components/Productos";
import AcercaDe from "./components/AcercaDe";
import Carrito from "./components/Carrito";
import Login from "./components/Login";
import Registro from "./components/Registro";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Admin from "./Admin";
import Inicio from "./components/Inicio";
//Importaciones de funciones de Admin
import AdminGraficas from "./componentsAdmin/AdminGraficas";
import Administradores from "./componentsAdmin/Administradores";
import AdminProductos from "./componentsAdmin/AdminProductos";
import AdminUsuarios from "./componentsAdmin/AdminUsuarios";

const AppContent = () => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/admin" && <Header />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          {/* Rutas de Admin */}
          <Route path="/AdminGraficas" element={<AdminGraficas />} />
          <Route path="/Administradores" element={<Administradores />} />
          <Route path="/AdminProductos" element={<AdminProductos />} />
          <Route path="/AdminUsuarios" element={<AdminUsuarios />} />
        </Routes>
      </main>
      {location.pathname !== "/admin" && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
