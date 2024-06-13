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
      <div className="header d-flex justify-content-between align-items-center py-3 mb-5">
        <h1>Admin Dashboard</h1>
        <div className="d-flex">
          <button className="btn btn-primary">Admin</button>
        </div>
      </div>

      <div className="row justify-content-center ">
        <div className="col-md-6 col-lg-5 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminGraficas")}
          >
            <div className="card-header">Graphs</div>
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
            <div className="card-header">Products</div>
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
            <div className="card-header">Users</div>
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
            <div className="card-header">Admin</div>
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
