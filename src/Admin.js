import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/admin.css";

const Admin = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="admin-dashboard container-fluid">
      <div className="header d-flex justify-content-between align-items-center py-3 mb-5">
        <h1 className="fs-1">Administrador</h1>
        <button className="btn btn-dark btn-lg"> Salir</button>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-3 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminGraficas")}
          >
            <div className="card-header">Graficos</div>
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
