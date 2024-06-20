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
    <div className="admin-dashboard container-fluid ">
      <div className="header d-flex justify-content-center align-items-center py-3 mb-5">
        <h1>Administrador</h1>
        <div className="d-flex"></div>
      </div>

      <div className="row justify-content-center ">
        <div className="col-md-6 col-lg-5 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminGraficas")}
          >
            <div className="card-header">Graficos</div>
            <div className="card-body">
              <img
                src="./img/graficas.jpg"
                alt="Graphs"
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-5 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminProductos")}
          >
            <div className="card-header">Productos</div>
            <div className="card-body">
              <img
                src="./img/productos.jpg"
                alt="Products"
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-5 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminUsuarios")}
          >
            <div className="card-header">Usuarios</div>
            <div className="card-body">
              <img src="./img/usuarios.jpg" alt="Users" className="img-fluid" />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-5 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/Administradores")}
          >
            <div className="card-header texto">Admin</div>
            <div className="card-body">
              <img src="./img/admin.jpg" alt="Admin" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
