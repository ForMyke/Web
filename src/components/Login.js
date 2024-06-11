import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";

const Login = ({ onLogin }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="login-container d-flex flex-column justify-content-center align-items-center vh-100">
      <img
        src="./img/logo.png"
        alt="Xclusive Store Logo"
        className="logo mb-5"
      />
      <h2 className="text-center mt-5 mb-5">
        Introduce tu dirección de correo electrónico para unirte o iniciar
        sesión.
      </h2>
      <form onSubmit={handleSubmit} className="login-form w-50">
        <div className="form-group mt-4 mb-3">
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            required
          />
          <label className="form-check-label" htmlFor="terms">
            Al continuar, acepto la{" "}
            <a href="#" className="text-decoration-none">
              Política de privacidad
            </a>{" "}
            y los{" "}
            <a href="#" className="text-decoration-none">
              Términos de uso
            </a>{" "}
            de Xclusive Store.
          </label>
        </div>
        <button type="submit" className="btn btn-dark btn-block w-100">
          Continuar
        </button>
      </form>
    </div>
  );
};

export default Login;
