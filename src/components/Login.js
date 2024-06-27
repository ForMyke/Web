import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/login.css";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

const Login = ({ isDarkMode }) => {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    if (token) {
      navigate("../");
    }
  }, [token, navigate]);

  const handleNavLinkClick = (url) => {
    window.location.href = url;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(formRef.current);
    const email = formData.get("email");

    if (!formData.get("terms")) {
      Swal.fire({
        icon: "error",
        title: "Algo anda mal",
        text: "Debe aceptar los términos y condiciones",
        confirmButtonColor: "#000",
      });
      return;
    }

    if (showPasswordInput) {
      const password = formData.get("password");
      try {
        const response = await fetch(
          "https://localhost/backend/api/contrasena.php",
          {
            method: "POST",
            body: JSON.stringify({ email, contrasena: password }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.success) {
          localStorage.setItem("token", data.jwt); // Guarda el token JWT en localStorage
          const token = localStorage.getItem("token");
          const decoded = jwtDecode(token);
          const tipo = decoded.tipo;
          console.log(decoded);
          if (tipo == 1) {
            navigate("/admin");
          } else {
            navigate("../");
          }
        } else {
          Swal.fire({
            text: "Contraseña incorrecta",
            icon: "error",
            button: {
              text: "Aceptar",
              className: "btn btn-dark",
            },
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      try {
        const response = await fetch(
          "https://localhost/backend/api/login.php",
          {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.exists) {
          setShowPasswordInput(true);
        } else {
          navigate("/registro?email=" + email);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div
      className={`login-container d-flex flex-column justify-content-center align-items-center vh-100 ${isDarkMode ? "dark-mode" : ""}`}
    >
      <img
        src="./img/logo.png"
        alt="Xclusive Store Logo"
        className="logo-2 mb-5"
      />
      <h2 className={`text-center mt-5 mb-5 ${isDarkMode ? "dark-mode" : ""}`}>
        Introduce tu dirección de correo electrónico para unirte o iniciar
        sesión.
      </h2>
      <form
        ref={formRef}
        id="login-form"
        className={`login-form ${isDarkMode ? "dark-mode" : ""}`}
        onSubmit={handleSubmit}
      >
        <div className="form-group mt-4 mb-3">
          <label htmlFor="email" className="sr-only">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="Correo electrónico"
            required
          />
        </div>
        {showPasswordInput && (
          <div className="form-group mt-4 mb-3">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Contraseña"
              required
            />
          </div>
        )}
        <div className="form-group form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="terms"
            name="terms"
          />
          <label
            className={`form-check-label ${isDarkMode ? "dark-mode" : ""}`}
            htmlFor="terms"
          >
            Al continuar, acepto la{" "}
            <a
              href="#"
              onClick={() => handleNavLinkClick("/privacidad")}
              className={`text-decoration-none ${isDarkMode ? "dark-mode" : ""}`}
            >
              Política de privacidad
            </a>{" "}
            y los{" "}
            <a
              href="#"
              onClick={() => handleNavLinkClick("/letra-chica")}
              className={`text-decoration-none ${isDarkMode ? "dark-mode" : ""}`}
            >
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
