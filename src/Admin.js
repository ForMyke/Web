import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const tipo = decoded.tipo;

      if (tipo !== 1) {
        navigate("../");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, salir",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token");
        Swal.fire({
          title: "¡Cerrado!",
          text: "Tu sesión ha sido cerrada.",
          icon: "success",
        }).then(() => {
          navigate("/login");
        });
      }
    });
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard container-fluid">
      <div className="header d-flex justify-content-between align-items-center py-3 mb-5">
        <h1 className="fs-1">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Administrador
        </h1>
        <button className="btn btn-dark btn-lg" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
        </button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-3 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminGraficas")}
          >
            <div className="card-header">Gráficos</div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="./img/grafico.png"
                alt="Graphs"
                className="img-fluid admin-icon"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminProductos")}
          >
            <div className="card-header">Productos</div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="./img/producto.png"
                alt="Products"
                className="img-fluid admin-icon"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminUsuarios")}
          >
            <div className="card-header">Usuarios</div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="./img/usuario.png"
                alt="Users"
                className="img-fluid admin-icon"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/Administradores")}
          >
            <div className="card-header">Admin</div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="./img/admin.png"
                alt="Admin"
                className="img-fluid admin-icon"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-3 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminPedidos")}
          >
            <div className="card-header">Pedidos</div>
            <div className="card-body d-flex justify-content-center align-items-center">
              <img
                src="./img/pedidos.png"
                alt="Orders"
                className="img-fluid admin-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
