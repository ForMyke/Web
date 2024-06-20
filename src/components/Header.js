import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Link } from "react-router-dom";
import "../css/header.css"; // Asegúrate de que este archivo importa Font Awesome

const Header = () => {
  return (
    <header className="header-container">
      <div className="logo text-center">
        <Link to="/">
          <img
            src="./img/logo.png"
            alt="Xclusive Store Logo"
            className="logo"
          />
        </Link>
      </div>
      <div>
        <h1 className="text-center" data-texto="Xclusive Store"></h1>
      </div>
      <div className="top-nav d-flex justify-content-between align-items-center">
        <div className="left-links d-flex">
          <NavLink to="/" className="nav-link">
            <i className="fas fa-home"></i>
          </NavLink>
          <NavLink to="/acerca-de" className="nav-link">
            Acerca de
          </NavLink>
          <NavLink to="/servicioCliente" className="nav-link">
            Servicio Cliente
          </NavLink>
        </div>
        <div className="right-links d-flex align-items-center">
          {" "}
          <NavLink to="/productos" className="nav-link">
            <i className="fas fa-box-open"></i>
          </NavLink>
          <NavLink to="/perfil" className={"nav-link"}>
            <i className="fas fa-user"></i>
          </NavLink>
          <NavLink to="/carrito" className="nav-link">
            <i className="fas fa-shopping-cart"></i>{" "}
          </NavLink>
          <NavLink to="/login" className="nav-link">
            <i className="fas fa-sign-in-alt"></i>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;
