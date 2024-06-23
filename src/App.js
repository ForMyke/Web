import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import axios from "axios";
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
import Perfil from "./components/Perfil";
import AdminGraficas from "./componentsAdmin/AdminGraficas";
import Administradores from "./componentsAdmin/Administradores";
import AdminProductos from "./componentsAdmin/AdminProductos";
import AdminUsuarios from "./componentsAdmin/AdminUsuarios";
import AdminPedidos from "./componentsAdmin/AdminPedidos";
import ForgotPassword from "./components/ForgotPassword";
import ServicioCliente from "./components/ServicioCliente";
import Privacidad from "./components/Privacidad";
import Seguridad from "./components/Seguridad";
import LetraChica from "./components/LetraChica";
import PreguntasFrecuentes from "./components/PreguntasFrecuentes";
import Contacto from "./components/Contacto";
import { ToastContainer, toast } from "react-toastify";
import "./css/toast.css";
import "react-toastify/dist/ReactToastify.css";

const AppContent = ({ products, addToCart, cartItems, setCartItems }) => {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/AdminGraficas") ||
    location.pathname.startsWith("/Administradores") ||
    location.pathname.startsWith("/AdminUsuarios") ||
    location.pathname.startsWith("/AdminPedidos") ||
    location.pathname.startsWith("/AdminProductos");

  return (
    <div className="app-container">
      {!isAdminRoute && <Header />}
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route
            path="/productos"
            element={<Productos products={products} />}
          />
          <Route
            path="/productos/:productId"
            element={<ProductDetails addToCart={addToCart} />}
          />
          <Route path="/acerca-de" element={<AcercaDe />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/seguridad" element={<Seguridad />} />
          <Route path="/servicioCliente" element={<ServicioCliente />} />
          <Route
            path="/preguntas-frecuentes"
            element={<PreguntasFrecuentes />}
          />
          <Route path="/perfil" element={<Perfil />} />
          <Route
            path="/carrito"
            element={
              <Carrito cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
          <Route path="/letra-chica" element={<LetraChica />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/privacidad" element={<Privacidad />} />
          <Route path="/pago" element={<Pago cartItems={cartItems} />} />
          <Route path="/password" element={<PasswordLogin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/AdminGraficas" element={<AdminGraficas />} />
          <Route path="/Administradores" element={<Administradores />} />
          <Route path="/AdminPedidos" element={<AdminPedidos />} />
          <Route path="/AdminProductos" element={<AdminProductos />} />
          <Route path="/AdminUsuarios" element={<AdminUsuarios />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/backend/api/products.php")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const addToCart = (productToAdd) => {
    const updatedCartItems = [...cartItems];
    const existingProductIndex = updatedCartItems.findIndex(
      (item) => item.id === productToAdd.id
    );

    if (existingProductIndex > -1) {
      updatedCartItems[existingProductIndex].quantity += productToAdd.quantity;
    } else {
      updatedCartItems.push(productToAdd);
    }

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    toast.success(
      <div onClick={() => (window.location.href = "/carrito")}>
        Producto agregado al carrito
      </div>,
      {
        className: "toast-success-custom",
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <AppContent
        products={products}
        addToCart={addToCart}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </BrowserRouter>
  );
};

export default App;
