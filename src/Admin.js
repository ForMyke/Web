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
      <div className="header d-flex justify-content-between align-items-center py-3">
        <h1>Admin Dashboard</h1>
        <div className="d-flex">
          <button className="btn btn-outline-primary me-2">Cartings</button>
          <button className="btn btn-outline-primary me-2">Prefersions</button>
          <button className="btn btn-primary">Admin</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminGraficas")}
          >
            <div className="card-header">Graphs</div>
            <div className="card-body">
              <img
                src="./path/to/graphs-background.jpg"
                alt="Graphs"
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminProductos")}
          >
            <div className="card-header">Products</div>
            <div className="card-body">
              <img
                src="./path/to/products-background.jpg"
                alt="Products"
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/AdminUsuarios")}
          >
            <div className="card-header">Users</div>
            <div className="card-body">
              <img
                src="./path/to/users-background.jpg"
                alt="Users"
                className="img-fluid"
              />
            </div>
          </div>
        </div>

        <div className="col-md-6 col-lg-4 mb-4">
          <div
            className="card shadow-sm clickable-card"
            onClick={() => handleNavigation("/Administradores")}
          >
            <div className="card-header">Admin</div>
            <div className="card-body">
              <img
                src="./path/to/admin-background.jpg"
                alt="Admin"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
