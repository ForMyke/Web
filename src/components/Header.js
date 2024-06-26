import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, Link } from "react-router-dom";
import "../css/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faBars } from "@fortawesome/free-solid-svg-icons";

const Header = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className={`header-container ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="logo-container text-center">
        <Link to="/">
          <img
            src="./img/logo.png"
            alt="Xclusive Store Logo"
            className="logo-1"
          />
        </Link>
      </div>
      <div className="d-flex justify-content-between align-items-center top-nav">
        <h1 className="text-center" data-texto="Xclusive Store"></h1>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="top-nav d-flex justify-content-between align-items-center w-100">
          <div className="left-links d-flex">
            <NavLink
              to="/acerca-de"
              className={`nav-link pr-3 ${isDarkMode ? "dark-mode" : ""}`}
            >
              Acerca de
            </NavLink>
            <NavLink
              to="/servicioCliente"
              className={`nav-link ${isDarkMode ? "dark-mode" : ""}`}
            >
              Servicio Cliente
            </NavLink>
          </div>
          <div className="right-links d-flex ml-auto">
            <NavLink
              to="/"
              className={`nav-link ${isDarkMode ? "dark-mode" : ""}`}
            >
              <i className="fas fa-home icon-placeholder"></i>
            </NavLink>
            <NavLink
              to="/productos"
              className={`nav-link ${isDarkMode ? "dark-mode" : ""}`}
            >
              <i className="fas fa-box-open icon-placeholder"></i>
            </NavLink>
            <NavLink
              to="/perfil"
              className={`nav-link ${isDarkMode ? "dark-mode" : ""}`}
            >
              <i className="fas fa-user icon-placeholder"></i>
            </NavLink>
            <NavLink
              to="/carrito"
              className={`nav-link ${isDarkMode ? "dark-mode" : ""}`}
            >
              <i className="fas fa-shopping-cart icon-placeholder"></i>
            </NavLink>
            <NavLink
              to="/login"
              className={`nav-link ${isDarkMode ? "dark-mode" : ""}`}
            >
              <i className="fas fa-sign-in-alt icon-placeholder"></i>
            </NavLink>
            <button
              onClick={toggleDarkMode}
              className={`btn-dark-mode-toggle pr-3 nav-link ${isDarkMode ? "dark-mode" : ""}`}
            >
              <FontAwesomeIcon
                icon={isDarkMode ? faSun : faMoon}
                className="icon-placeholder"
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
