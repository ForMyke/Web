import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Pago from "./components/Pago";
import PasswordLogin from "./components/PasswordLogin";
import ProductDetails from "./components/ProductDetails";
// Importaciones de funciones de Admin
import AdminGraficas from "./componentsAdmin/AdminGraficas";
import Administradores from "./componentsAdmin/Administradores";
import AdminProductos from "./componentsAdmin/AdminProductos";
import AdminUsuarios from "./componentsAdmin/AdminUsuarios";

const AppContent = ({ products }) => {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/admin" && <Header />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={<Productos products={products} />}
          />
          <Route
            path="/productos/:productId"
            element={<ProductDetails products={products} />}
          />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/password" element={<PasswordLogin />} />

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
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.npoint.io/3dcbf4a923f9995e08c1"
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <AppContent products={products} />
    </BrowserRouter>
  );
};

export default App;
